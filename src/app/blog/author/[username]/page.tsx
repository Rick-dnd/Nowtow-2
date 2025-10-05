import React from 'react';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Calendar,
  BookOpen,
  Heart,
  UserPlus,
  Share2,
} from 'lucide-react';
import Link from 'next/link';

interface AuthorPageProps {
  params: Promise<{ username: string }>;
}

// Mock author data
const authorsData: Record<string, {
  username: string;
  full_name: string;
  bio: string;
  avatar: string | null;
  location: string;
  website: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  email: string;
  joined_date: string;
  articles_count: number;
  followers_count: number;
  total_likes: number;
  expertise: string[];
}> = {
  'anna-schmidt': {
    username: 'anna-schmidt',
    full_name: 'Anna Schmidt',
    bio: 'Kulturjournalistin und Event-Enthusiastin aus Berlin. Ich liebe es, versteckte Perlen der Kulturszene zu entdecken und darüber zu schreiben. Wenn ich nicht gerade auf Events bin, findet man mich in Galerien oder auf der Suche nach dem perfekten Kaffee.',
    avatar: null,
    location: 'Berlin, Germany',
    website: 'https://anna-schmidt.de',
    twitter: '@anna_schmidt',
    instagram: '@annaschmidt_events',
    linkedin: 'anna-schmidt',
    email: 'anna@example.com',
    joined_date: '2023-01-15',
    articles_count: 47,
    followers_count: 1234,
    total_likes: 5678,
    expertise: ['Kultur', 'Kunst', 'Musik', 'Berlin'],
  },
};

// Mock author articles
const mockAuthorArticles = [
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
      name: 'Anna Schmidt',
      avatar: null,
    },
    published_date: '2024-06-12',
    reading_time: 6,
    likes: 189,
    comments: 27,
  },
];

export default async function AuthorProfilePage({ params }: AuthorPageProps): Promise<React.ReactElement> {
  const { username } = await params;
  const author = authorsData[username];

  if (!author) {
    return (
      <div className="container max-w-4xl py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Autor nicht gefunden</h1>
        <p className="text-muted-foreground mb-6">
          Der gesuchte Autor existiert nicht.
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
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Blog
          </Link>
        </Button>
      </div>

      {/* Author Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-start">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {author.full_name[0]}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{author.full_name}</h1>
              <p className="text-muted-foreground mb-4">@{author.username}</p>
              <p className="text-base leading-relaxed mb-4">{author.bio}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {author.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{author.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Mitglied seit {new Date(author.joined_date).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {author.expertise.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Folgen
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Nachricht
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{author.articles_count}</span>
              </div>
              <p className="text-sm text-muted-foreground">Artikel</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{author.total_likes.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Likes</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <UserPlus className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{author.followers_count.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Follower</p>
            </div>
          </div>

          {/* Social Links */}
          {(author.website || author.twitter || author.instagram || author.linkedin) && (
            <>
              <Separator className="my-6" />
              <div className="flex justify-center gap-3">
                {author.website && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={author.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
                      <LinkIcon className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {author.twitter && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={`https://twitter.com/${author.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {author.instagram && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={`https://instagram.com/${author.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {author.linkedin && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={`https://linkedin.com/in/${author.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="articles" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Artikel ({author.articles_count})
          </TabsTrigger>
          <TabsTrigger value="popular" className="gap-2">
            <Heart className="h-4 w-4" />
            Beliebt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-6">
          <BlogGrid posts={mockAuthorArticles} />
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <BlogGrid posts={mockAuthorArticles.slice(0, 1)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
