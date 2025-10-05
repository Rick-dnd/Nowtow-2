import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { storageService, type StorageBucket, type UploadResult } from '@/services/storage.service';

export function useUploadFile(
  bucket: StorageBucket
): UseMutationResult<UploadResult, Error, File> {
  return useMutation({
    mutationFn: (file: File): Promise<UploadResult> => storageService.uploadFile(bucket, file),
  });
}

export function useUploadMultipleFiles(
  bucket: StorageBucket
): UseMutationResult<UploadResult[], Error, File[]> {
  return useMutation({
    mutationFn: (files: File[]): Promise<UploadResult[]> => storageService.uploadMultipleFiles(bucket, files),
  });
}

export function useDeleteFile(
  bucket: StorageBucket
): UseMutationResult<void, Error, string> {
  return useMutation({
    mutationFn: (path: string): Promise<void> => storageService.deleteFile(bucket, path),
  });
}

export function useDeleteMultipleFiles(
  bucket: StorageBucket
): UseMutationResult<void, Error, string[]> {
  return useMutation({
    mutationFn: (paths: string[]): Promise<void> => storageService.deleteMultipleFiles(bucket, paths),
  });
}

export function useCreateSignedUrl(
  bucket: StorageBucket
): UseMutationResult<string, Error, { path: string; expiresIn?: number }> {
  return useMutation({
    mutationFn: ({ path, expiresIn }: { path: string; expiresIn?: number }): Promise<string> =>
      storageService.createSignedUrl(bucket, path, expiresIn),
  });
}
