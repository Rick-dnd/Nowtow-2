'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Cookie, Settings } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean; // Always true
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'nowtown-cookie-consent';

export function CookieBanner(): React.ReactElement | null {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Check if user has already given consent
  useEffect((): void => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences): void => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setShowBanner(false);
    setShowPreferences(false);
    // TODO: Apply cookie preferences to actual analytics/marketing scripts
    console.log('Cookie preferences saved:', prefs);
  };

  const handleAcceptAll = (): void => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = (): void => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyNecessary);
  };

  const handleSaveCustom = (): void => {
    savePreferences(preferences);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t shadow-lg"
        role="dialog"
        aria-label="Cookie-Einstellungen"
        aria-live="polite"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Icon + Text */}
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h2 className="font-semibold text-lg mb-1">Diese Website verwendet Cookies</h2>
                <p className="text-sm text-muted-foreground">
                  Wir verwenden Cookies, um deine Erfahrung zu verbessern, Website-Analyse durchzuführen und personalisierte Inhalte anzuzeigen.
                  {' '}
                  <a
                    href="/cookie-policy"
                    className="underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    Weitere Informationen
                  </a>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPreferences(true)}
                className="gap-2"
                aria-label="Cookie-Einstellungen anpassen"
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
                Anpassen
              </Button>
              <Button
                variant="outline"
                onClick={handleRejectAll}
                aria-label="Alle optionalen Cookies ablehnen"
              >
                Ablehnen
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="bg-primary"
                aria-label="Alle Cookies akzeptieren"
              >
                Alle akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          aria-describedby="cookie-preferences-description"
        >
          <DialogHeader>
            <DialogTitle>Cookie-Einstellungen</DialogTitle>
            <DialogDescription id="cookie-preferences-description">
              Wähle, welche Arten von Cookies du zulassen möchtest. Notwendige Cookies können nicht deaktiviert werden.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Necessary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Notwendige Cookies</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      Diese Cookies sind erforderlich, damit die Website funktioniert.
                    </CardDescription>
                  </div>
                  <Switch
                    checked={true}
                    disabled={true}
                    aria-label="Notwendige Cookies (immer aktiv)"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Beinhaltet: Session-Management, Sicherheit, Formular-Daten
                </p>
              </CardContent>
            </Card>

            {/* Functional */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Funktionale Cookies</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      Ermöglichen verbesserte Funktionalität und Personalisierung.
                    </CardDescription>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, functional: checked })
                    }
                    aria-label="Funktionale Cookies aktivieren/deaktivieren"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Beinhaltet: Sprachpräferenzen, Themenwahl (Dark Mode), gespeicherte Filter
                </p>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Analyse-Cookies</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      Helfen uns zu verstehen, wie Besucher mit der Website interagieren.
                    </CardDescription>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, analytics: checked })
                    }
                    aria-label="Analyse-Cookies aktivieren/deaktivieren"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Beinhaltet: Google Analytics, Seitenaufrufe, Klick-Tracking
                </p>
              </CardContent>
            </Card>

            {/* Marketing */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Marketing-Cookies</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      Werden verwendet, um relevante Werbung anzuzeigen.
                    </CardDescription>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, marketing: checked })
                    }
                    aria-label="Marketing-Cookies aktivieren/deaktivieren"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Beinhaltet: Facebook Pixel, Google Ads, Retargeting
                </p>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleRejectAll}>
              Nur notwendige
            </Button>
            <Button onClick={handleSaveCustom}>
              Auswahl speichern
            </Button>
            <Button onClick={handleAcceptAll} className="bg-primary">
              Alle akzeptieren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
