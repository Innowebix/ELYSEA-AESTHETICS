"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Droplets,
  Flower2,
  Leaf,
  ScanFace,
  Sparkles,
  Zap,
} from "lucide-react";

const SERVICES = [
  {
    number: "01",
    name: "Skin Concern",
    subtitle: "Skin care",
    icon: ScanFace,
    services: [
      "Acne & Acne Scar Treatment",
      "Anti-Ageing & Wrinkle Reduction",
      "Melasma & Pigmentation Treatment",
      "Skin Rejuvenation",
    ],
  },
  {
    number: "02",
    name: "Cosmetic Procedure",
    subtitle: "Aesthetic procedures",
    icon: Sparkles,
    services: [
      "Microdermabrasion",
      "Chemical Peels",
      "Mesotherapy",
      "Microneedling",
      "PRP & GFC Therapy",
      "RF Skin Tightening",
      "LED Light Therapy",
    ],
  },
  {
    number: "03",
    name: "Medical Facials",
    subtitle: "Facial treatments",
    icon: Flower2,
    services: [
      "Hydra Facial",
      "Oxy Facial",
      "Carbon Laser Facial",
      "Vampire (PRP) Facial",
      "Korean Glass Skin Facial",
    ],
  },
  {
    number: "04",
    name: "Hair",
    subtitle: "Hair & scalp care",
    icon: Leaf,
    services: [
      "Hair Fall Diagnosis",
      "Hair Loss Treatment",
      "Anti-dandruff Treatment",
      "Alopecia Management",
      "Hair Mesotherapy",
      "Hair Microneedling",
      "PRP And GFC Therapy",
      "LED Light Therapy",
    ],
  },
  {
    number: "05",
    name: "Laser",
    subtitle: "Laser treatments",
    icon: Zap,
    services: [
      "Laser Hair Reduction",
      "Beard Shaping",
      "Tattoo Removal",
      "Carbon Laser Peel",
      "Laser Skin Toning",
    ],
  },
  {
    number: "06",
    name: "Minor Procedures",
    subtitle: "Clinical procedures",
    icon: Droplets,
    services: [
      "Ear Lobe Repair",
      "Nail Avulsion",
      "Wart And Skin Tag Excision",
      "Mole Removal",
      "Milia Extraction",
    ],
  },
] as const;

function getWhatsAppLink(category: string) {
  const message =
    `Hello Elysea Aesthetic Clinic, I would like to enquire about ${category} services.`;

  return `https://wa.me/918141115873?text=${encodeURIComponent(message)}`;
}

export default function Treatments() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="treatments"
      aria-labelledby="treatments-heading"
      className="relative isolate overflow-hidden bg-gradient-to-b from-porcelain to-cream py-24 sm:py-28 lg:py-36"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-28 h-[500px] w-[500px] rounded-full bg-blush/30 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-petal/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-copper/70" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-copper sm:text-[11px]">
              Discover Elysea
            </span>

            <span className="h-px w-10 bg-copper/70" />
          </div>

          <h2
            id="treatments-heading"
            className="font-display text-[clamp(2.8rem,5.5vw,4.8rem)] font-medium leading-[1.08] tracking-[-0.04em] text-plum"
          >
            Our treatments

            <span className="mt-2 block italic text-copper">
              & services.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-[1.9] text-plum/65 sm:text-base">
            Explore the range of skin, hair, laser and aesthetic
            services offered at Elysea Aesthetic Clinic.
          </p>

          <div className="mt-7 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-sand" />
            <span className="font-display text-sm italic tracking-wide text-copper/80">
              Skin · Hair · Laser
            </span>
            <span className="h-px w-8 bg-sand" />
          </div>
        </motion.div>

        {/* Service categories */}
        <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6 sm:mt-16">

          {SERVICES.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={category.number}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 28 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.65,
                  delay: reducedMotion ? 0 : (index % 3) * 0.1,
                  ease: "easeOut",
                }}
                className="group relative flex flex-col overflow-hidden rounded-[1.8rem] border border-sand/80 bg-cream/90 p-6 shadow-[0_12px_40px_-30px_rgba(58,36,48,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:border-copper/40 hover:shadow-lift sm:p-7"
              >

                {/* Decorative corner detail */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-copper/10 transition-transform duration-700 group-hover:scale-125"
                />

                {/* Card heading */}
                <div className="relative flex items-start justify-between gap-3">

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-copper/80">
                      {category.subtitle}
                    </p>

                    <h3 className="mt-2 font-display text-[1.65rem] font-medium leading-tight text-plum sm:text-[1.8rem]">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-plum/40">
                      {String(category.services.length).padStart(2, "0")} Services
                    </p>
                  </div>

                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-copper/15 bg-blush/45 text-copper transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-plum group-hover:text-cream">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                </div>

                {/* Divider */}
                <div className="relative my-5 h-px bg-gradient-to-r from-copper/40 via-sand to-transparent" />

                {/* Service list */}
                <ul className="relative flex-1 space-y-3">
                  {category.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-3 text-[13px] leading-[1.65] text-plum/75 sm:text-sm"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-copper/75"
                      />

                      <span>{service}</span>
                    </li>
                  ))}
                </ul>

                {/* WhatsApp enquiry */}
                <div className="relative mt-7 border-t border-sand/70 pt-5">
                  <a
                    href={getWhatsAppLink(category.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Enquire about ${category.name} services on WhatsApp`}
                    className="group/link inline-flex w-full items-center justify-between gap-3 text-xs font-semibold tracking-wide text-plum transition-colors duration-300 hover:text-copper"
                  >
                    <span>Enquire about these services</span>

                    <span className="grid h-9 w-9 place-items-center rounded-full border border-sand transition-all duration-300 group-hover/link:border-copper group-hover/link:bg-plum group-hover/link:text-cream">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </span>
                  </a>
                </div>

              </motion.article>
            );
          })}

        </div>

        {/* Section closing */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 flex flex-col items-center gap-4 border-t border-sand/80 pt-9 text-center"
        >
          <p className="font-display text-xl italic text-plum/80 sm:text-2xl">
            Discover the services available at Elysea.
          </p>

          <a
            href={getWhatsAppLink("all treatment categories")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full bg-plum px-7 py-4 text-xs font-semibold tracking-wide text-cream transition-all duration-300 hover:-translate-y-1 hover:bg-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4"
          >
            Enquire with Elysea

            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
