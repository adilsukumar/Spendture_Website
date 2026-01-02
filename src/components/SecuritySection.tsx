import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Lock, Eye, ServerCog } from "lucide-react";
import { useRef } from "react";
import securityPattern from "@/assets/security-pattern.png";

const SecuritySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Encryption",
      description: "256-bit AES encryption protects all your financial data, just like major banks.",
    },
    {
      icon: Lock,
      title: "Secure Data Storage",
      description: "Your information is stored in encrypted databases with multi-layer security protocols.",
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "We never sell your data. Your financial information stays completely private.",
    },
    {
      icon: ServerCog,
      title: "Regular Audits",
      description: "Third-party security audits ensure we maintain the highest standards.",
    },
  ];

  return (
    <section ref={containerRef} className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-10"
      >
        <img 
          src={securityPattern} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/80 to-primary" />

      <motion.div style={{ y: contentY }} className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-primary-foreground/20 rounded-full">
              <span className="text-sm font-semibold text-primary-foreground">Security & Privacy</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
              Your Data is Protected
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We employ enterprise-grade security measures to ensure your financial 
              information remains safe, secure, and completely private.
            </p>
          </motion.div>
        </div>

        {/* Security features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-2xl border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors"
            >
              <div className="mb-6">
                <div className="inline-block p-4 bg-primary-foreground/20 rounded-xl">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-6 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-accent" />
              <span className="font-semibold">SOC 2 Certified</span>
            </div>
            <div className="w-px h-8 bg-primary-foreground/20" />
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-accent" />
              <span className="font-semibold">GDPR Compliant</span>
            </div>
            <div className="w-px h-8 bg-primary-foreground/20" />
            <div className="flex items-center gap-3">
              <ServerCog className="w-6 h-6 text-accent" />
              <span className="font-semibold">ISO 27001</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SecuritySection;
