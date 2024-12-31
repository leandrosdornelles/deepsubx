import { Film, Subtitles } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  mode: 'subtitle' | 'extract';
  onModeChange: (mode: 'subtitle' | 'extract') => void;
}

export function ModeSelector({ mode, onModeChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => onModeChange('subtitle')}
        className={cn(
          "flex items-center justify-center gap-3 rounded-lg border-2 p-4 transition-all",
          mode === 'subtitle'
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
        )}
      >
        <Subtitles className="h-5 w-5" />
        <span className="font-medium">Translate Subtitle</span>
      </button>
      <button
        onClick={() => onModeChange('extract')}
        className={cn(
          "flex items-center justify-center gap-3 rounded-lg border-2 p-4 transition-all",
          mode === 'extract'
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
        )}
      >
        <Film className="h-5 w-5" />
        <span className="font-medium">Extract & Translate</span>
      </button>
    </div>
  );
}