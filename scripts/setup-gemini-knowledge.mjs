import { access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { GoogleGenAI } from '@google/genai';

const STORE_DISPLAY_NAME = 'MGREFOTS Nutrition Knowledge';
const MAX_TOKENS_PER_CHUNK = 512;
const MAX_OVERLAP_TOKENS = 100;

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const apiKey = process.env.GEMINI_API_KEY?.trim();
if (!apiKey) {
  console.error('GEMINI_API_KEY is required. Keep it private and pass it as an environment variable.');
  process.exit(1);
}

const filePaths = process.argv.slice(2).map((filePath) => path.resolve(filePath));
if (filePaths.length === 0) {
  console.error('Pass one or more PDF paths after --.');
  console.error('Example: npm run knowledge:setup -- "book-one.pdf" "book-two.pdf"');
  process.exit(1);
}

for (const filePath of filePaths) {
  if (path.extname(filePath).toLowerCase() !== '.pdf') {
    console.error(`Only PDF files are accepted: ${filePath}`);
    process.exit(1);
  }
  await access(filePath);
}

const ai = new GoogleGenAI({ apiKey });

let store;
const stores = await ai.fileSearchStores.list({ config: { pageSize: 20 } });
for await (const candidate of stores) {
  if (candidate.displayName === STORE_DISPLAY_NAME) {
    store = candidate;
    break;
  }
}

if (!store) {
  store = await ai.fileSearchStores.create({
    config: {
      displayName: STORE_DISPLAY_NAME,
      embeddingModel: 'models/gemini-embedding-2',
    },
  });
  console.log(`Created private File Search store: ${store.name}`);
} else {
  console.log(`Using existing private File Search store: ${store.name}`);
}

if (!store.name) {
  throw new Error('Gemini did not return a File Search store name.');
}

const existingDocuments = new Set();
const documents = await ai.fileSearchStores.documents.list({
  parent: store.name,
  config: { pageSize: 20 },
});
for await (const document of documents) {
  if (document.displayName) existingDocuments.add(document.displayName);
}

for (const filePath of filePaths) {
  const displayName = path.basename(filePath);
  if (existingDocuments.has(displayName)) {
    console.log(`Skipped existing document: ${displayName}`);
    continue;
  }

  console.log(`Uploading and indexing: ${displayName}`);
  let operation = await ai.fileSearchStores.uploadToFileSearchStore({
    fileSearchStoreName: store.name,
    file: filePath,
    config: {
      displayName,
      mimeType: 'application/pdf',
      customMetadata: [
        { key: 'library', stringValue: 'mgrefots-nutrition' },
        { key: 'access', stringValue: 'private' },
      ],
      chunkingConfig: {
        whiteSpaceConfig: {
          maxTokensPerChunk: MAX_TOKENS_PER_CHUNK,
          maxOverlapTokens: MAX_OVERLAP_TOKENS,
        },
      },
    },
  });

  while (!operation.done) {
    await sleep(5_000);
    operation = await ai.operations.get({ operation });
  }

  if (operation.error) {
    throw new Error(`Indexing failed for ${displayName}: ${JSON.stringify(operation.error)}`);
  }
  console.log(`Indexed: ${displayName}`);
}

const refreshedStore = await ai.fileSearchStores.get({ name: store.name });
console.log('Knowledge store is ready.');
console.log(`Active documents: ${refreshedStore.activeDocumentsCount ?? 'processing'}`);
console.log(`GEMINI_FILE_SEARCH_STORE=${store.name}`);
console.log('Add the final line to Vercel Preview and Production, then redeploy.');
