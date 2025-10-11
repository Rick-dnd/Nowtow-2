'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Search, Calendar as CalendarIcon, Building2, Briefcase, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { GuestSelector } from '@/components/search/GuestSelector';
import { LocationAutocomplete } from '@/components/search/LocationAutocomplete';
import { CategorySelector } from '@/components/search/CategorySelector';
import { buildSearchUrl, type MainCategory } from '@/types/search';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { icon: CalendarIcon, label: 'Events', href: '/events' },
  { icon: Building2, label: 'Räume', href: '/spaces' },
  { icon: Briefcase, label: 'Services', href: '/services' },
];

const searchCategories = ['Events', 'Räume', 'Services'] as const;
type SearchCategory = typeof searchCategories[number];

const heroImages: string[] = ['/hero1.jpg', '/hero2.jpg', '/hero3.jpg'];

export function HeroSection(): React.ReactElement {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('Events');
  const [location, setLocation] = useState<string>('');
  const [subcategory, setSubcategory] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({ adults: 0, children: 0, pets: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const interval = setInterval((): void => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return (): void => clearInterval(interval);
  }, []);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (contentRef.current) {
      // Parallax effect on hero content
      gsap.to(contentRef.current, {
        y: -50,
        opacity: 0.8,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Cleanup
    return (): void => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToHighlights = (): void => {
    const highlightsSection = document.getElementById('highlights');
    highlightsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (): void => {
    const searchUrl = buildSearchUrl(selectedCategory as MainCategory, {
      location,
      subcategory,
      from: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
      to: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
      adults: guests.adults,
      children: guests.children,
      pets: guests.pets,
    });

    router.push(searchUrl);
  };

  // Reset subcategory when main category changes
  useEffect((): void => {
    setSubcategory('');
  }, [selectedCategory]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Images with Auto-Rotation */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex] ?? '/hero1.jpg'}
              alt="München Events und Räume"
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-10" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Entdecke München Live
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md">
            Dein lokales Erlebnis-Netzwerk für Events, Räume und Services
          </p>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="max-w-4xl mx-auto mb-4"
          >
            <div className="flex items-center gap-8 px-4">
              {searchCategories.map((category): React.ReactElement => (
                <button
                  key={category}
                  onClick={(): void => setSelectedCategory(category)}
                  className={`text-base font-medium pb-3 border-b-2 transition-all ${
                    selectedCategory === category
                      ? 'border-white text-white'
                      : 'border-transparent text-white/70 hover:text-white'
                  }`}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Search Bar - 5 Fields */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-5xl mx-auto mb-8"
          >
            <div className="bg-white rounded-full shadow-lg border border-border/50 p-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-0">
              {/* Wohin Field */}
              <motion.div
                className="flex-1 px-4 py-3 rounded-full cursor-pointer transition-all"
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
                tabIndex={0}
              >
                <label className="text-xs font-semibold text-foreground block mb-1">Wohin</label>
                <LocationAutocomplete
                  value={location}
                  onChange={setLocation}
                  placeholder="Reiseziele suchen"
                />
              </motion.div>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-px h-12 bg-border/50" />

              {/* Kategorie Field - Subcategory Selector */}
              <motion.div
                className="flex-1 px-4 py-3 rounded-full cursor-pointer transition-all"
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
                tabIndex={0}
              >
                <label className="text-xs font-semibold text-foreground block mb-1">Kategorie</label>
                <CategorySelector
                  mainCategory={selectedCategory as MainCategory}
                  value={subcategory}
                  onChange={setSubcategory}
                  placeholder="Alle Kategorien"
                />
              </motion.div>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-px h-12 bg-border/50" />

              {/* Wann Field - Date Range */}
              <motion.div
                className="flex-1 px-4 py-3 rounded-full cursor-pointer transition-all"
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
                tabIndex={0}
              >
                <label className="text-xs font-semibold text-foreground block mb-1">Wann</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full text-sm bg-transparent border-0 outline-none text-left text-foreground" type="button">
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, 'dd.MM.yy', { locale: de })} – {format(dateRange.to, 'dd.MM.yy', { locale: de })}
                          </>
                        ) : (
                          format(dateRange.from, 'dd.MM.yy', { locale: de })
                        )
                      ) : (
                        <span className="text-muted-foreground">Datum hinzufügen</span>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      locale={de}
                      numberOfMonths={2}
                      disabled={(date): boolean => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </motion.div>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-px h-12 bg-border/50" />

              {/* Wer Field - Guests */}
              <motion.div
                className="flex-1 px-4 py-3 rounded-full cursor-pointer transition-all flex items-center gap-3"
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
                tabIndex={0}
              >
                <div className="flex-1">
                  <label className="text-xs font-semibold text-foreground block mb-1">Wer</label>
                  <GuestSelector value={guests} onChange={setGuests} />
                </div>

                {/* Search Button */}
                <Button
                  size="icon"
                  className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shrink-0"
                  aria-label="Suchen"
                  type="button"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link href={category.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-2 bg-white/95 hover:border-primary hover:bg-white hover:scale-105 active:scale-95 transition-all backdrop-blur-sm transform-gpu"
                  >
                    <category.icon className="h-5 w-5 mr-2" />
                    <span>{category.label}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={scrollToHighlights}
            className="inline-flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Nach unten scrollen"
          >
            <span className="text-sm mb-2">Nach unten scrollen</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
    </APIProvider>
  );
}
