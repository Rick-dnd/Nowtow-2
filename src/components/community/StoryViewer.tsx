'use client';

import React, { useEffect, useState } from 'react';
import Stories from 'react-insta-stories';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Story {
  id: string;
  url: string;
  type?: 'image' | 'video';
  duration?: number;
  created_at?: string; // ISO timestamp for expiry check
  header?: {
    heading: string;
    subheading: string;
    profileImage: string;
  };
  seeMore?: React.ReactNode | { url: string; text: string };
}

interface StoryViewerProps {
  stories: Story[];
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
}

function isStoryExpired(story: Story): boolean {
  if (!story.created_at) return false;

  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  const expiryTime = new Date(story.created_at).getTime() + TWENTY_FOUR_HOURS;
  return Date.now() > expiryTime;
}

export function StoryViewer({ stories, open, onClose, initialIndex = 0 }: StoryViewerProps): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Filter out expired stories
  const activeStories = stories.filter((story) => !isStoryExpired(story));

  // Reset index when opened
  useEffect((): void => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  // Close viewer if no active stories remain
  useEffect((): void => {
    if (open && activeStories.length === 0) {
      onClose();
    }
  }, [open, activeStories.length, onClose]);

  // Keyboard navigation
  useEffect((): (() => void) | void => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => Math.min(activeStories.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return (): void => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, activeStories.length]);

  if (activeStories.length === 0) {
    return <div />;
  }

  const formattedStories = activeStories.map((story) => ({
    url: story.url,
    type: story.type || 'image',
    duration: story.duration || 5000,
    header: story.header ? {
      heading: story.header.heading,
      subheading: story.header.subheading,
      profileImage: story.header.profileImage,
    } : undefined,
  }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md h-[90vh] p-0 bg-black border-0 overflow-hidden"
        aria-label="Story viewer"
        onPointerDownOutside={() => onClose()}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
          aria-label="Story schließen (ESC)"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Stories Component */}
        <div className="h-full flex items-center justify-center">
          <Stories
            stories={formattedStories}
            defaultInterval={5000}
            width="100%"
            height="100%"
            currentIndex={currentIndex}
            onStoryEnd={(storyIndex: number): void => {
              if (storyIndex === activeStories.length - 1) {
                onClose();
              } else {
                setCurrentIndex(storyIndex + 1);
              }
            }}
            onAllStoriesEnd={(): void => {
              onClose();
            }}
            keyboardNavigation
            preventDefault
            storyStyles={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Instructions (hidden, for screen readers) */}
        <div className="sr-only" aria-live="polite">
          Story {currentIndex + 1} von {activeStories.length}.
          Nutze Pfeiltasten für Navigation oder drücke ESC zum Schließen.
          Halte gedrückt zum Pausieren.
        </div>
      </DialogContent>
    </Dialog>
  );
}
