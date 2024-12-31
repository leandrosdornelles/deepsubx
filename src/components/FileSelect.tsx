interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
  options: Array<{ name: string; path: string }>;
}

export function FileSelect({ value, onChange, label, id, options }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select file...</option>
        {options.map((option) => (
          <option key={option.path} value={option.path}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}