import { RotateCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../lib/api';

export function ApiUsage() {
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ['character-count'],
    queryFn: api.getCharacterCount,
    refetchInterval: false, // Disable auto-refetch
    staleTime: 0, // Prevent automatic background updates
  });

  if (!data) return null;

  return (
    <div className="flex items-center gap-3 rounded-lg bg-slate-800 px-4 py-2">
      <div>
        <div className="text-sm font-medium text-slate-400">API Usage</div>
        <div className="text-lg font-semibold text-white">
          {data.character_count}/{data.character_limit}
        </div>
      </div>
      <button
        onClick={() => refetch()}
        disabled={isRefetching}
        className="rounded-full p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50"
        title="Refresh usage"
      >
        <RotateCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
}