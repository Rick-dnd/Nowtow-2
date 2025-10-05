import { createClient } from '@/lib/supabase/client';

export type StorageBucket =
  | 'avatars'
  | 'event-images'
  | 'space-images'
  | 'service-images'
  | 'blog-images'
  | 'stories'
  | 'videos'
  | 'voice-notes';

export interface UploadResult {
  path: string;
  publicUrl: string;
}

export const storageService = {
  async uploadFile(
    bucket: StorageBucket,
    file: File,
    path?: string
  ): Promise<UploadResult> {
    const supabase = createClient();

    const fileExt = file.name.split('.').pop();
    const fileName = path || `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      publicUrl,
    };
  },

  async uploadMultipleFiles(
    bucket: StorageBucket,
    files: File[]
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) => this.uploadFile(bucket, file));
    return Promise.all(uploadPromises);
  },

  async deleteFile(bucket: StorageBucket, path: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  },

  async deleteMultipleFiles(bucket: StorageBucket, paths: string[]): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.storage
      .from(bucket)
      .remove(paths);

    if (error) {
      throw new Error(`Failed to delete files: ${error.message}`);
    }
  },

  getPublicUrl(bucket: StorageBucket, path: string): string {
    const supabase = createClient();
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  },

  async listFiles(bucket: StorageBucket, folder?: string): Promise<string[]> {
    const supabase = createClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder);

    if (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }

    return data.map((file) => file.name);
  },

  async createSignedUrl(
    bucket: StorageBucket,
    path: string,
    expiresIn: number = 3600
  ): Promise<string> {
    const supabase = createClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      throw new Error(`Failed to create signed URL: ${error.message}`);
    }

    return data.signedUrl;
  },
};
