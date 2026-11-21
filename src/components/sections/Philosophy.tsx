
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Philosophy() {
    return (
        <section className="philosophy-section section-pad" id="philosophy">
            <div className="section-meta reveal">
                <span>01 / THE ELYSEA PHILOSOPHY</span>
                <span>BEAUTY, ON YOUR TERMS</span>
            </div>

            <div className="philosophy-grid">
                <div className="philosophy-visual image-reveal">
                    <div className="philosophy-image-shell image-parallax">
                        <Image
                            src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85"
                            alt="Carefully arranged skincare essentials"
                            fill
                            sizes="(max-width: 800px) 90vw, 42vw"
                        />
                    </div>

                    <div className="image-note">
                        A RITUAL, NOT A ROUTINE
                        <span>✳</span>
                    </div>
                </div>

                <div className="philosophy-copy">
                    <p className="eyebrow reveal">
                        <span className="eyebrow-dot" />
                        A DIFFERENT KIND OF CLINIC
                    </p>

                    <h2 className="editorial-heading reveal">
                        Care that sees <em>more</em> than skin.
                    </h2>

                    <p className="body-large reveal">
                        We believe aesthetic care should feel personal,
                        considered and entirely your own.
                    </p>

                    <p className="body-copy reveal">
                        At Elysea, every journey begins with listening.
                        Your skin, your goals and your comfort guide the
                        conversation — so the options you explore feel
                        right for you, not simply the latest trend.
                    </p>

                    <Link href="#approach" className="underlined-link reveal">
                        Discover our approach
                        <ArrowUpRight size={15} />
                    </Link>

                    <div className="philosophy-signature reveal">
                        A little more intention. A lot more you.
                    </div>
                </div>
            </div>
        </section>
    );
}
