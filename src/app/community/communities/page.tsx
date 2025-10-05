'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Search, Users, Grid3x3, List, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image_url: string | null;
  members_count: number;
  privacy: 'public' | 'private';
  tags: string[];
  created_at: string;
}

// Mock data - will be replaced with real Supabase data
const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'München Techies',
    slug: 'muenchen-techies',
    description: 'Die Community für Tech-Enthusiasten in München. Networking, Events und Knowledge Sharing.',
    category: 'Technologie',
    image_url: null,
    members_count: 1247,
    privacy: 'public',
    tags: ['Tech', 'Networking', 'Startups'],
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'München Foodies',
    slug: 'muenchen-foodies',
    description: 'Entdecke die beste Küche Münchens. Restaurant-Reviews, Food-Events und kulinarische Erlebnisse.',
    category: 'Kulinarik',
    image_url: null,
    members_count: 3542,
    privacy: 'public',
    tags: ['Food', 'Restaurants', 'Events'],
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Fitness München',
    slug: 'fitness-muenchen',
    description: 'Gemeinsam fit werden! Laufgruppen, Gym-Buddies und Fitness-Challenges.',
    category: 'Sport',
    image_url: null,
    members_count: 892,
    privacy: 'public',
    tags: ['Fitness', 'Running', 'Health'],
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Kreatives München',
    slug: 'kreatives-muenchen',
    description: 'Für Künstler, Designer und Kreative. Austausch, Workshops und gemeinsame Projekte.',
    category: 'Kunst & Design',
    image_url: null,
    members_count: 567,
    privacy: 'public',
    tags: ['Art', 'Design', 'Creative'],
    created_at: new Date().toISOString(),
  },
];

const categories = [
  'Alle',
  'Technologie',
  'Kulinarik',
  'Sport',
  'Kunst & Design',
  'Musik',
  'Lifestyle',
  'Business',
];

export default function CommunitiesPage(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'active'>('popular');

  const filteredCommunities = mockCommunities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Alle' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedCommunities = [...filteredCommunities].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.members_count - a.members_count;
    } else if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Communities entdecken</h1>
            <p className="text-lg text-muted-foreground">
              Finde deine Community und vernetze dich mit Gleichgesinnten
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Communities durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sortieren" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Beliebteste</SelectItem>
                  <SelectItem value="newest">Neueste</SelectItem>
                  <SelectItem value="active">Aktivste</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {sortedCommunities.length} {sortedCommunities.length === 1 ? 'Community' : 'Communities'} gefunden
              </p>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Communities Grid/List */}
          {sortedCommunities.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Keine Communities gefunden</p>
                <Button variant="outline">Filter zurücksetzen</Button>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {sortedCommunities.map((community) => (
                <Link key={community.id} href={`/community/c/${community.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      {/* Community Image/Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                        {community.name[0]?.toUpperCase() ?? 'C'}
                      </div>

                      {/* Community Info */}
                      <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {community.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{community.members_count.toLocaleString()} Mitglieder</span>
                        </div>
                        {community.privacy === 'private' && (
                          <Badge variant="outline">Privat</Badge>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {community.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Category Badge */}
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {community.category}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Beitreten
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
