'use client';

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateSpaceMultiStepForm } from './create-space/CreateSpaceMultiStepForm';
import type { SpaceFormValues } from './create-space/schemas';
import { useCreateSpace, useUpdateSpace, useSpace } from '@/hooks/useSpaces';
import { useUser } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { spacesService } from '@/services/spaces.service';

interface CreateSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spaceId?: string;
  mode?: 'create' | 'edit';
}

export function CreateSpaceDialog({ open, onOpenChange, spaceId, mode = 'create' }: CreateSpaceDialogProps): React.ReactElement {
  const createSpace = useCreateSpace();
  const updateSpace = useUpdateSpace();
  const { data: user } = useUser();
  const { data: space, isLoading } = useSpace(spaceId);

  const isEditMode = mode === 'edit' && !!spaceId;

  const defaultValues: Partial<SpaceFormValues> | undefined = React.useMemo(() => {
    if (!isEditMode || !space) return undefined;

    return {
      name: space.name,
      space_category: space.type ?? '',
      description: space.description ?? '',
      address: space.address ?? '',
      city: space.city ?? '',
      size_sqm: space.size_sqm ?? 0,
      capacity: space.capacity ?? 0,
      hourly_price: space.hourly_price ?? 0,
      daily_price: space.daily_price ?? undefined,
      minimum_booking_hours: 1, // Default value as DB doesn't store this
    };
  }, [isEditMode, space]);

  const handleSubmit = async (data: SpaceFormValues): Promise<void> => {
    if (!user) {
      toast.error('Du musst angemeldet sein');
      return;
    }

    try {
      const { images, space_category, amenities, house_rules, custom_house_rules, ...spaceData } = data;

      // Extract Files and metadata from SpaceImageInput objects
      const imageFiles: File[] = [];
      const imageMetadata: Array<{ order: number; category?: string; is_main?: boolean }> = [];

      images?.forEach((img, index) => {
        if (img instanceof File) {
          imageFiles.push(img);
          imageMetadata.push({ order: index, is_main: index === 0 });
        } else if (typeof img === 'object' && img !== null && 'file' in img && img.file instanceof File) {
          imageFiles.push(img.file);
          imageMetadata.push({
            order: img.order ?? index,
            category: img.category,
            is_main: img.is_main ?? index === 0,
          });
        }
      });

      // Prepare amenities and house rules (combine standard + custom)
      const finalHouseRules = [...(house_rules ?? [])];
      if (custom_house_rules) {
        finalHouseRules.push(custom_house_rules);
      }

      if (isEditMode && spaceId) {
        // Update space without images first
        await updateSpace.mutateAsync({
          id: spaceId,
          updates: {
            ...spaceData,
            type: space_category,
            hourly_price: data.hourly_price,
            daily_price: data.daily_price,
            minimum_booking_hours: data.minimum_booking_hours,
            amenities: amenities ?? [],
            house_rules: finalHouseRules,
          },
        });

        // Upload new images if provided
        if (imageFiles.length > 0) {
          const uploadedUrls = await spacesService.uploadSpaceImages(spaceId, imageFiles);

          // Create JSONB array with metadata
          const imageObjects = uploadedUrls.map((url, i) => ({
            url,
            order: imageMetadata[i]?.order ?? i,
            category: imageMetadata[i]?.category,
            is_main: imageMetadata[i]?.is_main ?? i === 0,
          }));

          // Update space with full image objects
          await spacesService.updateSpace(spaceId, { images: imageObjects });
        }

        toast.success('Space erfolgreich aktualisiert!');
      } else {
        // Create space first
        const newSpace = await createSpace.mutateAsync({
          ...spaceData,
          type: space_category,
          owner_id: user.id,
          minimum_booking_hours: data.minimum_booking_hours,
          amenities: amenities ?? [],
          house_rules: finalHouseRules,
        });

        // Upload images if provided
        if (imageFiles.length > 0 && newSpace.id) {
          const uploadedUrls = await spacesService.uploadSpaceImages(newSpace.id, imageFiles);

          // Create JSONB array with metadata
          const imageObjects = uploadedUrls.map((url, i) => ({
            url,
            order: imageMetadata[i]?.order ?? i,
            category: imageMetadata[i]?.category,
            is_main: imageMetadata[i]?.is_main ?? i === 0,
          }));

          // Update space with full image objects
          await spacesService.updateSpace(newSpace.id, { images: imageObjects });
        }

        toast.success('Space erfolgreich erstellt!');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(isEditMode ? 'Fehler beim Aktualisieren des Spaces' : 'Fehler beim Erstellen des Spaces');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Space bearbeiten' : 'Neuen Space erstellen'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Bearbeite deinen Space' : 'Erstelle einen neuen Space in wenigen Schritten'}
          </DialogDescription>
        </DialogHeader>
        {isEditMode && isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <CreateSpaceMultiStepForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
