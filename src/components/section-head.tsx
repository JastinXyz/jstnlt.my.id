import Link from "next/link";

/* Heading, optionally with one link on the same baseline. No rule above 
 * surface changes and spacing separate sections now. Single column with no
 * eyebrow, so it can never become the tag-left / heading-right pattern. */
export default function SectionHead({
    title,
    lead,
    action,
    className,
}: {
    title: string;
    lead?: string;
    action?: { href: string; label: string };
    className?: string;
}) {
    return (
        <header className={className}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <h2 className="display-sm text-2xl md:text-3xl">{title}</h2>
                {action && (
                    <Link
                        href={action.href}
                        className="label whitespace-nowrap transition-colors duration-150 hover:text-accent-text"
                    >
                        {action.label} <span aria-hidden="true">→</span>
                    </Link>
                )}
            </div>
            {lead && <p className="prose mt-3 text-md">{lead}</p>}
        </header>
    );
}
