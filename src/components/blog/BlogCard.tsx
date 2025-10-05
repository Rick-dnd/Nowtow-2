'use client';

import { motion } from 'framer-motion';
import { Clock, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
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

export function BlogCard({ article }: BlogCardProps): React.ReactElement {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-xl overflow-hidden flex items-center justify-center text-4xl">
          📄
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 mb-2">
            {article.category}
          </Badge>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-3 mt-auto text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
                {article.author?.username?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <span>@{article.author?.username}</span>
            </div>
            <span>•</span>
            <span>{article.publishedAt}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{article.readTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              <span>{article.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
