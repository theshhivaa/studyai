"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Sparkles, FileText, Layout, Lightbulb, Loader2, Dog, Volume2, VolumeX, Paperclip, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import ScoobyAvatarSVG from "@/components/ui/ScoobyAvatarSVG";
import { getScoobyResponse } from "@/lib/ai";
import confetti from "canvas-confetti";
import useSound from "use-sound";
import { useAvatar } from "@/components/context/AvatarContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWindow({ initialMessage = "" }: { initialMessage?: string }) {
  const { setAvatarState } = useAvatar();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm Scooby 🐾 Your BCA buddy. What topic are you stuck on today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
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

  // Sound effects
  const [playPop] = useSound("/sounds/pop.mp3", { volume: 0.5 });
  const [playDing] = useSound("/sounds/ding.mp3", { volume: 0.5 });
  const [playBark] = useSound("/sounds/bark.mp3", { volume: 0.5 });

  useEffect(() => {
    if (soundEnabled) {
      setTimeout(() => playBark(), 1000); // One-time bark
    }
  }, []);

  useEffect(() => {
    if (initialMessage) {
      handleSend(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Voice Recognition Setup
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
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
        setAvatarState("happy");
        setTimeout(() => setAvatarState("idle"), 3000);
      } catch (error) {
        console.error("Failed to start recording:", error);
      }
    }
  };

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00d4ff", "#7b2fff", "#ffffff"]
    });
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    if (action.label === "Notes") {
      triggerConfetti();
    }
    handleSend(action.prompt);
  };

  const handleSend = async (text: string) => {
    const messageText = text || input;
    if ((!messageText.trim() && !selectedFile) || isLoading) return;

    if (isRecording) {
      recognitionRef.current?.stop();
    }

    // Set mood based on keywords
    if (messageText.toLowerCase().includes("syllabus") || messageText.toLowerCase().includes("notes") || messageText.toLowerCase().includes("quiz")) {
      triggerConfetti();
    }

    const userMessageContent = selectedFile && selectedFile.mimeType.startsWith("image/") 
      ? `${selectedFile.base64}\n${messageText}`
      : messageText;

    const userMessage: Message = { role: "user", content: userMessageContent };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setSuggestions([]);
    setAvatarState("thinking");

    const history = messages.map(m => ({
      role: m.role,
      parts: m.content
    }));

    const fileData = selectedFile ? {
      mimeType: selectedFile.mimeType,
      data: selectedFile.base64
    } : undefined;

    // Add an empty assistant message that will be populated by the stream
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    const response = await getScoobyResponse(
      messageText, 
      history, 
      fileData, 
      (chunk) => {
        setIsLoading(false); // Stop "thinking" as soon as we start getting text
        if (chunk.length > 0) setAvatarState("idle");
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.role === "assistant") {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              ...lastMessage,
              content: lastMessage.content + chunk
            };
            return updatedMessages;
          }
          return prev;
        });
      }
    );

    // If we get an error response and no chunks were streamed
    if (response && typeof response === "string") {
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.role === "assistant" && lastMessage.content === "") {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            content: response
          };
          return updatedMessages;
        }
        return prev;
      });
    }

    setIsLoading(false);
    setAvatarState("idle");
    removeFile();

    // Generate simple smart suggestions
    const newSuggestions = ["Give me notes", "Show a diagram", "Quiz me on this"];
    setTimeout(() => setSuggestions(newSuggestions), 1000);
  };

  const quickActions = [
    { label: "Notes", icon: <FileText size={14} />, prompt: "Can you generate detailed notes on this topic?" },
    { label: "Diagram", icon: <Layout size={14} />, prompt: "Can you create a diagram or flowchart for this?" },
    { label: "Examples", icon: <Lightbulb size={14} />, prompt: "Can you give me some real-world examples of this?" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a0e1a] relative overflow-hidden group/window">

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-scroll-v"></div>
      </div>

      {/* Shifting Gradient Border */}
      <div className="absolute inset-0 pointer-events-none p-[1px] rounded-[inherit]">
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-border-flow opacity-20"></div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 pt-16 md:pt-6 custom-scrollbar space-y-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto w-full">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} content={msg.content} />
            ))}
          </AnimatePresence>
          
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="flex justify-start mb-6"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 bg-card/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl rounded-tl-none shadow-xl shadow-cyan-500/5">
                    <ScoobyAvatarSVG size={40} state="thinking" />
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            y: [0, -6, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: Infinity, 
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                          className="w-2.5 h-2 my-1"
                        >
                          <div className="w-full h-full bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-cyan-400 font-medium tracking-wider pl-1 font-mono uppercase"
                  >
                    Scooby is thinking<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>...</motion.span>
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {suggestions.length > 0 && !isLoading && (
              <div className="flex flex-wrap gap-2 mt-4 ml-14">
                {suggestions.map((suggestion, idx) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(suggestion)}
                    className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-medium hover:bg-cyan-500/20 transition-all shadow-sm"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-white/5 bg-[#0a0e1a]/80 backdrop-blur-xl relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickAction(action)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] text-muted hover:border-cyan-500/50 hover:text-cyan-400 transition-all shadow-lg active:shadow-cyan-500/20"
              >
                {action.icon}
                {action.label}
              </motion.button>
            ))}
          </div>

          {/* File Preview */}
          <AnimatePresence>
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="mb-4 p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 w-fit"
              >
                {selectedFile.mimeType.startsWith("image/") ? (
                  <img src={selectedFile.preview} alt="upload" className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-white/10">
                    <FileText className="text-cyan-400" size={24} />
                  </div>
                )}
                <div className="flex flex-col pr-8">
                  <span className="text-[10px] font-bold text-white max-w-[150px] truncate">{selectedFile.file.name}</span>
                  <span className="text-[9px] text-muted">{(selectedFile.file.size / 1024).toFixed(1)} KB</span>
                </div>
                <button 
                  type="button"
                  onClick={removeFile}
                  className="absolute top-1 right-1 p-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(""); }}
            className="relative flex items-center gap-3"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`p-3.5 rounded-xl border transition-all ${
                selectedFile 
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50" 
                  : "bg-white/5 border-white/10 text-muted hover:text-cyan-400"
              }`}
            >
              <Paperclip size={20} />
            </motion.button>

            <div className="relative flex-1 group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isRecording ? "Listening..." : "Ask Scooby..."}
                className={`w-full bg-[#111827]/80 backdrop-blur-md border rounded-2xl py-4 pl-12 pr-4 text-base focus:outline-none transition-all placeholder:text-muted/50 ${
                  isRecording 
                    ? "border-cyan-500 ring-4 ring-cyan-500/10 bg-cyan-500/5 shadow-[0_0_25px_rgba(34,211,238,0.1)]" 
                    : "border-white/10 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5"
                }`}
              />
              <Sparkles className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isRecording ? "text-cyan-400 animate-pulse" : "text-muted group-focus-within:text-cyan-400"}`} />
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={toggleRecording}
              className={`p-3.5 rounded-xl border transition-all relative ${
                isRecording 
                  ? "bg-cyan-500 text-[#0a0e1a] border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]" 
                  : "bg-white/5 border-white/10 text-muted hover:text-cyan-400 hover:border-cyan-500/30 shadow-lg"
              }`}
              title={isRecording ? "Stop Recording" : "Voice Input"}
            >
              <Mic size={20} />
              {isRecording && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgb(34, 211, 238)" }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              disabled={(!input.trim() && !selectedFile) || isLoading}
              className="p-3.5 rounded-xl bg-cyan-500 text-[#0a0e1a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95"
            >
              <Send size={20} />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
