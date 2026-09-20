import { GoogleGenAI } from '@google/genai';

const MAX_FILE_BASE64_LENGTH = 6_000_000;
const MAX_GOAL_LENGTH = 1_000;
const SUPPORTED_LANGUAGES = new Set(['ar', 'rw', 'en']);
const SUPPORTED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
]);

export const config = {
  maxDuration: 60,
};

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, {
        status: 405,
        headers: { Allow: 'POST' },
      });
    }

    try {
      const body = await request.json() as {
        goal?: unknown;
        lang?: unknown;
        fileBase64?: unknown;
        mimeType?: unknown;
      };
      const goal = typeof body.goal === 'string' ? body.goal.trim() : '';
      const lang = typeof body.lang === 'string' && SUPPORTED_LANGUAGES.has(body.lang)
        ? body.lang
        : 'en';
      const fileBase64 = typeof body.fileBase64 === 'string' ? body.fileBase64 : '';
      const mimeType = typeof body.mimeType === 'string' ? body.mimeType : '';

      if (!goal || goal.length > MAX_GOAL_LENGTH) {
        return Response.json({ error: 'Invalid goal' }, { status: 400 });
      }

      if (!fileBase64 || fileBase64.length > MAX_FILE_BASE64_LENGTH) {
        return Response.json({ error: 'Invalid or oversized file' }, { status: 413 });
      }

      if (!SUPPORTED_MIME_TYPES.has(mimeType)) {
        return Response.json({ error: 'Unsupported file type' }, { status: 415 });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return Response.json({ error: 'Gemini API key not configured' }, { status: 503 });
      }

      const ai = new GoogleGenAI({ apiKey });
      const language = lang === 'ar' ? 'Arabic' : lang === 'rw' ? 'Kinyarwanda' : 'English';
      const instruction = `You are an ELITE bodybuilding coach with 13+ years of experience and NASM certification.
Analyze the user's InBody scan and goal: ${goal}.
Create an AGGRESSIVE, RESULT-DRIVEN, HIGH-VOLUME training & nutrition protocol.
Language: Respond ONLY in ${language}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { text: instruction },
          { inlineData: { mimeType, data: fileBase64 } },
        ],
        config: {
          maxOutputTokens: 4096,
          temperature: 0.7,
        },
      });

      return Response.json({ text: response.text });
    } catch (error) {
      console.error('AI Analyze error:', error);
      return Response.json({ error: 'Analysis failed' }, { status: 500 });
    }
  },
};
