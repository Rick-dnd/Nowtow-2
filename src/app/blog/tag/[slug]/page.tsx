import React from 'react';
import { BlogFiltersSection } from '@/components/blog/BlogFiltersSection';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Hash, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

// Mock tags metadata
const tagsData: Record<string, { name: string; description: string; count: number }> = {
  'berlin': {
    name: 'Berlin',
    description: 'Alle Events und Artikel rund um Berlin',
    count: 234,
  },
  'summer-2024': {
    name: 'Summer 2024',
    description: 'Die Highlights der Sommersaison 2024',
    count: 156,
  },
  'festival': {
    name: 'Festival',
    description: 'Festival-Guides, Tipps und Erfahrungsberichte',
    count: 89,
  },
  'local-tipps': {
    name: 'Local Tipps',
    description: 'Insider-Tipps von Locals für Locals',
    count: 178,
  },
  'fotografie': {
    name: 'Fotografie',
    description: 'Fotografie-Events, Ausstellungen und Tipps',
    count: 67,
  },
  'nachhaltig': {
    name: 'Nachhaltig',
    description: 'Nachhaltige Events und umweltfreundliche Veranstaltungen',
    count: 45,
  },
};

// Mock blog posts for tag
const mockTagPosts = [
  {
    id: '1',
    title: 'Berlin Summer Guide 2024',
    excerpt: 'Die besten Events, Locations und Geheimtipps für den Sommer in Berlin',
    image: '/images/blog/berlin-summer.jpg',
    category: 'kultur',
    author: {
      name: 'Lisa Müller',
      avatar: null,
    },
    published_date: '2024-06-20',
    reading_time: 10,
    likes: 456,
    comments: 67,
  },
  {
    id: '2',
    title: 'Versteckte Perlen in Berlin entdecken',
    excerpt: 'Orte abseits der Touristenpfade, die du kennen solltest',
    image: '/images/blog/hidden-berlin.jpg',
    category: 'kultur',
    author: {
      name: 'Thomas Klein',
      avatar: null,
    },
    published_date: '2024-06-18',
    reading_time: 7,
    likes: 312,
    comments: 45,
  },
];

// Related tags
const relatedTags = [
  { slug: 'munich', name: 'München' },
  { slug: 'hamburg', name: 'Hamburg' },
  { slug: 'cologne', name: 'Köln' },
  { slug: 'frankfurt', name: 'Frankfurt' },
];

export default async function BlogTagPage({ params }: TagPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const tagMeta = tagsData[slug];

  if (!tagMeta) {
    return (
      <div className="container max-w-4xl py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Tag nicht gefunden</h1>
        <p className="text-muted-foreground mb-6">
          Das gesuchte Tag existiert nicht.
        </p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb & Back Button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Blog
          </Link>
        </Button>
      </div>

      {/* Tag Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-primary" />
                <Badge variant="secondary">
                  {tagMeta.name}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {tagMeta.count} Artikel
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">#{tagMeta.name}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {tagMeta.description}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Tag folgen
          </Button>
        </div>

        {/* Related Tags */}
        {relatedTags.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-3">Ähnliche Tags:</p>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map((tag) => (
                <Button
                  key={tag.slug}
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href={`/blog/tag/${tag.slug}`}>
                    <Hash className="h-3 w-3 mr-1" />
                    {tag.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <BlogFiltersSection />
          </div>
        </aside>

        {/* Main Content - Articles Grid */}
        <div className="lg:col-span-3">
          <BlogGrid posts={mockTagPosts} />
        </div>
      </div>
    </div>
  );
}
