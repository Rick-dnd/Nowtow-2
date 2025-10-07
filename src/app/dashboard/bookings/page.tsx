'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar as CalendarIcon, Check, X, Clock, MoreHorizontal, Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useAuth';
import { useUserBookings } from '@/hooks/useBookings';
import { format, isToday, isFuture, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

const getStatusBadge = (status: string): React.ReactElement => {
  const variants: Record<string, string> = {
    confirmed: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
    pending: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    completed: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    cancelled: 'bg-red-100 text-red-700 hover:bg-red-100',
  };

  const labels: Record<string, string> = {
    confirmed: 'Confirmed',
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return <Badge className={variants[status] || 'bg-gray-100 text-gray-700'}>{labels[status] || status}</Badge>;
};

const getTypeBadge = (type: string): React.ReactElement => {
  const labels: Record<string, string> = {
    event: 'Event',
    space: 'Space',
    service: 'Service',
  };

  return (
    <Badge variant="outline" className="font-normal">
      {labels[type] || type}
    </Badge>
  );
};

export default function BookingsPage(): React.ReactElement {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: user } = useUser();
  const { data: bookings, isLoading } = useUserBookings(user?.id);

  // Filter today's bookings
  const todaySchedule = useMemo(() => {
    return (bookings || []).filter(booking => {
      if (!booking.start_datetime) return false;
      return isToday(parseISO(booking.start_datetime));
    });
  }, [bookings]);

  // Filter upcoming bookings (next 7 days)
  const upcomingBookings = useMemo(() => {
    return (bookings || [])
      .filter(booking => {
        if (!booking.start_datetime) return false;
        const bookingDate = parseISO(booking.start_datetime);
        return isFuture(bookingDate);
      })
      .sort((a, b) => {
        const dateA = a.start_datetime ? parseISO(a.start_datetime).getTime() : 0;
        const dateB = b.start_datetime ? parseISO(b.start_datetime).getTime() : 0;
        return dateA - dateB;
      })
      .slice(0, 10);
  }, [bookings]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-muted-foreground mt-1">Manage your booking calendar</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Calendar
            </CardTitle>
            <CardDescription>Select a date to view bookings</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardDescription>Your bookings for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">
                  No bookings scheduled for today
                </p>
              ) : (
                todaySchedule.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-start space-x-4 rounded-lg border p-4"
                  >
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {booking.start_datetime && format(parseISO(booking.start_datetime), 'HH:mm', { locale: de })}
                        </p>
                        <Badge variant="outline">{booking.bookable_type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Booking #{booking.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">€{booking.total_price?.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Your upcoming bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No upcoming bookings
                    </TableCell>
                  </TableRow>
                ) : (
                  upcomingBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{getTypeBadge(booking.bookable_type || 'unknown')}</TableCell>
                      <TableCell className="font-mono text-sm">#{booking.id.slice(0, 8)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>
                            {booking.start_datetime && format(parseISO(booking.start_datetime), 'dd.MM.yyyy', { locale: de })}
                          </div>
                          <div className="text-muted-foreground">
                            {booking.start_datetime && format(parseISO(booking.start_datetime), 'HH:mm', { locale: de })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">€{booking.total_price?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell>{getStatusBadge(booking.status || 'unknown')}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              Confirm
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" />
                              Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
