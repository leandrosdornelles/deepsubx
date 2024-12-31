import { isPlexConfigured, updatePlexLibrary } from '../api';

export class PlexService {
  static async isConfigured(): Promise<boolean> {
    return await isPlexConfigured();
  }

  static async updateLibrary(): Promise<void> {
    await updatePlexLibrary();
  }
}
