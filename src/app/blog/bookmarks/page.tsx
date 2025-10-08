'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Bookmark as BookmarkIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserBookmarks } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';

export default function BookmarksPage(): React.ReactElement {
  const { user } = useAuth();
  const { data: posts, isLoading, error } = useUserBookmarks(user?.id);

  // Show login message if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/blog">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Gespeicherte Artikel</h1>
                <p className="text-muted-foreground mt-1">
                  Deine gespeicherten Artikel zum späteren Lesen
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <BookmarkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              Bitte melde dich an, um deine gespeicherten Artikel zu sehen
            </p>
            <Button asChild>
              <Link href="/blog">Zurück zum Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold">Gespeicherte Artikel</h1>
              <p className="text-muted-foreground mt-1">
                Deine gespeicherten Artikel zum späteren Lesen
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
            <p className="text-destructive">Fehler beim Laden der gespeicherten Artikel</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </div>
        ) : (posts || []).length === 0 ? (
          <div className="text-center py-12">
            <BookmarkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">Noch keine gespeicherten Artikel</p>
            <p className="text-sm text-muted-foreground mb-4">
              Speichere Artikel, die du später lesen möchtest
            </p>
            <Button asChild>
              <Link href="/blog">Artikel durchsuchen</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(posts || []).map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="p-6 hover:shadow-lg transition-all hover:border-primary">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt ?? (post.content ?? '').substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center justify-between">
                    {post.category && (
                      <Badge variant="secondary">{post.category}</Badge>
                    )}
                    {post.author && (
                      <span className="text-xs text-muted-foreground">
                        {post.author.full_name || post.author.username}
                      </span>
                    )}
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
