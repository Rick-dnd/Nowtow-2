'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, MapPin, Loader2, Share2, Trash2, Edit, Eye, Building2 } from 'lucide-react';
import { useOwnerSpaces, useDeleteSpace } from '@/hooks/useSpaces';
import { useUser } from '@/hooks/useAuth';
import { CreateSpaceDialog } from '@/components/dashboard/CreateSpaceDialog';
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

export default function SpacesPage(): React.ReactElement {
  const { data: user } = useUser();
  const { data: spaces, isLoading, error } = useOwnerSpaces(user?.id);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [spaceToDelete, setSpaceToDelete] = React.useState<string | null>(null);
  const [editSpaceId, setEditSpaceId] = React.useState<string | undefined>(undefined);
  const deleteSpace = useDeleteSpace();
  const router = useRouter();

  const handleShare = async (spaceId: string): Promise<void> => {
    const url = `${window.location.origin}/spaces/${spaceId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link kopiert!');
    } catch {
      toast.error('Fehler beim Kopieren des Links');
    }
  };

  const handleEdit = (spaceId: string): void => {
    setEditSpaceId(spaceId);
    setIsCreateDialogOpen(true);
  };

  const handleViewBookings = (spaceId: string): void => {
    router.push(`/dashboard/bookings?spaceId=${spaceId}`);
  };

  const confirmDelete = (spaceId: string): void => {
    setSpaceToDelete(spaceId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async (): Promise<void> => {
    if (!spaceToDelete) return;

    try {
      await deleteSpace.mutateAsync(spaceToDelete);
      toast.success('Space erfolgreich gelöscht');
      setDeleteDialogOpen(false);
      setSpaceToDelete(null);
    } catch (err) {
      toast.error('Fehler beim Löschen des Spaces');
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
        <p className="text-muted-foreground">Fehler beim Laden der Spaces</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Spaces</h1>
          <p className="text-muted-foreground mt-1">Verwalte deine Space-Angebote</p>
        </div>
        <Button
          className="bg-gradient-to-r from-primary to-emerald-600"
          onClick={(): void => setIsCreateDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Space hinzufügen
        </Button>
      </div>

      {(!spaces || spaces.length === 0) ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Du hast noch keine Spaces erstellt</p>
            <Button onClick={(): void => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Ersten Space erstellen
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {spaces.map((space) => {
            // Get first image from images array or fallback to image_url
            const imageUrl = ((): string | null => {
              if (space.images && Array.isArray(space.images) && space.images.length > 0) {
                const firstImage = space.images[0];
                if (typeof firstImage === 'string') {
                  return firstImage;
                } else if (typeof firstImage === 'object' && firstImage !== null && 'url' in firstImage && typeof firstImage.url === 'string') {
                  return firstImage.url;
                }
              }
              return space.image_url;
            })();

            return (
              <Card key={space.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Image Thumbnail */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={space.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle>{space.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {space.city}
                          </CardDescription>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 flex-shrink-0">Aktiv</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Typ</p>
                    <p className="font-medium">{space.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tarife</p>
                    <p className="font-medium">€{space.hourly_price}/Std</p>
                    {space.daily_price && (
                      <p className="text-sm text-muted-foreground">€{space.daily_price}/Tag</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Größe</p>
                    <p className="font-medium">{space.size_sqm} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kapazität</p>
                    <p className="font-medium">{space.capacity} Personen</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    {space.booking_mode === 'instant' && (
                      <Badge variant="outline" className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Sofortbuchung
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={(): void => handleEdit(space.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Bearbeiten
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={(): void => handleViewBookings(space.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Buchungen ansehen
                  </Button>
                  <Button variant="outline" onClick={(): Promise<void> => handleShare(space.id)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={(): void => confirmDelete(space.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>
      )}

      <CreateSpaceDialog
        open={isCreateDialogOpen}
        onOpenChange={(open): void => {
          setIsCreateDialogOpen(open);
          if (!open) setEditSpaceId(undefined);
        }}
        spaceId={editSpaceId}
        mode={editSpaceId ? 'edit' : 'create'}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Space löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Der Space wird dauerhaft gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteSpace.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
