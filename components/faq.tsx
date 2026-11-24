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

const PHONE = "+918141115873";

const WHATSAPP_URL =
  "https://wa.me/918141115873?text=Hello%20Elysea%20Aesthetic%20Clinic%2C%20I%20would%20like%20to%20make%20an%20enquiry.";

const FAQS = [
  {
    question: "What services are available at Elysea?",
    answer:
      "Elysea Aesthetic Clinic offers six categories of services: Skin Concerns, Cosmetic Procedures, Medical Facials, Hair, Laser and Minor Procedures. Each category includes a range of services. Please explore our Treatments section for the complete list.",
  },
  {
    question: "Who is the doctor at Elysea?",
    answer:
      "Dr. Vrujal Mistry is associated with Elysea Aesthetic Clinic. Her qualifications include BHMS and PGDAM. She is identified in the clinic brochure as a Consultant Aesthetic Physician, Cosmetologist and Trichologist. She has over eight years of experience in the medical field.",
  },
  {
    question: "Where is Elysea Aesthetic Clinic located?",
    answer:
      "We are located at FF-52, Sharnam Sky, beside Jhulelal Hospital, Zadeshwar Chowkdi, Ganesh Shrishti, Zadeshwar, Bharuch, Gujarat. Please use the Visit section of our website for location and directions.",
  },
  {
    question: "What are the clinic opening hours?",
    answer:
      "Monday to Saturday: 10:00 AM to 7:00 PM. Sunday: 10:00 AM to 2:00 PM.",
  },
  {
    question: "How can I enquire about treatments?",
    answer:
      "You can contact Elysea Aesthetic Clinic by phone or WhatsApp at +91 81411 15873. You can enquire about any of the six service categories and discuss your requirements directly with the clinic.",
  },
  {
    question: "Where can I find treatment prices?",
    answer:
      "The clinic brochure lists the available service categories and treatments but does not provide prices. Please contact Elysea directly at +91 81411 15873 to enquire about current treatment pricing.",
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
          <div className="mt-9 flex items-center gap-4 border-y border-sand/80 py-5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blush/60 text-copper">
              <Star className="h-5 w-5 fill-current" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl text-plum">
                  4.7/5
                </span>

                <div className="flex gap-0.5 text-gild">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3 w-3 fill-current" />
                  ))}
                </div>
              </div>

              <p className="mt-1 text-xs text-plum/55">
                Google rating · 19 reviews
              </p>
            </div>
          </div>

          {/* Contact card */}
          <div className="mt-7 rounded-[1.8rem] border border-sand/80 bg-porcelain p-6 sm:p-7">

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-copper">
              Need personal assistance?
            </p>

            <h3 className="mt-3 font-display text-2xl text-plum">
              Let's talk.
            </h3>

            <a
              href={`tel:${PHONE}`}
              className="mt-4 flex items-center gap-3 text-base font-semibold text-plum transition-colors hover:text-copper"
            >
              <Phone className="h-4 w-4 text-copper" />
              +91 81411 15873
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
                href={`tel:${PHONE}`}
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
                <div className="flex justify-between gap-3">
                  <span>Monday – Saturday</span>
                  <span className="font-semibold text-plum">
                    10 AM – 7 PM
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span>Sunday</span>
                  <span className="font-semibold text-plum">
                    10 AM – 2 PM
                  </span>
                </div>
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
