import axios from 'axios';
import type { CharacterCount, Show, Movie, SubtitleFile, VideoFile } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const getShows = async (): Promise<Show[]> => {
  const { data } = await api.get<string[]>('/list_shows');
  return data.map(name => ({ name, seasons: [] }));
};

export const getSeasons = async (show: string): Promise<string[]> => {
  const { data } = await api.get<string[]>(`/list_seasons?show=${encodeURIComponent(show)}`);
  return data;
};

export const getMovies = async (): Promise<Movie[]> => {
  const { data } = await api.get<string[]>('/list_movies');
  return data.map(name => ({ name }));
};

export const getSubtitles = async (show: string, season: string | null, type: 'series' | 'movies'): Promise<SubtitleFile[]> => {
  const params = new URLSearchParams({ show, type });
  if (season) params.append('season', season);
  
  const { data } = await api.get<string[]>(`/list_subtitles?${params}`);
  return data.map(name => ({ name, path: name }));
};

export const getVideos = async (show: string, season: string | null, type: 'series' | 'movies'): Promise<VideoFile[]> => {
  const params = new URLSearchParams({ show, type });
  if (season) params.append('season', season);
  
  const { data } = await api.get<string[]>(`/list_video_files?${params}`);
  return data.map(name => ({ name, path: name }));
};

export const getCharacterCount = async (): Promise<CharacterCount> => {
  const { data } = await api.get<CharacterCount>('/get_character_count');
  return data;
};

export const detectLanguage = async (show: string, season: string | null, file: string, type: 'series' | 'movies'): Promise<string> => {
  const params = new URLSearchParams({ show, file, type });
  if (season) params.append('season', season);
  
  const { data } = await api.get<{ language: string }>(`/detect-language?${params}`);
  return data.language;
};

export const extractSubtitles = async (params: {
  serie: string;
  season?: string | null;
  video_file: string;
  source_lang: string;
  type: 'series' | 'movies';
}): Promise<{ path: string }> => {
  const { data } = await api.post('/extract_subtitles', params);
  return data;
};

export const translateSubtitle = async (params: {
  serie: string;
  season?: string | null;
  srt_path: string;
  source_lang: string;
  target_lang: string;
  type: 'series' | 'movies';
}): Promise<{ path: string }> => {
  const { data } = await api.post('/translate_subtitle', params);
  return data;
};

export async function isPlexConfigured(): Promise<boolean> {
  const response = await fetch('/api/plex/status');
  const data = await response.json();
  return data.configured;
}

export async function updatePlexLibrary(): Promise<void> {
  const response = await fetch('/api/plex/update-library', {
    method: 'POST',
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to update Plex library');
  }
}