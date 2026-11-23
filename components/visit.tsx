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

const MAP_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="elysea-map-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F6EFE7"/>
      <stop offset="1" stop-color="#F2D7CD"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#elysea-map-bg)"/>
  <g fill="#FBF7F1" stroke="#E7DAC8">
    <rect x="40" y="40" width="120" height="90" rx="8"/>
    <rect x="210" y="30" width="140" height="100" rx="8"/>
    <rect x="420" y="220" width="130" height="70" rx="8"/>
    <rect x="60" y="200" width="90" height="90" rx="8"/>
    <rect x="210" y="200" width="140" height="90" rx="8"/>
    <rect x="420" y="340" width="130" height="50" rx="8"/>
    <rect x="40" y="340" width="110" height="50" rx="8"/>
  </g>
  <ellipse cx="490" cy="100" rx="75" ry="52" fill="#6F8560" opacity="0.18"/>
  <circle cx="468" cy="88" r="7" fill="#6F8560" opacity="0.35"/>
  <circle cx="508" cy="112" r="8" fill="#6F8560" opacity="0.35"/>
  <circle cx="484" cy="126" r="5" fill="#6F8560" opacity="0.35"/>
  <g stroke="#E0D0BA" stroke-width="14" stroke-linecap="round" fill="none">
    <path d="M0 160 H600"/>
    <path d="M180 0 V400"/>
    <path d="M380 0 V400"/>
    <path d="M0 320 H600"/>
  </g>
  <g stroke="#B4643C" stroke-width="1.5" stroke-dasharray="6 8" opacity="0.35" fill="none">
    <path d="M0 160 H600"/>
    <path d="M180 0 V400"/>
    <path d="M380 0 V400"/>
    <path d="M0 320 H600"/>
  </g>
  <text x="14" y="148" font-size="9" letter-spacing="2.5" fill="#3A2430" opacity="0.45" font-weight="700">ROSEWATER LANE</text>
  <text x="192" y="390" font-size="9" letter-spacing="2.5" fill="#3A2430" opacity="0.45" font-weight="700">PALM COURT</text>
  <text x="392" y="24" font-size="9" letter-spacing="2.5" fill="#3A2430" opacity="0.45" font-weight="700">GROVE AVE</text>
  <g transform="translate(556,36)">
    <circle r="14" fill="#FBF7F1" stroke="#B4643C" stroke-opacity="0.5"/>
    <path d="M0 -8 L4 6 L0 3 L-4 6 Z" fill="#B4643C"/>
  </g>
  <g transform="translate(24,374)">
    <rect width="60" height="3" fill="#3A2430" opacity="0.4"/>
    <text y="-6" font-size="8" fill="#3A2430" opacity="0.5" font-weight="700">200 M</text>
  </g>
</svg>`;

function StylizedMap() {
    return (
        <div className="relative min-h-[300px] flex-1 overflow-hidden sm:min-h-[340px]">
            <div
                className="absolute inset-0"
                dangerouslySetInnerHTML={{ __html: MAP_SVG }}
            />
            <div className="absolute left-[63%] top-[40%] -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-10 w-10">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose/50" />
                    <span className="relative grid h-10 w-10 place-items-center rounded-full bg-rose text-cream shadow-lift ring-4 ring-cream/70">
                        <MapPin className="h-5 w-5" />
                    </span>
                </span>
                <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-sand bg-cream/95 px-3 py-1 text-[11px] font-bold text-plum shadow-sm">
                    ELYSEA · SUITE 4
                </span>
            </div>
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
                    description="Above the rosewater courtyard in Beverly Grove — validated parking, matcha on arrival, and a treatment room that feels nothing like a clinic."
                />
                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    <Reveal className="flex">
                        <div className="flex w-full flex-col overflow-hidden rounded-[2rem] border border-sand bg-cream shadow-lift">
                            <StylizedMap />
                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sand p-5">
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                                    <div>
                                        <p className="text-sm font-bold text-plum">{CLINIC.address1}</p>
                                        <p className="text-sm text-plum/55">{CLINIC.address2}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={CLINIC.mapsUrl} target="_blank" rel="noreferrer">
                                        Get directions
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </Reveal>

                    <div className="flex flex-col gap-6">
                        <Reveal delay={0.1}>
                            <div className="rounded-[2rem] border border-sand bg-cream p-6 sm:p-7">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-display text-xl font-medium text-plum">
                                        Opening hours
                                    </h3>
                                    <Badge variant="sage">Walk-ins welcome</Badge>
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
                                                        row.closed ? "text-plum/40" : "text-plum/75"
                                                    )}
                                                >
                                                    {row.label}
                                                    {isToday && <Badge variant="soft">Today</Badge>}
                                                </span>
                                                <span
                                                    className={cn(
                                                        "font-semibold",
                                                        row.closed ? "text-rose/70" : "text-plum"
                                                    )}
                                                >
                                                    {row.time}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-sand pt-4 text-sm">
                                    <a
                                        href={CLINIC.phoneHref}
                                        className="flex items-center gap-2 font-semibold text-plum transition-colors hover:text-copper"
                                    >
                                        <Phone className="h-4 w-4 text-copper" /> {CLINIC.phone}
                                    </a>
                                    <a
                                        href={`mailto:${CLINIC.email}`}
                                        className="flex items-center gap-2 font-semibold text-plum transition-colors hover:text-copper"
                                    >
                                        <Mail className="h-4 w-4 text-copper" /> {CLINIC.email}
                                    </a>
                                    <a
                                        href={CLINIC.instagram}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 font-semibold text-plum transition-colors hover:text-copper"
                                    >
                                        <Instagram className="h-4 w-4 text-copper" /> @elysea.aesthetics
                                    </a>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2} className="flex-1">
                            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum to-ink p-7 sm:p-8">
                                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-aurora-a rounded-full bg-rose/25 blur-3xl" />
                                <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 animate-aurora-b rounded-full bg-gild/15 blur-3xl" />
                                <div className="relative">
                                    <h3 className="font-display text-2xl font-medium text-cream sm:text-3xl">
                                        Your skin, on the{" "}
                                        <em className="italic text-petal">calendar.</em>
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
                                <div className="relative mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-cream/60">
                                    <span className="flex items-center gap-1.5">
                                        <ShieldCheck className="h-4 w-4 text-gild" /> Licensed physicians
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <CalendarDays className="h-4 w-4 text-gild" /> Free reschedule · 24h
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Sparkles className="h-4 w-4 text-gild" /> No deposit
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