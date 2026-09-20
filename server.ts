import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { buildExpertSystemPrompt, type ExpertLanguage } from "./shared/expertMethodology";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  };

  // API Endpoints
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { prompt, systemInstruction, lang } = req.body;
      const ai = getGeminiClient();

      if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 12000) {
        return res.status(400).json({ error: "Invalid prompt" });
      }
      
      if (!ai) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      const responseLanguage: ExpertLanguage = lang === "ar" || lang === "rw" ? lang : "en";
      const taskContext = typeof systemInstruction === "string" ? systemInstruction.slice(0, 1500) : "";
      const expertInstruction = buildExpertSystemPrompt(responseLanguage, taskContext);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `System instruction:\n${expertInstruction}\n\nVisitor question:\n${prompt}`,
        config: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI Chat error:", error);
      res.status(500).json({ error: error?.message || "AI generation failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
