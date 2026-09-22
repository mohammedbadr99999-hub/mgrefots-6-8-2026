export const AI_FILE_ACCEPT = 'application/pdf,image/jpeg,image/png,image/webp';
export const MAX_AI_FILE_BYTES = 10 * 1024 * 1024;

const ALLOWED_TYPES = new Set(AI_FILE_ACCEPT.split(','));

export interface AIFileUpload {
  name: string;
  mimeType: string;
  data: string;
}

export const validateAIFile = (file: File): 'type' | 'size' | null => {
  if (!ALLOWED_TYPES.has(file.type)) return 'type';
  if (file.size > MAX_AI_FILE_BYTES) return 'size';
  return null;
};

export const serializeAIFile = async (file: File): Promise<AIFileUpload> => {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const chunkSize = 0x8000;
  let binary = '';

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return {
    name: file.name,
    mimeType: file.type,
    data: window.btoa(binary),
  };
};
