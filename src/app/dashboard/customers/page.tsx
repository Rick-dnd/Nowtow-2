'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, MessageSquare, User, Eye, TrendingUp, Euro, Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useAuth';
import { useUserBookings } from '@/hooks/useBookings';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

export default function CustomersPage(): React.ReactElement {
  const { data: user } = useUser();
  const { data: bookings, isLoading } = useUserBookings(user?.id);
  const [searchQuery, setSearchQuery] = useState('');

  // Aggregate customer data from bookings
  const customers = useMemo(() => {
    if (!bookings) return [];

    const customerMap = new Map<string, {
      id: string;
      bookings: number;
      totalSpent: number;
      lastBooking: string | null;
      firstBooking: string | null;
    }>();

    bookings.forEach(booking => {
      const customerId = booking.user_id || 'unknown';
      const existing = customerMap.get(customerId);

      if (existing) {
        existing.bookings += 1;
        existing.totalSpent += booking.total_price || 0;
        if (booking.created_at && (!existing.lastBooking || booking.created_at > existing.lastBooking)) {
          existing.lastBooking = booking.created_at;
        }
      } else {
        customerMap.set(customerId, {
          id: customerId,
          bookings: 1,
          totalSpent: booking.total_price || 0,
          lastBooking: booking.created_at,
          firstBooking: booking.created_at,
        });
      }
    });

    return Array.from(customerMap.values())
      .filter(c => c.id !== 'unknown')
      .sort((a, b) => b.totalSpent - a.totalSpent);
  }, [bookings]);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers;
    return customers.filter(c => c.id.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [customers, searchQuery]);

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalCustomers = customers.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Kunden-Verwaltung</h1>
        <p className="text-muted-foreground mt-1">Verwalte deine Kunden</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kunden Gesamt</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">Einzigartige Kunden</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buchungen Gesamt</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Gesamt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ø Buchungen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCustomers > 0 ? ((bookings?.length || 0) / totalCustomers).toFixed(1) : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Pro Kunde</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Umsatz Gesamt</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Gesamt</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kundenliste</CardTitle>
          <CardDescription>Kunden sortiert nach Gesamtumsatz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Kunden suchen nach ID..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Erste Buchung</TableHead>
                  <TableHead>Buchungen</TableHead>
                  <TableHead>Ausgegeben</TableHead>
                  <TableHead>Letzte Buchung</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {searchQuery ? 'Keine Kunden gefunden' : 'Noch keine Kunden'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{customer.id.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium font-mono text-sm">
                                #{customer.id.slice(0, 8)}
                              </span>
                              {customer.bookings >= 5 && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600">
                                  VIP
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {customer.firstBooking && format(parseISO(customer.firstBooking), 'dd.MM.yyyy', { locale: de })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{customer.bookings}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">€{customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {customer.lastBooking && formatDistanceToNow(parseISO(customer.lastBooking), { addSuffix: true, locale: de })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
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
