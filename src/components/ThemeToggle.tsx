import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  isScrolled?: boolean;
}

export function ThemeToggle({ isScrolled = true }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  // In dark mode: white when not scrolled, foreground when scrolled
  // In light mode: always use foreground (dark icon) for visibility
  const iconColorClass = theme === "dark"
    ? (isScrolled ? "text-foreground" : "text-white")
    : "text-foreground";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10"
    >
      {theme === "dark" ? (
        <Sun className={`h-5 w-5 transition-all ${iconColorClass}`} />
      ) : (
        <Moon className={`h-5 w-5 transition-all ${iconColorClass}`} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
