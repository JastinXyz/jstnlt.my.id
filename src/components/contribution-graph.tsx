import { Contributions } from "@/lib/github";
import { cn } from "@/lib/cn";
import TipLayer from "./tip-layer";

/* The calendar, drawn from the GraphQL contributionCalendar.
 *
 * Columns are minmax(11px, 1fr): the grid fills whatever width it is given
 * and only starts scrolling once a cell would drop below 11px. Fixed cell
 * sizes left a quarter of the row empty on a wide screen.
 *
 * Server component, so it ships no JS. The hover tooltip is a CSS ::after
 * fed by data-tip; month labels sit in the same grid as the cells, so they
 * stay aligned at any column width. */

const MIN_CELL = 11;
const GAP = 3;

const LEVEL = ["bg-grid-0", "bg-grid-1", "bg-grid-2", "bg-grid-3", "bg-grid-4"] as const;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT = MONTHS.map((m) => m.slice(0, 3));

function levelsFor(counts: number[]) {
    const active = counts.filter((c) => c > 0).sort((a, b) => a - b);
    if (!active.length) return [1, 2, 3, 4];
    const q = (p: number) => active[Math.min(active.length - 1, Math.floor(active.length * p))];
    return [1, q(0.5), q(0.8), q(0.95)];
}

/* "26 Aug 2026", not "2026-08-26": the ISO string is for machines, and on a
 * phone it reads as a serial number sitting in the middle of a sentence. */
const longDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const ordinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
};

export default function ContributionGraph({ data }: { data: Contributions }) {
    const all = data.weeks.flat();
    const [, t2, t3, t4] = levelsFor(all.map((d) => d.count));
    const level = (c: number) => (c <= 0 ? 0 : c < t2 ? 1 : c < t3 ? 2 : c < t4 ? 3 : 4);
    const busiest = all.reduce((a, b) => (b.count > a.count ? b : a), all[0]);

    const columns = `repeat(${data.weeks.length}, minmax(${MIN_CELL}px, 1fr))`;

    /* one label per month, at the column its month begins, skipped when it
       would land on top of the previous one */
    const labels: { col: number; text: string }[] = [];
    data.weeks.forEach((w, i) => {
        const first = w[0];
        if (!first) return;
        const month = new Date(first.date).getMonth();
        const prev = i > 0 ? new Date(data.weeks[i - 1][0].date).getMonth() : -1;
        if (month === prev) return;
        const last = labels[labels.length - 1];
        if (last && i - last.col < 3) return;
        labels.push({ col: i, text: SHORT[month] });
    });

    const tip = (d: { date: string; count: number }) => {
        const dt = new Date(d.date);
        const n = d.count === 1 ? "1 contribution" : `${d.count} contributions`;
        return `${d.count === 0 ? "No contributions" : n} on ${MONTHS[dt.getMonth()]} ${ordinal(dt.getDate())}`;
    };

    return (
        <div>
            <TipLayer />
            <div
                data-cal
                className="overflow-x-auto pb-2"
                role="img"
                aria-label={`${data.total.toLocaleString("en-US")} contributions in the last year. Busiest day ${busiest.date} with ${busiest.count}.`}
            >
                <div className="min-w-full">
                    <div className="mb-2 grid" style={{ gridTemplateColumns: columns, gap: GAP }}>
                        {labels.map((l) => (
                            <span
                                key={l.col}
                                className="label whitespace-nowrap text-[0.625rem] tracking-normal"
                                style={{ gridColumnStart: l.col + 1 }}
                            >
                                {l.text}
                            </span>
                        ))}
                    </div>

                    <div className="grid" style={{ gridTemplateColumns: columns, gap: GAP }}>
                        {data.weeks.map((week, wi) => (
                            /* --d staggers the fade one column at a time, oldest week
                               first, so the year fills in the direction it was lived.
                               Set here rather than in CSS because nth-child cannot
                               count to fifty-three without fifty-three rules.

                               content-start, or the current partial week stretches:
                               its single cell is the only row in that column, so it
                               takes the whole row height of the tallest column and
                               renders as one enormous square */
                            <div
                                key={wi}
                                className="grid content-start"
                                style={{ gap: GAP, ["--d" as string]: `${wi * 12}ms` }}
                            >
                                {week.map((day) => (
                                    <span
                                        key={day.date}
                                        data-tip={tip(day)}
                                        className={cn("cal-cell aspect-square w-full rounded-[2px]", LEVEL[level(day.count)])}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* One row from sm up, with the ends lining up with the calendar
                edges. On a phone they stack and centre: two short lines pinned
                to opposite margins read as a layout that broke, centred they
                read as a caption under the grid. */}
            <div className="mt-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10 sm:text-left">
                <p className="label">
                    Busiest day <span className="tnum text-ink">{busiest.count}</span> on{" "}
                    <span className="tnum text-ink">{longDate(busiest.date)}</span>
                </p>
                <div className="flex items-center gap-2">
                    <span className="label">Less</span>
                    <span className="flex items-center gap-1">
                        {LEVEL.map((c) => (
                            <span key={c} className={cn("size-3.5 rounded-[2px] sm:size-3", c)} />
                        ))}
                    </span>
                    <span className="label">More</span>
                </div>
            </div>
        </div>
    );
}
