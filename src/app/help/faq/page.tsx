'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const faqCategories = [
  { id: 'all', label: 'Alle' },
  { id: 'account', label: 'Account' },
  { id: 'bookings', label: 'Buchungen' },
  { id: 'payments', label: 'Zahlungen' },
  { id: 'safety', label: 'Sicherheit' },
];

const faqs = [
  {
    id: '1',
    category: 'account',
    question: 'Wie erstelle ich ein Konto?',
    answer: 'Klicken Sie auf "Registrieren" in der oberen rechten Ecke und folgen Sie den Anweisungen. Sie benötigen eine gültige E-Mail-Adresse und müssen ein sicheres Passwort wählen. Nach der Registrierung erhalten Sie eine Bestätigungs-E-Mail.',
  },
  {
    id: '2',
    category: 'account',
    question: 'Ist Nowtown kostenlos?',
    answer: 'Die Nutzung von Nowtown ist grundsätzlich kostenlos. Wir bieten auch Premium-Pläne an, die zusätzliche Funktionen freischalten. Für Buchungen fallen je nach Event, Space oder Service unterschiedliche Gebühren an.',
  },
  {
    id: '3',
    category: 'bookings',
    question: 'Wie buche ich ein Event?',
    answer: 'Navigieren Sie zur Event-Seite, wählen Sie das gewünschte Event aus und klicken Sie auf "Jetzt buchen". Wählen Sie Datum, Anzahl der Tickets und folgen Sie dem Checkout-Prozess. Sie erhalten eine Buchungsbestätigung per E-Mail.',
  },
  {
    id: '4',
    category: 'payments',
    question: 'Welche Zahlungsmethoden werden akzeptiert?',
    answer: 'Wir akzeptieren Kreditkarten (Visa, Mastercard), PayPal, Apple Pay und Google Pay. Alle Zahlungen werden sicher über verschlüsselte Verbindungen verarbeitet.',
  },
  {
    id: '5',
    category: 'bookings',
    question: 'Was ist die Stornierungsrichtlinie?',
    answer: 'Die Stornierungsrichtlinie variiert je nach Gastgeber. In der Regel können Sie bis zu 24 Stunden vor dem Event kostenfrei stornieren. Detaillierte Informationen finden Sie in der jeweiligen Event-Beschreibung.',
  },
  {
    id: '6',
    category: 'account',
    question: 'Wie werde ich Gastgeber?',
    answer: 'Klicken Sie auf "Gastgeber werden" im Menü. Sie müssen Ihr Profil verifizieren und können dann Events erstellen, Räume anbieten oder Services bereitstellen. Unser Team prüft alle Angebote vor der Veröffentlichung.',
  },
  {
    id: '7',
    category: 'payments',
    question: 'Wann erhalte ich meine Zahlung als Gastgeber?',
    answer: 'Zahlungen werden 24 Stunden nach erfolgreichem Event-Abschluss auf Ihr hinterlegtes Konto überwiesen. Die Überweisung dauert in der Regel 2-3 Werktage.',
  },
  {
    id: '8',
    category: 'safety',
    question: 'Wie sicher ist Nowtown?',
    answer: 'Ihre Sicherheit hat höchste Priorität. Wir verwenden SSL-Verschlüsselung, verifizieren alle Gastgeber, haben ein Review-System und einen 24/7 Support. Zahlen Sie nur über unsere Plattform und melden Sie verdächtige Aktivitäten.',
  },
  {
    id: '9',
    category: 'safety',
    question: 'Wie melde ich ein Problem?',
    answer: 'Klicken Sie auf das Drei-Punkte-Menü bei jedem Post/Event und wählen Sie "Melden". Wählen Sie den Grund aus und fügen Sie Details hinzu. Unser Moderations-Team prüft alle Berichte innerhalb von 24 Stunden.',
  },
  {
    id: '10',
    category: 'bookings',
    question: 'Kann ich eine Buchung ändern?',
    answer: 'Ja, Sie können Buchungen bis zu 48 Stunden vor dem Event-Termin ändern. Gehen Sie zu "Meine Buchungen" im Dashboard und wählen Sie "Bearbeiten". Änderungen unterliegen der Verfügbarkeit.',
  },
];

export default function FAQPage(): React.ReactElement {
  return (
    <>
    <FAQContent />
    <Footer />
    </>
  );
}

function FAQContent(): React.ReactElement {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Häufig gestellte Fragen</h1>
          <p className="text-muted-foreground text-lg">
            Finde schnell Antworten auf deine Fragen
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Durchsuche FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="FAQ durchsuchen"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {faqCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? 'bg-gradient-to-r from-primary to-accent' : ''}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>Fragen & Antworten</CardTitle>
            <CardDescription>
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'Frage gefunden' : 'Fragen gefunden'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Keine FAQs gefunden. Versuche einen anderen Suchbegriff.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="pt-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Nicht gefunden, wonach du suchst?</h3>
            <p className="text-muted-foreground mb-4">
              Unser Support-Team hilft dir gerne weiter
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-accent">
              <a href="/contact">Kontaktiere Support</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
