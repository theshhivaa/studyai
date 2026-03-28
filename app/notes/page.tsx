"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Book, Download, MessageSquare, Clock, Star, Filter } from "lucide-react";
import Link from "next/link";

const sampleNotes = [
  { id: 1, title: "C Programming Basics", subject: "C Programming", semester: 1, type: "Full Notes", rating: 4.8, reads: "1.2k" },
  { id: 2, title: "Data Structures - Stacks & Queues", subject: "Data Structures", semester: 2, type: "Cheat Sheet", rating: 4.9, reads: "2.4k" },
  { id: 3, title: "DBMS SQL Commands Guide", subject: "Database Management Systems", semester: 3, type: "Reference", rating: 4.7, reads: "3.1k" },
  { id: 4, title: "Java OOP Principles", subject: "Java Programming", semester: 3, type: "Full Notes", rating: 4.9, reads: "1.8k" },
  { id: 5, title: "Operating System Process Scheduling", subject: "Operating Systems", semester: 4, type: "Diagrams", rating: 4.6, reads: "950" },
  { id: 6, title: "HTML5 & CSS3 Responsive Design", subject: "Web Technologies", semester: 4, type: "Tutorial", rating: 4.8, reads: "2.2k" },
];

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSem, setSelectedSem] = useState<number | "all">("all");

  const filteredNotes = sampleNotes.filter(note => 
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     note.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSem === "all" || note.semester === selectedSem)
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0e1a]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">Notes Library</h1>
            <p className="text-muted max-w-2xl mx-auto">
              Access high-quality, AI-curated notes and study materials for every BCA subject.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search notes, subjects, or topics..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <span className="text-xs font-bold font-orbitron text-muted mr-2 uppercase tracking-widest flex items-center gap-1">
                <Filter size={14} /> Filter:
              </span>
              {["all", 1, 2, 3, 4, 5, 6].map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSem(sem as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                    selectedSem === sem 
                      ? "bg-primary text-[#0a0e1a] border-primary shadow-glow" 
                      : "bg-white/5 text-muted border-white/10 hover:bg-white/10"
                  }`}
                >
                  {sem === "all" ? "All Semesters" : `Sem ${sem}`}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div key={note.id} className="group bg-card border border-white/5 rounded-3xl p-6 hover:border-secondary/30 transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <Book size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                      <Star size={12} fill="currentColor" /> {note.rating}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/10"></div>
                    <div className="text-[10px] text-muted uppercase font-bold tracking-widest">
                      {note.type}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
                  {note.title}
                </h3>
                <p className="text-xs text-muted mb-4 font-medium uppercase tracking-wider">{note.subject}</p>
                
                <div className="flex items-center gap-4 text-[10px] text-muted mb-6">
                  <span className="flex items-center gap-1"><Clock size={12} /> {note.reads} Reads</span>
                  <span className="flex items-center gap-1"><Book size={12} /> Sem {note.semester}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                  <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-xs font-bold hover:bg-white/10 transition-all">
                    <Download size={14} /> PDF
                  </button>
                  <Link 
                    href="/chat" 
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary hover:text-white transition-all shadow-glow-purple"
                  >
                    <MessageSquare size={14} /> Ask
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted italic">"No notes found for your search. Ask Scooby to generate them for you!" 🐾</p>
              <Link href="/chat" className="inline-block mt-6 text-primary font-bold hover:underline">
                Go to Chat →
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
