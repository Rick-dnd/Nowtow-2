'use client';

import { motion } from 'framer-motion';
import { Clock, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPostWithAuthor } from '@/services/blog.service';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface BlogCardProps {
  article: BlogPostWithAuthor;
}

export function BlogCard({ article }: BlogCardProps): React.ReactElement {
  // Calculate reading time
  const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const readTime = calculateReadingTime(article.content ?? '');
  const publishedAt = article.created_at
    ? format(new Date(article.created_at), 'd. MMM yyyy', { locale: de })
    : '';

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-xl overflow-hidden flex items-center justify-center text-4xl">
          {article.featured_image ? (
            <img
              src={article.featured_image}
              alt={article.title ?? ''}
              className="w-full h-full object-cover"
            />
          ) : (
            '📄'
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {article.category && (
            <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 mb-2">
              {article.category}
            </Badge>
          )}

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {article.excerpt ?? (article.content ?? '').substring(0, 100) + '...'}
          </p>

          <div className="flex items-center gap-3 mt-auto text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
                {article.author?.username?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <span>@{article.author?.username ?? 'unbekannt'}</span>
            </div>
            <span>•</span>
            <span>{publishedAt}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{readTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              <span>{article.likes_count ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
