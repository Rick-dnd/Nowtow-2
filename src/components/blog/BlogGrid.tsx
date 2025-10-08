import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { BlogPostWithAuthor } from '@/services/blog.service';

interface BlogGridProps {
  posts: BlogPostWithAuthor[];
}

export function BlogGrid({ posts }: BlogGridProps): React.ReactElement {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Keine Artikel gefunden</h3>
        <p className="text-muted-foreground">
          Versuche es mit anderen Filtern oder komm später wieder
        </p>
      </div>
    );
  }

  // Calculate reading time from content
  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <Link href={`/blog/${post.id}`}>
            <div className="aspect-video relative bg-muted">
              {post.featured_image ? (
                <Image
                  src={post.featured_image}
                  alt={post.title ?? ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <BookOpen className="h-12 w-12" />
                </div>
              )}
            </div>
          </Link>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              {post.category && <Badge variant="secondary">{post.category}</Badge>}
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {calculateReadingTime(post.content ?? '')} min
              </span>
            </div>
            <Link href={`/blog/${post.id}`}>
              <h3 className="font-bold text-lg hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt ?? (post.content ?? '').substring(0, 150) + '...'}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                  {post.author?.username?.[0]?.toUpperCase() ?? 'A'}
                </div>
                <div className="text-sm">
                  <p className="font-medium">
                    {post.author?.full_name || post.author?.username || 'Unbekannt'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.created_at ? new Date(post.created_at).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }) : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes_count ?? 0}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments_count ?? 0}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
