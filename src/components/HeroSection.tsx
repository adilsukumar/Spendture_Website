import { Button } from "@/components/ui/button";
import { Download, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroPhone from "@/assets/hero-phone.png";
import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  const { data: waitlistCount = 0 } = useQuery({
    queryKey: ['waitlist-count'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_waitlist_count');
      if (error) throw error;
      return data || 0;
    },
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle -z-10" />
      
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-8"
          >
            <h1 className="mb-4">
              <img 
                src={heroBanner} 
                alt="Choose Spendture. Make your money venture." 
                className="w-full max-w-2xl h-auto"
              />
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed">
              Track expenses, automate budgets, and never miss a payment. 
              Spendture simplifies personal finance for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="download" size="xl" className="gap-3">
                <Download className="w-6 h-6" />
                Download Now
              </Button>
              
              <Button variant="hero" size="xl" className="gap-3">
                <Smartphone className="w-6 h-6" />
                View Features
              </Button>
            </div>
            
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-4xl font-bold text-accent">{waitlistCount.toLocaleString()}+</div>
                <div className="text-muted-foreground">On the Waitlist</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">1,000</div>
                <div className="text-muted-foreground">Early Bird Spots</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">100%</div>
                <div className="text-muted-foreground">Privacy-First</div>
              </div>
            </div>
          </motion.div>
          
          {/* Right content - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative animate-float">
              <img 
                src={heroPhone} 
                alt="Spendture App Interface" 
                className="w-full h-auto rounded-3xl shadow-elegant"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
