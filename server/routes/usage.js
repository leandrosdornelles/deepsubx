import { Router } from 'express';
import { getUsageStats } from '../services/deepl.js';

const router = Router();

router.get('/get_character_count', async (req, res) => {
  try {
    const stats = await getUsageStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch character count',
      details: error.message 
    });
  }
});

export default router;