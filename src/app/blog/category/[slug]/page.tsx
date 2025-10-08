'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, FolderOpen, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlog';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps): React.ReactElement {
  const [categorySlug, setCategorySlug] = React.useState<string>('');
  const [sortBy, setSortBy] = React.useState<string>('recent');
  const { data: allPosts, isLoading, error } = useBlogPosts();

  React.useEffect((): void => {
    void params.then((resolvedParams) => {
      setCategorySlug(resolvedParams.slug);
    });
  }, [params]);

  const categoryName = React.useMemo(() => {
    return categorySlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [categorySlug]);

  const categoryPosts = React.useMemo(() => {
    if (!allPosts || !categorySlug) return [];

    let filtered = (allPosts || []).filter((post) => {
      const postCategory = (post.category ?? '').toLowerCase().replace(/\s+/g, '-');
      return postCategory === categorySlug;
    });

    // Sort
    switch (sortBy) {
      case 'recent':
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.created_at ?? 0).getTime() -
            new Date(a.created_at ?? 0).getTime()
        );
        break;
      case 'popular':
        filtered = filtered.sort(
          (a, b) => (b.view_count ?? 0) - (a.view_count ?? 0)
        );
        break;
      case 'trending':
        filtered = filtered.sort(
          (a, b) => (b.like_count ?? 0) - (a.like_count ?? 0)
        );
        break;
    }

    return filtered;
  }, [allPosts, categorySlug, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/blog/categories">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <FolderOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">{categoryName}</h1>
              <p className="text-muted-foreground mt-1">
                {isLoading
                  ? 'Loading...'
                  : `${categoryPosts.length} article${categoryPosts.length !== 1 ? 's' : ''} in this category`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Error loading category articles</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </div>
        ) : categoryPosts.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              No articles found in category &quot;{categoryName}&quot;
            </p>
            <Button asChild>
              <Link href="/blog">Browse All Articles</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="h-5 w-5" />
                  <h2 className="font-semibold">Filters</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="trending">Trending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Related Categories</h3>
                    <div className="space-y-2">
                      {Array.from(
                        new Set(
                          (allPosts || [])
                            .map((post) => post.category)
                            .filter(Boolean)
                        )
                      )
                        .filter(
                          (cat) =>
                            cat!.toLowerCase().replace(/\s+/g, '-') !== categorySlug
                        )
                        .slice(0, 5)
                        .map((category) => (
                          <Link
                            key={category}
                            href={`/blog/category/${category!.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <Badge
                              variant="outline"
                              className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {category}
                            </Badge>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="p-6 hover:shadow-lg transition-all">
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      {post.category && (
                        <Badge variant="secondary">{post.category}</Badge>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
