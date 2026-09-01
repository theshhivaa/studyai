"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, ChevronRight, Volume2, Headphones, Keyboard, Info } from "lucide-react";

interface DictationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

export default function DictationOverlay({ isOpen, onClose, text }: DictationOverlayProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(-1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean Markdown and split into lines
  useEffect(() => {
    if (text) {
      const cleanText = text
        .replace(/[*#>`[\]()]/g, "") // Basic MD removal
        .replace(/\n\n+/g, "\n")
        .trim();
      
      const splitLines = cleanText
        .split(/(?<=[.!?])\s+|\n+/)
        .filter(line => line.trim().length > 0);
      
      setLines(splitLines);
      setCurrentLineIndex(0);
      setCurrentChunkIndex(-1);
    }
  }, [text]);

  const stopAll = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsSpeaking(false);
  }, []);

  const getChunks = (line: string) => {
    const words = line.split(/\s+/);
    const chunks = [];
    for (let i = 0; i < words.length; i += 2) {
      chunks.push(words.slice(i, i + 2).join(" "));
    }
    return chunks;
  };

  const speakLine = useCallback((lineIndex: number) => {
    stopAll();
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];
    const chunks = getChunks(currentLine);
    setCurrentChunkIndex(0);
    setIsSpeaking(true);

    const speakChunk = (chunkIndex: number) => {
      if (chunkIndex >= chunks.length) {
        setIsSpeaking(false);
        setCurrentChunkIndex(-1); // Finished this line
        return;
      }

      setCurrentChunkIndex(chunkIndex);
      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      utterance.rate = 0.9; // Slightly slower for clarity
      
      utterance.onend = () => {
        // Gap of ~1.5 seconds between 2-word chunks
        timeoutRef.current = setTimeout(() => {
          speakChunk(chunkIndex + 1);
        }, 1500);
      };

      utterance.onerror = (e) => {
        console.error("SpeechSynthesis error:", e);
        setIsSpeaking(false);
      };

      synthRef.current?.speak(utterance);
    };

    speakChunk(0);
  }, [lines, stopAll]);

  const handleNext = useCallback(() => {
    if (currentLineIndex < lines.length - 1) {
      const nextIdx = currentLineIndex + 1;
      setCurrentLineIndex(nextIdx);
      speakLine(nextIdx);
    } else {
      stopAll();
      onClose();
    }
  }, [currentLineIndex, lines, speakLine, stopAll, onClose]);

  const handleRepeat = useCallback(() => {
    speakLine(currentLineIndex);
  }, [currentLineIndex, speakLine]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "n" || e.key === "ArrowRight" || e.key === "Enter") {
        handleNext();
      } else if (e.key.toLowerCase() === "r" || e.key === "ArrowLeft") {
        handleRepeat();
      } else if (e.key === "Escape") {
        stopAll();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handleRepeat, onClose, stopAll]);

  // Init synth
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    return () => stopAll();
  }, [stopAll]);

  if (!isOpen) return null;

  const currentChunks = lines[currentLineIndex] ? getChunks(lines[currentLineIndex]) : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 text-primary">
              <Headphones size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Dictation Mode</h3>
              <p className="text-xs text-text-muted">Line {currentLineIndex + 1} of {lines.length}</p>
            </div>
          </div>
          <button 
            onClick={() => { stopAll(); onClose(); }}
            className="p-2 hover:bg-white/10 rounded-full text-text-muted transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLineIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-3">
                {currentChunks.map((chunk, idx) => (
                  <motion.span
                    key={idx}
                    animate={{ 
                      scale: currentChunkIndex === idx ? 1.1 : 1,
                      color: currentChunkIndex === idx ? "#f5c518" : 
                            currentChunkIndex > idx ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.9)"
                    }}
                    className={`text-2xl md:text-3xl font-medium transition-all duration-300 ${currentChunkIndex === idx ? "drop-shadow-[0_0_10px_rgba(245,197,24,0.3)]" : ""}`}
                  >
                    {chunk}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {!isSpeaking && currentChunkIndex === -1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30"
            >
              Line finished. Ready for next?
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-white/5 border-t border-border mt-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleRepeat}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-card border border-border hover:border-primary text-white transition-all active:scale-95 group"
              >
                <RotateCcw size={20} className="group-hover:rotate-[-45deg] transition-transform" />
                <span className="font-semibold">Repeat (R)</span>
              </button>
              
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-black font-bold hover:bg-primary/90 transition-all active:scale-95 group"
              >
                <span className="font-bold">Next (N)</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-text-muted">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-border">
                <Keyboard size={14} />
                <span className="text-[10px] font-mono">N: Next</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-border">
                <Keyboard size={14} />
                <span className="text-[10px] font-mono">R: Repeat</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-border">
                <Keyboard size={14} />
                <span className="text-[10px] font-mono">Esc: Exit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hint */}
        {currentLineIndex === 0 && currentChunkIndex === 0 && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary/60 text-xs animate-bounce">
            <Info size={14} />
            <span>Scooby will pause every 2 words so you can write!</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
