import Reveal from "./reveal";

/* A group whose children come in one after another. The delay per child is
 * counted in CSS by nth-child, so nothing here has to walk the DOM, and the
 * count stops at the eighth so a long list does not grow a tail seconds deep.
 *
 * Every call site already wrapped its groups in this when the first attempt at
 * reveal animations was removed, which is why it is a passthrough no longer. */
export default function Stagger({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
    /** accepted and ignored, kept for old call sites */
    delay?: number;
}) {
    return (
        <Reveal className={className} stagger>
            {children}
        </Reveal>
    );
}
