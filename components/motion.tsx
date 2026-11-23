"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SOFT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function SplitText({
    text,
    className,
    delay = 0,
    stagger = 0.05,
    immediate = false,
}: {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    immediate?: boolean;
}) {
    const reduced = useReducedMotion();
    const words = text.split(" ");
    if (reduced) return <span className={className}>{text}</span>;

    return (
        <span className={className}>
            {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                    <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom">
                        <motion.span
                            className="inline-block will-change-transform"
                            initial={{ y: "118%" }}
                            {...(immediate
                                ? { animate: { y: 0 } }
                                : { whileInView: { y: 0 }, viewport: { once: true, amount: 0.35 } })}
                            transition={{
                                duration: 0.95,
                                delay: delay + i * stagger,
                                ease: EASE_OUT,
                            }}
                        >
                            {word}
                        </motion.span>
                    </span>
                    {i < words.length - 1 ? " " : null}
                </Fragment>
            ))}
        </span>
    );
}

export function MaskReveal({
    children,
    className,
    delay = 0,
    from = "bottom",
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    from?: "bottom" | "left" | "right";
}) {
    const reduced = useReducedMotion();
    const hidden =
        from === "left"
            ? "inset(0 100% 0 0)"
            : from === "right"
                ? "inset(0 0 0 100%)"
                : "inset(100% 0 0 0)";
    if (reduced) return <div className={className}>{children}</div>;
    return (
        <motion.div
            className={className}
            initial={{ clipPath: hidden, opacity: 0.4 }}
            whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.15, delay, ease: EASE_OUT }}
        >
            {children}
        </motion.div>
    );
}

export function Magnetic({
    children,
    strength = 0.32,
    className,
}: {
    children: ReactNode;
    strength?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

    return (
        <motion.div
            ref={ref}
            className={cn("inline-block", className)}
            style={reduced ? undefined : { x: sx, y: sy }}
            onPointerMove={(e) => {
                if (reduced || e.pointerType === "touch" || !ref.current) return;
                const r = ref.current.getBoundingClientRect();
                x.set((e.clientX - (r.left + r.width / 2)) * strength);
                y.set((e.clientY - (r.top + r.height / 2)) * strength);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            {children}
        </motion.div>
    );
}

export function Tilt({
    children,
    className,
    amount = 7,
}: {
    children: ReactNode;
    className?: string;
    amount?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
    const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });

    return (
        <motion.div
            ref={ref}
            className={className}
            style={
                reduced
                    ? undefined
                    : { rotateX: rx, rotateY: ry, transformPerspective: 1100 }
            }
            onPointerMove={(e) => {
                if (reduced || e.pointerType === "touch" || !ref.current) return;
                const r = ref.current.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                ry.set(px * amount * 2);
                rx.set(-py * amount * 2);
            }}
            onPointerLeave={() => {
                rx.set(0);
                ry.set(0);
            }}
        >
            {children}
        </motion.div>
    );
}

export function Parallax({
    children,
    className,
    distance = 60,
}: {
    children: ReactNode;
    className?: string;
    distance?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
    return (
        <div ref={ref} className={className}>
            <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
        </div>
    );
}

const BREATH_PHASES = ["Breathe in", "Hold", "Let it go"];

export function BreathOrb({ className }: { className?: string }) {
    const reduced = useReducedMotion();
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        if (reduced) return;
        const id = window.setInterval(
            () => setPhase((p) => (p + 1) % BREATH_PHASES.length),
            4000
        );
        return () => window.clearInterval(id);
    }, [reduced]);

    return (
        <div className={cn("flex items-center gap-4", className)}>
            <span className="relative grid h-14 w-14 shrink-0 place-items-center">
                <span className="breath-ring absolute inset-0 rounded-full border border-copper/40" />
                <span className="breath-ring breath-ring-delay absolute inset-2 rounded-full border border-rose/40" />
                <span className="breath-core h-3 w-3 rounded-full bg-gradient-to-br from-gild to-rose" />
            </span>
            <span className="text-left">
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-copper">
                    Breathe with us
                </span>
                <span className="mt-1 block font-display text-lg italic text-plum/75">
                    {reduced ? "Four in · seven held · eight out" : BREATH_PHASES[phase]}
                </span>
            </span>
        </div>
    );
}

export function DriftField({ count = 14 }: { count?: number }) {
    const reduced = useReducedMotion();
    if (reduced) return null;
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => {
                const size = 2 + ((i * 7) % 5);
                return (
                    <span
                        key={i}
                        className="dust-mote absolute rounded-full bg-gild/50"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${(i * 37) % 96}%`,
                            top: `${(i * 53) % 92}%`,
                            animationDelay: `${(i % 7) * 1.4}s`,
                            animationDuration: `${14 + (i % 5) * 4}s`,
                        }}
                    />
                );
            })}
        </div>
    );
}