'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/blog/BlogCard';
import { FeaturedArticle } from '@/components/blog/FeaturedArticle';
import { BlogSidebar } from '@/components/blog/BlogSidebar';

const mockArticles = [
  {
    id: '1',
    title: 'Die 10 besten Events in München diesen Monat',
    excerpt: 'Entdecke die spannendsten Events, die du diesen Monat nicht verpassen solltest...',
    category: 'Events',
    author: { username: 'johndoe', avatar: null },
    publishedAt: '2 days ago',
    readTime: '5 min',
    likes: 234,
    image: null,
  },
  {
    id: '2',
    title: 'Versteckte Kunst-Studios in Glockenbach',
    excerpt: 'Eine Tour durch die kreativsten Räume im Herzen Münchens...',
    category: 'Guides',
    author: { username: 'artlover', avatar: null },
    publishedAt: '3 days ago',
    readTime: '8 min',
    likes: 156,
    image: null,
  },
  {
    id: '3',
    title: 'Food-Guide: Die besten Pop-up Restaurants',
    excerpt: 'Von vietnamesisch bis vegan - diese Pop-ups musst du probieren...',
    category: 'Local Tips',
    author: { username: 'foodie_muc', avatar: null },
    publishedAt: '5 days ago',
    readTime: '6 min',
    likes: 189,
    image: null,
  },
];

export default function BlogPage(): React.ReactElement {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-emerald-500/10 to-teal-500/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nowtown Blog</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Stories aus München & Local Insights
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        <div className="container mx-auto px-4 py-12">
          <FeaturedArticle
            article={{
              id: 'featured',
              title: 'Die ultimative Guide für Local Experiences in München',
              excerpt: 'Entdecke München wie ein Einheimischer - von versteckten Cafés bis zu exklusiven Events. Dieser Guide zeigt dir die besten Spots der Stadt...',
              category: 'Featured',
              author: { username: 'nowtown_team', avatar: null },
              publishedAt: '1 day ago',
              readTime: '12 min',
              likes: 567,
              image: null,
            }}
          />
        </div>

        {/* Content Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Articles */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold">Recent Articles</h2>
              <div className="space-y-4">
                {mockArticles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
              <Button variant="outline" className="w-full rounded-full mt-6">
                Load More...
              </Button>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
