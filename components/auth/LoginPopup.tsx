"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, Sparkles, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import { useGuest } from "../context/GuestContext";

export default function LoginPopup() {
  const { showLoginPopup, setShowLoginPopup } = useGuest();

  return (
    <AnimatePresence>
      {showLoginPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm overflow-hidden"
          >
            {/* Background glass effect */}
            <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl -z-10 shadow-2xl" />
            
            {/* Animated Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />

            {/* Close Button */}
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <X size={18} />
            </button>

            <div className="p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-tr from-primary to-primary/40 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 ring-1 ring-white/10">
                  <Sparkles className="w-8 h-8 text-black" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Unlock Full Power</h3>
                <p className="text-sm text-white/50 leading-relaxed px-4">
                  Sign in to save your learning history and get prioritized AI responses.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-left">
                <div className="flex items-center gap-3 text-[13px] text-white/60 bg-white/5 p-3 rounded-xl border border-white/5">
                  <ShieldCheck size={16} className="text-primary" />
                  <span>Secure cloud storage for notes</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn("google")}
                className="group relative w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-primary text-black font-bold rounded-xl transition-all hover:bg-secondary active:scale-[0.98]"
              >
                <img 
                  src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                  alt="Google" 
                  className="w-4 h-4 object-contain"
                />
                Continue with Google
              </motion.button>

              <p className="text-[10px] text-white/30 px-6">
                Join 10,000+ students already using StudyAI
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
