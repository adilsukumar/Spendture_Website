import { useInView } from "react-intersection-observer";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, triggerOnce = true, delay = 0 } = options;
  
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
  };

  return { ref, inView, variants };
};
