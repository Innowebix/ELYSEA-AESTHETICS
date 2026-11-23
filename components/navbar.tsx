"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, ArrowUpRight, Menu, Phone, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/primitives";
import { EASE_OUT, Magnetic } from "@/components/motion";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { useBooking } from "@/components/booking";
import { CLINIC } from "@/lib/data";
import { STORY_LINKS } from "@/lib/story";
import { cn } from "@/lib/utils";

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        mass: 0.4,
    });
    return (
        <motion.div
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-copper via-rose to-gild"
            aria-hidden="true"
        />
    );
}

export default function Navbar() {
    const { scrollTo, stop, start } = useSmoothScroll();
    const { openBooking } = useBooking();
    const [scrolled, setScrolled] = useState(false);
    const [showTop, setShowTop] = useState(false);
    const [active, setActive] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 32);
            setShowTop(window.scrollY > 900);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const ids = ["home", ...STORY_LINKS.map((l) => l.href.slice(1)), "faq"];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (menuOpen) {
            stop();
            document.body.style.overflow = "hidden";
        } else {
            start();
            document.body.style.overflow = "";
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        if (menuOpen) window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            start();
            document.body.style.overflow = "";
        };
    }, [menuOpen, stop, start]);

    const go = (href: string) => {
        setMenuOpen(false);
        window.setTimeout(() => scrollTo(href), menuOpen ? 380 : 0);
    };

    return (
        <>
            <ScrollProgress />
            <header className="fixed inset-x-0 top-0 z-50">
                <div
                    className={cn(
                        "transition-all duration-700",
                        menuOpen
                            ? "border-b border-transparent bg-transparent"
                            : scrolled
                                ? "border-b border-sand bg-porcelain/80 shadow-[0_8px_30px_-18px_rgba(58,36,48,.35)] backdrop-blur-xl"
                                : "border-b border-transparent bg-transparent"
                    )}
                >
                    <div
                        className={cn(
                            "mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-700",
                            scrolled && !menuOpen ? "h-16" : "h-20"
                        )}
                    >
                        <Logo tone={menuOpen ? "light" : "dark"} onClick={() => go("#home")} />

                        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
                            {STORY_LINKS.map((link) => {
                                const isActive = active === link.href.slice(1);
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            go(link.href);
                                        }}
                                        className={cn(
                                            "relative px-3.5 py-2 text-sm font-semibold tracking-wide transition-colors duration-300",
                                            isActive ? "text-plum" : "text-plum/55 hover:text-copper"
                                        )}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-underline"
                                                className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-copper to-rose"
                                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-2.5">
                            <a
                                href={CLINIC.phoneHref}
                                className={cn(
                                    "hidden h-10 w-10 place-items-center rounded-full border transition-colors xl:grid",
                                    menuOpen
                                        ? "border-cream/25 text-cream hover:border-gild hover:text-gild"
                                        : "border-plum/20 text-plum hover:border-copper hover:text-copper"
                                )}
                                aria-label={`Call us at ${CLINIC.phone}`}
                            >
                                <Phone className="h-4 w-4" />
                            </a>
                            <Magnetic strength={0.22} className="hidden md:inline-block">
                                <Button
                                    variant="accent"
                                    size="sm"
                                    className={cn(menuOpen && "invisible")}
                                    onClick={() => openBooking()}
                                >
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Book consultation
                                </Button>
                            </Magnetic>
                            <button
                                type="button"
                                onClick={() => setMenuOpen((o) => !o)}
                                aria-expanded={menuOpen}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                className={cn(
                                    "grid h-10 w-10 place-items-center rounded-full border transition-colors lg:hidden",
                                    menuOpen ? "border-cream/25 text-cream" : "border-plum/20 text-plum"
                                )}
                            >
                                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                        exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.65, ease: EASE_OUT }}
                        className="fixed inset-0 z-40 overflow-y-auto bg-plum lg:hidden"
                        data-lenis-prevent
                    >
                        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 animate-aurora-a rounded-full bg-rose/25 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 animate-aurora-b rounded-full bg-gild/15 blur-3xl" />
                        <motion.nav
                            className="relative flex min-h-full flex-col px-8 pb-10 pt-28"
                            initial="closed"
                            animate="open"
                            variants={{
                                open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                            }}
                            aria-label="Mobile"
                        >
                            {STORY_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    variants={{
                                        closed: { opacity: 0, y: 30 },
                                        open: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.7, ease: EASE_OUT },
                                        },
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        go(link.href);
                                    }}
                                    className="group flex items-baseline gap-4 border-b border-cream/10 py-4"
                                >
                                    <span className="font-display text-sm italic text-gild">
                                        0{i + 1}
                                    </span>
                                    <span className="font-display text-4xl font-medium text-cream transition-colors group-hover:text-petal">
                                        {link.label}
                                    </span>
                                    <ArrowUpRight className="ml-auto h-5 w-5 text-cream/30 transition-all group-hover:text-gild" />
                                </motion.a>
                            ))}
                            <motion.div
                                variants={{
                                    closed: { opacity: 0, y: 30 },
                                    open: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.7, ease: EASE_OUT },
                                    },
                                }}
                                className="mt-auto pt-10"
                            >
                                <p className="font-display text-xl italic text-petal">
                                    You are not a before photo.
                                </p>
                                <p className="mt-4 text-sm text-cream/55">{CLINIC.address1}</p>
                                <p className="text-sm text-cream/55">{CLINIC.address2}</p>
                                <a
                                    href={CLINIC.phoneHref}
                                    className="mt-2 block font-display text-xl text-gild"
                                >
                                    {CLINIC.phone}
                                </a>
                                <Button
                                    variant="accent"
                                    size="lg"
                                    className="mt-6 w-full"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        openBooking();
                                    }}
                                >
                                    <Sparkles className="h-4 w-4" />
                                    Book a consultation
                                </Button>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showTop && !menuOpen && (
                    <motion.button
                        type="button"
                        initial={{ opacity: 0, y: 18, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.9 }}
                        transition={{ ease: EASE_OUT, duration: 0.4 }}
                        onClick={() => scrollTo("#home")}
                        aria-label="Back to top"
                        className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-gild/40 bg-plum text-cream shadow-lift transition-colors hover:bg-copper"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}