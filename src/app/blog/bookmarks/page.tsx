'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Bookmark, Filter, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BlogGrid } from '@/components/blog/BlogGrid';
import Link from 'next/link';

interface BookmarkedArticle {
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
  likes_count: number;
  comments_count: number;
  image_url: string | null;
  bookmarked_at: string;
}

// Mock data - will be replaced with real Supabase data
const mockBookmarks: BookmarkedArticle[] = [
  {
    id: '1',
    title: 'Die besten Tech-Events in München 2025',
    slug: 'beste-tech-events-muenchen-2025',
    excerpt:
      'Ein Überblick über die spannendsten Technologie-Konferenzen und Meetups im neuen Jahr.',
    category: 'Technologie',
    author: { username: 'techmax', avatar: null },
    published_at: '2025-01-15T10:00:00Z',
    reading_time: 8,
    likes_count: 142,
    comments_count: 23,
    image_url: null,
    bookmarked_at: '2025-10-01T14:30:00Z',
  },
  {
    id: '2',
    title: 'Food Tour durch München: Die besten Restaurants 2025',
    slug: 'food-tour-muenchen-beste-restaurants',
    excerpt:
      'Von traditioneller bayerischer Küche bis zu innovativen Fusion-Konzepten - Münchens Gastro-Szene ist vielfältig.',
    category: 'Food',
    author: { username: 'anna_writer', avatar: null },
    published_at: '2025-02-20T10:00:00Z',
    reading_time: 12,
    likes_count: 287,
    comments_count: 45,
    image_url: null,
    bookmarked_at: '2025-10-02T09:15:00Z',
  },
];

export default function BlogBookmarksPage(): React.ReactElement {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');

  // Get unique categories from bookmarks
  const categories = Array.from(
    new Set(mockBookmarks.map((article) => article.category))
  );

  // Filter and sort bookmarks
  const filteredBookmarks = mockBookmarks
    .filter((article) => {
      return categoryFilter === 'all' || article.category === categoryFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return (
          new Date(b.bookmarked_at).getTime() - new Date(a.bookmarked_at).getTime()
        );
      } else {
        return (
          new Date(a.bookmarked_at).getTime() - new Date(b.bookmarked_at).getTime()
        );
      }
    });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Bookmark className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Meine Lesezeichen</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Gespeicherte Artikel zum späteren Lesen
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Kategorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Kategorien</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as typeof sortBy)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sortieren" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Zuletzt hinzugefügt</SelectItem>
                  <SelectItem value="oldest">Älteste zuerst</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear All */}
              {filteredBookmarks.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (confirm('Alle Lesezeichen entfernen?')) {
                      console.log('Clearing all bookmarks');
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Alle entfernen
                </Button>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {filteredBookmarks.length}{' '}
                {filteredBookmarks.length === 1 ? 'Lesezeichen' : 'Lesezeichen'}
              </p>
            </div>
          </div>

          {/* Bookmarks Grid or Empty State */}
          {filteredBookmarks.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Bookmark className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">
                  {categoryFilter === 'all'
                    ? 'Noch keine Lesezeichen'
                    : 'Keine Lesezeichen in dieser Kategorie'}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {categoryFilter === 'all'
                    ? 'Speichere interessante Artikel, um sie später zu lesen.'
                    : 'Versuche einen anderen Filter oder speichere neue Artikel.'}
                </p>
                {categoryFilter !== 'all' ? (
                  <Button variant="outline" onClick={() => setCategoryFilter('all')}>
                    Alle Lesezeichen anzeigen
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/blog">Artikel entdecken</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <BlogGrid
              posts={filteredBookmarks.map((article) => ({
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
          )}
        </div>
      </main>
    </>
  );
}
