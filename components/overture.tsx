"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkle } from "@/components/primitives";
import { SplitText, EASE_OUT } from "@/components/motion";
import { useSmoothScroll } from "@/components/smooth-scroll";

const LETTERS = ["E", "L", "Y", "S", "E", "A"];

export default function Overture() {
    const reduced = useReducedMotion();
    const { stop, start } = useSmoothScroll();
    const [show, setShow] = useState(true);

    useEffect(() => {
        let seen = false;
        try {
            seen = window.sessionStorage.getItem("elysea-overture") === "1";
        } catch { }
        if (seen || reduced) {
            setShow(false);
            return;
        }
        stop();
        document.body.style.overflow = "hidden";
        const id = window.setTimeout(() => setShow(false), 2900);
        return () => {
            window.clearTimeout(id);
            start();
            document.body.style.overflow = "";
        };
    }, [reduced, stop, start]);

    useEffect(() => {
        if (show) return;
        start();
        document.body.style.overflow = "";
        try {
            window.sessionStorage.setItem("elysea-overture", "1");
        } catch { }
    }, [show, start]);

    const dismiss = () => setShow(false);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[120] overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.55 } }}
                >
                    <motion.div
                        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ink to-plum"
                        exit={{ y: "-100%" }}
                        transition={{ duration: 1.05, ease: EASE_OUT }}
                    />
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-plum"
                        exit={{ y: "100%" }}
                        transition={{ duration: 1.05, ease: EASE_OUT }}
                    />

                    <motion.div
                        className="absolute inset-0 grid place-items-center px-6"
                        exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 animate-aurora-a rounded-full bg-[radial-gradient(circle,rgba(201,151,63,.28),rgba(196,82,106,.16)_45%,transparent_70%)] blur-3xl" />

                        <div className="relative text-center">
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.8 }}
                                className="text-[10px] font-bold uppercase tracking-[0.5em] text-gild"
                            >
                                Est. 2016 · Beverly Grove
                            </motion.p>

                            <div className="mt-6 flex justify-center overflow-hidden">
                                {LETTERS.map((l, i) => (
                                    <motion.span
                                        key={`${l}-${i}`}
                                        initial={{ y: "110%", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: 0.35 + i * 0.075,
                                            duration: 1,
                                            ease: EASE_OUT,
                                        }}
                                        className="font-display text-[clamp(3rem,13vw,8rem)] font-medium leading-none tracking-[0.12em] text-cream"
                                    >
                                        {l}
                                    </motion.span>
                                ))}
                            </div>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.9, duration: 1.5, ease: EASE_OUT }}
                                className="mx-auto mt-6 h-px w-56 origin-left bg-gradient-to-r from-transparent via-gild to-transparent"
                            />

                            <p className="mt-6 font-display text-xl italic text-cream/75 sm:text-2xl">
                                <SplitText
                                    text="Take a breath. You're here."
                                    delay={1.1}
                                    stagger={0.07}
                                    immediate
                                />
                            </p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.7, duration: 0.8 }}
                                className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-cream/40"
                            >
                                <Sparkle className="h-3 w-3 animate-float text-gild" />
                                The art of luminous skin
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.button
                        type="button"
                        onClick={dismiss}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-8 right-8 rounded-full border border-cream/25 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cream/70 transition-colors hover:border-gild hover:text-gild"
                    >
                        Skip
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}