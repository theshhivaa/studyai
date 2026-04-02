"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ArrowRight, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

interface NamePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NamePromptModal({ isOpen, onClose }: NamePromptModalProps) {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Please enter a valid name (min 2 characters)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/update-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) throw new Error("Failed to update name");

      // Update the NextAuth session client-side
      await update({ name: name.trim() });
      
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden"
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl -z-10 shadow-2xl" />
            
            {/* Gradient Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full animate-pulse delay-700" />

            <div className="p-8 space-y-8 text-center">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-primary to-primary/40 rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 ring-1 ring-white/10">
                  <User className="w-10 h-10 text-black" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Let's Personalize</h2>
                <p className="text-white/50 text-sm leading-relaxed px-6">
                  What should we call you? This name will be shown in your chat interface.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name..."
                      className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-2xl py-4 pl-4 pr-12 text-white placeholder:text-white/20 transition-all outline-none"
                      disabled={isLoading}
                      autoFocus
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                      <Sparkles size={20} />
                    </div>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs px-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative flex items-center justify-center gap-3 px-6 py-4 bg-primary text-black font-bold rounded-2xl transition-all hover:bg-secondary active:scale-[0.98] disabled:opacity-50 group"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Start Learning
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
              
              <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
                Personalizing StudyAI for you
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
