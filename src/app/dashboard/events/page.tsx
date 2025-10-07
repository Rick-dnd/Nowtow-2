'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Loader2, Calendar, Users, DollarSign, Share2, Trash2, Edit, Eye } from 'lucide-react';
import { useOrganizerEvents, useDeleteEvent } from '@/hooks/useEvents';
import { useUser } from '@/hooks/useAuth';
import { CreateEventDialog } from '@/components/dashboard/CreateEventDialog';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function EventsPage(): React.ReactElement {
  const { data: user } = useUser();
  const { data: events, isLoading, error } = useOrganizerEvents(user?.id);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [eventToDelete, setEventToDelete] = React.useState<string | null>(null);
  const [editEventId, setEditEventId] = React.useState<string | undefined>(undefined);
  const deleteEvent = useDeleteEvent();
  const router = useRouter();

  const handleShare = async (eventId: string): Promise<void> => {
    const url = `${window.location.origin}/events/${eventId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link kopiert!');
    } catch {
      toast.error('Fehler beim Kopieren des Links');
    }
  };

  const handleEdit = (eventId: string): void => {
    setEditEventId(eventId);
    setIsCreateDialogOpen(true);
  };

  const handleViewAttendees = (eventId: string): void => {
    router.push(`/dashboard/bookings?eventId=${eventId}`);
  };

  const confirmDelete = (eventId: string): void => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async (): Promise<void> => {
    if (!eventToDelete) return;

    try {
      await deleteEvent.mutateAsync(eventToDelete);
      toast.success('Event erfolgreich gelöscht');
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (err) {
      toast.error('Fehler beim Löschen des Events');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Fehler beim Laden der Events</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-1">Verwalte deine Event-Angebote</p>
        </div>
        <Button
          className="bg-gradient-to-r from-primary to-emerald-600"
          onClick={(): void => setIsCreateDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Event erstellen
        </Button>
      </div>

      {(!events || events.length === 0) ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Du hast noch keine Events erstellt</p>
            <Button onClick={(): void => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Erstes Event erstellen
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {events.map((event): React.ReactElement => {
            const startDate = event.start_datetime ? new Date(event.start_datetime) : null;

            // Get first image from images array or fallback to image_url
            const imageUrl = ((): string | null => {
              if (event.images && Array.isArray(event.images) && event.images.length > 0) {
                const firstImage = event.images[0];
                return typeof firstImage === 'string' ? firstImage : null;
              }
              return event.image_url;
            })();

            return (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Image Thumbnail */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={event.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle>{event.name}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {startDate && format(startDate, 'dd.MM.yyyy HH:mm', { locale: de })}
                            </span>
                            {event.city && (
                              <span>📍 {event.city}</span>
                            )}
                          </CardDescription>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 flex-shrink-0">
                          {event.status === 'published' ? 'Aktiv' : event.status === 'draft' ? 'Entwurf' : 'Archiviert'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Kategorie</p>
                      <p className="font-medium">{event.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Preis
                      </p>
                      <p className="font-medium">
                        {event.ticket_price === 0 ? 'Kostenlos' : `€${event.ticket_price}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Kapazität
                      </p>
                      <p className="font-medium">
                        {event.current_attendees ?? 0}/{event.max_attendees}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Veranstaltungsort</p>
                      <p className="font-medium">{event.venue_name}</p>
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={(): void => handleEdit(event.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Bearbeiten
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={(): void => handleViewAttendees(event.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Teilnehmer ansehen
                    </Button>
                    <Button variant="outline" onClick={(): Promise<void> => handleShare(event.id)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Teilen
                    </Button>
                    <Button variant="outline" onClick={(): void => confirmDelete(event.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <CreateEventDialog
        open={isCreateDialogOpen}
        onOpenChange={(open): void => {
          setIsCreateDialogOpen(open);
          if (!open) setEditEventId(undefined);
        }}
        eventId={editEventId}
        mode={editEventId ? 'edit' : 'create'}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Event löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Das Event wird dauerhaft gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteEvent.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
