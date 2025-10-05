'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package } from 'lucide-react';

const services = [
  {
    id: '1',
    name: 'Professional Photography',
    category: 'Fotografie',
    rating: 5.0,
    reviews: 47,
    status: 'active' as const,
    packages: [
      { name: 'Basic', price: '€99', bookings: 12 },
      { name: 'Standard', price: '€199', bookings: 8 },
      { name: 'Premium', price: '€399', bookings: 3 },
    ],
    monthlyRevenue: '€3,456',
  },
];

export default function ServicesPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground mt-1">Manage your service offerings</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-emerald-600">
          <Plus className="mr-2 h-4 w-4" />
          Create Service
        </Button>
      </div>

      {services.map((service) => (
        <Card key={service.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>Category: {service.category}</CardDescription>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                ⭐ <span className="ml-1 font-medium">{service.rating}</span>
                <span className="ml-1 text-sm text-muted-foreground">
                  ({service.reviews} reviews)
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Packages
              </h4>
              <div className="grid gap-3 md:grid-cols-3">
                {service.packages.map((pkg, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <p className="font-medium">{pkg.name}</p>
                    <p className="text-lg font-bold text-emerald-600">{pkg.price}</p>
                    <p className="text-sm text-muted-foreground">
                      {pkg.bookings} bookings this month
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">Total Revenue This Month</p>
              <p className="text-2xl font-bold text-emerald-600">{service.monthlyRevenue}</p>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline">Edit</Button>
              <Button variant="outline">View Portfolio</Button>
              <Button variant="outline">Manage Bookings</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
