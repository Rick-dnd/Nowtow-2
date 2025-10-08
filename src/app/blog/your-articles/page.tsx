'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { FileText, Plus, Search, Eye, Heart, MessageSquare, Edit2, Trash2, Copy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useBlogPosts, useDeleteBlogPost } from '@/hooks/useBlog';
import type { Database } from '@/types/database';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export default function YourArticlesPage(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Fetch user's blog posts - TODO: Add authorId filter when auth is ready
  const { data: blogPosts, isLoading, error } = useBlogPosts({
    limit: 100,
  });

  const deleteMutation = useDeleteBlogPost();

  // Filter articles by tab and search
  const filteredArticles = useMemo(() => {
    if (!blogPosts) return [];

    return blogPosts.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = activeTab === 'all' || article.status === activeTab;
      return matchesSearch && matchesStatus;
    });
  }, [blogPosts, searchQuery, activeTab]);

  const getStatusBadge = (status: BlogPost['status']): React.ReactElement => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Veröffentlicht</Badge>;
      case 'draft':
        return <Badge variant="secondary">Entwurf</Badge>;
      case 'archived':
        return <Badge variant="outline">Archiviert</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDelete = (id: string): void => {
    if (confirm('Artikel wirklich löschen?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleDuplicate = (id: string): void => {
    console.log('Duplicating article:', id);
    // TODO: Implement duplication
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg text-muted-foreground">Lade deine Artikel...</p>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-destructive mb-2">Fehler beim Laden der Artikel</p>
                <p className="text-sm text-muted-foreground">{error.message}</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  const articles = filteredArticles || [];
  const allArticles = blogPosts || [];

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
                  {allArticles.filter((a) => a.status === 'published').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Entwürfe</p>
                <p className="text-2xl font-bold">
                  {allArticles.filter((a) => a.status === 'draft').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Gesamt Aufrufe</p>
                <p className="text-2xl font-bold">
                  {allArticles
                    .reduce((sum, a) => sum + (a.view_count || 0), 0)
                    .toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Gesamt Likes</p>
                <p className="text-2xl font-bold">
                  {allArticles
                    .reduce((sum, a) => sum + (a.like_count || 0), 0)
                    .toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Artikel durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                Alle ({allArticles.length})
              </TabsTrigger>
              <TabsTrigger value="published">
                Veröffentlicht ({allArticles.filter((a) => a.status === 'published').length})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Entwürfe ({allArticles.filter((a) => a.status === 'draft').length})
              </TabsTrigger>
              <TabsTrigger value="archived">
                Archiviert ({allArticles.filter((a) => a.status === 'archived').length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Articles Table */}
          {articles.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Keine Artikel gefunden</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || activeTab !== 'all'
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
                    {articles.map((article) => (
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
                          <Badge variant="outline">{article.category || 'Allgemein'}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            {(article.view_count || 0).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Heart className="h-4 w-4 text-muted-foreground" />
                            {(article.like_count || 0).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            {article.comment_count || 0}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {article.published_at
                            ? format(new Date(article.published_at), 'dd.MM.yyyy', {
                                locale: de,
                              })
                            : format(new Date(article.updated_at || article.created_at || ''), 'dd.MM.yyyy', {
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
                              disabled={deleteMutation.isPending}
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
