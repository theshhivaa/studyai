"use client";

import { SessionProvider } from "next-auth/react";
import { GuestProvider } from "./context/GuestContext";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <GuestProvider>
        {children}
      </GuestProvider>
    </SessionProvider>
  );
};
