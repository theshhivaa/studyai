"use client";

import { useSession, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Rocket, ShieldCheck, Zap } from "lucide-react";
import React from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative z-10 w-full max-w-md p-8 mx-4"
        >
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl -z-10 shadow-2xl" />
          
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl shadow-blue-500/20 mb-4"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                StudyAI
              </h1>
              <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
                Intelligent Study Companion
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 py-8">
              <FeatureItem icon={<Zap className="w-4 h-4" />} text="AI-Powered Learning" />
              <FeatureItem icon={<ShieldCheck className="w-4 h-4" />} text="Secure Data Storage" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn("google")}
              className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-semibold rounded-2xl overflow-hidden transition-all hover:bg-white/90"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[45deg] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
              <img 
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                alt="Google" 
                className="w-5 h-5 object-contain"
              />
              Continue with Google
            </motion.button>

            <p className="text-white/30 text-xs px-8">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

const FeatureItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl text-white/70 text-sm font-medium">
    <div className="text-blue-400">{icon}</div>
    {text}
  </div>
);
