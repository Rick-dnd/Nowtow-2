'use client';

import { motion } from 'framer-motion';
import {
  Mic,
  Camera,
  Wrench,
  Palette,
  Store,
  Dumbbell,
  Gamepad2,
  UtensilsCrossed,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

const spaceCategories = [
  {
    type: 'tonstudio',
    label: 'Tonstudio',
    icon: Mic,
    count: 12,
    image: null,
  },
  {
    type: 'fotostudio',
    label: 'Fotostudio',
    icon: Camera,
    count: 18,
    image: null,
  },
  {
    type: 'werkstaetten',
    label: 'Werkstatt',
    icon: Wrench,
    count: 8,
    image: null,
  },
  {
    type: 'kunst-toepfer',
    label: 'Kunst & Töpfer',
    icon: Palette,
    count: 15,
    image: null,
  },
  {
    type: 'popup-retail',
    label: 'Popup Retail',
    icon: Store,
    count: 10,
    image: null,
  },
  {
    type: 'sportraeume',
    label: 'Sporträume',
    icon: Dumbbell,
    count: 22,
    image: null,
  },
  {
    type: 'gaming-podcast',
    label: 'Gaming & Podcast',
    icon: Gamepad2,
    count: 14,
    image: null,
  },
  {
    type: 'kuechen-food',
    label: 'Küchen & Food',
    icon: UtensilsCrossed,
    count: 9,
    image: null,
  },
];

const eventCategories = [
  { category: 'kunst-kreativ', label: 'Kunst & Kreativ', count: 45, color: 'from-emerald-500 to-teal-500' },
  { category: 'musik-performance', label: 'Musik & Performance', count: 32, color: 'from-teal-500 to-cyan-500' },
  { category: 'sport-fitness', label: 'Sport & Fitness', count: 28, color: 'from-green-500 to-emerald-500' },
  { category: 'familie-kinder', label: 'Familie & Kinder', count: 19, color: 'from-lime-500 to-green-500' },
  { category: 'workshop', label: 'Workshop', count: 24, color: 'from-emerald-600 to-green-600' },
  { category: 'essen-geniessen', label: 'Essen & Genießen', count: 31, color: 'from-teal-600 to-emerald-600' },
  { category: 'spontane-treffen', label: 'Spontane Treffen', count: 16, color: 'from-teal-500 to-green-500' },
  { category: 'party-nightlife', label: 'Party & Nightlife', count: 27, color: 'from-emerald-700 to-teal-700' },
];

export function DiscoverySection(): React.ReactElement {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Discover Spaces */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Räume für deine Projekte</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Finde den perfekten Raum für dein kreatives Projekt
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {spaceCategories.map((category, index) => (
              <motion.div
                key={category.type}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/spaces?type=${category.type}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative aspect-square bg-muted">
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.label}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                            <category.icon className="h-16 w-16 text-primary" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="flex items-center gap-2 mb-1">
                            <category.icon className="h-5 w-5" />
                            <h3 className="font-semibold">{category.label}</h3>
                          </div>
                          <p className="text-sm opacity-90">{category.count} Räume</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Discover Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Entdecke Events</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Von Kunst bis Sport - finde das perfekte Event
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/events?category=${category.category}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {category.label}
                      </h3>
                      <p className="text-2xl font-bold">{category.count}</p>
                      <p className="text-sm text-muted-foreground">Events</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
