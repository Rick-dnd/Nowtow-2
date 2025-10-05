'use client';

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
import { ArrowUpRight, ArrowDownRight, TrendingUp, Euro, Star, Eye, Calendar, MessageSquare, BarChart3 } from 'lucide-react';

// Mock data
const kpiData = [
  {
    title: 'Revenue',
    value: '€1,234',
    change: '+12%',
    trend: 'up',
    icon: Euro,
  },
  {
    title: 'Bookings',
    value: '45',
    change: '+8%',
    trend: 'up',
    icon: Calendar,
  },
  {
    title: 'Rating',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: Star,
  },
  {
    title: 'Views',
    value: '2.3k',
    change: '+15%',
    trend: 'up',
    icon: Eye,
  },
];

const recentBookings = [
  { date: '10.Oct', item: 'Event: Live Jazz Night', guest: '@user1', amount: '€12', status: 'Confirmed' },
  { date: '09.Oct', item: 'Space: Tonstudio', guest: '@user2', amount: '€45', status: 'Pending' },
  { date: '09.Oct', item: 'Service: Fotoshooting', guest: '@user3', amount: '€199', status: 'Completed' },
  { date: '08.Oct', item: 'Event: Workshop', guest: '@user4', amount: '€25', status: 'Confirmed' },
  { date: '08.Oct', item: 'Space: Fotostudio', guest: '@user5', amount: '€80', status: 'Completed' },
];

const quickActions = [
  { label: 'Create Event', icon: Calendar, href: '/events/create' },
  { label: 'View Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Check Messages', icon: MessageSquare, href: '/dashboard/messages' },
  { label: 'Manage Reviews', icon: Star, href: '/dashboard/reviews' },
];

export default function DashboardPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-br from-primary/10 via-emerald-500/10 to-teal-500/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back, @username! 👋</CardTitle>
          <CardDescription className="text-base">
            You have 3 active listings and 5 new bookings
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
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {kpi.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Chart</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Chart.js integration</p>
                <p className="text-xs">(Phase 2)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookings Chart</CardTitle>
            <CardDescription>This month vs Last</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Chart.js integration</p>
                <p className="text-xs">(Phase 2)</p>
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
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>10 most recent bookings</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{booking.date}</TableCell>
                  <TableCell>{booking.item}</TableCell>
                  <TableCell>{booking.guest}</TableCell>
                  <TableCell>{booking.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === 'Confirmed'
                          ? 'default'
                          : booking.status === 'Pending'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
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
                <a href={action.href}>
                  <action.icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
