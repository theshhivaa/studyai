"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Flame } from "lucide-react";

export default function Gamification() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const savedXp = localStorage.getItem("scooby_xp");
    const savedStreak = localStorage.getItem("scooby_streak");
    if (savedXp) setXp(parseInt(savedXp));
    if (savedStreak) setStreak(parseInt(savedStreak));

    // Listen for custom events to add XP
    const handleAddXp = (e: any) => {
      const amount = e.detail || 10;
      setXp(prev => {
        const next = prev + amount;
        localStorage.setItem("scooby_xp", next.toString());
        
        // Level up logic
        const nextLevel = Math.floor(next / 100) + 1;
        if (nextLevel > level) {
          setLevel(nextLevel);
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 3000);
        }
        return next;
      });
    };

    window.addEventListener("add-xp", handleAddXp);
    return () => window.removeEventListener("add-xp", handleAddXp);
  }, [level]);

  const progress = (xp % 100);

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-white/5 border-b border-white/5 backdrop-blur-md">
      {/* XP Bar */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">Scooby Scholar • Lvl {level}</span>
          <span className="text-[10px] text-muted">{xp} XP</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          />
        </div>
      </div>

      {/* Streak Counter */}
      <div className="flex items-center gap-1.5 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
        <Flame size={12} className="text-orange-500 animate-pulse" />
        <span className="text-[10px] font-bold text-orange-400">{streak} Day Streak</span>
      </div>

      {/* Level Up Popover */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ scale: 0, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: -20, opacity: 0 }}
            className="fixed inset-x-0 top-20 mx-auto w-fit z-50 bg-[#0a0e1a] border border-cyan-500/50 p-6 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.3)] text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="inline-block p-3 rounded-full bg-cyan-500/20 text-cyan-400 mb-3"
            >
              <Star size={32} />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">LEVEL UP!</h3>
            <p className="text-sm text-cyan-400 font-medium">You reached Level {level} 🐾</p>
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0], x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
