
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import ConsultationForm from "@/components/forms/ConsultationForm";

export default function Contact() {
    return (
        <section className="contact-section section-pad" id="contact">
            <div className="section-meta reveal">
                <span>05 / YOUR NEXT CHAPTER</span>
                <span>WE'D LOVE TO HEAR FROM YOU</span>
            </div>

            <div className="contact-grid">
                <div className="contact-copy">
                    <p className="eyebrow reveal">
                        <span className="eyebrow-dot" />
                        BEGIN WITH A CONVERSATION
                    </p>

                    <h2 className="editorial-heading reveal">
                        Let's make space
                        <br />
                        for <em>you.</em>
                    </h2>

                    <p className="body-large reveal">
                        Every good journey starts with a question.
                        Tell us what you have in mind.
                    </p>

                    <div className="contact-details reveal">
                        <div>
                            <span>VISIT</span>
                            <p>Clinic address to be added</p>
                        </div>

                        <div>
                            <span>CONNECT</span>
                            <p>Clinic phone and email to be added</p>
                        </div>

                        <div>
                            <span>HOURS</span>
                            <p>Appointment hours to be confirmed</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrap reveal">
                    <div className="form-heading">
                        <span>THE FIRST STEP</span>
                        <span>✳</span>
                    </div>

                    <ConsultationForm />
                </div>
            </div>
        </section>
    );
}
