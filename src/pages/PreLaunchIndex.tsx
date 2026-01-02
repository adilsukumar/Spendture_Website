import { useState, lazy, Suspense, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PreLaunchHeader from "@/components/PreLaunchHeader";
import PreLaunchHero from "@/components/PreLaunchHero";
import ProblemSection from "@/components/ProblemSection";
import TeaserSection from "@/components/TeaserSection";
import TrustSection from "@/components/TrustSection";
import WaitlistSection from "@/components/WaitlistSection";
import ProductTeaserGrid from "@/components/ProductTeaserGrid";
import FAQSection from "@/components/FAQSection";
import PreLaunchFooter from "@/components/PreLaunchFooter";
import LoadingSplash from "@/components/LoadingSplash";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import FakeActivityFeed from "@/components/FakeActivityFeed";

// Lazy load non-critical component
const LiveActivityFeed = lazy(() => import("@/components/LiveActivityFeed"));

// Check returning user synchronously to avoid flash
const STORAGE_KEY = "spendture_visited";
const isReturningUser = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true";

const PreLaunchIndex = () => {
  // Skip splash entirely for returning users
  const [isLoading, setIsLoading] = useState(!isReturningUser);
  // Fake bonus resets on refresh (session-only)
  const [fakeBonus, setFakeBonus] = useState(0);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleFakeSignup = useCallback(() => {
    setFakeBonus((prev) => prev + 1);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingSplash onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      {/* Always render content, use opacity for smooth transition */}
      <div 
        className="min-h-screen transition-opacity duration-300"
        style={{ opacity: isLoading ? 0 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
      >
        <ScrollProgress />
        <PreLaunchHeader />
        <main id="main-content">
          <PreLaunchHero />
          <ProblemSection />
          <TeaserSection />
          <TrustSection />
          <WaitlistSection fakeBonus={fakeBonus} />
          <ProductTeaserGrid />
          <FAQSection />
        </main>
        <PreLaunchFooter />
        <FloatingCTA />
        <FakeActivityFeed onNewSignup={handleFakeSignup} />
        <Suspense fallback={null}>
          <LiveActivityFeed />
        </Suspense>
      </div>
    </>
  );
};

export default PreLaunchIndex;
