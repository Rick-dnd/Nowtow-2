import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string | null;
  };
  published_date: string;
  reading_time: number;
  likes: number;
  comments: number;
}

interface BlogGridProps {
  posts: BlogPost[];
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

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <Link href={`/blog/${post.id}`}>
            <div className="aspect-video relative bg-muted">
              {/* Image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <BookOpen className="h-12 w-12" />
              </div>
            </div>
          </Link>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.reading_time} min
              </span>
            </div>
            <Link href={`/blog/${post.id}`}>
              <h3 className="font-bold text-lg hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                  {post.author.name[0]}
                </div>
                <div className="text-sm">
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.published_date).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
