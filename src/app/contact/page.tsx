'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name muss mindestens 2 Zeichen lang sein' }),
  email: z.string().email({ message: 'Bitte gib eine gültige E-Mail-Adresse ein' }),
  subject: z.string().min(1, { message: 'Bitte wähle einen Betreff' }),
  message: z.string().min(10, { message: 'Nachricht muss mindestens 10 Zeichen lang sein' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage(): React.ReactElement {
  return (
    <>
    <ContactPageContent />
    <Footer />
    </>
  );
}

function ContactPageContent(): React.ReactElement {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues): Promise<void> => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form data:', data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Kontaktiere uns</h1>
          <p className="text-muted-foreground text-lg">
            Wir sind hier, um zu helfen. Sende uns eine Nachricht!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Contact Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Sende uns eine Nachricht</CardTitle>
              <CardDescription>
                Fülle das Formular aus und wir melden uns innerhalb von 24 Stunden bei dir
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-emerald-700 font-medium">
                    ✓ Nachricht erfolgreich gesendet! Wir melden uns bald bei dir.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Max Mustermann"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-Mail <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="max@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Betreff <span className="text-destructive">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue('subject', value)}>
                    <SelectTrigger id="subject" aria-describedby={errors.subject ? 'subject-error' : undefined}>
                      <SelectValue placeholder="Wähle einen Betreff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Allgemeine Frage</SelectItem>
                      <SelectItem value="support">Technischer Support</SelectItem>
                      <SelectItem value="partnership">Partnerschaft</SelectItem>
                      <SelectItem value="press">Presse</SelectItem>
                      <SelectItem value="other">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p id="subject-error" className="text-sm text-destructive">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Nachricht <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    placeholder="Deine Nachricht..."
                    rows={6}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Wird gesendet...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Nachricht senden
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kontaktinformationen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">E-Mail</p>
                    <a href="mailto:info@nowtown.co" className="text-sm text-muted-foreground hover:text-primary">
                      info@nowtown.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">
                      Müllerstraße 12<br />
                      80469 München<br />
                      Deutschland
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <a href="tel:+498912345678" className="text-sm text-muted-foreground hover:text-primary">
                      +49 89 1234567
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Öffnungszeiten</p>
                    <p className="text-sm text-muted-foreground">
                      Mo-Fr: 9:00 - 18:00 Uhr<br />
                      Sa: 10:00 - 14:00 Uhr
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schnelle Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="/help" className="block text-sm text-primary hover:underline">
                  → Hilfe-Center
                </a>
                <a href="/help/faq" className="block text-sm text-primary hover:underline">
                  → Häufig gestellte Fragen
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
