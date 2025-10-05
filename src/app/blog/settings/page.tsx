'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Settings, Bell, Eye, Mail, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function BlogSettingsPage(): React.ReactElement {
  const [notifyNewPosts, setNotifyNewPosts] = useState(true);
  const [notifyComments, setNotifyComments] = useState(true);
  const [notifyFollows, setNotifyFollows] = useState(false);
  const [notifyLikes, setNotifyLikes] = useState(false);
  const [showReadingHistory, setShowReadingHistory] = useState(true);
  const [emailDigest, setEmailDigest] = useState<string>('weekly');

  const handleSaveSettings = (): void => {
    toast.success('Einstellungen gespeichert');
    console.log('Saving settings...');
  };

  const handleExportData = (): void => {
    toast.success('Datenexport wird vorbereitet...');
    console.log('Exporting data...');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Blog Einstellungen</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Verwalte deine Blog-Präferenzen und Benachrichtigungen
            </p>
          </div>

          <div className="space-y-6">
            {/* Notifications Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Benachrichtigungen
                </CardTitle>
                <CardDescription>
                  Wähle aus, über welche Aktivitäten du benachrichtigt werden möchtest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-posts">Neue Posts</Label>
                    <p className="text-sm text-muted-foreground">
                      Benachrichtigungen bei neuen Posts von gefolgten Autoren
                    </p>
                  </div>
                  <Switch
                    id="notify-posts"
                    checked={notifyNewPosts}
                    onCheckedChange={setNotifyNewPosts}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-comments">Kommentare</Label>
                    <p className="text-sm text-muted-foreground">
                      Benachrichtigungen bei Antworten auf deine Kommentare
                    </p>
                  </div>
                  <Switch
                    id="notify-comments"
                    checked={notifyComments}
                    onCheckedChange={setNotifyComments}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-follows">Neue Follower</Label>
                    <p className="text-sm text-muted-foreground">
                      Benachrichtigungen wenn dir jemand folgt
                    </p>
                  </div>
                  <Switch
                    id="notify-follows"
                    checked={notifyFollows}
                    onCheckedChange={setNotifyFollows}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-likes">Likes</Label>
                    <p className="text-sm text-muted-foreground">
                      Benachrichtigungen bei Likes auf deine Artikel
                    </p>
                  </div>
                  <Switch
                    id="notify-likes"
                    checked={notifyLikes}
                    onCheckedChange={setNotifyLikes}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Email Digest */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  E-Mail Digest
                </CardTitle>
                <CardDescription>
                  Erhalte Zusammenfassungen der beliebtesten Artikel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-frequency">Häufigkeit</Label>
                    <Select value={emailDigest} onValueChange={setEmailDigest}>
                      <SelectTrigger id="email-frequency">
                        <SelectValue placeholder="Wähle Häufigkeit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Nie</SelectItem>
                        <SelectItem value="daily">Täglich</SelectItem>
                        <SelectItem value="weekly">Wöchentlich</SelectItem>
                        <SelectItem value="monthly">Monatlich</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Aktuelle Einstellung:{' '}
                      {emailDigest === 'never' && 'Keine E-Mails'}
                      {emailDigest === 'daily' && 'Täglich'}
                      {emailDigest === 'weekly' && 'Jeden Montag'}
                      {emailDigest === 'monthly' && 'Am 1. des Monats'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Datenschutz
                </CardTitle>
                <CardDescription>
                  Steuere die Sichtbarkeit deiner Aktivitäten
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-history">Lesehistorie anzeigen</Label>
                    <p className="text-sm text-muted-foreground">
                      Zeige anderen Nutzern, welche Artikel du gelesen hast
                    </p>
                  </div>
                  <Switch
                    id="show-history"
                    checked={showReadingHistory}
                    onCheckedChange={setShowReadingHistory}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Blocked Content */}
            <Card>
              <CardHeader>
                <CardTitle>Blockierte Inhalte</CardTitle>
                <CardDescription>
                  Autoren und Kategorien, die du blockiert hast
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Du hast keine Autoren oder Kategorien blockiert
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Export */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Daten exportieren
                </CardTitle>
                <CardDescription>
                  Lade eine Kopie deiner Blog-Daten herunter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Du kannst eine Kopie deiner Artikel, Kommentare, Likes und Lesezeichen als
                  JSON-Datei herunterladen.
                </p>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Daten exportieren
                </Button>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Button variant="outline">Abbrechen</Button>
              <Button onClick={handleSaveSettings}>Einstellungen speichern</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
