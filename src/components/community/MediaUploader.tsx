'use client';

import React, { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Upload, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import Image from 'next/image';

export interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface MediaUploaderProps {
  onFilesChange: (files: MediaFile[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedTypes?: string[];
  className?: string;
}

export function MediaUploader({
  onFilesChange,
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'],
  className,
}: MediaUploaderProps): React.ReactElement {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `Dateityp ${file.type} wird nicht akzeptiert`;
    }
    if (file.size > maxFileSize) {
      return `Dateigröße ${formatFileSize(file.size)} überschreitet Maximum ${formatFileSize(maxFileSize)}`;
    }
    return null;
  };

  const processFiles = (fileList: FileList | File[]): void => {
    const filesArray = Array.from(fileList);

    // Check total file count
    if (files.length + filesArray.length > maxFiles) {
      setError(`Maximal ${maxFiles} Dateien erlaubt`);
      return;
    }

    const newMediaFiles: MediaFile[] = [];

    filesArray.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      const mediaType = file.type.startsWith('image/') ? 'image' : 'video';
      const preview = URL.createObjectURL(file);

      newMediaFiles.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview,
        type: mediaType,
      });
    });

    if (newMediaFiles.length > 0) {
      const updatedFiles = [...files, ...newMediaFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
      setError(null);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (id: string): void => {
    const updatedFiles = files.filter((f) => {
      if (f.id === id) {
        URL.revokeObjectURL(f.preview); // Clean up object URL
        return false;
      }
      return true;
    });
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click();
  };

  // Cleanup object URLs on unmount
  React.useEffect((): (() => void) => {
    return (): void => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <div className={className}>
      {/* Drop Zone */}
      {files.length < maxFiles && (
        <Card
          className={`border-2 border-dashed transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  Ziehe deine Dateien hierher, oder{' '}
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className="text-primary underline-offset-4 hover:underline"
                    aria-label="Browse files"
                  >
                    durchsuche
                  </button>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Maximal {maxFiles} Dateien • Bis zu {formatFileSize(maxFileSize)} jeweils
                </p>
                <p className="text-xs text-muted-foreground">
                  Unterstützt: Bilder (JPG, PNG, GIF, WebP) und Videos (MP4, WebM)
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
        aria-label="File upload input"
      />

      {/* Error Message */}
      {error && (
        <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* File Previews */}
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {files.map((mediaFile) => (
            <div key={mediaFile.id} className="relative group">
              <Card className="overflow-hidden">
                <div className="aspect-square relative bg-muted">
                  {mediaFile.type === 'image' ? (
                    <Image
                      src={mediaFile.preview}
                      alt={mediaFile.file.name}
                      fill
                      className="object-cover"
                      unoptimized // Since this is a blob URL
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <VideoIcon className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground truncate w-full">
                        {mediaFile.file.name}
                      </p>
                    </div>
                  )}

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center p-2">
                      <p className="text-xs font-medium truncate">{mediaFile.file.name}</p>
                      <p className="text-xs opacity-75">{formatFileSize(mediaFile.file.size)}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Remove Button */}
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveFile(mediaFile.id)}
                aria-label={`Remove ${mediaFile.file.name}`}
              >
                <X className="h-3 w-3" />
              </Button>

              {/* Type Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 rounded text-white text-xs flex items-center gap-1">
                {mediaFile.type === 'image' ? (
                  <ImageIcon className="h-3 w-3" />
                ) : (
                  <VideoIcon className="h-3 w-3" />
                )}
                {mediaFile.type}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Count */}
      {files.length > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          {files.length} / {maxFiles} Datei{files.length !== 1 ? 'en' : ''} ausgewählt
        </p>
      )}
    </div>
  );
}
