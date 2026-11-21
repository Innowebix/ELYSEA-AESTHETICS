import type { Metadata, Viewport } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";

export const metadata: Metadata = {
  title: "Elysea Aesthetics — The art of beautiful skin",
  description:
    "A more considered approach to skin, beauty and confidence. Explore personalised aesthetic care at Elysea Aesthetics.",
  applicationName: "Elysea Aesthetics",
  metadataBase: new URL("https://elysea.example"),
  openGraph: {
    title: "Elysea Aesthetics — The art of beautiful skin",
    description: "Personalised aesthetic care, with intention.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#f5f1e9",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
