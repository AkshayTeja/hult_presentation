import { HeroSection } from "../app/components/hero-section";
import { ProblemSection } from "../app/components/problem-section";
import { SolutionSection } from "../app/components/solution-section";
import { UserJourneySection } from "../app/components/user-journey-section";
import { MarketSection } from "../app/components/market-section";
import { RevenueSection } from "../app/components/revenue-section";
import { CompetitiveSection } from "../app/components/competitive-section";
import { FinalCTASection } from "../app/components/final-cta-section";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <UserJourneySection />
      <MarketSection />
      <RevenueSection />
      <CompetitiveSection />
      <FinalCTASection />
    </main>
  );
}
