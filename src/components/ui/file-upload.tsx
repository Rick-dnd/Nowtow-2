import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface FileUploadProps {
  value?: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: Record<string, string[]>;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  value = [],
  onChange,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
  disabled = false,
  className,
}: FileUploadProps): React.ReactElement {
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([]);

  // Generate preview URLs when files change
  React.useEffect((): (() => void) | void => {
    if (value.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const urls = value.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Cleanup URLs on unmount or when files change
    return (): void => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]): void => {
      if (disabled) return;

      // Limit to maxFiles
      const remainingSlots = maxFiles - value.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      if (filesToAdd.length > 0) {
        onChange([...value, ...filesToAdd]);
      }
    },
    [value, onChange, maxFiles, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    disabled,
    multiple: maxFiles > 1,
  });

  const removeFile = (index: number): void => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round(bytes / Math.pow(k, i) * 100) / 100} ${sizes[i] ?? 'Bytes'}`;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          'hover:border-primary hover:bg-accent/50',
          isDragActive && 'border-primary bg-accent',
          disabled && 'opacity-50 cursor-not-allowed',
          value.length >= maxFiles && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="w-10 h-10 text-muted-foreground" aria-hidden="true" />
          {isDragActive ? (
            <p className="text-sm font-medium text-primary">Drop the files here...</p>
          ) : (
            <>
              <p className="text-sm font-medium">
                Drag & drop files here, or click to select
              </p>
              <p className="text-xs text-muted-foreground">
                Max {maxFiles} files, up to {formatFileSize(maxSize)} each
              </p>
            </>
          )}
        </div>
      </div>

      {/* File Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((file, index) => {
            const previewUrl = previewUrls[index];
            const isImage = file.type.startsWith('image/');

            return (
              <div
                key={`${file.name}-${index}`}
                className="relative group rounded-lg border bg-card overflow-hidden"
              >
                {/* Preview */}
                <div className="aspect-square relative bg-muted flex items-center justify-center">
                  {isImage && previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-muted-foreground" aria-hidden="true" />
                  )}

                  {/* Delete Button - Shows on hover */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className={cn(
                      'absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity',
                      'focus:opacity-100'
                    )}
                    onClick={(): void => removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                {/* File Info */}
                <div className="p-2 text-xs">
                  <p className="font-medium truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* File Count */}
      {value.length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          {value.length} of {maxFiles} files selected
        </p>
      )}
    </div>
  );
}
