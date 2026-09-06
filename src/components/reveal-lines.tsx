/* Reveal removed. The mask animation went through GSAP twice and CSS twice
 * and broke a different way each time: unit parsing, StrictMode revert,
 * post-hydration flash, and trigger timing. The page has enough motion
 * without it.
 *
 * Kept as a plain wrapper so every call site stays unchanged. To bring the
 * animation back, restore the .js .rl-word rules in globals.css and the
 * IntersectionObserver in git history. */
export default function RevealLines({
    text,
    as: Tag = "span",
    className,
}: {
    text: string;
    as?: React.ElementType;
    className?: string;
    /** accepted and ignored, so call sites do not have to change */
    trigger?: "load" | "scroll";
}) {
    return <Tag className={className}>{text}</Tag>;
}
