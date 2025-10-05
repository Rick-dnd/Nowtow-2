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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Wallet, ShieldCheck, Lock } from 'lucide-react';

const paymentFormSchema = z.object({
  payment_method: z.enum(['credit_card', 'paypal', 'sofort'], {
    required_error: 'Please select a payment method',
  }),
  card_number: z.string().optional(),
  card_holder: z.string().optional(),
  expiry_date: z.string().optional(),
  cvv: z.string().optional(),
  billing_address: z.string().optional(),
  billing_city: z.string().optional(),
  billing_zip: z.string().optional(),
  billing_country: z.string().optional(),
}).refine(
  (data) => {
    if (data.payment_method === 'credit_card') {
      return (
        data.card_number &&
        data.card_holder &&
        data.expiry_date &&
        data.cvv &&
        data.billing_address &&
        data.billing_city &&
        data.billing_zip &&
        data.billing_country
      );
    }
    return true;
  },
  {
    message: 'All credit card fields are required',
    path: ['card_number'],
  }
);

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface BookingSummary {
  title: string;
  price: number;
  service_fee: number;
  tax: number;
}

interface PaymentPageProps {
  booking: BookingSummary;
  onSubmit: (data: PaymentFormValues) => void;
  onBack: () => void;
}

export function PaymentPage({ booking, onSubmit, onBack }: PaymentPageProps): React.ReactElement {
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'sofort'>('credit_card');

  const form = useForm({
    resolver: zodResolver(paymentFormSchema) as never,
    defaultValues: {
      payment_method: 'credit_card' as const,
      card_number: '',
      card_holder: '',
      expiry_date: '',
      cvv: '',
      billing_address: '',
      billing_city: '',
      billing_zip: '',
      billing_country: '',
    },
  });

  const total = booking.price + booking.service_fee + booking.tax;

  const handleSubmit = (data: PaymentFormValues): void => {
    onSubmit(data);
  };

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="container max-w-6xl py-8">
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
              2
            </div>
            <span className="text-sm font-medium">Payment</span>
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
        {/* Left Column - Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you&apos;d like to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => {
                  const method = value as 'credit_card' | 'paypal' | 'sofort';
                  setPaymentMethod(method);
                  form.setValue('payment_method', method as never);
                }}
                className="gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Wallet className="h-5 w-5" />
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-xs text-muted-foreground">Pay with your PayPal account</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="sofort" id="sofort" />
                  <Label htmlFor="sofort" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Wallet className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Sofort</p>
                      <p className="text-xs text-muted-foreground">Direct bank transfer</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Credit Card Form */}
          {paymentMethod === 'credit_card' && (
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
                <CardDescription>Enter your card information</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="card_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              {...field}
                              value={field.value ? formatCardNumber(field.value) : ''}
                              onChange={(e) => {
                                const cleaned = e.target.value.replace(/\s/g, '');
                                if (/^\d{0,16}$/.test(cleaned)) {
                                  field.onChange(cleaned);
                                }
                              }}
                              maxLength={19}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="card_holder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cardholder Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Max Mustermann" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiry_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="MM/YY"
                                {...field}
                                value={field.value ? formatExpiryDate(field.value) : ''}
                                onChange={(e) => {
                                  const cleaned = e.target.value.replace(/\D/g, '');
                                  if (cleaned.length <= 4) {
                                    field.onChange(cleaned);
                                  }
                                }}
                                maxLength={5}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="123"
                                {...field}
                                type="password"
                                onChange={(e) => {
                                  const cleaned = e.target.value.replace(/\D/g, '');
                                  if (cleaned.length <= 4) {
                                    field.onChange(cleaned);
                                  }
                                }}
                                maxLength={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Billing Address</h3>

                      <FormField
                        control={form.control}
                        name="billing_address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address *</FormLabel>
                            <FormControl>
                              <Input placeholder="Hauptstraße 123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="billing_city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City *</FormLabel>
                              <FormControl>
                                <Input placeholder="Berlin" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="billing_zip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code *</FormLabel>
                              <FormControl>
                                <Input placeholder="10115" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="billing_country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <FormControl>
                              <Input placeholder="Germany" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* PayPal Message */}
          {paymentMethod === 'paypal' && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Wallet className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Pay with PayPal</h3>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll be redirected to PayPal to complete your payment securely.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sofort Message */}
          {paymentMethod === 'sofort' && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Wallet className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Pay with Sofort</h3>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll be redirected to your bank to complete the payment securely.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Info */}
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <Lock className="h-5 w-5 text-green-600" />
            <div className="flex-1 text-sm">
              <p className="font-medium">Secure Payment</p>
              <p className="text-muted-foreground text-xs">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack} size="lg" className="flex-1">
              Back
            </Button>
            <Button onClick={form.handleSubmit(handleSubmit)} size="lg" className="flex-1">
              Complete Payment
            </Button>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{booking.title}</h3>
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
                  <span>256-bit SSL encryption</span>
                </div>

                {/* Payment Protection */}
                <div className="pt-2 space-y-1">
                  <p className="text-xs font-medium">Payment Protection</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Full refund guarantee</li>
                    <li>• Secure checkout</li>
                    <li>• Money-back policy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
