'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Users,
  Download,
  Mail,
  Share2,
  Home,
} from 'lucide-react';

interface BookingConfirmationData {
  booking_id: string;
  confirmation_number: string;
  type: 'event' | 'space' | 'service';
  title: string;
  image_url?: string;
  date: string;
  time?: string;
  duration?: string;
  location: string;
  attendees?: number;
  price: number;
  service_fee: number;
  tax: number;
  customer_email: string;
  customer_name: string;
  payment_method: string;
}

interface BookingConfirmationPageProps {
  booking: BookingConfirmationData;
  onDownloadReceipt?: () => void;
  onEmailReceipt?: () => void;
  onShare?: () => void;
}

export function BookingConfirmationPage({
  booking,
  onDownloadReceipt,
  onEmailReceipt,
  onShare,
}: BookingConfirmationPageProps): React.ReactElement {
  const total = booking.price + booking.service_fee + booking.tax;

  const handleGoHome = (): void => {
    window.location.href = '/';
  };

  const handleGoToDashboard = (): void => {
    window.location.href = '/dashboard/bookings';
  };

  return (
    <div className="container max-w-4xl py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              ✓
            </div>
            <span className="text-sm font-medium">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              ✓
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
          <div className="w-12 h-0.5 bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              ✓
            </div>
            <span className="text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <Card className="mb-6 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-4">
              Your booking has been successfully confirmed. A confirmation email has been sent to{' '}
              <span className="font-medium">{booking.customer_email}</span>
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-lg">
              <span className="text-sm text-muted-foreground">Confirmation Number:</span>
              <span className="font-mono font-bold text-lg">{booking.confirmation_number}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Booking Image & Title */}
          {booking.image_url && (
            <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
              <Image
                src={booking.image_url}
                alt={booking.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          )}

          <div>
            <h3 className="font-semibold text-lg mb-1">{booking.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {booking.type === 'event' && 'Event Ticket'}
              {booking.type === 'space' && 'Space Rental'}
              {booking.type === 'service' && 'Service Booking'}
            </Badge>
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-muted-foreground">{booking.date}</p>
              </div>
            </div>

            {booking.time && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-muted-foreground">{booking.time}</p>
                </div>
              </div>
            )}

            {booking.duration && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-muted-foreground">{booking.duration}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-muted-foreground">{booking.location}</p>
              </div>
            </div>

            {booking.attendees && (
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Attendees</p>
                  <p className="text-muted-foreground">{booking.attendees} people</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Booking Price</span>
              <span>€{booking.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>€{booking.service_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (VAT)</span>
              <span>€{booking.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-base">
              <span>Total Paid</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-medium capitalize">{booking.payment_method.replace('_', ' ')}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Booking ID</span>
            <span className="font-mono">{booking.booking_id}</span>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{booking.customer_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{booking.customer_email}</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Button variant="outline" onClick={onDownloadReceipt} className="gap-2">
          <Download className="h-4 w-4" />
          Download Receipt
        </Button>
        <Button variant="outline" onClick={onEmailReceipt} className="gap-2">
          <Mail className="h-4 w-4" />
          Email Receipt
        </Button>
        <Button variant="outline" onClick={onShare} className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Booking
        </Button>
      </div>

      {/* What's Next */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>What&apos;s Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-medium">Check Your Email</p>
              <p className="text-muted-foreground">
                We&apos;ve sent a confirmation email with all the details and a calendar invite.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-medium">Prepare for Your Booking</p>
              <p className="text-muted-foreground">
                Make sure to arrive on time and bring any required items or documents.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium">Manage Your Booking</p>
              <p className="text-muted-foreground">
                View, modify, or cancel your booking anytime from your dashboard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={handleGoHome} className="gap-2 flex-1">
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
        <Button onClick={handleGoToDashboard} className="gap-2 flex-1">
          View My Bookings
        </Button>
      </div>

      {/* Need Help */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Need help?{' '}
          <a href="/help" className="text-primary underline-offset-4 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
