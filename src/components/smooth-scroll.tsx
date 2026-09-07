"use client"

import { useEffect } from "react";
import Lenis from "lenis";

/* Lenis drives the page scroll. It animates the real scroll position rather
 * than transforming a wrapper, so IntersectionObserver, position: sticky and
 * the browser's own find-in-face all keep working.
 *
 * It also owns anchor jumps, which is why globals.css no longer sets
 * scroll-behavior: smooth, the two fight each other. */
export default function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            duration: 1.05,
            // gentle exponential ease-out, matching --ease-out in the tokens
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            touchMultiplier: 1.6,
        });

        let frame = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        /* same-page anchors go through Lenis so they ease instead of jumping */
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;

            const link = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
            const href = link?.getAttribute("href");
            if (!href?.startsWith("#")) return;

            const target = href === "#top" ? 0 : document.querySelector(href);
            if (target === null) return;

            e.preventDefault();
            lenis.scrollTo(target as number | HTMLElement, { offset: -40 });
        };

        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
            cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, []);

    return null;
}
