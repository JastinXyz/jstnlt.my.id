import Character from "@/components/character";
import ContactForm from "@/components/contact-form";
import CommitField from "@/components/commit-field";
import ContributionGraph from "@/components/contribution-graph";
import Counter from "@/components/counter";
import SectionEyebrow from "@/components/section-eyebrow";
import Navbar from "@/components/navbar";
import Reveal from "@/components/reveal";
import RevealLines from "@/components/reveal-lines";
import Stagger from "@/components/stagger";
import achievements, { LKS_NOTE } from "@/data/achievements";
import highlights from "@/data/highlights";
import { about, affandra, experience, positioning, productionWork, stack } from "@/data/profile";
import socials from "@/data/socials";
import { getAllRepos, getContributions, getOrgLanguages, getRepos, ogCard, totalsFrom } from "@/lib/github";
import { languageColor } from "@/data/language-colors";
import Link from "next/link";
import Marked from "@/components/marked";
import RankBadge from "@/components/rank-badge";

export const revalidate = 3600;

export default async function Home() {
    const [repos, allRepos, contributions, orgLanguages] = await Promise.all([
        getRepos(),
        getAllRepos(),
        getContributions(),
        getOrgLanguages(),
    ]);
    /* the hero counts every public repo, hidden ones included: the star count is
       a fact about his GitHub, not about what this site chooses to show */
    const totals = totalsFrom(allRepos);
    const byFullName = new Map(repos.map((r) => [r.fullName, r]));
    const firstPlaces = achievements.filter((a) => a.rank === "1st").length;
    /* two featured, not one: stars and servers do not explain each other */
    const [a, b, ...rest] = highlights;
    const featured = [a, b].filter(Boolean);
    const lks = achievements.filter((a) => a.event.includes("LKS"));
    /* The strongest thing in this list is not the count, it is that one year ran the
     * whole ladder: regency, province, then the national final. */
    const national = achievements.find((a) => a.event.includes("National"));
    const ladder = national
        ? achievements.filter((a) => a.rank === "1st" && a.year === national.year).length
        : 0;
    const otherComps = achievements.filter((a) => !a.event.includes("LKS"));

    return (
        <>
            <Navbar page="home" />

            <main>
                {/* ── 1 · hero, his own strongest line, not a job title ──*/}
                <section className="shell pt-10 pb-8 md:pt-16 md:pb-12">
                    {/* Everything written sits in seven columns, figures included, so the
                        drawing gets the other five for its whole height. He stretches to
                        the row rather than carrying a fixed height: neither side can then
                        leave a gap above the other. */}
                    <div className="grid items-end gap-x-10 md:grid-cols-12">
                        <div className="md:col-span-7">
                            <RevealLines
                                as="h1"
                                text={positioning.headline}
                                className="display block text-[clamp(2rem,4.6vw,3.25rem)] uppercase leading-[0.92]"
                            />
                            <p className="display-sm mt-6 text-lg text-accent-text md:text-xl">
                                {positioning.subject}
                            </p>
                            <p className="prose mt-6">{positioning.role}</p>

                            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 md:mt-14 md:grid-cols-4">
                                <div>
                                    <p className="display tnum text-2xl leading-none md:text-3xl">2020</p>
                                    <p className="label mt-2">Coding since</p>
                                </div>
                                <div>
                                    <p className="display tnum text-2xl leading-none md:text-3xl">{firstPlaces}</p>
                                    <p className="label mt-2">First place</p>
                                </div>
                                <div>
                                    <p className="display tnum text-2xl leading-none md:text-3xl">
                                        <Counter value={totals.stars} />
                                    </p>
                                    <p className="label mt-2">GitHub stars</p>
                                </div>
                                <div>
                                    <p className="display tnum text-2xl leading-none md:text-3xl">
                                        <Counter value={contributions?.total ?? 0} />
                                    </p>
                                    <p className="label mt-2">Commits, 12 mo</p>
                                </div>
                            </div>
                        </div>

                        <Character
                            variant="hero"
                            className="char mt-10 h-[260px] justify-self-center md:col-span-5 md:mt-0 md:h-full md:self-stretch"
                        />
                    </div>
                </section>

                {contributions && (
                    <div className="shell pb-14 md:pb-20">
                        <CommitField data={contributions} />
                    </div>
                )}

                {/* ── 2 · what I actually do ─────────────────────────────*/}
                <section id="what-i-do" className="shell py-16 md:py-24">
                    <SectionEyebrow index={1} label="What I do" />
                    <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
                        <div className="prose flex flex-col gap-5 md:col-span-7">
                            {about.map((p, i) => (
                                <p key={i} className={i === 0 ? "text-md text-ink md:text-lg" : undefined}>
                                    {p}
                                </p>
                            ))}
                        </div>

                        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-4 md:col-start-9">
                            {stack.map((g) => (
                                <div key={g.group}>
                                    <dt className="label">{g.group}</dt>
                                    {/* chips, not a joined string: wrapping a "·" list breaks
                                        mid-word and leaves separators hanging at line ends */}
                                    <dd className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5">
                                        {g.items.map((it) => (
                                            <span
                                                key={it}
                                                className="display-sm whitespace-nowrap rounded-xs bg-paper-3 px-2 py-0.5 text-sm"
                                            >
                                                {it}
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* ── 3 · open source. Two are featured, not one: ckptw is
                       measured in stars, Katla in servers, and neither number
                       explains the other. The rest stay an index. ─────────*/}
                <section id="open-source" className="bg-paper-2 py-16 md:py-24">
                    <div className="shell">
                        <SectionEyebrow index={2} label="Open source" />
                        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                            <RevealLines
                                as="h2"
                                trigger="scroll"
                                text="Things other people run"
                                className="display block text-[clamp(1.75rem,4.5vw,3rem)] uppercase leading-none"
                            />
                            <Link href="/projects" className="label whitespace-nowrap transition-colors duration-150 hover:text-accent-text">
                                All the work <span aria-hidden="true">→</span>
                            </Link>
                        </div>

                        <Stagger className="mt-10 grid gap-3 md:grid-cols-2">
                            {featured.map((h) => {
                                const live = h.repo ? byFullName.get(h.repo) : undefined;
                                const shot = h.image ?? (h.repo ? ogCard(h.repo) : null);
                                return (
                                    <article key={h.name} className="flex flex-col bg-paper">
                                        <Link href={h.href} target="_blank" rel="noopener noreferrer" className="group block">
                                            {shot && (
                                                <img
                                                    src={shot}
                                                    alt=""
                                                    loading="lazy"
                                                    className="aspect-[2/1] w-full object-cover"
                                                />
                                            )}
                                        </Link>
                                        <div className="flex flex-1 flex-col p-6 md:p-8">
                                            <p className="display tnum text-3xl leading-none md:text-5xl">
                                                {live ? live.stars : h.metric}
                                                {live && (
                                                    <span className="ml-3 align-middle text-base text-accent-text md:text-xl">★</span>
                                                )}
                                            </p>
                                            <p className="label mt-2">{h.metricLabel}</p>

                                            <h3 className="display-sm mt-6 text-xl md:text-2xl">
                                                <Link
                                                    href={h.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="transition-colors duration-150 hover:text-accent-text"
                                                >
                                                    {h.name}
                                                </Link>
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed">{h.what}</p>
                                            <p className="mt-4 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
                                                {h.decision}
                                            </p>

                                            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
                                                {h.repo && (
                                                    <Link href={h.href} target="_blank" rel="noopener noreferrer"
                                                        className="label whitespace-nowrap transition-colors duration-150 hover:text-accent-text">
                                                        Source <span aria-hidden="true">↗</span>
                                                    </Link>
                                                )}
                                                {h.live && (
                                                    <Link href={h.live} target="_blank" rel="noopener noreferrer"
                                                        className="label whitespace-nowrap transition-colors duration-150 hover:text-accent-text">
                                                        Live <span aria-hidden="true">↗</span>
                                                    </Link>
                                                )}
                                                {!h.repo && !h.live && (
                                                    <Link href={h.href} target="_blank" rel="noopener noreferrer"
                                                        className="label whitespace-nowrap transition-colors duration-150 hover:text-accent-text">
                                                        Live <span aria-hidden="true">↗</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </Stagger>

                        <Stagger className="mt-3 flex flex-col">
                            {rest.map((h) => {
                                const shot = h.image ?? (h.repo ? ogCard(h.repo) : null);
                                return (
                                    <Link
                                        key={h.name}
                                        href={h.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group grid grid-cols-[88px_1fr] items-center gap-x-6 gap-y-2 border-t border-rule py-5 md:grid-cols-[88px_4fr_5fr_3fr_1fr]"
                                    >
                                        {shot ? (
                                            <img src={shot} alt="" loading="lazy" className="aspect-[16/10] w-[88px] object-cover" />
                                        ) : (
                                            <span className="label grid aspect-[16/10] w-[88px] place-items-center bg-paper-3">bot</span>
                                        )}
                                        <span className="display-sm min-w-0 text-lg break-words transition-colors duration-150 group-hover:text-accent-text">
                                            {h.name}
                                        </span>
                                        <span className="col-start-2 text-sm text-muted md:col-start-auto">
                                            {h.what.split(".")[0]}.
                                        </span>
                                        {/* the authored line, not the star count: "8 stars"
                                            says less about s3-explorer than "0 credentials stored" */}
                                        <span className="label col-start-2 md:col-start-auto">{h.short}</span>
                                        <span aria-hidden="true" className="label hidden text-right transition-colors duration-150 group-hover:text-accent-text md:block">
                                            ↗
                                        </span>
                                    </Link>
                                );
                            })}
                        </Stagger>
                    </div>
                </section>

                {/* ── 4 · his own practice, longer than the day job and
                       entirely his, so it goes first. ────────────────────*/}
                <section id="on-my-own" className="shell py-16 md:py-24">
                    <SectionEyebrow index={3} label="On my own" />
                    <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-10">
                        <RevealLines
                            as="h2"
                            trigger="scroll"
                            text={affandra.name}
                            /* The name is short enough to sit on one line, which left this
                               heading a third the height of every other one. Capped from md
                               up so it breaks after "Solusi", the way the other headings
                               run; on a phone the cap is off and it stays one line, because
                               two lines of it there is most of the screen. */
                            className="display block text-[clamp(1.75rem,4.5vw,3rem)] uppercase leading-[0.95] md:col-span-7 md:max-w-[13ch]"
                        />
                        <div className="self-start md:col-span-4 md:col-start-9">
                            <p className="label">{affandra.period}</p>
                            <p className="prose mt-2 text-sm">{affandra.kind}</p>
                        </div>
                    </div>

                    <p className="prose mt-8 text-md text-ink md:text-lg">{affandra.lead}</p>
                    <p className="prose mt-4 text-md">{affandra.team}</p>

                    {/* counted up rather than moved: these are numbers, and a number
                        that climbs to its value is the only motion that says anything
                        about it. The suffix is split off so "4 yrs" still counts. */}
                    <div className="mt-10 grid grid-cols-3 gap-x-6">
                        {affandra.figures.map((f) => {
                            const n = parseInt(f.value, 10);
                            const suffix = f.value.replace(/^[\d,.]+/, "");
                            return (
                                <div key={f.label}>
                                    <p className="display tnum text-xl leading-none md:text-4xl">
                                        {Number.isNaN(n) ? f.value : <><Counter value={n} />{suffix}</>}
                                    </p>
                                    <p className="label mt-2">{f.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* What the org is written in, counted live across all of it. This is
                        the one place the site carries hues outside its accent: here the
                        colour is the label, so it is GitHub's own. Every swatch takes a
                        hairline ring because JavaScript yellow on paper is about 1.4:1 and
                        would otherwise read as a gap. */}
                    {orgLanguages.length > 0 && (
                        <Reveal className="mt-10" always>
                            <div data-bar className="flex h-11 w-full overflow-hidden rounded-xs">
                                {orgLanguages.map((l) => (
                                    <span
                                        key={l.name}
                                        title={`${l.name}, ${l.pct}%`}
                                        style={{ width: `${l.share * 100}%`, background: languageColor(l.name) }}
                                    />
                                ))}
                            </div>
                            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                                {orgLanguages.map((l) => (
                                    <li key={l.name} className="flex items-center gap-2 text-sm text-muted">
                                        <span
                                            aria-hidden="true"
                                            className="size-2.5 shrink-0 rounded-[2px] ring-1 ring-rule-strong/40"
                                            style={{ background: languageColor(l.name) }}
                                        />
                                        {l.name} <span className="tnum text-ink">{l.pct}%</span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    )}

                    <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
                        {affandra.items.map((it) => (
                            <div key={it.title} className="border-t border-rule pt-5">
                                <h3 className="display-sm text-lg">{it.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted">{it.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 5 · the team job, second thread, named once ───────*/}
                <section id="on-a-team" className="bg-paper-2 py-16 md:py-24">
                    <div className="shell">
                        <SectionEyebrow index={4} label="On a team" />
                        <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-10">
                            <RevealLines
                                as="h2"
                                trigger="scroll"
                                text="Things that break someone's day when they are wrong, not a pipeline"
                                className="display block text-[clamp(1.75rem,4.5vw,3rem)] uppercase leading-[0.95] md:col-span-7"
                            />
                            <p className="prose self-start text-md md:col-span-4 md:col-start-9">
                                <Marked text={productionWork.lead} phrase={productionWork.leadMark} />
                            </p>
                        </div>

                        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
                            {productionWork.items.map((it) => (
                                <div key={it.title} className="border-t border-rule pt-5">
                                    <h3 className="display-sm text-lg">{it.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted">
                                        <Marked text={it.body} phrase={it.mark} />
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-14">
                            <p className="label">Timeline</p>
                            <ul className="mt-4 flex flex-col">
                                {experience.map((r) => (
                                    <li
                                        key={r.title + r.period}
                                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule py-3"
                                    >
                                        <span className="display-sm text-md">{r.title}</span>
                                        <span className="label whitespace-nowrap">
                                            {r.period} <span aria-hidden="true">·</span> {r.length}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            {/* the one place the employer is named, so it is named in
                                full rather than as the short form only he would know */}
                            <p className="label mt-4">
                                All three at <span className="text-ink">PT Cazh Teknologi Inovasi</span>, Purwokerto
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── 6 · the calendar ───────────────────────────────────*/}
                {contributions && (
                    <>
                        <section id="commits" className="shell py-16 md:py-24">
                            <SectionEyebrow index={5} label="Every day this year" />
                            <div>
                                <h2 className="display text-[clamp(1.75rem,4.5vw,3rem)] uppercase leading-none">
                                    <Counter value={contributions.total} /> commits
                                </h2>
                                <p className="prose mt-4 mb-10 text-md">
                                    Twelve months, read live from GitHub. Work and open source together.
                                </p>
                                <Reveal always>
                                    <ContributionGraph data={contributions} />
                                </Reveal>
                            </div>
                        </section>
                    </>
                )}

                {/* ── 7 · competitions, LKS and the hackathon are different
                       things, so the LKS note only sits over the LKS group. */}
                <section id="competitions" className="bg-paper-2 py-16 md:py-24">
                    <div className="shell">
                        <SectionEyebrow index={6} label="Competitions" />
                        {/* Same head as the other sections: heading in seven columns,
                            the line that qualifies it bottom-aligned in the last four. */}
                        <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-10">
                            <RevealLines
                                as="h2"
                                trigger="scroll"
                                text="Won the regency, won the province, then the national final, all in one year"
                                className="display block text-[clamp(1.75rem,4.5vw,3rem)] uppercase leading-[0.95] md:col-span-7"
                            />

                            {national && ladder >= 2 && (
                                <p className="prose self-start text-sm md:col-span-4 md:col-start-9">
                                    {national.year} ran the whole ladder: first at regency level, first
                                    in Central Java, then{" "}
                                    <Reveal as="span" className="mark">{national.rank.toLowerCase()} in the country</Reveal> in{" "}
                                    {national.category}, with a Medallion of Excellence for work that
                                    cleared the standard rather than for the placing alone.
                                </p>
                            )}
                        </div>

                        <div className="mt-12 grid gap-y-4 md:grid-cols-12 md:gap-x-10">
                            <p className="label md:col-span-3">LKS SMK <span className="text-accent-text">{lks.length}</span></p>
                            <p className="prose text-sm md:col-span-8 md:col-start-5">{LKS_NOTE}</p>
                        </div>

                        <div className="mt-6 flex flex-col">
                            {lks.map((a, i) => (
                                <div key={i} className="grid gap-x-10 gap-y-3 border-t border-rule py-7 md:grid-cols-12">
                                    <p className="flex flex-wrap items-center gap-3 md:col-span-3 md:flex-col md:items-start">
                                        <span className="display tnum text-2xl leading-none md:text-4xl">{a.year}</span>
                                        <RankBadge rank={a.rank} />
                                    </p>
                                    <div className="md:col-span-8 md:col-start-5">
                                        <h3 className="display-sm text-lg">{a.event}</h3>
                                        <p className="label mt-1">{a.category} <span aria-hidden="true">·</span> {a.issuer}</p>
                                        {a.note && <p className="mt-3 text-sm leading-relaxed text-muted">{a.note}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {otherComps.length > 0 && (
                            <>
                                <p className="label mt-14">Outside LKS</p>
                                <div className="mt-4 flex flex-col">
                                    {otherComps.map((a, i) => (
                                        <div key={i} className="grid gap-x-10 gap-y-3 border-t border-rule py-7 md:grid-cols-12">
                                            <p className="flex flex-wrap items-center gap-3 md:col-span-3 md:flex-col md:items-start">
                                                <span className="display tnum text-2xl leading-none md:text-4xl">{a.year}</span>
                                                <RankBadge rank={a.rank} />
                                            </p>
                                            <div className="md:col-span-8 md:col-start-5">
                                                <h3 className="display-sm text-lg">{a.event}</h3>
                                                <p className="label mt-1">{a.category} <span aria-hidden="true">·</span> {a.issuer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        <Link href="/achievements" className="label mt-10 inline-flex whitespace-nowrap transition-colors duration-150 hover:text-accent-text">
                            What each one asked me to build <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </section>

                {/* ── 8 · contact ────────────────────────────────────────*/}
                <section id="contact" className="bg-panel py-16 text-on-panel md:py-24">
                    <div className="shell grid gap-12 md:grid-cols-12 md:gap-x-10">
                        <div className="md:col-span-5">
                            <SectionEyebrow onInk index={7} label="Say hello" />
                            <h2 className="display text-[clamp(2rem,6vw,4rem)] uppercase leading-[0.92]">
                                {/* three deliberate lines from md up; on a phone the breaks
                                    are off and it wraps on its own, because forced lines that
                                    short leave a column of stubs */}
                                Let’s build{" "}
                                <br className="hidden md:block" />
                                something{" "}
                                <br className="hidden md:block" />
                                together
                            </h2>
                            <p className="mt-6 max-w-[36ch] leading-relaxed text-on-panel-muted">
                                Open to talking about backend work, system design, and anything
                                around education or payments.
                            </p>

                            {/* the only thing that moves in the contact block: five links
                                arriving one after another, which reads as a list being
                                handed over rather than a panel that animates */}
                            <Stagger className="mt-10 flex flex-col gap-3">
                                {socials.map(({ href, label, handle, icon: Icon }) => (
                                    <Link key={label} href={href} target="_blank" rel="me noopener noreferrer"
                                        className="group flex items-center gap-3">
                                        <Icon aria-hidden="true" className="h-4 w-4 shrink-0 transition-colors duration-150 group-hover:text-accent-on-panel" />
                                        <span className="label whitespace-nowrap text-on-panel transition-colors duration-150 group-hover:text-accent-on-panel">
                                            {label}
                                        </span>
                                        <span className="truncate text-xs text-on-panel-muted">{handle}</span>
                                    </Link>
                                ))}
                            </Stagger>
                        </div>

                        <ContactForm className="md:col-span-6 md:col-start-7" />
                    </div>
                </section>
            </main>
        </>
    );
}
