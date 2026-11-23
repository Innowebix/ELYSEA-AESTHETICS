"use client";

import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useInView,
    useReducedMotion,
} from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeftRight,
    Quote,
    Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Counter,
    Em,
    Monogram,
    Reveal,
    SectionHeading,
    Sparkle,
} from "@/components/primitives";
import { useBooking } from "@/components/booking";
import { METRICS, TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

const BEFORE_SPOTS = [
    "radial-gradient(circle at 28% 32%, rgba(160,88,52,.4) 0 5%, transparent 11%)",
    "radial-gradient(circle at 62% 22%, rgba(170,96,60,.35) 0 4%, transparent 9%)",
    "radial-gradient(circle at 44% 58%, rgba(150,80,48,.38) 0 6%, transparent 13%)",
    "radial-gradient(circle at 74% 48%, rgba(178,100,62,.32) 0 4%, transparent 10%)",
    "radial-gradient(circle at 20% 72%, rgba(160,88,52,.35) 0 5%, transparent 11%)",
    "radial-gradient(circle at 58% 80%, rgba(150,80,48,.3) 0 4%, transparent 9%)",
    "radial-gradient(circle at 82% 74%, rgba(170,96,60,.28) 0 3%, transparent 8%)",
    "radial-gradient(circle at 36% 16%, rgba(150,80,48,.3) 0 3%, transparent 8%)",
].join(", ");

function BeforeAfter() {
    const ref = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    const [pos, setPos] = useState(58);
    const [touched, setTouched] = useState(false);

    const update = (clientX: number) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos(Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100)));
    };

    return (
        <div className="overflow-hidden rounded-[2rem] border border-sand bg-cream shadow-lift">
            <div
                ref={ref}
                role="slider"
                tabIndex={0}
                aria-label="Compare skin before and after treatment"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onPointerDown={(e) => {
                    dragging.current = true;
                    setTouched(true);
                    e.currentTarget.setPointerCapture(e.pointerId);
                    update(e.clientX);
                }}
                onPointerMove={(e) => {
                    if (dragging.current) update(e.clientX);
                }}
                onPointerUp={() => {
                    dragging.current = false;
                }}
                onPointerCancel={() => {
                    dragging.current = false;
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") { setTouched(true); setPos((p) => Math.max(4, p - 4)); }
                    if (e.key === "ArrowRight") { setTouched(true); setPos((p) => Math.min(96, p + 4)); }
                    if (e.key === "Home") setPos(4);
                    if (e.key === "End") setPos(96);
                }}
                className="relative h-[340px] cursor-ew-resize touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-gild sm:h-[420px]"
            >
                {/* AFTER */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#F6DAC9,#EDC3AE_50%,#E5B49E)]">
                    <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/40 blur-2xl" />
                    <Sparkle className="absolute left-[68%] top-[24%] h-4 w-4 animate-float text-cream/90" />
                    <Sparkle className="absolute left-[80%] top-[58%] h-3 w-3 animate-float text-cream/80 [animation-delay:1.2s]" />
                    <Sparkle className="absolute left-[60%] top-[76%] h-2.5 w-2.5 animate-float text-gild/80 [animation-delay:2.1s]" />
                    <span className="absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sage shadow-sm">
                        Week 8 · After
                    </span>
                </div>
                {/* BEFORE */}
                <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                >
                    <div
                        className="absolute inset-0 bg-[linear-gradient(135deg,#E8C4B0,#D9A98F_45%,#C9917A)]"
                        style={{ backgroundImage: `${BEFORE_SPOTS}, linear-gradient(135deg,#E8C4B0,#D9A98F_45%,#C9917A)` }}
                    />
                    <div className="absolute inset-0 bg-plum/10" />
                    <span className="absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cream backdrop-blur">
                        Week 0 · Before
                    </span>
                </div>
                {/* Handle */}
                <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
                    <div className="absolute inset-y-0 -ml-[1.5px] w-[3px] bg-cream shadow-[0_0_12px_rgba(33,18,25,.4)]" />
                    <div className="absolute top-1/2 -ml-6 -mt-6 grid h-12 w-12 place-items-center rounded-full border-2 border-copper bg-cream shadow-lift">
                        <ChevronsLeftRight className="h-5 w-5 text-plum" />
                    </div>
                </div>
                <AnimatePresence>
                    {!touched && (
                        <motion.span
                            exit={{ opacity: 0, y: 8 }}
                            className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/70 px-3.5 py-1.5 text-[11px] font-semibold text-cream backdrop-blur"
                        >
                            <ChevronLeft className="h-3 w-3" /> drag to compare <ChevronRight className="h-3 w-3" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-sand px-5 py-3 text-xs text-plum/55">
                <span className="font-semibold">Fractional resurfacing · 3 sessions</span>
                <span>Illustrative simulation — individual results vary</span>
            </div>
        </div>
    );
}

function Metric({
    label,
    value,
    gradient,
    delay,
}: {
    label: string;
    value: number;
    gradient: string;
    delay: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    return (
        <div ref={ref}>
            <div className="flex items-baseline justify-between text-sm font-semibold text-plum">
                <span>{label}</span>
                <Counter value={value} prefix="+" suffix="%" className="font-display text-xl text-copper" />
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-sand/70">
                <motion.div
                    className={cn("h-full rounded-full bg-gradient-to-r", gradient)}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${value}%` } : { width: 0 }}
                    transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </div>
    );
}

function Testimonials() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduced = useReducedMotion();
    const t = TESTIMONIALS[index];

    useEffect(() => {
        if (paused || reduced) return;
        const id = window.setInterval(
            () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
            6500
        );
        return () => window.clearInterval(id);
    }, [paused, reduced, index]);

    return (
        <div
            className="mx-auto mt-24 max-w-3xl text-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <Reveal>
                <Quote className="mx-auto h-10 w-10 text-gild/60" />
                <div className="mt-4 flex justify-center gap-1">
                    {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="h-4 w-4 fill-gild text-gild" />
                    ))}
                </div>
            </Reveal>
            <div aria-live="polite" className="mt-6 min-h-[150px] sm:min-h-[130px]">
                <AnimatePresence mode="wait">
                    <motion.figure
                        key={index}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                        <blockquote className="font-display text-2xl font-medium leading-snug text-plum sm:text-[1.75rem]">
                            “{t.quote}”
                        </blockquote>
                        <figcaption className="mt-6 flex items-center justify-center gap-3">
                            <Monogram initials={t.initials} gradient={t.gradient} className="h-10 w-10" />
                            <span className="text-left">
                                <span className="block text-sm font-bold text-plum">{t.name}</span>
                                <span className="block text-xs text-plum/55">
                                    {t.treatment} · {t.since}
                                </span>
                            </span>
                        </figcaption>
                    </motion.figure>
                </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
                <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-sand text-plum transition-colors hover:border-copper hover:text-copper"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-2">
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Go to testimonial ${i + 1}`}
                            onClick={() => setIndex(i)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                i === index ? "w-6 bg-copper" : "w-2 bg-sand hover:bg-petal"
                            )}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-sand text-plum transition-colors hover:border-copper hover:text-copper"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export default function Results() {
    const { openBooking } = useBooking();
    return (
        <section
            id="results"
            className="relative scroll-mt-24 bg-gradient-to-b from-cream via-blush/40 to-porcelain py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeading
                    eyebrow="Results"
                    title={<>Proof, not <Em>promises.</Em></>}
                    description="We photograph, measure and re-measure. Drag the line to see an eight-week resurfacing arc — then read what our clients say when the numbers become a mirror."
                />
                <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    <Reveal>
                        <BeforeAfter />
                    </Reveal>
                    <div>
                        <Reveal delay={0.1}>
                            <h3 className="font-display text-2xl font-medium text-plum sm:text-3xl">
                                Eight weeks, measured.
                            </h3>
                            <p className="mt-3 leading-relaxed text-plum/65">
                                Average clinical measurements across 120 clients on staged
                                eight-week protocols — corneometry for hydration, VISIA texture
                                scoring, and cross-polarised tone analysis.
                            </p>
                        </Reveal>
                        <div className="mt-8 space-y-6">
                            {METRICS.map((m, i) => (
                                <Metric key={m.label} label={m.label} value={m.value} gradient={m.gradient} delay={0.15 + i * 0.15} />
                            ))}
                        </div>
                        <Reveal delay={0.3}>
                            <p className="mt-6 text-xs text-plum/50">
                                Visual above is an illustrative simulation. Your own before-and-after
                                imaging is included in every Glow Plan.
                            </p>
                            <Button variant="link" className="mt-2 h-auto p-0 text-sm font-bold" onClick={() => openBooking()}>
                                Start with a complimentary consultation →
                            </Button>
                        </Reveal>
                    </div>
                </div>
                <Testimonials />
            </div>
        </section>
    );
}