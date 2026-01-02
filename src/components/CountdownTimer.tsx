import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

const CountdownTimer = ({ targetDate, label = "Early Access Closes" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-golden-amber/10 to-warm-yellow/10 border border-golden-amber/30 rounded-xl p-4"
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-golden-amber" />
        <span className="text-sm font-semibold text-golden-amber">{label}</span>
      </div>
      
      <div className="flex items-center justify-center gap-2">
        {timeBlocks.map((block, index) => (
          <div key={block.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.span
                key={block.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-2xl md:text-3xl font-bold text-foreground tabular-nums min-w-[2.5rem] text-center"
              >
                {String(block.value).padStart(2, "0")}
              </motion.span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {block.label}
              </span>
            </div>
            {index < timeBlocks.length - 1 && (
              <span className="text-2xl font-bold text-muted-foreground/50 mx-1 -mt-4">:</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
