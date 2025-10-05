'use client';

import { Plus } from 'lucide-react';

const stories = [
  { id: '1', username: 'user1', avatar: null, hasStory: true },
  { id: '2', username: 'user2', avatar: null, hasStory: true },
  { id: '3', username: 'user3', avatar: null, hasStory: true },
  { id: '4', username: 'user4', avatar: null, hasStory: true },
  { id: '5', username: 'user5', avatar: null, hasStory: true },
];

export function StoriesBar(): React.ReactElement {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        {/* Add Story Button */}
        <button className="flex-shrink-0 flex flex-col items-center gap-2 group">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs font-medium">Your Story</span>
        </button>

        {/* Stories */}
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex-shrink-0 flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-emerald-500 to-teal-500 p-0.5 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-background p-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-lg font-semibold">
                  {story.username?.[0]?.toUpperCase() ?? 'A'}
                </div>
              </div>
            </div>
            <span className="text-xs font-medium truncate w-16 text-center">
              {story.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
