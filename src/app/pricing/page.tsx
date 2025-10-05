'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    period: 'Kostenlos',
    description: 'Perfekt zum Ausprobieren',
    icon: Sparkles,
    features: [
      'Bis zu 3 Events pro Monat',
      'Bis zu 1 Raum',
      'Community Zugang',
      'Basis Support',
      'Profil erstellen',
    ],
    cta: 'Kostenlos starten',
    popular: false,
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    name: 'Plus',
    price: '29',
    period: 'pro Monat',
    description: 'Für aktive Hosts und Creators',
    icon: Zap,
    features: [
      'Unbegrenzte Events',
      'Bis zu 5 Räume',
      'Prioritäts-Support',
      'Erweiterte Statistiken',
      'Keine Plattformgebühren',
      'Custom Branding',
      'AI Event Beschreibungen',
    ],
    cta: 'Plus wählen',
    popular: true,
    color: 'from-primary/20 to-emerald-600/20',
  },
  {
    name: 'Pro',
    price: '99',
    period: 'pro Monat',
    description: 'Für professionelle Anbieter',
    icon: Crown,
    features: [
      'Alles aus Plus',
      'Unbegrenzte Räume',
      'Dedicated Account Manager',
      'API Zugang',
      'White Label Option',
      'Priority Listing',
      'Advanced Analytics',
      'Custom Integrations',
    ],
    cta: 'Pro wählen',
    popular: false,
    color: 'from-amber-500/20 to-orange-500/20',
  },
];

const faqs = [
  {
    question: 'Kann ich jederzeit upgraden oder downgraden?',
    answer:
      'Ja, du kannst jederzeit zwischen den Plänen wechseln. Beim Upgrade wird der Unterschiedsbetrag anteilig berechnet. Beim Downgrade gilt die Änderung ab dem nächsten Abrechnungszyklus.',
  },
  {
    question: 'Was passiert, wenn ich das Limit überschreite?',
    answer:
      'Du wirst benachrichtigt, sobald du dich deinem Limit näherst. Du kannst dann jederzeit upgraden oder warten bis zum nächsten Monat.',
  },
  {
    question: 'Gibt es eine kostenlose Testphase für Plus und Pro?',
    answer:
      'Ja! Beide Pläne bieten eine 14-tägige kostenlose Testphase. Du kannst jederzeit kündigen, ohne dass Kosten anfallen.',
  },
  {
    question: 'Welche Zahlungsmethoden akzeptiert ihr?',
    answer:
      'Wir akzeptieren alle gängigen Kreditkarten (Visa, MasterCard, American Express), PayPal, SEPA-Lastschrift und auf Anfrage auch Rechnung für Pro-Kunden.',
  },
  {
    question: 'Gibt es Rabatte für jährliche Abrechnung?',
    answer: 'Ja! Bei jährlicher Zahlung erhältst du 20% Rabatt. Das entspricht 2 kostenlosen Monaten pro Jahr.',
  },
  {
    question: 'Kann ich mein Abo kündigen?',
    answer:
      'Natürlich! Du kannst dein Abo jederzeit mit einem Klick kündigen. Der Zugang bleibt bis zum Ende der bezahlten Periode aktiv.',
  },
];

export default function PricingPage(): React.ReactElement {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                Pricing
              </Badge>
              <h1 className="text-5xl font-bold mb-4">
                Wähle den perfekten Plan für dich
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Starte kostenlos und upgrade, wenn dein Business wächst. Keine versteckten Kosten.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={plan.popular ? 'md:scale-110' : ''}
                >
                  <Card
                    className={`relative h-full flex flex-col ${
                      plan.popular ? 'border-primary border-2 shadow-2xl' : 'border-border'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4 py-1">
                          Beliebteste Wahl
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-8">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                        <plan.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-5xl font-bold">€{plan.price}</span>
                          {plan.price !== '0' && (
                            <span className="text-muted-foreground">/{plan.period.split(' ')[1]}</span>
                          )}
                        </div>
                        {plan.price === '0' && (
                          <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.popular ? 'default' : 'outline'}
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Vergleiche alle Features</h2>
              <p className="text-muted-foreground">Finde heraus, welcher Plan am besten zu dir passt</p>
            </div>

            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold">Free</th>
                    <th className="text-center py-4 px-4 font-semibold">Plus</th>
                    <th className="text-center py-4 px-4 font-semibold">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-4 px-4">Events pro Monat</td>
                    <td className="text-center py-4 px-4">3</td>
                    <td className="text-center py-4 px-4">Unbegrenzt</td>
                    <td className="text-center py-4 px-4">Unbegrenzt</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Räume</td>
                    <td className="text-center py-4 px-4">1</td>
                    <td className="text-center py-4 px-4">5</td>
                    <td className="text-center py-4 px-4">Unbegrenzt</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Plattformgebühr</td>
                    <td className="text-center py-4 px-4">10%</td>
                    <td className="text-center py-4 px-4">0%</td>
                    <td className="text-center py-4 px-4">0%</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Support</td>
                    <td className="text-center py-4 px-4">Basis</td>
                    <td className="text-center py-4 px-4">Priorität</td>
                    <td className="text-center py-4 px-4">Dedicated</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Statistiken</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 mx-auto text-muted-foreground" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Custom Branding</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">API Zugang</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">White Label</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Häufig gestellte Fragen</h2>
              <p className="text-muted-foreground">Alles, was du über unsere Preise wissen musst</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-emerald-500/10 to-teal-500/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Bereit durchzustarten?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Starte noch heute kostenlos und wachse mit deinem Business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Kostenlos starten
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Kontakt für Enterprise
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Keine Kreditkarte erforderlich • Jederzeit kündbar • 14 Tage kostenlos testen
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
