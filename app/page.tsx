"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/chat/Sidebar";
import ChatArea from "@/components/chat/ChatArea";
import { bcaSyllabus, foodTechSyllabus } from "@/lib/data/syllabus";

type Course = "BCA" | "FoodTech";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course>("BCA");
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

  const handleSendMessage = async (text: string, currentMessages: any[] = messages, fileData?: { mimeType: string, data: string }) => {
    if ((!text.trim() && !fileData) || isLoading) return;

    const userMessageContent = fileData && fileData.mimeType.startsWith("image/")
      ? text // Keep text as text, but we'll use fileData for the API call
      : text;

    const userMessage = { role: "user", content: userMessageContent };
    const history = currentMessages.map(m => ({
      role: m.role,
      parts: m.content
    }));

    setMessages([...currentMessages, userMessage]);
    setIsLoading(true);

    // Add empty assistant message for streaming
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const { getScoobyResponse } = await import("@/lib/ai");
      const fullResponse = await getScoobyResponse(
        text,
        history,
        fileData,
        (chunk) => {
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.role === "assistant") {
              const updatedMessages = [...prev];
              updatedMessages[updatedMessages.length - 1] = {
                ...lastMessage,
                content: lastMessage.content + chunk
              };
              return updatedMessages;
            }
            return prev;
          });
        }
      );

      // If streaming didn't happen or was incomplete, and we have a fullResponse (like an error message)
      if (fullResponse) {
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.role === "assistant" && !lastMessage.content) {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              ...lastMessage,
              content: fullResponse
            };
            return updatedMessages;
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicClick = (topicName: string, subjectName: string) => {
    setActiveTopic(topicName);
    
    // Find context from syllabus
    let context = "";
    let subtopics = "";
    const currentSyllabus = activeCourse === "BCA" ? bcaSyllabus : foodTechSyllabus;
    const courseName = activeCourse === "BCA" ? "BCA" : "Food Technology";

    for (const sem of currentSyllabus) {
      const subject = sem.subjects.find(s => s.name === subjectName);
      if (subject) {
        const module = subject.modules?.find(m => m.topics.includes(topicName) || m.name === topicName);
        if (module) {
          context = `[Context: Semester ${sem.number}, Subject: ${subject.name}, Module: ${module.name}]`;
          if (module.name === topicName) {
            subtopics = ` This module includes the following topics: ${module.topics.join(", ")}. Please provide a comprehensive overview.`;
          }
        } else {
          context = `[Context: Semester ${sem.number}, Subject: ${subject.name}]`;
        }
        break;
      }
    }

    const initialPrompt = `${context ? context + " " : ""}Explain ${topicName} from my ${courseName} syllabus.${subtopics} Style: Standard.`;
    
    // Trigger the AI response with empty history
    handleSendMessage(initialPrompt, []);
    
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
        activeCourse={activeCourse}
        setActiveCourse={setActiveCourse}
      />
      <ChatArea 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTopic={activeTopic}
        onTopicClick={handleTopicClick}
        handleSendMessage={handleSendMessage}
        messages={messages}
        setMessages={setMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
