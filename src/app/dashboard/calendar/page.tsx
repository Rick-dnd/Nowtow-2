'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface Booking {
  id: string;
  type: 'event' | 'space' | 'service';
  title: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  customer: {
    name: string;
  };
  price: number;
}

// Mock data - will be replaced with real Supabase data
const mockBookings: Booking[] = [
  {
    id: '1',
    type: 'event',
    title: 'Tech Meetup München',
    date: '2025-10-15',
    time: '18:00',
    status: 'confirmed',
    customer: { name: 'Max Mustermann' },
    price: 25.0,
  },
  {
    id: '2',
    type: 'space',
    title: 'Konferenzraum A - Ganztags',
    date: '2025-10-20',
    time: '09:00',
    status: 'confirmed',
    customer: { name: 'Anna Schmidt' },
    price: 350.0,
  },
  {
    id: '3',
    type: 'service',
    title: 'Fotoshooting Event',
    date: '2025-10-22',
    time: '14:00',
    status: 'pending',
    customer: { name: 'Tom Wagner' },
    price: 450.0,
  },
  {
    id: '4',
    type: 'event',
    title: 'Workshop: React Best Practices',
    date: '2025-10-25',
    time: '10:00',
    status: 'confirmed',
    customer: { name: 'Lisa Bauer' },
    price: 75.0,
  },
];

export default function DashboardCalendarPage(): React.ReactElement {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Get dates with bookings
  const datesWithBookings = mockBookings.map((booking) => new Date(booking.date));

  // Get bookings for selected date
  const selectedDateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const bookingsOnSelectedDate = mockBookings.filter((booking) => {
    const matchesDate = booking.date === selectedDateString;
    const matchesType = typeFilter === 'all' || booking.type === typeFilter;
    return matchesDate && matchesType;
  });

  const getStatusColor = (status: Booking['status']): string => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeColor = (type: Booking['type']): string => {
    switch (type) {
      case 'event':
        return 'bg-purple-100 text-purple-800';
      case 'space':
        return 'bg-blue-100 text-blue-800';
      case 'service':
        return 'bg-emerald-100 text-emerald-800';
    }
  };

  const getTypeLabel = (type: Booking['type']): string => {
    switch (type) {
      case 'event':
        return 'Event';
      case 'space':
        return 'Raum';
      case 'service':
        return 'Service';
    }
  };

  const getStatusLabel = (status: Booking['status']): string => {
    switch (status) {
      case 'confirmed':
        return 'Bestätigt';
      case 'pending':
        return 'Ausstehend';
      case 'cancelled':
        return 'Storniert';
      case 'completed':
        return 'Abgeschlossen';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Kalender</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Übersicht über deine Buchungen
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-4">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Buchungskalender</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Type Filter */}
              <div className="mb-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Typ filtern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Typen</SelectItem>
                    <SelectItem value="event">Events</SelectItem>
                    <SelectItem value="space">Räume</SelectItem>
                    <SelectItem value="service">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Calendar */}
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={de}
                modifiers={{
                  hasBookings: datesWithBookings,
                }}
                modifiersStyles={{
                  hasBookings: {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: 'hsl(var(--primary))',
                  },
                }}
                className="rounded-md border"
              />

              {/* Stats */}
              <div className="mt-6 space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Bestätigt</p>
                  <p className="text-2xl font-bold text-green-700">
                    {mockBookings.filter((b) => b.status === 'confirmed').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Ausstehend</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {mockBookings.filter((b) => b.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate
                  ? format(selectedDate, 'dd. MMMM yyyy', { locale: de })
                  : 'Datum wählen'}
              </CardTitle>
              {bookingsOnSelectedDate.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {bookingsOnSelectedDate.length} Buchung(en) an diesem Tag
                </p>
              )}
            </CardHeader>
            <CardContent>
              {bookingsOnSelectedDate.length === 0 ? (
                <div className="py-12 text-center">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Keine Buchungen an diesem Tag
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookingsOnSelectedDate.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(booking.type)}>
                              {getTypeLabel(booking.type)}
                            </Badge>
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusLabel(booking.status)}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{booking.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Kunde: {booking.customer.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            €{booking.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{booking.time} Uhr</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          {bookingsOnSelectedDate.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Tages-Zusammenfassung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Buchungen</p>
                    <p className="text-2xl font-bold">{bookingsOnSelectedDate.length}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Umsatz</p>
                    <p className="text-2xl font-bold">
                      €
                      {bookingsOnSelectedDate
                        .reduce((sum, b) => sum + b.price, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Bestätigt</p>
                    <p className="text-2xl font-bold">
                      {bookingsOnSelectedDate.filter((b) => b.status === 'confirmed').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
