import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import Atmosphere from "@/components/atmosphere";

const display = Fraunces({
    subsets: ["latin"],
    style: ["normal", "italic"],
    variable: "--font-display",
    display: "swap",
});

const sans = Manrope({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export const metadata: Metadata = {
	title: "Elysea Aesthetic Clinic | Skin, Hair & Laser Care in Bharuch",
	description:
		"Explore skin, cosmetic, facial, hair, laser and minor-procedure services at Elysea Aesthetic Clinic in Bharuch, Gujarat. Contact the clinic directly for service details and availability.",
    keywords: [
		"Elysea Aesthetic Clinic",
		"skin clinic Bharuch",
		"hair clinic Bharuch",
		"laser clinic Bharuch",
		"aesthetic clinic Gujarat",
    ],
    openGraph: {
		title: "Elysea Aesthetic Clinic | Bharuch",
        description:
			"Skin, cosmetic, facial, hair, laser and minor-procedure services in Bharuch, Gujarat. Contact Elysea Aesthetic Clinic for enquiries.",
        type: "website",
        locale: "en_IN",
    },
};

export const viewport: Viewport = {
    themeColor: "#3A2430",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${display.variable} ${sans.variable}`}>
            <body>
				<a
					href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-plum focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
                >
					Skip to main content
                </a>
                <SmoothScroll>
					{children}
					<Atmosphere />
                </SmoothScroll>
                <div className="grain" aria-hidden="true" />
            </body>
        </html>
    );
}
