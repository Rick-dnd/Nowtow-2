'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/services/ServiceCard';
import { useServices } from '@/hooks/useServices';

const categories = [
  { id: 'koeche', label: 'Köch:innen' },
  { id: 'training', label: 'Training' },
  { id: 'fotografie', label: 'Fotografie' },
  { id: 'musik', label: 'Musik' },
  { id: 'sport', label: 'Sport' },
  { id: 'workshop', label: 'Workshop' },
];

export default function ServicesPage(): React.ReactElement {
  // Fetch services from Supabase
  const { data: services } = useServices();
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Search Bar */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="bg-white rounded-full shadow-md p-2 flex items-center gap-2 max-w-5xl mx-auto">
              {/* Wohin Field */}
              <div className="flex-1 px-4 py-2 border-r border-border">
                <label className="text-xs font-semibold text-foreground block mb-1">Wohin</label>
                <input
                  type="text"
                  placeholder="Reiseziele suchen"
                  className="w-full text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Wann Field */}
              <div className="flex-1 px-4 py-2 border-r border-border">
                <label className="text-xs font-semibold text-foreground block mb-1">Wann</label>
                <input
                  type="text"
                  placeholder="Datum hinzufügen"
                  className="w-full text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Art des Services Field */}
              <div className="flex-1 px-4 py-2">
                <label className="text-xs font-semibold text-foreground block mb-1">Art des Services</label>
                <input
                  type="text"
                  placeholder="Service hinzufügen"
                  className="w-full text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Search Button */}
              <Button
                size="lg"
                className="rounded-full px-6 bg-primary hover:bg-primary/90"
                aria-label="Suchen"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="container mx-auto px-4 py-8">
          {categories.map((category) => (
            <div key={category.id} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{category.label}</h2>

              {/* Horizontal Scroll Container */}
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                  {(services || []).slice(0, 5).map((service, index) => (
                    <div key={`${category.id}-${index}`} className="flex-shrink-0 w-80 snap-start">
                      <ServiceCard service={service} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
