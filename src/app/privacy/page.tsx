import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage(): React.ReactElement {
  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <PrivacyContent />
    </div>
    <Footer />
    </>
  );
}

function PrivacyContent(): React.ReactElement {
  const sections = [
    {
      id: '1',
      title: '1. Einleitung',
      content: `Nowtown GmbH ("wir", "uns", "unser") betreibt die Website nowtown.co (im Folgenden als "Service" bezeichnet).

Diese Seite informiert Sie über unsere Richtlinien bezüglich der Erfassung, Verwendung und Offenlegung personenbezogener Daten, wenn Sie unseren Service nutzen, sowie über die Ihnen in Bezug auf diese Daten zur Verfügung stehenden Optionen.

Wir verwenden Ihre Daten zur Bereitstellung und Verbesserung des Service. Durch die Nutzung des Service erklären Sie sich mit der Erfassung und Verwendung von Informationen gemäß dieser Richtlinie einverstanden.`,
    },
    {
      id: '2',
      title: '2. Datenerfassung und Verwendung',
      content: `Wir erfassen verschiedene Arten von Informationen für unterschiedliche Zwecke, um Ihnen unseren Service zur Verfügung zu stellen und ihn zu verbessern.

**Arten der erfassten Daten:**

**Personenbezogene Daten:**
Bei der Nutzung unseres Service können wir Sie bitten, uns bestimmte personenbezogene Informationen zur Verfügung zu stellen:
• Email-Adresse
• Vor- und Nachname
• Telefonnummer
• Adresse (Straße, PLZ, Stadt)
• Profilfoto
• Zahlungsinformationen

**Nutzungsdaten:**
• Browser-Typ und -Version
• Besuchte Seiten und Zeitpunkt
• IP-Adresse
• Geräteinformationen
• Standortdaten (mit Ihrer Zustimmung)`,
    },
    {
      id: '3',
      title: '3. Verwendung von Daten',
      content: `Nowtown GmbH verwendet die erfassten Daten für verschiedene Zwecke:

• Bereitstellung und Wartung unseres Service
• Benachrichtigung über Änderungen an unserem Service
• Ermöglichung der Teilnahme an interaktiven Funktionen
• Bereitstellung von Kundenservice und Support
• Sammlung wertvoller Informationen zur Verbesserung
• Überwachung der Nutzung des Service
• Erkennung, Vorbeugung und Behebung technischer Probleme
• Bereitstellung von Nachrichten, Angeboten und Werbe materi al (mit Ihrer Zustimmung)`,
    },
    {
      id: '4',
      title: '4. Datenweitergabe',
      content: `Wir können Ihre personenbezogenen Daten in gutem Glauben offenlegen, wenn wir der Ansicht sind, dass dies erforderlich ist:

• Zur Erfüllung einer gesetzlichen Verpflichtung
• Zum Schutz und zur Verteidigung der Rechte oder des Eigentums von Nowtown GmbH
• Zur Verhinderung oder Untersuchung möglicher Fehlverhaltens
• Zum Schutz der persönlichen Sicherheit der Nutzer
• Zum Schutz vor rechtlicher Haftung

Wir verkaufen Ihre Daten NICHT an Dritte.`,
    },
    {
      id: '5',
      title: '5. Cookies & Tracking-Technologien',
      content: `Wir verwenden Cookies und ähnliche Tracking-Technologien zur Verfolgung der Aktivitäten auf unserem Service.

**Cookie-Kategorien:**
• **Notwendige Cookies:** Erforderlich für Basisfunktionen (Authentifizierung, Session)
• **Funktionale Cookies:** Speichern von Präferenzen (Sprache, Theme)
• **Analytics Cookies:** Verstehen der Nutzung (Google Analytics, Vercel Analytics)
• **Marketing Cookies:** Personalisierte Werbung (mit Ihrer Zustimmung)

Sie können Cookies in Ihren Browser-Einstellungen verwalten. Siehe unsere Cookie-Richtlinie für Details.`,
    },
    {
      id: '6',
      title: '6. Ihre Rechte (DSGVO)',
      content: `Gemäß der Datenschutz-Grundverordnung (DSGVO) haben Sie folgende Rechte:

• **Auskunftsrecht:** Sie haben das Recht auf Auskunft über Ihre gespeicherten Daten
• **Recht auf Berichtigung:** Sie können unrichtige Daten korrigieren lassen
• **Recht auf Löschung:** Sie können die Löschung Ihrer Daten verlangen
• **Recht auf Einschränkung:** Sie können die Verarbeitung einschränken lassen
• **Recht auf Datenübertragbarkeit:** Sie können Ihre Daten in einem gängigen Format erhalten
• **Widerspruchsrecht:** Sie können der Verarbeitung widersprechen

Um Ihre Rechte auszuüben, kontaktieren Sie uns unter privacy@nowtown.co`,
    },
    {
      id: '7',
      title: '7. Datensicherheit',
      content: `Die Sicherheit Ihrer Daten ist uns wichtig, aber denken Sie daran, dass keine Methode der Übertragung über das Internet oder der elektronischen Speicherung zu 100% sicher ist.

**Unsere Sicherheitsmaßnahmen:**
• SSL/TLS-Verschlüsselung für alle Datenübertragungen
• Verschlüsselte Datenspeicherung
• Regelmäßige Sicherheitsaudits
• Zugriffskontrolle und Authentifizierung
• Regelmäßige Backups
• Mitarbeiterschulung zu Datenschutz

Wir bemühen uns, wirtschaftlich annehmbare Mittel zum Schutz Ihrer personenbezogenen Daten zu verwenden.`,
    },
    {
      id: '8',
      title: '8. Datenspeicherung',
      content: `Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die in dieser Datenschutzerklärung dargelegten Zwecke erforderlich ist.

• Account-Daten: Während der Account aktiv ist + 30 Tage nach Löschung
• Transaktionsdaten: 10 Jahre (gesetzliche Aufbewahrungspflicht)
• Kommunikationsdaten: 3 Jahre
• Analytics-Daten: 26 Monate (anonymisiert)`,
    },
    {
      id: '9',
      title: '9. Kinder',
      content: `Unser Service richtet sich nicht an Personen unter 16 Jahren.

Wir erfassen nicht wissentlich personenbezogene Daten von Kindern unter 16 Jahren. Wenn Sie ein Elternteil oder Erziehungsberechtigter sind und feststellen, dass Ihr Kind uns personenbezogene Daten zur Verfügung gestellt hat, kontaktieren Sie uns bitte.`,
    },
    {
      id: '10',
      title: '10. Änderungen dieser Datenschutzerklärung',
      content: `Wir können unsere Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Datenschutzerklärung auf dieser Seite veröffentlichen.

**Letzte Aktualisierung:** 1. Oktober 2025

Wir empfehlen Ihnen, diese Datenschutzerklärung regelmäßig auf Änderungen zu überprüfen.`,
    },
    {
      id: '11',
      title: '11. Kontakt',
      content: `Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns:

**Email:** privacy@nowtown.co
**Telefon:** +49 89 1234567
**Adresse:** Nowtown GmbH, Müllerstraße 12, 80469 München

**Datenschutzbeauftragter:**
Email: dpo@nowtown.co`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="h-16 w-16 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold">Datenschutzerklärung</h1>
          <p className="text-muted-foreground">
            Letzte Aktualisierung: 1. Oktober 2025
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
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Content Sections */}
        {sections.map((section) => (
          <Card key={section.id} id={`section-${section.id}`}>
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
              Diese Datenschutzerklärung ist in Übereinstimmung mit der DSGVO (Datenschutz-Grundverordnung)
              und dem BDSG (Bundesdatenschutzgesetz) erstellt.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
