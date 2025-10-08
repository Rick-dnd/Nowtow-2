'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Smile, Paperclip, Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useAuth';
import { useConversations, useMessages, useSendMessage } from '@/hooks/useMessaging';
import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';

export default function MessagesPage(): React.ReactElement {
  const { data: user } = useUser();
  const { data: conversations, isLoading: conversationsLoading } = useConversations(user?.id);
  const [selectedConvId, setSelectedConvId] = useState<string | undefined>(undefined);
  const { data: messages, isLoading: messagesLoading } = useMessages(selectedConvId);
  const sendMessage = useSendMessage();
  const [messageInput, setMessageInput] = useState('');

  const selectedConv = conversations?.find(c => c.id === selectedConvId);

  const handleSendMessage = async (): Promise<void> => {
    if (!messageInput.trim() || !selectedConvId || !user || !selectedConv) return;

    try {
      const recipientId = selectedConv.participant1_id === user.id
        ? selectedConv.participant2_id
        : selectedConv.participant1_id;

      await sendMessage.mutateAsync({
        conversationId: selectedConvId,
        senderId: user.id,
        recipientId: recipientId || '',
        content: messageInput,
      });
      setMessageInput('');
    } catch (error) {
      toast.error('Fehler beim Senden der Nachricht');
      console.error(error);
    }
  };

  if (conversationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Nachrichten</h1>
        <p className="text-muted-foreground mt-1">Kommuniziere mit deinen Kunden</p>
      </div>

      <Card className="h-[600px]">
        <div className="grid grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="border-r">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Konversationen</h3>
            </div>
            <ScrollArea className="h-[calc(600px-60px)]">
              {!conversations || conversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  Keine Konversationen
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`w-full p-4 flex items-start space-x-3 hover:bg-accent transition-colors ${
                      selectedConvId === conv.id ? 'bg-accent' : ''
                    }`}
                  >
                    <Avatar>
                      <AvatarFallback>
                        {conv.participant1_id?.slice(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Konversation</span>
                        <span className="text-xs text-muted-foreground">
                          {conv.updated_at && format(parseISO(conv.updated_at), 'HH:mm', { locale: de })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        Konversation vom {conv.created_at && format(parseISO(conv.created_at), 'dd.MM.yyyy', { locale: de })}
                      </p>
                    </div>
                    {/* Unread indicator would require additional query */}
                    <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-0" />
                  </button>
                ))
              )}
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="col-span-2 flex flex-col">
            {!selectedConv ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Wähle eine Konversation aus
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {selectedConv.participant1_id?.slice(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Konversation #{selectedConv.id.slice(0, 8)}</h3>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  {messagesLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(!messages || messages.length === 0) ? (
                        <div className="text-center text-muted-foreground">
                          Noch keine Nachrichten
                        </div>
                      ) : (
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                msg.sender_id === user?.id
                                  ? 'bg-gradient-to-r from-primary to-emerald-600 text-white'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  msg.sender_id === user?.id ? 'text-white/70' : 'text-muted-foreground'
                                }`}
                              >
                                {msg.created_at && format(parseISO(msg.created_at), 'HH:mm', { locale: de })}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
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
                    />
                    <Button
                      className="bg-gradient-to-r from-primary to-emerald-600"
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim() || sendMessage.isPending}
                    >
                      {sendMessage.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
