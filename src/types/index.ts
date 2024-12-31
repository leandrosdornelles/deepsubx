export interface Show {
  name: string;
  seasons: string[];
}

export interface Movie {
  name: string;
}

export interface SubtitleFile {
  name: string;
  path: string;
  language?: string;
}

export interface VideoFile {
  name: string;
  path: string;
}

export interface CharacterCount {
  character_count: number;
  character_limit: number;
}

export interface Language {
  code: string;
  name: string;
}