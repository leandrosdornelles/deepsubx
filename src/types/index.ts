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

/**
 * Standardized API error response interface
 */
export interface ApiErrorResponse {
  message: string; // User-friendly error message
  status: number; // HTTP status code
  originalError: string; // Original error message or toString
  apiDetails?: any; // Additional API details if available
  deeplRequest?: any; // DeepL specific request details
  isLargeFile?: boolean; // Flag for large file errors
  axiosError?: any; // Original axios error object
}