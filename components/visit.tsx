
"use client";

import { useEffect, useState } from "react";

import {
    ArrowUpRight,
    CalendarDays,
    Instagram,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Em, Reveal, SectionHeading } from "@/components/primitives";
import { useBooking } from "@/components/booking";
import { CLINIC, HOURS } from "@/lib/data";
import { cn } from "@/lib/utils";

// Exact Google Maps embed supplied for Elysea Aesthetic Clinic
const MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12397.67144335569!2d73.03165271348787!3d21.726097808591486!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be021a386abab55%3A0x8095ac2d18619a44!2sElysea%20Aesthetic%20Clinic!5e1!3m2!1sen!2sin!4v1795422876863!5m2!1sen!2sin";

// Exact Google Maps directions destination
const MAP_DIRECTIONS_URL =
    "https://www.google.com/maps/dir/?api=1&destination=21.726097808591486%2C73.03165271348787";

function ClinicMap() {
    return (
        <div className="relative h-[320px] flex-1 overflow-hidden bg-[#eee8df] sm:h-[360px]">

            {/* Actual Google Maps */}
            <iframe
                title="Elysea Aesthetic Clinic Location"
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="clinic-map-frame absolute inset-0 h-full w-full"
            />

            {/* Subtle warm overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-plum/[0.06] via-transparent to-plum/[0.10]" />

            {/* Floating clinic identity */}
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 rounded-2xl border border-white/60 bg-cream/90 px-4 py-3 shadow-lg shadow-plum/10 backdrop-blur-md sm:left-5 sm:top-5">

                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-plum text-cream">
                    <MapPin className="h-4 w-4" />
                </span>

                <span className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-copper">
                        Find us
                    </span>

                    <span className="font-display text-base font-medium leading-tight text-plum">
                        Elysea Aesthetic Clinic
                    </span>
                </span>
            </div>

            {/* Location indicator */}
            <span className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/60 bg-cream/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-plum/70 shadow-sm backdrop-blur-md sm:bottom-5 sm:right-5">
                Exact Google Maps location
            </span>
        </div>
    );
}

export default function Visit() {
    const { openBooking } = useBooking();

    const [today, setToday] = useState(-1);

    useEffect(() => {
        setToday(new Date().getDay());
    }, []);

    return (
        <section
            id="visit"
            className="scroll-mt-24 bg-gradient-to-b from-porcelain to-blush/40 py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-6">

                <SectionHeading
                    eyebrow="Visit us"
                    title={
                        <>
                            Find your way to <Em>calm.</Em>
                        </>
                    }
                    description="Find Elysea Aesthetic Clinic at the exact location below. Open directions for your route and enjoy a smoother arrival."
                />

                <div className="mt-12 grid gap-8 lg:grid-cols-2">

                    {/* LEFT: LOCATION AND MAP */}
                    <Reveal className="flex">

                        <div className="flex w-full flex-col overflow-hidden rounded-[2rem] border border-sand bg-cream shadow-lift">

                            <ClinicMap />

                            {/* Map footer */}
                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sand p-5">

                                <div className="flex items-start gap-3">

                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-copper" />

                                    <div>
                                        <p className="text-sm font-bold text-plum">
                                            Elysea Aesthetic Clinic
                                        </p>

                                        <p className="text-sm text-plum/55">
                                            21.726098° N · 73.031653° E
                                        </p>
                                    </div>

                                </div>

                                <Button variant="outline" size="sm" asChild>
                                    <a
                                        href={MAP_DIRECTIONS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Get directions
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                </Button>

                            </div>

                        </div>

                    </Reveal>

                    {/* RIGHT: OPENING HOURS AND CONTACT */}
                    <div className="flex flex-col gap-6">

                        {/* Opening hours */}
                        <Reveal delay={0.1}>

                            <div className="rounded-[2rem] border border-sand bg-cream p-6 sm:p-7">

                                <div className="flex items-center justify-between">

                                    <h3 className="font-display text-xl font-medium text-plum">
                                        Opening hours
                                    </h3>

                                    <Badge variant="sage">
                                        Walk-ins welcome
                                    </Badge>

                                </div>

                                <div className="mt-4 space-y-1">

                                    {HOURS.map((row) => {

                                        const isToday = today === row.jsDay;

                                        return (
                                            <div
                                                key={row.label}
                                                className={cn(
                                                    "flex items-center justify-between rounded-lg px-2 py-1.5 text-sm",
                                                    isToday && "-mx-1 bg-blush/70 px-3"
                                                )}
                                            >

                                                <span
                                                    className={cn(
                                                        "flex items-center gap-2 font-semibold",
                                                        row.closed
                                                            ? "text-plum/40"
                                                            : "text-plum/75"
                                                    )}
                                                >
                                                    {row.label}

                                                    {isToday && (
                                                        <Badge variant="soft">
                                                            Today
                                                        </Badge>
                                                    )}

                                                </span>

                                                <span
                                                    className={cn(
                                                        "font-semibold",
                                                        row.closed
                                                            ? "text-rose/70"
                                                            : "text-plum"
                                                    )}
                                                >
                                                    {row.time}
                                                </span>

                                            </div>
                                        );
                                    })}

                                </div>

                                {/* Contact information */}
                                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-sand pt-4 text-sm">

                                    <a
                                        href={CLINIC.phoneHref}
                                        className="flex items-center gap-2 font-semibold text-plum transition-colors hover:text-copper"
                                    >
                                        <Phone className="h-4 w-4 text-copper" />
                                        {CLINIC.phone}
                                    </a>

                                    <a
                                        href={`mailto:${CLINIC.email}`}
                                        className="flex items-center gap-2 font-semibold text-plum transition-colors hover:text-copper"
                                    >
                                        <Mail className="h-4 w-4 text-copper" />
                                        {CLINIC.email}
                                    </a>

                                    <a
                                        href={CLINIC.instagram}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 font-semibold text-plum transition-colors hover:text-copper"
                                    >
                                        <Instagram className="h-4 w-4 text-copper" />
                                        @elysea.aesthetics
                                    </a>

                                </div>

                            </div>

                        </Reveal>

                        {/* Consultation CTA */}
                        <Reveal delay={0.2} className="flex-1">

                            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum to-ink p-7 sm:p-8">

                                {/* Background atmosphere */}
                                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-aurora-a rounded-full bg-rose/25 blur-3xl" />

                                <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 animate-aurora-b rounded-full bg-gild/15 blur-3xl" />

                                <div className="relative">

                                    <h3 className="font-display text-2xl font-medium text-cream sm:text-3xl">
                                        Your skin, on the{" "}
                                        <em className="italic text-petal">
                                            calendar.
                                        </em>
                                    </h3>

                                    <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/65">
                                        Consultations are complimentary and never rushed. Bring your
                                        questions, your current routine, and your barest skin.
                                    </p>

                                    <Button
                                        variant="accent"
                                        size="lg"
                                        className="mt-6"
                                        onClick={() => openBooking()}
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        Book a consultation
                                    </Button>

                                </div>

                                {/* Trust indicators */}
                                <div className="relative mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-cream/60">

                                    <span className="flex items-center gap-1.5">
                                        <ShieldCheck className="h-4 w-4 text-gild" />
                                        Licensed physicians
                                    </span>

                                    <span className="flex items-center gap-1.5">
                                        <CalendarDays className="h-4 w-4 text-gild" />
                                        Free reschedule · 24h
                                    </span>

                                    <span className="flex items-center gap-1.5">
                                        <Sparkles className="h-4 w-4 text-gild" />
                                        No deposit
                                    </span>

                                </div>

                            </div>

                        </Reveal>

                    </div>

                </div>

            </div>
        </section>
    );
}
