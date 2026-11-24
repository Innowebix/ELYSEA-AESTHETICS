"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/918141115873?text=Hello%20Elysea%20Aesthetic%20Clinic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.";

export default function Story() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="story"
      aria-labelledby="doctor-heading"
      className="relative isolate overflow-hidden bg-cream py-24 sm:py-28 lg:py-36"
    >
      {/* Subtle background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-blush/25 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 h-[450px] w-[450px] rounded-full bg-sand/30 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">

          {/* LEFT: Doctor portrait */}
          <motion.div
            {...reveal(0)}
            className="relative mx-auto w-full max-w-[510px]"
          >
            <div className="relative rounded-[2rem] border border-sand/80 bg-porcelain p-3 shadow-lift sm:rounded-[2.5rem] sm:p-4">

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand sm:rounded-[2rem]">

                <Image
                  src="/images/doctor/dr-vrujal-mistry.jpg"
                  alt="Dr. Vrujal Mistry of Elysea Aesthetic Clinic"
                  fill
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover object-top"
                />

              </div>

              {/* Image caption - outside the photograph */}
              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-5 sm:px-3 sm:pt-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-copper">
                    Elysea Aesthetic Clinic
                  </p>
                  <p className="mt-1 font-display text-lg italic text-plum">
                    Professional care, personal attention.
                  </p>
                </div>

                <span className="shrink-0 text-[10px] font-semibold tracking-widest text-plum/40">
                  BHARUCH
                </span>
              </div>

            </div>

            {/* Decorative frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -right-5 -z-10 h-36 w-36 rounded-br-[3rem] border-b border-r border-copper/30"
            />

          </motion.div>

          {/* RIGHT: Doctor introduction */}
          <div className="flex flex-col">

            <motion.div {...reveal(0.1)}>

              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-copper" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-copper sm:text-[11px]">
                  Meet your doctor
                </span>
              </div>

              <p className="font-display text-lg italic text-copper/80 sm:text-xl">
                The person behind Elysea
              </p>

              <h2
                id="doctor-heading"
                className="mt-3 font-display text-[clamp(2.7rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-[-0.035em] text-plum"
              >
                Dr. Vrujal

                <span className="mt-1 block italic text-copper">
                  Mistry
                </span>
              </h2>

              <div className="mt-7 h-px w-full max-w-[420px] bg-gradient-to-r from-copper/60 via-sand to-transparent" />

            </motion.div>

            <motion.div {...reveal(0.2)}>

              <p className="mt-7 text-sm font-semibold tracking-wide text-plum sm:text-base">
                Consultant Aesthetic Physician
              </p>

              <p className="mt-2 text-sm leading-7 text-plum/65">
                Cosmetologist &amp; Trichologist
              </p>

              <p className="mt-7 max-w-xl text-[14px] leading-[2] text-plum/70 sm:text-[15px]">
                Dr. Vrujal Mistry brings over eight years of experience
                in the medical field. Her qualifications and professional
                background form an important part of Elysea Aesthetic
                Clinic&apos;s identity.
              </p>

              <p className="mt-4 max-w-xl text-[14px] leading-[2] text-plum/70 sm:text-[15px]">
                At Elysea, the range of clinic services includes skin
                concerns, cosmetic procedures, medical facials, hair,
                laser and minor procedures.
              </p>

            </motion.div>

            {/* Professional credentials */}
            <motion.div
              {...reveal(0.3)}
              className="mt-9 grid grid-cols-2 gap-3 sm:gap-4"
            >

              <div className="rounded-2xl border border-sand/80 bg-white/55 p-4 sm:p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-copper">
                  Qualifications
                </p>

                <p className="mt-2 font-display text-xl text-plum sm:text-2xl">
                  BHMS · PGDAM
                </p>
              </div>

              <div className="rounded-2xl border border-sand/80 bg-white/55 p-4 sm:p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-copper">
                  Experience
                </p>

                <p className="mt-2 font-display text-xl text-plum sm:text-2xl">
                  8+ Years
                </p>

                <p className="mt-1 text-[10px] text-plum/55">
                  Medical field
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-sand/80 bg-white/55 p-4 sm:p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-copper">
                  Professional Registration
                </p>

                <p className="mt-2 text-sm font-semibold tracking-wide text-plum">
                  Registration No. G-25110
                </p>
              </div>

            </motion.div>

            {/* CTA */}
            <motion.div
              {...reveal(0.4)}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-plum px-7 py-4 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-1 hover:bg-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4"
              >
                Enquire on WhatsApp

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="#treatments"
                className="inline-flex min-h-[52px] items-center justify-center text-sm font-semibold text-plum/65 transition-colors hover:text-copper"
              >
                Explore our services
              </a>

            </motion.div>

          </div>

        </div>

        {/* Professional designation */}
        <motion.div
          {...reveal(0.2)}
          className="mt-24 border-t border-sand pt-7 sm:mt-28 sm:pt-9"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-copper">
                Elysea Aesthetic Clinic
              </p>

              <p className="mt-2 font-display text-xl italic text-plum sm:text-2xl">
                Skin · Hair · Laser
              </p>
            </div>

            <p className="max-w-md text-xs leading-6 text-plum/55 sm:text-right">
              An aesthetic clinic offering a range of skin, hair,
              laser and cosmetic services in Zadeshwar, Bharuch.
            </p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
