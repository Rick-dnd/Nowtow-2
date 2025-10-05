import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { messagingService } from '@/services/messaging.service';
import type { Message, MessageUpdate, Conversation } from '@/types/database';

export function useConversations(userId: string | undefined): UseQueryResult<Conversation[], Error> {
  return useQuery({
    queryKey: ['conversations', userId],
    queryFn: (): Promise<Conversation[]> => {
      if (!userId) return Promise.resolve([]);
      return messagingService.getUserConversations(userId);
    },
    enabled: !!userId,
  });
}

export function useConversation(id: string | undefined): UseQueryResult<Conversation | null, Error> {
  return useQuery({
    queryKey: ['conversations', id],
    queryFn: (): Promise<Conversation | null> => {
      if (!id) return Promise.resolve(null);
      return messagingService.getConversation(id);
    },
    enabled: !!id,
  });
}

export function useMessages(
  conversationId: string | undefined,
  limit?: number
): UseQueryResult<Message[], Error> {
  return useQuery({
    queryKey: ['messages', conversationId, limit],
    queryFn: (): Promise<Message[]> => {
      if (!conversationId) return Promise.resolve([]);
      return messagingService.getMessages(conversationId, limit);
    },
    enabled: !!conversationId,
  });
}

export function useUnreadCount(userId: string | undefined): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: ['messages', 'unread', userId],
    queryFn: (): Promise<number> => {
      if (!userId) return Promise.resolve(0);
      return messagingService.getUnreadCount(userId);
    },
    enabled: !!userId,
  });
}

export function useCreateConversation(): UseMutationResult<Conversation, Error, { participant1Id: string; participant2Id: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ participant1Id, participant2Id }: { participant1Id: string; participant2Id: string }): Promise<Conversation> =>
      messagingService.createConversation(participant1Id, participant2Id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useSendMessage(): UseMutationResult<Message, Error, { conversationId: string; senderId: string; recipientId: string; content: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, senderId, recipientId, content }: { conversationId: string; senderId: string; recipientId: string; content: string }): Promise<Message> =>
      messagingService.sendMessage(conversationId, senderId, recipientId, content),
    onSuccess: (_, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useMarkAsRead(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string): Promise<void> => messagingService.markAsRead(messageId),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useMarkConversationAsRead(): UseMutationResult<void, Error, { conversationId: string; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, userId }: { conversationId: string; userId: string }): Promise<void> =>
      messagingService.markConversationAsRead(conversationId, userId),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useUpdateMessage(): UseMutationResult<Message, Error, { id: string; updates: MessageUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: MessageUpdate }): Promise<Message> =>
      messagingService.updateMessage(id, updates),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

export function useDeleteMessage(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => messagingService.deleteMessage(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}
