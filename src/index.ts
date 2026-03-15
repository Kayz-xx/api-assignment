import "dotenv/config";
import express, { Request, Response } from "express";
import { getTempByZip } from "./services/weather";
import { Scale } from "./utils/types";

const app = express();

app.get("/locations/:zip", async (req: Request, res: Response) => {
  try {
    const zip = req.params.zip as string;
    // check valid zip code
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zip)) {
      res
        .status(400)
        .json({ error: "This is an invalid US zip code, use 5 digits." });
      return;
    }
    // default to fahrenheit
    const scale: Scale =
      req.query.scale === "Celsius" ? "Celsius" : "Fahrenheit";
    const data = await getTempByZip(zip, scale);
    res.status(200).json(data);
  } catch (error) {
    // 404 for simplicity
    res
      .status(404)
      .json({ error: "There was no data found for this location." });
  }
});

export default app;
