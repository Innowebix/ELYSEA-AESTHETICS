"use client";

import { useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Logo } from "@/components/primitives";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { CLINIC, SERVICE_CATEGORIES, createWhatsAppUrl } from "@/lib/clinic";

const WHATSAPP_URL = createWhatsAppUrl(
  "Hello Elysea Aesthetic Clinic, I would like to enquire about your services."
);

const NAVIGATION = [
  { label: "Meet the Doctor", href: "#story" },
  { label: "Treatments & Services", href: "#treatments" },
  { label: "The Method", href: "#philosophy" },
  { label: "Our Clinic", href: "#results" },
  { label: "FAQs", href: "#faq" },
  { label: "Visit Us", href: "#visit" },
];

export default function Footer() {
  const { scrollTo } = useSmoothScroll();
  const [disclaimer, setDisclaimer] = useState(false);

  const socialLinks = [
    { icon: Instagram, href: CLINIC.instagram, label: "Instagram" },
    { icon: Facebook, href: CLINIC.facebook, label: "Facebook" },
    { icon: Youtube, href: CLINIC.youtube, label: "YouTube" },
  ].filter((item) => Boolean(item.href));

  const navigateTo = (href: string) => {
    scrollTo(href);
  };

  return (
    <footer className="relative overflow-hidden bg-ink pb-8 pt-16 text-cream/75">

      {/* Existing atmospheric background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 animate-aurora-a rounded-full bg-rose/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-aurora-b rounded-full bg-gild/10 blur-3xl" />

      {/* Oversized ELYSEA branding - intentionally preserved */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative select-none overflow-hidden leading-none"
      >
        <span className="-mb-[4vw] block text-center font-display text-[24vw] font-semibold tracking-tight text-stroke-cream lg:-mb-14 lg:text-[19rem]">
          ELYSEA
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Clinic enquiry strip */}
        <div className="flex flex-col justify-between gap-5 border-b border-cream/10 pb-10 sm:flex-row sm:items-center">

          <div>
            <p className="font-display text-2xl text-cream sm:text-3xl">
              Your journey begins at
              <span className="ml-2 italic text-petal">Elysea.</span>
            </p>

            <p className="mt-2 text-xs leading-6 text-cream/50 sm:text-sm">
              Skin · Hair · Laser · Aesthetic Care
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[50px] shrink-0 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#B4643C] to-[#C4526A] px-6 py-3 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gild focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
          >
            <MessageCircle className="h-4 w-4" />

            Enquire on WhatsApp

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

        </div>

        {/* Main footer columns */}
        <div className="mt-12 grid gap-11 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr] lg:gap-10">

          {/* Brand column */}
          <div>

            <Logo
              tone="light"
              onClick={() => navigateTo("#home")}
            />

            <p className="mt-5 max-w-xs text-sm leading-[1.9] text-cream/55">
              Elysea Aesthetic Clinic offers a range of skin,
              hair, cosmetic, facial and laser services in
              Bharuch, Gujarat.
            </p>

            {/* Social accounts - displayed only when configured */}
            {socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2.5">

                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Elysea on ${item.label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/65 transition-all duration-300 hover:-translate-y-1 hover:border-gild hover:text-gild"
                  >
                    <item.icon className="h-4 w-4" />
                  </a>
                ))}

              </div>
            )}

            <div className="mt-7 flex items-center gap-2">
              <span className="h-px w-7 bg-gild/70" />

              <span className="text-[9px] font-bold uppercase tracking-[0.23em] text-gild">
                Skin · Hair · Laser
              </span>
            </div>

          </div>

          {/* Explore */}
          <nav aria-label="Explore Elysea">

            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gild">
              Explore
            </p>

            <ul className="mt-5 space-y-3.5">

              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(item.href);
                    }}
                    className="inline-flex text-sm text-cream/60 transition-all duration-300 hover:translate-x-1 hover:text-gild"
                  >
                    {item.label}
                  </a>
                </li>
              ))}

            </ul>

          </nav>

          {/* Treatments */}
          <nav aria-label="Elysea treatment categories">

            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gild">
              Treatments
            </p>

            <ul className="mt-5 space-y-3.5">

              {SERVICE_CATEGORIES.map((category) => (
                <li key={category.number}>
                  <a
                    href="#treatments"
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo("#treatments");
                    }}
                    className="group inline-flex items-center gap-2 text-sm text-cream/60 transition-colors duration-300 hover:text-gild"
                  >
                    <span className="text-[9px] tracking-wider text-gild/65">
                      {category.number}
                    </span>

                    <span>{category.name}</span>
                  </a>
                </li>
              ))}

            </ul>

          </nav>

          {/* Contact */}
          <div>

            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gild">
              Contact
            </p>

            <address className="mt-5 space-y-5 not-italic">

              {/* Address */}
              <div className="flex items-start gap-3">

                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gild" />

                <p className="text-sm leading-[1.85] text-cream/60">
                  {CLINIC.fullAddress}
                </p>

              </div>

              {/* Phone */}
              <a
                href={CLINIC.phoneHref}
                className="flex items-center gap-3 text-sm text-cream/60 transition-colors hover:text-gild"
              >
                <Phone className="h-4 w-4 shrink-0 text-gild" />

                {CLINIC.phone}
              </a>

              {/* Email */}
              <a
                href={CLINIC.emailHref}
                className="flex items-start gap-3 break-all text-sm text-cream/60 transition-colors hover:text-gild"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gild" />

                {CLINIC.email}
              </a>

            </address>



          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-xs text-cream/40 sm:flex-row">

          <p>
            © Elysea Aesthetic Clinic.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">

            <button
              type="button"
              onClick={() => setDisclaimer(true)}
              className="transition-colors hover:text-gild"
            >
              Medical disclaimer
            </button>

            <button
              type="button"
              onClick={() => navigateTo("#home")}
              className="group flex items-center gap-2 transition-colors hover:text-gild"
            >
              Back to top

              <span className="grid h-7 w-7 place-items-center rounded-full border border-cream/20 transition-all duration-300 group-hover:border-gild group-hover:bg-gild group-hover:text-ink">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>

          </div>

        </div>

      </div>

      {/* Medical disclaimer dialog */}
      <Dialog open={disclaimer} onOpenChange={setDisclaimer}>

        <DialogContent className="max-w-md">

          <DialogTitle>
            Medical disclaimer
          </DialogTitle>

          <DialogDescription>
            Information on this website describes the services
            available at Elysea Aesthetic Clinic and is intended
            for general informational purposes.
          </DialogDescription>

          <p className="text-sm leading-relaxed text-plum/60">
            Website content is not a substitute for personalised
            medical advice, diagnosis or treatment. Individual
            requirements may differ. Please contact the clinic
            directly for information about a particular service.
          </p>

          <p className="text-sm leading-relaxed text-plum/60">
            Treatment suitability and relevant details should
            be discussed with the clinic before proceeding.
          </p>

        </DialogContent>

      </Dialog>

    </footer>
  );
}
