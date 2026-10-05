import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import ProgramOverview from "@/components/sections/ProgramOverview";
import Journey from "@/components/sections/Journey";
import ProgramStructure from "@/components/sections/ProgramStructure";
import Manifesto from "@/components/sections/Manifesto";
import Guides from "@/components/sections/Guides";
import Footer from "@/components/sections/Footer";
import BookingModal from "@/components/ui/BookingModal";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        {/* Program overview + positioning, merged into one story */}
        <ProgramOverview />
        <Journey />
        <ProgramStructure />
        <Guides />
        {/* Closing manifesto + join card: the last section ("Join" in the nav lands here) */}
        <Manifesto />
      </main>
      <Footer />
      {/* Opens from any "#book" button */}
      <BookingModal />
    </>
  );
}
