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
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const [openModule, setOpenModule] = useState<string | null>(null);

  const handleSubjectClick = (subject: any) => {
    if (subject.modules && subject.modules.length > 0) {
      setOpenSubject(openSubject === subject.id ? null : subject.id);
    } else {
      onTopicClick(subject.name, subject.name);
    }
  };

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
        <div className="flex-1 overflow-y-auto px-2 custom-scrollbar pb-10">
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

              <div className={`mt-1 space-y-0.5 overflow-hidden transition-all duration-300 ${openSemester === sem.number ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
                {sem.subjects.map((subject) => (
                  <div key={subject.id}>
                    <button
                      onClick={() => handleSubjectClick(subject)}
                      className={`w-full text-left px-4 py-2 text-[13px] border-l-2 transition-all duration-200 flex items-center justify-between ${
                        activeTopic === subject.name || openSubject === subject.id
                          ? "border-primary text-primary bg-primary/5" 
                          : "border-transparent text-white/70 hover:border-primary hover:bg-primary/5 hover:text-white"
                      }`}
                    >
                      <span>{subject.name}</span>
                      {subject.modules && subject.modules.length > 0 && (
                        openSubject === subject.id ? <ChevronDown size={12} /> : <ChevronRight size={12} />
                      )}
                    </button>

                    {/* Modules List */}
                    {subject.modules && openSubject === subject.id && (
                      <div className="mt-1 space-y-0.5 ml-2 border-l border-border/50">
                        {subject.modules.map((module, mIdx) => (
                          <div key={`${subject.id}-${mIdx}`}>
                            <button
                              onClick={() => setOpenModule(openModule === `${subject.id}-${mIdx}` ? null : `${subject.id}-${mIdx}`)}
                              className={`w-full text-left px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between ${
                                openModule === `${subject.id}-${mIdx}` ? "text-muted-yellow" : "text-text-muted hover:text-white"
                              }`}
                            >
                              <span className="truncate pr-2">{module.name.split(":")[0]}</span>
                              {openModule === `${subject.id}-${mIdx}` ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                            </button>

                            {/* Topics List */}
                            {openModule === `${subject.id}-${mIdx}` && (
                              <div className="space-y-0.5 ml-4">
                                {module.topics.map((topic) => (
                                  <button
                                    key={topic}
                                    onClick={() => onTopicClick(topic, subject.name)}
                                    className={`w-full text-left px-4 py-1.5 text-[12px] border-l transition-all duration-200 ${
                                      activeTopic === topic 
                                        ? "border-primary text-primary bg-primary/5" 
                                        : "border-transparent text-white/50 hover:border-primary hover:text-white"
                                    }`}
                                  >
                                    {topic}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
