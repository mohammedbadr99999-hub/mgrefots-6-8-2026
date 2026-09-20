import { GoogleGenAI } from '@google/genai';

const MAX_PROMPT_LENGTH = 12_000;
const MAX_SYSTEM_INSTRUCTION_LENGTH = 4_000;

export const config = {
  maxDuration: 30,
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
        prompt?: unknown;
        systemInstruction?: unknown;
      };
      const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
      const systemInstruction = typeof body.systemInstruction === 'string'
        ? body.systemInstruction.trim()
        : '';

      if (!prompt || prompt.length > MAX_PROMPT_LENGTH) {
        return Response.json({ error: 'Invalid prompt' }, { status: 400 });
      }

      if (systemInstruction.length > MAX_SYSTEM_INSTRUCTION_LENGTH) {
        return Response.json({ error: 'System instruction is too long' }, { status: 400 });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return Response.json({ error: 'Gemini API key not configured' }, { status: 503 });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemInstruction ? `System instruction: ${systemInstruction}\n\n` : ''}${prompt}`,
        config: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      });

      return Response.json({ text: response.text });
    } catch (error) {
      console.error('AI Chat error:', error);
      return Response.json({ error: 'AI generation failed' }, { status: 500 });
    }
  },
};
