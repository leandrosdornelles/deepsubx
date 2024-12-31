import { spawn } from 'child_process';

export function detectSubtitleLanguage(videoPath) {
  return new Promise((resolve) => {
    const ffprobe = spawn('ffprobe', [
      '-v', 'quiet',
      '-print_format', 'json',
      '-show_streams',
      '-select_streams', 's',
      videoPath
    ]);

    let output = '';

    ffprobe.stdout.on('data', (data) => {
      output += data;
    });

    ffprobe.on('close', () => {
      try {
        const probe = JSON.parse(output);
        for (const stream of probe.streams) {
          if (stream.codec_type === 'subtitle' && stream.tags?.language) {
            resolve(stream.tags.language);
            return;
          }
        }
        resolve('unknown');
      } catch (error) {
        console.error('Error parsing ffprobe output:', error);
        resolve('unknown');
      }
    });
  });
}