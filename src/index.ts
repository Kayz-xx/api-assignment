import "dotenv/config";
import express, { Request, Response } from "express";
import { getTempByZip } from "./services/weather";
import { Scale } from "./utils/types";

const app = express();
const port = 8080;

app.get("/locations/:zip", async (req: Request, res: Response) => {
  try {
    const { zip } = req.params;
    if (!zip || typeof zip !== "string") {
      return res.status(400).json({
        error: "Invalid Request",
        message: "Zip code is required.",
      });
    }
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zip)) {
      res
        .status(400)
        .json({ error: "This is an invalid US zip code, use 5 digits." });
      return;
    }
    const scale = (req.query.scale as Scale) || "Fahrenheit";
    const data = await getTempByZip(zip, scale);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(404)
      .json({ error: "There was no data found for this location." });
  }
});

export default app;
