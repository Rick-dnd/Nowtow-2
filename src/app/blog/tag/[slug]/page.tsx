'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Tag, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useBlogPosts } from '@/hooks/useBlog';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function TagPage({ params }: TagPageProps): React.ReactElement {
  const [tagSlug, setTagSlug] = React.useState<string>('');
  const { data: allPosts, isLoading, error } = useBlogPosts();

  React.useEffect((): void => {
    void params.then((resolvedParams) => {
      setTagSlug(resolvedParams.slug);
    });
  }, [params]);

  const tagName = React.useMemo(() => {
    return tagSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [tagSlug]);

  const taggedPosts = React.useMemo(() => {
    if (!allPosts || !tagSlug) return [];
    return (allPosts || []).filter((post) => {
      const tags = (post.tags as string[] | null) ?? [];
      return tags.some(
        (tag) => tag.toLowerCase().replace(/\s+/g, '-') === tagSlug
      );
    });
  }, [allPosts, tagSlug]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Tag className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">#{tagName}</h1>
              <p className="text-muted-foreground mt-1">
                {isLoading
                  ? 'Loading...'
                  : `${taggedPosts.length} article${taggedPosts.length !== 1 ? 's' : ''} tagged with ${tagName}`}
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
            <p className="text-destructive">Error loading tagged articles</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </div>
        ) : taggedPosts.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              No articles found with tag &quot;{tagName}&quot;
            </p>
            <Button asChild>
              <Link href="/blog">Browse All Articles</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Related Tags */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Related Tags</h2>
              <div className="flex flex-wrap gap-2">
                {Array.from(
                  new Set(
                    taggedPosts.flatMap((post) => (post.tags as string[] | null) ?? [])
                  )
                )
                  .filter((tag) => tag.toLowerCase().replace(/\s+/g, '-') !== tagSlug)
                  .slice(0, 10)
                  .map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {taggedPosts.map((post) => (
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
          </>
        )}
      </div>
    </div>
  );
}
