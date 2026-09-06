"use client";

import { useEffect, useRef, useState } from "react";

/* Him, sitting on the colophon rule with his legs hanging into the row below.
 *
 * Two frames, alternated every 450ms: only the calves differ, because frame B
 * takes everything above row 364 from frame A. A leg swing any faster than this
 * reads as fidgeting rather than sitting.
 *
 * The blink is not a third frame. It is a 67x21 strip of closed eyes, 690 bytes,
 * laid over the face in percentages, so it lands correctly at any size and works
 * over both leg frames.
 *
 * SEAT is where his palms take his weight, measured on the art rather than
 * guessed: pull the figure up by that fraction and the rule passes under his
 * hands at any height.
 */
const SEAT = "58.54%";

export default function FooterCharacter({ className }: { className?: string }) {
    const [leg, setLeg] = useState(0);
    const [shut, setShut] = useState(false);
    const timers = useRef<number[]>([]);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const swing = window.setInterval(() => {
            if (!document.hidden) setLeg((l) => 1 - l);
        }, 450);

        const blink = () => {
            if (document.hidden) {
                timers.current.push(window.setTimeout(blink, 2000));
                return;
            }
            setShut(true);
            timers.current.push(window.setTimeout(() => setShut(false), 120));
            /* a real blink is sometimes a double, and never on a fixed beat */
            if (Math.random() < 0.35) {
                timers.current.push(window.setTimeout(() => setShut(true), 260));
                timers.current.push(window.setTimeout(() => setShut(false), 370));
            }
            timers.current.push(window.setTimeout(blink, 2600 + Math.random() * 4200));
        };
        timers.current.push(window.setTimeout(blink, 1200 + Math.random() * 2000));

        const t = timers.current;
        return () => {
            window.clearInterval(swing);
            t.forEach(window.clearTimeout);
        };
    }, []);

    return (
        <div aria-hidden="true" className={className}>
            <div className="relative h-full" style={{ transform: `translateY(-${SEAT})` }}>
                <img
                    src="/char/frame-sit.webp"
                    alt=""
                    width={307}
                    height={640}
                    className="block h-full w-auto"
                    style={{ opacity: leg === 0 ? 1 : 0 }}
                />
                <img
                    src="/char/frame-sit2.webp"
                    alt=""
                    width={307}
                    height={640}
                    className="absolute inset-0 block h-full w-auto"
                    style={{ opacity: leg === 1 ? 1 : 0 }}
                />
                <img
                    src="/char/blink.webp"
                    alt=""
                    width={67}
                    height={21}
                    className="absolute"
                    style={{
                        left: "34.682%",
                        top: "10.065%",
                        width: "21.965%",
                        height: "3.324%",
                        opacity: shut ? 1 : 0,
                    }}
                />
            </div>
        </div>
    );
}
