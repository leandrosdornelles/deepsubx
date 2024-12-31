import { ApiUsage } from './ApiUsage';

export function Header() {
  return (
    <div className="mb-12 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">DeepSubX</h1>
        <p className="mt-2 text-slate-400">Translate subtitles with ease</p>
      </div>
      <ApiUsage />
    </div>
  );
}