import React from 'react';
import { BlogFiltersSection } from '@/components/blog/BlogFiltersSection';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Mock categories metadata
const categoriesData: Record<string, { name: string; description: string; count: number; color: string }> = {
  'kultur': {
    name: 'Kultur',
    description: 'Entdecke kulturelle Events, Ausstellungen und künstlerische Veranstaltungen',
    count: 127,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  },
  'musik': {
    name: 'Musik',
    description: 'Von Konzerten bis Festivals - alle Musik-Events in deiner Stadt',
    count: 98,
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  },
  'sport': {
    name: 'Sport',
    description: 'Sportveranstaltungen, Wettkämpfe und aktive Freizeitaktivitäten',
    count: 156,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  'food-drink': {
    name: 'Food & Drink',
    description: 'Kulinarische Events, Food-Festivals und Genussmomente',
    count: 89,
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  },
  'bildung': {
    name: 'Bildung',
    description: 'Workshops, Seminare und Weiterbildungsveranstaltungen',
    count: 74,
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  'networking': {
    name: 'Networking',
    description: 'Business-Events, Meetups und professionelle Netzwerktreffen',
    count: 112,
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  },
};

// Mock blog posts for category
const mockCategoryPosts = [
  {
    id: '1',
    title: 'Die besten Kulturevents im Sommer 2024',
    excerpt: 'Ein umfassender Guide zu den Highlights der Kultursaison in Berlin',
    image: '/images/blog/culture-events.jpg',
    category: 'kultur',
    author: {
      name: 'Anna Schmidt',
      avatar: null,
    },
    published_date: '2024-06-15',
    reading_time: 8,
    likes: 245,
    comments: 34,
  },
  {
    id: '2',
    title: 'Insider-Tipps für Kunstliebhaber',
    excerpt: 'Versteckte Galerien und aufstrebende Künstler entdecken',
    image: '/images/blog/art-galleries.jpg',
    category: 'kultur',
    author: {
      name: 'Michael Weber',
      avatar: null,
    },
    published_date: '2024-06-12',
    reading_time: 6,
    likes: 189,
    comments: 27,
  },
];

export default async function BlogCategoryPage({ params }: CategoryPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const categoryMeta = categoriesData[slug];

  if (!categoryMeta) {
    return (
      <div className="container max-w-4xl py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Kategorie nicht gefunden</h1>
        <p className="text-muted-foreground mb-6">
          Die gesuchte Kategorie existiert nicht.
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

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge className={categoryMeta.color} variant="secondary">
                {categoryMeta.name}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {categoryMeta.count} Artikel
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">{categoryMeta.name}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {categoryMeta.description}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Kategorie folgen
          </Button>
        </div>
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
          <BlogGrid posts={mockCategoryPosts} />
        </div>
      </div>
    </div>
  );
}
