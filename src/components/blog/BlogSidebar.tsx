'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Articles', count: 156 },
  { id: 'events', label: 'Events', count: 45 },
  { id: 'guides', label: 'Guides', count: 23 },
  { id: 'news', label: 'News', count: 18 },
  { id: 'reviews', label: 'Reviews', count: 34 },
  { id: 'local-tips', label: 'Local Tips', count: 56 },
];

const popularPosts = [
  { id: '1', title: 'Die 10 besten Cafés in Schwabing', views: 1234 },
  { id: '2', title: 'Events Guide für Oktober', views: 956 },
  { id: '3', title: 'Versteckte Kunst-Studios entdecken', views: 834 },
  { id: '4', title: 'Food-Tour durch Glockenbach', views: 723 },
  { id: '5', title: 'Yoga Spots im Englischen Garten', views: 689 },
];

const topAuthors = [
  { id: '1', username: 'nowtown_team', articles: 45 },
  { id: '2', username: 'foodie_muc', articles: 32 },
  { id: '3', username: 'artlover', articles: 28 },
];

export function BlogSidebar(): React.ReactElement {
  return (
    <div className="sticky top-20 space-y-6">
      {/* Categories */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={category.id} />
              <Label
                htmlFor={category.id}
                className="flex-1 flex items-center justify-between cursor-pointer"
              >
                <span>{category.label}</span>
                <span className="text-sm text-muted-foreground">({category.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-4">Popular Posts</h3>
        <div className="space-y-3">
          {popularPosts.map((post, index) => (
            <div key={post.id} className="flex items-start gap-3 group cursor-pointer">
              <span className="text-lg font-bold text-primary">{index + 1}.</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </p>
                <p className="text-xs text-muted-foreground">{post.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Authors */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-4">Top Authors</h3>
        <div className="space-y-3">
          {topAuthors.map((author) => (
            <div key={author.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                {author.username?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">@{author.username}</p>
                <p className="text-xs text-muted-foreground">{author.articles} Articles</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-full">
                <UserPlus className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary/10 to-emerald-500/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-2">Newsletter</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get weekly updates on new articles and local events
        </p>
        <div className="space-y-2">
          <Input type="email" placeholder="Your email" className="bg-background" />
          <Button className="w-full rounded-full">Subscribe</Button>
        </div>
      </div>
    </div>
  );
}
