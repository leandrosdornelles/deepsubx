import { ShowSelect } from './ShowSelect';
import { SeasonSelect } from './SeasonSelect';

interface Props {
  type: 'series' | 'movies';
  show: string;
  season: string;
  onShowChange: (show: string) => void;
  onSeasonChange: (season: string) => void;
}

export function ShowSelector({ type, show, season, onShowChange, onSeasonChange }: Props) {
  return (
    <div className={`grid gap-4 ${type === 'series' ? 'md:grid-cols-2' : ''}`}>
      <ShowSelect type={type} value={show} onChange={onShowChange} />
      {type === 'series' && (
        <SeasonSelect show={show} value={season} onChange={onSeasonChange} />
      )}
    </div>
  );
}