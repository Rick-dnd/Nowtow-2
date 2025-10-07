'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Download,
  Mail,
  Share2,
  Edit,
  XCircle,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Navigation,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface BookingData {
  id: string;
  confirmation_number: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  type: 'event' | 'space' | 'service';
  title: string;
  description?: string;
  image_url?: string;
  date: string;
  time?: string;
  duration?: string;
  location: string;
  address?: string;
  attendees?: number;
  price: number;
  service_fee: number;
  tax: number;
  payment_method: string;
  payment_status: 'paid' | 'pending' | 'refunded';
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  special_requests?: string;
  booked_at: string;
  host_name?: string;
  host_email?: string;
  host_phone?: string;
  cancellation_policy?: string;
}

interface BookingDetailsPageProps {
  booking: BookingData;
  onEdit?: () => void;
  onCancel?: () => void;
  onDownloadReceipt?: () => void;
  onEmailReceipt?: () => void;
  onShare?: () => void;
  onContactHost?: () => void;
  onGetDirections?: () => void;
}

export function BookingDetailsPage({
  booking,
  onEdit,
  onCancel,
  onDownloadReceipt,
  onEmailReceipt,
  onShare,
  onContactHost,
  onGetDirections,
}: BookingDetailsPageProps): React.ReactElement {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const total = booking.price + booking.service_fee + booking.tax;

  const getStatusBadge = (): React.ReactElement => {
    switch (booking.status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPaymentStatusBadge = (): React.ReactElement => {
    switch (booking.payment_status) {
      case 'paid':
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Pending
          </Badge>
        );
      case 'refunded':
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleCancelBooking = (): void => {
    if (onCancel) {
      onCancel();
    }
    setShowCancelDialog(false);
  };

  const canCancel = booking.status === 'confirmed' || booking.status === 'pending';
  const canEdit = booking.status === 'confirmed' || booking.status === 'pending';

  return (
    <div className="container max-w-5xl py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Booking Details</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Confirmation: {booking.confirmation_number}</span>
              <span>•</span>
              <span>Booked on {booking.booked_at}</span>
            </div>
          </div>
          <div>{getStatusBadge()}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Overview */}
          <Card>
            <CardContent className="pt-6 space-y-4">
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
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold">{booking.title}</h2>
                  <Badge variant="secondary">
                    {booking.type === 'event' && 'Event'}
                    {booking.type === 'space' && 'Space'}
                    {booking.type === 'service' && 'Service'}
                  </Badge>
                </div>
                {booking.description && (
                  <p className="text-muted-foreground">{booking.description}</p>
                )}
              </div>

              <Separator />

              {/* Key Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Date</p>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  </div>
                </div>

                {booking.time && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Time</p>
                      <p className="text-sm text-muted-foreground">{booking.time}</p>
                    </div>
                  </div>
                )}

                {booking.duration && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Duration</p>
                      <p className="text-sm text-muted-foreground">{booking.duration}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Location</p>
                    <p className="text-sm text-muted-foreground">{booking.location}</p>
                    {booking.address && (
                      <p className="text-xs text-muted-foreground mt-1">{booking.address}</p>
                    )}
                  </div>
                </div>

                {booking.attendees && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Attendees</p>
                      <p className="text-sm text-muted-foreground">{booking.attendees} people</p>
                    </div>
                  </div>
                )}
              </div>

              {booking.special_requests && (
                <>
                  <Separator />
                  <div>
                    <p className="font-medium text-sm mb-1">Special Requests</p>
                    <p className="text-sm text-muted-foreground">{booking.special_requests}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Host Information */}
          {booking.host_name && (
            <Card>
              <CardHeader>
                <CardTitle>Host Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{booking.host_name}</span>
                </div>
                {booking.host_email && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{booking.host_email}</span>
                  </div>
                )}
                {booking.host_phone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{booking.host_phone}</span>
                  </div>
                )}
                <Separator />
                <Button variant="outline" onClick={onContactHost} className="w-full gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Host
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Cancellation Policy */}
          {booking.cancellation_policy && (
            <Card>
              <CardHeader>
                <CardTitle>Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{booking.cancellation_policy}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Payment & Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium capitalize">
                    {booking.payment_method.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  {getPaymentStatusBadge()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" onClick={onDownloadReceipt} className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download Receipt
              </Button>
              <Button variant="outline" onClick={onEmailReceipt} className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Email Receipt
              </Button>
              <Button variant="outline" onClick={onShare} className="w-full gap-2">
                <Share2 className="h-4 w-4" />
                Share Booking
              </Button>
              {booking.address && (
                <Button variant="outline" onClick={onGetDirections} className="w-full gap-2">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Manage Booking */}
          <Card>
            <CardHeader>
              <CardTitle>Manage Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {canEdit && (
                <Button variant="outline" onClick={onEdit} className="w-full gap-2">
                  <Edit className="h-4 w-4" />
                  Modify Booking
                </Button>
              )}
              {canCancel && (
                <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive">
                      <XCircle className="h-4 w-4" />
                      Cancel Booking
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this booking? This action cannot be undone.
                        Please review the cancellation policy for refund information.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelBooking} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Cancel Booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
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
              {booking.customer_phone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{booking.customer_phone}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Need Help */}
          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Need Help?</p>
                    <p className="text-muted-foreground mb-3">
                      If you have any questions about your booking, our support team is here to
                      help.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
