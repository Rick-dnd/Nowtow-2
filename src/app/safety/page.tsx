import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Phone, AlertTriangle } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const participantGuidelines = [
  'Triff dich an öffentlichen Orten',
  'Teile deinen Standort mit Freunden',
  'Zahle nur über Nowtown',
  'Vertraue deinem Bauchgefühl',
  'Melde verdächtiges Verhalten',
];

const hostGuidelines = [
  'Verifiziere deine Identität',
  'Kommuniziere klar und transparent',
  'Halte Notfallkontakte bereit',
  'Dokumentiere alles',
  'Versichere deine Events/Räume',
];

const verificationFeatures = [
  { label: 'ID Verification', description: 'Government ID erforderlich' },
  { label: 'Email Verification', description: 'Bestätigte E-Mail-Adresse' },
  { label: 'Phone Verification', description: 'Verifizierte Telefonnummer' },
  { label: 'Trust Score System', description: 'Bewertung basierend auf Verhalten' },
  { label: 'Review System', description: 'Echte Bewertungen von Nutzern' },
];

const reportingSteps = [
  'Klicke auf [...] im Post/Event',
  'Wähle "Melden"',
  'Wähle den Grund aus',
  'Füge Details hinzu',
  'Sende Bericht ab',
];

export default function SafetyPage(): React.ReactElement {
  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Sicherheit bei Nowtown</h1>
          <p className="text-xl text-muted-foreground">
            Deine Sicherheit ist unsere Priorität
          </p>
        </div>

        {/* Safety Guidelines */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* For Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                Für Teilnehmer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {participantGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2 font-bold">✓</span>
                    <span className="text-muted-foreground">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* For Hosts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                Für Gastgeber
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {hostGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2 font-bold">✓</span>
                    <span className="text-muted-foreground">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Verification System */}
        <Card>
          <CardHeader>
            <CardTitle>Unser Verifizierungssystem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {verificationFeatures.map((feature) => (
                <div key={feature.label} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{feature.label}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reporting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
              Wie melde ich ein Problem?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {reportingSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted-foreground bg-muted p-4 rounded-lg">
              <strong>Wichtig:</strong> Wir prüfen alle Berichte innerhalb von 24 Stunden und ergreifen
              entsprechende Maßnahmen zum Schutz unserer Community.
            </p>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Phone className="mr-2 h-5 w-5" />
              Notfall-Kontakte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">24/7 Safety Line:</p>
              <a href="tel:+4989XXXXXXX" className="text-primary hover:underline text-lg font-bold">
                +49 89 XXXXXXX
              </a>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Safety Email:</p>
              <a href="mailto:safety@nowtown.co" className="text-primary hover:underline">
                safety@nowtown.co
              </a>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-4">
              <p className="text-sm text-amber-900">
                <strong>Bei unmittelbarer Gefahr:</strong> Rufe sofort die Polizei unter <strong>110</strong> oder
                den Notarzt unter <strong>112</strong>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="pt-6 text-center space-y-4">
            <h3 className="font-semibold text-lg">Weitere Ressourcen</h3>
            <p className="text-muted-foreground">
              Besuche unser Hilfe-Center für detaillierte Sicherheitstipps
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-accent">
              <a href="/help">Zum Hilfe-Center</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
}
