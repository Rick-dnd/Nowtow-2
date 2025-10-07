'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Euro, Star, Eye, Calendar, MessageSquare, BarChart3, Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useAuth';
import { useUserBookings } from '@/hooks/useBookings';
import { useOrganizerEvents } from '@/hooks/useEvents';
import { useOwnerSpaces } from '@/hooks/useSpaces';
import { useProviderServices } from '@/hooks/useServices';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';

const quickActions = [
  { label: 'Event erstellen', icon: Calendar, href: '/dashboard/events' },
  { label: 'Analytics ansehen', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Nachrichten prüfen', icon: MessageSquare, href: '/dashboard/messages' },
  { label: 'Bewertungen verwalten', icon: Star, href: '/dashboard/reviews' },
];

export default function DashboardPage(): React.ReactElement {
  const { data: user } = useUser();
  const { data: bookings, isLoading: bookingsLoading } = useUserBookings(user?.id);
  const { data: events } = useOrganizerEvents(user?.id);
  const { data: spaces } = useOwnerSpaces(user?.id);
  const { data: services } = useProviderServices(user?.id);

  const activeListingsCount = (events?.length || 0) + (spaces?.length || 0) + (services?.length || 0);
  const pendingBookingsCount = bookings?.filter(b => b.status === 'pending')?.length || 0;

  // Calculate KPIs from real data
  const confirmedBookings = bookings?.filter(b => b.status === 'confirmed' || b.status === 'completed') || [];
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.total_price || 0), 0);
  const bookingsCount = confirmedBookings.length;

  const kpiData = [
    {
      title: 'Umsatz',
      value: `€${totalRevenue.toFixed(0)}`,
      change: '-',
      trend: 'up' as const,
      icon: Euro,
    },
    {
      title: 'Buchungen',
      value: `${bookingsCount}`,
      change: '-',
      trend: 'up' as const,
      icon: Calendar,
    },
    {
      title: 'Bewertung',
      value: '-',
      change: '-',
      trend: 'up' as const,
      icon: Star,
    },
    {
      title: 'Ansichten',
      value: '-',
      change: '-',
      trend: 'up' as const,
      icon: Eye,
    },
  ];

  // Get recent bookings (last 10)
  const recentBookings = (bookings || [])
    .filter(b => b.created_at)
    .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-br from-primary/10 via-emerald-500/10 to-teal-500/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Willkommen zurück{user?.email ? `, ${user.email}` : ''}! 👋</CardTitle>
          <CardDescription className="text-base">
            Du hast {activeListingsCount} aktive Angebote und {pendingBookingsCount} neue Buchungen
          </CardDescription>
        </CardHeader>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              {kpi.change !== '-' && (
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {kpi.change}
                  </span>
                  <span className="ml-1">vom letzten Monat</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Umsatz Chart</CardTitle>
            <CardDescription>Letzte 30 Tage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Chart Integration</p>
                <p className="text-xs">(Zukünftig)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buchungen Chart</CardTitle>
            <CardDescription>Dieser Monat vs Letzter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Chart Integration</p>
                <p className="text-xs">(Zukünftig)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Aktuelle Buchungen</CardTitle>
              <CardDescription>Die 10 neuesten Buchungen</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                CSV exportieren
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/bookings">Alle ansehen</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {bookingsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Noch keine Buchungen vorhanden</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Betrag</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.created_at && format(new Date(booking.created_at), 'dd.MM.yyyy', { locale: de })}
                    </TableCell>
                    <TableCell>
                      {booking.bookable_type === 'event' && 'Event'}
                      {booking.bookable_type === 'space' && 'Space'}
                      {booking.bookable_type === 'service' && 'Service'}
                    </TableCell>
                    <TableCell>€{booking.total_price?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === 'confirmed'
                            ? 'default'
                            : booking.status === 'pending'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {booking.status === 'confirmed' && 'Bestätigt'}
                        {booking.status === 'pending' && 'Ausstehend'}
                        {booking.status === 'completed' && 'Abgeschlossen'}
                        {booking.status === 'cancelled' && 'Storniert'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                asChild
              >
                <Link href={action.href}>
                  <action.icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
