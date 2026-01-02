import { motion } from "framer-motion";
import { Droplets, Layers, Lightbulb } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProblemSection = () => {
  const { ref, variants } = useScrollAnimation();
  
  const problems = [
    { icon: Droplets, title: "Where does it all go?", description: "Swiggy at midnight. That gym you forgot about. ₹500 here, ₹200 there. It adds up." },
    { icon: Layers, title: "Scattered everywhere", description: "Bank app says one thing. GPay says another. And who keeps receipts anymore?" },
    { icon: Lightbulb, title: "Advice you can use", description: "Not another pie chart. Real nudges, right when you're about to blow the budget." },
  ];

  return (
    <section id="why-it-matters" className="py-20 gradient-animate-slow">
      <div className="container mx-auto px-6">
        <motion.div ref={ref} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Why it matters?</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const { ref: cardRef, variants: cardVariants } = useScrollAnimation({ delay: index * 0.1 });
            return (
              <motion.div key={problem.title} ref={cardRef} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} whileHover={{ y: -8, scale: 1.02 }} className="glass-effect p-8 rounded-2xl transition-all duration-300 shadow-soft hover:shadow-glow group cursor-pointer border-2 border-transparent hover:border-soft-aqua/40 bg-gradient-to-br from-card to-muted/30">
                <div className="w-16 h-16 rounded-full bg-soft-aqua/20 flex items-center justify-center mb-6 shadow-soft group-hover:shadow-glow-cta group-hover:bg-soft-aqua/30 transition-all duration-300 border border-soft-aqua/30">
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} whileHover={{ scale: 1.1 }}>
                    <problem.icon className="w-8 h-8 text-soft-aqua" aria-hidden="true" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-soft-aqua transition-colors">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
