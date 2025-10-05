'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Search, TrendingUp, Users, Heart, FileText, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

interface Author {
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string | null;
  stats: {
    articles_count: number;
    total_likes: number;
    followers_count: number;
  };
  expertise: string[];
  verified: boolean;
  top_contributor: boolean;
}

// Mock data - will be replaced with real Supabase data
const mockAuthors: Author[] = [
  {
    username: 'maxmueller',
    full_name: 'Max Müller',
    bio: 'Tech-Journalist und Blogger aus München. Schreibt über KI, Startups und Innovation.',
    avatar_url: null,
    stats: {
      articles_count: 87,
      total_likes: 2341,
      followers_count: 1234,
    },
    expertise: ['Technologie', 'Startups', 'KI'],
    verified: true,
    top_contributor: true,
  },
  {
    username: 'anna_writer',
    full_name: 'Anna Schmidt',
    bio: 'Food-Bloggerin mit Leidenschaft für die Münchner Gastro-Szene.',
    avatar_url: null,
    stats: {
      articles_count: 124,
      total_likes: 3567,
      followers_count: 2134,
    },
    expertise: ['Food', 'Restaurants', 'Lifestyle'],
    verified: true,
    top_contributor: true,
  },
  {
    username: 'sportfanatic',
    full_name: 'Tom Wagner',
    bio: 'Sport-Reporter und Marathon-Läufer. Berichtet über Sportevents in München.',
    avatar_url: null,
    stats: {
      articles_count: 56,
      total_likes: 987,
      followers_count: 543,
    },
    expertise: ['Sport', 'Fitness', 'Events'],
    verified: false,
    top_contributor: false,
  },
  {
    username: 'cultured_mind',
    full_name: 'Lisa Bauer',
    bio: 'Kunsthistorikerin und Kultur-Enthusiastin. Entdeckt Münchens kulturelle Schätze.',
    avatar_url: null,
    stats: {
      articles_count: 92,
      total_likes: 1876,
      followers_count: 1098,
    },
    expertise: ['Kultur', 'Kunst', 'Museen'],
    verified: true,
    top_contributor: true,
  },
];

export default function BlogAuthorsPage(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'articles' | 'likes' | 'followers'>('followers');
  const [filterTag, setFilterTag] = useState<string>('all');

  // Get all unique expertise tags
  const allTags = Array.from(
    new Set(mockAuthors.flatMap((author) => author.expertise))
  );

  // Filter and sort authors
  const filteredAuthors = mockAuthors
    .filter((author) => {
      const matchesSearch =
        author.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        filterTag === 'all' || author.expertise.includes(filterTag);

      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'articles') {
        return b.stats.articles_count - a.stats.articles_count;
      } else if (sortBy === 'likes') {
        return b.stats.total_likes - a.stats.total_likes;
      } else {
        return b.stats.followers_count - a.stats.followers_count;
      }
    });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Autoren entdecken</h1>
            <p className="text-lg text-muted-foreground">
              Folge deinen Lieblingsautoren und verpasse keine neuen Artikel
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Autoren suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Expertise Filter */}
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger>
                  <SelectValue placeholder="Expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Themen</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as typeof sortBy)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sortieren" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="followers">Meiste Follower</SelectItem>
                  <SelectItem value="articles">Meiste Artikel</SelectItem>
                  <SelectItem value="likes">Meiste Likes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {filteredAuthors.length}{' '}
                {filteredAuthors.length === 1 ? 'Autor' : 'Autoren'} gefunden
              </p>
            </div>
          </div>

          {/* Authors Grid */}
          {filteredAuthors.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Keine Autoren gefunden</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterTag('all');
                  }}
                >
                  Filter zurücksetzen
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuthors.map((author) => (
                <Card
                  key={author.username}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    {/* Author Avatar & Name */}
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl bg-gradient-to-br from-primary to-emerald-600 text-white">
                          {author.full_name[0]?.toUpperCase() ?? 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Link href={`/blog/author/${author.username}`}>
                            <h3 className="text-xl font-bold hover:text-primary transition-colors">
                              {author.full_name}
                            </h3>
                          </Link>
                          {author.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verifiziert
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          @{author.username}
                        </p>
                        {author.top_contributor && (
                          <Badge variant="default" className="text-xs mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Top Contributor
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {author.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {author.expertise.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-bold">{author.stats.articles_count}</p>
                        <p className="text-xs text-muted-foreground">Artikel</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Heart className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-bold">
                          {author.stats.total_likes.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Likes</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-bold">
                          {author.stats.followers_count.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Follower</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={`/blog/author/${author.username}`}>
                          Profil ansehen
                        </Link>
                      </Button>
                      <Button variant="outline">Folgen</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
