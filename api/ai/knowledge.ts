import { GoogleGenAI } from '@google/genai';
import { timingSafeEqual } from 'node:crypto';

const STORE_DISPLAY_NAME = 'MGREFOTS Nutrition Knowledge';
const MAX_FILE_BYTES = 100 * 1024 * 1024;
const MAX_CHUNK_BYTES = 2 * 1024 * 1024;
const GEMINI_UPLOAD_HOST = 'generativelanguage.googleapis.com';

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
  const stores = await ai.fileSearchStores.list({ config: { pageSize: 20 } });
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

const getExistingDocument = async (ai: GoogleGenAI, storeName: string, fileName: string) => {
  const documents = await ai.fileSearchStores.documents.list({
    parent: storeName,
    config: { pageSize: 20 },
  });
  for await (const document of documents) {
    if (document.displayName === fileName) return document;
  }
  return undefined;
};

const parseJson = async (request: Request) => {
  try {
    return await request.json() as Record<string, unknown>;
  } catch {
    throw new Error('A valid JSON request body is required');
  }
};

const validateUploadUrl = (value: string) => {
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.hostname !== GEMINI_UPLOAD_HOST ||
    !url.pathname.startsWith('/upload/')
  ) {
    throw new Error('Invalid Gemini upload session');
  }
  return url.toString();
};

export const config = {
  maxDuration: 300,
};

export default {
  async fetch(request: Request): Promise<Response> {
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
      const action = new URL(request.url).searchParams.get('action') ?? 'start';

      if (action === 'chunk') {
        const uploadUrlHeader = request.headers.get('x-knowledge-upload-url') ?? '';
        const uploadUrl = validateUploadUrl(uploadUrlHeader);
        const offsetHeader = request.headers.get('x-knowledge-upload-offset') ?? '';
        const offset = Number(offsetHeader);
        if (!Number.isSafeInteger(offset) || offset < 0 || String(offset) !== offsetHeader) {
          return Response.json({ error: 'Invalid upload offset' }, { status: 400 });
        }
        const isFinal = request.headers.get('x-knowledge-upload-final') === 'true';
        const bytes = await request.arrayBuffer();
        if (bytes.byteLength === 0 || bytes.byteLength > MAX_CHUNK_BYTES) {
          return Response.json({ error: 'Upload chunks must be between 1 byte and 2 MB' }, { status: 400 });
        }

        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Length': String(bytes.byteLength),
            'X-Goog-Upload-Offset': String(offset),
            'X-Goog-Upload-Command': isFinal ? 'upload, finalize' : 'upload',
          },
          body: bytes,
        });
        if (!uploadResponse.ok) {
          const details = (await uploadResponse.text()).slice(0, 500);
          throw new Error(`Gemini chunk upload failed (${uploadResponse.status}): ${details}`);
        }

        if (!isFinal) return Response.json({ ok: true });
        const operation = await uploadResponse.json() as Record<string, unknown>;
        if (typeof operation.name !== 'string' || operation.name.length > 500) {
          throw new Error('Gemini did not return a valid indexing operation');
        }
        console.info('[api/ai/knowledge] upload completed; indexing started', {
          operation: operation.name,
        });
        return Response.json({ ok: true, operation });
      }

      if (action === 'status') {
        const body = await parseJson(request);
        const operation = body.operation;
        if (
          !operation ||
          typeof operation !== 'object' ||
          typeof (operation as { name?: unknown }).name !== 'string' ||
          (operation as { name: string }).name.length > 500
        ) {
          return Response.json({ error: 'A valid indexing operation is required' }, { status: 400 });
        }
        const updated = await ai.operations.get({ operation: operation as never });
        if (updated.error) {
          throw new Error(`Gemini indexing failed: ${JSON.stringify(updated.error)}`);
        }
        return Response.json({ ok: true, operation: updated, done: Boolean(updated.done) });
      }

      const store = await getOrCreateStore(ai);
      if (!store.name) throw new Error('Gemini did not return a knowledge store name');

      if (request.method === 'GET') {
        const documents = [];
        const pager = await ai.fileSearchStores.documents.list({
          parent: store.name,
          config: { pageSize: 20 },
        });
        for await (const document of pager) {
          documents.push({
            name: document.displayName,
            state: document.state,
            sizeBytes: document.sizeBytes,
          });
        }
        return Response.json({ store: store.name, documents });
      }

      if (action === 'start') {
        const body = await parseJson(request);
        const fileName = typeof body.fileName === 'string' ? body.fileName.trim() : '';
        const fileSize = typeof body.fileSize === 'number' ? body.fileSize : 0;
        if (!fileName || fileName.length > 250 || !fileName.toLowerCase().endsWith('.pdf')) {
          return Response.json({ error: 'A valid PDF filename is required' }, { status: 400 });
        }
        if (!Number.isSafeInteger(fileSize) || fileSize <= 0 || fileSize > MAX_FILE_BYTES) {
          return Response.json({ error: 'The PDF must be between 1 byte and 100 MB' }, { status: 400 });
        }

        const existing = await getExistingDocument(ai, store.name, fileName);
        if (existing) {
          return Response.json({
            ok: true,
            skipped: true,
            document: fileName,
            state: existing.state,
          });
        }

        const startUrl = new URL(
          `https://${GEMINI_UPLOAD_HOST}/upload/v1beta/${store.name}:uploadToFileSearchStore`,
        );
        startUrl.searchParams.set('key', apiKey);
        const startResponse = await fetch(startUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Upload-Protocol': 'resumable',
            'X-Goog-Upload-Command': 'start',
            'X-Goog-Upload-Header-Content-Length': String(fileSize),
            'X-Goog-Upload-Header-Content-Type': 'application/pdf',
          },
          body: JSON.stringify({
            displayName: fileName,
            customMetadata: [
              { key: 'library', stringValue: 'mgrefots-nutrition' },
              { key: 'access', stringValue: 'private' },
            ],
            chunkingConfig: {
              whiteSpaceConfig: {
                maxTokensPerChunk: 512,
                maxOverlapTokens: 100,
              },
            },
          }),
        });
        if (!startResponse.ok) {
          const details = (await startResponse.text()).slice(0, 500);
          throw new Error(`Gemini upload session failed (${startResponse.status}): ${details}`);
        }
        const uploadUrl = startResponse.headers.get('x-goog-upload-url');
        if (!uploadUrl) throw new Error('Gemini did not return a resumable upload URL');
        validateUploadUrl(uploadUrl);

        console.info('[api/ai/knowledge] resumable upload started', { fileName, fileSize });
        return Response.json({ ok: true, uploadUrl });
      }

      return Response.json({ error: 'Unknown knowledge action' }, { status: 400 });
    } catch (error) {
      console.error('[api/ai/knowledge] request failed', safeError(error));
      return Response.json({
        error: 'Knowledge setup failed',
        details: safeError(error),
      }, { status: 500 });
    }
  },
};
