'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, Globe, Flag, Trash2, Edit, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SubscriptionBadge } from '@/components/ui/subscription-badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { usePostWithDetails, useComments, useLikePost, useUnlikePost, useCheckUserLikedPost, useCreateComment, useDeleteComment, useDeletePost } from '@/hooks/useCommunity';
import { useUser } from '@/hooks/useAuth';
import { CommentThread, type Comment } from '@/components/community/CommentThread';
import { PollDisplay, type PollDisplayData } from '@/components/community/PollDisplay';
import { Header } from '@/components/layout/Header';
import { CommunitySidebar } from '@/components/community/CommunitySidebar';
import { PostDetailSidebar } from '@/components/community/PostDetailSidebar';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useVotePoll } from '@/hooks/useCommunity';

export default function PostDetailPage(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string | undefined;

  const { data: user } = useUser();
  const { data: post, isLoading, error } = usePostWithDetails(postId, user?.id);
  const { data: commentsData, isLoading: commentsLoading } = useComments(postId);
  const { data: userLikedPost } = useCheckUserLikedPost(postId, user?.id);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();
  const createCommentMutation = useCreateComment();
  const deleteCommentMutation = useDeleteComment();
  const votePollMutation = useVotePoll();
  const deletePostMutation = useDeletePost();

  // Update like state
  useEffect((): void => {
    if (userLikedPost !== undefined) {
      setIsLiked(userLikedPost);
    }
  }, [userLikedPost]);

  useEffect((): void => {
    if (post?.likes_count !== undefined && post?.likes_count !== null) {
      setLikeCount(post.likes_count);
    }
  }, [post?.likes_count]);

  const handleLike = (): void => {
    if (!user || !postId) {
      toast.error('Bitte melde dich an, um Posts zu liken');
      return;
    }

    if (isLiked) {
      unlikeMutation.mutate(
        { postId, userId: user.id },
        {
          onSuccess: (): void => {
            setIsLiked(false);
            setLikeCount((prev) => prev - 1);
          },
        }
      );
    } else {
      likeMutation.mutate(
        { postId, userId: user.id },
        {
          onSuccess: (): void => {
            setIsLiked(true);
            setLikeCount((prev) => prev + 1);
          },
        }
      );
    }
  };

  const handleShare = (): void => {
    if (!postId) return;

    const url = `${window.location.origin}/community/post/${postId}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'Post teilen',
          text: post?.content ?? '',
          url: url,
        })
        .catch(() => {
          navigator.clipboard.writeText(url);
          toast.success('Link kopiert!');
        });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link kopiert!');
    }
  };

  const handleAddComment = (commentPostId: string, content: string): void => {
    if (!user) {
      toast.error('Bitte melde dich an, um zu kommentieren');
      return;
    }

    createCommentMutation.mutate(
      { postId: commentPostId, authorId: user.id, content },
      {
        onSuccess: (): void => {
          toast.success('Kommentar erstellt!');
        },
        onError: (err: Error): void => {
          toast.error(`Fehler: ${err.message}`);
        },
      }
    );
  };

  const handleDeleteComment = (commentId: string): void => {
    if (!user || !postId) {
      toast.error('Bitte melde dich an');
      return;
    }

    deleteCommentMutation.mutate(
      { commentId, postId },
      {
        onSuccess: (): void => {
          toast.success('Kommentar gelöscht');
        },
        onError: (err: Error): void => {
          toast.error(`Fehler: ${err.message}`);
        },
      }
    );
  };

  const handleReply = (): void => {
    toast.info('Antwort-Funktion kommt bald');
  };

  const handleLikeComment = (): void => {
    toast.info('Kommentar-Like kommt bald');
  };

  const handleReportComment = (): void => {
    toast.info('Kommentar-Meldung kommt bald');
  };

  const handleVotePoll = (optionIndices: number[]): void => {
    if (!user || !postId) {
      toast.error('Bitte melde dich an, um abzustimmen');
      return;
    }

    // Vote on first selected option (for now, multi-select support can be added later)
    const optionIndex = optionIndices[0];
    if (optionIndex === undefined) return;

    votePollMutation.mutate(
      { postId, optionIndex, userId: user.id },
      {
        onSuccess: (): void => {
          toast.success('Stimme abgegeben!');
        },
        onError: (err: Error): void => {
          if (err.message.includes('bereits abgestimmt')) {
            toast.error('Du hast bereits abgestimmt!');
          } else {
            toast.error(`Fehler: ${err.message}`);
          }
        },
      }
    );
  };

  const handleDeletePost = (): void => {
    setShowDeleteDialog(true);
  };

  const confirmDeletePost = (): void => {
    if (!postId) return;

    deletePostMutation.mutate(postId, {
      onSuccess: (): void => {
        toast.success('Post gelöscht!');
        router.push('/community');
      },
      onError: (err: Error): void => {
        toast.error(`Fehler beim Löschen: ${err.message}`);
        setShowDeleteDialog(false);
      },
    });
  };

  const handleCopyLink = (): void => {
    if (!postId) return;
    const url = `${window.location.origin}/community/post/${postId}`;
    navigator.clipboard.writeText(url);
    toast.success('Link kopiert!');
  };

  const handleReport = (): void => {
    toast.info('Melde-Funktion kommt bald');
  };

  // Transform database comments to CommentThread format
  const transformedComments: Comment[] = (commentsData || []).map((comment) => ({
    id: comment.id,
    author: {
      id: comment.author?.id ?? comment.author_id,
      username: comment.author?.username ?? comment.author?.full_name ?? 'Unbekannt',
      avatar: comment.author?.avatar_url ?? null,
      subscription_tier: (comment.author?.subscription_tier ?? 'free') as 'free' | 'plus' | 'premium',
    },
    content: comment.content,
    created_at: comment.created_at ?? new Date().toISOString(),
    likes: 0,
    hasLiked: false,
    parent_id: null,
    replies: [],
  }));

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Sidebar */}
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-20">
                  <CommunitySidebar />
                </div>
              </aside>

              {/* Center Content */}
              <div className="lg:col-span-6">
                <Skeleton className="h-10 w-32 mb-6" />
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-3 mb-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-24 w-full mb-4" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-20" />
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-20">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
              </aside>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Post nicht gefunden</h1>
            <p className="text-muted-foreground mb-4">
              Dieser Post existiert nicht oder wurde gelöscht.
            </p>
            <Button onClick={(): void => router.push('/community')}>
              Zurück zur Community
            </Button>
          </div>
        </main>
      </>
    );
  }

  // Format timestamp
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Gerade eben';
    if (diffMins < 60) return `vor ${diffMins}m`;
    if (diffHours < 24) return `vor ${diffHours}h`;
    if (diffDays < 7) return `vor ${diffDays}d`;
    return date.toLocaleDateString('de-DE');
  };

  // Transform poll data if exists - check if poll_data is valid
  // Poll data is now enriched in the service layer
  const pollData = post.poll_data as unknown as PollDisplayData | undefined;

  // Check if user is owner/author
  const isOwner = user?.id === post.author_id;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20">
                <CommunitySidebar />
              </div>
            </aside>

            {/* Center Content */}
            <div className="lg:col-span-6">
              {/* Back Button */}
              <Button
                variant="ghost"
                className="mb-6 -ml-2"
                onClick={(): void => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>

              {/* Post Card */}
              <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
          {/* Post Header */}
          <div className="flex items-start gap-3 mb-4">
            <Avatar className="w-12 h-12 flex-shrink-0">
              {post.author?.avatar_url && (
                <AvatarImage
                  src={post.author.avatar_url}
                  alt={post.author.username ?? 'User'}
                />
              )}
              <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white font-semibold">
                {post.author?.username?.[0]?.toUpperCase() ?? 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold">
                    @{post.author?.username ?? 'Unbekannt'}
                  </p>
                  {post.author?.subscription_tier && (
                    <SubscriptionBadge tier={post.author.subscription_tier as 'free' | 'plus' | 'premium'} size="sm" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(post.created_at ?? '')}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Globe className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground capitalize">
                  Öffentlich
                </span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isOwner ? (
                  <>
                    <DropdownMenuItem onClick={(): void => {
                      toast.info('Bearbeiten kommt bald');
                    }}>
                      <Edit className="h-4 w-4 mr-2" />
                      Post bearbeiten
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={handleDeletePost}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Post löschen
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleCopyLink}>
                      <Link2 className="h-4 w-4 mr-2" />
                      Link kopieren
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={handleReport}>
                      <Flag className="h-4 w-4 mr-2" />
                      Melden
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Poll (if exists) */}
          {pollData && (
            <div className="mb-4">
              <PollDisplay pollData={pollData} onVote={handleVotePoll} />
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center gap-2 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={handleLike}
            >
              <Heart
                className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
              />
              <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments_count ?? 0}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
              <span>Teilen</span>
            </Button>
          </div>
        </div>

              {/* Comments Section */}
              <div className="bg-card rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                  Kommentare ({post.comments_count ?? 0})
                </h2>
                {commentsLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : (
                  <CommentThread
                    postId={postId ?? ''}
                    comments={transformedComments}
                    onAddComment={handleAddComment}
                    onReply={handleReply}
                    onLike={handleLikeComment}
                    onReport={handleReportComment}
                    onDelete={handleDeleteComment}
                    currentUserId={user?.id}
                  />
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20">
                <PostDetailSidebar
                  currentPostId={postId ?? ''}
                  communityId={post.community_id}
                  authorId={post.author_id}
                  authorUsername={post.author?.username}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Post löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Möchtest du diesen Post wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeletePost}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
