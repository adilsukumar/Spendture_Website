import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiCelebrationProps {
  trigger?: boolean;
}

const ConfettiCelebration = ({ trigger = true }: ConfettiCelebrationProps) => {
  useEffect(() => {
    if (!trigger) return;

    const colors = ["#5EEAD4", "#34D399", "#F59E0B", "#FBBF24", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];
    
    // Initial celebration burst
    const initialBurst = () => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
        colors,
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    };

    // Full screen falling confetti
    const createFallingConfetti = () => {
      const duration = 8000; // 8 seconds of falling confetti
      const animationEnd = Date.now() + duration;
      
      const frame = () => {
        if (Date.now() > animationEnd) return;
        
        // Create confetti across the full width of screen
        confetti({
          particleCount: 3,
          angle: 90,
          spread: 45,
          origin: { x: Math.random(), y: -0.1 },
          colors,
          gravity: 0.4,
          scalar: 0.8,
          drift: Math.random() * 2 - 1,
          ticks: 300,
          zIndex: 9999,
          startVelocity: 15,
        });
        
        // Continue the animation
        requestAnimationFrame(frame);
      };
      
      frame();
    };

    // Side cannons for extra celebration
    const sideCannons = () => {
      const end = Date.now() + 3000;
      
      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval);
          return;
        }
        
        // Left cannon
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors,
          zIndex: 9999,
        });
        
        // Right cannon  
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors,
          zIndex: 9999,
        });
      }, 400);
    };

    // Execute the celebration sequence
    initialBurst();
    setTimeout(createFallingConfetti, 500);
    setTimeout(sideCannons, 1000);

  }, [trigger]);

  return null;
};

export default ConfettiCelebration;
