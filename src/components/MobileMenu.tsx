import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  navItems: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

const MobileMenu = ({ navItems, activeSection, onNavigate }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-card border-l border-border shadow-2xl z-40 p-6 pt-20"
            >
              <nav className="space-y-4" role="navigation" aria-label="Mobile menu">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? "bg-soft-aqua/20 text-deep-teal dark:text-soft-aqua font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-border">
                <Button
                  onClick={() => handleNavigate("waitlist")}
                  className="w-full bg-gradient-cta hover:scale-105 active:scale-95 transition-transform shadow-glow-cta font-semibold"
                  size="lg"
                >
                  Join Waitlist
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
