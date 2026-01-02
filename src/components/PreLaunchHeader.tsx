import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import spendtureLogo from "@/assets/spendture-logo.jpg";
import { useState, useEffect } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useNavigate, useLocation } from "react-router-dom";
import MobileMenu from "@/components/MobileMenu";

interface PreLaunchHeaderProps {
  variant?: "default" | "confirmation";
}

const PreLaunchHeader = ({ variant = "default" }: PreLaunchHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(["hero", "why-it-matters", "waitlist"], 120);
  const isConfirmation = variant === "confirmation";
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      // Navigate to home page with hash
      navigate(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogoClick = () => {
    if (!isHomePage) {
      navigate("/");
    } else {
      scrollToSection("hero");
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "why-it-matters", label: "Why Spendture?" },
    { id: "waitlist", label: "Join Waitlist" },
  ];

  // Simplified nav for confirmation page
  const confirmationNavItems = [
    { id: "hero", label: "Home" },
  ];

  const displayNavItems = isConfirmation ? confirmationNavItems : navItems;

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-background shadow-elegant border-b border-border" 
            : "bg-gradient-hero"
        }`}
        role="banner"
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 group"
          aria-label="Spendture home"
        >
          <img 
            src={spendtureLogo} 
            alt="Spendture Logo" 
            className="w-10 h-10 rounded-lg object-cover transition-transform group-hover:scale-110"
          />
          <span className={`text-2xl font-bold transition-colors duration-500 ${
            isScrolled 
              ? "bg-gradient-to-r from-soft-aqua to-emerald bg-clip-text text-transparent" 
              : "text-foreground"
          }`}>
            Spendture
          </span>
        </button>
        
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {displayNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  isHomePage && activeSection === item.id
                    ? isScrolled ? "text-soft-aqua" : "text-soft-aqua"
                    : isScrolled ? "text-muted-foreground hover:text-foreground" : "text-foreground/80 hover:text-foreground"
                }`}
                aria-current={isHomePage && activeSection === item.id ? "page" : undefined}
              >
                {item.label}
                {isHomePage && activeSection === item.id && (
                  <span className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${isScrolled ? "bg-gradient-to-r from-deep-teal to-emerald" : "bg-soft-aqua"}`} aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
          
          <ThemeToggle isScrolled={isScrolled} />
          
          {!isConfirmation && (
            <Button 
              onClick={() => scrollToSection("waitlist")}
              className="hidden md:inline-flex bg-gradient-cta hover:scale-105 active:scale-95 transition-transform duration-300 shadow-glow-cta font-semibold text-charcoal hover:shadow-xl"
              size="lg"
              aria-label="Join the waitlist"
            >
              Join Waitlist
            </Button>
          )}

          {/* Mobile Menu */}
          {!isConfirmation && (
            <MobileMenu
              navItems={displayNavItems}
              activeSection={isHomePage ? activeSection : ""}
              onNavigate={scrollToSection}
            />
          )}
        </div>
      </nav>
    </header>
    </>
  );
};

export default PreLaunchHeader;
