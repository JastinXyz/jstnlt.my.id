"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* One fixed-position tooltip for the whole calendar, driven by event
 * delegation on [data-tip].
 *
 * The previous version was a CSS ::after on each cell, which the calendar's
 * own overflow-x container clipped, and a pseudo-element is awkward to
 * animate. One fixed node escapes every ancestor's clipping, costs nothing
 * per cell, and can be clamped to the viewport at the edges. */

type Tip = { x: number; y: number; text: string };

const EDGE = 10;
const DELAY = 90;

export default function TipLayer() {
    const [tip, setTip] = useState<Tip | null>(null);
    const [shown, setShown] = useState(false);
    const [dx, setDx] = useState(0);
    const box = useRef<HTMLDivElement>(null);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => {
        const enter = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            const cell = (e.target as HTMLElement)?.closest?.("[data-tip]") as HTMLElement | null;
            if (!cell) return;

            const r = cell.getBoundingClientRect();
            setTip({ x: r.left + r.width / 2, y: r.top, text: cell.dataset.tip ?? "" });

            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setShown(true), DELAY);
        };

        const leave = (e: PointerEvent) => {
            if (!(e.target as HTMLElement)?.closest?.("[data-tip]")) return;
            window.clearTimeout(timer.current);
            setShown(false);
        };

        document.addEventListener("pointerover", enter);
        document.addEventListener("pointerout", leave);
        window.addEventListener("scroll", leave as EventListener, { passive: true });

        return () => {
            document.removeEventListener("pointerover", enter);
            document.removeEventListener("pointerout", leave);
            window.removeEventListener("scroll", leave as EventListener);
            window.clearTimeout(timer.current);
        };
    }, []);

    /* nudge back inside the viewport once we know how wide the text made it */
    useLayoutEffect(() => {
        if (!tip || !box.current) return;
        const w = box.current.offsetWidth;
        const left = tip.x - w / 2;
        const right = tip.x + w / 2;
        if (left < EDGE) setDx(EDGE - left);
        else if (right > window.innerWidth - EDGE) setDx(window.innerWidth - EDGE - right);
        else setDx(0);
    }, [tip]);

    if (!tip) return null;

    return (
        <div
            ref={box}
            role="tooltip"
            aria-hidden="true"
            className="pointer-events-none fixed z-50 whitespace-nowrap rounded-xs border border-on-panel-rule bg-panel px-2.5 py-1.5 text-2xs text-on-panel"
            style={{
                left: tip.x + dx,
                top: tip.y - 10,
                transform: `translate(-50%, -100%) translateY(${shown ? 0 : 6}px) scale(${shown ? 1 : 0.94})`,
                opacity: shown ? 1 : 0,
                transformOrigin: "50% 100%",
                transition: "opacity 160ms var(--ease-out), transform 220ms var(--ease-out)",
            }}
        >
            {tip.text}
        </div>
    );
}
