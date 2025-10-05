'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { FileText, Plus, Search, Eye, Heart, MessageSquare, Edit2, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  category: string;
  published_at: string | null;
  views_count: number;
  likes_count: number;
  comments_count: number;
  updated_at: string;
}

// Mock data - will be replaced with real Supabase data
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Die besten Tech-Events in München 2025',
    slug: 'beste-tech-events-muenchen-2025',
    status: 'published',
    category: 'Technologie',
    published_at: '2025-10-01T10:00:00Z',
    views_count: 15234,
    likes_count: 892,
    comments_count: 156,
    updated_at: '2025-10-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Startup-Szene München: Der ultimative Guide',
    slug: 'startup-szene-muenchen-guide',
    status: 'draft',
    category: 'Business',
    published_at: null,
    views_count: 0,
    likes_count: 0,
    comments_count: 0,
    updated_at: '2025-10-04T15:30:00Z',
  },
  {
    id: '3',
    title: 'KI-Trends 2024: Was kommt als Nächstes?',
    slug: 'ki-trends-2024',
    status: 'archived',
    category: 'Technologie',
    published_at: '2024-05-15T10:00:00Z',
    views_count: 8934,
    likes_count: 456,
    comments_count: 78,
    updated_at: '2024-05-15T10:00:00Z',
  },
];

export default function YourArticlesPage(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter articles
  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Article['status']): React.ReactElement => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Veröffentlicht</Badge>;
      case 'draft':
        return <Badge variant="secondary">Entwurf</Badge>;
      case 'archived':
        return <Badge variant="outline">Archiviert</Badge>;
    }
  };

  const handleDelete = (id: string): void => {
    if (confirm('Artikel wirklich löschen?')) {
      console.log('Deleting article:', id);
    }
  };

  const handleDuplicate = (id: string): void => {
    console.log('Duplicating article:', id);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">Deine Artikel</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                  Verwalte und bearbeite deine Blog-Artikel
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/blog/write">
                  <Plus className="h-4 w-4 mr-2" />
                  Neuer Artikel
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Veröffentlicht</p>
                <p className="text-2xl font-bold">
                  {mockArticles.filter((a) => a.status === 'published').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Entwürfe</p>
                <p className="text-2xl font-bold">
                  {mockArticles.filter((a) => a.status === 'draft').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Gesamt Aufrufe</p>
                <p className="text-2xl font-bold">
                  {mockArticles
                    .reduce((sum, a) => sum + a.views_count, 0)
                    .toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Gesamt Likes</p>
                <p className="text-2xl font-bold">
                  {mockArticles
                    .reduce((sum, a) => sum + a.likes_count, 0)
                    .toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Artikel durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="published">Veröffentlicht</SelectItem>
                  <SelectItem value="draft">Entwürfe</SelectItem>
                  <SelectItem value="archived">Archiviert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {filteredArticles.length}{' '}
                {filteredArticles.length === 1 ? 'Artikel' : 'Artikel'}
              </p>
            </div>
          </div>

          {/* Articles Table */}
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Keine Artikel gefunden</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Versuche andere Filter'
                    : 'Erstelle deinen ersten Artikel'}
                </p>
                <Button asChild>
                  <Link href="/blog/write">
                    <Plus className="h-4 w-4 mr-2" />
                    Neuer Artikel
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titel</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Kategorie</TableHead>
                      <TableHead className="text-center">Aufrufe</TableHead>
                      <TableHead className="text-center">Likes</TableHead>
                      <TableHead className="text-center">Kommentare</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/blog/${article.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {article.title}
                          </Link>
                        </TableCell>
                        <TableCell>{getStatusBadge(article.status)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{article.category}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            {article.views_count.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Heart className="h-4 w-4 text-muted-foreground" />
                            {article.likes_count.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            {article.comments_count}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {article.published_at
                            ? format(new Date(article.published_at), 'dd.MM.yyyy', {
                                locale: de,
                              })
                            : format(new Date(article.updated_at), 'dd.MM.yyyy', {
                                locale: de,
                              })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/blog/write?edit=${article.id}`}>
                                <Edit2 className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicate(article.id)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(article.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
