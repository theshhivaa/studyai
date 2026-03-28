"use client";

import Link from "next/link";
import { Dog } from "lucide-react";
import { useState, useEffect } from "react";
import ScoobyAvatarSVG from "@/components/ui/ScoobyAvatarSVG";

const navLinks = [
  { name: "Syllabus", href: "/syllabus" },
  { name: "Notes", href: "/notes" },
  { name: "Ask Scooby", href: "/chat" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/20 p-1.5 rounded-lg group-hover:bg-primary/30 transition-colors">
              <ScoobyAvatarSVG size={28} state="idle" />
            </div>
            <span className="text-xl font-bold font-orbitron tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Scooby BCA
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center space-x-6">
            {mounted && navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Guest badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center text-[#0a0e1a] font-bold text-xs">
                S
              </div>
              <span className="text-sm font-medium hidden sm:block">Student</span>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
              {mounted && (
                <Link href="/chat" className="text-primary">
                  <Dog className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
