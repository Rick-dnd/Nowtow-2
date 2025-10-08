'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogCardModern } from '@/components/blog/BlogCardModern';
import { BlogHero } from '@/components/blog/BlogHero';
import { useBlogPosts, useBlogStats } from '@/hooks/useBlog';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function BlogPage(): React.ReactElement {
  // Fetch featured posts
  const { data: featuredPosts, isLoading: featuredLoading } = useBlogPosts({
    featured: true,
    limit: 3,
  });

  // Fetch recent posts
  const { data: recentPosts, isLoading: recentLoading } = useBlogPosts({
    limit: 12,
  });

  // Fetch blog stats for categories
  const { data: stats } = useBlogStats();

  return (
    <div className="space-y-16">
      {/* Hero Carousel */}
      {featuredLoading ? (
        <div className="h-[600px] bg-muted animate-pulse rounded-2xl" />
      ) : (
        <BlogHero featuredPosts={featuredPosts || []} />
      )}

      {/* Seiten-Header */}
      <div>
        <h1 className="text-5xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Entdecke Inspiration für Events, kreative Räume und Community-Building. Von
          Event-Tipps bis zu Raumgestaltung - hier findest du alles für dein nächstes Projekt!
        </p>
      </div>

      {/* Top Kategorien Bereich */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Top Kategorien</h2>
          <Button variant="link" className="text-primary" asChild>
            <Link href="/blog/categories">Alle ansehen →</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats && stats.categories && stats.categories.length > 0 ? (
            stats.categories.slice(0, 4).map((category) => {
              // Map category names to icons
              const categoryIcons: Record<string, string> = {
                'Events': '🎉',
                'Räume': '🏢',
                'Lifestyle': '✨',
                'Business': '💼',
                'Technologie': '💻',
                'Wellness': '🧘',
                'Kultur': '🎭',
                'Food': '🍽️',
                'Sport': '⚽',
                'Reisen': '✈️',
              };
              const icon = categoryIcons[category.name] ?? '📝';

              return (
                <Link
                  key={category.name}
                  href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-primary">
                    <div className="text-center space-y-2">
                      <div className="text-4xl mb-2">{icon}</div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count} {category.count === 1 ? 'Artikel' : 'Artikel'}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })
          ) : (
            // Fallback skeleton loading
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="text-center space-y-2">
                  <Skeleton className="h-12 w-12 mx-auto rounded-full" />
                  <Skeleton className="h-5 w-20 mx-auto" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Artikel Header mit Filtern */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Artikel
          {recentPosts && (
            <span className="text-muted-foreground font-normal text-lg">
              {recentPosts.length}
            </span>
          )}
        </h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Alle Kategorien
          </Button>
          <Button variant="outline" className="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 16 4 4 4-4" />
              <path d="M7 20V4" />
              <path d="m21 8-4-4-4 4" />
              <path d="M17 4v16" />
            </svg>
            Neueste zuerst
          </Button>
        </div>
      </div>

      {/* Articles Grid */}
      {recentLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : recentPosts && recentPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {recentPosts.map((post) => (
              <BlogCardModern key={post.id} post={post} />
            ))}
          </div>

          {/* Load More (placeholder for now) */}
          {recentPosts.length >= 12 && (
            <div className="flex justify-center mt-16">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 hover:bg-accent hover:scale-105 transition-transform"
              >
                Mehr laden
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Noch keine Artikel</h3>
            <p className="text-muted-foreground">
              Sei der Erste, der einen Artikel veröffentlicht!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
