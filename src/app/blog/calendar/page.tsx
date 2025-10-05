'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Calendar as CalendarIcon, FileText } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';

interface ArticleOnDate {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: {
    username: string;
  };
  published_at: string;
  views_count: number;
}

// Mock data - will be replaced with real Supabase data
const mockArticlesByDate: Record<string, ArticleOnDate[]> = {
  '2025-10-01': [
    {
      id: '1',
      title: 'Die besten Tech-Events in München 2025',
      slug: 'beste-tech-events-muenchen-2025',
      category: 'Technologie',
      author: { username: 'techmax' },
      published_at: '2025-10-01T10:00:00Z',
      views_count: 1234,
    },
    {
      id: '2',
      title: 'Startup-Szene München im Aufschwung',
      slug: 'startup-szene-muenchen-aufschwung',
      category: 'Business',
      author: { username: 'businesspro' },
      published_at: '2025-10-01T14:00:00Z',
      views_count: 892,
    },
  ],
  '2025-10-03': [
    {
      id: '3',
      title: 'Neue Restaurants im Herbst 2025',
      slug: 'neue-restaurants-herbst-2025',
      category: 'Food',
      author: { username: 'anna_writer' },
      published_at: '2025-10-03T11:00:00Z',
      views_count: 2341,
    },
  ],
  '2025-10-05': [
    {
      id: '4',
      title: 'Marathon-Training: Tipps für Anfänger',
      slug: 'marathon-training-tipps-anfaenger',
      category: 'Sport',
      author: { username: 'sportfanatic' },
      published_at: '2025-10-05T09:00:00Z',
      views_count: 1567,
    },
  ],
};

// Get dates that have articles
const getDatesWithArticles = (): Date[] => {
  return Object.keys(mockArticlesByDate).map((dateStr) => new Date(dateStr));
};

export default function BlogCalendarPage(): React.ReactElement {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const datesWithArticles = getDatesWithArticles();

  // Get articles for selected date
  const selectedDateString = selectedDate
    ? format(selectedDate, 'yyyy-MM-dd')
    : '';
  const articlesOnSelectedDate = selectedDateString
    ? (mockArticlesByDate[selectedDateString] ?? [])
    : [];

  // Filter by category
  const filteredArticles =
    categoryFilter === 'all'
      ? articlesOnSelectedDate
      : articlesOnSelectedDate.filter(
          (article) => article.category === categoryFilter
        );

  // Categories available in all articles
  const allCategories = Array.from(
    new Set(
      Object.values(mockArticlesByDate)
        .flat()
        .map((article) => article.category)
    )
  );

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <CalendarIcon className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Blog Kalender</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Entdecke Artikel nach Veröffentlichungsdatum
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Calendar Sidebar */}
            <div className="lg:col-span-4">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Veröffentlichungen</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Category Filter */}
                  <div className="mb-4">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle Kategorien</SelectItem>
                        {allCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Calendar */}
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    locale={de}
                    modifiers={{
                      hasArticles: datesWithArticles,
                    }}
                    modifiersStyles={{
                      hasArticles: {
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        color: 'hsl(var(--primary))',
                      },
                    }}
                    className="rounded-md border"
                  />

                  {/* Legend */}
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Legende:</p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Artikel veröffentlicht</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Articles List */}
            <div className="lg:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDate
                      ? format(selectedDate, 'dd. MMMM yyyy', { locale: de })
                      : 'Datum wählen'}
                  </CardTitle>
                  {filteredArticles.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {filteredArticles.length}{' '}
                      {filteredArticles.length === 1 ? 'Artikel' : 'Artikel'} veröffentlicht
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  {filteredArticles.length === 0 ? (
                    <div className="py-12 text-center">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        {selectedDate
                          ? 'Keine Artikel an diesem Tag veröffentlicht'
                          : 'Wähle ein Datum, um Artikel anzuzeigen'}
                      </p>
                      {categoryFilter !== 'all' && (
                        <p className="text-sm text-muted-foreground">
                          Versuche einen anderen Filter
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredArticles.map((article) => (
                        <Link key={article.id} href={`/blog/${article.slug}`}>
                          <div className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all cursor-pointer">
                            {/* Article Header */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
                                  {article.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  von @{article.author.username}
                                </p>
                              </div>
                              <Badge>{article.category}</Badge>
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>
                                  {format(
                                    new Date(article.published_at),
                                    'HH:mm',
                                    { locale: de }
                                  )}{' '}
                                  Uhr
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span>{article.views_count.toLocaleString()} Aufrufe</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats Card */}
              {selectedDate && filteredArticles.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Statistiken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Artikel</p>
                        <p className="text-2xl font-bold">{filteredArticles.length}</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">
                          Gesamt Aufrufe
                        </p>
                        <p className="text-2xl font-bold">
                          {filteredArticles
                            .reduce((sum, article) => sum + article.views_count, 0)
                            .toLocaleString()}
                        </p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Kategorien</p>
                        <p className="text-2xl font-bold">
                          {new Set(filteredArticles.map((a) => a.category)).size}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
