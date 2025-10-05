'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { mockEvents } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Users, Heart, Share2, Star, Clock, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Map, AdvancedMarker, Pin, APIProvider } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface PageProps {
  params: Promise<{ id: string }>;
}

const categoryLabels: Record<string, string> = {
  'kunst-kreativ': 'Kunst & Kreativ',
  'musik-performance': 'Musik & Performance',
  'sport-fitness': 'Sport & Fitness',
  'familie-kinder': 'Familie & Kinder',
  'workshop': 'Workshop',
  'essen-geniessen': 'Essen & Genießen',
  'spontane-treffen': 'Spontane Treffen',
  'party-nightlife': 'Party & Nightlife',
};

export default function EventDetailPage({ params }: PageProps): React.ReactElement {
  const { id } = React.use(params);
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);

  // Find event by converting title to slug
  const event = mockEvents.find(
    (e) => e.title.toLowerCase().replace(/\s+/g, '-') === id
  );

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.start_time);
  const endDate = new Date(event.end_time);
  const bookedSpots = Math.floor(event.capacity * 0.5); // 50% booked
  const bookingProgress = (bookedSpots / event.capacity) * 100;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Image Gallery */}
        <div className="relative w-full h-[60vh] bg-muted">
          {event.image_urls[0] ? (
            <Image
              src={event.image_urls[0]}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
              <Calendar className="h-32 w-32 text-emerald-600" />
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">
                      {categoryLabels[event.category]}
                    </Badge>
                    <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.5</span>
                        <span>(23 Bewertungen)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location_address.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>MH</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Hosted by Max Mustermann</p>
                    <p className="text-sm text-muted-foreground">Host seit 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Event Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Event Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Datum</p>
                      <p className="text-muted-foreground">
                        {format(eventDate, 'EEEE, d. MMMM yyyy', { locale: de })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Zeit</p>
                      <p className="text-muted-foreground">
                        {format(eventDate, 'HH:mm', { locale: de })} - {format(endDate, 'HH:mm', { locale: de })} Uhr
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Kapazität</p>
                      <p className="text-muted-foreground">{bookedSpots} / {event.capacity} gebucht</p>
                      <Progress value={bookingProgress} className="mt-2 h-2" />
                      <p className="text-sm text-muted-foreground mt-1">
                        ⏰ {event.capacity - bookedSpots} Plätze frei
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">{event.location_address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Beschreibung</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>

              <Separator />

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Was ist inklusive</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['WiFi verfügbar', 'Getränke inklusive', 'Garderobe vorhanden', 'Barrierearm', 'Parkplätze'].map(
                    (amenity) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{amenity}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Separator />

              {/* Location Map */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Standort</h2>
                {apiKey ? (
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <APIProvider apiKey={apiKey}>
                      <Map
                        defaultCenter={{ lat: event.location_lat, lng: event.location_lng }}
                        defaultZoom={15}
                        mapId="event-detail-map"
                        gestureHandling="greedy"
                        disableDefaultUI={false}
                        streetViewControl={false}
                        mapTypeControl={false}
                        mapTypeId="roadmap"
                      >
                        <AdvancedMarker position={{ lat: event.location_lat, lng: event.location_lng }}>
                          <Pin background="#10b981" borderColor="#059669" glyphColor="#d1fae5" />
                        </AdvancedMarker>
                      </Map>
                    </APIProvider>
                  </div>
                ) : (
                  <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Google Maps API Key nicht konfiguriert</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* What to Bring */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Was du mitbringen solltest</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Gute Laune</li>
                  <li>Personalausweis (Mindestalter: 18)</li>
                  <li>Bequeme Kleidung</li>
                </ul>
              </div>

              <Separator />

              {/* Important Info */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                  Wichtige Hinweise
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Mindestalter: 18 Jahre</li>
                  <li>Kein Rauchen</li>
                  <li>Bitte pünktlich erscheinen</li>
                </ul>
              </div>

              <Separator />

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Häufig gestellte Fragen</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Kann ich stornieren?</AccordionTrigger>
                    <AccordionContent>
                      Ja, du kannst bis zu 24 Stunden vor dem Event kostenlos stornieren.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Gibt es Parkplätze?</AccordionTrigger>
                    <AccordionContent>
                      Ja, Parkplätze sind in der Nähe verfügbar. Wir empfehlen aber die Anreise mit öffentlichen
                      Verkehrsmitteln.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Ist das Event barrierefrei?</AccordionTrigger>
                    <AccordionContent>
                      Das Event ist barrierefrei zugänglich. Bei speziellen Bedürfnissen kontaktiere bitte den Host.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Booking Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold">
                          {event.price === 0 ? 'Kostenlos' : `€${event.price}`}
                        </span>
                        {event.price > 0 && <span className="text-muted-foreground">/ Person</span>}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.5</span>
                        <span>(23)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Date Picker */}
                      <div>
                        <label className="text-sm font-semibold block mb-2">Datum</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              <Calendar className="mr-2 h-4 w-4" />
                              {date?.from ? (
                                format(date.from, 'dd.MM.yyyy', { locale: de })
                              ) : (
                                <span>Datum wählen</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={setDate}
                              numberOfMonths={1}
                              locale={de}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Guest Selector */}
                      <div>
                        <label className="text-sm font-semibold block mb-2">Gäste</label>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                          >
                            -
                          </Button>
                          <span className="flex-1 text-center font-semibold">{guests}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setGuests(Math.min(event.capacity - bookedSpots, guests + 1))}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      {/* Price Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            €{event.price} x {guests} Gäste
                          </span>
                          <span>€{event.price * guests}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Service Gebühr</span>
                          <span>€{Math.ceil(event.price * guests * 0.1)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Gesamt</span>
                          <span>€{event.price * guests + Math.ceil(event.price * guests * 0.1)}</span>
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        Jetzt buchen
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Kostenlose Stornierung bis 24h vor dem Event
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Host Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Host</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>MM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">Max Mustermann</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>5.0</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="font-semibold">45</p>
                        <p className="text-muted-foreground">Events</p>
                      </div>
                      <div>
                        <p className="font-semibold">230</p>
                        <p className="text-muted-foreground">Reviews</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        Nachricht senden
                      </Button>
                      <Button variant="outline" className="w-full">
                        Profil ansehen
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Safety Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Sicherheit</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Verifizierter Host</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Sichere Zahlung</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>24/7 Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Rückerstattungsgarantie</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
