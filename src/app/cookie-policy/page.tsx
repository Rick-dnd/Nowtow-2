'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Cookie, Check } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export default function CookiePolicyPage(): React.ReactElement {
  return (
    <>
    <CookiePolicyContent />
    <Footer />
    </>
  );
}

function CookiePolicyContent(): React.ReactElement {
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSavePreferences = (): void => {
    // Save to localStorage or API
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      functional,
      analytics,
      marketing,
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = (): void => {
    setFunctional(true);
    setAnalytics(true);
    setMarketing(true);
    setTimeout(() => handleSavePreferences(), 100);
  };

  const handleRejectAll = (): void => {
    setFunctional(false);
    setAnalytics(false);
    setMarketing(false);
    setTimeout(() => handleSavePreferences(), 100);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Cookie className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Cookie-Richtlinie</h1>
          <p className="text-muted-foreground text-lg">
            Verwalte deine Cookie-Einstellungen
          </p>
        </div>

        {/* What are Cookies */}
        <Card>
          <CardHeader>
            <CardTitle>Was sind Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Cookies sind kleine Textdateien, die auf deinem Gerät gespeichert werden, wenn du eine
              Website besuchst. Sie helfen uns, dir eine bessere Nutzererfahrung zu bieten.
            </p>
            <p>
              Wir verwenden verschiedene Arten von Cookies für unterschiedliche Zwecke. Du kannst
              deine Cookie-Einstellungen jederzeit anpassen.
            </p>
          </CardContent>
        </Card>

        {/* Cookie Categories */}
        <div className="space-y-4">
          {/* Necessary Cookies */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    Notwendige Cookies
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Immer aktiv</p>
                </div>
                <Switch checked disabled aria-label="Notwendige Cookies (immer aktiv)" />
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                Diese Cookies sind für die Basisfunktionen der Website erforderlich und können nicht
                deaktiviert werden.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Authentication (Anmeldestatus)</li>
                <li>Session Management (Sitzungsverwaltung)</li>
                <li>Security (Sicherheitsfeatures)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Functional Cookies */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Funktionale Cookies</CardTitle>
                  <p className="text-sm text-muted-foreground">Optional</p>
                </div>
                <Switch
                  checked={functional}
                  onCheckedChange={setFunctional}
                  id="functional"
                  aria-label="Funktionale Cookies"
                />
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                Diese Cookies verbessern die Benutzererfahrung, indem sie deine Präferenzen speichern.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Spracheinstellungen</li>
                <li>Theme-Auswahl (Hell/Dunkel-Modus)</li>
                <li>Regionale Einstellungen</li>
              </ul>
            </CardContent>
          </Card>

          {/* Analytics Cookies */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Analytics Cookies</CardTitle>
                  <p className="text-sm text-muted-foreground">Optional</p>
                </div>
                <Switch
                  checked={analytics}
                  onCheckedChange={setAnalytics}
                  id="analytics"
                  aria-label="Analytics Cookies"
                />
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                Diese Cookies helfen uns zu verstehen, wie du die Website nutzt, damit wir sie
                verbessern können.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Google Analytics (anonymisiert)</li>
                <li>Vercel Analytics</li>
                <li>Nutzungsstatistiken</li>
              </ul>
            </CardContent>
          </Card>

          {/* Marketing Cookies */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Marketing Cookies</CardTitle>
                  <p className="text-sm text-muted-foreground">Optional</p>
                </div>
                <Switch
                  checked={marketing}
                  onCheckedChange={setMarketing}
                  id="marketing"
                  aria-label="Marketing Cookies"
                />
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                Diese Cookies werden verwendet, um dir personalisierte Werbung anzuzeigen.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Social Media Pixels (Facebook, Instagram)</li>
                <li>Ad Retargeting</li>
                <li>Personalisierte Werbung</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            {saved && (
              <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-emerald-700 font-medium text-center">
                  ✓ Einstellungen gespeichert!
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSavePreferences}
                variant="outline"
                className="flex-1"
              >
                Auswahl speichern
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="flex-1 bg-gradient-to-r from-primary to-accent"
              >
                Alle akzeptieren
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="ghost"
                className="flex-1"
              >
                Alle ablehnen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6 text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Hinweis:</strong> Du kannst deine Cookie-Einstellungen jederzeit ändern,
              indem du diese Seite erneut besuchst.
            </p>
            <p>
              Für weitere Informationen lies unsere{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Datenschutzerklärung
              </a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
