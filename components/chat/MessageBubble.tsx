"use client";

import ReactMarkdown from "react-markdown";
import { Copy, Check, Headphones } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScoobyyAvatar from "@/components/ScoobyyAvatar";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  onDictate?: (content: string) => void;
}

export default function MessageBubble({ role, content, onDictate }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex w-full mb-4 px-2 ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[92%] sm:max-w-[85%] md:max-w-[75%] min-w-0 ${role === "user" ? "flex-row-reverse" : "flex-row"} gap-2 sm:gap-3`}>
        {role === "assistant" && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-border flex items-center justify-center p-1 bg-card">
              <ScoobyyAvatar size={20} variant="yellow" className="sm:w-6 sm:h-6" />
            </div>
          </div>
        )}

        <div className="relative group min-w-0 flex-1">
          <div 
            className={`p-3 sm:p-4 rounded-2xl transition-all duration-300 min-w-0 ${
              role === "user" 
                ? "bg-primary text-black rounded-tr-none shadow-yellow/20 shadow-lg font-medium" 
                : "bg-card border border-border text-white rounded-tl-none shadow-xl"
            }`}
          >
            <div className={`${role === "assistant" ? "prose prose-invert" : "prose text-black"} max-w-full text-[13px] sm:text-[14px] leading-relaxed break-words overflow-x-auto custom-scrollbar ${role === "user" ? "selection:bg-black/10" : "selection:bg-primary/30"}`}>
              <ReactMarkdown
                components={{
                  h1: ({...props}) => <h1 className="text-base sm:text-lg font-bold mb-2 mt-4 first:mt-0" {...props} />,
                  h2: ({...props}) => <h2 className="text-sm sm:text-base font-bold mb-2 mt-3 first:mt-0" {...props} />,
                  p: ({...props}) => <p className="mb-2 last:mb-0 break-words" {...props} />,
                  ul: ({...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                  ol: ({...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                  li: ({...props}) => <li className="mb-0.5 break-words" {...props} />,
                  strong: ({...props}) => <strong className="font-bold border-b border-primary/30" {...props} />,
                  table: ({...props}) => (
                    <div className="my-4 overflow-x-auto rounded-xl border border-border bg-black/20 custom-scrollbar -mx-1 sm:mx-0">
                      <table className="min-w-full divide-y divide-border border-collapse" {...props} />
                    </div>
                  ),
                  thead: ({...props}) => <thead className="bg-white/5" {...props} />,
                  th: ({...props}) => <th className="px-3 py-2 text-left text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-primary/80" {...props} />,
                  td: ({...props}) => <td className="px-3 py-2 text-[12px] sm:text-[13px] border-t border-border text-white/90" {...props} />,
                  img: ({...props}) => <img className="max-w-full h-auto rounded-xl shadow-lg border border-border my-4" {...props} />,
                  code: ({node, inline, className, children, ...props}: any) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");
                    
                    if (!inline) {
                      return (
                        <div className="relative my-3 group/code min-w-0">
                          <pre className="bg-black p-3 sm:p-4 rounded-xl border border-border overflow-x-auto custom-scrollbar">
                            <code className="text-[12px] sm:text-[13px] font-mono text-primary leading-tight whitespace-pre-wrap break-all sm:break-normal" {...props}>
                              {children}
                            </code>
                          </pre>
                          <button
                            onClick={() => handleCopy(codeString)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-card border border-border text-text-muted hover:text-white opacity-0 group-hover/code:opacity-100 transition-all shadow-lg"
                          >
                            {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                          </button>
                        </div>
                      );
                    }
                    return (
                      <code className={`px-1 rounded bg-black/30 font-mono text-[12px] sm:text-[13px] break-all ${role === "user" ? "text-black" : "text-primary"}`} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
          
          <div className={`mt-2 flex items-center gap-3 ${role === "user" ? "justify-end" : "justify-start"}`}>
            {role === "assistant" && onDictate && (
              <button
                onClick={() => onDictate(content)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors group"
                title="Dictation Mode"
              >
                <Headphones size={12} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold">Dictate</span>
              </button>
            )}
            <span className="text-[8px] sm:text-[9px] text-text-muted opacity-60 font-mono tracking-tighter">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
