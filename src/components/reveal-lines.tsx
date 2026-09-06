/* Headings do not move.
 *
 * They were the first thing the reveal was built for and the first thing to go
 * wrong: on a tall screen most of them are already on the page when it loads,
 * so the animation either never runs or runs where nobody is looking. Kept as
 * a plain wrapper so the seventeen call sites stay unchanged. */
export default function RevealLines({
    text,
    as: Tag = "span",
    className,
}: {
    text: string;
    as?: React.ElementType;
    className?: string;
    /** accepted and ignored, kept for old call sites */
    trigger?: "load" | "scroll";
}) {
    return <Tag className={className}>{text}</Tag>;
}
