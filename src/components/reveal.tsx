"use client";

import { useEffect, useRef } from "react";

/* One observer per element, released the moment it fires.
 *
 * Everything here is a reaction to how this failed the first time:
 *
 * - nothing is measured, so images loading late cannot invalidate it;
 * - no threshold, only a negative bottom margin, because a threshold is
 *   unreliable once the root has been shrunk;
 * - anything already on screen at mount is released immediately and never
 *   transitions, so the hero cannot flash;
 * - it fires once and unobserves, so scrolling back up does not replay it;
 * - the parked state lives in CSS, gated on .js-motion, so there is no flash
 *   before hydration and no hidden content if the script never runs;
 * - reduced motion opts out entirely, releasing without a transition.
 */
export default function Reveal({
    children,
    className,
    as: Tag = "div",
    stagger = false,
    always = false,
}: {
    children: React.ReactNode;
    className?: string;
    as?: "div" | "section" | "ul" | "ol" | "p" | "h1" | "h2" | "h3" | "span";
    stagger?: boolean;
    /** run even when it is already on screen at load, for the few things whose
     *  motion is the point rather than an entrance */
    always?: boolean;
}) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const release = () => el.classList.add("is-in");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            release();
            return;
        }

        /* already in view when the page loads: no animation at all, or the
           first screen blinks on arrival. `always` opts out, because a bar that
           fills is the measurement itself, and a reload part way down the page
           should not turn it into a static block. */
        if (!always && el.getBoundingClientRect().top < window.innerHeight * 0.9) {
            el.classList.add("no-rise");
            release();
            return;
        }

        if (always && el.getBoundingClientRect().top < window.innerHeight * 0.9) {
            /* one frame late, so the browser has painted the parked state first
               and has something to transition from */
            const t = window.setTimeout(release, 60);
            return () => window.clearTimeout(t);
        }

        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (!e.isIntersecting) continue;
                    release();
                    io.unobserve(e.target);
                }
            },
            /* -22%: late enough that the motion happens where you are looking,
               early enough that a section with a second of duration and a
               stagger behind it has finished by the time it reaches the middle
               of the screen */
            { rootMargin: "0px 0px -22% 0px" },
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    const Element = Tag as React.ElementType;
    return (
        <Element ref={ref} className={className} {...(stagger ? { "data-stagger": "" } : {})}>
            {children}
        </Element>
    );
}
