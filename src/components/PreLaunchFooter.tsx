import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import spendtureLogo from "@/assets/spendture-logo.jpg";
import { Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SocialLink {
  platform: string;
  url: string | null;
  is_active: boolean;
}

const PreLaunchFooter = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data, error } = await supabase
        .from('social_links')
        .select('platform, url, is_active')
        .eq('is_active', true);
      
      if (!error && data) {
        setSocialLinks(data);
      }
    };

    fetchSocialLinks();
  }, []);

  const getSocialUrl = (platform: string) => {
    const link = socialLinks.find(l => l.platform === platform);
    return link?.url || '#';
  };

  return (
    <footer className="relative bg-muted/30 text-foreground py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Tagline - Clickable to go to top */}
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <img src={spendtureLogo} alt="Spendture Logo" className="w-8 h-8 rounded-lg object-cover border border-soft-aqua/20 transition-transform group-hover:scale-110" />
            <span className="text-lg font-bold bg-gradient-to-r from-soft-aqua to-emerald bg-clip-text text-transparent">
              Spendture
            </span>
          </button>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm flex-wrap justify-center md:justify-end">
            <button 
              onClick={() => {
                window.location.href = '/#why-it-matters';
                setTimeout(() => {
                  const element = document.getElementById('why-it-matters');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="text-muted-foreground hover:text-deep-teal dark:hover:text-soft-aqua transition-colors"
            >
              Why Spendture?
            </button>
            <button 
              onClick={() => {
                window.location.href = '/#waitlist';
                setTimeout(() => {
                  const element = document.getElementById('waitlist');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="text-muted-foreground hover:text-deep-teal dark:hover:text-soft-aqua transition-colors"
            >
              Join Waitlist
            </button>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-deep-teal dark:hover:text-soft-aqua transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-deep-teal dark:hover:text-soft-aqua transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:official.spendture@gmail.com" className="text-muted-foreground hover:text-deep-teal dark:hover:text-soft-aqua transition-colors">
              Contact
            </a>
            {getSocialUrl('linkedin') !== '#' && (
              <a href={getSocialUrl('linkedin')} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted hover:bg-deep-teal/20 dark:hover:bg-soft-aqua/20 flex items-center justify-center transition-all hover:scale-105" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4 text-muted-foreground" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-4 border-t border-border/50 flex flex-col items-start gap-3 text-xs text-muted-foreground pb-20 sm:pb-0">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              Data hosted in India
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              AES-256 Encrypted
            </span>
          </div>
          <p>© {new Date().getFullYear()} Spendture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PreLaunchFooter;
