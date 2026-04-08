import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error("No API key");

async function checkModels() {
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + API_KEY);
    const data = await res.json();
    if (data.models) {
      console.log(data.models.map(m => m.name).filter(n => n.includes('gemini') && !n.includes('vision')));
    } else {
      console.log("Error querying models:", data);
    }
  } catch (e) {
    console.error("Fetch error:", e.message);
  }
}

checkModels();
