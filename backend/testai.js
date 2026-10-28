
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL;

if (!apiKey || !model) {
  throw new Error("Missing GEMINI_API_KEY or GEMINI_MODEL in .env");
}

const ai = new GoogleGenAI({ apiKey });

try {
  const response = await ai.models.generateContent({
    model,
    contents: "Return exactly: Gemini is working",
  });

  console.log("Gemini response:", response.text);
} catch (error) {
  console.error("Gemini test failed:", error.message);
  console.error("Error status:", error.status);
  console.error("Error details:", error);
}
