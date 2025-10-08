'use client';

import Image from 'next/image';
import { Clock, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPostWithAuthor } from '@/services/blog.service';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface FeaturedArticleProps {
  article: BlogPostWithAuthor;
}

export function FeaturedArticle({ article }: FeaturedArticleProps): React.ReactElement {
  // Calculate reading time
  const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} Min.`;
  };

  const readTime = calculateReadingTime(article.content ?? '');
  const publishedAt = article.created_at
    ? format(new Date(article.created_at), 'd. MMMM yyyy', { locale: de })
    : '';

  return (
    <div className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Image */}
        <div className="relative h-64 md:h-full min-h-[16rem] bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl overflow-hidden">
          {article.featured_image ? (
            <Image
              src={article.featured_image}
              alt={article.title ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              📝
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center space-y-4">
          {article.category && (
            <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
              {article.category}
            </Badge>
          )}

          <h2 className="text-3xl font-bold group-hover:text-primary transition-colors">
            {article.title}
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            {article.excerpt ?? (article.content ?? '').substring(0, 150) + '...'}
          </p>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                {article.author?.username?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <span className="text-sm font-medium">@{article.author?.username ?? 'unbekannt'}</span>
            </div>

            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{publishedAt}</span>

            <span className="text-sm text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>

            <span className="text-sm text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>{article.likes_count ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
