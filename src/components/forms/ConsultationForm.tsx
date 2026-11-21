
"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import { treatments } from "@/data/treatments";

export default function ConsultationForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [interest, setInterest] = useState(
        "I am exploring my options"
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <form className="consultation-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="name">Your name</label>

                <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="How should we address you?"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>

            <div className="form-row">
                <label htmlFor="email">Email address</label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>

            <div className="form-row">
                <label htmlFor="interest">I'm interested in</label>

                <select
                    id="interest"
                    name="interest"
                    value={interest}
                    onChange={(event) => setInterest(event.target.value)}
                >
                    <option>I am exploring my options</option>

                    {treatments.map((treatment) => (
                        <option key={treatment.name}>
                            {treatment.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="form-submit">
                Send an enquiry
                <ArrowUpRight size={16} />
            </button>

            {submitted && (
                <p className="form-notice" role="status">
                    Thank you, {name}. The enquiry form still needs to
                    be connected to Elysea's booking inbox or CRM.
                    No message has been sent.
                </p>
            )}

            <p className="form-privacy">
                Your details should only be used to respond to your
                enquiry. Add the clinic's privacy policy before publishing.
            </p>
        </form>
    );
}
