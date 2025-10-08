'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useBlogPosts } from '@/hooks/useBlog';
import { format, isSameDay, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

export default function CalendarPage(): React.ReactElement {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const { data: posts, isLoading, error } = useBlogPosts();

  const postsOnSelectedDate = React.useMemo(() => {
    if (!selectedDate || !posts) return [];
    return posts.filter((post) =>
      isSameDay(parseISO(post.created_at ?? new Date().toISOString()), selectedDate)
    );
  }, [selectedDate, posts]);

  const datesWithPosts = React.useMemo(() => {
    if (!posts) return new Set<string>();
    return new Set(
      posts.map((post) =>
        format(parseISO(post.created_at ?? new Date().toISOString()), 'yyyy-MM-dd')
      )
    );
  }, [posts]);

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
              <h1 className="text-3xl font-bold">Inhaltskalender</h1>
              <p className="text-muted-foreground mt-1">
                Artikel nach Veröffentlichungsdatum durchsuchen
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
            <p className="text-destructive">Fehler beim Laden des Kalenders</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                  modifiers={{
                    hasPost: (date: Date): boolean =>
                      datesWithPosts.has(format(date, 'yyyy-MM-dd')),
                  }}
                  modifiersStyles={{
                    hasPost: {
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                    },
                  }}
                />
              </Card>
            </div>

            {/* Articles for selected date */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {selectedDate ? format(selectedDate, 'd. MMMM yyyy', { locale: de }) : 'Datum auswählen'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {postsOnSelectedDate.length} Artikel veröffentlicht
                </p>
              </div>

              {postsOnSelectedDate.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Keine Artikel an diesem Datum veröffentlicht
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {postsOnSelectedDate.map((post) => (
                    <Card key={post.id} className="p-6">
                      <Link href={`/blog/${post.slug ?? post.id}`}>
                        <div className="flex gap-4">
                          {post.featured_image && (
                            <div
                              className="w-24 h-24 rounded-lg bg-cover bg-center flex-shrink-0"
                              style={{
                                backgroundImage: `url(${post.featured_image})`,
                              }}
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              {post.category && (
                                <Badge variant="secondary">{post.category}</Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {post.reading_time ?? 5} Min. Lesezeit
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
