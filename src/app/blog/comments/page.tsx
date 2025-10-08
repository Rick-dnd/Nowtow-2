'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MessageSquare, Loader2 } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlog';
import { formatDistanceToNow } from 'date-fns';

export default function CommentsPage(): React.ReactElement {
  const { data: posts, isLoading, error } = useBlogPosts();

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
              <h1 className="text-3xl font-bold">Meine Kommentare</h1>
              <p className="text-muted-foreground mt-1">
                Deine Kommentare über alle Artikel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Fehler beim Laden der Kommentare</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </div>
        ) : (posts || []).length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Noch keine Kommentare</p>
            <Button asChild className="mt-4">
              <Link href="/blog">Artikel durchsuchen</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {(posts || [])
              .filter((post) => (post.comment_count ?? 0) > 0)
              .map((post) => (
                <Card key={post.id} className="p-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">Dein Kommentar</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(post.created_at ?? new Date()), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        Comment content would be loaded from the database comments table.
                      </p>
                      <Link
                        href={`/blog/${post.slug ?? post.id}`}
                        className="text-sm text-primary hover:underline mt-2 inline-block"
                      >
                        Artikel ansehen: {post.title}
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
