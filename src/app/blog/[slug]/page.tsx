'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  Heart,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Link2
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const articleData = {
  'yoga-im-englischen-garten': {
    title: 'Yoga im Englischen Garten: Ein magischer Start in den Tag',
    slug: 'yoga-im-englischen-garten',
    author: {
      name: 'Lisa Müller',
      avatar: '/placeholder-avatar.png',
      bio: 'Yoga-Enthusiastin und Event-Organisatorin in München. Liebt es, Menschen zusammenzubringen.',
      initials: 'LM',
    },
    publishedAt: '2025-06-10',
    readingTime: '5 min',
    category: 'Events & Culture',
    tags: ['Yoga', 'Outdoor', 'Wellness', 'München'],
    coverImage: '/categories/Yoga-und-Tanzraeume.jpg',
    content: `
Der Englische Garten ist nicht nur einer der größten Stadtparks der Welt, sondern auch der perfekte Ort für eine morgendliche Yoga-Session. Jeden Samstagmorgen treffen sich Yoga-Begeisterte aus ganz München, um gemeinsam in den Tag zu starten.

## Warum Outdoor-Yoga?

Die Kombination aus frischer Luft, natürlicher Umgebung und gemeinschaftlicher Energie macht Outdoor-Yoga zu einem einzigartigen Erlebnis. Im Englischen Garten sind wir umgeben von alten Bäumen, dem Rauschen des Eisbach und der morgendlichen Ruhe der Stadt.

## Was erwartet dich?

**Für Anfänger geeignet:** Unsere Sessions sind so gestaltet, dass sowohl Anfänger als auch Fortgeschrittene auf ihre Kosten kommen. Wir beginnen mit sanften Aufwärmübungen und steigern uns allmählich.

**Gemeinschaft:** Nach der Session gibt es oft die Möglichkeit, bei einem Kaffee die anderen Teilnehmer kennenzulernen. Viele Freundschaften sind hier schon entstanden!

**Flexibilität:** Du brauchst nur deine Yogamatte und bequeme Kleidung. Alles andere ist optional.

## Tipps für deine erste Session

1. Komm 10 Minuten früher, um einen guten Platz zu finden
2. Bring eine Wasserflasche mit
3. Zieh dich in Schichten an – morgens kann es kühl sein
4. Hab keine Angst, Fragen zu stellen

Wir freuen uns auf dich beim nächsten Mal!
    `,
    likes: 42,
    comments: 8,
    isLiked: false,
    isSaved: false,
  },
};

const relatedArticles = [
  {
    id: '1',
    title: 'Die besten Outdoor-Events in München im Sommer',
    author: 'Max Weber',
    date: '2025-06-08',
    image: '/categories/spontane-treffen.jpg',
    readingTime: '4 min',
  },
  {
    id: '2',
    title: 'Meditation für Anfänger: Ein praktischer Guide',
    author: 'Sarah Schmidt',
    date: '2025-06-05',
    image: '/categories/Yoga-und-Tanzraeume.jpg',
    readingTime: '6 min',
  },
  {
    id: '3',
    title: 'Gesunder Lifestyle: Tipps von Münchner Wellness-Experten',
    author: 'Julia Becker',
    date: '2025-06-01',
    image: '/categories/Musik-und-Performance.jpg',
    readingTime: '7 min',
  },
];

export default function BlogArticlePage(): React.ReactElement {
  const params = useParams();
  const slug = params.slug as string;
  const article = articleData[slug as keyof typeof articleData] || articleData['yoga-im-englischen-garten'];

  const [isLiked, setIsLiked] = React.useState(article.isLiked);
  const [isSaved, setIsSaved] = React.useState(article.isSaved);
  const [likes, setLikes] = React.useState(article.likes);

  const handleLike = (): void => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleShare = (platform: string): void => {
    console.log(`Sharing on ${platform}`);
    // In Phase 2: Implement actual sharing functionality
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zum Blog
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Calendar className="h-32 w-32 text-primary/40" />
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Article Header */}
            <div className="space-y-4">
              <Badge variant="secondary">{article.category}</Badge>
              <h1 className="text-4xl font-bold leading-tight">{article.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{article.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readingTime} Lesezeit</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Engagement Bar */}
              <div className="flex items-center justify-between py-4 border-y">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={isLiked ? 'text-destructive' : ''}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    {likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {article.comments}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('**')) {
                  const parts = paragraph.split('**');
                  return (
                    <p key={index} className="mb-4">
                      <strong>{parts[1]}</strong> {parts[2]}
                    </p>
                  );
                } else if (paragraph.match(/^\d+\./)) {
                  return (
                    <p key={index} className="mb-2 ml-4">
                      {paragraph}
                    </p>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="mb-4 text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            <Separator />

            {/* Author Bio */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={article.author.avatar} />
                    <AvatarFallback>{article.author.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-lg">{article.author.name}</h3>
                    <p className="text-sm text-muted-foreground">{article.author.bio}</p>
                    <Button variant="outline" size="sm">
                      Alle Artikel von {article.author.name.split(' ')[0]}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4">Artikel teilen</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={() => handleShare('facebook')}>
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                  <Button variant="outline" onClick={() => handleShare('twitter')}>
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button variant="outline" onClick={() => handleShare('linkedin')}>
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" onClick={() => handleShare('copy')}>
                    <Link2 className="mr-2 h-4 w-4" />
                    Link kopieren
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4">Kommentare ({article.comments})</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">Julia Dietrich</p>
                        <p className="text-xs text-muted-foreground">vor 2 Tagen</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      Toller Artikel! War letztes Wochenende dort und es war wirklich magisch. 🧘‍♀️
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MK</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">Markus Klein</p>
                        <p className="text-xs text-muted-foreground">vor 3 Tagen</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      Als Anfänger war ich etwas nervös, aber die Gruppe war super freundlich!
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Alle Kommentare anzeigen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Articles */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold">Ähnliche Artikel</h3>
                {relatedArticles.map((related) => (
                  <Link key={related.id} href={`/blog/${related.id}`}>
                    <div className="space-y-2 pb-4 border-b last:border-b-0 last:pb-0 hover:opacity-75 transition-opacity">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg" />
                      <h4 className="font-semibold text-sm line-clamp-2">{related.title}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{related.author}</span>
                        <span>{related.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter CTA */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="pt-6 space-y-4 text-center">
                <h3 className="font-bold">Verpasse keine Artikel!</h3>
                <p className="text-sm text-muted-foreground">
                  Abonniere unseren Newsletter für neue Blog-Artikel
                </p>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  Newsletter abonnieren
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
