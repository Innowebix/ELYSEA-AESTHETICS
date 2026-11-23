import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { BookingProvider } from "@/components/booking";
import Atmosphere from "@/components/atmosphere";
import Overture from "@/components/overture";

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
    title: "Elysea Aesthetics — The Art of Luminous Skin",
    description:
        "A physician-led aesthetic clinic in Beverly Grove. The quiet hour: listening first, imaging second, and skin that lets you meet your own reflection again.",
    keywords: [
        "aesthetic clinic",
        "skin clinic los angeles",
        "hydrafacial",
        "laser resurfacing",
        "injectables",
        "elysea aesthetics",
    ],
    openGraph: {
        title: "Elysea Aesthetics — The Art of Luminous Skin",
        description:
            "You are not a before photo. Book a complimentary quiet hour at Elysea Aesthetics.",
        type: "website",
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
                    href="#treatments"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-plum focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
                >
                    Skip to treatments
                </a>
                <SmoothScroll>
                    <BookingProvider>{children}</BookingProvider>
                    <Atmosphere />
                    <Overture />
                </SmoothScroll>
                <div className="grain" aria-hidden="true" />
            </body>
        </html>
    );
}