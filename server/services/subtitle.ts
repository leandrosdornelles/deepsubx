import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { extractSubtitles } from './ffmpeg';
import { translateText } from './deepl';
import { parseSRT, stringifySRT } from '../utils/srt';

interface TranslateSubtitleParams {
  srtPath: string;
  sourceLang: string;
  targetLang: string;
  outputPath: string;
}

export async function translateSubtitle({
  srtPath,
  sourceLang,
  targetLang,
  outputPath,
}: TranslateSubtitleParams): Promise<void> {
  // Read and parse SRT file
  const srtContent = await readFile(srtPath, 'utf-8');
  const subtitles = parseSRT(srtContent);

  // Translate each subtitle entry
  const translatedSubtitles = await Promise.all(
    subtitles.map(async (sub) => ({
      ...sub,
      text: await translateText({
        text: sub.text,
        sourceLang,
        targetLang,
      }),
    }))
  );

  // Write translated subtitles back to file
  const translatedContent = stringifySRT(translatedSubtitles);
  await writeFile(outputPath, translatedContent);
}

interface ExtractAndTranslateParams {
  videoPath: string;
  sourceLang: string;
  targetLang: string;
  outputPath: string;
}

export async function extractAndTranslateSubtitles({
  videoPath,
  sourceLang,
  targetLang,
  outputPath,
}: ExtractAndTranslateParams): Promise<void> {
  const tempSrtPath = join(process.env.TEMP_DIR || '/tmp', `${Date.now()}.srt`);

  // Extract subtitles from video
  await extractSubtitles(videoPath, tempSrtPath);

  // Translate the extracted subtitles
  await translateSubtitle({
    srtPath: tempSrtPath,
    sourceLang,
    targetLang,
    outputPath,
  });
}