
"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { treatments } from "@/data/treatments";

export default function Treatments() {
    const [active, setActive] = useState(0);
    const current = treatments[active];

    return (
        <section className="treatments-section section-pad" id="treatments">
            <div className="section-meta reveal">
                <span>02 / THE TREATMENT EDIT</span>
                <span>EXPLORE WHAT FEELS RIGHT</span>
            </div>

            <div className="treatments-intro">
                <div>
                    <p className="eyebrow reveal">
                        <span className="eyebrow-dot" />
                        YOUR SKIN, YOUR STARTING POINT
                    </p>

                    <h2 className="editorial-heading reveal">
                        Considered care.
                        <br />
                        <em>Personal</em> possibilities.
                    </h2>
                </div>

                <p className="treatments-intro-copy reveal">
                    Every skin story is different. Explore our areas
                    of care, then let's find a thoughtful place to begin.
                </p>
            </div>

            <div className="treatment-explorer">
                <div
                    className="treatment-list"
                    role="list"
                    aria-label="Treatment categories"
                >
                    {treatments.map((treatment, index) => (
                        <button
                            type="button"
                            className={`treatment-row ${active === index ? "is-active" : ""
                                }`}
                            key={treatment.name}
                            onMouseEnter={() => setActive(index)}
                            onFocus={() => setActive(index)}
                            onClick={() => setActive(index)}
                            aria-pressed={active === index}
                        >
                            <span className="treatment-number">
                                0{index + 1}
                            </span>

                            <span className="treatment-name-wrap">
                                <span className="treatment-name">
                                    {treatment.name}
                                </span>

                                <span className="treatment-note">
                                    {treatment.note}
                                </span>
                            </span>

                            <span className="treatment-arrow">
                                <ArrowUpRight size={19} strokeWidth={1.2} />
                            </span>
                        </button>
                    ))}
                </div>

                <div className="treatment-preview" aria-live="polite">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.image}
                            className="treatment-preview-image"
                            initial={{
                                opacity: 0,
                                scale: 1.035,
                                clipPath: "inset(4% 4% 4% 4% round 46% 46% 3px 3px)",
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                clipPath: "inset(0% 0% 0% 0% round 46% 46% 3px 3px)",
                            }}
                            exit={{ opacity: 0, scale: 0.985 }}
                            transition={{
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={current.image} alt={current.alt} />

                            <div className="preview-caption">
                                <span>ELYSEA / 0{active + 1}</span>
                                <span>{current.name.toUpperCase()}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="preview-footnote">
                        A PERSONAL PATH, NEVER A TEMPLATE.
                    </div>
                </div>
            </div>

            <div className="treatments-bottom reveal">
                <span>Not sure where to begin?</span>

                <Link href="#contact" className="underlined-link">
                    Start with a consultation
                    <ArrowUpRight size={15} />
                </Link>
            </div>
        </section>
    );
}

