import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Crown, Sparkles, Users, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { trackWaitlistSignup } from "@/components/GoogleAnalytics";
import CountdownTimer from "./CountdownTimer";

// Base offset for spots reserved display (remove once you have enough real signups)
const BASE_OFFSET = 100;

interface WaitlistSectionProps {
  fakeBonus?: number;
}

const WaitlistSection = ({ fakeBonus = 0 }: WaitlistSectionProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [actualWaitlistCount, setActualWaitlistCount] = useState(0);
  const { toast } = useToast();
  const { ref, variants } = useScrollAnimation();

  // Total display count = actual count + base offset + fake bonus (resets on refresh)
  const displayCount = actualWaitlistCount + BASE_OFFSET + fakeBonus;

  // Fetch current waitlist count using secure RPC function
  useEffect(() => {
    const fetchCount = async () => {
      const { data, error } = await supabase.rpc("get_waitlist_count");

      if (!error && data !== null) {
        setActualWaitlistCount(data);
      }
    };

    fetchCount();

    // Subscribe to real-time updates for the counter
    const channel = supabase
      .channel("waitlist-counter")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "waitlist" },
        () => setActualWaitlistCount((prev) => prev + 1)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      validateEmail(value);
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Vercel API
      const apiUrl = process.env.NODE_ENV === 'production' ? '/api/waitlist' : 'http://localhost:3002/api/waitlist';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          age: parseInt(age) || 0,
          location: city.trim() || 'Unknown',
          role: role || 'Not specified',
          referralCode: referralCode.trim() || ''
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'Email already exists') {
          toast({
            title: "Already registered",
            description: "This email is already on the waitlist!",
          });
          setIsSubmitting(false);
          return;
        }
        throw new Error('Failed to join waitlist');
      }

      const data = await response.json();

      trackWaitlistSignup(referralCode ? 'referral' : 'organic');

      // Save email for future visitor tracking
      localStorage.setItem('waitlistEmail', email.trim().toLowerCase());
      sessionStorage.setItem('waitlistEmail', email.trim().toLowerCase());

      toast({
        title: "Success!",
        description: "You've been added to the waitlist",
      });

      navigate("/confirmation", { 
        state: { 
          email: email.trim().toLowerCase(), 
          referralCode: referralCode,
          position: data.id,
        } 
      });
    } catch (error: any) {
      console.error('Waitlist signup error:', error);
      
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 gradient-animate-slow">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Join the Waitlist
            </h2>
            <p className="text-xl text-muted-foreground">
              Get in early. Get better pricing. Get first dibs on new features.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-2xl shadow-elegant space-y-6 hover:shadow-glow transition-shadow border-2 border-border/50 hover:border-soft-aqua/40">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background transition-all duration-300 focus:ring-4 focus:border-soft-aqua focus:ring-soft-aqua/20"
                required
                aria-label="Full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-foreground">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-background transition-all duration-300 focus:ring-4 focus:border-soft-aqua focus:ring-soft-aqua/20"
                required
                min="13"
                max="100"
                aria-label="Age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => email && validateEmail(email)}
                className={`bg-background transition-all duration-300 focus:ring-4 ${
                  emailError 
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                    : 'focus:border-soft-aqua focus:ring-soft-aqua/20'
                }`}
                required
                aria-label="Email address"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="email-error"
                  className="text-sm text-destructive"
                >
                  {emailError}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground">I am a</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="bg-background focus:ring-4 focus:ring-soft-aqua/20 transition-all" aria-label="Select your role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="business">Business Owner</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-foreground">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="Mumbai, Delhi, Bangalore..."
                value={city}
                onChange={(e) => setCity(e.target.value.trimStart())}
                className="bg-background focus:ring-4 focus:ring-soft-aqua/20 transition-all"
                aria-label="City"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral" className="text-foreground">Referral Code (optional)</Label>
              <Input
                id="referral"
                type="text"
                placeholder="Enter referral code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.trim().toLowerCase())}
                className="bg-background focus:ring-4 focus:ring-soft-aqua/20 transition-all"
                aria-label="Referral code (optional)"
                maxLength={12}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !!emailError}
              className="w-full bg-gradient-cta hover:scale-[1.02] active:scale-[0.98] transition-all shadow-glow-cta font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Join the waitlist"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join the Waitlist"
              )}
            </Button>
          </form>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: Crown, title: "First in line", desc: "Test features before anyone else" },
              { icon: Sparkles, title: "Locked-in pricing", desc: "Early birds get the best deal. Guaranteed." },
              { icon: Users, title: "Founding member status", desc: "Your feedback shapes the product" }
            ].map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-soft-aqua/20 flex items-center justify-center border border-soft-aqua/30">
                  <perk.icon className="w-6 h-6 text-soft-aqua" aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{perk.title}</h4>
                <p className="text-sm text-muted-foreground">{perk.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Urgency Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mt-8"
          >
            <CountdownTimer 
              targetDate={new Date("2026-06-01T23:59:59")} 
              label="Early Access Closes"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-4 glass-effect p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">Spots Reserved</span>
              <span className="text-sm font-bold text-soft-aqua">
                {displayCount.toLocaleString()} / 1,000
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={displayCount} aria-valuemin={0} aria-valuemax={1000} aria-label="Waitlist spots progress">
              <motion.div 
                className="h-full bg-gradient-cta" 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((displayCount / 1000) * 100, 100)}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
