import { Sparkle } from "@/components/primitives";

const ITEMS = [
    "Glass-Skin Ritual",
    "HydraGlow",
    "Bio-Remodelling",
    "Laser Resurfacing",
    "Peptide Peels",
    "LED Therapy",
    "Skin Mapping",
    "Anti-Wrinkle Refinement",
];

export default function Marquee() {
    return (
        <div className="marquee relative overflow-hidden border-y border-sand bg-cream/70 py-5">
            <div className="marquee-track flex w-max animate-marquee items-center gap-10">
                {[0, 1].map((copy) => (
                    <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-10">
                        {ITEMS.map((item) => (
                            <span key={item} className="flex items-center gap-10">
                                <span className="whitespace-nowrap font-display text-xl italic text-plum/75 sm:text-2xl">
                                    {item}
                                </span>
                                <Sparkle className="h-3.5 w-3.5 shrink-0 text-gild" />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-porcelain to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-porcelain to-transparent" />
        </div>
    );
}