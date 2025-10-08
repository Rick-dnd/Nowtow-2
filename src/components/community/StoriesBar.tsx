'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { StoryViewer, type Story } from './StoryViewer';
import { useStoriesBar } from '@/hooks/useStories';
import type { Database } from '@/types/database';

type DBStory = Database['public']['Tables']['community_stories']['Row'];

// Calculate time remaining until story expires
function getTimeRemaining(expiresAt: string | null): number {
  if (!expiresAt) return 0;
  const expiryTime = new Date(expiresAt).getTime();
  const now = Date.now();
  return Math.max(0, expiryTime - now);
}

// Calculate time elapsed since creation
function getTimeAgo(createdAt: string | null): string {
  if (!createdAt) return '';

  const now = Date.now();
  const created = new Date(createdAt).getTime();
  const diff = now - created;

  const hours = Math.floor(diff / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

  if (hours > 0) {
    return `vor ${hours} Stunden`;
  }
  return `vor ${minutes} Minuten`;
}

// Convert database story to StoryViewer format
function convertToViewerStory(dbStory: DBStory, username: string): Story {
  // Use the first media URL or fallback to image_url
  const mediaUrls = dbStory.media_urls || [];
  const url = (mediaUrls[0] as string) || dbStory.image_url;

  return {
    id: dbStory.id,
    url,
    type: 'image', // TODO: Check media_types for video support
    duration: 5000,
    header: {
      heading: username || 'User',
      subheading: getTimeAgo(dbStory.created_at),
      profileImage: '',
    },
    seeMore: dbStory.link_url ? {
      url: dbStory.link_url,
      text: dbStory.link_text || 'Mehr erfahren',
    } : undefined,
  };
}

// Format time remaining as human-readable string
function formatTimeRemaining(ms: number): string {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function StoriesBar(): React.ReactElement {
  const [selectedStories, setSelectedStories] = useState<Story[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [, setTick] = useState(0); // Force re-render for countdown

  // Fetch real stories from Supabase
  const { data: storiesData, isLoading } = useStoriesBar();

  // Update countdown every minute
  React.useEffect((): (() => void) => {
    const interval = setInterval((): void => {
      setTick((prev) => prev + 1);
    }, 60000); // Update every minute

    return (): void => clearInterval(interval);
  }, []);

  const handleStoryClick = (stories: Story[]): void => {
    setSelectedStories(stories);
    setViewerOpen(true);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-muted animate-pulse" />
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-muted animate-pulse" />
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        {/* Add Story Button */}
        <button className="flex-shrink-0 flex flex-col items-center gap-2 group">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs font-medium">Deine Story</span>
        </button>

        {/* Stories */}
        {(storiesData || []).map((userStoryData) => {
          const firstStory = userStoryData.stories[0];
          if (!firstStory) return null;

          const timeRemaining = getTimeRemaining(firstStory.expires_at);
          const percentRemaining = (timeRemaining / (24 * 60 * 60 * 1000)) * 100;

          // Convert database stories to viewer format
          const viewerStories = userStoryData.stories.map((dbStory) =>
            convertToViewerStory(dbStory, userStoryData.userId)
          );

          return (
            <button
              key={userStoryData.userId}
              className="flex-shrink-0 flex flex-col items-center gap-2 group relative"
              onClick={() => handleStoryClick(viewerStories)}
              aria-label={`Story von ${userStoryData.userId} ansehen`}
            >
              {/* Progress Ring */}
              <div className="relative w-16 h-16">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                  {/* Background ring */}
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted opacity-20"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${(percentRemaining / 100) * 188.4} 188.4`}
                    className="text-primary transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary via-emerald-500 to-teal-500 p-0.5 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-background p-0.5">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-lg font-semibold">
                      {userStoryData.userId?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium truncate w-16 text-center">
                  {userStoryData.userId.slice(0, 8)}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {formatTimeRemaining(timeRemaining)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Story Viewer Modal */}
      <StoryViewer
        stories={selectedStories}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  );
}
