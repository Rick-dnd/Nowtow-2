'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Link2, Heart, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ShareSidebarProps {
  title: string;
  url?: string;
  likes?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  onLike?: () => void;
  onSave?: () => void;
}

export function ShareSidebar({
  title,
  url,
  likes = 0,
  isLiked = false,
  isSaved = false,
  onLike,
  onSave,
}: ShareSidebarProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleShare = (platform: string): void => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link kopiert!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Link konnte nicht kopiert werden');
    }
  };

  return (
    <div className="sticky top-24 flex flex-col items-center gap-4">
      {/* Share Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={(): void => handleShare('facebook')}
          title="Auf Facebook teilen"
          className="rounded-full hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20"
        >
          <Facebook className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={(): void => handleShare('twitter')}
          title="Auf Twitter teilen"
          className="rounded-full hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-sky-900/20"
        >
          <Twitter className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={(): void => handleShare('linkedin')}
          title="Auf LinkedIn teilen"
          className="rounded-full hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20"
        >
          <Linkedin className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopyLink}
          title={copied ? 'Link kopiert!' : 'Link kopieren'}
          className={cn(
            'rounded-full',
            copied
              ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
              : 'hover:bg-accent'
          )}
        >
          <Link2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-border" />

      {/* Like Button */}
      <div className="flex flex-col items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onLike}
          className={cn(
            'rounded-full',
            isLiked && 'text-red-500 hover:text-red-600'
          )}
          title={isLiked ? 'Like entfernen' : 'Liken'}
        >
          <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
        </Button>
        <span className="text-xs text-muted-foreground">{likes}</span>
      </div>

      {/* Save Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onSave}
        className={cn(
          'rounded-full',
          isSaved && 'text-primary'
        )}
        title={isSaved ? 'Lesezeichen entfernen' : 'Speichern'}
      >
        <Bookmark className={cn('h-5 w-5', isSaved && 'fill-current')} />
      </Button>
    </div>
  );
}
