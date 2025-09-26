import { FileText } from 'lucide-react';

export default function PdfVisual() {
  return (
    <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-w-xs">
      <FileText className="h-6 w-6 text-red-500" />
      <span className="font-medium text-sm text-gray-800 dark:text-gray-200">putusan XXX</span>
    </div>
  );
}