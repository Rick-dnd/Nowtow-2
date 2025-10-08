'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FolderOpen, Loader2 } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlog';

interface CategoryWithCount {
  name: string;
  count: number;
  slug: string;
}

export default function CategoriesPage(): React.ReactElement {
  const { data: posts, isLoading, error } = useBlogPosts();

  const categories = React.useMemo((): CategoryWithCount[] => {
    if (!posts) return [];

    const categoryMap = new Map<string, number>();

    (posts || []).forEach((post) => {
      const category = post.category ?? 'Uncategorized';
      categoryMap.set(category, (categoryMap.get(category) ?? 0) + 1);
    });

    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Alle Kategorien</h1>
              <p className="text-muted-foreground mt-1">
                Artikel nach Kategorie durchsuchen
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
            <p className="text-destructive">Fehler beim Laden der Kategorien</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Keine Kategorien gefunden</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
              >
                <Card className="p-6 hover:shadow-lg transition-all hover:border-primary">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count} {category.count === 1 ? 'Artikel' : 'Artikel'}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="w-full">
                      Artikel ansehen
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
