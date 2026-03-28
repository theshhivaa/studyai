"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SyllabusSidebar from "@/components/syllabus/SyllabusSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const [initialPrompt, setInitialPrompt] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTopicClick = (topic: string, subject: string) => {
    setInitialPrompt(`Tell me more about ${topic} in the context of ${subject}.`);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0a0e1a]">
      <Navbar />
      
      <div className="flex flex-1 pt-16 overflow-hidden relative">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:block w-72 shrink-0 border-r border-white/5">
          <SyllabusSidebar onTopicClick={handleTopicClick} />
        </aside>

        {/* Mobile Sidebar Toggle - Visible ONLY on mobile */}
        <div className="md:hidden fixed top-20 left-4 z-40">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary shadow-[0_0_15px_rgba(0,212,255,0.2)] backdrop-blur-md active:scale-95 transition-transform"
          >
            <Menu size={20} />
            <span className="text-[10px] font-bold font-orbitron tracking-widest uppercase">Syllabus</span>
          </button>
        </div>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <div className="fixed inset-0 z-[100] md:hidden">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              
              {/* Drawer Content */}
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-[#0a0e1a] border-r border-white/10 shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                  <span className="text-xs font-bold font-orbitron tracking-widest text-primary">SELECT TOPIC</span>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-lg bg-white/5 text-muted hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <SyllabusSidebar onTopicClick={handleTopicClick} />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col min-w-0 relative">
          <ChatWindow initialMessage={initialPrompt} />
        </main>
      </div>
    </div>
  );
}
