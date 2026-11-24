"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { CLINIC, HOURS, SERVICE_CATEGORIES, createWhatsAppUrl } from "@/lib/clinic";

const WHATSAPP_URL = createWhatsAppUrl(
  "Hello Elysea Aesthetic Clinic, I would like to enquire about your services."
);
const HOURS_SUMMARY = HOURS.map((row) => `${row.label}: ${row.time}`).join("; ");
const HOURS_GROUPS = HOURS.reduce<Array<{ days: string[]; time: string }>>(
  (groups, row) => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup?.time === row.time) {
      lastGroup.days.push(row.label);
    } else {
      groups.push({ days: [row.label], time: row.time });
    }
    return groups;
  },
  []
).map(({ days, time }) => ({
  label: days.length === 1 ? days[0] : `${days[0]} – ${days[days.length - 1]}`,
  time,
}));
const CATEGORY_SUMMARY = SERVICE_CATEGORIES.map((category) => category.name).join(", ");

const FAQS = [
  {
    question: "What services are available at Elysea?",
    answer:
      `Elysea Aesthetic Clinic offers these service categories: ${CATEGORY_SUMMARY}. Please explore our Treatments section for the listed services.`,
  },
  {
    question: "Who is the doctor at Elysea?",
    answer:
      `Dr. Vrujal Mistry is Elysea Aesthetic Clinic's Consultant Aesthetic Physician, Cosmetologist and Trichologist. Her qualifications are ${CLINIC.doctor.qualifications}, and she has ${CLINIC.doctor.experience}.`,
  },
  {
    question: "Where is Elysea Aesthetic Clinic located?",
    answer:
      `Elysea Aesthetic Clinic is located at ${CLINIC.fullAddress}. Please use the Visit section for directions.`,
  },
  {
    question: "What are the clinic opening hours?",
    answer:
      HOURS_SUMMARY,
  },
  {
    question: "How can I enquire about treatments?",
    answer:
      `Contact Elysea Aesthetic Clinic by phone or WhatsApp at ${CLINIC.phone} to ask about a service or visit availability.`,
  },
  {
    question: "Where can I find treatment prices?",
    answer:
      `Prices are not listed on this website. Contact Elysea directly at ${CLINIC.phone} to ask about current pricing.`,
  },
];

export default function Faq() {
  const reducedMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative isolate overflow-hidden bg-cream py-24 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-blush/25 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">

        {/* Left: Introduction and contact */}
        <motion.div
          {...reveal(0)}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-copper" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-copper">
              Here to help
            </span>
          </div>

          <h2
            id="faq-heading"
            className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-[-0.04em] text-plum"
          >
            Before you

            <span className="mt-2 block italic text-copper">
              visit.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-sm leading-[1.95] text-plum/65 sm:text-base">
            Have questions about our clinic or services?
            Find the essential information here, or get
            in touch with our team directly.
          </p>

          {/* Rating */}
          <a
            href={CLINIC.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 flex items-center gap-4 border-y border-sand/80 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            aria-label={`Read Elysea's ${CLINIC.rating} out of 5 Google rating and reviews`}
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blush/60 text-copper">
              <Star className="h-5 w-5 fill-current" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl text-plum">
                  {CLINIC.rating.toFixed(1)}/5
                </span>

                <div className="flex gap-0.5 text-gild">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3 w-3 fill-current" />
                  ))}
                </div>
              </div>

              <p className="mt-1 text-xs text-plum/55">
                Google rating · {CLINIC.googleReviewCount} reviews
              </p>
            </div>
          </a>

          {/* Contact card */}
          <div className="mt-7 rounded-[1.8rem] border border-sand/80 bg-porcelain p-6 sm:p-7">

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-copper">
              Need personal assistance?
            </p>

            <h3 className="mt-3 font-display text-2xl text-plum">
              Let's talk.
            </h3>

            <a
              href={CLINIC.phoneHref}
              className="mt-4 flex items-center gap-3 text-base font-semibold text-plum transition-colors hover:text-copper"
            >
              <Phone className="h-4 w-4 text-copper" />
              {CLINIC.phone}
            </a>

            <div className="mt-6 grid gap-3">

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[50px] items-center justify-center gap-3 rounded-full bg-plum px-5 py-3 text-xs font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-copper"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire on WhatsApp
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href={CLINIC.phoneHref}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-sand px-5 py-3 text-xs font-semibold text-plum transition-colors hover:border-copper hover:text-copper"
              >
                <Phone className="h-3.5 w-3.5" />
                Call the clinic
              </a>

            </div>
          </div>

          {/* Hours */}
          <div className="mt-6 flex gap-4 px-2">
            <Clock3 className="mt-1 h-5 w-5 shrink-0 text-copper" />

            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">
                Opening hours
              </p>

              <div className="mt-3 space-y-2 text-xs text-plum/65">
                {HOURS_GROUPS.map((group) => (
                  <div key={group.label} className="flex justify-between gap-3">
                    <span>{group.label}</span>
                    <span className="font-semibold text-plum">{group.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </motion.div>

        {/* Right: FAQ accordion */}
        <motion.div
          {...reveal(0.15)}
          className="min-w-0"
        >
          <div className="mb-7 flex items-center justify-between gap-4 border-b border-sand pb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-copper">
              Frequently asked questions
            </p>

            <span className="text-[10px] tracking-widest text-plum/40">
              06 QUESTIONS
            </span>
          </div>

          <Accordion type="single" collapsible defaultValue="faq-0">
            {FAQS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="border-b border-sand/90"
              >
                <AccordionTrigger className="gap-5 py-6 font-display text-base leading-snug sm:text-xl">
                  <span className="mr-1 shrink-0 font-sans text-[10px] font-semibold tracking-widest text-copper/70">
                    0{index + 1}
                  </span>

                  <span>{item.question}</span>
                </AccordionTrigger>

                <AccordionContent className="pb-7 pl-8 text-[13px] leading-[1.95] text-plum/65 sm:pl-9 sm:text-sm">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Closing prompt */}
          <div className="mt-9 rounded-2xl border border-copper/20 bg-porcelain/70 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-copper" />

              <div>
                <p className="font-display text-lg text-plum">
                  Still have a question?
                </p>

                <p className="mt-1 text-xs leading-6 text-plum/60">
                  Reach out to Elysea Aesthetic Clinic directly.
                  Our contact details are available above.
                </p>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
