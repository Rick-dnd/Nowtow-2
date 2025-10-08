'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  onUpload?: (file: File) => Promise<string>;
  className?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onUpload,
  className,
  disabled = false,
}: ImageUploadProps): React.ReactElement {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Bitte lade nur Bilder hoch');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('Bild ist zu groß. Maximal 5MB erlaubt.');
        return;
      }

      try {
        if (onUpload) {
          // Upload to server
          const url = await onUpload(file);
          onChange(url);
          toast.success('Bild erfolgreich hochgeladen');
        } else {
          // Create local preview URL
          const url = URL.createObjectURL(file);
          onChange(url);
          toast.success('Bild wurde ausgewählt');
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Fehler beim Hochladen des Bildes');
      }
    },
    [onChange, onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
    disabled,
  });

  const handleRemove = (): void => {
    onChange(null);
  };

  if (value) {
    return (
      <Card className={cn('relative overflow-hidden', className)}>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-muted">
            <Image
              src={value}
              alt="Cover preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  // Trigger file picker by re-opening dropzone
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e): void => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      onDrop([file]);
                    }
                  };
                  input.click();
                }}
                disabled={disabled}
              >
                <Upload className="h-4 w-4 mr-2" />
                Ersetzen
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={disabled}
              >
                <X className="h-4 w-4 mr-2" />
                Entfernen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-primary/50',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            'p-4 rounded-full transition-colors',
            isDragActive ? 'bg-primary/10' : 'bg-muted'
          )}
        >
          <ImagePlus
            className={cn(
              'h-8 w-8',
              isDragActive ? 'text-primary' : 'text-muted-foreground'
            )}
          />
        </div>
        <div>
          <p className="text-sm font-medium">
            {isDragActive
              ? 'Lass das Bild hier fallen...'
              : 'Ziehe ein Bild hierher oder klicke zum Auswählen'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, GIF oder WebP (max. 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}
