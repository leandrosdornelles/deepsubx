import { spawn } from 'child_process';

export async function extractSubtitles(videoPath, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y', // Force overwrite output files without asking
      '-i', videoPath,
      '-map', '0:s:0', // Extract first subtitle stream
      outputPath
    ]);

    ffmpeg.stderr.on('data', (data) => {
      console.error(`FFmpeg stderr: ${data}`);
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`No embebed subtitles found for this video file. (FFmpeg process exited with code ${code})`));
      }
    });

    ffmpeg.on('error', (err) => {
      reject(err);
    });
  });
}