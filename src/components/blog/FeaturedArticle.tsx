'use client';

import { Clock, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FeaturedArticleProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: { username: string; avatar: string | null };
    publishedAt: string;
    readTime: string;
    likes: number;
    image: string | null;
  };
}

export function FeaturedArticle({ article }: FeaturedArticleProps): React.ReactElement {
  return (
    <div className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Image */}
        <div className="relative h-64 md:h-full bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            📝
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center space-y-4">
          <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
            {article.category}
          </Badge>

          <h2 className="text-3xl font-bold group-hover:text-primary transition-colors">
            {article.title}
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                {article.author?.username?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <span className="text-sm font-medium">@{article.author?.username}</span>
            </div>

            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{article.publishedAt}</span>

            <span className="text-sm text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} read</span>
            </div>

            <span className="text-sm text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>{article.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
