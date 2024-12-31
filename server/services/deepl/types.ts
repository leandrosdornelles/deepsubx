export interface DeepLUploadResponse {
    document_id: string;
    document_key: string;
  }
  
  export interface DeepLStatusResponse {
    status: 'queued' | 'translating' | 'done' | 'error';
    seconds_remaining?: number;
    error_message?: string;
  }
  
  export interface TranslationParams {
    filePath: string;
    sourceLang: string;
    targetLang: string;
  }