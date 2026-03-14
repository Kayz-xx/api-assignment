import { jest, describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "../index";
import * as weatherService from "../services/weather";

jest.mock("../services/weather");

describe("GET /locations", () => {
  it("should return template weather data", async () => {
    const mockWeatherData = { temperature: 70, scale: "Fahrenheit" } as const;

    jest.mocked(weatherService.getTempByZip).mockResolvedValue(mockWeatherData);

    const response = await request(app).get("/locations/24060");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockWeatherData);
  });

  it("should return 400 for invalid zip code", async () => {
    const response = await request(app).get("/locations/1234");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return 404 when the weather cannot be fetched", async () => {
    jest.mocked(weatherService.getTempByZip).mockRejectedValue(new Error("API error"));

    const response = await request(app).get("/locations/24060");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

});