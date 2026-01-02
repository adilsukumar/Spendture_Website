import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Twitter, Linkedin, Share2, Check, Users, MessageCircle, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import PreLaunchHeader from "@/components/PreLaunchHeader";
import PreLaunchFooter from "@/components/PreLaunchFooter";
import { supabase } from "@/integrations/supabase/client";
import ConfettiCelebration from "@/components/ConfettiCelebration";

interface WaitlistData {
  position: number;
  referralCode: string;
  referralCount: number;
}

const WaitlistConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [waitlistData, setWaitlistData] = useState<WaitlistData | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [showFacebookModal, setShowFacebookModal] = useState(false);
  
  const email = location.state?.email || "";

  // Set page title and scroll to top
  useEffect(() => {
    document.title = "You're on the waitlist! | Spendture";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Spendture - Smart Money Companion";
    };
  }, []);

  useEffect(() => {
    // Get data from router state first (most secure, passed after signup)
    const stateReferralCode = location.state?.referralCode;
    const statePosition = location.state?.position;

    const initializeData = async () => {
      try {
        setError(false);
        
        // If we have data from router state, use it and persist to localStorage
        if (stateReferralCode && statePosition && email) {
          // Persist to localStorage for page refresh
          localStorage.setItem('spendture_waitlist', JSON.stringify({
            email,
            referralCode: stateReferralCode,
            position: statePosition,
          }));

          setWaitlistData({
            position: statePosition,
            referralCode: stateReferralCode,
            referralCount: 0, // Default to 0 for now
          });
          
          // Trigger confetti for new signups (when coming from form submission)
          setShowConfetti(true);
        } else {
          // Try to recover from localStorage
          const cached = localStorage.getItem('spendture_waitlist');
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              if (parsed.email && parsed.referralCode && parsed.position) {
                setWaitlistData({
                  position: parsed.position,
                  referralCode: parsed.referralCode,
                  referralCount: 0, // Default to 0 for now
                });
                setLoading(false);
                return;
              }
            } catch {
              localStorage.removeItem('spendture_waitlist');
            }
          }

          // For now, create a simple success state if we have email from form submission
          if (email) {
            const simpleReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            setWaitlistData({
              position: Math.floor(Math.random() * 1000) + 100, // Random position for now
              referralCode: simpleReferralCode,
              referralCount: 0,
            });
            setShowConfetti(true);
          } else {
            // No state data and no cache - show friendly error state
            setError(true);
          }
        }
      } catch (err) {
        console.error("Error initializing waitlist data");
        setError(true);
        toast({
          title: "Error",
          description: "Could not load your waitlist data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [email, location.state, navigate, toast]);

  // Remove real-time subscription since we're not using Supabase anymore
  // useEffect(() => {
  //   Real-time subscription code removed
  // }, [waitlistData?.referralCode, toast]);

  const shareUrl = waitlistData 
    ? `${window.location.origin}/?ref=${waitlistData.referralCode}`
    : "";
  const shareText = `I just joined the Spendture waitlist!

Get early access to the smartest money companion.

Choose Spendture, make your money venture.`;

  const copyReferralCode = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const twitterText = `I just joined the @Spendture waitlist!

Get early access to the smartest money companion.

Choose Spendture, make your money venture.
${shareUrl}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const linkedInText = `I just joined the @Spendture Pvt. Ltd. waitlist!

Get early access to the smartest money companion.

Choose Spendture, make your money venture.

${shareUrl}`;
    window.open(
      `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(linkedInText)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    const whatsappText = `${shareText}\n${shareUrl}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    const facebookText = `I just joined the Spendture waitlist!

Get early access to the smartest money companion.

Choose Spendture, make your money venture.

${shareUrl}`;
    navigator.clipboard.writeText(facebookText);
    setShowFacebookModal(true);
    setTimeout(() => {
      setShowFacebookModal(false);
      window.open('https://www.facebook.com/share', '_blank');
    }, 3000);
  };

  const shareOnInstagram = () => {
    const instagramText = `I just joined the Spendture waitlist!

Get early access to the smartest money companion.

Choose Spendture, make your money venture.

${shareUrl}`;
    navigator.clipboard.writeText(instagramText);
    setShowInstagramModal(true);
    setTimeout(() => {
      setShowInstagramModal(false);
      window.open('https://www.instagram.com/', '_blank');
    }, 3000);
  };

  const shareNative = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Spendture Waitlist",
        text: shareText,
        url: shareUrl,
      });
    }
  };

  const retryFetch = () => {
    // Since we can't re-fetch without router state, redirect to home
    navigate("/");
  };

  const referralProgress = waitlistData 
    ? Math.min((waitlistData.referralCount / 3) * 100, 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-deep-teal/5">
      {showConfetti && <ConfettiCelebration trigger={showConfetti} />}
      
      {/* Instagram Modal */}
      {showInstagramModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Text Copied!</h3>
            <p className="text-gray-600 mb-4">Your message has been copied to clipboard. Paste it in your Instagram story or post!</p>
            <div className="text-sm text-gray-500">Redirecting to Instagram in 3 seconds...</div>
          </motion.div>
        </div>
      )}
      
      {/* Facebook Modal */}
      {showFacebookModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1877F2] flex items-center justify-center">
              <Facebook className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Text Copied!</h3>
            <p className="text-gray-600 mb-4">Your message has been copied to clipboard. Paste it in your Facebook post!</p>
            <div className="text-sm text-gray-500">Redirecting to Facebook in 3 seconds...</div>
          </motion.div>
        </div>
      )}
      
      <PreLaunchHeader variant="confirmation" />
      
      <main id="main-content" className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald to-forest-green flex items-center justify-center shadow-glow"
            aria-hidden="true"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-deep-teal to-emerald bg-clip-text text-transparent">
            You're on the list!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-2">
            You're registered with <span className="font-semibold text-foreground">{email}</span>
          </p>
          
          <p className="text-muted-foreground mb-12">
            Welcome to the Spendture early access family! We'll keep you updated on our launch.
          </p>

          {/* Perks Section */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12 shadow-elegant">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Early Bird Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden-amber to-warm-yellow flex items-center justify-center mb-3" aria-hidden="true">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-foreground">Priority Beta</h3>
                <p className="text-sm text-muted-foreground">Get first access when we launch</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden-amber to-warm-yellow flex items-center justify-center mb-3" aria-hidden="true">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="font-semibold text-foreground">Founder Pricing</h3>
                <p className="text-sm text-muted-foreground">Lock in lifetime discount</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden-amber to-warm-yellow flex items-center justify-center mb-3" aria-hidden="true">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold text-foreground">Exclusive Features</h3>
                <p className="text-sm text-muted-foreground">Beta-only premium tools</p>
              </div>
            </div>
          </div>

          {/* Error State - Friendly message when accessing directly */}
          {error && !loading && (
            <div className="bg-gradient-to-br from-deep-teal/10 to-emerald/10 border border-deep-teal/20 rounded-2xl p-8 mb-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-3">No waitlist data found</h2>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                It looks like you haven't signed up yet, or your session has expired. Join our waitlist to get early access!
              </p>
              <Button onClick={retryFetch} size="lg" className="bg-gradient-cta shadow-glow-cta">
                Join the Waitlist
              </Button>
            </div>
          )}

          {/* Referral Section */}
          {!error && (
            <div className="bg-gradient-to-br from-deep-teal/10 to-emerald/10 border border-deep-teal/20 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span>Share & Move Up the List</span>
                {loading ? (
                  <Skeleton className="h-5 w-24" />
                ) : (
                  <span 
                    className="text-sm font-normal text-muted-foreground"
                    aria-live="polite"
                  >
                    Position: <span className="font-bold text-deep-teal">#{waitlistData?.position || "—"}</span>
                  </span>
                )}
              </h2>
              <p className="text-muted-foreground mb-6">
                Refer 3 friends, skip 100 spots in line! Each referral = +10 positions.
              </p>
              
              {/* Rewards Progress */}
              <div className="bg-background/50 rounded-lg p-4 mb-6 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" aria-hidden="true" />
                    Referral Progress
                  </span>
                  {loading ? (
                    <Skeleton className="h-4 w-20" />
                  ) : (
                    <span 
                      className="text-sm text-muted-foreground"
                      aria-live="polite"
                    >
                      {waitlistData?.referralCount || 0} / 3 friends
                    </span>
                  )}
                </div>
                <div 
                  className="w-full bg-muted rounded-full h-3 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={waitlistData?.referralCount || 0}
                  aria-valuemin={0}
                  aria-valuemax={3}
                  aria-label={`Referral progress: ${waitlistData?.referralCount || 0} of 3 friends referred`}
                >
                  <motion.div 
                    className="h-full bg-gradient-cta"
                    initial={{ width: "0%" }}
                    animate={{ width: `${referralProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {waitlistData && waitlistData.referralCount >= 3 
                    ? "🎉 Congratulations! You've unlocked all rewards!"
                    : `🎁 Unlock rewards: Skip 100 spots + Exclusive beta badge (${3 - (waitlistData?.referralCount || 0)} more to go!)`
                  }
                </p>
              </div>

              {/* Referral Code Display */}
              <div className="bg-background border border-border rounded-lg p-4 mb-6 flex items-center justify-between gap-2">
                {loading ? (
                  <Skeleton className="h-5 flex-1" />
                ) : (
                  <code className="text-sm font-mono text-deep-teal font-semibold truncate flex-1 break-all">
                    {shareUrl}
                  </code>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyReferralCode}
                  className="flex-shrink-0"
                  disabled={loading}
                  aria-label="Copy referral link"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Share Buttons */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={shareOnTwitter}
                    className="bg-[#1A8CD8] hover:bg-[#167ab8] text-white flex-1 min-w-[140px]"
                    disabled={loading}
                    aria-label="Tweet about Spendture to skip the waitlist line"
                  >
                    <Twitter className="w-4 h-4 mr-2" aria-hidden="true" />
                    Tweet
                  </Button>
                  <Button
                    onClick={shareOnLinkedIn}
                    className="bg-[#004182] hover:bg-[#00366b] text-white flex-1 min-w-[140px]"
                    disabled={loading}
                    aria-label="Post about Spendture on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
                    LinkedIn
                  </Button>
                  <Button
                    onClick={shareOnWhatsApp}
                    className="bg-[#1DA851] hover:bg-[#188a43] text-white flex-1 min-w-[140px]"
                    disabled={loading}
                    aria-label="Invite friends to Spendture via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                    WhatsApp
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={shareOnFacebook}
                    className="bg-[#1877F2] hover:bg-[#166FE5] text-white flex-1 min-w-[140px]"
                    disabled={loading}
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4 mr-2" aria-hidden="true" />
                    Facebook
                  </Button>
                  <Button
                    onClick={shareOnInstagram}
                    className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white flex-1 min-w-[140px]"
                    disabled={loading}
                    aria-label="Copy text for Instagram"
                  >
                    <Instagram className="w-4 h-4 mr-2" aria-hidden="true" />
                    Instagram
                  </Button>
                  {navigator.share && (
                    <Button
                      onClick={shareNative}
                      variant="outline"
                      disabled={loading}
                      className="flex-1 min-w-[140px]"
                      aria-label="More sharing options"
                    >
                      <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
                      More Options
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Back to Home */}
          <Button
            onClick={() => {
              window.location.href = "/#features";
            }}
            variant="outline"
            size="lg"
          >
            Back to Home
          </Button>
        </motion.div>
      </main>

      <PreLaunchFooter />
    </div>
  );
};

export default WaitlistConfirmation;
