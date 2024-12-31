import axios from 'axios';


export function isConfigured() {  
   return !!(process.env.PLEX_HOST && process.env.PLEX_PORT && process.env.PLEX_TOKEN);
  }

export async function updateLibrary() {
  if (!isConfigured()) {
    throw new Error('Plex configuration is missing');
  }

  const url = `http://${process.env.PLEX_HOST}:${process.env.PLEX_PORT}/library/sections/all/refresh?X-Plex-Token=${process.env.PLEX_TOKEN}`;               
  try {
    await axios.get(url);
  } catch (error) {
    console.error('Failed to update Plex library:', error);
    throw new Error('Failed to update Plex library');
  }
}

