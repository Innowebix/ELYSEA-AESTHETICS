"use client";

import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import { ArrowUpRight, ChevronDown, Droplets, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Monogram, Sparkle } from "@/components/primitives";
import {
    BreathOrb,
    DriftField,
    EASE_OUT,
    Magnetic,
    SplitText,
    Tilt,
} from "@/components/motion";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { useBooking } from "@/components/booking";

const PROMISES = [
    "You are not a before photo.",
    "Come as you are. Leave as yourself.",
    "Nobody here will sell you a new face.",
];

const FACE_PATHS = [
    "M 268 78 C 226 82 196 108 190 148 C 187 170 191 184 185 198 C 180 209 170 218 166 226 C 163 232 168 236 174 237 C 179 238 183 241 182 246 C 181 251 175 254 176 259 C 177 264 183 266 183 271 C 183 276 177 280 179 286 C 181 293 191 295 193 302 C 195 311 187 318 191 327 C 196 339 212 344 228 346 C 250 349 268 342 280 328",
    "M 280 328 C 288 318 293 305 295 292",
    "M 232 348 C 236 372 232 396 222 418 C 248 436 284 446 324 448",
    "M 296 290 C 298 324 296 356 288 386 C 302 406 326 420 356 426",
    "M 268 78 C 316 66 358 92 370 136 C 380 174 372 216 362 252 C 354 282 356 312 368 336 C 374 346 381 354 390 360",
    "M 268 78 C 300 84 322 104 330 134 C 338 166 332 200 324 232 C 318 258 320 284 330 306",
    "M 206 172 C 216 164 230 163 240 168 M 210 194 C 218 199 228 199 236 195 M 213 198 C 210 201 207 203 204 204",
    "M 176 259 C 183 262 191 262 197 260 M 172 232 C 175 233 178 233 181 231",
    "M 292 226 C 304 220 312 230 306 244 C 302 253 295 258 289 256",
    "M 258 430 C 270 436 284 440 298 441",
];

function FaceArt({ reduced }: { reduced: boolean }) {
    return (
        <svg viewBox="0 0 420 560" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            <defs>
                <linearGradient id="faceGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#B4643C" />
                    <stop offset="0.55" stopColor="#C4526A" />
                    <stop offset="1" stopColor="#3A2430" />
                </linearGradient>
                <radialGradient id="cheekGrad">
                    <stop offset="0" stopColor="#E4B3A4" stopOpacity=".65" />
                    <stop offset="1" stopColor="#E4B3A4" stopOpacity="0" />
                </radialGradient>
            </defs>
            <circle cx="250" cy="260" r="195" stroke="#C9973F" strokeOpacity=".3" strokeDasharray="2 9" strokeWidth="1.5" className="animate-spin-slow" style={{ transformOrigin: "250px 260px" }} />
            <circle cx="234" cy="268" r="34" fill="url(#cheekGrad)" className="story-bloom" />
            {FACE_PATHS.map((d, i) => (
                <path
                    key={i}
                    d={d}
                    pathLength={1}
                    stroke="url(#faceGrad)"
                    strokeWidth={i === 0 ? 3 : 2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={reduced ? undefined : "face-draw"}
                    style={reduced ? undefined : { animationDelay: `${1.5 + i * 0.16}s` }}
                />
            ))}
            <g fill="#C9973F">
                <path d="M150 118c.5 4.6 3.9 8 8.5 8.5-4.6.5-8 3.9-8.5 8.5-.5-4.6-3.9-8-8.5-8.5 4.6-.5 8-3.9 8.5-8.5Z" className="story-twinkle" />
                <path d="M336 84c.4 3.7 3.1 6.4 6.8 6.8-3.7.4-6.4 3.1-6.8 6.8-.4-3.7-3.1-6.4-6.8-6.8 3.7-.4 6.4-3.1 6.8-6.8Z" className="story-twinkle" style={{ animationDelay: "1.1s" }} />
                <path d="M136 332c.4 3.7 3.1 6.4 6.8 6.8-3.7.4-6.4 3.1-6.8 6.8-.4-3.7-3.1-6.4-6.8-6.8 3.7-.4 6.4-3.1 6.8-6.8Z" className="story-twinkle" style={{ animationDelay: "2.2s" }} />
            </g>
        </svg>
    );
}

function RotatingBadge() {
    return (
        <div className="relative grid h-28 w-28 place-items-center rounded-full border border-sand bg-cream/90 shadow-lift backdrop-blur">
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
                <defs>
                    <path id="badge-circle" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
                </defs>
                <text fontSize="10.5" letterSpacing="2.6" fill="#3A2430" fontWeight="600">
                    <textPath href="#badge-circle">ELYSEA AESTHETICS • THE QUIET HOUR •</textPath>
                </text>
            </svg>
            <Sparkle className="h-5 w-5 text-copper" />
        </div>
    );
}

export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const reduced = useReducedMotion() ?? false;
    const { scrollTo } = useSmoothScroll();
    const { openBooking } = useBooking();
    const [promise, setPromise] = useState(0);

    useEffect(() => {
        if (reduced) return;
        const id = window.setInterval(() => setPromise((p) => (p + 1) % PROMISES.length), 4600);
        return () => window.clearInterval(id);
    }, [reduced]);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const yArch = useTransform(scrollYProgress, [0, 1], [0, 110]);
    const yChipA = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const yChipB = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const yCopy = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section id="home" ref={ref} className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:min-h-screen">
            <div className="pointer-events-none absolute -left-32 -top-32 h-[560px] w-[560px] animate-aurora-a rounded-full bg-[radial-gradient(circle_at_center,rgba(242,215,205,.9),rgba(228,179,164,.35)_45%,transparent_70%)] blur-2xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-24 h-[620px] w-[620px] animate-aurora-b rounded-full bg-[radial-gradient(circle_at_center,rgba(201,151,63,.28),rgba(196,82,106,.18)_50%,transparent_72%)] blur-3xl" />
            <DriftField count={16} />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                <motion.div style={reduced ? undefined : { y: yCopy }}>
                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.9, ease: EASE_OUT }}
                        className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-copper"
                    >
                        <span className="h-px w-10 bg-copper" />
                        A quiet hour, kept for you
                    </motion.p>

                    <h1 className="mt-6 font-display text-[clamp(3.4rem,8.5vw,7rem)] font-medium leading-[0.98] tracking-[-0.02em] text-plum">
                        <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                            <SplitText text="The art of" delay={1.4} immediate />
                        </span>
                        <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                            <motion.span
                                className="block"
                                initial={reduced ? false : { y: "115%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 1.62, duration: 1, ease: EASE_OUT }}
                            >
                                <em className="shimmer-text bg-gradient-to-r from-copper via-rose to-gild bg-clip-text pr-[0.08em] italic text-transparent">
                                    luminous
                                </em>
                            </motion.span>
                        </span>
                        <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                            <motion.span
                                className="block"
                                initial={reduced ? false : { y: "115%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 1.78, duration: 1, ease: EASE_OUT }}
                            >
                                skin.
                                <Sparkle className="ml-4 inline-block h-[0.42em] w-[0.42em] animate-float text-gild" />
                            </motion.span>
                        </span>
                    </h1>

                    <motion.div
                        initial={reduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.1, duration: 0.8 }}
                        className="mt-6 h-8"
                    >
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={promise}
                                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                                transition={{ duration: 0.6, ease: EASE_OUT }}
                                className="font-display text-xl italic text-rose sm:text-2xl"
                            >
                                {PROMISES[promise]}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>

                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.25, duration: 0.9, ease: EASE_OUT }}
                        className="mt-5 max-w-xl text-lg leading-relaxed text-plum/70"
                    >
                        A physician-led clinic in Beverly Grove where the first thing we
                        treat is how you feel about being looked at. The rest — the lasers,
                        the peels, the precision — follows quietly.
                    </motion.p>

                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.4, duration: 0.9, ease: EASE_OUT }}
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <Magnetic>
                            <Button variant="accent" size="lg" onClick={() => openBooking()}>
                                Book a consultation
                                <ArrowUpRight className="h-5 w-5" />
                            </Button>
                        </Magnetic>
                        <Magnetic strength={0.2}>
                            <Button variant="outline" size="lg" onClick={() => scrollTo("#story")}>
                                Read our story
                            </Button>
                        </Magnetic>
                    </motion.div>

                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.55, duration: 0.9, ease: EASE_OUT }}
                        className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[
                                    { i: "NR", g: "from-rose to-copper" },
                                    { i: "PS", g: "from-copper to-gild" },
                                    { i: "EM", g: "from-mineral to-sage" },
                                    { i: "JT", g: "from-plum to-rose" },
                                ].map((m) => (
                                    <Monogram key={m.i} initials={m.i} gradient={m.g} className="h-10 w-10 ring-porcelain" />
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    {[0, 1, 2, 3, 4].map((s) => (
                                        <Star key={s} className="h-3.5 w-3.5 fill-gild text-gild" />
                                    ))}
                                    <span className="ml-1.5 text-sm font-bold text-plum">4.9</span>
                                </div>
                                <p className="mt-0.5 text-xs text-plum/55">620+ verified reviews</p>
                            </div>
                        </div>
                        <BreathOrb />
                    </motion.div>
                </motion.div>

                <motion.div
                    style={reduced ? undefined : { y: yArch }}
                    initial={reduced ? false : { opacity: 0, scale: 0.94, y: 40 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 1.3, ease: EASE_OUT }}
                    className="relative mx-auto w-full max-w-[430px]"
                >
                    <Tilt amount={5}>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2.5rem] rounded-t-full border border-copper/25 bg-gradient-to-b from-blush via-porcelain to-petal/70 shadow-lift">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(251,247,241,.9),transparent_55%)]" />
                            <div className="story-shaft absolute -left-10 top-0 h-full w-24 rotate-12 bg-gradient-to-b from-cream/70 to-transparent blur-xl" />
                            <FaceArt reduced={reduced} />
                            <DriftField count={9} />
                            <p className="absolute inset-x-0 bottom-4 text-center text-[10px] font-bold tracking-[0.4em] text-plum/45">
                                THE ELYSEA GLOW — Nº 01
                            </p>
                        </div>
                    </Tilt>

                    <motion.div style={reduced ? undefined : { y: yChipA }} className="absolute left-2 top-[20%] sm:-left-6">
                        <motion.div
                            initial={reduced ? false : { opacity: 0, scale: 0.8, x: -14 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ delay: 2.5, type: "spring", stiffness: 240, damping: 20 }}
                            className="flex items-center gap-2.5 rounded-full border border-sand bg-cream/90 px-4 py-2.5 shadow-lift backdrop-blur"
                        >
                            <Droplets className="h-4 w-4 text-mineral" />
                            <span>
                                <span className="block text-xs font-bold text-plum">Hydration +48%</span>
                                <span className="block text-[10px] text-plum/50">after one session</span>
                            </span>
                        </motion.div>
                    </motion.div>

                    <motion.div style={reduced ? undefined : { y: yChipB }} className="absolute bottom-[16%] right-2 sm:-right-4">
                        <motion.div
                            initial={reduced ? false : { opacity: 0, scale: 0.8, x: 14 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ delay: 2.7, type: "spring", stiffness: 240, damping: 20 }}
                            className="flex items-center gap-2.5 rounded-full border border-sand bg-cream/90 px-4 py-2.5 shadow-lift backdrop-blur"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage/60" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage" />
                            </span>
                            <span className="text-xs font-bold text-plum">Now booking · December</span>
                        </motion.div>
                    </motion.div>

                    <motion.div style={reduced ? undefined : { y: yChipA }} className="absolute -left-10 bottom-16 hidden md:block">
                        <motion.div
                            initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.9, type: "spring", stiffness: 200, damping: 18 }}
                        >
                            <RotatingBadge />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div style={reduced ? undefined : { opacity: fade }} className="relative mt-16 flex justify-center">
                <button
                    type="button"
                    onClick={() => scrollTo("#story")}
                    className="group flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-plum/50 transition-colors hover:text-copper"
                >
                    The story begins
                    <motion.span
                        animate={reduced ? undefined : { y: [0, 7, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="h-4 w-4" />
                    </motion.span>
                </button>
            </motion.div>
        </section>
    );
}