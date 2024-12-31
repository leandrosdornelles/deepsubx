import { Router } from 'express';
import { join } from 'path';
import { detectSubtitleLanguage } from '../services/language.js';
import { DATA_DIR, MOVIES_DIR } from '../utils/paths.js';

const router = Router();

router.get('/detect-language', async (req, res) => {
  try {
    const { show, season, file, type } = req.query;
    if (type === 'series' && (!show || !season || !file)) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    else if (type === 'movies' && (!show || !file)) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    if (type === 'series') {
      const filePath = join(DATA_DIR, show, season, file);
      const language = await detectSubtitleLanguage(filePath);
      return res.json({ language });
    }
    const filePath = join(MOVIES_DIR, show, file);
    const language = await detectSubtitleLanguage(filePath);
    
    res.json({ language });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;