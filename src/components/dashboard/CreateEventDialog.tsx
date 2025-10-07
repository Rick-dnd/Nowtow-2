'use client';

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateEventMultiStepForm } from './create-event/CreateEventMultiStepForm';
import type { EventFormValues } from './create-event/schemas';
import { useCreateEvent, useUpdateEvent, useEvent } from '@/hooks/useEvents';
import { useUser } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { eventsService } from '@/services/events.service';

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId?: string;
  mode?: 'create' | 'edit';
}

export function CreateEventDialog({ open, onOpenChange, eventId, mode = 'create' }: CreateEventDialogProps): React.ReactElement {
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const { data: user } = useUser();
  const { data: event, isLoading } = useEvent(eventId);

  const isEditMode = mode === 'edit' && !!eventId;

  const defaultValues: Partial<EventFormValues> | undefined = React.useMemo(() => {
    if (!isEditMode || !event) return undefined;

    return {
      name: event.name,
      category: event.category ?? '',
      description: event.description ?? '',
      venue_name: event.venue_name ?? '',
      address: event.address ?? '',
      city: event.city ?? '',
      district: event.district ?? '',
      start_datetime: event.start_datetime ? new Date(event.start_datetime) : undefined,
      end_datetime: event.end_datetime ? new Date(event.end_datetime) : undefined,
      ticket_price: event.ticket_price ?? 0,
      max_attendees: event.max_attendees ?? 100,
      min_age: event.min_age ?? undefined,
      dress_code: event.dress_code ?? '',
      cancellation_policy: event.cancellation_policy ?? '',
    };
  }, [isEditMode, event]);

  const handleSubmit = async (data: EventFormValues): Promise<void> => {
    if (!user) {
      toast.error('Du musst angemeldet sein');
      return;
    }

    try {
      const { images, ...eventData } = data;

      // Filter only File objects (exclude URLs from edit mode)
      const fileImages = images?.filter((img): img is File => img instanceof File) ?? [];

      if (isEditMode && eventId) {
        // Update event without images first
        await updateEvent.mutateAsync({
          id: eventId,
          updates: {
            ...eventData,
            start_datetime: data.start_datetime.toISOString(),
            end_datetime: data.end_datetime.toISOString(),
          },
        });

        // Upload new images if provided
        if (fileImages.length > 0) {
          await eventsService.uploadEventImages(eventId, fileImages);
        }

        toast.success('Event erfolgreich aktualisiert!');
      } else {
        // Create event first
        const newEvent = await createEvent.mutateAsync({
          ...eventData,
          organizer_id: user.id,
          start_datetime: data.start_datetime.toISOString(),
          end_datetime: data.end_datetime.toISOString(),
        });

        // Upload images if provided
        if (fileImages.length > 0 && newEvent.id) {
          await eventsService.uploadEventImages(newEvent.id, fileImages);
        }

        toast.success('Event erfolgreich erstellt!');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(isEditMode ? 'Fehler beim Aktualisieren des Events' : 'Fehler beim Erstellen des Events');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Event bearbeiten' : 'Neues Event erstellen'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Bearbeite dein Event' : 'Erstelle ein neues Event in wenigen Schritten'}
          </DialogDescription>
        </DialogHeader>
        {isEditMode && isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <CreateEventMultiStepForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            isEditing={isEditMode}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
