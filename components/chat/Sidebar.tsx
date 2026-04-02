"use client";

import { useState, useMemo } from "react";
import { X, Plus, ChevronDown, ChevronRight, Download, Smartphone, GraduationCap } from "lucide-react";
import Link from "next/link";
import { bcaSyllabus, foodTechSyllabus } from "@/lib/data/syllabus";
import ScoobyyAvatar from "@/components/ScoobyyAvatar";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTopic: string;
  onTopicClick: (topic: string, subject: string) => void;
  onNewChat: () => void;
  activeCourse: "BCA" | "FoodTech";
  setActiveCourse: (course: "BCA" | "FoodTech") => void;
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  activeTopic, 
  onTopicClick, 
  onNewChat,
  activeCourse,
  setActiveCourse
}: SidebarProps) {
  const [openSemester, setOpenSemester] = useState<number | null>(null);
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const [openModule, setOpenModule] = useState<string | null>(null);

  const currentSyllabus = activeCourse === "BCA" ? bcaSyllabus : foodTechSyllabus;

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
        className={`fixed md:relative top-0 left-0 h-full w-[260px] bg-sidebar/95 backdrop-blur-xl border-r border-border z-50 transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* HEADER */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScoobyyAvatar size={32} variant="black" />
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
        <div className="px-4 mb-4">
          <button 
            onClick={onNewChat}
            className="w-full bg-primary hover:bg-secondary text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </div>

        {/* COURSE SWITCHER */}
        <div className="px-4 mb-4">
          <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 overflow-hidden">
            {(["BCA", "FoodTech"] as const).map((course) => (
              <button
                key={course}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCourse(course);
                  setOpenSemester(null);
                }}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all duration-300 ${
                  activeCourse === course 
                    ? "bg-primary text-black shadow-lg shadow-primary/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {course === "FoodTech" ? "Food Tech" : "BCA"}
              </button>
            ))}
          </div>
        </div>

        {/* SYLLABUS LIST */}
        <div className="flex-1 overflow-y-auto px-2 custom-scrollbar pb-10">
          <div className="px-3 mb-2">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
              <GraduationCap size={12} />
              {activeCourse === "BCA" ? "BCA Syllabus" : "Food Tech Syllabus"}
            </h3>
          </div>
          {currentSyllabus.map((sem) => (
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
                              onClick={() => {
                                const isOpening = openModule !== `${subject.id}-${mIdx}`;
                                setOpenModule(isOpening ? `${subject.id}-${mIdx}` : null);
                              }}
                              className={`w-full text-left px-4 py-2 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between transition-all duration-200 hover:bg-white/5 active:scale-[0.98] ${
                                openModule === `${subject.id}-${mIdx}` ? "text-primary bg-primary/5" : "text-text-muted hover:text-white"
                              }`}
                            >
                              <span className="truncate pr-2">{module.name}</span>
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

        {/* DOWNLOAD APP BANNER */}
        <div className="px-3 py-3 border-t border-border">
          <Link
            href="/download"
            className="group flex items-center gap-3 w-full bg-gradient-to-r from-yellow-500/10 to-amber-500/5 hover:from-yellow-500/20 hover:to-amber-500/10 border border-yellow-500/20 hover:border-yellow-500/40 rounded-xl px-3 py-2.5 transition-all duration-300"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-500/15 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-yellow-400 leading-tight">Get the App</p>
              <p className="text-[10px] text-gray-500 leading-tight mt-0.5 truncate">Download Scooby AI for Android</p>
            </div>
            <Download className="w-3.5 h-3.5 text-yellow-500/60 group-hover:text-yellow-400 flex-shrink-0 group-hover:animate-bounce transition-colors" />
          </Link>
        </div>

        {/* BOTTOM ATTRIBUTION */}
        <div className="px-4 pb-4">
          <div className="text-[10px] text-[#333333] space-y-1">
            <p>Developed by Shiva Prasad S</p>
            <p>© 2026 Scooby.AI</p>
          </div>
        </div>
      </aside>
    </>
  );
}
