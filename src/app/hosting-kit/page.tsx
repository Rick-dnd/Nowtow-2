import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Download,
  FileText,
  Video,
  Calculator,
  CheckCircle,
  Camera,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function HostingKitPage(): React.ReactElement {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Hosting-Kit</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Alles, was du brauchst, um ein erfolgreicher Host auf Nowtown zu werden
            </p>
          </div>

          {/* Welcome Section */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Willkommen bei Nowtown!</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Wir freuen uns, dass du Teil der Nowtown-Community werden möchtest. Dieses Hosting-Kit
                enthält alle wichtigen Ressourcen, Tools und Tipps, um dir den Einstieg als Host zu
                erleichtern. Ob du Events organisierst, Räume vermietest oder Services anbietest - hier
                findest du alles Wichtige.
              </p>
            </CardContent>
          </Card>

          {/* Resources Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Downloadable Resources */}
            <Card>
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Downloadbare Ressourcen</CardTitle>
                <CardDescription>PDFs, Templates und Checklisten</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Host-Handbuch (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Event-Planungs-Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Raum-Beschreibung Vorlage
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Pricing-Strategie Guide
                </Button>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-full w-fit mb-3">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Video-Tutorials</CardTitle>
                <CardDescription>Schritt-für-Schritt Anleitungen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Erste Schritte (5 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Perfektes Event-Listing (8 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Raum-Fotos optimieren (6 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Gäste-Kommunikation (10 min)
                </Button>
              </CardContent>
            </Card>

            {/* Tools */}
            <Card>
              <CardHeader>
                <div className="p-3 bg-emerald-100 rounded-full w-fit mb-3">
                  <Calculator className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Nützliche Tools</CardTitle>
                <CardDescription>Rechner und Planungs-Tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calculator className="h-4 w-4 mr-2" />
                  Pricing Calculator
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Pre-Event Checklist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  Foto-Richtlinien
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Best Practices Guide
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Best Practices */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Best Practices für Hosts</CardTitle>
              <CardDescription>Tipps von erfolgreichen Hosts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Professionelle Fotos
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Hochwertige, gut beleuchtete Fotos erhöhen die Buchungsrate um bis zu 60%.
                    Zeige deinen Raum oder Event von seiner besten Seite.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Detaillierte Beschreibungen
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Beschreibe alle wichtigen Details: Größe, Ausstattung, Lage, Besonderheiten.
                    Je mehr Infos, desto weniger Rückfragen.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Schnelle Kommunikation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Antworte innerhalb von 24 Stunden auf Anfragen. Schnelle Reaktion bedeutet
                    mehr Buchungen.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Faire Preisgestaltung
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Recherchiere vergleichbare Angebote in deiner Region. Nutze unseren Pricing
                    Calculator für optimale Preise.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Flexibilität
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Flexible Stornierungsbedingungen und Buchungsoptionen erhöhen die Nachfrage.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Reviews sammeln
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Positive Bewertungen sind Gold wert. Bitte zufriedene Gäste um ein Review.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photography Tips */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Camera className="h-6 w-6" />
                Fotografie-Tipps
              </CardTitle>
              <CardDescription>So machst du perfekte Fotos für dein Listing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Natürliches Licht nutzen</h4>
                  <p className="text-sm text-muted-foreground">
                    Fotografiere bei Tageslicht, idealerweise vormittags oder nachmittags. Öffne
                    alle Vorhänge und schalte zusätzliches Licht an.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">2. Aufräumen und vorbereiten</h4>
                  <p className="text-sm text-muted-foreground">
                    Entferne persönliche Gegenstände und sorge für Ordnung. Der Raum sollte
                    einladend und neutral wirken.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">3. Verschiedene Perspektiven</h4>
                  <p className="text-sm text-muted-foreground">
                    Fotografiere aus verschiedenen Winkeln: Gesamtansicht, Details, besondere
                    Features. Mindestens 5-10 Fotos pro Raum.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">4. Horizontale Ausrichtung</h4>
                  <p className="text-sm text-muted-foreground">
                    Achte darauf, dass horizontale Linien (Böden, Decken) gerade sind. Nutze das
                    Raster deiner Kamera.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <HelpCircle className="h-6 w-6" />
                Häufig gestellte Fragen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Wie viel kostet es, auf Nowtown zu hosten?</AccordionTrigger>
                  <AccordionContent>
                    Das Erstellen eines Listings ist kostenlos. Nowtown erhebt eine
                    Service-Gebühr von 10-15% auf jede erfolgreiche Buchung. Die genaue Gebühr
                    hängt vom Listing-Typ ab.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Wann erhalte ich meine Zahlung?</AccordionTrigger>
                  <AccordionContent>
                    Zahlungen werden 24 Stunden nach dem Event-Start bzw. Check-in ausgezahlt.
                    Du kannst zwischen verschiedenen Auszahlungsmethoden wählen.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Bin ich als Host versichert?</AccordionTrigger>
                  <AccordionContent>
                    Ja, alle Buchungen über Nowtown sind durch unsere Host-Schutz-Versicherung
                    abgedeckt (bis zu 1 Million Euro Haftpflicht). Details in den AGB.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Kann ich Buchungen stornieren?</AccordionTrigger>
                  <AccordionContent>
                    Ja, allerdings kann dies deine Host-Bewertung beeinflussen. Stornierungen
                    sollten nur in Ausnahmefällen erfolgen. Kontaktiere unser Support-Team bei
                    Problemen.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Wie setze ich den richtigen Preis?</AccordionTrigger>
                  <AccordionContent>
                    Nutze unseren Pricing Calculator und recherchiere vergleichbare Angebote.
                    Berücksichtige: Lage, Ausstattung, Saison, Events in der Nähe. Starte
                    lieber niedriger und erhöhe nach guten Reviews.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Legal Compliance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Rechtliche Hinweise</CardTitle>
              <CardDescription>Was du als Host beachten musst</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-amber-500 bg-amber-50">
                  <h4 className="font-semibold mb-2">Gewerbeanmeldung</h4>
                  <p className="text-sm text-muted-foreground">
                    Abhängig von deiner Tätigkeit kann eine Gewerbeanmeldung erforderlich sein.
                    Informiere dich bei deinem zuständigen Gewerbeamt.
                  </p>
                </div>

                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-semibold mb-2">Steuerpflicht</h4>
                  <p className="text-sm text-muted-foreground">
                    Einnahmen aus Hosting-Aktivitäten sind steuerpflichtig. Konsultiere einen
                    Steuerberater für Details.
                  </p>
                </div>

                <div className="p-4 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-semibold mb-2">Versicherung</h4>
                  <p className="text-sm text-muted-foreground">
                    Prüfe, ob deine bestehenden Versicherungen (Haftpflicht, Gebäude)
                    kommerzielle Nutzung abdecken.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary to-emerald-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Bereit durchzustarten?</h2>
              <p className="text-lg mb-6 opacity-90">
                Erstelle dein erstes Listing und werde Teil der Nowtown-Community
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Event erstellen
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Raum anbieten
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
