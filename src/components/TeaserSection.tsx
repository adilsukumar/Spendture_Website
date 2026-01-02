import { motion } from "framer-motion";
import { Eye, Brain, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TeaserSection = () => {
  const { ref, variants } = useScrollAnimation();
  const features = [
    { icon: Eye, text: "Knows where your money goes. Even the cash you forgot about." },
    { icon: Brain, text: "Gives you a heads-up before you overspend. Not guilt after." },
    { icon: Lock, text: "We can't see your spending. Even if we wanted to." },
  ];

  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 gradient-animate-medium">
      <div className="container mx-auto px-6">
        <motion.div ref={ref} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants} className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Here's what you get</h2>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-8 mb-12">
          {features.map((feature, index) => {
            const { ref: featureRef, variants: featureVariants } = useScrollAnimation({ delay: index * 0.1 });
            return (
              <motion.div key={feature.text} ref={featureRef} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={featureVariants} whileHover={{ x: 10, scale: 1.02 }} className="flex items-center gap-6 glass-effect p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald/40">
                <div className="w-14 h-14 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 border border-emerald/20">
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.3 }}>
                    <feature.icon className="w-7 h-7 text-emerald" aria-hidden="true" />
                  </motion.div>
                </div>
                <p className="text-xl text-foreground font-medium">{feature.text}</p>
              </motion.div>
            );
          })}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center">
          <Button onClick={scrollToWaitlist} size="xl" className="bg-gradient-cta hover:scale-105 active:scale-95 transition-all duration-300 shadow-glow-cta font-semibold mb-4" aria-label="Join waitlist">Claim your spot</Button>
          <p className="text-sm text-muted-foreground">We don't sell anything. We don't even have access.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TeaserSection;
