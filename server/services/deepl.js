import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';
import { finished } from 'stream/promises';
import { join, parse } from 'path';

const DEEPL_API_URL = 'https://api-free.deepl.com/v2';
const POLLING_INTERVAL = 5000; // 5 seconds

async function uploadDocument(filePath, sourceLang, targetLang) {
  const formData = new FormData();
 
  const filePathNorm = path.normalize(filePath);
  formData.append('file', fs.createReadStream(filePathNorm));
  formData.append('source_lang', sourceLang);
  formData.append('target_lang', targetLang);

  const response = await axios.post(
    `${DEEPL_API_URL}/document`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
    }
  );

  return response.data;
}

async function checkStatus(documentId, documentKey) {
  const response = await axios.post(
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

async function downloadDocument(documentId, documentKey, outputPath) {
  const response = await axios.post(
    `${DEEPL_API_URL}/document/${documentId}/result`,
    {
      document_key: documentKey,
    },
    {
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
      responseType: 'stream',
    }
  );

  // Create a write stream
  const writer = fs.createWriteStream(outputPath);
  
  // Pipe the response data to the file
  response.data.pipe(writer);
  
  // Wait for the stream to finish
  await finished(writer);
  return outputPath;
}
function getTranslatedFilePath(originalPath, sourceLang, targetLang) {
  const { dir, name, ext } = parse(originalPath);
  
  // Remove source language code if present (e.g., "myfile.en.srt" -> "myfile")
  const baseName = name.replace(new RegExp(`\\.${sourceLang.toLowerCase()}$`), '');
  
  // Create new filename with target language (e.g., "myfile.es.srt")
  const newName = `${baseName}.${targetLang.toLowerCase()}${ext}`;
  
  return join(dir, newName);
}
export async function translateDocument(filePath, sourceLang, targetLang) {
  try {
    // 1. Upload document
    const { document_id, document_key } = await uploadDocument(
      filePath,
      sourceLang,
      targetLang
    );

    // 2. Poll for status
    while (true) {
      const status = await checkStatus(document_id, document_key);

      if (status.status === 'done') {
        break;
      }

      if (status.status === 'error') {
        throw new Error(status.error_message || 'Translation failed');
      }

      // Wait before checking again
      await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
    }

    // 3. Download translated document with correct naming
    const outputPath = getTranslatedFilePath(filePath, sourceLang, targetLang);
    await downloadDocument(document_id, document_key, outputPath);
    
    return outputPath;
  } catch (error) {    
      if (error.response) {
          // Access the original error message from the response data
          const originalMessage = error.response.data.message;
          throw new Error(originalMessage);
      } else if (error instanceof Error) {
          throw error;
      } else {
        throw new Error('An unknown error occurred');
      }
  }
}
export async function getUsageStats() {
  try {
    const response = await axios.get(`${DEEPL_API_URL}/usage`, {
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
    });

    return {
      character_count: response.data.character_count || 0,
      character_limit: response.data.character_limit || 500000,
    };
  } catch (error) {
    console.error('Error fetching DeepL usage stats:', error);
    return {
      character_count: 0,
      character_limit: 500000,
    };
  }
}