# API Challenge

A TypeScript API that provides current temperature data for a given US zip code.

## How to run
1. **Install requirements:** `npm install`
2. **Setup environment:** Create a `.env` file and add `WEATHER_API_KEY=your_key_here`
3. **Start server** `npm start` (Runs on http://localhost:8080)
4. **Run tests:** `npm test`

## Design Choices

### 1. Language: TypeScript
I chose TypeScript mainly to get type safety and better functionality in the future. With strict type checking, I know that the input data is validated at compile time which reduces potential problems

### 2. API: WeatherAPI.com
There were many free options that provided weather data, but weatherAPI in particular supports US zip codes natively which reduces complexity. It also has the added benefit of faster code.

### 3. Other choices
I assumed that we are only looking US zip codes for simplicity. Hence, I'm using regex to validate the inputs.
Since the assignment focuses on production ready code, I used environment variables to protect the API key.
Initially, I intended use express.js + typescript boilerplate but decided against it since the assignment was trivial.
The code is split up to address different parts of the problem. 
- `index.ts`: Manages the main API route, providing JSON responses.
- `weatherService.ts`: Handles external API communication and converts data into required format.
- `types.ts`: Defines an interface for consistency. 

Note: The markdown document was formatted by an LLM.
