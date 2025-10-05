import { createClient } from '@/lib/supabase/client';
import type { Message, MessageUpdate, Conversation } from '@/types/database';

export const messagingService = {
  async createConversation(
    participant1Id: string,
    participant2Id: string
  ): Promise<Conversation> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        participant1_id: participant1Id,
        participant2_id: participant2Id,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create conversation: ${error.message}`);
    }

    return data;
  },

  async getConversation(id: string): Promise<Conversation | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch conversation: ${error.message}`);
    }

    return data;
  },

  async getUserConversations(userId: string): Promise<Conversation[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
      .order('updated_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch conversations: ${error.message}`);
    }

    return data;
  },

  async sendMessage(
    conversationId: string,
    senderId: string,
    recipientId: string,
    content: string
  ): Promise<Message> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        recipient_id: recipientId,
        content,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }

    // Update conversation's updated_at
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return data;
  },

  async getMessages(
    conversationId: string,
    limit?: number,
    offset?: number
  ): Promise<Message[]> {
    const supabase = createClient();

    let query = supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.range(offset, offset + (limit ?? 50) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch messages: ${error.message}`);
    }

    return data;
  },

  async markAsRead(messageId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', messageId);

    if (error) {
      throw new Error(`Failed to mark message as read: ${error.message}`);
    }
  },

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .eq('is_read', false);

    if (error) {
      throw new Error(`Failed to mark conversation as read: ${error.message}`);
    }
  },

  async deleteMessage(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from('messages').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete message: ${error.message}`);
    }
  },

  async updateMessage(id: string, updates: MessageUpdate): Promise<Message> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('messages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update message: ${error.message}`);
    }

    return data;
  },

  async getUnreadCount(userId: string): Promise<number> {
    const supabase = createClient();

    // Count unread messages where user is recipient
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('recipient_id', userId)
      .eq('is_read', false);

    if (error) {
      throw new Error(`Failed to count unread messages: ${error.message}`);
    }

    return count ?? 0;
  },
};
