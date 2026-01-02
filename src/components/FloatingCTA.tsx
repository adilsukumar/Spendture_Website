import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsVisible(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Use CSS for visibility to prevent layout shifts and reduce JS overhead
  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <Button
        onClick={scrollToWaitlist}
        size="lg"
        className="bg-gradient-cta shadow-glow-cta rounded-full px-6 hover:scale-105 active:scale-95 transition-transform group will-change-transform"
        aria-label="Join waitlist - floating button"
      >
        <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
        Join Waitlist
      </Button>
    </div>
  );
};

export default FloatingCTA;
