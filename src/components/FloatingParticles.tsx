import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { IndianRupee, Coins, PiggyBank, Wallet, TrendingUp, CircleDollarSign } from "lucide-react";

const FloatingParticles = () => {
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  
  if (prefersReducedMotion) {
    return null;
  }

  // Money-themed icons with positions away from center content
  const moneyIcons = [
    { Icon: IndianRupee, x: 5, y: 12, size: 20, delay: 0 },
    { Icon: Coins, x: 92, y: 8, size: 22, delay: 0.5 },
    { Icon: PiggyBank, x: 8, y: 78, size: 24, delay: 1 },
    { Icon: TrendingUp, x: 88, y: 82, size: 20, delay: 1.5 },
    { Icon: Wallet, x: 3, y: 45, size: 18, delay: 2 },
    { Icon: CircleDollarSign, x: 95, y: 35, size: 22, delay: 2.5 },
    { Icon: IndianRupee, x: 12, y: 88, size: 16, delay: 3 },
    { Icon: Coins, x: 85, y: 58, size: 18, delay: 3.5 },
  ];

  const visibleIcons = isMobile ? moneyIcons.slice(0, 4) : moneyIcons;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Subtle gradient orbs */}
      {[...Array(isMobile ? 2 : 3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: 250 + i * 80,
            height: 250 + i * 80,
            left: i === 0 ? '-8%' : i === 1 ? '70%' : '30%',
            top: i === 0 ? '5%' : i === 1 ? '55%' : '70%',
            background: `radial-gradient(circle, hsl(var(--soft-aqua) / 0.06) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating money icons - subtle and elegant */}
      {visibleIcons.map(({ Icon, x, y, size, delay }, i) => (
        <motion.div
          key={`money-icon-${i}`}
          className="absolute text-soft-aqua/20 dark:text-soft-aqua/15"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 5, -5, 0],
            rotate: [0, 8, -8, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8 + i,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Golden sparkle coins */}
      {[...Array(isMobile ? 4 : 8)].map((_, i) => (
        <motion.div
          key={`coin-${i}`}
          className="absolute"
          style={{
            left: `${8 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-golden-amber/40 to-warm-yellow/30 shadow-sm" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;