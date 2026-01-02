import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus } from "lucide-react";
import confetti from "canvas-confetti";

// 100 common Indian names for fake signups
const COMMON_NAMES = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan",
  "Shaurya", "Atharva", "Advait", "Pranav", "Kabir", "Rudra", "Dhruv", "Arnav", "Vedant", "Aarush",
  "Rohan", "Rahul", "Amit", "Vikram", "Raj", "Priya", "Sneha", "Ananya", "Isha", "Kavya",
  "Aanya", "Diya", "Saanvi", "Myra", "Kiara", "Aadhya", "Anvi", "Pari", "Nisha", "Pooja",
  "Riya", "Neha", "Shruti", "Megha", "Tanvi", "Sakshi", "Anjali", "Divya", "Kritika", "Simran",
  "Manish", "Suresh", "Ramesh", "Anil", "Sanjay", "Vijay", "Ravi", "Naveen", "Rakesh", "Mukesh",
  "Deepak", "Ajay", "Manoj", "Sunil", "Ashok", "Gaurav", "Nikhil", "Kunal", "Varun", "Harsh",
  "Karan", "Mohit", "Sahil", "Yash", "Dev", "Lakshmi", "Radha", "Sita", "Gita", "Meera",
  "Rani", "Uma", "Lata", "Rekha", "Sunita", "Anita", "Suman", "Savita", "Kamla", "Padma",
  "Akash", "Arun", "Bharat", "Chetan", "Dinesh", "Gopal", "Hemant", "Jagdish", "Kishore", "Lalit"
];

// Common Indian cities (expanded list - 80 cities)
const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
  "Jaipur", "Lucknow", "Surat", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
  "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
  "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Allahabad",
  "Ranchi", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
  "Kochi", "Thiruvananthapuram", "Mysore", "Mangalore", "Chandigarh", "Dehradun", "Shimla", "Guwahati",
  "Bhubaneswar", "Cuttack", "Tiruchirappalli", "Salem", "Warangal", "Guntur", "Nellore", "Hubli",
  "Belgaum", "Solapur", "Bareilly", "Moradabad", "Gorakhpur", "Aligarh", "Jalandhar", "Bikaner",
  "Udaipur", "Ajmer", "Kota", "Bhilai", "Jammu", "Noida", "Gurgaon", "Faridabad",
  "Panipat", "Karnal", "Rohtak", "Hisar", "Ambala", "Sonipat", "Patiala", "Bathinda"
];

interface FakeActivityFeedProps {
  onNewSignup?: () => void;
}

const FakeActivityFeed = ({ onNewSignup }: FakeActivityFeedProps) => {
  const [currentActivity, setCurrentActivity] = useState<{ name: string; city: string } | null>(null);

  const getRandomName = useCallback(() => {
    return COMMON_NAMES[Math.floor(Math.random() * COMMON_NAMES.length)];
  }, []);

  const getRandomCity = useCallback(() => {
    return CITIES[Math.floor(Math.random() * CITIES.length)];
  }, []);

  const obfuscateName = (name: string): string => {
    if (!name || name.length < 2) return "Someone";
    return `${name.charAt(0).toUpperCase()}***`;
  };

  const playNotificationSound = useCallback(() => {
    try {
      // Happy ascending major chord arpeggio (C-E-G-C) with sparkle
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      const now = audioContext.currentTime;

      const masterGain = audioContext.createGain();
      masterGain.connect(audioContext.destination);
      masterGain.gain.setValueAtTime(0.15, now);

      // C-E-G-C arpeggio (C5, E5, G5, C6)
      const notes = [
        { freq: 523.25, time: 0, duration: 0.15 },     // C5
        { freq: 659.25, time: 0.1, duration: 0.15 },   // E5
        { freq: 783.99, time: 0.2, duration: 0.15 },   // G5
        { freq: 1046.5, time: 0.3, duration: 0.25 },   // C6 (longer, celebratory)
      ];

      notes.forEach(({ freq, time, duration }) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(masterGain);

        osc.frequency.setValueAtTime(freq, now + time);
        osc.type = "sine";

        // Smooth envelope
        gain.gain.setValueAtTime(0, now + time);
        gain.gain.linearRampToValueAtTime(0.3, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, now + time + duration);

        osc.start(now + time);
        osc.stop(now + time + duration);
      });

      // Sparkle note at the end
      const sparkle = audioContext.createOscillator();
      const sparkleGain = audioContext.createGain();
      sparkle.connect(sparkleGain);
      sparkleGain.connect(masterGain);
      sparkle.frequency.setValueAtTime(2093, now + 0.45); // C7
      sparkle.type = "sine";
      sparkleGain.gain.setValueAtTime(0, now + 0.45);
      sparkleGain.gain.linearRampToValueAtTime(0.15, now + 0.47);
      sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
      sparkle.start(now + 0.45);
      sparkle.stop(now + 0.7);
    } catch {
      // Audio not available, silently ignore
    }
  }, []);


  const triggerConfetti = useCallback(() => {
    // Small celebratory confetti burst from bottom-left where the popup appears
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.1, y: 0.9 },
      colors: ['#5EEAD4', '#34D399', '#F59E0B', '#FBBF24'],
      scalar: 0.8,
      gravity: 1.2,
    });
  }, []);

  const showFakeActivity = useCallback(() => {
    const activity = {
      name: obfuscateName(getRandomName()),
      city: getRandomCity(),
    };
    
    setCurrentActivity(activity);
    onNewSignup?.();
    playNotificationSound();
    triggerConfetti();
    
    // Hide after 4 seconds with smooth exit
    setTimeout(() => {
      setCurrentActivity(null);
    }, 4000);
  }, [getRandomName, getRandomCity, onNewSignup, playNotificationSound, triggerConfetti]);

  useEffect(() => {
    // Initial delay before first popup (8-15 seconds)
    const initialDelay = Math.random() * 7000 + 8000;
    
    let timeoutId: NodeJS.Timeout;
    
    const scheduleNext = () => {
      // Random interval between 20-45 seconds for a smooth, non-intrusive experience
      const nextDelay = Math.random() * 25000 + 20000;
      timeoutId = setTimeout(() => {
        showFakeActivity();
        scheduleNext();
      }, nextDelay);
    };
    
    // Start after initial delay
    timeoutId = setTimeout(() => {
      showFakeActivity();
      scheduleNext();
    }, initialDelay);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showFakeActivity]);

  return (
    <AnimatePresence>
      {currentActivity && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            mass: 0.8
          }}
          className="fixed bottom-24 sm:bottom-6 left-4 sm:left-6 z-[9998] max-w-xs"
        >
          <motion.div 
            initial={{ boxShadow: "0 0 0 0 rgba(94, 234, 212, 0)" }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(94, 234, 212, 0)",
                "0 0 20px 5px rgba(94, 234, 212, 0.3)",
                "0 0 0 0 rgba(94, 234, 212, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: 1 }}
            className="rounded-2xl p-4 shadow-lg border-2 border-soft-aqua/40 bg-gradient-to-br from-deep-teal/95 to-forest-green/95 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-full bg-gradient-cta flex items-center justify-center shadow-md"
              >
                <UserPlus className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-semibold text-white"
                >
                  {currentActivity.name} from {currentActivity.city}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs text-white/80"
                >
                  just reserved their spot ✨
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FakeActivityFeed;
