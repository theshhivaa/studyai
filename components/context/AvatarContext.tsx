"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type AvatarState = "idle" | "thinking" | "happy" | "listening" | "sad" | "auto";

interface AvatarContextType {
  avatarState: AvatarState;
  setAvatarState: (state: AvatarState) => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");

  return (
    <AvatarContext.Provider value={{ avatarState, setAvatarState }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  const context = useContext(AvatarContext);
  if (context === undefined) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
}
