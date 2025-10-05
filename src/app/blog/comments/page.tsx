'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { MessageSquare, Calendar, Trash2, Edit2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string | null;
  likes_count: number;
  article: {
    id: string;
    title: string;
    slug: string;
    category: string;
  };
}

// Mock data - will be replaced with real Supabase data
const mockComments: Comment[] = [
  {
    id: '1',
    content:
      'Großartiger Artikel! Besonders die Tipps für Anfänger fand ich sehr hilfreich. Freue mich schon auf den nächsten Teil.',
    created_at: '2025-10-04T14:30:00Z',
    updated_at: null,
    likes_count: 12,
    article: {
      id: '1',
      title: 'Marathon-Training: Tipps für Anfänger',
      slug: 'marathon-training-tipps-anfaenger',
      category: 'Sport',
    },
  },
  {
    id: '2',
    content:
      'Danke für die Restaurant-Empfehlungen! War gestern im ersten Restaurant und es war fantastisch. Kann ich nur weiterempfehlen!',
    created_at: '2025-10-03T16:45:00Z',
    updated_at: '2025-10-03T17:00:00Z',
    likes_count: 8,
    article: {
      id: '2',
      title: 'Neue Restaurants im Herbst 2025',
      slug: 'neue-restaurants-herbst-2025',
      category: 'Food',
    },
  },
  {
    id: '3',
    content:
      'Sehr informativer Überblick über die Tech-Events. Besonders das AI Summit klingt spannend!',
    created_at: '2025-10-01T11:20:00Z',
    updated_at: null,
    likes_count: 5,
    article: {
      id: '3',
      title: 'Die besten Tech-Events in München 2025',
      slug: 'beste-tech-events-muenchen-2025',
      category: 'Technologie',
    },
  },
];

export default function BlogCommentsPage(): React.ReactElement {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Get unique categories
  const categories = Array.from(
    new Set(mockComments.map((comment) => comment.article.category))
  );

  // Filter and sort comments
  const filteredComments = mockComments
    .filter((comment) => {
      return filterCategory === 'all' || comment.article.category === filterCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return b.likes_count - a.likes_count;
      }
    });

  const handleDeleteComment = (commentId: string): void => {
    if (confirm('Möchtest du diesen Kommentar wirklich löschen?')) {
      console.log('Deleting comment:', commentId);
      // TODO: Implement delete functionality
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
              <MessageSquare className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Meine Kommentare</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Alle deine Kommentare und Diskussionen
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
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
                  <SelectItem value="newest">Neueste zuerst</SelectItem>
                  <SelectItem value="oldest">Älteste zuerst</SelectItem>
                  <SelectItem value="popular">Beliebteste</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {filteredComments.length}{' '}
                {filteredComments.length === 1 ? 'Kommentar' : 'Kommentare'}
              </p>
            </div>
          </div>

          {/* Comments List or Empty State */}
          {filteredComments.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Noch keine Kommentare</h3>
                <p className="text-muted-foreground mb-6">
                  Teile deine Gedanken zu Artikeln, die dich interessieren
                </p>
                <Button asChild>
                  <Link href="/blog">Artikel entdecken</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-6">
                    {/* Comment Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Link
                          href={`/blog/${comment.article.slug}`}
                          className="group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {comment.article.title}
                            </h3>
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </Link>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {format(new Date(comment.created_at), 'dd.MM.yyyy', {
                                locale: de,
                              })}
                            </span>
                          </div>
                          {comment.updated_at && (
                            <Badge variant="outline" className="text-xs">
                              Bearbeitet
                            </Badge>
                          )}
                          <Badge>{comment.article.category}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                      <p className="text-sm leading-relaxed">{comment.content}</p>
                    </div>

                    {/* Comment Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{comment.likes_count} Likes</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Bearbeiten
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Löschen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
