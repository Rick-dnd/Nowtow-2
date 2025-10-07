'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSpace } from '@/hooks/useSpaces';
import { useProfile } from '@/hooks/useAuth';
import { notFound } from 'next/navigation';
import { SpaceImageGallery } from '@/components/spaces/SpaceImageGallery';
import type { SpaceImage } from '@/types/space-images';
import { SimilarListingsCarousel } from '@/components/shared/SimilarListingsCarousel';
import { MapPin, Users, Heart, Share2, Star, Clock, AlertCircle, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatPrice } from '@/lib/utils';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PageProps {
  params: Promise<{ id: string }>;
}

const spaceTypeLabels: Record<string, string> = {
  'tonstudio': 'Tonstudio',
  'fotostudio': 'Fotostudio',
  'werkstaetten': 'Werkstätten',
  'kunst-toepfer': 'Kunst & Töpfer',
  'popup-retail': 'Popup & Retail',
  'sportraeume': 'Sporträume',
  'gaming-podcast': 'Gaming & Podcast',
  'kuechen-food': 'Küchen & Food',
  'other': 'Sonstiges',
};

export default function SpaceDetailPage({ params }: PageProps): React.ReactElement {
  const { id } = React.use(params);
  const [date, setDate] = useState<DateRange | undefined>();
  const [rentalType, setRentalType] = useState<'hourly' | 'daily'>('hourly');

  // Fetch space from Supabase
  const { data: space, isLoading, error } = useSpace(id);

  // Fetch owner profile
  const { data: ownerProfile } = useProfile(space?.owner_id ?? undefined);

  // Hours state for hourly booking
  const [hours, setHours] = useState<number>(space?.minimum_booking_hours ?? 2);

  // Calculate days from date range for daily booking
  const days = React.useMemo(() => {
    if (!date?.from || !date?.to || rentalType !== 'daily') return 1;
    const diffTime = Math.abs(date.to.getTime() - date.from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays + 1); // +1 to include both start and end day
  }, [date, rentalType]);

  // Update hours when space loads
  React.useEffect(() => {
    if (space?.minimum_booking_hours) {
      setHours(space.minimum_booking_hours);
    }
  }, [space?.minimum_booking_hours]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 flex items-center justify-center">
          <p className="text-muted-foreground">Lade Raum...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !space) {
    notFound();
  }

  // Calculate total price based on rental type
  const basePrice =
    rentalType === 'hourly'
      ? space.hourly_price
      : rentalType === 'daily'
        ? space.daily_price
        : 0;

  const calculatedPrice =
    rentalType === 'hourly'
      ? (basePrice ?? 0) * hours
      : (basePrice ?? 0) * days;

  const serviceFee = Math.ceil(calculatedPrice * 0.05);
  const totalPrice = calculatedPrice + serviceFee;

  const priceLabel =
    rentalType === 'hourly'
      ? '/ Stunde'
      : '/ Tag';

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  // Prepare gallery images from images JSONB array
  const galleryImages: SpaceImage[] = ((): SpaceImage[] => {
    if (space.images && Array.isArray(space.images) && space.images.length > 0) {
      // Check if images are already SpaceImage objects or just strings
      const firstImage = space.images[0];
      if (typeof firstImage === 'object' && firstImage !== null && 'url' in firstImage) {
        // Already SpaceImage objects
        return (space.images as unknown as SpaceImage[]).sort((a, b) => a.order - b.order);
      }
      // Legacy string array - convert to SpaceImage format
      return (space.images as string[]).map((url: string, index: number) => ({
        url,
        order: index,
        is_main: index === 0,
      }));
    }
    // Fallback to single image_url if images array is empty
    if (space.image_url) {
      return [{ url: space.image_url, order: 0, is_main: true }];
    }
    return [];
  })();

  // Get owner info with fallback
  const ownerName = ownerProfile?.full_name || 'Space-Eigentümer';
  const ownerInitials = ownerName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Space Image Gallery */}
        <div className="container mx-auto px-4 pt-4">
          <SpaceImageGallery
            images={galleryImages}
            spaceName={space.name}
          />
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
                      {space.type && spaceTypeLabels[space.type]}
                    </Badge>
                    <h1 className="text-4xl font-bold mb-2">{space.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.8</span>
                        <span>(42 Bewertungen)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{space.address?.split(',')[0]}</span>
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
                    {ownerProfile?.avatar_url && <AvatarImage src={ownerProfile.avatar_url} />}
                    <AvatarFallback>{ownerInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Hosted by {ownerName}</p>
                    <p className="text-sm text-muted-foreground">Host seit {ownerProfile?.created_at ? new Date(ownerProfile.created_at).getFullYear() : '2024'}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Space Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Raum Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Kapazität</p>
                      <p className="text-muted-foreground">Bis zu {space.capacity} Personen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Verfügbarkeit</p>
                      <p className="text-muted-foreground">Täglich, 8:00 - 22:00 Uhr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">{space.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Beschreibung</h2>
                <p className="text-muted-foreground leading-relaxed">{space.description}</p>
              </div>

              <Separator />

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Ausstattung & Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array.isArray(space.amenities) && (space.amenities as string[]).map((amenity: string) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Pricing Table */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Preise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Stündlich</p>
                      <p className="text-3xl font-bold text-primary">€{formatPrice(space.hourly_price)}</p>
                      <p className="text-sm text-muted-foreground">pro Stunde</p>
                    </CardContent>
                  </Card>
                  {space.daily_price && (
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Täglich</p>
                        <p className="text-3xl font-bold text-primary">€{formatPrice(space.daily_price)}</p>
                        <p className="text-sm text-muted-foreground">pro Tag</p>
                        <Badge variant="secondary" className="mt-2">
                          Spare {Math.round((1 - (space.daily_price ?? 0) / ((space.hourly_price ?? 0) * 10)) * 100)}%
                        </Badge>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <Separator />

              {/* Location Map */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Standort</h2>
                {apiKey && space.latitude && space.longitude ? (
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <APIProvider apiKey={apiKey}>
                      <Map
                        defaultCenter={{ lat: space.latitude, lng: space.longitude }}
                        defaultZoom={15}
                        mapId="space-detail-map"
                        gestureHandling="greedy"
                        disableDefaultUI={false}
                        streetViewControl={false}
                        mapTypeControl={false}
                        mapTypeId="roadmap"
                      >
                        <AdvancedMarker position={{ lat: space.latitude, lng: space.longitude }}>
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

              {/* House Rules */}
              {Array.isArray(space.house_rules) && space.house_rules.length > 0 && (
                <>
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Hausregeln</h2>
                    <ul className="space-y-2">
                      {(space.house_rules as string[]).map((rule: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                </>
              )}

              {/* Important Info */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                  Wichtige Hinweise
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Mindestmietdauer: {space.minimum_booking_hours ?? 2} Stunden</li>
                  <li>Bitte halte den Raum sauber und ordentlich</li>
                  <li>Rauchen ist im Gebäude nicht gestattet</li>
                </ul>
              </div>

              <Separator />

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Häufig gestellte Fragen</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Wie läuft die Schlüsselübergabe ab?</AccordionTrigger>
                    <AccordionContent>
                      Der Schlüssel kann vor Ort abgeholt werden. Wir vereinbaren einen passenden Zeitpunkt per
                      Nachricht.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Kann ich den Raum vorher besichtigen?</AccordionTrigger>
                    <AccordionContent>
                      Ja, Besichtigungen sind nach Vereinbarung möglich. Kontaktiere einfach den Host über die
                      Nachrichtenfunktion.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Was passiert bei Schäden?</AccordionTrigger>
                    <AccordionContent>
                      Kleine Schäden werden von der Kaution abgedeckt. Bei größeren Schäden wird eine
                      Schadensersatzforderung gestellt.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Ist Equipment inklusive?</AccordionTrigger>
                    <AccordionContent>
                      Ja, alle aufgelisteten Features und Equipment sind im Preis inbegriffen. Spezielle Wünsche
                      bitte mit dem Host absprechen.
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
                        <span className="text-3xl font-bold">€{formatPrice(basePrice)}</span>
                        <span className="text-muted-foreground">{priceLabel}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.8</span>
                        <span>(42)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Rental Type */}
                      <div>
                        <label className="text-sm font-semibold block mb-2">Mietdauer</label>
                        <Select value={rentalType} onValueChange={(value) => setRentalType(value as 'hourly' | 'daily')}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Stündlich</SelectItem>
                            <SelectItem value="daily">Täglich</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Date Picker */}
                      <div>
                        <label className="text-sm font-semibold block mb-2">
                          {rentalType === 'hourly' ? 'Datum' : 'Zeitraum'}
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              <Calendar className="mr-2 h-4 w-4" />
                              {date?.from ? (
                                rentalType === 'hourly' ? (
                                  format(date.from, 'dd.MM.yyyy', { locale: de })
                                ) : date.to ? (
                                  <>
                                    {format(date.from, 'dd.MM.yy', { locale: de })} -{' '}
                                    {format(date.to, 'dd.MM.yy', { locale: de })}
                                  </>
                                ) : (
                                  format(date.from, 'dd.MM.yyyy', { locale: de })
                                )
                              ) : (
                                <span>{rentalType === 'hourly' ? 'Datum wählen' : 'Zeitraum wählen'}</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            {rentalType === 'hourly' ? (
                              <CalendarComponent
                                initialFocus
                                mode="single"
                                selected={date?.from}
                                onSelect={(selectedDate): void =>
                                  setDate(selectedDate ? { from: selectedDate, to: selectedDate } : undefined)
                                }
                                locale={de}
                              />
                            ) : (
                              <CalendarComponent
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                locale={de}
                              />
                            )}
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Hours Selection (only for hourly) */}
                      {rentalType === 'hourly' && (
                        <div>
                          <label className="text-sm font-semibold block mb-2">Anzahl Stunden</label>
                          <Select
                            value={hours.toString()}
                            onValueChange={(value: string): void => setHours(parseInt(value, 10))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                { length: 24 - (space.minimum_booking_hours ?? 1) + 1 },
                                (_, i) => i + (space.minimum_booking_hours ?? 1)
                              ).map((h: number) => (
                                <SelectItem key={h} value={h.toString()}>
                                  {h} {h === 1 ? 'Stunde' : 'Stunden'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Days info (calculated from date range for daily) */}
                      {rentalType === 'daily' && date?.from && date?.to && (
                        <div className="text-sm text-muted-foreground">
                          Ausgewählter Zeitraum: {days} {days === 1 ? 'Tag' : 'Tage'}
                        </div>
                      )}

                      <Separator />

                      {/* Price Summary */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            {rentalType === 'hourly'
                              ? `€${formatPrice(basePrice)} × ${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`
                              : `€${formatPrice(basePrice)} × ${days} ${days === 1 ? 'Tag' : 'Tage'}`}
                          </span>
                          <span>€{formatPrice(calculatedPrice)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Service Gebühr (5%)</span>
                          <span>€{formatPrice(serviceFee)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Gesamt</span>
                          <span>€{formatPrice(totalPrice)}</span>
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        Anfrage senden
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Kostenlose Stornierung bis 48h vor Mietbeginn
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
                        {ownerProfile?.avatar_url && <AvatarImage src={ownerProfile.avatar_url} />}
                        <AvatarFallback>{ownerInitials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{ownerName}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>4.9</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="font-semibold">12</p>
                        <p className="text-muted-foreground">Räume</p>
                      </div>
                      <div>
                        <p className="font-semibold">180</p>
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
                        <span>Versicherungsschutz</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Kaution geschützt</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Similar Spaces Carousel */}
          <div className="mt-12">
            <SimilarListingsCarousel
              title="Ähnliche Räume"
              items={[]}
              type="spaces"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
