'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Calendar as CalendarIcon, MapPin, Users, Grid3x3, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { NearMeButton } from '@/components/shared/NearMeButton';
import Link from 'next/link';

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  community: {
    name: string;
    slug: string;
  };
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  attendees_count: number;
  max_attendees: number | null;
  category: string;
  image_url: string | null;
  is_rsvp: boolean;
}

// Mock data - will be replaced with real Supabase data
const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Tech Meetup München - KI & Machine Learning',
    description: 'Monatliches Treffen der München Techies Community. Diesmal mit Fokus auf KI-Entwicklung.',
    community: {
      name: 'München Techies',
      slug: 'muenchen-techies',
    },
    date: '2025-11-15',
    time: '18:00',
    location: {
      name: 'TechHub München',
      address: 'Maximilianstraße 13, 80539 München',
      latitude: 48.1391,
      longitude: 11.5802,
    },
    attendees_count: 45,
    max_attendees: 80,
    category: 'Networking',
    image_url: null,
    is_rsvp: false,
  },
  {
    id: '2',
    title: 'Food Tour durch Schwabing',
    description: 'Gemeinsame kulinarische Entdeckungsreise durch die besten Restaurants in Schwabing.',
    community: {
      name: 'München Foodies',
      slug: 'muenchen-foodies',
    },
    date: '2025-11-20',
    time: '19:00',
    location: {
      name: 'Münchner Freiheit',
      address: 'Münchner Freiheit, 80802 München',
      latitude: 48.1619,
      longitude: 11.5887,
    },
    attendees_count: 12,
    max_attendees: 15,
    category: 'Food & Drink',
    image_url: null,
    is_rsvp: true,
  },
  {
    id: '3',
    title: 'Morgenlauf im Englischen Garten',
    description: 'Gemeinsamer Lauf jeden Samstag um 8 Uhr. Alle Fitness-Level willkommen!',
    community: {
      name: 'Fitness München',
      slug: 'fitness-muenchen',
    },
    date: '2025-11-16',
    time: '08:00',
    location: {
      name: 'Englischer Garten',
      address: 'Englischer Garten, 80538 München',
      latitude: 48.1642,
      longitude: 11.6056,
    },
    attendees_count: 23,
    max_attendees: null,
    category: 'Sport & Fitness',
    image_url: null,
    is_rsvp: false,
  },
];

export default function CommunityEventsPage(): React.ReactElement {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleNearMeLocation = (latitude: number, longitude: number): void => {
    console.log('User location:', latitude, longitude);
    // TODO: Filter events by proximity
  };

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCommunity =
      selectedCommunity === 'all' || event.community.slug === selectedCommunity;
    const matchesCategory =
      selectedCategory === 'all' || event.category === selectedCategory;
    const matchesDate =
      !selectedDate ||
      new Date(event.date).toDateString() === selectedDate.toDateString();

    return matchesCommunity && matchesCategory && matchesDate;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Community Events</h1>
            <p className="text-lg text-muted-foreground">
              Entdecke Events von deinen Communities und vernetze dich offline
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              {/* Date Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, 'dd.MM.yyyy', { locale: de })
                    ) : (
                      <span>Datum wählen</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    locale={de}
                  />
                </PopoverContent>
              </Popover>

              {/* Community Filter */}
              <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                <SelectTrigger>
                  <SelectValue placeholder="Community" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Communities</SelectItem>
                  <SelectItem value="muenchen-techies">München Techies</SelectItem>
                  <SelectItem value="muenchen-foodies">München Foodies</SelectItem>
                  <SelectItem value="fitness-muenchen">Fitness München</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Kategorien</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                  <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                  <SelectItem value="Sport & Fitness">Sport & Fitness</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>

              {/* Near Me Button */}
              <NearMeButton onLocationFound={handleNearMeLocation} />

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedDate || selectedCommunity !== 'all' || selectedCategory !== 'all') && (
              <div className="flex items-center gap-2 pt-4 border-t">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Aktive Filter:</span>
                {selectedDate && (
                  <Badge variant="secondary">
                    {format(selectedDate, 'dd.MM.yyyy', { locale: de })}
                  </Badge>
                )}
                {selectedCommunity !== 'all' && (
                  <Badge variant="secondary">{selectedCommunity}</Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary">{selectedCategory}</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedDate(undefined);
                    setSelectedCommunity('all');
                    setSelectedCategory('all');
                  }}
                >
                  Zurücksetzen
                </Button>
              </div>
            )}
          </div>

          {/* Events Grid/List */}
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Keine Events gefunden</p>
                <Button variant="outline" onClick={() => {
                  setSelectedDate(undefined);
                  setSelectedCommunity('all');
                  setSelectedCategory('all');
                }}>
                  Filter zurücksetzen
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      {/* Event Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge>{event.category}</Badge>
                        {event.is_rsvp && (
                          <Badge variant="secondary">Zugesagt</Badge>
                        )}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                        {event.title}
                      </h3>

                      {/* Community */}
                      <Link
                        href={`/community/c/${event.community.slug}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-sm text-primary hover:underline mb-3">
                          {event.community.name}
                        </p>
                      </Link>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Date & Time */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {format(new Date(event.date), 'dd.MM.yyyy', { locale: de })} • {event.time}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{event.location.name}</span>
                      </div>

                      {/* Attendees */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {event.attendees_count}
                            {event.max_attendees && ` / ${event.max_attendees}`} Teilnehmer
                          </span>
                        </div>
                        <Button size="sm" variant={event.is_rsvp ? 'outline' : 'default'}>
                          {event.is_rsvp ? 'Abgesagt' : 'Zusagen'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
