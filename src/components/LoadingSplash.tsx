import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import spendtureLogo from "@/assets/spendture-logo.jpg";

interface LoadingSplashProps {
  onLoadingComplete: () => void;
}

const STORAGE_KEY = "spendture_visited";

const LoadingSplash = ({ onLoadingComplete }: LoadingSplashProps) => {
  const [progress, setProgress] = useState(0);

  const handleSkip = useCallback(() => {
    onLoadingComplete();
  }, [onLoadingComplete]);

  useEffect(() => {
    // Mark as visited for future visits
    localStorage.setItem(STORAGE_KEY, "true");

    // Fast loading - ~500ms total
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 150);
          return 100;
        }
        return prev + 25; // 4 steps x 60ms = 240ms + 150ms exit = ~400ms
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-deep-teal via-dark-teal to-deep-teal"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mb-6"
        >
          <img
            src={spendtureLogo}
            alt="Spendture Logo"
            width={112}
            height={112}
            className="w-28 h-28 mx-auto rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Spendture
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          className="text-base text-white/80 mb-6"
        >
          Choose Spendture. Make your money venture.
        </motion.p>

        {/* Progress bar */}
        <div className="w-56 mx-auto mb-4">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="h-full bg-gradient-to-r from-soft-aqua to-mint"
            />
          </div>
        </div>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handleSkip}
          className="text-sm text-white/60 hover:text-white/90 transition-colors underline-offset-2 hover:underline"
        >
          Skip
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LoadingSplash;
