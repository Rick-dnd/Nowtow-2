'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, ShieldCheck, CreditCard } from 'lucide-react';

const checkoutFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  full_name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  special_requests: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface BookingDetails {
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
}

interface CheckoutPageProps {
  booking: BookingDetails;
  onSubmit: (data: CheckoutFormValues) => void;
}

export function CheckoutPage({ booking, onSubmit }: CheckoutPageProps): React.ReactElement {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema) as never,
    defaultValues: {
      email: '',
      full_name: '',
      phone: '',
      special_requests: '',
    },
  });

  const total = booking.price + booking.service_fee + booking.tax;

  const handleSubmit = (data: CheckoutFormValues): void => {
    onSubmit(data);
  };

  return (
    <div className="container max-w-6xl py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <span className="text-sm font-medium">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-muted" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="text-sm text-muted-foreground">Payment</span>
          </div>
          <div className="w-12 h-0.5 bg-muted" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <span className="text-sm text-muted-foreground">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>Please provide your contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Max Mustermann" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+49 123 456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="special_requests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Any special requirements or requests..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Cancellation Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                • Free cancellation up to 24 hours before the booking starts
              </p>
              <p>
                • 50% refund if cancelled 12-24 hours before
              </p>
              <p>
                • No refund for cancellations within 12 hours
              </p>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the{' '}
              <a href="/terms" className="text-primary underline-offset-4 hover:underline">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary underline-offset-4 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={!agreedToTerms}
            size="lg"
            className="w-full"
          >
            Continue to Payment
          </Button>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Booking Image & Title */}
                {booking.image_url && (
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                    <img
                      src={booking.image_url}
                      alt={booking.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-1">{booking.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {booking.type === 'event' && 'Event'}
                    {booking.type === 'space' && 'Space Rental'}
                    {booking.type === 'service' && 'Service'}
                  </Badge>
                </div>

                <Separator />

                {/* Booking Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">{booking.date}</p>
                    </div>
                  </div>

                  {booking.time && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-muted-foreground">{booking.time}</p>
                      </div>
                    </div>
                  )}

                  {booking.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-muted-foreground">{booking.duration}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{booking.location}</p>
                    </div>
                  </div>

                  {booking.attendees && (
                    <div className="flex items-start gap-3">
                      <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Attendees</p>
                        <p className="text-muted-foreground">{booking.attendees} people</p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Price</span>
                    <span>€{booking.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>€{booking.service_fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>€{booking.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Secure payment processing</span>
                </div>

                {/* Payment Methods */}
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">We accept</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 border rounded text-xs font-semibold">
                      <CreditCard className="h-3 w-3" />
                      VISA
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 border rounded text-xs font-semibold">
                      <CreditCard className="h-3 w-3" />
                      MC
                    </div>
                    <div className="px-2 py-1 border rounded text-xs font-semibold">
                      PayPal
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
