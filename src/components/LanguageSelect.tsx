import { SUPPORTED_LANGUAGES } from '../lib/utils/languages';

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

export function LanguageSelect({ value, onChange, label, id }: Props) {
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
        <option value="">Select language...</option>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}