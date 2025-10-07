'use client';

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateServiceMultiStepForm } from './create-service/CreateServiceMultiStepForm';
import type { ServiceFormValues } from './create-service/schemas';
import { useCreateService, useUpdateService, useService } from '@/hooks/useServices';
import { useUser } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { servicesService } from '@/services/services.service';

interface CreateServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId?: string;
  mode?: 'create' | 'edit';
}

export function CreateServiceDialog({ open, onOpenChange, serviceId, mode = 'create' }: CreateServiceDialogProps): React.ReactElement {
  const createService = useCreateService();
  const updateService = useUpdateService();
  const { data: user } = useUser();
  const { data: service, isLoading } = useService(serviceId);

  const isEditMode = mode === 'edit' && !!serviceId;

  const defaultValues: Partial<ServiceFormValues> | undefined = React.useMemo(() => {
    if (!isEditMode || !service) return undefined;

    return {
      title: service.title,
      category: service.category ?? '',
      description: service.description ?? '',
      city: service.city ?? '',
      price_from: service.price_from ?? 0,
      price_unit: service.price_unit ?? '',
      service_area: service.service_area ?? '',
    };
  }, [isEditMode, service]);

  const handleSubmit = async (data: ServiceFormValues): Promise<void> => {
    if (!user) {
      toast.error('Du musst angemeldet sein');
      return;
    }

    try {
      const { images, ...serviceData } = data;

      // Filter only File objects (exclude URLs from edit mode)
      const fileImages = images?.filter((img): img is File => img instanceof File) ?? [];

      if (isEditMode && serviceId) {
        // Update service without images first
        await updateService.mutateAsync({
          id: serviceId,
          updates: serviceData,
        });

        // Upload new images if provided
        if (fileImages.length > 0) {
          await servicesService.uploadServiceImages(serviceId, fileImages);
        }

        toast.success('Service erfolgreich aktualisiert!');
      } else {
        // Create service first
        const newService = await createService.mutateAsync({
          ...serviceData,
          provider_id: user.id,
        });

        // Upload images if provided
        if (fileImages.length > 0 && newService.id) {
          await servicesService.uploadServiceImages(newService.id, fileImages);
        }

        toast.success('Service erfolgreich erstellt!');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(isEditMode ? 'Fehler beim Aktualisieren des Services' : 'Fehler beim Erstellen des Services');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Service bearbeiten' : 'Neuen Service erstellen'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Bearbeite deinen Service' : 'Erstelle einen neuen Service in wenigen Schritten'}
          </DialogDescription>
        </DialogHeader>
        {isEditMode && isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <CreateServiceMultiStepForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
