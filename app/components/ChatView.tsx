import PdfVisual from './PdfVisual';
import ThinkingProcess from './ThinkingProcess';
import { Bot, User } from 'lucide-react';

export default function ChatView({ selectedModel }: { selectedModel: string }) {
  const isQwenModel = selectedModel === "Qwen/Qwen3-4B-Thinking-2507";

  return (
    <div className="flex-1 w-full max-w-3xl p-4 space-y-8">
      {/* User's message */}
      <div className="flex flex-col items-start space-y-4">
        <div className="flex items-center space-x-3">
          <User className="h-6 w-6" />
          <span className="font-semibold">You</span>
        </div>
        <div className="ml-9">
          <PdfVisual />
          <div className="mt-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            <p>Ekstrak penahanan</p>
          </div>
        </div>
      </div>

      {/* AI's message */}
      <div className="flex flex-col items-start space-y-4">
        <div className="flex items-center space-x-3">
          <Bot className="h-6 w-6" />
          <span className="font-semibold">PlaceholderAI</span>
        </div>
        <div className="ml-9 w-full">
          {isQwenModel && <ThinkingProcess />}
          <div className="mt-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            <p>Use lorem ipsum</p>
          </div>
        </div>
      </div>
    </div>
  );
}