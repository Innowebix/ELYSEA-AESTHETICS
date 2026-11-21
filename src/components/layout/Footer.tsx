
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <Link href="#top" className="wordmark wordmark-footer">
                        <span>ELYSEA</span>
                        <small>AESTHETICS</small>
                    </Link>

                    <p>
                        The art of beautiful skin.
                        <br />
                        The freedom to feel like you.
                    </p>
                </div>

                <div className="footer-nav">
                    <div>
                        <span className="footer-label">EXPLORE</span>

                        <Link href="#philosophy">Our philosophy</Link>
                        <Link href="#treatments">Treatments</Link>
                        <Link href="#approach">Our approach</Link>
                    </div>

                    <div>
                        <span className="footer-label">CONNECT</span>

                        <Link href="#contact">Book a consultation</Link>
                        <Link href="#contact">Contact</Link>
                    </div>
                </div>

                <Link href="#top" className="back-top">
                    BACK TO THE TOP
                    <ArrowUpRight size={15} />
                </Link>
            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} ELYSEA AESTHETICS</span>
                <span>SKIN · SCIENCE · SELF</span>
                <span>PRIVACY POLICY TO BE ADDED</span>
            </div>
        </footer>
    );
}
