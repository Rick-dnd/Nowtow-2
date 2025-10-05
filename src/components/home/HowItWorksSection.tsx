'use client';

import { motion } from 'framer-motion';
import { Search, Calendar, PartyPopper, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Entdecken',
    description: 'Durchsuche Events, Räume und Services in deiner Nähe',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    number: 2,
    icon: Calendar,
    title: 'Buchen',
    description: 'Wähle dein Erlebnis und buche direkt online',
    color: 'from-green-500 to-emerald-600',
  },
  {
    number: 3,
    icon: PartyPopper,
    title: 'Erleben',
    description: 'Genieße dein Event oder nutze den gebuchten Raum',
    color: 'from-teal-600 to-green-600',
  },
];

export function HowItWorksSection(): React.ReactElement {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">In 3 Schritten zum Erlebnis</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            So einfach funktioniert Nowtown
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Arrow connecting steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-primary/40" />
                </div>
              )}

              <Card className="h-full text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="relative inline-block mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300`}>
                      {step.number}
                    </div>
                    <div className="absolute -bottom-2 -right-2">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} opacity-20 group-hover:scale-125 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${step.color} opacity-10 mb-6 group-hover:opacity-20 transition-opacity duration-300`}>
                    <step.icon className={`h-8 w-8 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground">
            Bereit loszulegen? Registriere dich kostenlos und entdecke München!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
