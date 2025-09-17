'use client'


import React, { createContext, useContext, useState } from "react";

type AIChatContextType = {
  visible: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
};

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) throw new Error("useAIChat must be used within AIChatProvider");
  return context;
};

export const AIChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(true);

  const openChat = () => setVisible(true);
  const closeChat = () => setVisible(false);
  const toggleChat = () => setVisible((v) => !v);

  return (
    <AIChatContext.Provider value={{ visible, openChat, closeChat, toggleChat }}>
      {children}
    </AIChatContext.Provider>
  );
};
