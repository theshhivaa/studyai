"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SyllabusSidebar from "@/components/syllabus/SyllabusSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { Menu, X } from "lucide-react";

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

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden pt-16">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
            <div className="absolute inset-y-0 left-0 w-80 bg-[#111827] animate-in slide-in-from-left duration-300">
              <SyllabusSidebar onTopicClick={handleTopicClick} />
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 text-muted hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col min-w-0 relative">
          {/* Mobile Sidebar Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden absolute top-4 left-4 z-20 p-2 rounded-lg bg-white/5 border border-white/10 text-primary shadow-lg"
          >
            <Menu size={20} />
          </button>

          <ChatWindow initialMessage={initialPrompt} />
        </main>
      </div>
    </div>
  );
}
