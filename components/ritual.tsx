"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, ScanFace, Sparkles, Stethoscope } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Em, Reveal, SectionHeading } from "@/components/primitives";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { CLINIC, SERVICE_CATEGORIES, createWhatsAppUrl } from "@/lib/clinic";
import { cn } from "@/lib/utils";

const METHOD_STEPS = [
    {
        n: "01",
        title: "Start with your questions",
        desc: "Tell Elysea which service or concern you would like to ask about. The clinic can explain what information would help with your enquiry.",
        meta: ["Your priorities", "Direct conversation"],
        icon: MessageCircle,
    },
    {
        n: "02",
        title: "Explore the services",
        desc: "Review the skin, cosmetic, facial, hair, laser and minor-procedure services listed on this site. Ask the clinic for details about any service that interests you.",
        meta: ["Skin · Hair · Laser", "Service information"],
        icon: ScanFace,
    },
    {
        n: "03",
        title: "Discuss the details",
        desc: "Contact the clinic directly with questions about current pricing, availability or what to expect. You can get the information you need before deciding what to do next.",
        meta: ["Current pricing", "Availability"],
        icon: Stethoscope,
    },
    {
        n: "04",
        title: "Choose your next step",
        desc: "Take the time you need to consider your options. If you have more questions, continue the conversation with Elysea on WhatsApp.",
        meta: ["At your pace", "WhatsApp enquiry"],
        icon: Sparkles,
    },
];

export default function Ritual() {
    const cardRefs = useRef<Array<HTMLElement | null>>([]);
    const reducedMotion = useReducedMotion();
    const { scrollTo } = useSmoothScroll();
    const [active, setActive] = useState(0);

    useEffect(() => {
        const measure = () => {
            const focusLine = window.innerHeight * 0.42;
            let closest = 0;
            let closestDistance = Number.POSITIVE_INFINITY;

            cardRefs.current.forEach((card, index) => {
                if (!card) return;
                const bounds = card.getBoundingClientRect();
                const distance = Math.abs(bounds.top + bounds.height / 2 - focusLine);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closest = index;
                }
            });

            setActive((current) => current === closest ? current : closest);
        };

        measure();
        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("scroll", measure);
            window.removeEventListener("resize", measure);
        };
    }, []);

    const goToStep = useCallback(
        (index: number) => scrollTo(`#movement-${index + 1}`),
        [scrollTo]
    );

    return (
        <section
            id="philosophy"
            aria-label="The Elysea method"
            className="relative scroll-mt-24 bg-plum py-24 sm:py-32"
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute -right-40 -top-40 h-[500px] w-[500px] animate-aurora-b rounded-full bg-rose/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] animate-aurora-a rounded-full bg-gild/10 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/60" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <SectionHeading
                            tone="light"
                            eyebrow="The Elysea method"
                            title={<>Four steps to skin that <Em bright>remembers.</Em></>}
                            description="Every concern is different. Use these four steps to learn about Elysea's services, ask questions, and decide what you would like to explore."
                        />

                        <Reveal delay={0.15}>
                            <div className="mt-8">
                                <div className="flex flex-wrap items-center gap-2">
                                    {METHOD_STEPS.map((step, index) => {
                                        const isActive = active === index;
                                        return (
                                            <button
                                                key={step.n}
                                                type="button"
                                                onClick={() => goToStep(index)}
                                                aria-current={isActive ? "step" : undefined}
                                                aria-label={`Go to step ${step.n}: ${step.title}`}
                                                className={cn(
                                                    "relative flex items-center gap-2 overflow-hidden rounded-full border px-3.5 py-2 text-xs font-bold transition-colors duration-300",
                                                    isActive
                                                        ? "border-gild/50 text-cream"
                                                        : "border-cream/15 text-cream/50 hover:border-gild/40 hover:text-cream/80"
                                                )}
                                            >
                                                {isActive && (
                                                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-copper to-rose" />
                                                )}
                                                <span className="relative z-10 font-display text-sm italic">{step.n}</span>
                                                {isActive && (
                                                    <span className="relative z-10 hidden whitespace-nowrap sm:inline">{step.title}</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-cream/10" aria-hidden="true">
                                    <div
                                        className={cn(
                                            "h-full origin-left rounded-full bg-gradient-to-r from-gild via-rose to-copper",
                                            !reducedMotion && "transition-transform duration-500"
                                        )}
                                        style={{ transform: `scaleX(${(active + 1) / METHOD_STEPS.length})` }}
                                    />
                                </div>

                                <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-cream/40">
                                    Step {METHOD_STEPS[active].n} of {String(METHOD_STEPS.length).padStart(2, "0")}
                                </p>
                            </div>
                        </Reveal>

                        <div className="mt-9 grid grid-cols-3 gap-4 text-cream sm:gap-6">
                            <div>
                                <p className="font-display text-3xl font-medium sm:text-4xl">
                                    {CLINIC.doctor.experienceYears}+
                                </p>
                                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-cream/55 sm:text-[10px]">
                                    Years in the medical field
                                </p>
                            </div>
                            <div>
                                <p className="font-display text-3xl font-medium sm:text-4xl">
                                    {SERVICE_CATEGORIES.length}
                                </p>
                                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-cream/55 sm:text-[10px]">
                                    Service categories
                                </p>
                            </div>
                            <div>
                                <p className="font-display text-2xl font-medium sm:text-3xl">
                                    {CLINIC.city}
                                </p>
                                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-cream/55 sm:text-[10px]">
                                    Elysea's location
                                </p>
                            </div>
                        </div>

                        <Reveal delay={0.25}>
                            <div className="mt-9">
                                <Button variant="accent" size="lg" asChild>
                                    <a
                                        href={createWhatsAppUrl("Hello Elysea Aesthetic Clinic, I would like to ask about your services.")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Ask Elysea on WhatsApp
                                        <ArrowUpRight className="h-5 w-5" />
                                    </a>
                                </Button>
                                <p className="mt-3 text-xs text-cream/50">
                                    Ask directly about service details, pricing, and availability.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <div className="relative pl-10 sm:pl-14">
                        <div className="absolute bottom-2 left-[6px] top-2 w-[2px] rounded-full bg-cream/10 sm:left-[13px]">
                            <div
                                className={cn(
                                    "absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-gild via-rose to-copper",
                                    !reducedMotion && "transition-[height] duration-500"
                                )}
                                style={{ height: `${((active + 1) / METHOD_STEPS.length) * 100}%` }}
                            />
                        </div>

                        <div className="space-y-6">
                            {METHOD_STEPS.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = active === index;
                                return (
                                    <Reveal key={step.n} delay={reducedMotion ? 0 : index * 0.05} className="relative">
                                        <span
                                            className={cn(
                                                "absolute -left-10 top-7 z-10 grid h-3.5 w-3.5 place-items-center rounded-full border-2 bg-plum sm:-left-14 sm:ml-[7px]",
                                                isActive ? "border-gild" : "border-gild/40"
                                            )}
                                            aria-hidden="true"
                                        >
                                            <span className={cn("h-1 w-1 rounded-full bg-gild", isActive ? "opacity-100" : "opacity-0")} />
                                        </span>

                                        <article
                                            id={`movement-${index + 1}`}
                                            ref={(element) => { cardRefs.current[index] = element; }}
                                            className={cn(
                                                "scroll-mt-28 rounded-[1.5rem] border p-6 transition-colors duration-500 sm:p-8",
                                                isActive
                                                    ? "border-gild/40 bg-cream/[0.07] shadow-[0_0_70px_-24px_rgba(201,151,63,.45)]"
                                                    : "border-cream/10 bg-cream/[0.035] hover:border-gild/30"
                                            )}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <span className="bg-gradient-to-br from-gild/80 to-rose/70 bg-clip-text font-display text-5xl font-medium italic text-transparent">
                                                    {step.n}
                                                </span>
                                                <Icon className="h-6 w-6 text-gild/80" aria-hidden="true" />
                                            </div>

                                            <h3 className="mt-3 font-display text-2xl font-medium text-cream">{step.title}</h3>
                                            <p className="mt-2 leading-relaxed text-cream/70">{step.desc}</p>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {step.meta.map((label) => (
                                                    <span
                                                        key={label}
                                                        className={cn(
                                                            "rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide",
                                                            isActive ? "border-gild/30 text-cream/80" : "border-cream/15 text-cream/60"
                                                        )}
                                                    >
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>
                                        </article>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
