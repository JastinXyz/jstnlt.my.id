import { Contributions } from "@/lib/github";

/* 371 days of commits as a field of dots: one column per day, dot count per
 * column set by that day's contributions. Server-rendered SVG, no JS.
 *
 * This was briefly an interactive canvas where the pointer pushed the dots
 * aside. It did not earn the code. */
export default function CommitField({
    data,
    className,
}: {
    data: Contributions;
    className?: string;
}) {
    const days = data.weeks.flat();
    const peak = Math.max(1, ...days.map((d) => d.count));
    const ROWS = 11;
    const H = 26;

    return (
        <svg
            viewBox={`0 0 ${days.length} ${H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            className={className}
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
