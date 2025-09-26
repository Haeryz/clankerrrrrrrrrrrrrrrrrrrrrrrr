import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  pdf?: File;
}

interface ChatStore {
  messages: Record<string, Message[]>;
  addMessage: (model: string, message: Message) => void;
  getMessages: (model: string) => Message[];
  clearMessages: (model: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: {},

  addMessage: (model: string, message: Message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [model]: [...(state.messages[model] || []), message],
      },
    }));
  },

  getMessages: (model: string) => {
    return get().messages[model] || [];
  },

  clearMessages: (model: string) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [model]: [],
      },
    }));
  },
}));