"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface GuestContextType {
  guestMessageCount: number;
  incrementGuestMessageCount: () => void;
  showLoginPopup: boolean;
  setShowLoginPopup: (show: boolean) => void;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export const GuestProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [guestMessageCount, setGuestMessageCount] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // Trigger popup on first load if not authenticated
  useEffect(() => {
    if (!session && guestMessageCount === 0) {
      setShowLoginPopup(true);
    }
  }, [session]);

  const incrementGuestMessageCount = () => {
    if (!session) {
      const newCount = guestMessageCount + 1;
      setGuestMessageCount(newCount);
      
      // Re-trigger popup every 10 messages
      if (newCount > 0 && newCount % 10 === 0) {
        setShowLoginPopup(true);
      }
    }
  };

  return (
    <GuestContext.Provider
      value={{
        guestMessageCount,
        incrementGuestMessageCount,
        showLoginPopup,
        setShowLoginPopup,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};

export const useGuest = () => {
  const context = useContext(GuestContext);
  if (context === undefined) {
    throw new Error("useGuest must be used within a GuestProvider");
  }
  return context;
};
