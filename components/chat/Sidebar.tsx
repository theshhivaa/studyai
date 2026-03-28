"use client";

import { useState, useMemo } from "react";
import { X, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { bcaSyllabus } from "@/lib/data/syllabus";
import ScoobyAvatarSVG from "@/components/ui/ScoobyAvatarSVG";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTopic: string;
  onTopicClick: (topic: string, subject: string) => void;
  onNewChat: () => void;
}

export default function Sidebar({ isOpen, onClose, activeTopic, onTopicClick, onNewChat }: SidebarProps) {
  const [openSemester, setOpenSemester] = useState<number | null>(null);

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed md:relative top-0 left-0 h-full w-[260px] bg-sidebar-bg border-r border-border z-50 transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* HEADER */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScoobyAvatarSVG size={28} state="idle" />
            <span className="text-white font-medium text-sm tracking-tight">Scooby.AI</span>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden text-text-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* NEW CHAT BUTTON */}
        <div className="px-4 mb-6">
          <button 
            onClick={onNewChat}
            className="w-full bg-primary hover:bg-secondary text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </div>

        {/* SYLLABUS LIST */}
        <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
          {bcaSyllabus.map((sem) => (
            <div key={sem.number} className="mb-4">
              <button 
                onClick={() => setOpenSemester(openSemester === sem.number ? null : sem.number)}
                className="w-full px-3 py-2 flex items-center justify-between group"
              >
                <span className="text-[10px] uppercase font-bold text-muted-yellow tracking-[0.1em]">
                  SEMESTER {sem.number}
                </span>
                {openSemester === sem.number ? (
                  <ChevronDown size={14} className="text-muted-yellow opacity-50" />
                ) : (
                  <ChevronRight size={14} className="text-muted-yellow opacity-50 group-hover:opacity-100" />
                )}
              </button>

              <div className={`mt-1 space-y-0.5 overflow-hidden transition-all duration-300 ${openSemester === sem.number ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                {sem.subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => onTopicClick(subject.name, subject.name)}
                    className={`w-full text-left px-4 py-2 text-[13px] border-l-2 transition-all duration-200 ripple-effect ${
                      activeTopic === subject.name 
                        ? "border-primary text-primary bg-primary/5" 
                        : "border-transparent text-white/70 hover:border-primary hover:bg-primary/5 hover:text-white"
                    }`}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ATTRIBUTION */}
        <div className="p-4 border-t border-border">
          <div className="text-[10px] text-[#333333] space-y-1">
            <p>Developed by Shiva Prasad S</p>
            <p>© 2026 Scooby.AI</p>
          </div>
        </div>
      </aside>
    </>
  );
}
