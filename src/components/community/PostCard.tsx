'use client';

import { Heart, MessageCircle, Share2, MoreHorizontal, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: {
    id: string;
    author: {
      username: string;
      avatar: string | null;
    };
    content: string;
    images: string[];
    timestamp: string;
    likes: number;
    comments: number;
    visibility: string;
  };
}

export function PostCard({ post }: PostCardProps): React.ReactElement {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
          {post.author?.username?.[0]?.toUpperCase() ?? 'A'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">@{post.author?.username}</p>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <Globe className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground capitalize">{post.visibility}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="mb-3">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Images (if any) */}
      {post.images?.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
          {post.images?.map((_image, index) => (
            <div key={index} className="relative aspect-square bg-muted">
              {/* Image would go here */}
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-border">
        <Button variant="ghost" size="sm" className="gap-2 flex-1">
          <Heart className="h-4 w-4" />
          <span className="text-sm">{post.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 flex-1">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{post.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 flex-1">
          <Share2 className="h-4 w-4" />
          <span className="text-sm">Share</span>
        </Button>
      </div>
    </div>
  );
}
