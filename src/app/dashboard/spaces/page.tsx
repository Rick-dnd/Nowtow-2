'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, MapPin } from 'lucide-react';

const spaces = [
  {
    id: '1',
    name: 'Fotostudio Mitte',
    type: 'Studio',
    hourlyRate: '€15/h',
    dailyRate: '€120/day',
    bookings: '23 this month',
    revenue: '€1,450',
    rating: 4.8,
    reviews: 34,
    status: 'active' as const,
    location: 'München Mitte',
    instantBooking: true,
  },
  {
    id: '2',
    name: 'Co-Working Space',
    type: 'Office',
    hourlyRate: '€8/h',
    dailyRate: '€60/day',
    bookings: '18 this month',
    revenue: '€920',
    rating: 4.5,
    reviews: 22,
    status: 'active' as const,
    location: 'München Schwabing',
    instantBooking: false,
  },
];

export default function SpacesPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Spaces</h1>
          <p className="text-muted-foreground mt-1">Manage your space listings</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-emerald-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Space
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {spaces.map((space) => (
          <Card key={space.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{space.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {space.location}
                  </CardDescription>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{space.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rates</p>
                  <p className="font-medium">{space.hourlyRate}</p>
                  <p className="text-sm text-muted-foreground">{space.dailyRate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="font-medium">{space.bookings}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="font-medium text-emerald-600">{space.revenue}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    ⭐ <span className="ml-1 text-sm font-medium">{space.rating}</span>
                    <span className="ml-1 text-sm text-muted-foreground">({space.reviews})</span>
                  </div>
                  {space.instantBooking && (
                    <Badge variant="outline" className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Instant Booking
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">Edit</Button>
                <Button variant="outline" className="flex-1">View Bookings</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
