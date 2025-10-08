'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Share2, MoreHorizontal, Globe, Flag, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SubscriptionBadge } from '@/components/ui/subscription-badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { PollDisplay, PollDisplayData } from './PollDisplay';
import { useLikePost, useUnlikePost, useDeletePost, useCheckUserLikedPost, useComments, useCreateComment, useDeleteComment } from '@/hooks/useCommunity';
import { useUser } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { CommentThread, type Comment } from './CommentThread';

interface PostCardProps {
  post: {
    id: string;
    author: {
      username: string;
      avatar: string | null;
      subscription_tier?: 'free' | 'plus' | 'premium';
    };
    content: string;
    images: string[];
    timestamp: string;
    likes: number;
    comments: number;
    visibility: string;
    poll?: PollDisplayData;
  };
  onVote?: (postId: string, optionIndices: number[]) => void;
}

export function PostCard({ post, onVote }: PostCardProps): React.ReactElement {
  const router = useRouter();
  const { data: user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();
  const deleteMutation = useDeletePost();
  const createCommentMutation = useCreateComment();
  const deleteCommentMutation = useDeleteComment();

  // Check if user has liked this post
  const { data: userLikedPost } = useCheckUserLikedPost(post.id, user?.id);

  // Fetch comments for this post
  const { data: commentsData, isLoading: commentsLoading } = useComments(showComments ? post.id : undefined);

  // Update isLiked state when userLikedPost data is fetched
  useEffect((): void => {
    if (userLikedPost !== undefined) {
      setIsLiked(userLikedPost);
    }
  }, [userLikedPost]);

  const handleVote = (optionIndices: number[]): void => {
    if (onVote) {
      onVote(post.id, optionIndices);
    }
  };

  const handleLike = (): void => {
    if (!user) {
      toast.error('Bitte melde dich an, um Posts zu liken');
      return;
    }

    if (isLiked) {
      unlikeMutation.mutate(
        { postId: post.id, userId: user.id },
        {
          onSuccess: (): void => {
            setIsLiked(false);
            setLikeCount((prev) => prev - 1);
          },
        }
      );
    } else {
      likeMutation.mutate(
        { postId: post.id, userId: user.id },
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
    const url = `${window.location.origin}/community/post/${post.id}`;
    navigator.clipboard.writeText(url).then(
      (): void => {
        toast.success('Link in Zwischenablage kopiert!');
      },
      (): void => {
        toast.error('Fehler beim Kopieren des Links');
      }
    );
  };

  const handleDelete = (): void => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = (): void => {
    deleteMutation.mutate(post.id, {
      onSuccess: (): void => {
        toast.success('Post gelöscht!');
        setShowDeleteDialog(false);
      },
      onError: (error: Error): void => {
        toast.error(`Fehler beim Löschen: ${error.message}`);
        setShowDeleteDialog(false);
      },
    });
  };

  const handleReport = (): void => {
    toast.info('Melde-Funktion kommt bald');
  };

  const handleAddComment = (postId: string, content: string): void => {
    if (!user) {
      toast.error('Bitte melde dich an, um zu kommentieren');
      return;
    }

    createCommentMutation.mutate(
      { postId, authorId: user.id, content },
      {
        onSuccess: (): void => {
          toast.success('Kommentar erstellt!');
        },
        onError: (error: Error): void => {
          toast.error(`Fehler: ${error.message}`);
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

  const handleDeleteComment = (commentId: string): void => {
    if (!user) {
      toast.error('Bitte melde dich an');
      return;
    }

    deleteCommentMutation.mutate(
      { commentId, postId: post.id },
      {
        onSuccess: (): void => {
          toast.success('Kommentar gelöscht');
        },
        onError: (error: Error): void => {
          toast.error(`Fehler: ${error.message}`);
        },
      }
    );
  };

  const handleToggleComments = (): void => {
    setShowComments(!showComments);
  };

  const handlePostClick = (): void => {
    router.push(`/community/post/${post.id}`);
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
    likes: 0, // TODO: Add comment likes count (benötigt comment_likes table)
    hasLiked: false, // TODO: Check if user liked comment
    parent_id: null, // TODO: Add parent_id support for nested comments
    replies: [],
  }));

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div
        className="flex items-start gap-3 mb-3 cursor-pointer"
        onClick={handlePostClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e): void => { if (e.key === 'Enter' || e.key === ' ') handlePostClick(); }}
      >
        <Avatar className="w-10 h-10 flex-shrink-0">
          {post.author?.avatar && (
            <AvatarImage src={post.author.avatar} alt={post.author.username} />
          )}
          <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white font-semibold">
            {post.author?.username?.[0]?.toUpperCase() ?? 'A'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-sm">@{post.author?.username}</p>
              {post.author?.subscription_tier && (
                <SubscriptionBadge tier={post.author.subscription_tier} size="sm" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <Globe className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground capitalize">{post.visibility}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e): void => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e): void => {
              e.stopPropagation();
              handleReport();
            }}>
              <Flag className="h-4 w-4 mr-2" />
              Melden
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e): void => {
              e.stopPropagation();
              handleDelete();
            }}>
              <Trash className="h-4 w-4 mr-2" />
              Löschen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Content */}
      <div className="mb-3 cursor-pointer" onClick={handlePostClick}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Poll (if exists) */}
      {post.poll && (
        <div className="mb-3">
          <PollDisplay pollData={post.poll} onVote={handleVote} />
        </div>
      )}

      {/* Post Images (if any) */}
      {post.images?.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
          {post.images?.map((_image, index) => (
            <div key={index} className="relative aspect-square bg-muted">
              {/* Image would go here */}
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 flex-1"
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          <span className="text-sm">{likeCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 flex-1" onClick={handleToggleComments}>
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{post.comments}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 flex-1"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span className="text-sm">Teilen</span>
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-border">
          {commentsLoading ? (
            <p className="text-sm text-muted-foreground text-center py-4">Lade Kommentare...</p>
          ) : (
            <CommentThread
              postId={post.id}
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
      )}

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
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
