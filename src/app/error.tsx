'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.ReactElement {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <>
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-destructive/10 rounded-full">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Etwas ist schief gelaufen</h1>
          <p className="text-muted-foreground text-lg">
            Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
          </p>
        </div>

        {/* Error Details */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-sm text-left font-mono text-destructive break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Erneut versuchen
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Zur Startseite
            </Link>
          </Button>
        </div>

        {/* Support Link */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Problem besteht weiterhin?{' '}
            <a href="/contact" className="text-primary hover:underline">
              Kontaktiere unseren Support
            </a>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
