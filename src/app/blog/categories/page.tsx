'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, TrendingUp, Users } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';
import Link from 'next/link';

interface CategoryData {
  slug: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  articles_count: number;
  followers_count: number;
  trending: boolean;
  topArticles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    author: {
      username: string;
      avatar: string | null;
    };
    published_at: string;
    reading_time: number;
    likes_count: number;
    comments_count: number;
    image_url: string | null;
  }>;
}

// Mock data - will be replaced with real Supabase data
const mockCategories: CategoryData[] = [
  {
    slug: 'kultur',
    name: 'Kultur',
    description: 'Entdecke kulturelle Events, Ausstellungen und künstlerische Highlights in München',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    icon: '🎭',
    articles_count: 127,
    followers_count: 3421,
    trending: true,
    topArticles: [
      {
        id: '1',
        title: 'Die besten Kunstgalerien in München 2025',
        slug: 'beste-kunstgalerien-muenchen-2025',
        excerpt: 'Ein Rundgang durch Münchens spannendste Kunstorte',
        author: { username: 'artlover', avatar: null },
        published_at: '2025-10-01T10:00:00Z',
        reading_time: 8,
        likes_count: 45,
        comments_count: 12,
        image_url: null,
      },
    ],
  },
  {
    slug: 'musik',
    name: 'Musik',
    description: 'Von Konzerten bis Festivals - alles rund um die Münchner Musikszene',
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    icon: '🎵',
    articles_count: 98,
    followers_count: 2897,
    trending: true,
    topArticles: [],
  },
  {
    slug: 'food',
    name: 'Food & Drink',
    description: 'Kulinarische Entdeckungen und die besten Restaurants in München',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    icon: '🍽️',
    articles_count: 156,
    followers_count: 4521,
    trending: false,
    topArticles: [],
  },
  {
    slug: 'sport',
    name: 'Sport',
    description: 'Sportevents, Fitness-Tipps und aktive Community in München',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    icon: '⚽',
    articles_count: 84,
    followers_count: 2134,
    trending: false,
    topArticles: [],
  },
  {
    slug: 'business',
    name: 'Business',
    description: 'Startup-News, Business-Events und Networking in München',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: '💼',
    articles_count: 112,
    followers_count: 3678,
    trending: true,
    topArticles: [],
  },
  {
    slug: 'lifestyle',
    name: 'Lifestyle',
    description: 'Trends, Shopping und das beste vom Münchner Lifestyle',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    icon: '✨',
    articles_count: 143,
    followers_count: 5234,
    trending: false,
    topArticles: [],
  },
];

export default function BlogCategoriesPage(): React.ReactElement {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Blog Kategorien</h1>
            <p className="text-lg text-muted-foreground">
              Entdecke Artikel nach deinen Interessen
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category) => (
              <Card
                key={category.slug}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  {/* Category Icon & Name */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{category.icon}</div>
                      <div>
                        <Link href={`/blog/category/${category.slug}`}>
                          <h3 className="text-2xl font-bold hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                        </Link>
                        {category.trending && (
                          <Badge className="mt-1" variant="secondary">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{category.articles_count} Artikel</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{category.followers_count.toLocaleString()} Follower</span>
                    </div>
                  </div>

                  {/* Top Articles Preview */}
                  {category.topArticles.length > 0 && (
                    <div className="mb-4 pb-4 border-b">
                      <p className="text-sm font-semibold mb-2">Top Artikel:</p>
                      <div className="space-y-2">
                        {category.topArticles.slice(0, 3).map((article) => (
                          <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className="block text-sm hover:text-primary transition-colors line-clamp-1"
                          >
                            • {article.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/blog/category/${category.slug}`}>
                        Alle Artikel
                      </Link>
                    </Button>
                    <Button variant="outline">Folgen</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Category Section */}
          {mockCategories[0] !== undefined && mockCategories[0].topArticles.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>{mockCategories[0].icon}</span>
                  Top Artikel in {mockCategories[0].name}
                </h2>
                <Button asChild variant="outline">
                  <Link href={`/blog/category/${mockCategories[0].slug}`}>
                    Alle anzeigen
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCategories[0].topArticles.map((article) => (
                  <BlogCard
                    key={article.id}
                    article={{
                      id: article.id,
                      title: article.title,
                      excerpt: article.excerpt,
                      category: mockCategories[0]?.name ?? '',
                      author: {
                        username: article.author.username,
                        avatar: article.author.avatar,
                      },
                      publishedAt: article.published_at,
                      readTime: `${article.reading_time} min`,
                      likes: article.likes_count,
                      image: article.image_url,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
