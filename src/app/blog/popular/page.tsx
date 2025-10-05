'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { TrendingUp, Flame, Eye, Heart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogGrid } from '@/components/blog/BlogGrid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PopularArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: {
    username: string;
    avatar: string | null;
  };
  published_at: string;
  reading_time: number;
  views_count: number;
  likes_count: number;
  comments_count: number;
  image_url: string | null;
  trending_score: number;
}

// Mock data - will be replaced with real Supabase data
const mockPopularArticles: PopularArticle[] = [
  {
    id: '1',
    title: 'Die besten Tech-Events in München 2025',
    slug: 'beste-tech-events-muenchen-2025',
    excerpt: 'Ein Überblick über die spannendsten Technologie-Konferenzen und Meetups im neuen Jahr.',
    category: 'Technologie',
    author: { username: 'techmax', avatar: null },
    published_at: '2025-10-01T10:00:00Z',
    reading_time: 8,
    views_count: 15234,
    likes_count: 892,
    comments_count: 156,
    image_url: null,
    trending_score: 98,
  },
  {
    id: '2',
    title: 'Food Tour durch München: Die besten Restaurants 2025',
    slug: 'food-tour-muenchen-beste-restaurants',
    excerpt: 'Von traditioneller bayerischer Küche bis zu innovativen Fusion-Konzepten.',
    category: 'Food',
    author: { username: 'anna_writer', avatar: null },
    published_at: '2025-10-02T10:00:00Z',
    reading_time: 12,
    views_count: 23456,
    likes_count: 1245,
    comments_count: 234,
    image_url: null,
    trending_score: 95,
  },
  {
    id: '3',
    title: 'Marathon-Training: Tipps für Anfänger',
    slug: 'marathon-training-tipps-anfaenger',
    excerpt: 'Dein kompletter Trainingsplan für deinen ersten Marathon.',
    category: 'Sport',
    author: { username: 'sportfanatic', avatar: null },
    published_at: '2025-10-03T10:00:00Z',
    reading_time: 10,
    views_count: 12345,
    likes_count: 678,
    comments_count: 89,
    image_url: null,
    trending_score: 87,
  },
];

type TimeFilter = 'today' | 'week' | 'month' | 'all';
type SortBy = 'views' | 'likes' | 'comments' | 'trending';

export default function BlogPopularPage(): React.ReactElement {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [sortBy, setSortBy] = useState<SortBy>('views');

  // Sort articles based on selected criteria
  const sortedArticles = [...mockPopularArticles].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views_count - a.views_count;
      case 'likes':
        return b.likes_count - a.likes_count;
      case 'comments':
        return b.comments_count - a.comments_count;
      case 'trending':
        return b.trending_score - a.trending_score;
      default:
        return 0;
    }
  });

  const getTimeFilterLabel = (): string => {
    switch (timeFilter) {
      case 'today':
        return 'Heute';
      case 'week':
        return 'Diese Woche';
      case 'month':
        return 'Diesen Monat';
      case 'all':
        return 'Alle Zeit';
      default:
        return '';
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Beliebte Artikel</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Die meistgelesenen und beliebtesten Artikel auf Nowtown
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gesamt Aufrufe</p>
                  <p className="text-2xl font-bold">
                    {mockPopularArticles
                      .reduce((sum, article) => sum + article.views_count, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gesamt Likes</p>
                  <p className="text-2xl font-bold">
                    {mockPopularArticles
                      .reduce((sum, article) => sum + article.likes_count, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Flame className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trending Artikel</p>
                  <p className="text-2xl font-bold">
                    {mockPopularArticles.filter((a) => a.trending_score > 90).length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <Tabs value={timeFilter} onValueChange={(value) => setTimeFilter(value as TimeFilter)}>
                <TabsList>
                  <TabsTrigger value="today">Heute</TabsTrigger>
                  <TabsTrigger value="week">Diese Woche</TabsTrigger>
                  <TabsTrigger value="month">Diesen Monat</TabsTrigger>
                  <TabsTrigger value="all">Alle Zeit</TabsTrigger>
                </TabsList>
              </Tabs>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sortieren nach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">Meiste Aufrufe</SelectItem>
                  <SelectItem value="likes">Meiste Likes</SelectItem>
                  <SelectItem value="comments">Meiste Kommentare</SelectItem>
                  <SelectItem value="trending">Trending Score</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Zeige die beliebtesten Artikel von {getTimeFilterLabel()}
              </p>
            </div>
          </div>

          {/* Articles Grid */}
          {sortedArticles.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Keine Artikel gefunden</h3>
                <p className="text-muted-foreground">
                  Versuche einen anderen Zeitraum
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <BlogGrid
                posts={sortedArticles.map((article) => ({
                  id: article.id,
                  title: article.title,
                  excerpt: article.excerpt,
                  image: article.image_url ?? '',
                  category: article.category,
                  author: {
                    name: article.author.username,
                    avatar: article.author.avatar,
                  },
                  published_date: article.published_at,
                  reading_time: article.reading_time,
                  likes: article.likes_count,
                  comments: article.comments_count,
                }))}
              />

              {/* Top Article Highlight */}
              {sortedArticles[0] && (
                <Card className="mt-8 border-2 border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
                        <Flame className="h-3 w-3 mr-1" />
                        #1 Trending
                      </Badge>
                      <Badge variant="outline">{sortedArticles[0].category}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{sortedArticles[0].title}</h2>
                    <p className="text-muted-foreground mb-4">{sortedArticles[0].excerpt}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{sortedArticles[0].views_count.toLocaleString()} Aufrufe</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span>{sortedArticles[0].likes_count.toLocaleString()} Likes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>Score: {sortedArticles[0].trending_score}/100</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
