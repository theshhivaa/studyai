"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronDown, ChevronRight, BookOpen, Hash, Search, Flame, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { bcaSyllabus, foodTechSyllabus } from "@/lib/data/syllabus";

interface SyllabusSidebarProps {
  onTopicClick: (topic: string, subject: string) => void;
  activeCourse: Course;
  setActiveCourse: (course: Course) => void;
}

type Course = "BCA" | "FoodTech";

export default function SyllabusSidebar({ 
  onTopicClick, 
  activeCourse, 
  setActiveCourse 
}: SyllabusSidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [openSemester, setOpenSemester] = useState<number | null>(null);
  
  const currentSyllabus = activeCourse === "BCA" ? bcaSyllabus : foodTechSyllabus;

  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredSyllabus = useMemo(() => {
    if (!searchQuery) return currentSyllabus;
    const query = searchQuery.toLowerCase();
    
    return currentSyllabus.map(sem => ({
      ...sem,
      subjects: sem.subjects.filter(sub => 
        sub.name.toLowerCase().includes(query) || 
        sub.topics.some(t => t.toLowerCase().includes(query)) ||
        sub.modules?.some(m => m.name.toLowerCase().includes(query) || m.topics.some(t => t.toLowerCase().includes(query)))
      )
    })).filter(sem => sem.subjects.length > 0);
  }, [searchQuery, currentSyllabus]);

  if (!mounted) return (
    <div className="flex flex-col h-full bg-[#111827]/30 border-r border-white/5 overflow-hidden animate-pulse">
      <div className="p-4 border-b border-white/5 bg-[#0a0e1a]/50">
        <div className="h-4 w-32 bg-white/5 rounded-md mb-4" />
        <div className="h-10 w-full bg-white/5 rounded-xl" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#111827]/30 border-r border-white/5 overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/5 bg-[#0a0e1a]/50">
        <h2 className="text-[10px] font-bold font-orbitron tracking-[0.2em] text-white/40 flex items-center gap-2 mb-4 uppercase">
          <GraduationCap className="w-3.5 h-3.5" />
          Select Your Major
        </h2>

        {/* Course Switcher */}
        <div className="flex p-1 bg-white/5 rounded-xl mb-4 border border-white/5">
          {(["BCA", "FoodTech"] as Course[]).map((course) => (
            <button
              key={course}
              onClick={() => {
                setActiveCourse(course);
                setOpenSemester(null);
                setOpenSubject(null);
              }}
              className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                activeCourse === course 
                  ? "bg-primary text-black shadow-lg shadow-primary/20" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {course === "FoodTech" ? "Food Tech" : "BCA"}
            </button>
          ))}
        </div>
        
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted group-focus-within:text-primary transition-colors" />
          <input 
            type="text"
            placeholder={`Search ${activeCourse} topics...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-[11px] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Popular Topics Section */}
        {!searchQuery && (
          <div className="p-4 border-b border-white/5">
            <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Flame size={10} className="text-orange-500" />
              Popular Topics
            </h3>
            <div className="space-y-2">
              {["Data Structures", "Java OOPS", "DBMS SQL"].map(topic => (
                <button 
                  key={topic}
                  onClick={() => onTopicClick(topic, "Core")}
                  className="w-full text-left text-[11px] text-white/60 hover:text-cyan-400 hover:bg-cyan-500/5 p-2 rounded-lg transition-all border border-transparent hover:border-cyan-500/20"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-2">
          {filteredSyllabus.map((sem) => (
            <div key={sem.number} className="mb-2 rounded-2xl overflow-hidden bg-white/5 border border-white/5">
              <button
                onClick={() => setOpenSemester(openSemester === sem.number ? null : sem.number)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white/90">Semester {sem.number}</span>
                  <span className="text-[9px] text-muted uppercase tracking-tighter">
                    {activeCourse === "BCA" ? "BCA Program" : "B.Sc Food Tech"}
                  </span>
                </div>
                {openSemester === sem.number ? (
                  <ChevronDown className="w-4 h-4 text-primary" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted" />
                )}
              </button>

              <AnimatePresence>
                {openSemester === sem.number && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-[#0a0e1a]/50"
                  >
                    {sem.subjects.map((subject) => (
                      <div key={subject.id} className="border-t border-white/5">
                        <button
                          onClick={() => setOpenSubject(openSubject === subject.id ? null : subject.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 hover:bg-cyan-500/10 transition-colors text-left text-[11px] font-medium ${openSubject === subject.id ? "text-cyan-400 bg-cyan-500/5" : "text-white/70"}`}
                        >
                          <span className="truncate pr-2">{subject.name}</span>
                          {openSubject === subject.id ? (
                            <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                          )}
                        </button>

                        <AnimatePresence>
                          {openSubject === subject.id && (
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden bg-black/20"
                            >
                              {subject.modules ? (
                                <div className="space-y-0.5">
                                  {subject.modules.map((module, mIdx) => (
                                    <div key={`${subject.id}-m-${mIdx}`}>
                                      <button
                                        onClick={() => setOpenModule(openModule === `${subject.id}-${mIdx}` ? null : `${subject.id}-${mIdx}`)}
                                        className={`w-full flex items-center justify-between px-6 py-2 text-[10px] uppercase tracking-wider font-bold transition-all text-left border-l-2 ${openModule === `${subject.id}-${mIdx}` ? "text-purple-400 border-purple-500 bg-purple-500/10" : "text-muted border-transparent hover:text-white hover:bg-white/5"}`}
                                      >
                                        <span className="truncate pr-2">{module.name}</span>
                                        {openModule === `${subject.id}-${mIdx}` ? (
                                          <ChevronDown className="w-3 h-3 flex-shrink-0" />
                                        ) : (
                                          <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50" />
                                        )}
                                      </button>
                                      
                                      <AnimatePresence>
                                        {openModule === `${subject.id}-${mIdx}` && (
                                          <motion.div 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="pl-8 pr-4 py-1 space-y-0.5"
                                          >
                                            {module.topics.map((topic) => (
                                              <button
                                                key={topic}
                                                onClick={() => onTopicClick(topic, subject.name)}
                                                className="w-full flex items-start gap-2 py-1.5 text-[11px] text-muted/80 hover:text-purple-400 transition-all group text-left"
                                              >
                                                <Hash className="w-3 h-3 mt-0.5 text-purple-600/30 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                                                <span className="leading-tight">{topic}</span>
                                              </button>
                                            ))}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="px-6 pt-1 pb-2 space-y-1">
                                  {subject.topics.map((topic) => (
                                    <button
                                      key={topic}
                                      onClick={() => onTopicClick(topic, subject.name)}
                                      className="w-full flex items-start gap-2 py-1.5 text-[11px] text-muted/80 hover:text-white transition-all group text-left px-2 rounded-lg hover:bg-white/5"
                                    >
                                      <Hash className="w-3 h-3 mt-0.5 text-cyan-600/30 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                                      <span className="leading-tight">{topic}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
