'use client';

import { ChevronDown, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Header({ selectedModel, setSelectedModel }: { selectedModel: string, setSelectedModel: (model: string) => void }) {
  const models = ["Llama 3.2", "Gemma 3", "Qwen/Qwen3-4B-Thinking-2507"];

  return (
    <div className="flex items-center justify-between w-full p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">PlaceholderAI</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span>{selectedModel}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {models.map((model) => (
              <DropdownMenuItem key={model} onSelect={() => setSelectedModel(model)}>
                {model}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <UserCircle className="h-8 w-8 text-gray-600 dark:text-gray-400" />
    </div>
  );
}