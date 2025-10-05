'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, MoreHorizontal, Flag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Comment {
  id: string;
  author: {
    id: string;
    username: string;
    avatar: string | null;
  };
  content: string;
  created_at: string;
  likes: number;
  hasLiked: boolean;
  parent_id: string | null;
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, content: string) => void;
  onLike: (commentId: string) => void;
  onReport: (commentId: string) => void;
  depth?: number;
  maxDepth?: number;
}

function CommentItem({
  comment,
  onReply,
  onLike,
  onReport,
  depth = 0,
  maxDepth = 3,
}: CommentItemProps): React.ReactElement {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  const handleReplySubmit = (): void => {
    if (replyContent.trim() === '') return;
    onReply(comment.id, replyContent.trim());
    setReplyContent('');
    setIsReplying(false);
    setShowReplies(true); // Automatically show replies after submitting
  };

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(days / 365);
    return `${years}y ago`;
  };

  const canNest = depth < maxDepth;
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.author.avatar ?? undefined} alt={comment.author.username} />
          <AvatarFallback className="text-xs">
            {comment.author.username[0]?.toUpperCase() ?? 'U'}
          </AvatarFallback>
        </Avatar>

        {/* Comment Content */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">@{comment.author.username}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{getTimeAgo(comment.created_at)}</span>
          </div>

          {/* Content */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-2 gap-1.5 ${comment.hasLiked ? 'text-red-600' : ''}`}
              onClick={() => onLike(comment.id)}
            >
              <Heart className={`h-3.5 w-3.5 ${comment.hasLiked ? 'fill-red-600' : ''}`} />
              {comment.likes > 0 && <span className="text-xs">{comment.likes}</span>}
            </Button>

            {canNest && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1.5"
                onClick={() => setIsReplying(!isReplying)}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="text-xs">Reply</span>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onReport(comment.id)}>
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Reply Input */}
          {isReplying && (
            <div className="mt-2 space-y-2">
              <Textarea
                placeholder={`Reply to @${comment.author.username}...`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] text-sm"
                maxLength={1000}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleReplySubmit} disabled={replyContent.trim() === ''}>
                  Reply
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsReplying(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Show Replies Toggle */}
          {hasReplies && !showReplies && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-primary"
              onClick={() => setShowReplies(true)}
            >
              View {comment.replies?.length ?? 0} {comment.replies?.length === 1 ? 'reply' : 'replies'}
            </Button>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {hasReplies && showReplies && (
        <div className="ml-11 space-y-3 border-l-2 border-muted pl-4 mt-3">
          {comment.replies?.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onReport={onReport}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          ))}
          {showReplies && hasReplies && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-muted-foreground"
              onClick={() => setShowReplies(false)}
            >
              Hide replies
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

interface CommentThreadProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, content: string) => void;
  onReply: (commentId: string, content: string) => void;
  onLike: (commentId: string) => void;
  onReport: (commentId: string) => void;
  currentUserId?: string;
  maxDepth?: number;
}

export function CommentThread({
  comments,
  onAddComment,
  onReply,
  onLike,
  onReport,
  postId,
  maxDepth = 3,
}: CommentThreadProps): React.ReactElement {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (): void => {
    if (newComment.trim() === '') return;
    onAddComment(postId, newComment.trim());
    setNewComment('');
  };

  // Build comment tree (top-level comments with nested replies)
  const buildCommentTree = (commentsList: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    // First pass: Create a map of all comments
    commentsList.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: Build the tree
    commentsList.forEach((comment) => {
      const commentWithReplies = commentMap.get(comment.id);
      if (!commentWithReplies) return;

      if (comment.parent_id === null) {
        rootComments.push(commentWithReplies);
      } else {
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          if (!parent.replies) parent.replies = [];
          parent.replies.push(commentWithReplies);
        }
      }
    });

    return rootComments;
  };

  const rootComments = buildCommentTree(comments);

  return (
    <div className="space-y-4">
      {/* Add Comment Input */}
      <div className="space-y-2">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px]"
          maxLength={1000}
          aria-label="Add a comment"
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{newComment.length}/1000</span>
          <Button onClick={handleAddComment} disabled={newComment.trim() === ''} size="sm">
            Comment
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {rootComments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          rootComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={onReply}
              onLike={onLike}
              onReport={onReport}
              depth={0}
              maxDepth={maxDepth}
            />
          ))
        )}
      </div>
    </div>
  );
}
