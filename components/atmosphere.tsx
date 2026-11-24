"use client";

import { useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";

export default function Atmosphere() {
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const smooth = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 24,
        mass: 0.6,
    });

    const dawn = useTransform(smooth, [0, 0.1, 0.17], [0.8, 0.6, 0]);
    const ember = useTransform(smooth, [0.13, 0.19, 0.25], [0, 0.8, 0]);
    const bloom = useTransform(smooth, [0.24, 0.36, 0.5], [0, 0.7, 0.35]);
    const dusk = useTransform(smooth, [0.48, 0.56, 0.65], [0, 0.8, 0]);
    const mist = useTransform(smooth, [0.63, 0.78, 0.92], [0.25, 0.5, 0.2]);
    const night = useTransform(smooth, [0.92, 0.98, 1], [0, 0.6, 0.85]);

    const mx = useMotionValue(-400);
    const my = useMotionValue(-400);
    const gx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.7 });
    const gy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.7 });
    const [fine, setFine] = useState(false);

    useEffect(() => {
        if (reduced) return;
        const mq = window.matchMedia("(pointer: fine)");
        setFine(mq.matches);
        if (!mq.matches) return;
        const move = (e: PointerEvent) => {
            mx.set(e.clientX - 260);
            my.set(e.clientY - 260);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
    }, [reduced, mx, my]);

    if (reduced) return null;

    return (
        <>
            <div
                className="pointer-events-none fixed inset-0 z-[95] mix-blend-soft-light"
                aria-hidden="true"
            >
                <motion.div
                    style={{ opacity: dawn }}
                    className="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_0%,#F7E3D2_0%,#E9C6B4_38%,transparent_72%)]"
                />
                <motion.div
                    style={{ opacity: ember }}
                    className="absolute inset-0 bg-[radial-gradient(110%_90%_at_85%_25%,#7A4A63_0%,#3A2430_45%,transparent_78%)]"
                />
                <motion.div
                    style={{ opacity: bloom }}
                    className="absolute inset-0 bg-[radial-gradient(120%_100%_at_25%_75%,#F6E7CF_0%,#E4B3A4_45%,transparent_80%)]"
                />
                <motion.div
                    style={{ opacity: dusk }}
                    className="absolute inset-0 bg-[radial-gradient(115%_95%_at_75%_50%,#7A4A63_0%,#3A2430_50%,transparent_82%)]"
                />
                <motion.div
                    style={{ opacity: mist }}
                    className="absolute inset-0 bg-[radial-gradient(100%_90%_at_70%_60%,#DCE7E4_0%,#E7DAC8_50%,transparent_85%)]"
                />
                <motion.div
                    style={{ opacity: night }}
                    className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_100%,#2E4A56_0%,#211219_55%,transparent_85%)]"
                />
            </div>

            {fine && !reduced && (
                <motion.div
                    aria-hidden="true"
                    style={{ x: gx, y: gy }}
                    className="pointer-events-none fixed left-0 top-0 z-[96] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(201,151,63,.20),rgba(196,82,106,.10)_45%,transparent_70%)] mix-blend-screen blur-2xl"
                />
            )}

            <div className="cine-vignette" aria-hidden="true" />
        </>
    );
}
