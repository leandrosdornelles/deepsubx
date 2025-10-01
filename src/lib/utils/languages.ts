import { type Language } from '../../types';

export const ISO_639_2_TO_1: Record<string, string> = {
  eng: 'EN',
  spa: 'ES',
  fra: 'FR',
  deu: 'DE',
  ita: 'IT',
  pob: 'PT-BR',
  por: 'PT',
  rus: 'RU',
  jpn: 'JA',
  kor: 'KO',
  zho: 'ZH',
  ara: 'AR',
  bul: 'BG',
};

export function normalizeLanguageCode(code: string): string {
  return ISO_639_2_TO_1[code.toLowerCase()] || code.toUpperCase();
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Spanish' },
  { code: 'FR', name: 'French' },
  { code: 'DE', name: 'German' },
  { code: 'IT', name: 'Italian' },
  { code: 'PT', name: 'Portuguese' },
  { code: 'PT-BR', name: 'Portugues do Brasil' },
  { code: 'RU', name: 'Russian' },
  { code: 'JA', name: 'Japanese' },
  { code: 'KO', name: 'Korean' },
  { code: 'ZH', name: 'Chinese' },
];
