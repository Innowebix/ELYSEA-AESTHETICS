"use client";

import { useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Em, Monogram, Reveal, SectionHeading, Sparkle } from "@/components/primitives";
import { useBooking } from "@/components/booking";
import { ARTICLES, type Article } from "@/lib/data";
import { cn } from "@/lib/utils";

const COVERS: Record<Article["cover"], string> = {
    blush: "from-blush via-petal to-gild/60 text-copper",
    mineral: "from-mineral/25 via-blush to-rose/35 text-mineral",
    plum: "from-plum via-rose/70 to-copper/60 text-cream",
};

function Motif({ motif, className }: { motif: Article["motif"]; className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
            {motif === "rings" && (
                <>
                    <circle cx="32" cy="32" r="10" />
                    <circle cx="32" cy="32" r="19" opacity=".7" />
                    <circle cx="32" cy="32" r="28" opacity=".45" />
                    <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
                </>
            )}
            {motif === "drop" && (
                <>
                    <path d="M32 6C32 6 12 30 12 44a20 20 0 0 0 40 0C52 30 32 6 32 6Z" />
                    <path d="M22 44a10 10 0 0 0 8 10" opacity=".6" />
                </>
            )}
            {motif === "sun" && (
                <>
                    <circle cx="32" cy="32" r="11" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <line
                            key={deg}
                            x1="32"
                            y1="8"
                            x2="32"
                            y2="15"
                            transform={`rotate(${deg} 32 32)`}
                            opacity=".7"
                        />
                    ))}
                </>
            )}
        </svg>
    );
}

export default function Journal() {
    const { openBooking } = useBooking();
    const [article, setArticle] = useState<Article | null>(null);

    return (
        <section id="journal" className="scroll-mt-24 bg-cream py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading
                        eyebrow="The Glow Journal"
                        title={<>Notes from the <Em>treatment room.</Em></>}
                        description="Short, honest reads from our physicians — the science we practise, minus the noise of the internet."
                    />
                    <Reveal delay={0.2}>
                        <p className="text-sm font-semibold text-plum/50">New notes monthly · 3 latest below</p>
                    </Reveal>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {ARTICLES.map((a, i) => (
                        <Reveal key={a.id} delay={i * 0.1}>
                            <button
                                type="button"
                                onClick={() => setArticle(a)}
                                className="group flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-sand bg-porcelain text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-copper/40 hover:shadow-lift"
                            >
                                <div className={cn("relative h-52 overflow-hidden bg-gradient-to-br", COVERS[a.cover])}>
                                    <Motif
                                        motif={a.motif}
                                        className="absolute right-5 top-1/2 h-28 w-28 -translate-y-1/2 opacity-70 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"
                                    />
                                    <Badge variant={a.cover === "plum" ? "gild" : "soft"} className="absolute left-4 top-4">
                                        {a.category}
                                    </Badge>
                                    <span className={cn("absolute bottom-3 left-4 font-display text-2xl italic", a.cover === "plum" ? "text-cream/80" : "text-plum/50")}>
                                        {a.issue}
                                    </span>
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-3 text-xs text-plum/50">
                                        <span>{a.date}</span>
                                        <span className="h-1 w-1 rounded-full bg-sand" />
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {a.read}
                                        </span>
                                    </div>
                                    <h3 className="mt-3 font-display text-2xl font-medium leading-snug text-plum">
                                        {a.title}
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/65">{a.excerpt}</p>
                                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-copper">
                                        Read article
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </span>
                                </div>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            <Dialog open={!!article} onOpenChange={(o) => !o && setArticle(null)}>
                <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0 sm:rounded-[1.75rem]">
                    {article && (
                        <div className="max-h-[86vh] overflow-y-auto" data-lenis-prevent>
                            <div className={cn("relative h-28 bg-gradient-to-br", COVERS[article.cover])}>
                                <Motif motif={article.motif} className="absolute right-8 top-1/2 h-20 w-20 -translate-y-1/2 opacity-70" />
                                <Badge variant={article.cover === "plum" ? "gild" : "soft"} className="absolute left-6 top-6">
                                    {article.category}
                                </Badge>
                                <span className={cn("absolute bottom-4 left-6 font-display text-xl italic", article.cover === "plum" ? "text-cream/80" : "text-plum/50")}>
                                    {article.issue}
                                </span>
                            </div>
                            <div className="p-6 sm:p-10">
                                <DialogTitle className="text-3xl sm:text-4xl">{article.title}</DialogTitle>
                                <DialogDescription className="mt-3 text-base">{article.excerpt}</DialogDescription>
                                <div className="mt-5 flex items-center gap-3 border-y border-sand py-4">
                                    <Monogram initials={article.initials} gradient={article.gradient} className="h-10 w-10" />
                                    <div>
                                        <p className="text-sm font-bold text-plum">{article.author}</p>
                                        <p className="text-xs text-plum/55">
                                            {article.role} · {article.date} · {article.read}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-plum/75">
                                    {article.body.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                                <blockquote className="mt-7 border-l-2 border-copper pl-5 font-display text-xl italic leading-snug text-plum/85">
                                    {article.quote}
                                </blockquote>
                                <div className="mt-7 rounded-2xl bg-blush/50 p-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Take it home</p>
                                    <ul className="mt-3 space-y-2.5">
                                        {article.tips.map((tip) => (
                                            <li key={tip} className="flex gap-2.5 text-sm leading-relaxed text-plum/75">
                                                <Sparkle className="mt-1 h-3 w-3 shrink-0 text-gild" />
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sand pt-6">
                                    <p className="text-xs text-plum/45">Educational content — not medical advice.</p>
                                    <Button
                                        variant="accent"
                                        size="sm"
                                        onClick={() => {
                                            setArticle(null);
                                            openBooking();
                                        }}
                                    >
                                        Book a consultation
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}