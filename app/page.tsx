"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/chat/Sidebar";
import ChatArea from "@/components/chat/ChatArea";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("scooby_chat_history");
    const savedTopic = localStorage.getItem("scooby_active_topic");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedTopic) {
      setActiveTopic(savedTopic);
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("scooby_chat_history", JSON.stringify(messages));
    }
    if (activeTopic) {
      localStorage.setItem("scooby_active_topic", activeTopic);
    }
  }, [messages, activeTopic]);

  const handleTopicClick = (topic: string, subject: string) => {
    setActiveTopic(topic);
    const initialPrompt = `Explain ${topic} from my BCA syllabus`;
    
    // Clear current messages and start new one
    const newUserMessage = { role: "user", content: initialPrompt };
    setMessages([newUserMessage]);
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveTopic("");
    localStorage.removeItem("scooby_chat_history");
    localStorage.removeItem("scooby_active_topic");
  };

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTopic={activeTopic}
        onTopicClick={handleTopicClick}
        onNewChat={handleNewChat}
      />
      <ChatArea 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTopic={activeTopic}
        onTopicClick={handleTopicClick}
        messages={messages}
        setMessages={setMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
