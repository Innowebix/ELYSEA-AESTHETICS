"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Em,
    Monogram,
    Reveal,
    SectionHeading,
    Stat,
} from "@/components/primitives";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { useBooking } from "@/components/booking";
import { METHOD_STEPS, TEAM } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Ritual() {
    const sectionRef = useRef<HTMLElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const reduced = useReducedMotion();
    const { openBooking } = useBooking();
    const { scrollTo } = useSmoothScroll();
    const [active, setActive] = useState(0);

    useEffect(() => {
        const measure = () => {
            const band = window.innerHeight * 0.42;
            let best = 0;
            let bestDistance = Number.POSITIVE_INFINITY;

            cardRefs.current.forEach((el, i) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const distance = Math.abs(rect.top + rect.height / 2 - band);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    best = i;
                }
            });

            setActive(best);
        };

        measure();
        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
        const settle = window.setTimeout(measure, 700);

        return () => {
            window.removeEventListener("scroll", measure);
            window.removeEventListener("resize", measure);
            window.clearTimeout(settle);
        };
    }, []);

    useEffect(() => {
        const line = lineRef.current;
        const rail = railRef.current;
        const steps = stepsRef.current;
        if (reduced || !line || !rail || !steps) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: steps,
                    start: "top 70%",
                    end: "bottom 62%",
                    scrub: 0.5,
                },
            });

            tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0).fromTo(
                rail,
                { scaleX: 0 },
                { scaleX: 1, ease: "none" },
                0
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [reduced]);

    const goToStep = useCallback(
        (index: number) => scrollTo(`#movement-${index + 1}`),
        [scrollTo]
    );

    const spring: Transition = reduced
        ? { duration: 0 }
        : { type: "spring", stiffness: 390, damping: 33 };

    return (
        <section
            id="philosophy"
            ref={sectionRef}
            className="relative scroll-mt-24 bg-plum py-24 sm:py-32"
        >
            <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
            >
                <div className="absolute -right-40 -top-40 h-[500px] w-[500px] animate-aurora-b rounded-full bg-rose/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] animate-aurora-a rounded-full bg-gild/10 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/60" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
                    <div
                        data-lenis-prevent
                        className={cn(
                            "lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-2",
                            "lg:[&::-webkit-scrollbar]:w-[6px]",
                            "lg:[&::-webkit-scrollbar-track]:bg-transparent",
                            "lg:[&::-webkit-scrollbar-thumb]:rounded-full",
                            "lg:[&::-webkit-scrollbar-thumb]:bg-copper/50"
                        )}
                    >
                        <SectionHeading
                            tone="light"
                            eyebrow="The Elysea method"
                            title={
                                <>
                                    Four steps to skin that <Em bright>remembers.</Em>
                                </>
                            }
                            description="Great skin isn't a product. It's a protocol — measured, adjusted, maintained. Ours unfolds in four movements, and you'll know the price of every one before we begin."
                        />

                        <Reveal delay={0.15}>
                            <div className="mt-8">
                                <div className="flex flex-wrap items-center gap-2">
                                    {METHOD_STEPS.map((step, i) => {
                                        const isActive = active === i;
                                        return (
                                            <motion.button
                                                layout
                                                key={step.n}
                                                type="button"
                                                onClick={() => goToStep(i)}
                                                aria-current={isActive ? "step" : undefined}
                                                aria-label={`Go to movement ${step.n}: ${step.title}`}
                                                transition={spring}
                                                className={cn(
                                                    "relative flex items-center gap-2 overflow-hidden rounded-full border px-3.5 py-2 text-xs font-bold transition-colors duration-300",
                                                    isActive
                                                        ? "border-gild/50 text-cream"
                                                        : "border-cream/15 text-cream/50 hover:border-gild/40 hover:text-cream/80"
                                                )}
                                            >
                                                {isActive && (
                                                    <motion.span
                                                        layoutId="method-pill"
                                                        transition={spring}
                                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-copper to-rose"
                                                    />
                                                )}
                                                <span className="relative z-10 font-display text-sm italic">
                                                    {step.n}
                                                </span>
                                                {isActive && (
                                                    <span className="relative z-10 hidden whitespace-nowrap sm:inline">
                                                        {step.title}
                                                    </span>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-cream/10">
                                    <div
                                        ref={railRef}
                                        className="h-full origin-left rounded-full bg-gradient-to-r from-gild via-rose to-copper"
                                    />
                                </div>

                                <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-cream/40">
                                    Movement {METHOD_STEPS[active].n} of 04 ·{" "}
                                    {METHOD_STEPS[active].meta[0]}
                                </p>
                            </div>
                        </Reveal>

                        <div className="mt-9 grid grid-cols-3 gap-6 text-cream">
                            <Stat value={10} suffix="+" label="Years of practice" />
                            <Stat value={24} suffix="k+" label="Treatments performed" />
                            <Stat value={98} suffix="%" label="Clients who rebook" />
                        </div>

                        <Reveal delay={0.25}>
                            <div className="mt-9">
                                <Button variant="accent" size="lg" onClick={() => openBooking()}>
                                    Begin with skin mapping
                                    <ArrowUpRight className="h-5 w-5" />
                                </Button>
                                <p className="mt-3 text-xs text-cream/40">
                                    45 minutes · Complimentary · Written protocol included
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <div ref={stepsRef} className="relative pl-10 sm:pl-14">
                        <div className="absolute bottom-2 left-[6px] top-2 w-[2px] rounded-full bg-cream/10 sm:left-[13px]">
                            <div
                                ref={lineRef}
                                className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-gild via-rose to-copper"
                            />
                        </div>

                        <div className="space-y-6">
                            {METHOD_STEPS.map((step, i) => {
                                const Icon = step.icon;
                                const isActive = active === i;

                                return (
                                    <Reveal key={step.n} delay={i * 0.05} className="relative">
                                        <span
                                            className={cn(
                                                "absolute -left-10 top-7 z-10 grid h-3.5 w-3.5 place-items-center rounded-full border-2 bg-plum transition-all duration-500 sm:-left-14 sm:ml-[7px]",
                                                isActive ? "scale-125 border-gild" : "border-gild/40"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "h-1 w-1 rounded-full bg-gild transition-opacity duration-500",
                                                    isActive ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </span>

                                        <div
                                            id={`movement-${i + 1}`}
                                            ref={(el) => {
                                                cardRefs.current[i] = el;
                                            }}
                                            className={cn(
                                                "scroll-mt-28 rounded-[1.5rem] border p-6 transition-all duration-500 sm:p-8",
                                                isActive
                                                    ? "border-gild/40 bg-cream/[0.07] shadow-[0_0_70px_-24px_rgba(201,151,63,.45)]"
                                                    : "border-cream/10 bg-cream/[0.035] hover:border-gild/30"
                                            )}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <span
                                                    className={cn(
                                                        "bg-gradient-to-br bg-clip-text font-display text-5xl font-medium italic text-transparent transition-all duration-500",
                                                        isActive ? "from-gild to-rose" : "from-gild/70 to-rose/60"
                                                    )}
                                                >
                                                    {step.n}
                                                </span>
                                                <Icon
                                                    className={cn(
                                                        "h-6 w-6 transition-all duration-500",
                                                        isActive ? "scale-110 text-gild" : "text-gild/50"
                                                    )}
                                                />
                                            </div>

                                            <h3 className="mt-3 font-display text-2xl font-medium text-cream">
                                                {step.title}
                                            </h3>

                                            <p className="mt-2 leading-relaxed text-cream/70">
                                                {step.desc}
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {step.meta.map((m) => (
                                                    <span
                                                        key={m}
                                                        className={cn(
                                                            "rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide transition-colors duration-500",
                                                            isActive
                                                                ? "border-gild/30 text-cream/80"
                                                                : "border-cream/15 text-cream/60"
                                                        )}
                                                    >
                                                        {m}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <Reveal delay={0.1} className="mt-20 border-t border-cream/10 pt-10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gild">
                        Led by board-certified specialists
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {TEAM.map((member) => (
                            <div
                                key={member.name}
                                className="flex items-center gap-4 rounded-2xl border border-cream/10 bg-cream/[0.03] p-4 transition-colors duration-300 hover:border-gild/40"
                            >
                                <Monogram
                                    initials={member.initials}
                                    gradient={member.gradient}
                                    className="ring-cream/20"
                                />
                                <div>
                                    <p className="text-sm font-bold text-cream">{member.name}</p>
                                    <p className="mt-0.5 text-xs text-cream/60">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}