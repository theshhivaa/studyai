"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import React from "react";
import LoginPopup from "./LoginPopup";

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
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full shadow-[0_0_20px_rgba(245,197,24,0.2)]"
        />
      </div>
    );
  }

  // Soft Guard: Always render the application children (Guest Mode)
  // But inject the LoginPopup which will trigger based on the user's interaction
  return (
    <>
      <div className="relative min-h-screen overflow-x-hidden">
        {children}
        {!session && <LoginPopup />}
      </div>
    </>
  );
};
