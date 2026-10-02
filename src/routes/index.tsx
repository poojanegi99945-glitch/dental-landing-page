import { createFileRoute } from "@tanstack/react-router";
import { LeadProvider } from "@/lib/lead";
import { ConcernSelector, SmileCheck } from "@/components/landing/SmileCheck";
import {
  Header, Hero, TrustStrip, Offer, Compare, Doctor, NextSteps, Proof, Journey, Faq, Location, FinalBooking, Footer, MobileBar,
} from "@/components/landing/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Braces & Clear Aligners Consultation | Free 60-Second Smile Check" },
      { name: "description", content: "Explore braces and clear aligners with an orthodontist. Take a 60-second Smile Check and request your orthodontic consultation." },
      { property: "og:title", content: "Thinking About Straighter Teeth? Braces & Clear Aligners" },
      { property: "og:description", content: "Take the 60-second Smile Check and request an orthodontic consultation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LeadProvider>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <ConcernSelector />
        <SmileCheck />
        <Offer />
        <Compare />
        <Doctor />
        <NextSteps />
        <Proof />
        <Journey />
        <Faq />
        <Location />
        <FinalBooking />
      </main>
      <Footer />
      <MobileBar />
    </LeadProvider>
  );
}
