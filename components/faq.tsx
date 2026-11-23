"use client";

import { Phone } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Em, Reveal, SectionHeading } from "@/components/primitives";
import { useBooking } from "@/components/booking";
import { CLINIC, FAQS } from "@/lib/data";

export default function Faq() {
    const { openBooking } = useBooking();
    return (
        <section id="faq" className="scroll-mt-24 bg-porcelain py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <SectionHeading
                        eyebrow="Questions"
                        title={<>Before you <Em>visit.</Em></>}
                        description="The things everyone asks on the first call — answered here so your first visit can be about your skin, not the small print."
                    />
                    <Reveal delay={0.2}>
                        <div className="mt-8 rounded-[1.5rem] border border-sand bg-cream p-6">
                            <p className="text-sm font-semibold text-plum/60">Prefer to talk it through?</p>
                            <a
                                href={CLINIC.phoneHref}
                                className="mt-1 block font-display text-2xl font-medium text-plum transition-colors hover:text-copper"
                            >
                                {CLINIC.phone}
                            </a>
                            <p className="mt-1 text-xs text-plum/50">Mon–Fri 9–19 · Sat 10–17 · Pacific</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <Button variant="outline" size="sm" asChild>
                                    <a href={CLINIC.phoneHref}>
                                        <Phone className="h-3.5 w-3.5" />
                                        Call the clinic
                                    </a>
                                </Button>
                                <Button variant="accent" size="sm" onClick={() => openBooking()}>
                                    Book instead
                                </Button>
                            </div>
                        </div>
                    </Reveal>
                </div>
                <Reveal delay={0.1}>
                    <Accordion type="single" collapsible defaultValue="item-0">
                        {FAQS.map((f, i) => (
                            <AccordionItem key={f.q} value={`item-${i}`}>
                                <AccordionTrigger>{f.q}</AccordionTrigger>
                                <AccordionContent>{f.a}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Reveal>
            </div>
        </section>
    );
}