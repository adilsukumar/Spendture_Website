import { motion } from "framer-motion";
import { Activity, Bell, BarChart3, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProductTeaserGrid = () => {
  const { ref, variants } = useScrollAnimation();
  const features = [
    { icon: Activity, title: "Tracks everything", description: "Cards, UPI, cash. All in one place. Real-time insights." },
    { icon: Bell, title: "Timely nudges", description: "A heads-up when you're about to blow your eating-out budget. Right when it matters." },
    { icon: BarChart3, title: "Better alternatives", description: "That ₹500 shirt? Same one's ₹350 elsewhere. We'll tell you." },
    { icon: ShieldCheck, title: "Truly private", description: "End-to-end encrypted. Stored in India. We can't see it even if we tried." },
  ];

  return (
    <section id="features" className="py-20 gradient-animate-medium">
      <div className="container mx-auto px-6">
        <motion.div ref={ref} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants} className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Features worth having</h2>
          <p className="text-xl text-muted-foreground">Simple tools. Clear numbers. That's it.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const { ref: featureRef, variants: featureVariants } = useScrollAnimation({ delay: index * 0.1 });
            return (
              <motion.div key={feature.title} ref={featureRef} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={featureVariants} whileHover={{ y: -8, scale: 1.03 }} className="glass-effect p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 group border-2 border-transparent hover:border-soft-aqua/40">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors duration-300 border border-primary/20">
                  <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
                    <feature.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductTeaserGrid;
