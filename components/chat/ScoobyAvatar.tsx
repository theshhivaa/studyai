"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";


interface ScoobyAvatarProps {
  isTyping?: boolean;
}
 
export default function ScoobyAvatar({ isTyping = false }: ScoobyAvatarProps) {
  return (
    <div className="relative">
      {/* Glowing Ring */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.4 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -inset-1 rounded-full bg-cyan-500 blur-sm z-0"
          />
        )}
      </AnimatePresence>
 
      <div className={`relative z-10 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center border-2 border-purple-400/50 shadow-lg ${isTyping ? "animate-pulse" : ""}`}>
        <svg viewBox="0 0 100 100" className="w-8 h-8 fill-white">
          {/* Simple Dog Face */}
          <path d="M25 35 L15 15 L40 25 Z" /> {/* Left Ear */}
          <path d="M75 35 L85 15 L60 25 Z" /> {/* Right Ear */}
          <circle cx="50" cy="55" r="30" /> {/* Face Circle */}
          <circle cx="40" cy="50" r="3.5" fill="#000" /> {/* Left Eye */}
          <circle cx="60" cy="50" r="3.5" fill="#000" /> {/* Right Eye */}
          <path d="M45 65 Q50 70 55 65" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" /> {/* Small smile */}
          <circle cx="50" cy="62" r="3" fill="#000" /> {/* Nose */}
        </svg>
      </div>
    </div>
  );
}
