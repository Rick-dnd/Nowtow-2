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
import { useEvents } from '@/hooks/useEvents';
import type { EventFilters } from '@/services/events.service';

export default function CommunityEventsPage(): React.ReactElement {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleNearMeLocation = (latitude: number, longitude: number): void => {
    console.log('User location:', latitude, longitude);
    // TODO: Filter events by proximity
  };

  // Build filters object
  const filters: EventFilters = {
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    // Add date filtering if needed in the future
  };

  // Fetch events using hook
  const { data: events, isLoading, error } = useEvents(filters);

  // Filter by date on client side (since API might not support date filtering yet)
  const filteredEvents = (events ?? []).filter((event) => {
    if (!selectedDate) return true;

    // Check if event.start_datetime matches selected date
    if (event.start_datetime) {
      const eventDate = new Date(event.start_datetime);
      return eventDate.toDateString() === selectedDate.toDateString();
    }
    return false;
  });

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Lädt Events...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Fehler: {error.message}</p>
                <Button variant="outline" onClick={(): void => window.location.reload()}>
                  Neu laden
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

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
                  <SelectItem value="Kultur">Kultur</SelectItem>
                  <SelectItem value="Musik">Musik</SelectItem>
                </SelectContent>
              </Select>

              {/* Near Me Button */}
              <NearMeButton onLocationFound={handleNearMeLocation} />

              {/* View Mode Toggle */}
              <div className="flex gap-2 lg:col-span-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={(): void => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={(): void => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedDate || selectedCategory !== 'all') && (
              <div className="flex items-center gap-2 pt-4 border-t">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Aktive Filter:</span>
                {selectedDate && (
                  <Badge variant="secondary">
                    {format(selectedDate, 'dd.MM.yyyy', { locale: de })}
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary">{selectedCategory}</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(): void => {
                    setSelectedDate(undefined);
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
                <Button variant="outline" onClick={(): void => {
                  setSelectedDate(undefined);
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
                        <Badge>{event.category ?? 'Event'}</Badge>
                      </div>

                      {/* Event Title */}
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                        {event.name}
                      </h3>

                      {/* Description */}
                      {event.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      {/* Date & Time */}
                      {event.start_datetime && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>
                            {format(new Date(event.start_datetime), 'dd.MM.yyyy • HH:mm', { locale: de })} Uhr
                          </span>
                        </div>
                      )}

                      {/* Location */}
                      {(event.venue_name || event.city) && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {event.venue_name ?? event.city ?? 'Ort nicht angegeben'}
                          </span>
                        </div>
                      )}

                      {/* Price & Attendees */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm">
                          {event.ticket_price && event.ticket_price > 0 ? (
                            <span className="font-semibold">
                              {event.ticket_price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Kostenlos</span>
                          )}
                        </div>
                        {event.max_attendees && (
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{event.max_attendees} Plätze</span>
                          </div>
                        )}
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
