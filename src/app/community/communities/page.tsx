'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { useCommunities } from '@/hooks/useCommunities';
import type { CommunityFilters } from '@/services/community.service';
import { CreateCommunityDialog } from '@/components/community/CreateCommunityDialog';

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
  const [selectedPrivacy, setSelectedPrivacy] = useState<'all' | 'public' | 'private'>('all');

  // Build filters object
  const filters: CommunityFilters = {
    category: selectedCategory !== 'Alle' ? selectedCategory : undefined,
    searchQuery: searchQuery || undefined,
    privacy: selectedPrivacy !== 'all' ? selectedPrivacy : undefined,
  };

  // Fetch communities using hook
  const { data: communities, isLoading, error } = useCommunities(filters);

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Lädt Communities...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Fehler: {error.message}</p>
                <Button variant="outline" onClick={(): void => window.location.reload()}>
                  Neu laden
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  const communitiesList = communities ?? [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Communities entdecken</h1>
              <p className="text-lg text-muted-foreground">
                Finde deine Community und vernetze dich mit Gleichgesinnten
              </p>
            </div>
            <CreateCommunityDialog />
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
                  onChange={(e): void => setSearchQuery(e.target.value)}
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

              {/* Privacy Filter */}
              <Select value={selectedPrivacy} onValueChange={(value): void => setSelectedPrivacy(value as typeof selectedPrivacy)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sichtbarkeit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  <SelectItem value="public">Öffentlich</SelectItem>
                  <SelectItem value="private">Privat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {communitiesList.length} {communitiesList.length === 1 ? 'Community' : 'Communities'} gefunden
              </p>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={(): void => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={(): void => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Communities Grid/List */}
          {communitiesList.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Keine Communities gefunden</p>
                <Button
                  variant="outline"
                  onClick={(): void => {
                    setSearchQuery('');
                    setSelectedCategory('Alle');
                    setSelectedPrivacy('all');
                  }}
                >
                  Filter zurücksetzen
                </Button>
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
              {communitiesList.map((community) => (
                <Link key={community.id} href={`/community/c/${community.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      {/* Community Image/Avatar */}
                      {community.image_url ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                          <Image
                            src={community.image_url}
                            alt={community.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                          {community.name[0]?.toUpperCase() ?? 'C'}
                        </div>
                      )}

                      {/* Community Info */}
                      <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {community.description ?? 'Keine Beschreibung verfügbar'}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{(community.members_count ?? 0).toLocaleString()} Mitglieder</span>
                        </div>
                        {community.privacy === 'private' && (
                          <Badge variant="outline">Privat</Badge>
                        )}
                      </div>

                      {/* Tags */}
                      {community.tags && Array.isArray(community.tags) && community.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {community.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {String(tag)}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {community.category ?? 'Allgemein'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Ansehen
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
