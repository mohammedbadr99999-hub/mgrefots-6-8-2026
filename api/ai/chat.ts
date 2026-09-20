import { GoogleGenAI } from '@google/genai';
import { buildExpertSystemPrompt, type ExpertLanguage } from '../../shared/expertMethodology';

const MAX_PROMPT_LENGTH = 12_000;
const MAX_TASK_CONTEXT_LENGTH = 1_500;

const safeErrorDetails = (error: unknown) => {
  if (!(error instanceof Error)) {
    return { name: 'UnknownError' };
  }

  const apiError = error as Error & { status?: number; code?: string | number };
  return {
    name: apiError.name,
    status: apiError.status,
    code: apiError.code,
    message: apiError.message
      .replace(/key=[^&\s]+/gi, 'key=[REDACTED]')
      .slice(0, 500),
  };
};

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
      console.info('[api/ai/chat] request received', { method: request.method });
      const body = await request.json() as {
        prompt?: unknown;
        systemInstruction?: unknown;
        lang?: unknown;
      };
      const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
      const taskContext = typeof body.systemInstruction === 'string'
        ? body.systemInstruction.trim()
        : '';
      const lang: ExpertLanguage = body.lang === 'ar' || body.lang === 'rw' ? body.lang : 'en';

      if (!prompt || prompt.length > MAX_PROMPT_LENGTH) {
        return Response.json({ error: 'Invalid prompt' }, { status: 400 });
      }

      if (taskContext.length > MAX_TASK_CONTEXT_LENGTH) {
        return Response.json({ error: 'Task context is too long' }, { status: 400 });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error('[api/ai/chat] GEMINI_API_KEY is missing');
        return Response.json({
          error: 'Gemini API key not configured',
          code: 'AI_NOT_CONFIGURED',
        }, { status: 503 });
      }

      const ai = new GoogleGenAI({ apiKey });
      const expertInstruction = buildExpertSystemPrompt(lang, taskContext);
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `System instruction:\n${expertInstruction}\n\nVisitor question:\n${prompt}`,
        config: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      });

      console.info('[api/ai/chat] Gemini response generated');
      return Response.json({ text: response.text });
    } catch (error) {
      console.error('[api/ai/chat] Gemini request failed', safeErrorDetails(error));
      return Response.json({
        error: 'AI generation failed',
        code: 'AI_GENERATION_FAILED',
      }, { status: 500 });
    }
  },
};
