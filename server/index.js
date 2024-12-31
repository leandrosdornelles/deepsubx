import express from 'express';
import cors from 'cors';
import filesRouter from './routes/files.js';
import subtitleRouter from './routes/subtitle.js';
import usageRouter from './routes/usage.js';
import languageRouter from './routes/language.js';
import plexRoutes from './routes/plexRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors()); //
app.use(express.json());

// Routes
app.use('/api', filesRouter);
app.use('/api', subtitleRouter);
app.use('/api', usageRouter);
app.use('/api', languageRouter);
app.use('/api/plex', plexRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});