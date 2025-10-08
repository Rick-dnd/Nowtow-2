'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { TrendingUp, Flame, Eye, Heart, Loader2 } from 'lucide-react';
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
import { useBlogPosts } from '@/hooks/useBlog';

type TimeFilter = 'today' | 'week' | 'month' | 'all';
type SortBy = 'views' | 'likes' | 'comments' | 'trending';

export default function BlogPopularPage(): React.ReactElement {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [sortBy, setSortBy] = useState<SortBy>('views');

  // Fetch blog posts from Supabase
  const { data: blogPosts, isLoading, error } = useBlogPosts({
    status: 'published',
    limit: 100,
  });

  // Sort articles based on selected criteria
  const sortedArticles = useMemo(() => {
    if (!blogPosts) return [];

    return [...blogPosts].sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return (b.view_count || 0) - (a.view_count || 0);
        case 'likes':
          return (b.like_count || 0) - (a.like_count || 0);
        case 'comments':
          return (b.comment_count || 0) - (a.comment_count || 0);
        case 'trending':
          // Calculate trending score based on views + likes * 2 + comments * 3
          const scoreA = (a.view_count || 0) + (a.like_count || 0) * 2 + (a.comment_count || 0) * 3;
          const scoreB = (b.view_count || 0) + (b.like_count || 0) * 2 + (b.comment_count || 0) * 3;
          return scoreB - scoreA;
        default:
          return 0;
      }
    });
  }, [blogPosts, sortBy]);

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

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg text-muted-foreground">Lade beliebte Artikel...</p>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-destructive mb-2">Fehler beim Laden der Artikel</p>
                <p className="text-sm text-muted-foreground">{error.message}</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  const articles = sortedArticles || [];

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
                    {articles
                      .reduce((sum, article) => sum + (article.view_count || 0), 0)
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
                    {articles
                      .reduce((sum, article) => sum + (article.like_count || 0), 0)
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
                    {articles.filter((a) => ((a.view_count || 0) + (a.like_count || 0) * 2 + (a.comment_count || 0) * 3) > 100).length}
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
          {articles.length === 0 ? (
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
                posts={articles.map((article) => ({
                  id: article.id,
                  title: article.title,
                  excerpt: article.excerpt || '',
                  image: article.featured_image || '',
                  category: article.category || 'Allgemein',
                  author: {
                    name: article.author_id || 'Unbekannt',
                    avatar: null,
                  },
                  published_date: article.published_at || article.created_at || '',
                  reading_time: article.reading_time || 5,
                  likes: article.like_count || 0,
                  comments: article.comment_count || 0,
                }))}
              />

              {/* Top Article Highlight */}
              {articles[0] && (
                <Card className="mt-8 border-2 border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
                        <Flame className="h-3 w-3 mr-1" />
                        #1 Trending
                      </Badge>
                      <Badge variant="outline">{articles[0].category || 'Allgemein'}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{articles[0].title}</h2>
                    <p className="text-muted-foreground mb-4">{articles[0].excerpt || ''}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{(articles[0].view_count || 0).toLocaleString()} Aufrufe</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span>{(articles[0].like_count || 0).toLocaleString()} Likes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Score: {((articles[0].view_count || 0) + (articles[0].like_count || 0) * 2 + (articles[0].comment_count || 0) * 3)}
                        </span>
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
