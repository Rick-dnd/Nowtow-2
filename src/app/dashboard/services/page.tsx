'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Loader2, MapPin, Share2, Trash2, Edit, Eye, Briefcase } from 'lucide-react';
import { useProviderServices, useDeleteService } from '@/hooks/useServices';
import { useUser } from '@/hooks/useAuth';
import { CreateServiceDialog } from '@/components/dashboard/CreateServiceDialog';
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

export default function ServicesPage(): React.ReactElement {
  const { data: user } = useUser();
  const { data: services, isLoading, error } = useProviderServices(user?.id);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [serviceToDelete, setServiceToDelete] = React.useState<string | null>(null);
  const [editServiceId, setEditServiceId] = React.useState<string | undefined>(undefined);
  const deleteService = useDeleteService();
  const router = useRouter();

  const handleShare = async (serviceId: string): Promise<void> => {
    const url = `${window.location.origin}/services/${serviceId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link kopiert!');
    } catch {
      toast.error('Fehler beim Kopieren des Links');
    }
  };

  const handleEdit = (serviceId: string): void => {
    setEditServiceId(serviceId);
    setIsCreateDialogOpen(true);
  };

  const handleViewBookings = (serviceId: string): void => {
    router.push(`/dashboard/bookings?serviceId=${serviceId}`);
  };

  const confirmDelete = (serviceId: string): void => {
    setServiceToDelete(serviceId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async (): Promise<void> => {
    if (!serviceToDelete) return;

    try {
      await deleteService.mutateAsync(serviceToDelete);
      toast.success('Service erfolgreich gelöscht');
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    } catch (err) {
      toast.error('Fehler beim Löschen des Services');
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
        <p className="text-muted-foreground">Fehler beim Laden der Services</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground mt-1">Verwalte deine Service-Angebote</p>
        </div>
        <Button
          className="bg-gradient-to-r from-primary to-emerald-600"
          onClick={(): void => setIsCreateDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Service erstellen
        </Button>
      </div>

      {(!services || services.length === 0) ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Du hast noch keine Services erstellt</p>
            <Button onClick={(): void => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Ersten Service erstellen
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {services.map((service): React.ReactElement => {
            // Get first image from images array
            const imageUrl = ((): string | null => {
              if (service.images && Array.isArray(service.images) && service.images.length > 0) {
                const firstImage = service.images[0];
                return typeof firstImage === 'string' ? firstImage : null;
              }
              return null;
            })();

            return (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Image Thumbnail */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle>{service.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {service.city}
                          </CardDescription>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 flex-shrink-0">Aktiv</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Kategorie</p>
                    <p className="font-medium">{service.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Preis</p>
                    <p className="font-medium">
                      ab €{service.price_from}
                      {service.price_unit && <span className="text-sm text-muted-foreground">/{service.price_unit}</span>}
                    </p>
                  </div>
                  {service.service_area && (
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Servicegebiet</p>
                      <p className="font-medium">{service.service_area}</p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1" onClick={(): void => handleEdit(service.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Bearbeiten
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={(): void => handleViewBookings(service.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Buchungen ansehen
                  </Button>
                  <Button variant="outline" onClick={(): Promise<void> => handleShare(service.id)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={(): void => confirmDelete(service.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>
      )}

      <CreateServiceDialog
        open={isCreateDialogOpen}
        onOpenChange={(open): void => {
          setIsCreateDialogOpen(open);
          if (!open) setEditServiceId(undefined);
        }}
        serviceId={editServiceId}
        mode={editServiceId ? 'edit' : 'create'}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Service löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Der Service wird dauerhaft gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteService.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
