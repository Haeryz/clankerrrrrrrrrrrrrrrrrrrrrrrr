import { Plus, Mic, Send } from 'lucide-react';

export default function ChatInput() {
  return (
    <div className="w-full max-w-3xl p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Tanyakan apa saja tentang hukum pidana perdagangan orang..."
          className="w-full pl-12 pr-20 py-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Plus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Mic className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}