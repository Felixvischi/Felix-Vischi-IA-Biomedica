import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Configurar dotenv para leer el archivo .env de este directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: No se encontró la variable GEMINI_API_KEY en el archivo .env");
    return;
  }

  console.log("Iniciando prueba con la API de Gemini...");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = "¿Podrías darme un saludo corto de bienvenida para un curso de IA Biomédica, confirmando que la API funciona correctamente?";
    console.log(`Prompt: "${prompt}"\n`);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("=== Respuesta de Gemini ===");
    console.log(text);
    console.log("===========================");
  } catch (error) {
    console.error("Hubo un error al comunicarse con la API de Gemini:", error);
  }
}

run();
