import { motion } from "framer-motion";
import { Server, Shield, FileCheck, Lock, Bug } from "lucide-react";

const TrustSection = () => {
  const trustBadges = [
    { 
      icon: Server, 
      text: "Stored in India",
      wikiLink: "https://en.wikipedia.org/wiki/Data_center"
    },
    { 
      icon: Shield, 
      text: "AES-256 encryption",
      wikiLink: "https://en.wikipedia.org/wiki/Advanced_Encryption_Standard"
    },
    { 
      icon: FileCheck, 
      text: "DPDP-ready",
      wikiLink: "https://en.wikipedia.org/wiki/Digital_Personal_Data_Protection_Act,_2023"
    },
    { 
      icon: Lock, 
      text: "We can't peek",
      wikiLink: "https://en.wikipedia.org/wiki/Zero-knowledge_proof"
    },
    { 
      icon: Bug, 
      text: "Hackers, we'll pay you",
      wikiLink: "https://en.wikipedia.org/wiki/Bug_bounty_program"
    },
  ];

  return (
    <section id="trust" className="py-16 gradient-animate-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {trustBadges.map((badge, index) => (
            <motion.a
              key={badge.text}
              href={badge.wikiLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 group cursor-pointer"
              aria-label={`Learn more about ${badge.text}`}
            >
              <div className="w-12 h-12 rounded-full bg-emerald/20 flex items-center justify-center group-hover:bg-emerald/30 transition-all duration-300 border-2 border-emerald/30 shadow-soft group-hover:shadow-glow">
                <badge.icon className="w-6 h-6 text-emerald" />
              </div>
              <span className="text-foreground font-semibold text-sm md:text-base group-hover:text-emerald transition-colors underline-offset-4 group-hover:underline">
                {badge.text}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
