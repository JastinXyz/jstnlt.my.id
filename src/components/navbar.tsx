'use client'

import { cn } from "@/lib/cn";
import socials from "@/data/socials";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeSwitch from "./theme-switch";

type page = 'home' | 'achievements' | 'projects' | 'guestbook';

const links: { href: string; label: string; page: page }[] = [
    { href: '/', label: 'home', page: 'home' },
    { href: '/projects', label: 'open source', page: 'projects' },
    { href: '/achievements', label: 'awards', page: 'achievements' },
    { href: '/guestbook', label: 'guestbook', page: 'guestbook' },
];

/* One row, sticky, and translucent once it sticks: the page keeps showing
 * through it, which suits a site with no shadows and no depth anywhere else.
 *
 * One row. The mark is his own drawing, cropped to the head, on the accent:
 * the character is what this site has instead of a logo, so it is the thing
 * that gets carried to every page. Hovering it swaps in the head from the 404
 * pose, which is a plain CSS class swap, no JS.
 *
 * The masthead this replaced set his name twice the size of the headline
 * underneath it, and cost 200px before any content began.
 *
 * `lost` shows the confused head by default; the 404 page passes it. */
export default function Navbar({ page, lost = false }: { page?: page; lost?: boolean }) {
    const [stuck, setStuck] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);

    /* Reading down, the bar gets out of the way; reading back up, it returns.
     * A bar that stays put covers a strip of every section you scroll past,
     * and translucent made it worse: the display type smeared through it.
     *
     * Lenis animates the real scroll position, so a plain scroll listener sees
     * it. rAF-throttled, because this fires on every animated frame. */
    useEffect(() => {
        let last = window.scrollY;
        let ticking = false;

        const read = () => {
            const y = window.scrollY;
            setStuck(y > 8);
            /* 6px of slack: a trackpad's jitter should not flip the bar */
            if (Math.abs(y - last) > 6) {
                setHidden(y > last && y > 140);
                last = y;
            }
            ticking = false;
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(read);
        };

        read();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Escape closes it, and so does growing past the breakpoint: the panel is
     * only ever mounted below md, and leaving it open while the inline nav
     * takes over would strand a menu nobody can see.
     *
     * The page underneath is frozen while it is open. Lenis animates the real
     * scroll position, so overflow: hidden on the root stops it like anything
     * else, and the drawer scrolls on its own. */
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        const mq = window.matchMedia("(min-width: 48rem)");
        const onWide = () => mq.matches && setOpen(false);
        const root = document.documentElement;
        const prev = root.style.overflow;
        root.style.overflow = "hidden";

        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onWide);
        return () => {
            root.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onWide);
        };
    }, [open]);

    return (
        <header
            className={cn(
                /* mt, not pt: the gap is only there at rest. Once the bar sticks,
                   the margin has scrolled away and it sits flush with the edge. */
                /* `transition`, not a hand-listed property: v4 drives these utilities
                   through `translate`, so transitioning `transform` alone animates
                   nothing. The bar snapped instead of sliding. */
                "sticky top-0 z-[200] mt-4 transition md:mt-6",
                /* asymmetric on purpose: leaving is a background event and can
                   take its time, coming back is a response to the reader and
                   has to feel immediate */
                hidden ? "duration-[550ms] ease-in" : "duration-200 ease-out",
                /* opaque once it sticks: anything translucent lets the display
                   type slide through it and read as a smear */
                stuck || open ? "bg-paper" : "bg-transparent",
                /* underscores, not spaces: calc needs whitespace around +, and an
                   invalid arbitrary value makes Tailwind drop the class entirely */
                hidden && !open && "-translate-y-[calc(100%_+_1.5rem)] opacity-0"
            )}
        >
            <div className="shell flex flex-wrap items-center gap-x-5 gap-y-3 py-2.5 md:py-3">
                <Link href="/" aria-label="jstnlt, home" className="group flex items-center gap-3">
                    {/* smaller on a phone: at 52px the mark plus his name pushed the four
                       links onto a second row and the bar grew to 130px */}
                    <span className="relative block size-11 shrink-0 overflow-hidden rounded-full bg-accent md:size-[52px]">
                        <img
                            src="/char/avatar-idle.webp"
                            alt="Jastin Linggar Tama, drawn"
                            width={256}
                            height={256}
                            className={cn(
                                "absolute inset-0 size-full transition-opacity duration-150",
                                lost ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                            )}
                        />
                        <img
                            src="/char/avatar-404.webp"
                            alt=""
                            width={256}
                            height={256}
                            className={cn(
                                "absolute inset-0 size-full transition-opacity duration-150",
                                lost ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}
                        />
                    </span>
                    <span>
                        <span className="display-sm block text-base transition-colors duration-150 group-hover:text-accent-text md:text-md">
                            Jastin Linggar Tama
                        </span>
                        <span className="label mt-0.5 hidden sm:block">Fullstack developer</span>
                    </span>
                </Link>

                {/* the inline row from md up */}
                <nav aria-label="Primary" className="ml-auto hidden items-center gap-x-5 md:flex">
                    {links.map((l) => {
                        const active = page === l.page;
                        return (
                            <Link
                                key={l.page}
                                href={l.href}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    "label group relative whitespace-nowrap pb-1 transition-colors duration-150",
                                    active ? "text-accent-text" : "hover:text-ink"
                                )}
                            >
                                {l.label}
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-300 ease-out",
                                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    )}
                                />
                            </Link>
                        );
                    })}
                    <ThemeSwitch />
                </nav>

                {/* and a button below it. Four links plus the theme toggle do not
                    fit next to the mark on a phone: they wrapped to a second row
                    and the bar grew to 130px. */}
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="primary-menu"
                    aria-label={open ? "Close menu" : "Open menu"}
                    className="ml-auto grid size-11 place-items-center rounded-xs transition-colors duration-150 hover:text-accent-text md:hidden"
                >
                    {open ? <IconX size={20} aria-hidden="true" /> : <IconMenu2 size={20} aria-hidden="true" />}
                </button>
            </div>

            {/* A drawer, not a dropdown: on a phone the whole screen is the
                menu, so the links get to be display type instead of labels.
                Kept mounted so it can animate, and hidden from assistive tech
                and from the tab order while it is closed. */}
            <div
                id="primary-menu"
                className={cn(
                    /* transition-[translate,...], not transform: v4 drives these
                       utilities through the `translate` property, so naming
                       transform animates nothing and the panel jumps */
                    "fixed inset-0 z-[210] bg-paper transition-[translate,opacity] md:hidden",
                    /* slower on the way out: opening answers a tap and has to
                       feel immediate, closing is the room emptying */
                    open
                        ? "translate-x-0 opacity-100 duration-[380ms] ease-out"
                        : "pointer-events-none translate-x-full opacity-0 duration-[380ms] ease-in-out"
                )}
                aria-hidden={!open}
                inert={!open}
            >
                <div className="relative flex h-full flex-col overflow-y-auto">
                    <div className="shell flex items-center justify-end py-3">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="label flex min-h-11 items-center gap-2 transition-colors duration-150 hover:text-accent-text"
                        >
                            Close <IconX size={18} aria-hidden="true" />
                        </button>
                    </div>

                    <nav aria-label="Primary" className="shell mt-6">
                        <ul className="flex flex-col gap-4">
                            {links.map((l, i) => {
                                const active = page === l.page;
                                return (
                                    <li key={l.page}>
                                        <Link
                                            href={l.href}
                                            onClick={() => setOpen(false)}
                                            aria-current={active ? "page" : undefined}
                                            style={{ transitionDelay: open ? `${120 + i * 60}ms` : `${(links.length - 1 - i) * 40}ms` }}
                                            className={cn(
                                                "block py-1 transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none",
                                                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                                            )}
                                        >
                                            {/* the number sits in front on a rule, the way every
                                                section head on this site is set. Floating it above
                                                the word is the templated-editorial tell. */}
                                            <span className="label flex items-center gap-3">
                                                <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
                                                <span aria-hidden="true" className="h-px w-6 shrink-0 bg-rule-strong" />
                                            </span>
                                            <span
                                                className={cn(
                                                    "display mt-1 block text-[clamp(2rem,10vw,3rem)] uppercase leading-[0.95] transition-colors duration-150",
                                                    active ? "text-accent" : "hover:text-accent-text",
                                                )}
                                            >
                                                {l.label}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* leaning on the panel edge, because the panel has one. Standing or
                        waving here would just be a sticker in a corner. */}
                    <img
                        src="/char/frame-lean.webp"
                        alt=""
                        width={307}
                        height={1038}
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 bottom-0 h-[46vh] max-h-[420px] w-auto"
                    />

                    <div className="shell relative mt-auto py-8">
                        <p className="label text-accent-text">Elsewhere</p>
                        <ul className="mt-3 flex max-w-[60%] flex-wrap gap-x-6 gap-y-2">
                            {socials.map((sc) => (
                                <li key={sc.label}>
                                    <a
                                        href={sc.href}
                                        target="_blank"
                                        rel="me noopener noreferrer"
                                        className="display-sm text-md transition-colors duration-150 hover:text-accent-text"
                                    >
                                        {sc.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 flex min-h-11 items-center">
                            <ThemeSwitch />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
