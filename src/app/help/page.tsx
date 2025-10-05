import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, CreditCard, Calendar, Building2, Search, MessageCircle } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const popularTopics = [
  {
    icon: BookOpen,
    title: 'Erste Schritte',
    description: 'Lerne die Grundlagen von Nowtown kennen',
    href: '/help/getting-started',
  },
  {
    icon: CreditCard,
    title: 'Zahlungen',
    description: 'Zahlungsmethoden und Abrechnungen',
    href: '/help/payments',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Events buchen und verwalten',
    href: '/events',
  },
  {
    icon: Building2,
    title: 'Spaces',
    description: 'Räume mieten und anbieten',
    href: '/spaces',
  },
];

const helpCategories = [
  {
    title: 'Erste Schritte',
    links: [
      { label: 'Account erstellen', href: '/help/account' },
      { label: 'Profil vervollständigen', href: '/help/profile' },
      { label: 'Erste Buchung', href: '/help/booking' },
    ],
  },
  {
    title: 'Als Gastgeber',
    links: [
      { label: 'Event erstellen', href: '/help/create-event' },
      { label: 'Raum anbieten', href: '/help/create-space' },
      { label: 'Preise festlegen', href: '/help/pricing' },
    ],
  },
  {
    title: 'Zahlungen & Abrechnungen',
    links: [
      { label: 'Zahlungsmethoden', href: '/help/payment-methods' },
      { label: 'Auszahlungen', href: '/help/payouts' },
      { label: 'Rechnungen', href: '/help/invoices' },
    ],
  },
  {
    title: 'Sicherheit & Datenschutz',
    links: [
      { label: 'Sicherheitsrichtlinien', href: '/safety' },
      { label: 'Datenschutzoptionen', href: '/privacy' },
      { label: 'Melden & Blockieren', href: '/help/reporting' },
    ],
  },
];

export default function HelpPage(): React.ReactElement {
  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Hilfe-Center</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Wie können wir dir helfen? Durchsuche unsere Hilfe-Artikel oder kontaktiere unser Support-Team.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Suche nach Hilfe-Artikeln..."
                className="pl-12 h-12 text-base"
                aria-label="Hilfe-Artikel durchsuchen"
              />
            </div>
          </div>
        </div>

        {/* Popular Topics */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Beliebte Themen</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {popularTopics.map((topic) => (
              <Link key={topic.title} href={topic.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <topic.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-base">{topic.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Kategorien</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {helpCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-primary hover:underline flex items-center"
                        >
                          <span className="mr-2">→</span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <MessageCircle className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-2xl font-bold">Brauchst du weitere Hilfe?</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Unser Support-Team ist für dich da. Kontaktiere uns oder besuche unsere FAQ-Seite.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-primary to-accent">
                  <Link href="/contact">Kontakt aufnehmen</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/help/faq">FAQ durchsuchen</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
}
