import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Story from "@/components/story";
import ServiceNavigation from "@/components/service-navigation";
import Treatments from "@/components/treatments";
import Ritual from "@/components/ritual";
import Results from "@/components/results";
import Faq from "@/components/faq";
import Visit from "@/components/visit";
import Footer from "@/components/footer";

export default function Page() {
    return (
        <div className="relative">
            <Navbar />
            <div id="page-content">
                <main id="main-content" className="relative">
                    <Hero />
                    <Marquee />
                    <Story />
                    <ServiceNavigation />
                    <Treatments />
                    <Ritual />
                    <Results />
                    <Faq />
                    <Visit />
                </main>
                <Footer />
            </div>
        </div>
    );
}
