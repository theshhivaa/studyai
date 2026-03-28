"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { bcaSyllabus } from "@/lib/data/syllabus";
import { Search, Download, ExternalLink, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

export default function SyllabusPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSyllabus = bcaSyllabus.map(sem => ({
    ...sem,
    subjects: sem.subjects.filter(sub => 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(sem => sem.subjects.length > 0);

  const handleDownloadPDF = () => {
    alert("Downloading PDF... (In a real app, this would generate a PDF from the table)");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0e1a]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold font-orbitron mb-2">BCA Syllabus</h1>
              <p className="text-muted">Complete semester-wise course structure for Bachelor of Computer Applications.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:w-80 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search subjects or topics..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-[#0a0e1a] font-bold text-sm hover:bg-primary/90 transition-all active:scale-95"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
            </div>
          </div>

          {/* Table / Grid */}
          <div className="space-y-12">
            {filteredSyllabus.map((sem) => (
              <div key={sem.number} className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold">
                    {sem.number}
                  </div>
                  <h2 className="text-2xl font-bold font-orbitron">Semester {sem.number}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sem.subjects.map((subject) => (
                    <div 
                      key={subject.id} 
                      className="group bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all hover:shadow-glow/20"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 rounded-lg bg-white/5 text-primary group-hover:bg-primary group-hover:text-[#0a0e1a] transition-all">
                          <FileText size={20} />
                        </div>
                        <Link 
                          href="/chat" 
                          className="p-1 px-2 rounded-md bg-white/5 text-[10px] text-muted hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest font-bold"
                        >
                          Ask Scooby <ChevronRight size={10} />
                        </Link>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {subject.name}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.slice(0, 4).map((topic) => (
                          <span key={topic} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-muted border border-white/5 group-hover:border-white/10 transition-colors">
                            {topic}
                          </span>
                        ))}
                        {subject.topics.length > 4 && (
                          <span className="px-2 py-1 text-[10px] text-muted italic">
                            +{subject.topics.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-muted uppercase tracking-tighter">Course Code: BCA-{sem.number}{Math.floor(Math.random()*100)}</span>
                        <Link 
                          href="#"
                          className="text-primary opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 text-[11px] font-bold"
                        >
                          Details <ExternalLink size={12} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {filteredSyllabus.length === 0 && (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <Search className="w-12 h-12 text-muted mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-bold font-orbitron text-muted">No subjects found</h3>
                <p className="text-muted/60 mt-2">Try searching with a different term or semester.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
