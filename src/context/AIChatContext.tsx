'use client'

import { createContext, useContext, useState, useEffect } from "react";

export type AIMessage = {
  role: "user" | "assistant";
  text: string;
};

type AIChatContextType = {
  visible: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  messages: AIMessage[];
  setMessages: React.Dispatch<React.SetStateAction<AIMessage[]>>;
  clearConversation: () => void;
};

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) throw new Error("useAIChat must be used within AIChatProvider");
  return context;
};


const STORAGE_KEY = 'rumpke-ai-chat-messages';

const saveMessagesToStorage = (messages: AIMessage[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.warn('Failed to save messages to localStorage:', error);
  }
};

const loadMessagesFromStorage = (): AIMessage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load messages from localStorage:', error);
    return [];
  }
};

export const AIChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);


  useEffect(() => {
    const savedMessages = loadMessagesFromStorage();
    setMessages(savedMessages);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveMessagesToStorage(messages);
    }
  }, [messages, isInitialized]);

  const openChat = () => setVisible(true);
  const closeChat = () => setVisible(false);
  const toggleChat = () => setVisible((v) => !v);

  const clearConversation = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear messages from localStorage:', error);
    }
  };

  return (
    <AIChatContext.Provider value={{
      visible,
      openChat,
      closeChat,
      toggleChat,
      messages,
      setMessages,
      clearConversation
    }}>
      {children}
    </AIChatContext.Provider>
  );
};
