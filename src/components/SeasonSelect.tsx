import { useQuery } from '@tanstack/react-query';
import * as api from '../lib/api';

interface Props {
  show: string;
  value: string;
  onChange: (value: string) => void;
}

export function SeasonSelect({ show, value, onChange }: Props) {
  const { data: seasons } = useQuery({
    queryKey: ['seasons', show],
    queryFn: () => api.getSeasons(show),
    enabled: !!show,
  });

  if (!show) return null;

  return (
    <div className="space-y-2">
      <label htmlFor="season" className="block text-sm font-medium text-gray-700">
        Season
      </label>
      <select
        id="season"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select season...</option>
        {seasons?.map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </select>
    </div>
  );
}