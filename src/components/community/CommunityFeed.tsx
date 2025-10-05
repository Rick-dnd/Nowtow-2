'use client';

import { StoriesBar } from './StoriesBar';
import { CreatePostBox } from './CreatePostBox';
import { PostCard } from './PostCard';

const mockPosts = [
  {
    id: '1',
    author: {
      username: 'johndoe',
      avatar: null,
    },
    content: 'Just had an amazing experience at the new art gallery! #MunichArt 🎨',
    images: [],
    timestamp: '2h ago',
    likes: 24,
    comments: 5,
    visibility: 'public',
  },
  {
    id: '2',
    author: {
      username: 'artlover',
      avatar: null,
    },
    content: 'Looking for a photographer for my event next week. Any recommendations?',
    images: [],
    timestamp: '4h ago',
    likes: 12,
    comments: 8,
    visibility: 'public',
  },
];

export function CommunityFeed(): React.ReactElement {
  return (
    <div className="space-y-4">
      {/* Stories Bar */}
      <StoriesBar />

      {/* Create Post Box */}
      <CreatePostBox />

      {/* Feed Filters */}
      <div className="bg-card rounded-2xl p-3 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button className="px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary whitespace-nowrap">
            For You
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
            Following
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
            Trending
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
            Communities
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
