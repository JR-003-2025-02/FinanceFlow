import { supabase } from './supabaseClient';

export const STORAGE_BUCKET = 'expense-attachments';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const uploadFile = async (file: File, path: string) => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('File type not supported');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit');
  }

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file);

  if (error) throw error;
  return data;
};

export const downloadFile = async (path: string) => {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .download(path);

  if (error) throw error;
  return data;
};

export const deleteFile = async (path: string) => {
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([path]);

  if (error) throw error;
};

export const listFiles = async (prefix?: string) => {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list(prefix || '');

  if (error) throw error;
  return data;
};