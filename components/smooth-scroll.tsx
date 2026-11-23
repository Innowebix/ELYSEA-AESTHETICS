"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SmoothScrollContextValue = {
    scrollTo: (target: string) => void;
    stop: () => void;
    start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
    scrollTo: () => { },
    stop: () => { },
    start: () => { },
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5,
        });
        lenisRef.current = lenis;

        lenis.on("scroll", () => ScrollTrigger.update());
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
        if (document.fonts?.ready) {
            document.fonts.ready.then(() => ScrollTrigger.refresh());
        }

        return () => {
            cancelAnimationFrame(refresh);
            gsap.ticker.remove(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    const scrollTo = useCallback((target: string) => {
        const el = document.querySelector(target);
        if (!el) return;
        if (lenisRef.current) {
            lenisRef.current.scrollTo(el as HTMLElement, { offset: -88, duration: 1.4 });
        } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    const stop = useCallback(() => lenisRef.current?.stop(), []);
    const start = useCallback(() => lenisRef.current?.start(), []);

    return (
        <SmoothScrollContext.Provider value={{ scrollTo, stop, start }}>
            {children}
        </SmoothScrollContext.Provider>
    );
}