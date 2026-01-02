import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, TrendingUp, Lock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingParticles from "./FloatingParticles";

const PreLaunchHero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Parallax effect for phone image - moves slower than background
  const phoneY = useTransform(scrollY, [0, 500], [0, 50]);
  const phoneScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToPrivacyPolicy = () => {
    navigate("/privacy-policy");
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background gradient with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-hero -z-20"
        style={{ y: y1 }}
      />
      
      {/* Floating particles - behind content */}
      <FloatingParticles />
      
      <motion.div 
        className="container mx-auto px-6"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-8"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-soft-aqua/20 rounded-full border border-soft-aqua/30">
              <p className="text-sm font-medium text-soft-aqua">Built for people who hate budgeting.</p>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Finally, a money app that doesn't make you feel broke.
            </h1>
            
            <p className="text-xl lg:text-2xl text-foreground/90 max-w-xl leading-relaxed">
              Spendture tracks your spending (yes, even cash), nudges you before you overspend, and helps you save. No spreadsheets. No guilt trips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={scrollToWaitlist}
                size="xl"
                className="bg-gradient-cta hover:scale-105 transition-all duration-300 shadow-glow-cta font-semibold text-lg"
              >
                Get Early Access
              </Button>
              
              <button
                onClick={goToPrivacyPolicy}
                className="text-foreground hover:text-soft-aqua transition-colors text-lg font-medium underline-offset-4 hover:underline flex items-center gap-2"
              >
                See privacy promise →
              </button>
            </div>
            
            <p className="text-sm text-muted-foreground pt-2">
              No spam. Just early access and better pricing for the first 1,000.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center p-4 rounded-2xl bg-card/90 dark:bg-charcoal/60 backdrop-blur-md border border-soft-aqua/30 hover:border-soft-aqua/60 hover:bg-card dark:hover:bg-charcoal/70 transition-all cursor-pointer shadow-elegant hover:shadow-glow"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock className="w-8 h-8 text-soft-aqua mb-2" />
                </motion.div>
                <div className="text-sm font-semibold text-foreground">100% Private</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center p-4 rounded-2xl bg-card/90 dark:bg-charcoal/60 backdrop-blur-md border border-emerald/30 hover:border-emerald/60 hover:bg-card dark:hover:bg-charcoal/70 transition-all cursor-pointer shadow-elegant hover:shadow-glow"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <TrendingUp className="w-8 h-8 text-emerald mb-2" />
                </motion.div>
                <div className="text-sm font-semibold text-foreground">Saves You Money</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center p-4 rounded-2xl bg-card/90 dark:bg-charcoal/60 backdrop-blur-md border border-golden-amber/30 hover:border-golden-amber/60 hover:bg-card dark:hover:bg-charcoal/70 transition-all cursor-pointer shadow-elegant hover:shadow-glow"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  <Sparkles className="w-8 h-8 text-golden-amber mb-2" />
                </motion.div>
                <div className="text-sm font-semibold text-foreground">Runs Itself</div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right content - Feature showcase with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: phoneY, scale: phoneScale }}
            className="relative"
          >
            <div className="relative space-y-4">
              {/* Floating cards showcasing features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="p-6 rounded-2xl bg-card/90 dark:bg-charcoal/60 backdrop-blur-md shadow-elegant hover:shadow-glow hover:bg-card dark:hover:bg-charcoal/70 transition-all cursor-pointer border border-soft-aqua/30"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-soft-aqua/20">
                    <TrendingUp className="w-6 h-6 text-soft-aqua" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tracks everything</h3>
                    <p className="text-sm text-muted-foreground">Even that chai from the corner shop.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="p-6 rounded-2xl bg-card/90 dark:bg-charcoal/60 backdrop-blur-md shadow-elegant ml-8 hover:shadow-glow hover:bg-card dark:hover:bg-charcoal/70 transition-all cursor-pointer border border-emerald/30"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-emerald/20">
                    <Sparkles className="w-6 h-6 text-emerald" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Gentle nudges</h3>
                    <p className="text-sm text-muted-foreground">Before you overspend, not after.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="p-6 rounded-2xl bg-card/90 dark:bg-charcoal/60 backdrop-blur-md shadow-elegant hover:shadow-glow hover:bg-card dark:hover:bg-charcoal/70 transition-all cursor-pointer border border-soft-aqua/30"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-golden-amber/20">
                    <Lock className="w-6 h-6 text-golden-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Private by default</h3>
                    <p className="text-sm text-muted-foreground">We can't see it. Neither can anyone else.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center p-1">
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

export default PreLaunchHero;
