"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, FlameIcon, Star, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import ScoobyAvatarSVG from "@/components/ui/ScoobyAvatarSVG";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pb-24">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 glass border border-primary/20 rounded-3xl p-4 flex items-center justify-center relative overflow-hidden group shadow-2xl hover:border-primary/50 transition-all duration-500 animate-[float_6s_ease-in-out_infinite]">
                {/* Background glow for the box */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -inset-1 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
                
                <div className="relative z-10">
                  <ScoobyAvatarSVG size={100} state="idle" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-orbitron tracking-tighter mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-tight">
              Hey, Student 👋
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-white/50 mb-10">
              What are we studying today?
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/chat"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-[#0a0e1a] font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-glow flex items-center justify-center gap-2"
              >
                Ask Scooby <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/syllabus"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Browse Syllabus
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
