"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
  Star,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/918141115873?text=Hello%20Elysea%20Aesthetic%20Clinic%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.";

const SERVICE_CATEGORIES = [
  "Skin Concerns",
  "Cosmetic Procedures",
  "Medical Facials",
  "Hair",
  "Laser",
  "Minor Procedures",
];

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const entrance = (
    delay: number,
    distance = 24
  ) => ({
    initial: reducedMotion
      ? false
      : { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.85,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-porcelain pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-36"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 -top-28 h-[550px] w-[550px] rounded-full bg-blush/70 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 -right-32 h-[600px] w-[600px] rounded-full bg-petal/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Main hero layout */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14">

          {/* LEFT: Brand and introduction */}
          <div className="relative z-10">

            <motion.div
              {...entrance(0.1, 16)}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-copper" />

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-copper sm:text-[11px]">
                Elysea Aesthetic Clinic · Bharuch
              </span>
            </motion.div>

            <motion.h1
              {...entrance(0.2, 30)}
              className="max-w-[680px] font-display text-[clamp(3.2rem,6.5vw,5.8rem)] font-medium leading-[1.02] tracking-[-0.045em] text-plum"
            >
              Aesthetic care,

              <span className="mt-1 block font-display italic text-copper">
                centred on you.
              </span>
            </motion.h1>

            <motion.div
              {...entrance(0.35)}
              className="mt-7 max-w-xl"
            >
              <p className="text-[15px] leading-[1.95] text-plum/70 sm:text-base">
                Discover personalised skin, hair and aesthetic care
                at Elysea. Explore our range of skin treatments,
                cosmetic procedures, medical facials, hair care,
                laser treatments and minor procedures.
              </p>
            </motion.div>

            {/* Doctor information */}
            <motion.div
              {...entrance(0.45)}
              className="mt-8 flex items-start gap-4 border-l-2 border-copper/50 pl-5"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-wide text-plum">
                  Dr. Vrujal Mistry
                </p>

                <p className="mt-1 text-xs tracking-wide text-plum/60">
                  BHMS · PGDAM
                </p>

                <p className="mt-1.5 text-xs text-plum/55">
                  8+ years of experience in the medical field
                </p>
              </div>
            </motion.div>

            {/* Primary actions */}
            <motion.div
              {...entrance(0.55)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-plum px-7 py-4 text-sm font-semibold text-cream shadow-[0_14px_35px_-15px_rgba(58,36,48,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-copper hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4"
              >
                Enquire on WhatsApp

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="#treatments"
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-plum/20 px-7 py-4 text-sm font-semibold text-plum transition-all duration-300 hover:border-copper hover:bg-white/60 hover:text-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4"
              >
                Explore treatments

                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </motion.div>

            {/* Rating and location */}
            <motion.div
              {...entrance(0.65)}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-sand/90 pt-7"
            >
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-gild">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-3.5 w-3.5 fill-current"
                      />
                    ))}
                  </div>

                  <span className="text-sm font-bold text-plum">
                    4.7/5
                  </span>
                </div>

                <p className="mt-1 text-xs text-plum/55">
                  Google rating · 19 reviews
                </p>
              </div>

              <div className="h-9 w-px bg-sand" />

              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-copper" />

                <div>
                  <p className="text-sm font-semibold text-plum">
                    Bharuch
                  </p>
                  <p className="mt-0.5 text-xs text-plum/55">
                    Gujarat, India
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT: Actual Elysea clinic photograph */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0, scale: 0.97, y: 25 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-[650px]"
          >

            {/* Decorative frame */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2.6rem] border border-copper/20 sm:-inset-4"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-blush shadow-[0_35px_80px_-35px_rgba(58,36,48,0.38)] sm:rounded-[2.3rem]">

              <div className="relative aspect-[5/4] overflow-hidden">

                <Image
                  src="/images/clinic/elysea-reception-wide.jpg"
                  alt="Reception and interior of Elysea Aesthetic Clinic, Bharuch"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover object-center transition-transform duration-[1200ms] hover:scale-[1.035]"
                />

                {/* Cinematic image treatment */}
                <div className="absolute inset-0 bg-gradient-to-t from-plum/65 via-transparent to-plum/5" />

                {/* Image label */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <div className="flex items-end justify-between gap-4">

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/75 sm:text-[10px]">
                        Welcome to
                      </p>

                      <p className="mt-1 font-display text-3xl italic text-white sm:text-4xl">
                        Elysea
                      </p>

                      <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/75">
                        Aesthetic Clinic
                      </p>
                    </div>

                    <span className="mb-1 rounded-full border border-white/40 bg-white/15 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-white backdrop-blur-md sm:text-[10px]">
                      Bharuch · Gujarat
                    </span>

                  </div>
                </div>
              </div>
            </div>


          </motion.div>

        </div>

        {/* Service category strip */}
        <motion.div
          {...entrance(0.8, 16)}
          className="mt-24 border-t border-sand pt-7 lg:mt-28"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-copper sm:text-[10px]">
              Explore our services
            </p>

            <p className="text-[9px] uppercase tracking-[0.18em] text-plum/40">
              Six areas of care
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {SERVICE_CATEGORIES.map((category, index) => (
              <a
                key={category}
                href="#treatments"
                className="group flex items-center gap-2 border-b border-sand/70 pb-3 text-xs font-medium text-plum/70 transition-colors duration-300 hover:border-copper hover:text-copper sm:text-[13px]"
              >
                <span className="font-display text-sm italic text-copper/70">
                  0{index + 1}
                </span>

                <span>{category}</span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
