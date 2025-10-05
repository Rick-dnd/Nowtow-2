'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { icon: CalendarIcon, label: 'Events', href: '/events' },
  { icon: Building2, label: 'Räume', href: '/spaces' },
  { icon: Briefcase, label: 'Services', href: '/services' },
];

const heroImages: string[] = ['/hero1.jpg', '/hero2.jpg', '/hero3.jpg'];

export function HeroSection(): React.ReactElement {
  const [searchType, setSearchType] = useState<string>('');
  const [date, setDate] = useState<DateRange | undefined>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect((): (() => void) => {
    const interval = setInterval((): void => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return (): void => clearInterval(interval);
  }, []);

  const scrollToHighlights = (): void => {
    const highlightsSection = document.getElementById('highlights');
    highlightsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
      <div className="relative z-20 container mx-auto px-4 text-center">
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

          {/* Search Bar - 3 Input Fields */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-5xl mx-auto mb-8"
          >
            <div className="bg-white rounded-full shadow-2xl p-2 flex items-center gap-2">
              {/* Was suchst du Field - Dropdown */}
              <div className="flex-1 px-4 py-2 border-r border-border">
                <label className="text-xs font-semibold text-foreground block mb-1">Was suchst du?</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-full border-0 bg-transparent p-0 h-auto focus:ring-0 text-sm">
                    <SelectValue placeholder="Wähle aus..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="spaces">Räume</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Wohin Field */}
              <div className="flex-1 px-4 py-2 border-r border-border">
                <label className="text-xs font-semibold text-foreground block mb-1">Wohin</label>
                <input
                  type="text"
                  placeholder="Reiseziele suchen"
                  className="w-full text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Wann Field - Date Range Picker */}
              <div className="flex-1 px-4 py-2">
                <label className="text-xs font-semibold text-foreground block mb-1">Wann</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full text-sm bg-transparent border-0 outline-none text-left flex items-center gap-2">
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'dd.MM.yy', { locale: de })} - {format(date.to, 'dd.MM.yy', { locale: de })}
                          </>
                        ) : (
                          format(date.from, 'dd.MM.yy', { locale: de })
                        )
                      ) : (
                        <span className="text-muted-foreground">Datum hinzufügen</span>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                      locale={de}
                    />
                  </PopoverContent>
                </Popover>
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 bg-white/95 hover:border-primary hover:bg-white transition-all backdrop-blur-sm"
                >
                  <Link href={category.href} className="flex items-center space-x-2">
                    <category.icon className="h-5 w-5" />
                    <span>{category.label}</span>
                  </Link>
                </Button>
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
  );
}
