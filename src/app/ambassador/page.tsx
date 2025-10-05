import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  TrendingUp,
  Users,
  Gift,
  Award,
  HeadphonesIcon,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const howItWorksSteps = [
  {
    step: 1,
    icon: Users,
    title: 'Apply',
    description: 'Bewirb dich mit deinem Nowtown-Profil',
  },
  {
    step: 2,
    icon: CheckCircle2,
    title: 'Get Accepted',
    description: 'Wir prüfen deine Bewerbung innerhalb von 48h',
  },
  {
    step: 3,
    icon: TrendingUp,
    title: 'Promote Events',
    description: 'Teile Events mit deinem Netzwerk',
  },
  {
    step: 4,
    icon: Gift,
    title: 'Earn Money',
    description: 'Erhalte 10% pro erfolgreicher Buchung',
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: '10% Commission',
    description: 'Verdiene 10% auf alle Buchungen über deinen Link',
  },
  {
    icon: Sparkles,
    title: 'Exclusive Event Access',
    description: 'VIP-Zugang zu exklusiven Events in München',
  },
  {
    icon: Award,
    title: 'Ambassador Badge',
    description: 'Spezieller Ambassador Badge auf deinem Profil',
  },
  {
    icon: Gift,
    title: 'Marketing Materials',
    description: 'Professionelle Grafiken & Social Media Templates',
  },
  {
    icon: HeadphonesIcon,
    title: 'Priority Support',
    description: 'Direkter Kontakt zum Ambassador Support Team',
  },
  {
    icon: Trophy,
    title: 'Monthly Bonus',
    description: 'Extra Bonus für Top Performers jeden Monat',
  },
];

const requirements = [
  'Aktiv auf Nowtown für 3+ Monate',
  'Trust Score von mindestens 80+',
  'Mindestens 5 erfolgreiche Events gehosted',
  'Durchschnittliche Bewertung von 4.5+',
  'Aktive Social Media Präsenz (Instagram, TikTok, etc.)',
];

const topAmbassadors = [
  { rank: 1, emoji: '🥇', username: '@mariamuenchen', earned: '€2,345' },
  { rank: 2, emoji: '🥈', username: '@tomevents', earned: '€1,890' },
  { rank: 3, emoji: '🥉', username: '@lisaparty', earned: '€1,567' },
];

export default function AmbassadorPage(): React.ReactElement {
  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Sparkles className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Werde Nowtown Ambassador
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verdiene Geld, während du Events promotest und deine Community wächst
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
              Jetzt bewerben
            </Button>
            <Button size="lg" variant="outline">
              Mehr erfahren
            </Button>
          </div>
        </div>

        {/* How It Works */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">So funktioniert&apos;s</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step) => (
              <Card key={step.step} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 space-y-4">
                  <div className="relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex justify-center mt-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <step.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">Deine Vorteile</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Voraussetzungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-2xl mx-auto space-y-3">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{requirement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Ambassadors */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">Top Ambassadors</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {topAmbassadors.map((ambassador) => (
                  <div
                    key={ambassador.rank}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{ambassador.emoji}</span>
                      <div>
                        <p className="font-semibold">{ambassador.username}</p>
                        <p className="text-sm text-muted-foreground">Rank #{ambassador.rank}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-1">
                      {ambassador.earned} earned
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="py-12 text-center space-y-6">
            <h3 className="text-3xl font-bold">Bereit durchzustarten?</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Werde Teil unserer wachsenden Ambassador Community und verdiene Geld mit Events, die du liebst.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
              Jetzt bewerben
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
}
