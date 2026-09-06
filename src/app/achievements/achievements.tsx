import Navbar from "@/components/navbar";
import PageHead from "@/components/page-head";
import achievements from "@/data/achievements";

const years = achievements.map((a) => a.year);
const span = `${Math.min(...years)} and ${Math.max(...years)}`;

/* An index, not a grid. Each entry is anchored by an oversized year;
 * the spacing between entries does the separating, no rules involved.
 * The year + placement stack ABOVE the heading, never beside it. */
export default function Achievements() {
    return (
        <>
            <Navbar page="achievements" />

            <main className="pt-14 pb-4 md:pt-20">
                <PageHead
                    label="Awards"
                    title={<>Competitions, and<br />what they asked for<span className="text-accent">.</span></>}
                    lead={
                        <p>
                            {achievements.length} placements between {span}, mostly LKS SMK web
                            technology, one hackathon. Each one lists the modules I actually had
                            to build.
                        </p>
                    }
                />

                <ol className="shell mt-16 flex flex-col gap-14 md:gap-20">
                    {achievements.map((a, idx) => (
                        <li key={idx} className="grid gap-y-4 md:grid-cols-12 md:gap-x-10">
                            <p className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:items-start md:gap-2">
                                <span className="display tnum text-3xl leading-none md:text-[3.5rem]">
                                    {a.year}
                                </span>
                                <span className="label text-accent-text">
                                    {/^\d/.test(a.rank) ? `${a.rank} place` : a.rank}
                                </span>
                            </p>

                            <div className="md:col-span-8 md:col-start-5">
                                <h2 className="display-sm text-xl md:text-2xl">{a.event}</h2>
                                <p className="label mt-2">{a.category}</p>

                                <ul className="mt-6 flex flex-col gap-3">
                                    {a.tasks.map((t, i) => (
                                        <li key={i} className="text-sm leading-relaxed text-muted">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ol>
            </main>
        </>
    );
}
