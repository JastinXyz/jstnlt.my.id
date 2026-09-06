"use client"

import { cn } from "@/lib/cn";

/* `03 / Open source` above the section heading. Stacked in one column, never
 * beside the heading: the tag-left / heading-right shape is the most
 * recognisable templated-editorial tell there is.
 *
 * It does not animate. It used to ride in on the section reveal, which meant
 * every eyebrow on the page moved, including the ones in sections that are
 * meant to sit still. */
export default function SectionEyebrow({
    index,
    label,
    onInk,
    className,
}: {
    /** page heads have no number to carry, section heads do */
    index?: number;
    label: string;
    onInk?: boolean;
    className?: string;
}) {
    return (
        <div className={cn("mb-6", className)}>
            <p className="label flex items-center gap-3">
                {index !== undefined && (
                    <span className={cn("tnum", onInk ? "text-on-panel-muted" : "text-neutral")}>
                        {String(index).padStart(2, "0")}
                    </span>
                )}
                <span
                    aria-hidden="true"
                    className={cn("h-px w-6 shrink-0", onInk ? "bg-on-panel-rule" : "bg-rule-strong")}
                />
                <span className={onInk ? "text-on-panel" : "text-ink"}>{label}</span>
            </p>
        </div>
    );
}
