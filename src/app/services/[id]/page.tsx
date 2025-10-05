'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useService } from '@/hooks/useServices';
import { notFound } from 'next/navigation';
import { Briefcase, Heart, Share2, Star, Check, AlertCircle, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PageProps {
  params: Promise<{ id: string }>;
}

const categoryLabels: Record<string, string> = {
  'fotografie': 'Fotografie',
  'videografie': 'Videografie',
  'musik': 'Musik & DJ',
  'sport': 'Sport & Fitness',
  'coaching': 'Coaching',
  'beratung': 'Beratung',
  'design': 'Design',
  'handwerk': 'Handwerk',
  'catering': 'Catering',
  'other': 'Sonstiges',
};

// Mock service packages
const servicePackages = [
  {
    name: 'Basic',
    price: 150,
    duration: '2 Stunden',
    features: [
      'Professionelle Ausrüstung',
      'Bis zu 50 bearbeitete Bilder',
      'Online Galerie',
      '2 Wochen Lieferzeit',
    ],
  },
  {
    name: 'Standard',
    price: 300,
    duration: '4 Stunden',
    features: [
      'Alles aus Basic',
      'Bis zu 100 bearbeitete Bilder',
      'Druck-Ready Files',
      '1 Woche Lieferzeit',
      'Location Scouting',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 500,
    duration: '8 Stunden',
    features: [
      'Alles aus Standard',
      'Bis zu 200 bearbeitete Bilder',
      'Zweiter Fotograf',
      '3 Tage Lieferzeit',
      'Same-Day Vorschau',
      'Fotoalbum inklusive',
    ],
  },
];

export default function ServiceDetailPage({ params }: PageProps): React.ReactElement {
  const { id } = React.use(params);

  // Fetch service from Supabase
  const { data: service, isLoading, error } = useService(id);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 flex items-center justify-center">
          <p className="text-muted-foreground">Lade Service...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Hero Image - Services use separate service_images table */}
        <div className="relative w-full h-[60vh] bg-muted">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
            <Briefcase className="h-32 w-32 text-emerald-600" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">
                      {service.category && categoryLabels[service.category]}
                    </Badge>
                    <h1 className="text-4xl font-bold mb-2">{service.title}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.9</span>
                        <span>(87 Bewertungen)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Verfügbar ab sofort</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Lisa Meier</p>
                    <p className="text-sm text-muted-foreground">Professionelle Fotografin seit 2018</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Über den Service</h2>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Mit über 6 Jahren Erfahrung in der Event- und Porträtfotografie biete ich professionelle
                  Fotografie-Dienstleistungen für jeden Anlass. Ob Hochzeit, Firmenveranstaltung oder persönliches
                  Shooting - ich sorge dafür, dass deine besonderen Momente perfekt festgehalten werden.
                </p>
              </div>

              <Separator />

              {/* Service Packages */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Pakete & Preise</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {servicePackages.map((pkg) => (
                    <Card
                      key={pkg.name}
                      className={pkg.popular ? 'border-primary border-2 shadow-lg' : ''}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle>{pkg.name}</CardTitle>
                          {pkg.popular && (
                            <Badge variant="default" className="bg-primary">
                              Beliebt
                            </Badge>
                          )}
                        </div>
                        <div>
                          <span className="text-3xl font-bold">€{pkg.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="w-full mt-4"
                          variant={pkg.popular ? 'default' : 'outline'}
                        >
                          Paket wählen
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Portfolio & Reviews Tabs */}
              <div>
                <Tabs defaultValue="portfolio" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="reviews">Bewertungen</TabsTrigger>
                  </TabsList>
                  <TabsContent value="portfolio" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                            <Briefcase className="h-12 w-12 text-emerald-600/50" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="mt-6">
                    <div className="space-y-4">
                      {/* Review Summary */}
                      <div className="flex items-center gap-8 p-6 bg-muted/30 rounded-lg">
                        <div className="text-center">
                          <div className="text-5xl font-bold mb-2">4.9</div>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">87 Bewertungen</p>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-12">5 ★</span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400" style={{ width: '85%' }} />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">85%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-12">4 ★</span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400" style={{ width: '12%' }} />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">12%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-12">3 ★</span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400" style={{ width: '3%' }} />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">3%</span>
                          </div>
                        </div>
                      </div>

                      {/* Individual Reviews */}
                      <div className="space-y-4">
                        {[
                          {
                            name: 'Julia S.',
                            rating: 5,
                            date: '2 Wochen her',
                            text: 'Absolut fantastische Arbeit! Lisa hat unsere Hochzeit perfekt eingefangen. Die Bilder sind einfach wunderschön und wir sind total begeistert.',
                          },
                          {
                            name: 'Michael K.',
                            rating: 5,
                            date: '1 Monat her',
                            text: 'Sehr professionell und kreativ. Hat tolle Ideen und setzt sie perfekt um. Kann ich nur weiterempfehlen!',
                          },
                          {
                            name: 'Sarah W.',
                            rating: 4,
                            date: '2 Monate her',
                            text: 'Gute Qualität der Fotos, pünktlich und freundlich. Hätte mir etwas mehr kreative Input gewünscht, aber insgesamt sehr zufrieden.',
                          },
                        ].map((review, i) => (
                          <Card key={i}>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarFallback>{review.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-semibold">{review.name}</p>
                                    <p className="text-sm text-muted-foreground">{review.date}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground">{review.text}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Separator />

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Häufig gestellte Fragen</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Wie weit im Voraus muss ich buchen?</AccordionTrigger>
                    <AccordionContent>
                      Ich empfehle mindestens 4-6 Wochen im Voraus zu buchen, besonders für Events am Wochenende.
                      Kurzfristige Buchungen sind nach Verfügbarkeit möglich.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Was passiert bei schlechtem Wetter?</AccordionTrigger>
                    <AccordionContent>
                      Bei Outdoor-Shootings haben wir immer einen Backup-Plan. Entweder verschieben wir auf einen
                      anderen Termin oder wir nutzen Indoor-Locations.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Kann ich spezielle Wünsche äußern?</AccordionTrigger>
                    <AccordionContent>
                      Auf jeden Fall! Ich arbeite eng mit meinen Kunden zusammen, um sicherzustellen, dass ihre
                      Vision umgesetzt wird. Teile mir einfach deine Ideen mit.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Wie erhalte ich die Bilder?</AccordionTrigger>
                    <AccordionContent>
                      Alle Bilder werden über eine passwortgeschützte Online-Galerie zur Verfügung gestellt. Du
                      kannst sie dort herunterladen und auch direkt Abzüge bestellen.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <Separator />

              {/* Important Info */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                  Wichtige Hinweise
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Anzahlung von 30% bei Buchung erforderlich</li>
                  <li>Kostenlose Stornierung bis 14 Tage vor dem Termin</li>
                  <li>Alle Rechte an den Bildern verbleiben beim Fotografen</li>
                  <li>Nutzungsrechte für private Zwecke sind inklusive</li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Quick Contact Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Anfrage stellen</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Ab €150</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Je nach Paket und Leistung</p>
                      </div>

                      <Button className="w-full" size="lg">
                        Jetzt Anfragen
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Antwortzeit: Meist innerhalb von 24 Stunden
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Provider Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Über den Anbieter</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg">LM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">Lisa Meier</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">4.9</span>
                          <span className="text-muted-foreground">(87)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="font-semibold">87</p>
                        <p className="text-muted-foreground">Bewertungen</p>
                      </div>
                      <div>
                        <p className="font-semibold">6 Jahre</p>
                        <p className="text-muted-foreground">Erfahrung</p>
                      </div>
                      <div>
                        <p className="font-semibold">250+</p>
                        <p className="text-muted-foreground">Projekte</p>
                      </div>
                      <div>
                        <p className="font-semibold">München</p>
                        <p className="text-muted-foreground">Standort</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        Nachricht senden
                      </Button>
                      <Button variant="outline" className="w-full">
                        Profil ansehen
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust & Safety */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Vertrauen & Sicherheit</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Verifizierter Anbieter</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Sichere Zahlung über Plattform</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Geld-zurück-Garantie</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>24/7 Kundensupport</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Bewertungen von echten Kunden</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
