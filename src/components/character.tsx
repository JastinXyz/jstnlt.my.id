"use client";

import { useEffect, useRef } from "react";

/* Him, drawn. Four frames, all registered on the same canvas: feet on the same
 * baseline, head centred on the same column, so a swap never makes him jump.
 *
 * hero  idle · a laptop pose that comes round on its own · a two-frame wave on click
 * lost  the 404 page, breathing only
 *
 * The three idle rhythms have deliberately unrelated periods (4.6s, 6.7s, 9.1s),
 * so the combination does not visibly repeat. The wave alternates its two frames
 * with the crossfade switched off: two half-transparent images over a light page
 * read as a white blink.
 */

const HERO = { w: 463, h: 1038 };
const LOST = { w: 413, h: 1038 };

type Props = {
    variant?: "hero" | "lost";
    className?: string;
};

export default function Character({ variant = "hero", className }: Props) {
    const box = useRef<HTMLDivElement>(null);
    const lean = useRef<HTMLDivElement>(null);

    /* lean toward the cursor. Whole body at once, so nothing has to bend. */
    useEffect(() => {
        const el = lean.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const d = (e.clientX - (r.left + r.width / 2)) / 620;
            el.style.setProperty("--lean", String(Math.max(-1, Math.min(1, d)).toFixed(3)));
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    /* the poses: one that comes round on its own, one on click */
    useEffect(() => {
        const el = box.current;
        if (variant !== "hero" || !el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const pick = (name: string) =>
            el.querySelector<HTMLImageElement>(`[data-pose="${name}"]`);
        const idle = pick("idle");
        const waveA = pick("wave");
        const waveB = pick("wave2");
        const laptop = pick("laptop");
        if (!idle || !waveA || !waveB || !laptop) return;

        let busy = false;
        const timers: number[] = [];
        const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

        const wave = (ms: number) => {
            if (busy) return;
            busy = true;
            const frames = [waveA, waveB];
            let i = 0;
            idle.classList.remove("is-on");
            waveA.classList.add("is-on");
            const swap = window.setInterval(() => {
                el.classList.add("char--snap"); // no crossfade between the two wave frames
                frames[i].classList.remove("is-on");
                i = 1 - i;
                frames[i].classList.add("is-on");
            }, 260);
            timers.push(swap);
            later(() => {
                window.clearInterval(swap);
                el.classList.remove("char--snap");
                requestAnimationFrame(() => {
                    waveA.classList.remove("is-on");
                    waveB.classList.remove("is-on");
                    idle.classList.add("is-on");
                    busy = false;
                });
            }, ms);
        };

        const hold = (img: HTMLImageElement, ms: number) => {
            busy = true;
            idle.classList.remove("is-on");
            img.classList.add("is-on");
            later(() => {
                img.classList.remove("is-on");
                idle.classList.add("is-on");
                busy = false;
            }, ms);
        };

        /* every 9 to 14 seconds, never a fixed beat: a fixed one gets memorised
         * after two cycles and then stops being noticed */
        const next = () => later(play, 9000 + Math.random() * 5000);
        const play = () => {
            if (document.hidden || busy) {
                later(play, 2500);
                return;
            }
            if (Math.random() < 0.5) wave(1900);
            else hold(laptop, 2400);
            next();
        };
        next();

        const onClick = () => wave(1700);
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                wave(1700);
            }
        };
        el.addEventListener("click", onClick);
        el.addEventListener("keydown", onKey);

        return () => {
            timers.forEach((t) => {
                window.clearTimeout(t);
                window.clearInterval(t);
            });
            el.removeEventListener("click", onClick);
            el.removeEventListener("keydown", onKey);
        };
    }, [variant]);

    const size = variant === "hero" ? HERO : LOST;
    const interactive = variant === "hero";

    return (
        <div
            className={className}
            style={{ ["--char-ratio" as string]: `${size.w} / ${size.h}` }}
        >
            <div ref={lean} className="char__lean">
                <div className="char__shift">
                    <div
                        ref={box}
                        className="char__sway"
                        {...(interactive
                            ? {
                                  role: "button" as const,
                                  tabIndex: 0,
                                  "aria-label": "Say hi to the drawing of me",
                              }
                            : {})}
                    >
                        {variant === "hero" ? (
                            <>
                                <img
                                    className="char__frame is-on"
                                    data-pose="idle"
                                    src="/char/frame-idle.webp"
                                    alt="Jastin, drawn"
                                    width={size.w}
                                    height={size.h}
                                />
                                <img
                                    className="char__frame"
                                    data-pose="wave"
                                    src="/char/frame-wave.webp"
                                    alt=""
                                    width={size.w}
                                    height={size.h}
                                />
                                <img
                                    className="char__frame"
                                    data-pose="wave2"
                                    src="/char/frame-wave2.webp"
                                    alt=""
                                    width={size.w}
                                    height={size.h}
                                />
                                <img
                                    className="char__frame"
                                    data-pose="laptop"
                                    src="/char/frame-laptop.webp"
                                    alt=""
                                    width={size.w}
                                    height={size.h}
                                />
                            </>
                        ) : (
                            <img
                                className="char__frame is-on"
                                src="/char/frame-404.webp"
                                alt="Jastin, drawn, looking for the page"
                                width={size.w}
                                height={size.h}
                            />
                        )}
                    </div>
                </div>
                <span aria-hidden="true" className="char__shadow" />
            </div>
        </div>
    );
}
