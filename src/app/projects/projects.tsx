import Navbar from "@/components/navbar";
import PageHead from "@/components/page-head";
import SectionHead from "@/components/section-head";
import Stagger from "@/components/stagger";
import highlights from "@/data/highlights";
import { getRepos, ogCard } from "@/lib/github";
import Link from "next/link";

/* Read live from GitHub, minus the list curated out in lib/github.ts.
 *
 * Two tiers, because a page of identical cards is a wall and star order tells the
 * wrong story: the most-starred things here are templates and bots from 2021
 * and 2022, while the work from this year sits in the middle of the grid.
 * So a handful get a card, and everything else is a table sorted newest
 * first, dated by when each project started. */
export default async function Projects() {
    const repos = await getRepos();
    const byName = new Map(repos.map((r) => [r.name, r]));

    /* the featured set is the one already curated by hand for the home page,
       kept in the same order, minus anything without a repo */
    const shots = new Map(highlights.filter((h) => h.repo).map((h) => [h.repo!.split("/")[1], h.image]));
    const featured = [...shots.keys()].map((n) => byName.get(n)).filter((r): r is NonNullable<typeof r> => !!r);
    const featuredNames = new Set(featured.map((r) => r.name));

    const rest = repos
        .filter((r) => !featuredNames.has(r.name))
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    /* the year a thing started, not the last time it was touched: a one-line
       fix push in 2026 does not make a 2021 bot a 2026 project */
    const year = (iso: string) => new Date(iso).getFullYear();

    return (
        <>
            <Navbar page="projects" />

            <main className="pt-10 md:pt-14">
                <PageHead
                    label="Open source"
                    title={<>Everything I built<br />and kept<span className="text-accent">.</span></>}
                    lead={
                        <p>
                            The ones I would still put my name on. Read live from GitHub, so
                            what is here is what is there. The rest of the archive stays on
                            GitHub, where it belongs.
                        </p>
                    }
                />

                <div className="shell mt-14">
                    <SectionHead title="The ones with a face" />
                    <Stagger className="mt-8 grid gap-3 md:grid-cols-2">
                        {featured.map((repo) => {
                            const shot = shots.get(repo.name) ?? ogCard(repo.fullName);
                            return (
                                <article key={repo.name} className="flex flex-col bg-paper-2">
                                    <Link href={repo.url} target="_blank" rel="noopener noreferrer" className="block">
                                        <img
                                            src={shot}
                                            alt={`${repo.name} on GitHub`}
                                            loading="lazy"
                                            className="aspect-[2/1] w-full object-cover object-top"
                                        />
                                    </Link>
                                    <div className="flex flex-1 flex-col p-5 md:p-6">
                                        <h3 className="display-sm text-lg md:text-xl">
                                            <Link
                                                href={repo.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="transition-colors duration-150 hover:text-accent-text"
                                            >
                                                {repo.name}
                                            </Link>
                                            {repo.archived && <span className="label ml-3">archived</span>}
                                            {!repo.archived && repo.unmaintained && (
                                                <span className="label ml-3">unmaintained</span>
                                            )}
                                        </h3>
                                        {repo.description && (
                                            <p className="mt-2 text-sm leading-relaxed text-muted">{repo.description}</p>
                                        )}
                                        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
                                            <span className="label tnum">{repo.stars} stars</span>
                                            <span className="label tnum">{repo.forks} forks</span>
                                            {repo.language && <span className="label">{repo.language}</span>}
                                            <span className="label tnum">{year(repo.createdAt)}</span>
                                            {repo.homepage && (
                                                <Link
                                                    href={repo.homepage}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="label ml-auto whitespace-nowrap transition-colors duration-150 hover:text-accent-text"
                                                >
                                                    Live <span aria-hidden="true">↗</span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </Stagger>
                </div>

                <div className="shell mt-16 pb-6">
                    <SectionHead
                        title="Everything else"
                        lead="Newest first. The year is when I started it."
                    />
                    <Stagger className="mt-8 flex flex-col">
                        {rest.map((repo) => (
                            <Link
                                key={repo.fullName}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group grid gap-x-6 gap-y-1 border-t border-rule py-4 md:grid-cols-12 md:items-baseline"
                            >
                                <span className="display-sm text-md transition-colors duration-150 group-hover:text-accent-text md:col-span-3">
                                    {repo.name}
                                    {repo.archived && <span className="label ml-3">archived</span>}
                                    {!repo.archived && repo.unmaintained && (
                                        <span className="label ml-3">unmaintained</span>
                                    )}
                                </span>
                                <span className="text-sm text-muted md:col-span-5">{repo.description}</span>
                                <span className="label md:col-span-2">{repo.language}</span>
                                <span className="label tnum md:col-span-1 md:text-right">
                                    {repo.stars > 0 && `${repo.stars} ★`}
                                </span>
                                <span className="label tnum md:col-span-1 md:text-right">{year(repo.createdAt)}</span>
                            </Link>
                        ))}
                    </Stagger>

                    {/* the hidden ones are not a secret, they are just not a portfolio:
                        say so, and point at the place that has all of them */}
                    <p className="prose mt-10 text-sm">
                        This is a selection. Everything else, the experiments, the school
                        exercises and the things I wrote in one evening, is still public on{" "}
                        <Link
                            href="https://github.com/JastinXyz?tab=repositories"
                            target="_blank"
                            rel="me noopener noreferrer"
                            className="text-ink underline decoration-accent underline-offset-4 transition-colors duration-150 hover:text-accent-text"
                        >
                            github.com/JastinXyz
                        </Link>
                        .
                    </p>
                </div>
            </main>
        </>
    );
}
