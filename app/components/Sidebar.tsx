import { MessageSquare, Search, Settings, Bot, LifeBuoy, UserCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center justify-between h-screen w-16 bg-gray-100 dark:bg-gray-900 p-2">
      <div className="flex flex-col items-center space-y-4">
        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          <Search className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          <Bot className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          <LifeBuoy className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          <UserCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}