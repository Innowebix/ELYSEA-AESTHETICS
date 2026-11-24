"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function Results() {
  const reducedMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="results"
      aria-labelledby="clinic-gallery-heading"
      className="relative isolate overflow-hidden bg-porcelain py-24 sm:py-28 lg:py-36"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-blush/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <motion.div
          {...reveal(0)}
          className="mb-12 flex flex-col justify-between gap-5 lg:mb-16 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-copper" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-copper sm:text-[11px]">
                A glimpse inside Elysea
              </span>
            </div>

            <h2
              id="clinic-gallery-heading"
              className="font-display text-[clamp(2.8rem,5.5vw,4.8rem)] font-medium leading-[1.08] tracking-[-0.04em] text-plum"
            >
              A space that feels

              <span className="mt-2 block italic text-copper">
                like Elysea.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-[1.95] text-plum/65 sm:text-base">
            Take a closer look at Elysea Aesthetic Clinic.
            Explore our reception, discover our identity
            and find us in Zadeshwar, Bharuch.
          </p>
        </motion.div>

        {/* Photography layout */}
        <div className="grid items-stretch gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">

          {/* Main reception photograph */}
          <motion.figure
            {...reveal(0.1)}
            className="group relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/70 bg-sand shadow-[0_24px_65px_-35px_rgba(58,36,48,0.4)] sm:min-h-[560px] lg:min-h-[660px]"
          >

            <Image
              src="/images/clinic/elysea-reception-portrait.jpg"
              alt="Reception area at Elysea Aesthetic Clinic in Bharuch"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.025]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-plum/5" />

            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-9">

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/75">
                Welcome to Elysea
              </p>

              <p className="mt-2 font-display text-3xl italic text-white sm:text-4xl">
                Our reception
              </p>

              <p className="mt-2 max-w-sm text-xs leading-6 text-white/75 sm:text-sm">
                Visit us at our clinic in Sharnam Sky,
                Zadeshwar, Bharuch.
              </p>

            </figcaption>

          </motion.figure>

          {/* Supporting content */}
          <div className="grid gap-5 lg:grid-rows-[1.05fr_0.95fr] lg:gap-6">

            {/* Elysea branding photograph */}
            <motion.figure
              {...reveal(0.2)}
              className="group relative min-h-[270px] overflow-hidden rounded-[2rem] border border-white/70 bg-sand shadow-[0_20px_55px_-35px_rgba(58,36,48,0.35)] sm:min-h-[340px] lg:min-h-0"
            >

              <Image
                src="/images/clinic/elysea-logo-wall.jpg"
                alt="Elysea butterfly and face logo displayed on the clinic wall"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.035]"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/65 to-transparent p-6 sm:p-7">

                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/75">
                  Our identity
                </p>

                <p className="mt-2 font-display text-2xl italic text-white sm:text-3xl">
                  The Elysea experience
                </p>

              </div>

            </motion.figure>

            {/* Clinic address card */}
            <motion.div
              {...reveal(0.3)}
              className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-plum p-7 text-cream shadow-[0_20px_55px_-30px_rgba(58,36,48,0.5)] sm:p-9"
            >

              {/* Decorative element */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10"
              />

              <div className="relative">

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gild" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.27em] text-gild">
                    Find us in Bharuch
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-medium leading-tight text-cream sm:text-3xl">
                  Your visit to
                  <span className="block italic text-gild">
                    Elysea.
                  </span>
                </h3>

                <p className="mt-5 max-w-md text-sm leading-[1.9] text-cream/70">
                  FF-52, Sharnam Sky, beside Jhulelal Hospital,
                  Zadeshwar Chowkdi, Ganesh Shrishti,
                  Zadeshwar, Bharuch, Gujarat 392011.
                </p>

              </div>

              <div className="relative mt-8 border-t border-white/15 pt-5">

                <a
                  href="#visit"
                  className="group inline-flex items-center gap-3 text-xs font-semibold tracking-wide text-cream transition-colors duration-300 hover:text-gild"
                >
                  Explore location and timings

                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-gild group-hover:bg-gild group-hover:text-plum">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>

              </div>

            </motion.div>

          </div>

        </div>

        {/* Closing statement */}
        <motion.div
          {...reveal(0.35)}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sand pt-7 sm:flex-row sm:pt-9"
        >
          <p className="font-display text-xl italic text-plum/80 sm:text-2xl">
            Elysea Aesthetic Clinic
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper">
            Skin · Hair · Laser
          </p>
        </motion.div>

      </div>
    </section>
  );
}
