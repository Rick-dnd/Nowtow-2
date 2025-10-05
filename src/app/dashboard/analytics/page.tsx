'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Euro, Calendar, Eye, MousePointerClick } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
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

// Mock Data
const revenueData = [
  { date: '01.10', revenue: 1200, bookings: 45 },
  { date: '02.10', revenue: 1800, bookings: 52 },
  { date: '03.10', revenue: 1400, bookings: 38 },
  { date: '04.10', revenue: 2200, bookings: 65 },
  { date: '05.10', revenue: 1900, bookings: 58 },
  { date: '06.10', revenue: 2400, bookings: 72 },
  { date: '07.10', revenue: 2100, bookings: 61 },
];

const categoryData = [
  { category: 'Events', bookings: 245, revenue: 12450 },
  { category: 'Spaces', bookings: 189, revenue: 9450 },
  { category: 'Services', bookings: 156, revenue: 15600 },
];

const trafficData = [
  { date: '01.10', views: 2100, clicks: 450 },
  { date: '02.10', views: 2400, clicks: 520 },
  { date: '03.10', views: 2200, clicks: 480 },
  { date: '04.10', views: 2800, clicks: 620 },
  { date: '05.10', views: 2600, clicks: 580 },
  { date: '06.10', views: 3100, clicks: 710 },
  { date: '07.10', views: 2900, clicks: 650 },
];

const revenueDistribution = [
  { name: 'Events', value: 12450, color: '#10b981' },
  { name: 'Spaces', value: 9450, color: '#14b8a6' },
  { name: 'Services', value: 15600, color: '#22c55e' },
];

export default function AnalyticsPage(): React.ReactElement {
  const [timeRange, setTimeRange] = useState<string>('7days');

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '€37,500',
      change: '+15.3%',
      trend: 'up' as const,
      icon: Euro,
      description: 'vs. last period',
    },
    {
      title: 'Total Bookings',
      value: '590',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Calendar,
      description: 'vs. last period',
    },
    {
      title: 'Page Views',
      value: '18.2k',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Eye,
      description: 'vs. last period',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.5%',
      trend: 'down' as const,
      icon: MousePointerClick,
      description: 'vs. last period',
    },
  ];

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

        {/* Traffic Overview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Page views and click-through trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  name="Page Views"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#14b8a6"
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                  name="Clicks"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
