import { Contributions } from "@/lib/github";

/* Days of commits as a field of dots: one column per day, dot count per column
 * set by that day's contributions. Server-rendered SVG, no JS.
 *
 * Two of them are rendered, one per breakpoint. A year squeezed into a phone
 * gives every day about one pixel, which stops being data and becomes texture:
 * you cannot tell a busy week from an empty one. The small screen gets the last
 * ninety days instead, at four pixels each. It is an ornament, not a chart, so
 * it carries no label either way.
 *
 * This was briefly an interactive canvas where the pointer pushed the dots
 * aside. It did not earn the code. */

const ROWS = 11;
const H = 26;
const SHORT = 90;

function Field({ days, peak }: { days: Contributions["weeks"][number]; peak: number }) {
    return (
        <svg
            viewBox={`0 0 ${days.length} ${H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            style={{ width: "100%", height: "auto" }}
        >
            {days.map((d, i) => {
                if (!d.count) return null;
                const n = Math.max(1, Math.round((d.count / peak) * ROWS));
                return Array.from({ length: n }, (_, k) => (
                    <circle
                        key={`${i}-${k}`}
                        cx={i + 0.5}
                        cy={H / 2 + (k - (n - 1) / 2) * 2.2}
                        r={0.42}
                        className="fill-accent"
                        opacity={0.28 + 0.5 * (d.count / peak)}
                    />
                ));
            })}
        </svg>
    );
}

export default function CommitField({
    data,
    className,
}: {
    data: Contributions;
    className?: string;
}) {
    const days = data.weeks.flat();
    /* the peak is taken from the full year in both, so the short field is a
       crop of the same picture rather than a rescaled one */
    const peak = Math.max(1, ...days.map((d) => d.count));
    const recent = days.slice(-SHORT);

    return (
        <div className={className}>
            <div className="md:hidden">
                <Field days={recent} peak={peak} />
            </div>
            <div className="hidden md:block">
                <Field days={days} peak={peak} />
            </div>
        </div>
    );
}
