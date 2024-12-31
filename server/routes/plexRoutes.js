import { Router } from 'express';
import { updateLibrary, isConfigured } from '../services/plexService.js';

const router = Router();

router.post('/update-library', async (req, res) => {
  try {
    await updateLibrary();
    res.json({ message: 'Plex library update triggered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/status', (req, res) => {
  res.json({ configured: isConfigured() });
});

export default router;
