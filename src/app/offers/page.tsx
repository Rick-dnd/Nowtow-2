'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Gift,
  Flame,
  Crown,
  GraduationCap,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const activeOffers = [
  {
    id: 1,
    icon: Flame,
    badge: 'FLASH DEAL',
    title: '50% OFF First Event Booking',
    description: 'Für Neukunden',
    code: 'FIRST50',
    expiresIn: { hours: 2, minutes: 34, seconds: 12 },
    terms: 'Nur für Neukunden. Einmalig einlösbar. Gilt für Events bis €100.',
  },
  {
    id: 2,
    icon: Crown,
    badge: 'PREMIUM TRIAL',
    title: '30 Tage Premium kostenlos testen',
    description: 'Für Plus-Mitglieder',
    code: null,
    expiresIn: null,
    terms: 'Nur für aktive Plus-Mitglieder. Keine Kreditkarte erforderlich.',
  },
  {
    id: 3,
    icon: GraduationCap,
    badge: 'STUDENT DISCOUNT',
    title: '20% Rabatt mit gültiger Studentenkarte',
    description: 'Dauerhaftes Angebot',
    code: null,
    expiresIn: null,
    terms: 'Gültige Studentenkarte erforderlich. Einmalige Verifizierung.',
  },
];

export default function OffersPage(): React.ReactElement {
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 34, seconds: 12 });

  useEffect((): (() => void) => {
    const interval = setInterval((): void => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Gift className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Aktuelle Angebote
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecke unsere besten Deals und spare bei deinen Lieblings-Events
          </p>
        </div>

        {/* Active Offers */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Aktive Angebote</h2>

          {activeOffers.map((offer) => (
            <Card
              key={offer.id}
              className={offer.id === 1 ? 'border-2 border-primary shadow-lg' : ''}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <offer.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {offer.badge}
                      </Badge>
                      <CardTitle className="text-xl">{offer.title}</CardTitle>
                      <CardDescription>{offer.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {offer.code && (
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Code:</span>
                    <code className="text-lg font-bold text-primary">{offer.code}</code>
                  </div>
                )}

                {offer.expiresIn && (
                  <div className="flex items-center space-x-2 text-destructive">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      Endet in: {countdown.hours.toString().padStart(2, '0')}:
                      {countdown.minutes.toString().padStart(2, '0')}:
                      {countdown.seconds.toString().padStart(2, '0')}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs text-muted-foreground">{offer.terms}</p>
                  <Button className={offer.id === 1 ? 'bg-gradient-to-r from-primary to-accent' : ''}>
                    {offer.id === 1 ? 'Get Offer' : offer.id === 2 ? 'Start Trial' : 'Verify Student Status'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Past Offers */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Abgelaufene Angebote</h2>
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Keine abgelaufenen Angebote. Bleib dran für neue Deals!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="py-12 text-center space-y-6">
            <h3 className="text-2xl font-bold">Verpasse keine Angebote!</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Abonniere unseren Newsletter und erhalte exklusive Deals direkt in dein Postfach.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
              Newsletter abonnieren
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
}
