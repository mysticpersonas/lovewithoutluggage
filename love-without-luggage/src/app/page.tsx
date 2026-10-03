import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ForYouIf from "@/components/sections/ForYouIf";
import Problem from "@/components/sections/Problem";
import ProgramOverview from "@/components/sections/ProgramOverview";
import Journey from "@/components/sections/Journey";
import Benefits from "@/components/sections/Benefits";
import ProgramStructure from "@/components/sections/ProgramStructure";
import WhyItWorks from "@/components/sections/WhyItWorks";
import Manifesto from "@/components/sections/Manifesto";
import Guides from "@/components/sections/Guides";
import Guarantee from "@/components/sections/Guarantee";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ForYouIf />
        <Problem />
        {/* Program overview + positioning, merged into one story */}
        <ProgramOverview />
        <Journey />
        <Benefits />
        <ProgramStructure />
        <WhyItWorks />
        <Guides />
        {/* Closing manifesto: the last word before the footer */}
        <Manifesto />
        <Guarantee />
      </main>
      <Footer />
    </>
  );
}
