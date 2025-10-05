'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export default function NotFound(): React.ReactElement {
  const router = useRouter();
  const quickLinks = [
    { label: 'Homepage', href: '/', icon: Home },
    { label: 'Events entdecken', href: '/events', icon: Search },
    { label: 'Spaces finden', href: '/spaces', icon: Search },
    { label: 'Hilfe-Center', href: '/help', icon: Search },
  ];

  return (
    <>
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Message */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-bold">Seite nicht gefunden</h2>
          <p className="text-muted-foreground text-lg">
            Ups! Die Seite, die du suchst, existiert nicht oder wurde verschoben.
          </p>
        </div>

        {/* Quick Links */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Schnellzugriff</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href={link.href}>
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" size="lg" onClick={(): void => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Zur Startseite
            </Link>
          </Button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
