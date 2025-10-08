'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, FileText, Shield } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useApplyForAuthor } from '@/hooks/useBlogAuthor';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const authorApplicationSchema = z.object({
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: 'Du musst die Regeln und Datenschutzerklärung akzeptieren',
  }),
});

type AuthorApplicationFormData = z.infer<typeof authorApplicationSchema>;

interface AuthorApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthorApplicationDialog({
  open,
  onOpenChange,
}: AuthorApplicationDialogProps): React.ReactElement {
  const { profile } = useAuth();
  const applyForAuthor = useApplyForAuthor();
  const [showRules, setShowRules] = useState(false);

  const form = useForm<AuthorApplicationFormData>({
    resolver: zodResolver(authorApplicationSchema),
    defaultValues: {
      acceptedTerms: false,
    },
  });

  const onSubmit = async (): Promise<void> => {
    if (!profile?.id) {
      toast.error('Du musst angemeldet sein, um dich zu bewerben');
      return;
    }

    try {
      await applyForAuthor.mutateAsync(profile.id);

      toast.success('Bewerbung eingereicht! Wir prüfen deine Anfrage.');
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error('Fehler beim Einreichen der Bewerbung');
      console.error(error);
    }
  };

  if (showRules) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Regeln für Blog-Autoren
            </DialogTitle>
            <DialogDescription>
              Bitte lies diese Regeln sorgfältig durch, bevor du dich bewirbst.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">1. Inhaltsrichtlinien</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Alle Inhalte müssen original und selbst verfasst sein</li>
                <li>Keine Plagiate oder urheberrechtlich geschützten Inhalte</li>
                <li>Respektvoller Umgang mit anderen Nutzern und Themen</li>
                <li>
                  Keine diskriminierenden, beleidigenden oder illegalen Inhalte
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Qualitätsstandards</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Mindestens 500 Wörter pro Artikel</li>
                <li>Korrekte Rechtschreibung und Grammatik</li>
                <li>Strukturierter Aufbau mit Überschriften</li>
                <li>Relevante und ansprechende Themen</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Veröffentlichung</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>
                  Artikel werden vor Veröffentlichung von unserem Team geprüft
                </li>
                <li>
                  Wir behalten uns das Recht vor, Änderungen vorzuschlagen
                </li>
                <li>Mindestens 1 Artikel pro Monat (für aktive Autoren)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Datenschutzerklärung
              </h3>
              <p className="text-muted-foreground">
                Deine Daten werden gemäß unserer Datenschutzerklärung verarbeitet.
                Wir speichern deinen Namen, E-Mail-Adresse und die
                Bewerbungsinformationen. Diese Daten werden ausschließlich zur
                Bearbeitung deiner Bewerbung verwendet und nicht an Dritte
                weitergegeben.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={(): void => setShowRules(false)}>
              Zurück zur Bewerbung
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Werde Blog-Autor bei Nowtown</DialogTitle>
          <DialogDescription>
            Teile dein Wissen und deine Erfahrungen mit der Nowtown Community.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-sm text-muted-foreground">
            <p>
              Als Blog-Autor bei Nowtown kannst du dein Wissen und deine
              Erfahrungen mit der Community teilen. Du erhältst Zugang zum
              Blog-Editor und kannst eigene Artikel verfassen.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="acceptedTerms"
                render={({ field }): React.ReactElement => (
                  <FormItem className="space-y-3 rounded-md border p-4">
                    <div className="flex items-center space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal leading-normal cursor-pointer">
                        Ich habe die{' '}
                        <button
                          type="button"
                          className="text-primary hover:underline"
                          onClick={(): void => setShowRules(true)}
                        >
                          Regeln & Datenschutzerklärung
                        </button>{' '}
                        gelesen und akzeptiert *
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={(): void => onOpenChange(false)}
                >
                  Abbrechen
                </Button>
                <Button
                  type="submit"
                  disabled={
                    !form.watch('acceptedTerms') || applyForAuthor.isPending
                  }
                >
                  {applyForAuthor.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Bewerbung einreichen
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
