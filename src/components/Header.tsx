import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import spendtureLogo from "@/assets/spendture-logo.jpg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={spendtureLogo} 
            alt="Spendture Logo" 
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span className="text-2xl font-bold text-foreground">Spendture</span>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="download" size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Download App
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
