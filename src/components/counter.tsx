"use client"

import { useEffect, useState } from "react";

type CounterProps = {
    value: number;
    /** animation length in ms */
    duration?: number;
    className?: string;
};

/**
 * Counts up to `value` on mount with an ease-out curve.
 * Renders the FINAL value on the server, so the markup is truthful with
 * JS disabled; the climb only starts once the client takes over.
 */
export default function Counter({ value, duration = 1400, className }: CounterProps) {
    const [display, setDisplay] = useState(value);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplay(value);
            return;
        }

        let raf = 0;
        let start: number | null = null;
        setDisplay(0);

        const tick = (now: number) => {
            if (start === null) start = now;
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(value * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [value, duration]);

    return <span className={className}>{display.toLocaleString("en-US")}</span>;
}
