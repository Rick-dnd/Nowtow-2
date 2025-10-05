'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Calendar as CalendarIcon, Check, X, Clock, MoreHorizontal } from 'lucide-react';

// Mock Data Types
interface Booking {
  id: string;
  customer: {
    name: string;
    avatar: string;
    initials: string;
  };
  type: 'event' | 'space' | 'service';
  itemName: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

interface ScheduleItem {
  time: string;
  type: string;
  name: string;
  customer: string;
}

// Mock Data
const todaySchedule: ScheduleItem[] = [
  {
    time: '09:00 - 12:00',
    type: 'Space',
    name: 'Fotostudio Mitte',
    customer: '@user1',
  },
  {
    time: '14:00 - 16:00',
    type: 'Service',
    name: 'Photography Session',
    customer: '@user2',
  },
  {
    time: '19:00 - 23:00',
    type: 'Event',
    name: 'Summer Night Party',
    customer: '@user3',
  },
];

const upcomingBookings: Booking[] = [
  {
    id: '1',
    customer: {
      name: 'Max Mustermann',
      avatar: '',
      initials: 'MM',
    },
    type: 'event',
    itemName: 'Summer Night Party',
    date: '15.Oct.2024',
    time: '20:00',
    duration: '4h',
    price: '€12',
    status: 'confirmed',
  },
  {
    id: '2',
    customer: {
      name: 'Anna Schmidt',
      avatar: '',
      initials: 'AS',
    },
    type: 'space',
    itemName: 'Fotostudio Mitte',
    date: '16.Oct.2024',
    time: '09:00',
    duration: '3h',
    price: '€45',
    status: 'pending',
  },
  {
    id: '3',
    customer: {
      name: 'Tom Weber',
      avatar: '',
      initials: 'TW',
    },
    type: 'service',
    itemName: 'Photography Session',
    date: '18.Oct.2024',
    time: '14:00',
    duration: '2h',
    price: '€99',
    status: 'confirmed',
  },
  {
    id: '4',
    customer: {
      name: 'Lisa Müller',
      avatar: '',
      initials: 'LM',
    },
    type: 'event',
    itemName: 'Yoga in the Park',
    date: '19.Oct.2024',
    time: '09:00',
    duration: '1.5h',
    price: '€8',
    status: 'completed',
  },
  {
    id: '5',
    customer: {
      name: 'Paul Fischer',
      avatar: '',
      initials: 'PF',
    },
    type: 'space',
    itemName: 'Co-Working Space',
    date: '20.Oct.2024',
    time: '10:00',
    duration: '8h',
    price: '€60',
    status: 'pending',
  },
];

const getStatusBadge = (status: Booking['status']): React.ReactElement => {
  const variants = {
    confirmed: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
    pending: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    completed: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    cancelled: 'bg-red-100 text-red-700 hover:bg-red-100',
  };

  const labels = {
    confirmed: 'Confirmed',
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return <Badge className={variants[status]}>{labels[status]}</Badge>;
};

const getTypeBadge = (type: Booking['type']): React.ReactElement => {
  const labels = {
    event: 'Event',
    space: 'Space',
    service: 'Service',
  };

  return (
    <Badge variant="outline" className="font-normal">
      {labels[type]}
    </Badge>
  );
};

export default function BookingsPage(): React.ReactElement {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
              {todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.time}</p>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.customer}</p>
                  </div>
                </div>
              ))}
              {todaySchedule.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">
                  No bookings scheduled for today
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Next 7 days bookings overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.customer.avatar} />
                          <AvatarFallback>{booking.customer.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{booking.customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(booking.type)}</TableCell>
                    <TableCell className="font-medium">{booking.itemName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{booking.date}</div>
                        <div className="text-muted-foreground">{booking.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.duration}</TableCell>
                    <TableCell className="font-medium">{booking.price}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
