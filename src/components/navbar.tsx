'use client'

import { cn } from "@/lib/cn";
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
                stuck ? "bg-paper" : "bg-transparent",
                /* underscores, not spaces: calc needs whitespace around +, and an
                   invalid arbitrary value makes Tailwind drop the class entirely */
                hidden && "-translate-y-[calc(100%_+_1.5rem)] opacity-0"
            )}
        >
            <div className="shell flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
                <Link href="/" aria-label="jstnlt, home" className="group flex items-center gap-3">
                    <span className="relative block size-[52px] shrink-0 overflow-hidden rounded-full bg-accent">
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
                        <span className="display-sm block text-base transition-colors duration-150 group-hover:text-accent-text">
                            Jastin Linggar Tama
                        </span>
                        <span className="label mt-0.5 block">Fullstack developer</span>
                    </span>
                </Link>

                <nav aria-label="Primary" className="ml-auto flex flex-wrap items-center gap-x-6 gap-y-2">
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
            </div>
        </header>
    );
}
