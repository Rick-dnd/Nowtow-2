'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Heart, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SubscriptionBadge } from '@/components/ui/subscription-badge';
import type { BlogPostWithAuthor } from '@/services/blog.service';

interface BlogCardModernProps {
  post: BlogPostWithAuthor;
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'Gerade eben';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return 'Heute';
  if (diffDays === 1) return 'Gestern';
  if (diffDays < 7) return `vor ${diffDays} Tagen`;

  return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function BlogCardModern({ post }: BlogCardModernProps): React.ReactElement {
  const readingTime = calculateReadingTime(post.content ?? '');

  return (
    <Link href={`/blog/${post.id}`}>
      <article className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/10 via-emerald-500/10 to-teal-500/10 overflow-hidden">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title ?? ''}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
              📝
            </div>
          )}
          {post.category && (
            <Badge className="absolute top-4 left-4 bg-white/90 text-primary hover:bg-white">
              {post.category}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
            {post.excerpt || (post.content ?? '').substring(0, 150) + '...'}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.author?.avatar_url ?? undefined} alt={post.author?.username ?? 'Author'} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-xs font-semibold">
                  {post.author?.username?.[0]?.toUpperCase() ?? 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium">@{post.author?.username ?? 'unknown'}</span>
                  {post.author?.subscription_tier && (
                    <SubscriptionBadge
                      tier={post.author.subscription_tier as 'free' | 'plus' | 'premium'}
                      size="sm"
                    />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(post.created_at)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{readingTime}</span>
              </div>
              {(post.likes_count !== null && post.likes_count !== undefined && post.likes_count > 0) && (
                <div className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" />
                  <span>{post.likes_count}</span>
                </div>
              )}
              {(post.comments_count !== null && post.comments_count !== undefined && post.comments_count > 0) && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>{post.comments_count}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
