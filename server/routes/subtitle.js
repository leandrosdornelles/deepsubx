import { Router } from 'express';
import { join } from 'path';
import { translateDocument } from '../services/deepl.js';
import { extractSubtitles } from '../services/ffmpeg.js';
import { DATA_DIR, MOVIES_DIR } from '../utils/paths.js';

const router = Router();

router.post('/translate_subtitle', async (req, res) => {
  try {
    const { serie, season, srt_path, source_lang, target_lang, type } = req.body;
    
    if (type === 'series' && (!serie || !season || !srt_path || !source_lang || !target_lang)) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    else if (type === 'movies' && (!serie || !srt_path || !source_lang || !target_lang)) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    if (!process.env.DEEPL_API_KEY) {
      return res.status(400).json({ message: 'DeepL API key not configured' });     
    }
    if (type === 'series') {
      const subtitlePath = join(DATA_DIR, serie, season, srt_path);
      const translatedPath = await translateDocument(
        subtitlePath,
        source_lang,
        target_lang
      );

      res.json({ path: translatedPath });
    }
    else
    {
      const subtitlePath = join(MOVIES_DIR, serie, srt_path);
      const translatedPath = await translateDocument(
        subtitlePath,
        source_lang,
        target_lang
      );

      res.json({ path: translatedPath });
    }
  } catch (error) {
    res.status(500).json({ 
      message: error.message,        
      originalError: error.toString(),
      stack: error.stack
    });
  }
});

router.post('/extract_subtitles', async (req, res) => {
  try {
    const { serie, season, video_file, source_lang, type } = req.body;
    
    if (type === 'series' && (!serie || !season || !video_file)) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    else if (type === 'movies' && (!serie || !video_file)) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    if (type === 'series') {
      const videoPath = join(DATA_DIR, serie, season, video_file);
      const videoFileName = video_file.substring(0, video_file.lastIndexOf('.'));
      const outputPath = join(DATA_DIR, serie, season, `${videoFileName}.${source_lang.toLowerCase()}.srt`);

      await extractSubtitles(videoPath, outputPath);
      res.json({ path: outputPath });
    }
    else
    {
      const videoPath = join(MOVIES_DIR, serie, video_file);
      const videoFileName = video_file.substring(0, video_file.lastIndexOf('.'));
      const outputPath = join(MOVIES_DIR, serie, `${videoFileName}.${source_lang.toLowerCase()}.srt`);

      await extractSubtitles(videoPath, outputPath);
      res.json({ path: outputPath });
    }
  } catch (error) {
    res.status(500).json({ 
      message: error.message,        
      originalError: error.toString(),
      stack: error.stack
    });
  }
});

export default router;