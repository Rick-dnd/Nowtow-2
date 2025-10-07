'use client';

import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { FileUpload } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Trash2, GripVertical } from 'lucide-react';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { SpaceFormValues } from './schemas';
import type { SpaceImageInput } from '@/types/space-images';
import { DEFAULT_SPACE_IMAGE_CATEGORIES } from '@/types/space-images';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableImageItemProps {
  image: SpaceImageInput;
  index: number;
  onSetMain: (index: number) => void;
  onCategoryChange: (index: number, category: string) => void;
  onCustomCategorySubmit: (index: number, category: string) => void;
  onRemove: (index: number) => void;
  showCustomInput: boolean;
  customCategory: string;
  setCustomCategory: (value: string) => void;
  setShowCustomInput: (show: boolean) => void;
}

function SortableImageItem({
  image,
  index,
  onSetMain,
  onCategoryChange,
  onCustomCategorySubmit,
  onRemove,
  showCustomInput,
  customCategory,
  setCustomCategory,
  setShowCustomInput,
}: SortableImageItemProps): React.ReactElement {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: index.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Drag Handle */}
          <div
            className="flex items-center cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Image Preview */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
            {image.url && (
              <Image
                src={image.url}
                alt={`Bild ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            )}
            {image.is_main && (
              <div className="absolute top-1 left-1 bg-black/60 rounded-full p-1.5">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>

          {/* Image Controls */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Bild {index + 1}</span>
              {!image.is_main && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetMain(index)}
                  className="h-7 text-xs"
                >
                  <Star className="h-3 w-3 mr-1" />
                  Als Hauptbild markieren
                </Button>
              )}
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">
                Bereich (optional)
              </label>
              {showCustomInput ? (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Eigener Bereich..."
                    value={customCategory}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomCategory(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        onCustomCategorySubmit(index, customCategory);
                      }
                    }}
                    className="h-8 text-sm"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => onCustomCategorySubmit(index, customCategory)}
                    className="h-8"
                  >
                    OK
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCustomInput(false)}
                    className="h-8"
                  >
                    Abbrechen
                  </Button>
                </div>
              ) : (
                <Select
                  value={image.category || 'none'}
                  onValueChange={(value) => onCategoryChange(index, value)}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Kategorie wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Keine Kategorie</SelectItem>
                    {DEFAULT_SPACE_IMAGE_CATEGORIES.slice(1).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Eigene Kategorie...</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Delete Button */}
          <div className="flex items-start">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(index)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Step4Images({ form }: StepComponentProps<SpaceFormValues>): React.ReactElement {
  const [customCategory, setCustomCategory] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<Record<number, boolean>>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Space-Bilder</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Lade Bilder für deinen Space hoch und organisiere sie optional nach Bereichen
        </p>
      </div>

      <FormField
        control={form.control}
        name="images"
        render={({ field }): React.ReactElement => {
          const imageInputs = (field.value || []) as Array<File | SpaceImageInput>;

          // Convert Files to SpaceImageInput structure
          const processedImages: SpaceImageInput[] = imageInputs.map((img, index) => {
            if (img instanceof File) {
              return {
                file: img,
                url: URL.createObjectURL(img),
                order: index,
                is_main: index === 0,
              };
            }
            return img as SpaceImageInput;
          });

          const handleFileChange = (files: File[]): void => {
            const newImages: SpaceImageInput[] = files.map((file, index) => ({
              file,
              url: URL.createObjectURL(file),
              order: processedImages.length + index,
              is_main: processedImages.length === 0 && index === 0,
            }));
            field.onChange([...processedImages, ...newImages]);
          };

          const handleRemove = (index: number): void => {
            const newImages = processedImages.filter((_, i) => i !== index);
            // Re-index and ensure first image is main if current main is removed
            const reindexed = newImages.map((img, i) => ({
              ...img,
              order: i,
              is_main: i === 0 ? true : (img.is_main && i !== 0 ? false : img.is_main),
            }));
            field.onChange(reindexed);
          };

          const handleSetMain = (index: number): void => {
            const newImages = processedImages.map((img, i) => ({
              ...img,
              is_main: i === index,
            }));
            field.onChange(newImages);
          };

          const handleCategoryChange = (index: number, category: string): void => {
            const newImages = [...processedImages];
            if (category === 'custom') {
              setShowCustomInput({ ...showCustomInput, [index]: true });
              return;
            }
            const currentImage = newImages[index];
            if (currentImage) {
              newImages[index] = {
                ...currentImage,
                order: currentImage.order ?? index,
                category: category === 'none' ? undefined : category,
              };
            }
            field.onChange(newImages);
            setShowCustomInput({ ...showCustomInput, [index]: false });
          };

          const handleCustomCategorySubmit = (index: number, category: string): void => {
            if (!category.trim()) return;
            const newImages = [...processedImages];
            const currentImage = newImages[index];
            if (currentImage) {
              newImages[index] = {
                ...currentImage,
                order: currentImage.order ?? index,
                category: category.trim(),
              };
            }
            field.onChange(newImages);
            setShowCustomInput({ ...showCustomInput, [index]: false });
            setCustomCategory('');
          };

          const handleDragEnd = (event: DragEndEvent): void => {
            const { active, over } = event;

            if (!over || active.id === over.id) return;

            const oldIndex = parseInt(active.id as string, 10);
            const newIndex = parseInt(over.id as string, 10);

            const reorderedImages = arrayMove(processedImages, oldIndex, newIndex);

            // Update order property and ensure first image is main
            const updatedImages = reorderedImages.map((img, i) => ({
              ...img,
              order: i,
              is_main: i === 0,
            }));

            field.onChange(updatedImages);
          };

          return (
            <FormItem>
              <FormLabel>Bilder hochladen</FormLabel>
              <FormDescription>
                Das erste Bild ist automatisch dein Hauptbild. Du kannst die Reihenfolge ändern und optional Bereiche zuweisen.
              </FormDescription>

              {/* File Upload Area */}
              <FileUpload
                value={[]}
                onChange={handleFileChange}
                maxFiles={20}
                maxSize={5 * 1024 * 1024}
              />

              {/* Uploaded Images List with Drag & Drop */}
              {processedImages.length > 0 && (
                <div className="space-y-3 mt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      Hochgeladene Bilder ({processedImages.length})
                    </p>
                  </div>

                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={processedImages.map((_, i) => i.toString())}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3">
                        {processedImages.map((img, index) => (
                          <SortableImageItem
                            key={index}
                            image={img}
                            index={index}
                            onSetMain={handleSetMain}
                            onCategoryChange={handleCategoryChange}
                            onCustomCategorySubmit={handleCustomCategorySubmit}
                            onRemove={handleRemove}
                            showCustomInput={showCustomInput[index] ?? false}
                            customCategory={customCategory}
                            setCustomCategory={setCustomCategory}
                            setShowCustomInput={(show) => setShowCustomInput({ ...showCustomInput, [index]: show })}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              )}

              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
