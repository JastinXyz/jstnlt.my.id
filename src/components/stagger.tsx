/* Stagger removed, same reason as RevealLines. A passthrough so call sites
 * stay unchanged; the content is simply always visible. */
export default function Stagger({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
    /** accepted and ignored */
    delay?: number;
}) {
    return <div className={className}>{children}</div>;
}
