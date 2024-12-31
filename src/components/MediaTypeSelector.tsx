import { Film, Tv } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  type: 'series' | 'movies';
  onTypeChange: (type: 'series' | 'movies') => void;
}

export function MediaTypeSelector({ type, onTypeChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <button
        onClick={() => onTypeChange('series')}
        className={cn(
          "group relative overflow-hidden rounded-xl transition-all",
          type === 'series'
            ? "ring-2 ring-blue-500 ring-offset-2"
            : "hover:bg-gray-50"
        )}
      >
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-10",
          type === 'series' 
            ? "from-blue-500 to-indigo-600" 
            : "from-gray-500 to-gray-600 group-hover:opacity-5"
        )} />
        <div className="relative p-6">
          <div className={cn(
            "mb-3 inline-flex rounded-lg p-3",
            type === 'series'
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
          )}>
            <Tv className="h-6 w-6" />
          </div>
          <div className={cn(
            "text-lg font-semibold",
            type === 'series'
              ? "text-blue-700"
              : "text-gray-700"
          )}>
            TV Series
          </div>
          <p className={cn(
            "mt-1 text-sm",
            type === 'series'
              ? "text-blue-600"
              : "text-gray-500"
          )}>
            Shows with multiple episodes and seasons
          </p>
        </div>
      </button>

      <button
        onClick={() => onTypeChange('movies')}
        className={cn(
          "group relative overflow-hidden rounded-xl transition-all",
          type === 'movies'
            ? "ring-2 ring-blue-500 ring-offset-2"
            : "hover:bg-gray-50"
        )}
      >
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-10",
          type === 'movies'
            ? "from-blue-500 to-indigo-600"
            : "from-gray-500 to-gray-600 group-hover:opacity-5"
        )} />
        <div className="relative p-6">
          <div className={cn(
            "mb-3 inline-flex rounded-lg p-3",
            type === 'movies'
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
          )}>
            <Film className="h-6 w-6" />
          </div>
          <div className={cn(
            "text-lg font-semibold",
            type === 'movies'
              ? "text-blue-700"
              : "text-gray-700"
          )}>
            Movies
          </div>
          <p className={cn(
            "mt-1 text-sm",
            type === 'movies'
              ? "text-blue-600"
              : "text-gray-500"
          )}>
            Single feature films and documentaries
          </p>
        </div>
      </button>
    </div>
  );
}