
"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll() {
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        const lenis = new Lenis({
            autoRaf: false,
            duration: 1.15,
            smoothWheel: true,
            anchors: true,
            syncTouch: false,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            ScrollTrigger.refresh();
        };
    }, [prefersReducedMotion]);

    return null;
}
