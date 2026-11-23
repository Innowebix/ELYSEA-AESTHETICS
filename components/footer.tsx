"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    ArrowUp,
    CheckCheck,
    Facebook,
    Instagram,
    Send,
    Youtube,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo, Sparkle } from "@/components/primitives";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { useBooking } from "@/components/booking";
import { CLINIC, NAV_LINKS, TREATMENTS } from "@/lib/data";

export default function Footer() {
    const { scrollTo } = useSmoothScroll();
    const { openBooking } = useBooking();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
    const [disclaimer, setDisclaimer] = useState(false);

    const subscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setStatus("error");
            return;
        }
        setStatus("success");
    };

    return (
        <footer className="relative overflow-hidden bg-ink pb-8 pt-16 text-cream/75">
            <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 animate-aurora-a rounded-full bg-rose/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-aurora-b rounded-full bg-gild/10 blur-3xl" />

            <div aria-hidden="true" className="pointer-events-none relative select-none overflow-hidden leading-none">
                <span className="-mb-[4vw] block text-center font-display text-[24vw] font-semibold tracking-tight text-stroke-cream lg:-mb-14 lg:text-[19rem]">
                    ELYSEA
                </span>
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="flex flex-col justify-between gap-8 border-b border-cream/10 pb-12 lg:flex-row lg:items-center">
                    <div>
                        <h3 className="font-display text-3xl font-medium text-cream">
                            Glow notes, <em className="italic text-petal">monthly.</em>
                        </h3>
                        <p className="mt-2 max-w-md text-sm text-cream/55">
                            One considered email a month — protocols, skin science and first
                            access to new treatments. No noise, ever.
                        </p>
                    </div>
                    <div className="w-full max-w-md">
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="ok"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 rounded-2xl border border-sage/40 bg-sage/15 px-5 py-4"
                                >
                                    <CheckCheck className="h-5 w-5 shrink-0 text-sage" />
                                    <p className="text-sm font-semibold text-cream">
                                        You're on the list — your first Glow Note arrives December 1.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    exit={{ opacity: 0, y: -12 }}
                                    onSubmit={subscribe}
                                    noValidate
                                >
                                    <div className="flex gap-2">
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (status === "error") setStatus("idle");
                                            }}
                                            placeholder="your@email.com"
                                            aria-label="Email address"
                                            className="flex-1 rounded-full border-cream/20 bg-cream/10 text-cream placeholder:text-cream/35 focus-visible:border-gild focus-visible:ring-gild/25"
                                        />
                                        <Button variant="accent" type="submit">
                                            Subscribe
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {status === "error" && (
                                        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#F0A9B8]">
                                            <AlertCircle className="h-4 w-4" />
                                            Please enter a valid email address.
                                        </p>
                                    )}
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
                    <div>
                        <Logo tone="light" onClick={() => scrollTo("#home")} />
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
                            The art of luminous skin. Physician-led aesthetics in the heart of
                            Beverly Grove, since 2016.
                        </p>
                        <div className="mt-5 flex gap-2.5">
                            {[
                                { icon: Instagram, href: CLINIC.instagram, label: "Instagram" },
                                { icon: Facebook, href: CLINIC.facebook, label: "Facebook" },
                                { icon: Youtube, href: CLINIC.youtube, label: "YouTube" },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.label}
                                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gild hover:text-gild"
                                >
                                    <s.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <nav aria-label="Footer">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gild">Explore</p>
                        <ul className="mt-4 space-y-2.5">
                            {NAV_LINKS.map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollTo(l.href);
                                        }}
                                        className="text-sm text-cream/60 transition-colors hover:text-gild"
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gild">Treatments</p>
                        <ul className="mt-4 space-y-2.5">
                            {TREATMENTS.slice(0, 4).map((t) => (
                                <li key={t.id}>
                                    <button
                                        type="button"
                                        onClick={() => openBooking(t.id)}
                                        className="text-left text-sm text-cream/60 transition-colors hover:text-gild"
                                    >
                                        {t.name}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    type="button"
                                    onClick={() => scrollTo("#treatments")}
                                    className="flex items-center gap-1.5 text-sm font-semibold text-petal transition-colors hover:text-gild"
                                >
                                    <Sparkle className="h-2.5 w-2.5" /> View all nine
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gild">Contact</p>
                        <address className="mt-4 space-y-2.5 text-sm not-italic text-cream/60">
                            <p>{CLINIC.address1}</p>
                            <p>{CLINIC.address2}</p>
                            <p>
                                <a href={CLINIC.phoneHref} className="transition-colors hover:text-gild">{CLINIC.phone}</a>
                            </p>
                            <p>
                                <a href={`mailto:${CLINIC.email}`} className="transition-colors hover:text-gild">{CLINIC.email}</a>
                            </p>
                            <p className="pt-1 text-xs text-cream/40">Mon–Fri 9–19 · Thu until 20 · Sat 10–17</p>
                        </address>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row">
                    <p>© 2026 Elysea Aesthetics. All rights reserved.</p>
                    <div className="flex items-center gap-5">
                        <button
                            type="button"
                            onClick={() => setDisclaimer(true)}
                            className="transition-colors hover:text-gild"
                        >
                            Medical disclaimer
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollTo("#home")}
                            className="flex items-center gap-1.5 transition-colors hover:text-gild"
                        >
                            Back to top <ArrowUp className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>

            <Dialog open={disclaimer} onOpenChange={setDisclaimer}>
                <DialogContent className="max-w-md">
                    <DialogTitle>Medical disclaimer</DialogTitle>
                    <DialogDescription>
                        Elysea Aesthetics provides physician-led cosmetic treatments. Individual
                        results vary with skin type, lifestyle and adherence to aftercare; nothing
                        on this site guarantees a specific outcome.
                    </DialogDescription>
                    <p className="text-sm leading-relaxed text-plum/60">
                        Content in the Glow Journal is educational and is not a substitute for
                        personalised medical advice. All treatments are prescribed only after an
                        in-person consultation and medical history review.
                    </p>
                    <p className="text-sm leading-relaxed text-plum/60">
                        Before-and-after visuals on this page are illustrative simulations created
                        for design purposes.
                    </p>
                </DialogContent>
            </Dialog>
        </footer>
    );
}