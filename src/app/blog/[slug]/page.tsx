'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Heart,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareSidebar } from '@/components/blog/ShareSidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  useBlogPost,
  useBlogComments,
  useLikeBlogPost,
  useUnlikeBlogPost,
  useBookmarkBlogPost,
  useUnbookmarkBlogPost,
  useCreateBlogComment,
  useBlogPosts,
} from '@/hooks/useBlog';
import { useLikeStatus, useBookmarkStatus } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export default function BlogArticlePage(): React.ReactElement {
  const params = useParams();
  const slug = params.slug as string;
  const { user } = useAuth();

  // Load blog post from database
  const { data: post, isLoading: postLoading, error: postError } = useBlogPost(slug);

  // Load comments
  const { data: comments, isLoading: commentsLoading } = useBlogComments(post?.id);

  // Load like and bookmark status
  const { data: isLiked } = useLikeStatus(user?.id, post?.id);
  const { data: isBookmarked } = useBookmarkStatus(user?.id, post?.id);

  // Load related articles (same category)
  const { data: relatedPosts } = useBlogPosts({
    categoryId: post?.category ?? undefined,
    limit: 3,
  });

  // Mutations
  const likeMutation = useLikeBlogPost();
  const unlikeMutation = useUnlikeBlogPost();
  const bookmarkMutation = useBookmarkBlogPost();
  const unbookmarkMutation = useUnbookmarkBlogPost();
  const createCommentMutation = useCreateBlogComment();

  // Comment form state
  const [commentText, setCommentText] = React.useState('');

  // Calculate reading time
  const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Gerade eben';
    const date = new Date(dateString);
    return format(date, 'd. MMMM yyyy', { locale: de });
  };

  // Handle like/unlike
  const handleLike = (): void => {
    if (!user) {
      toast.error('Bitte melde dich an, um Artikel zu liken');
      return;
    }
    if (!post) return;

    if (isLiked) {
      unlikeMutation.mutate(
        { postId: post.id, userId: user.id },
        {
          onError: () => {
            toast.error('Fehler beim Entfernen des Likes');
          },
        }
      );
    } else {
      likeMutation.mutate(
        { postId: post.id, userId: user.id },
        {
          onError: () => {
            toast.error('Fehler beim Liken des Artikels');
          },
        }
      );
    }
  };

  // Handle bookmark/unbookmark
  const handleBookmark = (): void => {
    if (!user) {
      toast.error('Bitte melde dich an, um Artikel zu speichern');
      return;
    }
    if (!post) return;

    if (isBookmarked) {
      unbookmarkMutation.mutate(
        { postId: post.id, userId: user.id },
        {
          onSuccess: () => {
            toast.success('Artikel aus Lesezeichen entfernt');
          },
          onError: () => {
            toast.error('Fehler beim Entfernen aus Lesezeichen');
          },
        }
      );
    } else {
      bookmarkMutation.mutate(
        { postId: post.id, userId: user.id },
        {
          onSuccess: () => {
            toast.success('Artikel zu Lesezeichen hinzugefügt');
          },
          onError: () => {
            toast.error('Fehler beim Speichern');
          },
        }
      );
    }
  };

  // Handle share
  const handleShare = async (platform: string): Promise<void> => {
    const url = window.location.href;
    const title = post?.title ?? '';

    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      toast.success('Link kopiert!');
      return;
    }

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Handle comment submission
  const handleCommentSubmit = (): void => {
    if (!user) {
      toast.error('Bitte melde dich an, um zu kommentieren');
      return;
    }
    if (!post) return;
    if (!commentText.trim()) {
      toast.error('Bitte gib einen Kommentar ein');
      return;
    }

    createCommentMutation.mutate(
      {
        postId: post.id,
        authorId: user.id,
        content: commentText,
      },
      {
        onSuccess: () => {
          toast.success('Kommentar hinzugefügt');
          setCommentText('');
        },
        onError: () => {
          toast.error('Fehler beim Hinzufügen des Kommentars');
        },
      }
    );
  };

  if (postLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-destructive">Fehler beim Laden des Artikels</p>
        {postError && (
          <p className="text-sm text-muted-foreground">{postError.message}</p>
        )}
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zum Blog
          </Link>
        </Button>
      </div>
    );
  }

  const relatedArticles = (relatedPosts || [])
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {post.category && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {post.category}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Image */}
        {post.featured_image ? (
          <div className="w-full h-[400px] relative">
            <Image
              src={post.featured_image}
              alt={post.title ?? ''}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Calendar className="h-32 w-32 text-primary/40" />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Share Sidebar (Left) - Hidden on mobile */}
            <aside className="hidden lg:block lg:col-span-1">
              <ShareSidebar
                title={post.title ?? ''}
                likes={post.likes_count ?? 0}
                isLiked={isLiked ?? false}
                isSaved={isBookmarked ?? false}
                onLike={handleLike}
                onSave={handleBookmark}
              />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Article Header */}
              <div className="space-y-4">
                {post.category && (
                  <Badge variant="secondary">{post.category}</Badge>
                )}
                <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {post.author && (
                    <Link
                      href={`/blog/author/${post.author.username ?? post.author_id}`}
                      className="flex items-center space-x-2 hover:text-primary"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.author.avatar_url ?? undefined} />
                        <AvatarFallback>
                          {post.author.username?.[0]?.toUpperCase() ?? 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <span>{post.author.full_name || post.author.username}</span>
                    </Link>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{calculateReadingTime(post.content ?? '')} Lesezeit</span>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Engagement Bar */}
                <div className="flex items-center justify-between py-4 border-y">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      disabled={likeMutation.isPending || unlikeMutation.isPending}
                      className={isLiked ? 'text-destructive' : ''}
                    >
                      <Heart
                        className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`}
                      />
                      {post.likes_count ?? 0}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {post.comments_count ?? 0}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBookmark}
                      disabled={
                        bookmarkMutation.isPending || unbookmarkMutation.isPending
                      }
                    >
                      <Bookmark
                        className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`}
                      />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <div className="text-xl text-muted-foreground italic border-l-4 border-primary pl-4">
                  {post.excerpt}
                </div>
              )}

              {/* Article Body */}
              <div className="prose prose-lg max-w-none blog-content">
                {(post.content ?? '').split('\n\n').map((paragraph, index) => {
                  const generateId = (text: string): string => {
                    return text
                      .toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                      .trim();
                  };

                  if (paragraph.startsWith('### ')) {
                    const text = paragraph.replace('### ', '');
                    return (
                      <h3
                        key={index}
                        id={generateId(text)}
                        className="text-xl font-bold mt-6 mb-3"
                      >
                        {text}
                      </h3>
                    );
                  } else if (paragraph.startsWith('## ')) {
                    const text = paragraph.replace('## ', '');
                    return (
                      <h2
                        key={index}
                        id={generateId(text)}
                        className="text-2xl font-bold mt-8 mb-4"
                      >
                        {text}
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
              {post.author && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={post.author.avatar_url ?? undefined} />
                        <AvatarFallback>
                          {post.author.username?.[0]?.toUpperCase() ?? 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-bold text-lg">
                          {post.author.full_name || post.author.username}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Autor auf Nowtown
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/blog/author/${post.author.username ?? post.author_id}`}
                          >
                            Alle Artikel von{' '}
                            {((post.author.full_name || post.author.username) ?? '')
                              .split(' ')[0]}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Share Section */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">Artikel teilen</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      onClick={() => void handleShare('facebook')}
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => void handleShare('twitter')}
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => void handleShare('linkedin')}
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => void handleShare('copy')}
                    >
                      <Link2 className="mr-2 h-4 w-4" />
                      Link kopieren
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">
                    Kommentare ({post.comments_count ?? 0})
                  </h3>

                  {/* New Comment Form */}
                  {user ? (
                    <div className="mb-6 space-y-3">
                      <Textarea
                        placeholder="Schreibe einen Kommentar..."
                        value={commentText}
                        onChange={(e): void => setCommentText(e.target.value)}
                        rows={3}
                      />
                      <Button
                        onClick={handleCommentSubmit}
                        disabled={createCommentMutation.isPending || !commentText.trim()}
                      >
                        {createCommentMutation.isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Kommentar hinzufügen
                      </Button>
                    </div>
                  ) : (
                    <div className="mb-6 p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        Bitte melde dich an, um zu kommentieren
                      </p>
                    </div>
                  )}

                  {/* Comments List */}
                  {commentsLoading ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : !comments || comments.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      Noch keine Kommentare. Sei der Erste!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={comment.author?.avatar_url ?? undefined}
                              />
                              <AvatarFallback>
                                {comment.author?.username?.[0]?.toUpperCase() ?? 'A'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm">
                                {comment.author?.full_name ||
                                  comment.author?.username ||
                                  'Unbekannt'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(comment.created_at)}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar (ToC + Related) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Table of Contents */}
              <TableOfContents />

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="font-bold">Ähnliche Artikel</h3>
                    {relatedArticles.map((related) => (
                      <Link key={related.id} href={`/blog/${related.id}`}>
                        <div className="space-y-2 pb-4 border-b last:border-b-0 last:pb-0 hover:opacity-75 transition-opacity">
                          {related.featured_image ? (
                            <div className="aspect-video relative rounded-lg overflow-hidden">
                              <Image
                                src={related.featured_image}
                                alt={related.title ?? ''}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 300px"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg" />
                          )}
                          <h4 className="font-semibold text-sm line-clamp-2">
                            {related.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {related.author?.full_name ||
                                related.author?.username ||
                                'Unbekannt'}
                            </span>
                            <span>
                              {calculateReadingTime(related.content ?? '')}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}

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
