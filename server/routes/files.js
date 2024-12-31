import { Router } from 'express';
import { join } from 'path';
import fs from 'fs/promises';
import { DATA_DIR, MOVIES_DIR } from '../utils/paths.js';

const router = Router();

router.get('/list_shows', async (req, res) => {
  try {
    const shows = await fs.readdir(DATA_DIR);
    const validShows = await Promise.all(
      shows.map(async (show) => {
        const stats = await fs.stat(join(DATA_DIR, show));
        return stats.isDirectory() ? show : null;
      })
    );
    res.json(validShows.filter(Boolean));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list_movies', async (req, res) => {
  try {
    const movies = await fs.readdir(MOVIES_DIR);
    const validMovies = await Promise.all(
      movies.map(async (movie) => {
        const stats = await fs.stat(join(MOVIES_DIR, movie));
        return stats.isDirectory() ? movie : null;
      })
    );
    res.json(validMovies.filter(Boolean));
  } catch (error) {    
    res.status(500).json({ 
      message: error.message,        
      originalError: error.toString(),
      stack: error.stack
    });
  }
});

router.get('/list_seasons', async (req, res) => {
  try {
    const { show } = req.query;
    if (!show) {
      return res.status(400).json({ error: 'Show parameter is required' });
    }

    const showPath = join(DATA_DIR, show);
    const seasons = await fs.readdir(showPath);
    const validSeasons = await Promise.all(
      seasons.map(async (season) => {
        const stats = await fs.stat(join(showPath, season));
        return stats.isDirectory() ? season : null;
      })
    );
    res.json(validSeasons.filter(Boolean));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list_subtitles', async (req, res) => {
  try {
    const { show, season, type } = req.query;
    if (type === 'movies' && !show) {
      return res.status(400).json({ error: 'Movie name is required' });
    }
    if (type === 'series' && (!show || !season)) {
      return res.status(400).json({ error: 'Show and season parameters are required' });
    }

    const basePath = type === 'movies' ? MOVIES_DIR : DATA_DIR;
    const fullPath = type === 'movies' 
      ? join(basePath, show)
      : join(basePath, show, season);

    const files = await fs.readdir(fullPath);
    const subtitles = files.filter((file) => file.endsWith('.srt'));
    res.json(subtitles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list_video_files', async (req, res) => {
  try {
    const { show, season, type } = req.query;
    if (type === 'movies' && !show) {
      return res.status(400).json({ error: 'Movie name is required' });
    }
    if (type === 'series' && (!show || !season)) {
      return res.status(400).json({ error: 'Show and season parameters are required' });
    }

    const basePath = type === 'movies' ? MOVIES_DIR : DATA_DIR;
    const fullPath = type === 'movies'
      ? join(basePath, show)
      : join(basePath, show, season);

    const files = await fs.readdir(fullPath);
    const videos = files.filter((file) => 
      ['.mkv', '.mp4', '.avi'].some(ext => file.toLowerCase().endsWith(ext))
    );
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;