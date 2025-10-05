import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  FileText,
  Image as ImageIcon,
  Euro,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const aiFeatures = [
  {
    icon: FileText,
    title: 'AI Event Description Generator',
    description: 'Gib Event-Typ und Details ein, und unsere AI erstellt eine professionelle Beschreibung',
    badge: 'Plus & Premium',
    demo: true,
  },
  {
    icon: ImageIcon,
    title: 'AI Image Optimization',
    description: 'Automatische Bildverbesserung und Crop-Vorschläge für perfekte Event-Bilder',
    badge: 'Plus & Premium',
    demo: true,
  },
  {
    icon: Euro,
    title: 'AI Pricing Suggestions',
    description: 'Analysiert ähnliche Events und schlägt optimale Preise vor',
    badge: 'Premium',
    demo: true,
  },
  {
    icon: TrendingUp,
    title: 'AI Analytics Insights',
    description: 'Vorhersage der besten Zeiten für Events und personalisierte Empfehlungen',
    badge: 'Premium',
    demo: false,
  },
];

const howItWorksSteps = [
  {
    step: 1,
    title: 'Event erstellen',
    description: 'Starte mit den Grundlagen deines Events',
  },
  {
    step: 2,
    title: 'AI aktivieren',
    description: 'Nutze AI-Features für Beschreibungen, Bilder und Preise',
  },
  {
    step: 3,
    title: 'Veröffentlichen',
    description: 'Dein optimiertes Event geht live',
  },
];

const pricingTiers = [
  {
    name: 'Plus',
    price: '€9.99',
    period: '/Monat',
    features: [
      'AI Event Description Generator',
      'AI Image Optimization',
      'Basic Analytics',
      'Priority Support',
      '10 Events pro Monat',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: '€24.99',
    period: '/Monat',
    features: [
      'Alle Plus Features',
      'AI Pricing Suggestions',
      'AI Analytics Insights',
      'Advanced Analytics Dashboard',
      'Unlimited Events',
      '24/7 Priority Support',
      'Custom Branding',
    ],
    popular: true,
  },
];

export default function HostingPage(): React.ReactElement {
  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Bot className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Hosting Kit
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dein persönlicher Event-Assistent powered by AI
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Verfügbar für Plus & Premium
          </Badge>
        </div>

        {/* How It Works */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">So funktioniert&apos;s</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorksSteps.map((step) => (
              <Card key={step.step} className="text-center">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Features */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">AI Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {aiFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{feature.description}</CardDescription>
                  {feature.demo && (
                    <Button variant="outline" size="sm" className="w-full">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Demo ausprobieren
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">Wähle deinen Plan</h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={tier.popular ? 'border-2 border-primary shadow-lg' : ''}
              >
                {tier.popular && (
                  <div className="bg-primary text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={
                      tier.popular
                        ? 'w-full bg-gradient-to-r from-primary to-accent'
                        : 'w-full'
                    }
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Upgrade to {tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="py-12 text-center space-y-6">
            <h3 className="text-3xl font-bold">Bereit für AI-powered Hosting?</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Erstelle professionellere Events in kürzerer Zeit mit unserem AI Hosting Kit.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Jetzt upgraden
              </Button>
              <Button size="lg" variant="outline">
                Mehr erfahren
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
}
