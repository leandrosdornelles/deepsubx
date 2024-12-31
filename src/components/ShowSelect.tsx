import { useQuery } from '@tanstack/react-query';
import * as api from '../lib/api';

interface Props {
  type: 'series' | 'movies';
  value: string;
  onChange: (value: string) => void;
}

export function ShowSelect({ type, value, onChange }: Props) {
  const { data: items } = useQuery({
    queryKey: [type === 'series' ? 'shows' : 'movies'],
    queryFn: type === 'series' ? api.getShows : api.getMovies,
  });

  const label = type === 'series' ? 'Show' : 'Movie';

  return (
    <div className="space-y-2">
      <label htmlFor="show" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id="show"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select {label.toLowerCase()}...</option>
        {items?.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}