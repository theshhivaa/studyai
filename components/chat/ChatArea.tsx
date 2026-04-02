"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Send, Menu, Sparkles, FileText, Layout, Lightbulb, HelpCircle, Copy, Check, Mic, Paperclip, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import ScoobyyAvatar from "@/components/ScoobyyAvatar";
import { useAvatar } from "@/components/context/AvatarContext";
import { useGuest } from "../context/GuestContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatAreaProps {
  onToggleSidebar: () => void;
  activeTopic: string;
  onTopicClick: (topic: string, subject: string) => void;
  handleSendMessage: (text: string, currentMessages?: Message[], fileData?: { mimeType: string, data: string }) => Promise<void>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatArea({ 
  onToggleSidebar, 
  activeTopic, 
  onTopicClick, 
  handleSendMessage,
  messages, 
  setMessages, 
  isLoading, 
  setIsLoading 
}: ChatAreaProps) {
  const { data: session } = useSession();
  const { setAvatarState } = useAvatar();
  const { incrementGuestMessageCount } = useGuest();
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ 
    file: File; 
    preview: string; 
    base64: string;
    mimeType: string;
  } | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 4.5MB for Groq)
    if (file.size > 4.5 * 1024 * 1024) {
      alert("File is too large! Please select a file smaller than 4.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile({
        file,
        preview: URL.createObjectURL(file),
        base64: reader.result as string,
        mimeType: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    if (selectedFile?.preview) {
      URL.revokeObjectURL(selectedFile.preview);
    }
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Setup Voice Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      setAvatarState("idle");
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
        setAvatarState("listening");
        setTimeout(() => setAvatarState("happy"), 1000);
      } catch (error) {
        console.error("Failed to start recording:", error);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    const messageText = text || input;
    if ((!messageText.trim() && !selectedFile) || isLoading) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }

    const fileData = selectedFile ? {
      mimeType: selectedFile.mimeType,
      data: selectedFile.base64
    } : undefined;

    if (!text) setInput(""); // Clear input if sending from form
    
    // Clear file preview immediately
    removeFile();
    
    // Increment guest message count (triggers popup every 10 messages)
    incrementGuestMessageCount();
    
    await handleSendMessage(messageText, undefined, fileData);
    setAvatarState("thinking");
  };

  const quickActions = [
    { label: "📝 Brief Notes", prompt: "Can you generate brief notes on this topic? Style: Brief" },
    { label: "📖 Standard Notes", prompt: "Can you generate standard modular notes on this topic? Style: Standard" },
    { label: "📚 Detailed Notes", prompt: "Can you generate comprehensive detailed notes on this topic? Style: Detailed" },
    { label: "📊 Diagram", prompt: "Can you create a diagram or flowchart for this?" },
    { label: "💡 Examples", prompt: "Can you give me some real-world examples of this?" },
    { label: "❓ Quiz", prompt: "Can you quiz me on this topic?" },
  ];

  const suggestions = [
    "Explain Pointers in C",
    "What is DBMS?",
    "How does OS work?"
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background relative overflow-x-hidden">
      {/* TOP BAR */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 z-20 bg-background/80 backdrop-blur-md sticky top-0">
        <button 
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-white hover:bg-card rounded-lg transition-colors md:hidden"
        >
          <Menu size={24} />
        </button>
        
        <h2 className="text-sm font-medium text-white truncate max-w-[200px] md:max-w-md">
          {activeTopic || "Ask Scooby"}
        </h2>

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[11px] font-bold text-white">
              {session?.user?.name || "Guest"}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] text-text-muted uppercase tracking-wider">Online</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-full border border-border p-1 bg-card flex items-center justify-center">
            <ScoobyyAvatar size={44} variant="yellow" />
          </div>
        </div>
      </header>

      {/* MESSAGES AREA */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 md:px-8 custom-scrollbar space-y-6"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 p-4 md:p-6 rounded-full bg-card border-2 border-primary w-24 h-24 md:w-40 md:h-40 mx-auto flex items-center justify-center shadow-2xl shadow-primary/20 ring-4 ring-primary/10"
            >
              <ScoobyyAvatar variant="yellow" className="w-full h-full" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Hey! I'm Scooby</h1>
            <p className="text-text-muted mb-8 text-sm">Pick a topic or ask me anything about BCA</p>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full justify-center overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {suggestions.map((suggestion, idx) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  onClick={() => handleSend(suggestion)}
                  className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-card border border-border text-[13px] text-white/80 hover:border-primary hover:text-primary transition-all active:scale-[0.98]"
                >
                  · {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full min-w-0 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <MessageBubble key={i} role={msg.role} content={msg.content} />
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center p-0.5 bg-card flex-shrink-0">
                  <ScoobyyAvatar size={16} variant="yellow" />
                </div>
                <div className="bg-card border border-border px-4 py-2 rounded-2xl rounded-tl-none">
                  <div className="flex items-center gap-1.5 h-6">
                    <span className="text-[12px] text-primary font-medium mr-2">Scooby is thinking...</span>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(245,197,24,0.4)]"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>

      {/* INPUT BAR */}
      <footer className="border-t border-border bg-sidebar-bg p-4 sticky bottom-0 z-30">
        <div className="max-w-4xl mx-auto">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleSend(action.prompt)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-card border border-border text-[11px] text-text-muted hover:text-primary transition-colors flex items-center gap-1.5 group"
              >
                <span className="group-hover:scale-110 transition-transform">{action.label.split(" ")[0]}</span>
                <span>{action.label.split(" ").slice(1).join(" ")}</span>
              </button>
            ))}
          </div>

          {/* File Preview */}
          <AnimatePresence>
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="mb-3 p-2 rounded-xl bg-card border border-border flex items-center gap-3 w-fit relative group"
              >
                {selectedFile.mimeType.startsWith("image/") ? (
                  <img src={selectedFile.preview} alt="upload" className="w-10 h-10 rounded-lg object-cover border border-border" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-border">
                    <FileText className="text-primary" size={20} />
                  </div>
                )}
                <div className="flex flex-col pr-6">
                  <span className="text-[11px] font-bold text-white max-w-[120px] truncate">{selectedFile.file.name}</span>
                  <span className="text-[9px] text-text-muted">{(selectedFile.file.size / 1024).toFixed(1)} KB</span>
                </div>
                <button 
                  type="button"
                  onClick={removeFile}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white shadow-lg scale-0 group-hover:scale-100 transition-transform"
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(""); }}
            className="flex items-center gap-2"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`p-2.5 rounded-xl border transition-all flex-shrink-0 ${
                selectedFile 
                  ? "bg-primary/20 text-primary border-primary/50" 
                  : "bg-card border-border text-text-muted hover:text-primary"
              }`}
            >
              <Paperclip size={20} />
            </button>

            <div className="relative flex-1 group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isRecording ? "Listening..." : "Ask Scooby anything..."}
                className={`w-full bg-card border rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-text-muted transition-all outline-none shadow-sm ${
                  isRecording 
                    ? "border-primary ring-4 ring-primary/20 shadow-yellow/10" 
                    : "border-border focus:border-primary focus:ring-4 focus:ring-primary/20 focus:shadow-yellow/10"
                }`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {input.trim() ? (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-black hover:bg-secondary transition-all active:scale-90"
                  >
                    <Send size={18} fill="currentColor" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-95 relative ${
                      isRecording 
                        ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                        : "bg-white/5 text-text-muted hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    <Mic size={18} />
                    {isRecording && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
}
