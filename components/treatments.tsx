"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Em, Reveal, SectionHeading } from "@/components/primitives";
import { useBooking } from "@/components/booking";
import { FILTERS, TREATMENTS, type Category, type Filter } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICON_STYLES: Record<Category, string> = {
    Facials: "from-blush to-petal/70 text-copper",
    Injectables: "from-rose/15 to-copper/20 text-rose",
    "Laser & Light": "from-gild/20 to-mineral/20 text-mineral",
};

export default function Treatments() {
    const { openBooking } = useBooking();
    const [filter, setFilter] = useState<Filter>("All");
    const filtered =
        filter === "All" ? TREATMENTS : TREATMENTS.filter((t) => t.category === filter);
    const count = (f: Filter) =>
        f === "All" ? TREATMENTS.length : TREATMENTS.filter((t) => t.category === f).length;

    return (
        <section
            id="treatments"
            className="relative scroll-mt-24 bg-gradient-to-b from-porcelain to-cream py-24 sm:py-32"
        >
            <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-[radial-gradient(circle_at_top_right,rgba(242,215,205,.7),transparent_70%)]" />
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading
                        eyebrow="Treatment menu"
                        title={<>Choose your <Em>glow.</Em></>}
                        description="Nine protocols, one philosophy: respect the barrier, chase the glow. Every plan begins with imaging-led analysis and ends with skin you recognise — only more luminous."
                    />
                    <Reveal delay={0.2} className="shrink-0">
                        <div className="flex flex-wrap gap-2">
                            {FILTERS.map((f) => {
                                const active = filter === f;
                                return (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => setFilter(f)}
                                        className={cn(
                                            "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                                            active ? "text-cream" : "text-plum/60 hover:text-plum"
                                        )}
                                    >
                                        {active && (
                                            <motion.span
                                                layoutId="filter-pill"
                                                className="absolute inset-0 rounded-full bg-plum shadow-md"
                                                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                            />
                                        )}
                                        <span className="relative z-10">
                                            {f}
                                            <span className={cn("ml-1.5 text-[10px] font-bold", active ? "text-gild" : "text-copper/70")}>
                                                {count(f)}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>

                <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((t) => {
                            const Icon = t.icon;
                            const index = TREATMENTS.findIndex((x) => x.id === t.id) + 1;
                            return (
                                <motion.article
                                    layout
                                    key={t.id}
                                    initial={{ opacity: 0, scale: 0.94 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.94 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="group relative flex flex-col rounded-[1.75rem] border border-sand bg-cream p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-copper/40 hover:shadow-lift"
                                >
                                    <div className="flex items-start justify-between">
                                        <span
                                            className={cn(
                                                "grid h-12 w-12 place-items-center rounded-2xl border border-white/60 bg-gradient-to-br transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
                                                ICON_STYLES[t.category]
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <span className="font-display text-xl italic text-plum/25">
                                            {String(index).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <div className="mt-5 flex items-center gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-copper/80">
                                            {t.category}
                                        </span>
                                        {t.flag && (
                                            <Badge variant={t.flag === "New" ? "rose" : "gild"}>{t.flag}</Badge>
                                        )}
                                    </div>
                                    <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-plum">
                                        {t.name}
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/65">
                                        {t.desc}
                                    </p>
                                    <div className="mt-5 flex items-center gap-3 border-t border-sand pt-4 text-sm text-plum/60">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-copper" />
                                            {t.duration}
                                        </span>
                                        <span className="h-1 w-1 rounded-full bg-sand" />
                                        <span>
                                            from <span className="font-bold text-plum">${t.price}</span>
                                        </span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="group/btn mt-5 w-full justify-between"
                                        onClick={() => openBooking(t.id)}
                                    >
                                        Book this treatment
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                                    </Button>
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                <Reveal delay={0.1} className="mt-10 text-center">
                    <p className="text-sm text-plum/55">
                        All treatments begin with a complimentary skin consultation. Prices vary by protocol.{" "}
                        <button
                            type="button"
                            onClick={() => openBooking()}
                            className="font-semibold text-copper underline-offset-4 hover:underline"
                        >
                            Not sure? Start with a consult →
                        </button>
                    </p>
                </Reveal>
            </div>
        </section>
    );
}