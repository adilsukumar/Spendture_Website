import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Activity {
  id: string;
  name: string;
  city: string;
}

const LiveActivityFeed = () => {
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

  // Obfuscate name for privacy (e.g., "Arjun" -> "A***")
  const obfuscateName = (name: string): string => {
    if (!name || name.length < 2) return "Someone";
    return `${name.charAt(0).toUpperCase()}***`;
  };

  // Extract name from email for privacy-safe display
  const getNameFromEmail = (email: string): string => {
    const localPart = email.split("@")[0];
    // Remove numbers and special characters, capitalize first letter
    const cleanName = localPart.replace(/[0-9._-]/g, "");
    if (cleanName.length < 2) return "Someone";
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1, 6);
  };

  const showActivity = (activity: Activity) => {
    setCurrentActivity(activity);
    // Hide after 4 seconds
    setTimeout(() => {
      setCurrentActivity(null);
    }, 4000);
  };

  useEffect(() => {
    // Subscribe to new signups in real-time only
    // Note: We don't fetch existing entries anymore as that would require public read access
    // Realtime INSERT events include the new row data in the payload for subscribers
    const channel = supabase
      .channel("live-activity-feed")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "waitlist",
        },
        (payload) => {
          const newEntry = payload.new as { id: string; email: string; city: string | null };
          showActivity({
            id: newEntry.id,
            name: obfuscateName(getNameFromEmail(newEntry.email)),
            city: newEntry.city || "India",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <AnimatePresence>
      {currentActivity && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 sm:bottom-6 left-4 sm:left-6 z-30 max-w-xs"
        >
          <div className="glass-effect rounded-2xl p-4 shadow-glow-cta border-2 border-soft-aqua/40 bg-gradient-to-br from-deep-teal/90 to-forest-green/90 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-full bg-gradient-cta flex items-center justify-center shadow-soft"
              >
                <UserPlus className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  {currentActivity.name} from {currentActivity.city}
                </p>
                <p className="text-xs text-white/80">just joined the waitlist</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveActivityFeed;
