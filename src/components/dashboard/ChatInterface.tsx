'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, Smile, Send, Check, CheckCheck, Search, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar: string | null;
  content: string;
  created_at: string;
  is_read: boolean;
  is_own: boolean;
}

interface Conversation {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  is_online: boolean;
}

interface ChatInterfaceProps {
  conversations: Conversation[];
  currentUserId: string;
  onSendMessage?: (conversationId: string, message: string) => void;
}

export function ChatInterface({
  conversations,
  currentUserId,
  onSendMessage,
}: ChatInterfaceProps): React.ReactElement {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    conversations[0]?.id ?? null
  );
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock messages for demo
  useEffect(() => {
    if (selectedConversation) {
      setMessages([
        {
          id: '1',
          sender_id: 'other-user',
          sender_name: 'John Doe',
          sender_avatar: null,
          content: 'Hi, I want to book your photography studio for October 15th',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          is_read: true,
          is_own: false,
        },
        {
          id: '2',
          sender_id: currentUserId,
          sender_name: 'You',
          sender_avatar: null,
          content: 'Sure! Which time slot are you interested in?',
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          is_read: true,
          is_own: true,
        },
        {
          id: '3',
          sender_id: 'other-user',
          sender_name: 'John Doe',
          sender_avatar: null,
          content: 'From 2 PM to 6 PM would be perfect',
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          is_read: true,
          is_own: false,
        },
      ]);
    }
  }, [selectedConversation, currentUserId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (): void => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender_id: currentUserId,
      sender_name: 'You',
      sender_avatar: null,
      content: messageInput,
      created_at: new Date().toISOString(),
      is_read: false,
      is_own: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');

    if (onSendMessage) {
      onSendMessage(selectedConversation, messageInput);
    }
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="flex h-[calc(100vh-200px)] border rounded-lg overflow-hidden bg-background">
      {/* Conversations List */}
      <div className="w-80 border-r flex flex-col">
        {/* Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
              aria-label="Search conversations"
            />
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={cn(
                  'w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left',
                  selectedConversation === conv.id && 'bg-muted'
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conv.user_avatar ?? undefined} alt={conv.user_name} />
                    <AvatarFallback>{conv.user_name[0]?.toUpperCase() ?? 'U'}</AvatarFallback>
                  </Avatar>
                  {conv.is_online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm truncate">{conv.user_name}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTime(conv.last_message_time)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.last_message}</p>
                </div>

                {conv.unread_count > 0 && (
                  <div className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-semibold min-w-[20px] text-center">
                    {conv.unread_count}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConv.user_avatar ?? undefined}
                      alt={selectedConv.user_name}
                    />
                    <AvatarFallback>
                      {selectedConv.user_name[0]?.toUpperCase() ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConv.is_online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConv.user_name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedConv.is_online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>

              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.is_own && 'flex-row-reverse'
                    )}
                  >
                    {!message.is_own && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={message.sender_avatar ?? undefined}
                          alt={message.sender_name}
                        />
                        <AvatarFallback>
                          {message.sender_name[0]?.toUpperCase() ?? 'U'}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={cn('flex flex-col', message.is_own && 'items-end')}>
                      <div
                        className={cn(
                          'rounded-2xl px-4 py-2 max-w-md',
                          message.is_own
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-1 px-1">
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {message.is_own && (
                          <span className="text-muted-foreground">
                            {message.is_read ? (
                              <CheckCheck className="h-3 w-3 text-blue-500" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-75" />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-150" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Smile className="h-4 w-4" />
                </Button>

                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                  aria-label="Message input"
                />

                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
