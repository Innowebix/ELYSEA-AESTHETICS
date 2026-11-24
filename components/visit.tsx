
"use client";

import { useEffect, useState } from "react";

import {
    ArrowUpRight,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Em, Reveal, SectionHeading } from "@/components/primitives";
import { CLINIC, HOURS, createWhatsAppUrl } from "@/lib/clinic";
import { cn } from "@/lib/utils";

function ClinicMap() {
    const [mapLoaded, setMapLoaded] = useState(false);

    return (
        <div className="relative h-[320px] flex-1 overflow-hidden bg-[#eee8df] sm:h-[360px]">

            {mapLoaded ? (
                <iframe
                    title="Elysea Aesthetic Clinic Location on Google Maps"
                    src={CLINIC.mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="clinic-map-frame absolute inset-0 h-full w-full"
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blush via-porcelain to-sand p-6 text-center">
                    <MapPin className="h-8 w-8 text-copper" aria-hidden="true" />
                    <p className="mt-3 font-display text-xl text-plum">View Elysea on Google Maps</p>
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-plum/60">
                        Loading the embedded map connects to Google Maps.
                    </p>
                    <button
                        type="button"
                        onClick={() => setMapLoaded(true)}
                        className="mt-4 rounded-full bg-plum px-5 py-3 text-xs font-semibold text-cream transition-colors hover:bg-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
                    >
                        Load Google Map
                    </button>
                    <a
                        href={CLINIC.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 text-xs font-semibold text-plum underline underline-offset-4 hover:text-copper"
                    >
                        Open Google Maps directly
                    </a>
                </div>
            )}

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
    const [today, setToday] = useState("");

    useEffect(() => {
        setToday(
            new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                timeZone: CLINIC.timezone,
            }).format(new Date())
        );
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
                                        href={CLINIC.mapsDirectionsUrl}
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
                                        Contact for availability
                                    </Badge>

                                </div>

                                <div className="mt-4 space-y-1">

                                    {HOURS.map((row) => {

                                        const isToday = today === row.label;

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
                                        href={CLINIC.emailHref}
                                        className="flex items-center gap-2 font-semibold text-plum transition-colors hover:text-copper"
                                    >
                                        <Mail className="h-4 w-4 text-copper" />
                                        {CLINIC.email}
                                    </a>

                                    {CLINIC.instagram ? (
                                        <a
                                            href={CLINIC.instagram}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 font-semibold text-plum transition-colors hover:text-copper"
                                        >
                                            <Instagram className="h-4 w-4 text-copper" />
                                            @elysea.aesthetics
                                        </a>
                                    ) : null}

                                </div>

                            </div>

                        </Reveal>

                        {/* WhatsApp enquiry CTA */}
                        <Reveal delay={0.2} className="flex-1">

                            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum to-ink p-7 sm:p-8">

                                {/* Background atmosphere */}
                                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-aurora-a rounded-full bg-rose/25 blur-3xl" />

                                <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 animate-aurora-b rounded-full bg-gild/15 blur-3xl" />

                                <div className="relative">

                                    <h3 className="font-display text-2xl font-medium text-cream sm:text-3xl">
                                        Questions about a{" "}
                                        <em className="italic text-petal">
                                            service?
                                        </em>
                                    </h3>

                                    <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/65">
                                        Contact Elysea directly to ask which services are available and plan a visit.
                                    </p>

                                    <Button
                                        variant="accent"
                                        size="lg"
                                        className="mt-6"
                                        asChild
                                    >
                                        <a
                                            href={createWhatsAppUrl("Hello Elysea Aesthetic Clinic, I would like to enquire about your services and visit availability.")}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Sparkles className="h-4 w-4" />
                                            Enquire on WhatsApp
                                        </a>
                                    </Button>

                                </div>

                                <p className="relative mt-7 text-xs leading-relaxed text-cream/60">
                                    Contact the clinic directly before travelling.
                                </p>

                            </div>

                        </Reveal>

                    </div>

                </div>

            </div>
        </section>
    );
}
