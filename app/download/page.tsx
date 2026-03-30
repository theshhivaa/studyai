"use client";

import { useState } from "react";
import Link from "next/link";
import ScoobyyAvatar from "@/components/ScoobyyAvatar";
import {
  Download,
  Smartphone,
  Star,
  Shield,
  Zap,
  BookOpen,
  MessageSquare,
  Wifi,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI Chat On-the-Go",
    desc: "Ask Scooby anything about your BCA syllabus, anytime, anywhere.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Full Syllabus Access",
    desc: "Browse the complete BCA semester-wise syllabus right in your palm.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    desc: "Optimized for mobile with near-instant AI responses.",
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "Offline Syllabus",
    desc: "Access syllabus content even without an internet connection.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Private & Secure",
    desc: "Your conversations stay local. No data sold. Ever.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Always Improving",
    desc: "Regular updates with new subjects, features, and smarter AI.",
  },
];

const steps = [
  "Tap the Download APK button below",
  'Allow "Install from unknown sources" in your Android settings',
  "Open the downloaded APK file to install",
  "Launch Scooby AI and start studying! 🎉",
];

export default function DownloadPage() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      // Trigger actual download
      const a = document.createElement("a");
      a.href = "/scooby-bca.apk";
      a.download = "ScoobyBCA.apk";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden">
      {/* Aurora blobs */}
      <div
        className="aurora-blob w-[600px] h-[600px] rounded-full bg-yellow-500/20 top-[-150px] left-[-200px]"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="aurora-blob w-[500px] h-[500px] rounded-full bg-amber-400/10 bottom-[200px] right-[-150px]"
        style={{ animationDelay: "5s" }}
      />

      {/* Nav */}
      <nav className="relative z-10 border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm text-gray-400 group-hover:text-primary transition-colors">Back to App</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <ScoobyyAvatar size={28} variant="black" />
            <span className="font-orbitron font-bold text-lg bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Scooby BCA
            </span>
          </Link>
          <div className="w-24" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 text-sm text-yellow-400 font-medium mb-8">
            <Smartphone className="w-4 h-4" />
            Android App · Free Download
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl scale-150 animate-pulse" />
              <ScoobyyAvatar size={120} variant="black" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold mb-6 leading-tight">
            Scooby AI{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Mobile App
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Your BCA study companion, now in your pocket. Get AI-powered answers,
            browse your full syllabus, and ace every exam — all from your Android device.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="download-apk-btn"
              onClick={handleDownload}
              disabled={downloading}
              className="relative group flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed min-w-[240px] justify-center"
            >
              {downloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                  Preparing...
                </>
              ) : downloaded ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Download Started!
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download APK · Free
                </>
              )}
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 border border-white/10 hover:border-yellow-500/40 text-gray-400 hover:text-white px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:bg-white/5"
            >
              Use Web Version
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-green-400" />
              Verified Safe
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>Android 6.0+</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>~15 MB</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-12">
            Everything You Need,{" "}
            <span className="text-yellow-400">Right in Your Hand</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all duration-300 tilt-card perspective-tilt"
              >
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-4 group-hover:bg-yellow-500/20 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Install */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-4">
            How to Install
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Installing an APK takes less than a minute. Follow these simple steps:
          </p>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-yellow-500/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold font-orbitron text-sm">
                  {i + 1}
                </div>
                <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>

          {/* Warning note */}
          <div className="mt-8 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-3">
            <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-300 mb-1">Android Security Notice</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Android may warn you about installing from unknown sources. This is a standard
                security step for sideloaded apps. Scooby AI is completely safe — you can verify
                the APK before installing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              <div className="relative animate-float" style={{ animationDelay: "1s" }}>
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl scale-150" />
                <ScoobyyAvatar size={80} variant="black" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold mb-4">
              Ready to Study Smarter?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Join hundreds of BCA students already using Scooby AI to crack their exams.
            </p>
            <button
              id="download-apk-btn-bottom"
              onClick={handleDownload}
              disabled={downloading}
              className="group flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 active:scale-95 disabled:opacity-70 mx-auto"
            >
              {downloading ? (
                <div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
              ) : (
                <Download className="w-5 h-5 group-hover:animate-bounce" />
              )}
              {downloaded ? "Download Started! 🎉" : "Download for Android — Free"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-4 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} Scooby BCA · Made with ❤️ by{" "}
          <span className="text-yellow-500/70">Shiva Prasad S</span>
        </p>
      </footer>
    </div>
  );
}
