
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const approachPoints = [
    {
        no: "01",
        title: "A conversation, first",
        text: "We start by understanding your concerns, preferences and expectations.",
    },
    {
        no: "02",
        title: "Options with clarity",
        text: "Explore suitable options with clear information about the process and considerations.",
    },
    {
        no: "03",
        title: "Your pace, your choice",
        text: "Feel informed and comfortable taking the next step — or simply taking your time.",
    },
];

export default function Approach() {
    return (
        <section className="approach-section section-pad" id="approach">
            <div className="section-meta reveal">
                <span>04 / WHAT TO EXPECT</span>
                <span>THOUGHTFUL AT EVERY STEP</span>
            </div>

            <div className="approach-grid">
                <div className="approach-title">
                    <p className="eyebrow reveal">
                        <span className="eyebrow-dot" />
                        THE EXPERIENCE
                    </p>

                    <h2 className="editorial-heading reveal">
                        The details
                        <br />
                        make the <em>difference.</em>
                    </h2>

                    <p className="body-copy reveal">
                        A calm, unhurried experience matters. From your
                        first question to your treatment plan, we want
                        you to feel heard, informed and at ease.
                    </p>

                    <Link href="#contact" className="underlined-link reveal">
                        Let's talk about your goals
                        <ArrowUpRight size={15} />
                    </Link>
                </div>

                <div className="approach-points">
                    {approachPoints.map((point) => (
                        <div className="approach-point reveal" key={point.no}>
                            <span className="approach-no">{point.no}</span>

                            <div>
                                <h3>{point.title}</h3>
                                <p>{point.text}</p>
                            </div>

                            <Sparkles
                                size={17}
                                strokeWidth={1.1}
                                className="approach-spark"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
