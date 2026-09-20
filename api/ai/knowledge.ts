import { GoogleGenAI } from '@google/genai';
import { timingSafeEqual } from 'node:crypto';

const STORE_DISPLAY_NAME = 'MGREFOTS Nutrition Knowledge';
const MAX_FILE_BYTES = 100 * 1024 * 1024;

const sleep = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const hasValidAdminToken = (request: Request, expectedToken: string) => {
  const authorization = request.headers.get('authorization') ?? '';
  const providedToken = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : '';
  const provided = Buffer.from(providedToken);
  const expected = Buffer.from(expectedToken);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
};

const safeError = (error: unknown) => {
  if (!(error instanceof Error)) return { name: 'UnknownError' };
  return {
    name: error.name,
    message: error.message.replace(/key=[^&\s]+/gi, 'key=[REDACTED]').slice(0, 500),
  };
};

const getOrCreateStore = async (ai: GoogleGenAI) => {
  const stores = await ai.fileSearchStores.list({ config: { pageSize: 100 } });
  for await (const store of stores) {
    if (store.displayName === STORE_DISPLAY_NAME && store.name) return store;
  }

  return ai.fileSearchStores.create({
    config: {
      displayName: STORE_DISPLAY_NAME,
      embeddingModel: 'models/gemini-embedding-2',
    },
  });
};

export const config = {
  maxDuration: 300,
};

export default {
  async fetch(request: Request): Promise<Response> {
    // The setup route is intentionally available only on protected Preview
    // deployments. Production visitors must never be able to upload sources.
    if (process.env.VERCEL_ENV === 'production') {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (request.method !== 'GET' && request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, {
        status: 405,
        headers: { Allow: 'GET, POST' },
      });
    }

    const adminToken = process.env.KNOWLEDGE_ADMIN_TOKEN?.trim();
    if (!adminToken) {
      return Response.json({ error: 'Knowledge administration is not configured' }, { status: 503 });
    }
    if (!hasValidAdminToken(request, adminToken)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 503 });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const store = await getOrCreateStore(ai);
      if (!store.name) throw new Error('Gemini did not return a knowledge store name');

      if (request.method === 'GET') {
        const documents = [];
        const pager = await ai.fileSearchStores.documents.list({
          parent: store.name,
          config: { pageSize: 100 },
        });
        for await (const document of pager) {
          documents.push({
            name: document.displayName,
            state: document.state,
            sizeBytes: document.sizeBytes,
          });
        }
        return Response.json({
          store: store.name,
          documents,
        });
      }

      const formData = await request.formData();
      const upload = formData.get('file');
      if (!(upload instanceof File)) {
        return Response.json({ error: 'A PDF file is required' }, { status: 400 });
      }
      if (upload.type !== 'application/pdf' && !upload.name.toLowerCase().endsWith('.pdf')) {
        return Response.json({ error: 'Only PDF files are accepted' }, { status: 400 });
      }
      if (upload.size === 0 || upload.size > MAX_FILE_BYTES) {
        return Response.json({ error: 'The PDF must be between 1 byte and 100 MB' }, { status: 400 });
      }

      const existingDocuments = await ai.fileSearchStores.documents.list({
        parent: store.name,
        config: { pageSize: 100 },
      });
      for await (const document of existingDocuments) {
        if (document.displayName === upload.name) {
          return Response.json({
            ok: true,
            skipped: true,
            document: upload.name,
            state: document.state,
          });
        }
      }

      console.info('[api/ai/knowledge] indexing started', {
        fileName: upload.name,
        fileSize: upload.size,
      });

      let operation = await ai.fileSearchStores.uploadToFileSearchStore({
        fileSearchStoreName: store.name,
        file: upload,
        config: {
          displayName: upload.name,
          mimeType: 'application/pdf',
          customMetadata: [
            { key: 'library', stringValue: 'mgrefots-nutrition' },
            { key: 'access', stringValue: 'private' },
          ],
          chunkingConfig: {
            whiteSpaceConfig: {
              maxTokensPerChunk: 700,
              maxOverlapTokens: 100,
            },
          },
        },
      });

      while (!operation.done) {
        await sleep(5_000);
        operation = await ai.operations.get({ operation });
      }
      if (operation.error) {
        throw new Error(`Gemini indexing failed: ${JSON.stringify(operation.error)}`);
      }

      console.info('[api/ai/knowledge] indexing completed', { fileName: upload.name });
      return Response.json({
        ok: true,
        document: upload.name,
        store: store.name,
      });
    } catch (error) {
      console.error('[api/ai/knowledge] request failed', safeError(error));
      return Response.json({
        error: 'Knowledge setup failed',
        details: safeError(error),
      }, { status: 500 });
    }
  },
};
