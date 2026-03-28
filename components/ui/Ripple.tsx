"use client";

import { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RippleProps {
  color?: string;
  duration?: number;
}

export default function Ripple({ color = "rgba(34, 211, 238, 0.3)", duration = 600 }: RippleProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>([]);

  useLayoutEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);
    };

    const parent = document.getElementById("ripple-container");
    // This is a bit tricky for a generic component, so we'll use a better approach in ChatWindow
  }, []);

  return null; // We'll implement a simpler inline version in ChatWindow for now to avoid complexity
}
