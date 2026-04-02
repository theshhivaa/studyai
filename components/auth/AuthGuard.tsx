"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import React from "react";
import LoginPopup from "./LoginPopup";
import NamePromptModal from "./NamePromptModal";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  // @ts-ignore
  const isNameNeeded = session && !session.user.hasSetName;

  // Soft Guard: Always render the application children (Guest Mode)
  // But inject the LoginPopup and NamePromptModal based on the user's state
  return (
    <>
      <div className="relative min-h-screen overflow-x-hidden">
        {children}
        {status !== "loading" && !session && <LoginPopup />}
        {status !== "loading" && isNameNeeded && (
          <NamePromptModal 
            isOpen={true} 
            onClose={() => {}} // Controlled closure via hasSetName update
          />
        )}
      </div>
    </>
  );
};
