import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = process.env.DATA_DIR || join(__dirname, '..', '..', 'data');
export const MOVIES_DIR = process.env.MOVIES_DIR || join(__dirname, '..', '..', 'movies');