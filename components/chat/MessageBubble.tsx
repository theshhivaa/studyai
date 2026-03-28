"use client";

import ReactMarkdown from "react-markdown";
import { Dog, User, Copy, Check, Volume2, VolumeX, CheckCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoobyAvatarSVG from "@/components/ui/ScoobyAvatarSVG";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
 
  useEffect(() => {
    setMounted(true);
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
 
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  const handleSpeak = () => {
    if (!window.speechSynthesis) return;
 
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
 
    const cleanText = content
      .replace(/[#*`_]/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/!\[.*?\]\(.*?\)/g, '');
 
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;
 
    // Set baby/cartoonish properties
    utterance.pitch = 2.0; // Highest pitch setting
    utterance.rate = 1.15; // Slightly faster 

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
 
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };
 
  if (!mounted) {
    return <div className={`flex w-full mb-6 ${role === "user" ? "justify-end" : "justify-start"} opacity-0`}></div>;
  }

  return (
    <motion.div 
      initial={{ 
        opacity: 0, 
        x: role === "user" ? 50 : -50, 
        scale: 0.9,
        rotate: role === "user" ? 2 : -2
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        scale: 1,
        rotate: 0,
        transition: { 
          type: "spring",
          stiffness: role === "assistant" ? 400 : 300,
          damping: role === "assistant" ? 25 : 20,
          mass: 1
        }
      }}
      className={`flex w-full mb-6 ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[88%] md:max-w-[80%] ${role === "user" ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`flex-shrink-0 mt-1 ${role === "user" ? "ml-4" : "mr-4"}`}>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: role === "assistant" ? [0, -10, 10, 0] : 0 }}
            className={`w-11 h-11 rounded-full flex items-center justify-center border shadow-lg ${
              role === "user" 
                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" 
                : "bg-purple-500/20 text-purple-400 border-purple-500/30"
            }`}
          >
            {role === "user" ? <User size={22} /> : <ScoobyAvatarSVG size={32} state="idle" />}
          </motion.div>
        </div>
 
        <div 
          className={`relative group p-5 rounded-2xl transition-all duration-300 ${
          role === "user" 
            ? "bg-gradient-to-br from-cyan-600/30 to-blue-600/20 backdrop-blur-md border border-cyan-500/30 text-white rounded-tr-none shadow-[0_0_25px_rgba(6,182,212,0.15)]" 
            : "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 text-[#e2e8f0] rounded-tl-none shadow-2xl shadow-black/40"
        }`}>
          {role === "assistant" && content && (
            <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <button
                onClick={handleSpeak}
                className="p-1.5 rounded-lg bg-white/10 text-muted hover:text-cyan-400 hover:bg-white/20 transition-all shadow-sm"
                title={isSpeaking ? "Stop speaking" : "Speak response"}
              >
                {isSpeaking ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-white/10 text-muted hover:text-cyan-400 hover:bg-white/20 transition-all shadow-sm"
                title="Copy response"
              >
                {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
              </button>
            </div>
          )}
 
          {/* Message Content */}
          <div className={`prose prose-invert max-w-none relative z-10 selection:bg-cyan-500/30 break-words overflow-hidden ${
            role === "assistant" 
              ? "text-[15px] leading-relaxed text-slate-200 font-sans" 
              : "text-[14px] leading-relaxed text-white font-sans"
          }`}>
            <div className="flex flex-col gap-3">
              {role === "user" && content.includes("data:image") && (
                <motion.img 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={content.split("\n")[0]} 
                  alt="Uploaded" 
                  className="max-w-full rounded-xl border border-white/20 shadow-lg" 
                />
              )}
              <div className="markdown-content">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-lg font-bold text-white mb-2 mt-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-base font-bold text-white mb-2 mt-3" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                    code: ({node, inline, ...props}: any) => (
                      inline 
                        ? <code className="bg-white/10 px-1 rounded text-cyan-400 font-mono text-[13px]" {...props} />
                        : <pre className="bg-black/40 p-3 rounded-xl border border-white/10 overflow-x-auto my-3"><code className="text-[13px] font-mono" {...props} /></pre>
                    )
                  }}
                >
                  {role === "user" && content.includes("data:image") 
                    ? content.split("\n").slice(1).join("\n") 
                    : content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          
          <div className={`flex items-center gap-2 mt-2 ${role === "user" ? "justify-end" : "justify-start"}`}>
            {role === "assistant" && content && (
              <div className="flex gap-1 mr-auto">
                {["👍", "🤯", "🔁"].map((emoji) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-xs grayscale hover:grayscale-0 transition-all p-1 hover:bg-white/5 rounded-md"
                    title={emoji === "🔁" ? "Explain differently" : undefined}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            )}
            <span className="text-[9px] opacity-40 font-mono tracking-tighter" suppressHydrationWarning>
              {mounted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "00:00"}
            </span>
            {role === "user" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <CheckCheck size={10} className="text-cyan-400 opacity-60" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
