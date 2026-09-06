import { cn } from "@/lib/cn";

/* The placement, which is the thing anyone reads this list for. It used to be
 * an 11px label under a 40px year, so the least useful fact on the row was the
 * loudest one.
 *
 * A win gets the filled accent, everything else gets an outline: the shape says
 * which is which before the words are read. Still typography, never a medal
 * emoji, per the note in achievements.ts.
 *
 * In dark mode the accent is lighter, so white on it falls to 3.4:1. There the
 * badge becomes a tint with accent text on it, which clears 5:1 against the
 * page and still reads as the same object. */
export default function RankBadge({ rank, className }: { rank: string; className?: string }) {
    const won = rank.startsWith("1st");
    const text = /^\d/.test(rank) ? `${rank} place` : rank;

    return (
        <span
            className={cn(
                "label inline-flex items-center rounded-xs px-2.5 py-1.5",
                won
                    ? "bg-accent text-paper dark:bg-accent/15 dark:text-accent-text dark:ring-1 dark:ring-accent/40"
                    : "text-muted ring-1 ring-rule-strong/50",
                className
            )}
        >
            {text}
        </span>
    );
}
