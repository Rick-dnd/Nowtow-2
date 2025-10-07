'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Euro, Calendar, Eye, MousePointerClick, Loader2 } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useUser } from '@/hooks/useAuth';
import { useUserBookings } from '@/hooks/useBookings';
import { useOrganizerEvents } from '@/hooks/useEvents';
import { useOwnerSpaces } from '@/hooks/useSpaces';
import { useProviderServices } from '@/hooks/useServices';
import { format, subDays, isAfter } from 'date-fns';
import { de } from 'date-fns/locale';

export default function AnalyticsPage(): React.ReactElement {
  const [timeRange, setTimeRange] = useState<string>('7days');

  const { data: user } = useUser();
  const { data: bookings, isLoading: bookingsLoading } = useUserBookings(user?.id);
  const { data: events } = useOrganizerEvents(user?.id);
  const { data: spaces } = useOwnerSpaces(user?.id);
  const { data: services } = useProviderServices(user?.id);

  // Calculate date range
  const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
  const startDate = subDays(new Date(), days);

  // Filter bookings by date range
  const filteredBookings = useMemo(() => {
    return (bookings || []).filter(b => {
      if (!b.created_at) return false;
      const bookingDate = new Date(b.created_at);
      return isAfter(bookingDate, startDate);
    });
  }, [bookings, startDate]);

  // Calculate KPIs from real data
  const confirmedBookings = filteredBookings.filter(b => b.status === 'confirmed' || b.status === 'completed');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.total_price || 0), 0);
  const totalBookings = confirmedBookings.length;

  // Generate revenue data by day
  const revenueData = useMemo(() => {
    const dataByDay: Record<string, { revenue: number; bookings: number }> = {};

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateKey = format(date, 'dd.MM', { locale: de });
      dataByDay[dateKey] = { revenue: 0, bookings: 0 };
    }

    confirmedBookings.forEach(booking => {
      if (!booking.created_at) return;
      const dateKey = format(new Date(booking.created_at), 'dd.MM', { locale: de });
      if (dataByDay[dateKey]) {
        dataByDay[dateKey].revenue += booking.total_price || 0;
        dataByDay[dateKey].bookings += 1;
      }
    });

    return Object.entries(dataByDay).map(([date, data]) => ({
      date,
      revenue: data.revenue,
      bookings: data.bookings,
    }));
  }, [confirmedBookings, days]);

  // Category distribution
  const categoryData = useMemo(() => {
    const eventBookings = filteredBookings.filter(b => b.bookable_type === 'event');
    const spaceBookings = filteredBookings.filter(b => b.bookable_type === 'space');
    const serviceBookings = filteredBookings.filter(b => b.bookable_type === 'service');

    return [
      {
        category: 'Events',
        bookings: eventBookings.length,
        revenue: eventBookings.reduce((sum, b) => sum + (b.total_price || 0), 0),
      },
      {
        category: 'Spaces',
        bookings: spaceBookings.length,
        revenue: spaceBookings.reduce((sum, b) => sum + (b.total_price || 0), 0),
      },
      {
        category: 'Services',
        bookings: serviceBookings.length,
        revenue: serviceBookings.reduce((sum, b) => sum + (b.total_price || 0), 0),
      },
    ];
  }, [filteredBookings]);

  // Revenue distribution for pie chart
  const revenueDistribution = useMemo(() => {
    return categoryData.map((cat, idx) => ({
      name: cat.category,
      value: cat.revenue,
      color: idx === 0 ? '#10b981' : idx === 1 ? '#14b8a6' : '#22c55e',
    }));
  }, [categoryData]);

  const kpiData = [
    {
      title: 'Total Revenue',
      value: `€${totalRevenue.toFixed(0)}`,
      change: '-',
      trend: 'up' as const,
      icon: Euro,
      description: 'vs. last period',
    },
    {
      title: 'Total Bookings',
      value: `${totalBookings}`,
      change: '-',
      trend: 'up' as const,
      icon: Calendar,
      description: 'vs. last period',
    },
    {
      title: 'Active Listings',
      value: `${(events?.length || 0) + (spaces?.length || 0) + (services?.length || 0)}`,
      change: '-',
      trend: 'up' as const,
      icon: Eye,
      description: 'total listings',
    },
    {
      title: 'Avg. Booking Value',
      value: totalBookings > 0 ? `€${(totalRevenue / totalBookings).toFixed(0)}` : '€0',
      change: '-',
      trend: 'up' as const,
      icon: MousePointerClick,
      description: 'per booking',
    },
  ];

  if (bookingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive overview of your performance metrics
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span
                  className={`inline-flex items-center ${
                    kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}
                </span>
                <span className="ml-2">{kpi.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Over Time */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Daily revenue and booking trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Revenue (€)"
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bookings by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings by Category</CardTitle>
            <CardDescription>Distribution across service types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="category" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="bookings" fill="#10b981" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Revenue share by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: { name?: string; percent?: number }) => `${props.name ?? ''}: ${((props.percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bookings Status Overview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Bookings Status</CardTitle>
            <CardDescription>Current bookings by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    status: 'Pending',
                    count: filteredBookings.filter(b => b.status === 'pending').length,
                  },
                  {
                    status: 'Confirmed',
                    count: filteredBookings.filter(b => b.status === 'confirmed').length,
                  },
                  {
                    status: 'Completed',
                    count: filteredBookings.filter(b => b.status === 'completed').length,
                  },
                  {
                    status: 'Cancelled',
                    count: filteredBookings.filter(b => b.status === 'cancelled').length,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="status" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#10b981" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
