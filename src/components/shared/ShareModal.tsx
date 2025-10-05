'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Linkedin, Mail, Link2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
}

export function ShareModal({
  isOpen,
  onClose,
  title,
  url,
  description,
}: ShareModalProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url;

  const handleCopyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      color: 'text-sky-500',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-700',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description ?? '')}%0A%0A${encodeURIComponent(shareUrl)}`,
      color: 'text-gray-600',
    },
  ];

  const handleSocialShare = (shareLink: string): void => {
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>Share this with your network</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social Share Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {shareLinks.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleSocialShare(platform.url)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                aria-label={`Share on ${platform.name}`}
              >
                <platform.icon className={`h-6 w-6 ${platform.color}`} />
                <span className="text-xs text-muted-foreground">{platform.name}</span>
              </button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label htmlFor="share-url" className="text-sm font-medium">
              Or copy link
            </label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                className="flex-1"
                onClick={(e) => e.currentTarget.select()}
              />
              <Button
                onClick={handleCopyLink}
                variant={copied ? 'default' : 'outline'}
                className="shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
