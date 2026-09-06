import { ReactNode } from "react";
import SectionEyebrow from "./section-eyebrow";

/* Every page opens the way the home page opens: a labelled eyebrow, then a
 * condensed uppercase headline in seven columns, then one line in the last
 * four, top-aligned with it.
 *
 * Before this, the subpages were set in sentence case at a smaller size with
 * no eyebrow, so arriving on one felt like arriving on a different site. */
export default function PageHead({
    label,
    title,
    lead,
}: {
    label: string;
    title: ReactNode;
    lead: ReactNode;
}) {
    return (
        <div className="shell">
            <SectionEyebrow label={label} />
            <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-10">
                <h1 className="display text-[clamp(2rem,4.6vw,3.25rem)] uppercase leading-[0.92] md:col-span-7">
                    {title}
                </h1>
                <div className="prose self-start text-sm md:col-span-4 md:col-start-9">{lead}</div>
            </div>
        </div>
    );
}
