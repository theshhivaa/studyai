"use client";

import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScoobyyAvatar from "@/components/ScoobyyAvatar";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
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
      className={`flex w-full mb-4 ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[85%] md:max-w-[75%] ${role === "user" ? "flex-row-reverse" : "flex-row"} gap-3`}>
        {role === "assistant" && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center p-1 bg-card">
              <ScoobyyAvatar size={24} variant="yellow" />
            </div>
          </div>
        )}

        <div className="relative group">
          <div 
            className={`p-4 rounded-2xl transition-all duration-300 ${
              role === "user" 
                ? "bg-primary text-black rounded-tr-none shadow-yellow/20 shadow-lg font-medium" 
                : "bg-card border border-border text-white rounded-tl-none shadow-xl"
            }`}
          >
            <div className={`${role === "assistant" ? "prose prose-invert" : "prose text-black"} max-w-none text-[14px] leading-relaxed break-words overflow-hidden ${role === "user" ? "selection:bg-black/10" : "selection:bg-primary/30"}`}>
              <ReactMarkdown
                components={{
                  h1: ({...props}) => <h1 className="text-lg font-bold mb-2 mt-4 first:mt-0" {...props} />,
                  h2: ({...props}) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0" {...props} />,
                  p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                  ul: ({...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                  ol: ({...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                  li: ({...props}) => <li className="mb-0.5" {...props} />,
                  strong: ({...props}) => <strong className="font-bold border-b border-primary/30" {...props} />,
                  code: ({node, inline, className, children, ...props}: any) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");
                    
                    if (!inline) {
                      return (
                        <div className="relative my-3 group/code">
                          <pre className="bg-black p-4 rounded-xl border border-border overflow-x-auto">
                            <code className="text-[13px] font-mono text-primary leading-tight" {...props}>
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
                      <code className={`px-1 rounded bg-black/30 font-mono text-[13px] ${role === "user" ? "text-black" : "text-primary"}`} {...props}>
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
          
          <div className={`mt-1.5 flex items-center gap-2 ${role === "user" ? "justify-end" : "justify-start"}`}>
            <span className="text-[9px] text-text-muted opacity-60 font-mono tracking-tighter">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
