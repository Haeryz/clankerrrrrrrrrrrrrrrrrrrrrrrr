'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatView from './components/ChatView';
import ChatInput from './components/ChatInput';

export default function Page() {
  const [selectedModel, setSelectedModel] = useState("Llama 3.2");

  return (
    <div className="flex h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
        <main className="flex-1 flex flex-col items-center justify-between overflow-y-auto p-4">
          <ChatView selectedModel={selectedModel} />
          <ChatInput />
        </main>
      </div>
    </div>
  );
}