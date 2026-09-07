"use client"

import { useEffect, useRef, useState } from "react";

type CounterProps = {
    value: number;
    /** animation length in ms */
    duration?: number;
    className?: string;
};

/**
 * Counts up to `value` when it reaches the screen, not when the page loads.
 *
 * The figures in the hero are on screen at load, so for them the two are the
 * same thing. The ones further down are not: counting them on mount means the
 * climb is over long before anyone scrolls to it, and all that arrives is a
 * static number that went to the trouble of animating in an empty room.
 *
 * The final value is rendered on the server, so the markup is truthful with
 * JavaScript disabled and nothing shifts when the client takes over.
 */
export default function Counter({ value, duration = 1400, className }: CounterProps) {
    const [display, setDisplay] = useState(value);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let raf = 0;
        let start: number | null = null;

        const run = () => {
            setDisplay(0);
            const tick = (now: number) => {
                start ??= now;
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                setDisplay(Math.round(value * eased));
                if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (!e.isIntersecting) continue;
                    io.unobserve(e.target);
                    run();
                }
            },
            /* a little less eager than the section reveal: a number that starts
               counting while it is still a sliver on screen finishes unseen */
            { rootMargin: "0px 0px -15% 0px" },
        );

        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [value, duration]);

    return (
        <span ref={ref} className={className}>
            {display.toLocaleString("en-US")}
        </span>
    );
}
