import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage(): React.ReactElement {
  return (
    <>
    <TermsContent />
    <Footer />
    </>
  );
}

function TermsContent(): React.ReactElement {
  const sections = [
    {
      title: '1. Geltungsbereich',
      content: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der Nowtown GmbH ("Nowtown", "wir", "uns") und den Nutzern ("Nutzer", "Sie") der Plattform nowtown.co.

Durch die Nutzung unserer Dienste stimmen Sie diesen AGB zu.`,
    },
    {
      title: '2. Vertragsschluss',
      content: `Die Darstellung der Angebote auf unserer Plattform stellt kein rechtlich bindendes Angebot dar.

Durch Klicken auf "Jetzt buchen" oder "Kaufen" geben Sie ein verbindliches Angebot zum Abschluss eines Vertrages ab. Der Vertrag kommt mit der Zusendung einer Buchungsbestätigung per E-Mail zustande.`,
    },
    {
      title: '3. Nutzer-Account',
      content: `Zur Nutzung bestimmter Funktionen ist die Erstellung eines Accounts erforderlich.

Sie sind verpflichtet:
• Wahrheitsgemäße Angaben zu machen
• Ihre Zugangsdaten geheim zu halten
• Uns unverzüglich über unbefugte Nutzung zu informieren

Nowtown behält sich vor, Accounts bei Verstoß gegen diese AGB zu sperren.`,
    },
    {
      title: '4. Buchungen und Zahlungen',
      content: `Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.

Zahlungsmethoden: Kreditkarte, PayPal, Apple Pay, Google Pay

Die Zahlung ist sofort nach Vertragsschluss fällig. Bei Zahlungsverzug behalten wir uns vor, die Buchung zu stornieren.`,
    },
    {
      title: '5. Widerrufsrecht',
      content: `Verbrauchern steht ein gesetzliches Widerrufsrecht zu.

**Widerrufsfrist:** 14 Tage ab Vertragsschluss

**Ausnahmen vom Widerrufsrecht:**
• Dienstleistungen, die vollständig erbracht wurden
• Events, die zu einem bestimmten Zeitpunkt stattfinden
• Verderbliche Waren

Details zum Widerrufsrecht finden Sie in unserer Widerrufsbelehrung.`,
    },
    {
      title: '6. Stornierungsbedingungen',
      content: `Die Stornierungsbedingungen variieren je nach Gastgeber:

**Flexibel:** Kostenfreie Stornierung bis 24h vor Event-Beginn
**Moderat:** Kostenfreie Stornierung bis 7 Tage vor Event-Beginn
**Streng:** Kostenfreie Stornierung bis 30 Tage vor Event-Beginn

Details finden Sie in der jeweiligen Event-Beschreibung.`,
    },
    {
      title: '7. Pflichten der Gastgeber',
      content: `Gastgeber verpflichten sich:
• Wahrheitsgemäße Angaben zu Events/Spaces/Services zu machen
• Alle gesetzlichen Anforderungen zu erfüllen
• Buchungen zuverlässig durchzuführen
• Angemessene Sicherheitsmaßnahmen zu treffen

Bei Verstößen behält sich Nowtown vor, das Angebot zu entfernen und den Account zu sperren.`,
    },
    {
      title: '8. Haftung',
      content: `Nowtown haftet nach den gesetzlichen Bestimmungen bei Vorsatz und grober Fahrlässigkeit.

Bei leichter Fahrlässigkeit haften wir nur für die Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und begrenzt auf den vertragstypisch vorhersehbaren Schaden.

Die Haftung für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit bleibt unberührt.`,
    },
    {
      title: '9. Datenschutz',
      content: `Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung und den Bestimmungen der DSGVO.

Weitere Informationen finden Sie in unserer Datenschutzerklärung.`,
    },
    {
      title: '10. Geistiges Eigentum',
      content: `Alle Inhalte auf nowtown.co (Texte, Bilder, Logos, Design) sind urheberrechtlich geschützt.

Eine Vervielfältigung, Bearbeitung oder Verbreitung bedarf der schriftlichen Zustimmung von Nowtown.`,
    },
    {
      title: '11. Streitbeilegung',
      content: `Die EU-Kommission stellt eine Plattform für Online-Streitbeilegung bereit:
https://ec.europa.eu/consumers/odr

Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`,
    },
    {
      title: '12. Schlussbestimmungen',
      content: `Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.

Gerichtsstand ist München, sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.

Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Allgemeine Geschäftsbedingungen (AGB)</h1>
          <p className="text-muted-foreground">
            Version 2.0 • Gültig ab: 1. Oktober 2025
          </p>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Als PDF herunterladen
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Drucken
            </Button>
          </div>
        </div>

        {/* Table of Contents */}
        <Card>
          <CardHeader>
            <CardTitle>Inhaltsverzeichnis</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="grid gap-2">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="text-sm text-primary hover:underline"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Content Sections */}
        {sections.map((section, index) => (
          <Card key={index} id={`section-${index}`}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {section.content}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Footer Note */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground">
              Nowtown GmbH • Müllerstraße 12 • 80469 München • Deutschland<br />
              Registergericht: Amtsgericht München • HRB XXXXX
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
