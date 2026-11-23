"use client";

import { useRef, useState } from "react";
import {
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
} from "framer-motion";
import { Sparkle } from "@/components/primitives";
import { DriftField } from "@/components/motion";
import { SCENES, type Scene } from "@/lib/story";
import { cn } from "@/lib/utils";

function SceneArt({ motif, accent }: { motif: Scene["motif"]; accent: string }) {
    return (
        <svg viewBox="0 0 480 520" className="h-full w-full" fill="none" aria-hidden="true">
            <defs>
                <linearGradient id={`story-${motif}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={accent} stopOpacity="0.95" />
                    <stop offset="1" stopColor="#3A2430" stopOpacity="0.65" />
                </linearGradient>
                <radialGradient id={`story-glow-${motif}`}>
                    <stop offset="0" stopColor={accent} stopOpacity="0.35" />
                    <stop offset="1" stopColor={accent} stopOpacity="0" />
                </radialGradient>
            </defs>

            <circle cx="240" cy="250" r="200" fill={`url(#story-glow-${motif})`} />

            {motif === "window" && (
                <g>
                    <rect x="96" y="60" width="288" height="360" rx="144" stroke={`url(#story-${motif})`} strokeWidth="2" />
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                            key={i}
                            x1="110"
                            y1={120 + i * 48}
                            x2="370"
                            y2={104 + i * 48}
                            stroke={accent}
                            strokeOpacity={0.28}
                            strokeWidth="10"
                            strokeLinecap="round"
                            className="story-shaft"
                            style={{ animationDelay: `${i * 0.4}s` }}
                        />
                    ))}
                    <path
                        d="M300 168c-34 4-56 26-58 60-2 24 4 34-4 48-6 12-16 20-18 28-2 8 6 10 12 12 6 2 8 6 6 12-2 6-8 8-6 14 2 6 10 8 10 14s-8 10-6 16c2 8 12 10 14 18 2 10-6 16-2 26 6 14 24 18 40 18"
                        stroke={`url(#story-${motif})`}
                        strokeWidth="2.6"
                        strokeLinecap="round"
                    />
                    <circle cx="252" cy="300" r="26" fill={accent} fillOpacity="0.14" />
                </g>
            )}

            {motif === "night" && (
                <g>
                    <circle cx="240" cy="250" r="150" stroke={`url(#story-${motif})`} strokeWidth="2" />
                    <circle cx="240" cy="250" r="184" stroke={accent} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 10" />
                    {Array.from({ length: 22 }).map((_, i) => (
                        <line
                            key={i}
                            x1={70 + i * 16}
                            y1={70 + ((i * 29) % 60)}
                            x2={54 + i * 16}
                            y2={150 + ((i * 29) % 60)}
                            stroke={accent}
                            strokeOpacity="0.35"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            className="story-rain"
                            style={{ animationDelay: `${(i % 9) * 0.35}s` }}
                        />
                    ))}
                    <path
                        d="M170 250c22-16 46-16 66 0M244 250c22-16 46-16 66 0M186 320c30 22 78 22 108 0"
                        stroke={`url(#story-${motif})`}
                        strokeWidth="2.4"
                        strokeLinecap="round"
                    />
                    <line x1="240" y1="250" x2="240" y2="164" stroke={accent} strokeWidth="2" strokeLinecap="round" className="story-hand" />
                    <line x1="240" y1="250" x2="300" y2="286" stroke={accent} strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
                </g>
            )}

            {motif === "listening" && (
                <g>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <circle
                            key={i}
                            cx="240"
                            cy="260"
                            r={54 + i * 40}
                            stroke={accent}
                            strokeOpacity={0.42 - i * 0.06}
                            strokeWidth="1.6"
                            className="story-ripple"
                            style={{ animationDelay: `${i * 0.7}s` }}
                        />
                    ))}
                    <path
                        d="M148 262c30-26 62-40 92-40s62 14 92 40"
                        stroke={`url(#story-${motif})`}
                        strokeWidth="2.6"
                        strokeLinecap="round"
                    />
                    <path
                        d="M176 300c26 20 54 30 64 30s38-10 64-30"
                        stroke={`url(#story-${motif})`}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeOpacity="0.7"
                    />
                    <circle cx="240" cy="260" r="9" fill={accent} />
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <rect
                            key={i}
                            x={168 + i * 22}
                            y={392}
                            width="4"
                            height="34"
                            rx="2"
                            fill={accent}
                            fillOpacity="0.5"
                            className="story-wave"
                            style={{ animationDelay: `${i * 0.14}s` }}
                        />
                    ))}
                </g>
            )}

            {motif === "mirror" && (
                <g>
                    <rect x="112" y="72" width="256" height="356" rx="128" stroke={`url(#story-${motif})`} strokeWidth="2.4" />
                    <rect x="128" y="88" width="224" height="324" rx="112" stroke={accent} strokeOpacity="0.3" strokeWidth="1" />
                    <path
                        d="M292 176c-32 4-52 24-54 56-2 22 4 32-4 44-6 12-14 18-16 26-2 8 6 10 11 11 5 2 7 6 5 11-2 6-7 8-5 13 2 6 9 7 9 13s-7 9-5 15c2 7 11 9 13 17 2 9-6 15-2 24 6 13 22 17 37 17"
                        stroke={`url(#story-${motif})`}
                        strokeWidth="2.6"
                        strokeLinecap="round"
                    />
                    <circle cx="248" cy="300" r="30" fill={accent} fillOpacity="0.18" className="story-bloom" />
                    {[
                        [166, 150, 9],
                        [330, 200, 7],
                        [180, 372, 6],
                        [318, 348, 8],
                    ].map(([x, y, s], i) => (
                        <path
                            key={i}
                            d={`M${x} ${y - s}c${s * 0.06} ${s * 0.55} ${s * 0.45} ${s * 0.94} ${s} ${s}c-${s * 0.55} ${s * 0.06} -${s * 0.94} ${s * 0.45} -${s} ${s}c-${s * 0.06} -${s * 0.55} -${s * 0.45} -${s * 0.94} -${s} -${s}c${s * 0.55} -${s * 0.06} ${s * 0.94} -${s * 0.45} ${s} -${s}Z`}
                            fill={accent}
                            className="story-twinkle"
                            style={{ animationDelay: `${i * 0.6}s` }}
                        />
                    ))}
                </g>
            )}
        </svg>
    );
}

function StoryScene({
    scene,
    index,
    total,
    progress,
}: {
    scene: Scene;
    index: number;
    total: number;
    progress: MotionValue<number>;
}) {
    const span = 1 / total;
    const start = index * span;
    const first = index === 0;
    const last = index === total - 1;

    const opacity = useTransform(
        progress,
        [
            first ? 0 : start - span * 0.45,
            start + span * 0.16,
            start + span * 0.74,
            last ? 1 : start + span * 1.05,
        ],
        [first ? 1 : 0, 1, 1, last ? 1 : 0]
    );
    const y = useTransform(
        progress,
        [first ? 0 : start - span * 0.45, last ? 1 : start + span * 1.05],
        [first ? 0 : 70, last ? 0 : -70]
    );
    const scale = useTransform(
        progress,
        [first ? 0 : start - span * 0.45, start + span * 0.3, last ? 1 : start + span * 1.05],
        [first ? 1 : 0.94, 1, last ? 1 : 1.05]
    );
    const artY = useTransform(
        progress,
        [first ? 0 : start - span * 0.45, last ? 1 : start + span * 1.05],
        [-40, 60]
    );
    const dark = scene.motif === "night";

    return (
        <motion.div style={{ opacity }} className={cn("absolute inset-0 bg-gradient-to-br", scene.tone)}>
            <DriftField count={12} />
            <div className="relative mx-auto grid h-full max-w-7xl items-center gap-8 px-6 lg:grid-cols-[1fr_0.85fr]">
                <motion.div style={{ y }} className="max-w-xl">
                    <div className="flex flex-wrap items-center gap-3">
                        <span
                            className="text-[10px] font-bold uppercase tracking-[0.4em]"
                            style={{ color: scene.accent }}
                        >
                            {scene.chapter}
                        </span>
                        <span className={cn("h-px w-10", dark ? "bg-cream/30" : "bg-plum/20")} />
                        <span className={cn("text-[11px] tracking-wide", dark ? "text-cream/45" : "text-plum/45")}>
                            {scene.stamp}
                        </span>
                    </div>

                    <h3
                        className={cn(
                            "mt-6 font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-medium leading-[1.04] tracking-tight",
                            dark ? "text-cream" : "text-plum"
                        )}
                    >
                        <span className="block">{scene.line1}</span>
                        <span className="block italic" style={{ color: scene.accent }}>
                            {scene.line2}
                        </span>
                    </h3>

                    <p
                        className={cn(
                            "mt-6 max-w-lg text-base leading-relaxed sm:text-lg",
                            dark ? "text-cream/70" : "text-plum/70"
                        )}
                    >
                        {scene.body}
                    </p>

                    <div
                        className={cn("mt-7 flex max-w-lg items-start gap-3 border-l-2 pl-4", dark ? "border-cream/25" : "border-plum/15")}
                        style={{ color: scene.accent }}
                    >
                        <Sparkle className="mt-1.5 h-3 w-3 shrink-0" />
                        <p
                            className={cn(
                                "font-display text-lg italic leading-snug",
                                dark ? "text-cream/80" : "text-plum/75"
                            )}
                        >
                            {scene.whisper}
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: artY, scale }}
                    className="relative mx-auto hidden h-[62vh] max-h-[520px] w-full max-w-[440px] lg:block"
                >
                    <SceneArt motif={scene.motif} accent={scene.accent} />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Story() {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const [active, setActive] = useState(0);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const i = Math.min(
            SCENES.length - 1,
            Math.max(0, Math.floor(v * SCENES.length))
        );
        setActive(i);
    });

    const railWidth = useTransform(scrollYProgress, [0, 1], ["6%", "100%"]);

    if (reduced) {
        return (
            <section id="story" className="scroll-mt-24">
                {SCENES.map((s) => {
                    const dark = s.motif === "night";
                    return (
                        <div key={s.id} className={cn("bg-gradient-to-br py-24", s.tone)}>
                            <div className="mx-auto max-w-3xl px-6">
                                <p
                                    className="text-[10px] font-bold uppercase tracking-[0.4em]"
                                    style={{ color: s.accent }}
                                >
                                    {s.chapter} · {s.stamp}
                                </p>
                                <h3
                                    className={cn(
                                        "mt-4 font-display text-4xl font-medium",
                                        dark ? "text-cream" : "text-plum"
                                    )}
                                >
                                    {s.line1}{" "}
                                    <em className="italic" style={{ color: s.accent }}>
                                        {s.line2}
                                    </em>
                                </h3>
                                <p
                                    className={cn(
                                        "mt-4 text-lg leading-relaxed",
                                        dark ? "text-cream/70" : "text-plum/70"
                                    )}
                                >
                                    {s.body}
                                </p>
                                <p
                                    className={cn(
                                        "mt-4 font-display text-lg italic",
                                        dark ? "text-cream/80" : "text-plum/75"
                                    )}
                                >
                                    {s.whisper}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </section>
        );
    }

    const railDark = SCENES[active].motif === "night";

    return (
        <section
            id="story"
            ref={ref}
            className="relative scroll-mt-24"
            style={{ height: `${SCENES.length * 105}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                {SCENES.map((s, i) => (
                    <StoryScene
                        key={s.id}
                        scene={s}
                        index={i}
                        total={SCENES.length}
                        progress={scrollYProgress}
                    />
                ))}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-8">
                    <div className="mx-auto flex max-w-7xl items-center gap-5">
                        <span
                            className={cn(
                                "font-display text-sm italic transition-colors duration-500",
                                railDark ? "text-cream/70" : "text-plum/60"
                            )}
                        >
                            {String(active + 1).padStart(2, "0")} /{" "}
                            {String(SCENES.length).padStart(2, "0")}
                        </span>
                        <div
                            className={cn(
                                "h-[3px] flex-1 overflow-hidden rounded-full transition-colors duration-500",
                                railDark ? "bg-cream/20" : "bg-plum/15"
                            )}
                        >
                            <motion.div
                                style={{ width: railWidth }}
                                className="h-full rounded-full bg-gradient-to-r from-copper via-rose to-gild"
                            />
                        </div>
                        <span
                            className={cn(
                                "hidden text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 sm:inline",
                                railDark ? "text-cream/60" : "text-plum/50"
                            )}
                        >
                            The quiet hour
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}