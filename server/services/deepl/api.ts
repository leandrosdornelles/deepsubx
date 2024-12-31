import axios from 'axios';
import type { DeepLUploadResponse, DeepLStatusResponse } from './types';

const DEEPL_API_URL = 'https://api-free.deepl.com/v2';

export async function uploadDocument(
  file: File,
  sourceLang: string,
  targetLang: string
): Promise<DeepLUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('source_lang', sourceLang);
  formData.append('target_lang', targetLang);

  const response = await axios.post<DeepLUploadResponse>(
    `${DEEPL_API_URL}/document`,
    formData,
    {
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
    }
  );

  return response.data;
}

export async function checkStatus(
  documentId: string,
  documentKey: string
): Promise<DeepLStatusResponse> {
  const response = await axios.post<DeepLStatusResponse>(
    `${DEEPL_API_URL}/document/${documentId}`,
    {
      document_key: documentKey,
    },
    {
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
    }
  );

  return response.data;
}

export async function downloadDocument(
  documentId: string,
  documentKey: string
): Promise<Blob> {
  const response = await axios.post(
    `${DEEPL_API_URL}/document/${documentId}/result`,
    {
      document_key: documentKey,
    },
    {
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
      responseType: 'blob',
    }
  );

  return response.data;
}