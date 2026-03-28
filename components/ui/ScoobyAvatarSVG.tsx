"use client";

import React from "react";
import { useAvatar } from "@/components/context/AvatarContext";

interface ScoobyAvatarSVGProps {
  size?: number;
  state?: "idle" | "thinking" | "happy" | "listening" | "sad" | "auto";
  className?: string;
}

export default function ScoobyAvatarSVG({ size = 80, state = "auto", className = "" }: ScoobyAvatarSVGProps) {
  const context = useAvatar();
  const currentState = state === "auto" ? context.avatarState : state;

  return (
    <div 
      className={`relative inline-flex items-center justify-center avatar-container avatar-state-${currentState} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-glow scooby-svg">
        {/* Tail (behind body) */}
        <g className="scooby-tail origin-bottom">
           <path d="M15,60 Q5,70 10,85 Q15,95 20,85 Q25,70 15,60Z" fill="#8B5E3C" />
        </g>
        
        {/* Head Base */}
        <g className="scooby-head origin-center">
            {/* Left Ear */}
            <g className="scooby-ear-left" style={{ transformOrigin: "30px 35px" }}>
               <path d="M25,20 C10,10 5,40 15,55 C20,60 30,40 35,30 Z" fill="#7A4F30" />
            </g>
            {/* Right Ear */}
            <g className="scooby-ear-right" style={{ transformOrigin: "70px 35px" }}>
               <path d="M75,20 C90,10 95,40 85,55 C80,60 70,40 65,30 Z" fill="#7A4F30" />
            </g>

            {/* Face/Muzzle */}
            <circle cx="50" cy="50" r="35" fill="#8B5E3C" />
            <ellipse cx="50" cy="65" rx="22" ry="18" fill="#C49A6C" />
            
            {/* Nose */}
            <ellipse cx="50" cy="56" rx="6" ry="4" fill="#3A2012" className="drop-shadow-sm" />
            
            {/* Mouth */}
            <g className="scooby-mouth">
               <path d="M40,68 Q50,78 60,68" fill="none" stroke="#5A3A22" strokeWidth="2.5" strokeLinecap="round" className={`scooby-smile ${currentState === 'sad' ? 'opacity-0' : 'opacity-100'}`} />
               <path d="M40,70 Q50,62 60,70" fill="none" stroke="#5A3A22" strokeWidth="2.5" strokeLinecap="round" className={`scooby-frown ${currentState === 'sad' ? 'opacity-100' : 'opacity-0'}`} />
            </g>

            {/* Glowing Visor */}
            <g className="scooby-visor">
              {/* Strap */}
              <rect x="12" y="38" width="76" height="6" fill="#1A1A2E" />
              {/* Lenses */}
              <rect x="22" y="32" width="24" height="16" rx="5" fill="#00d4ff" fillOpacity="0.85" stroke="#ffffff" strokeWidth="1.5" className="glow-polygon" />
              <rect x="54" y="32" width="24" height="16" rx="5" fill="#00d4ff" fillOpacity="0.85" stroke="#ffffff" strokeWidth="1.5" className="glow-polygon" />
              {/* Bridge */}
              <rect x="46" y="38" width="8" height="4" fill="#1A1A2E" />
              
              {/* Eyes Animation inside visor */}
              <g className="scooby-eyes">
                 <line x1="28" y1="40" x2="40" y2="40" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                 <line x1="60" y1="40" x2="72" y2="40" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </g>
            </g>

            {/* Collar */}
            <path d="M22,70 Q50,90 78,70 L72,82 Q50,100 28,82 Z" fill="#7b2fff" />
            {/* Cyber Tag */}
            <g className="glow-polygon">
              <polygon points="50,78 56,88 50,95 44,88" fill="#00d4ff" />
              <circle cx="50" cy="85" r="2" fill="#fff" />
            </g>
        </g>
        
        {/* State specific UI */}
        {currentState === "happy" && (
           <g className="scooby-sparkles animate-fade-in-up">
              <polygon points="10,10 12,18 20,20 12,22 10,30 8,22 0,20 8,18" fill="#ffd700" className="animate-pulse" />
              <polygon points="90,20 92,26 98,28 92,30 90,36 88,30 82,28 88,26" fill="#00d4ff" style={{ animationDelay: '0.2s', animationDirection: 'alternate-reverse' }} className="animate-pulse" />
           </g>
        )}
        {currentState === "thinking" && (
            <g className="scooby-thinking-bubble animate-fade-in-up">
              <ellipse cx="80" cy="20" rx="15" ry="10" fill="white" />
              <polygon points="68,26 62,35 73,28" fill="white" />
              <circle cx="75" cy="20" r="1.5" fill="#000" className="animate-bounce" />
              <circle cx="80" cy="20" r="1.5" fill="#000" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
              <circle cx="85" cy="20" r="1.5" fill="#000" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
            </g>
        )}
      </svg>
    </div>
  );
}
