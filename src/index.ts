import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { getTempByZip } from './weather.js';
import type { Scale } from './types.ts';

const app = express();
const port = 8080;

app.get('/locations/:zip', async (req: Request, res: Response) => {
  try {
    const { zip } = req.params;
    if (!zip || typeof zip !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid Request', 
        message: 'Zip code is required.' 
      });
    }
    const scale = (req.query.scale as Scale) || "Celsius";
    const data = await getTempByZip(zip, scale);
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ error: "There was no data found for this location."});
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});   