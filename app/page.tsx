import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Story from "@/components/story";
import Treatments from "@/components/treatments";
import Ritual from "@/components/ritual";
import Results from "@/components/results";
import Journal from "@/components/journal";
import Faq from "@/components/faq";
import Visit from "@/components/visit";
import Footer from "@/components/footer";

export default function Page() {
    return (
        <main className="relative">
            <Navbar />
            <Hero />
            <Marquee />
            <Story />
            <Treatments />
            <Ritual />
            <Results />
            <Journal />
            <Faq />
            <Visit />
            <Footer />
        </main>
    );
}