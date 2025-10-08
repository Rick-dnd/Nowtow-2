'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Loader2 } from 'lucide-react';
import { useAuthors } from '@/hooks/useBlog';

export default function AuthorsPage(): React.ReactElement {
  const { data: authors, isLoading, error } = useAuthors();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Alle Autoren</h1>
              <p className="text-muted-foreground mt-1">
                Lerne die Autoren kennen
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Fehler beim Laden der Autoren</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </div>
        ) : !authors || authors.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Keine Autoren gefunden</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/blog/author/${author.username ?? author.id}`}
              >
                <Card className="p-6 hover:shadow-lg transition-all hover:border-primary">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={author.avatar_url ?? undefined} />
                      <AvatarFallback>
                        {author.full_name
                          ? author.full_name
                              .split(' ')
                              .map((n: string) => n[0])
                              .join('')
                              .toUpperCase()
                          : author.username?.[0]?.toUpperCase() ?? 'A'}
                      </AvatarFallback>
                    </Avatar>

                    <h3 className="font-semibold text-lg mb-1">
                      {author.full_name ?? author.username ?? 'Unbekannt'}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      @{author.username ?? 'unbekannt'}
                    </p>

                    <div className="flex gap-4 text-sm mb-4">
                      <div className="text-center">
                        <div className="font-semibold">{author.articles_count}</div>
                        <div className="text-muted-foreground">Artikel</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">
                          {author.total_views.toLocaleString('de-DE')}
                        </div>
                        <div className="text-muted-foreground">Aufrufe</div>
                      </div>
                    </div>

                    <Badge variant="secondary">Autor</Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
