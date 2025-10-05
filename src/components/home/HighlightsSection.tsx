'use client';

import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { EventCard } from '@/components/cards/EventCard';
import { SpaceCard } from '@/components/cards/SpaceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { mockEvents, mockSpaces } from '@/lib/mock-data';

export function HighlightsSection(): React.ReactElement {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Entdecke die Highlights</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Die neuesten Räume, angesagte Events und unsere Community
          </p>
        </motion.div>

        {/* Spaces Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Neueste Räume</h3>
            <Button variant="ghost" asChild>
              <Link href="/spaces" className="flex items-center gap-2">
                Alle ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {mockSpaces.map((space, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <SpaceCard space={space} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>

        {/* Events Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Upcoming Events</h3>
            <Button variant="ghost" asChild>
              <Link href="/events" className="flex items-center gap-2">
                Alle ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {mockEvents.map((event, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <EventCard event={event} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>

        {/* Community CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-primary/10 via-emerald-500/10 to-teal-500/10 border-primary/20 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Werde Teil der Community</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Vernetze dich mit Gleichgesinnten, teile deine Erlebnisse und entdecke neue
                  Möglichkeiten in München
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/community">Community entdecken</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/register">Jetzt beitreten</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
