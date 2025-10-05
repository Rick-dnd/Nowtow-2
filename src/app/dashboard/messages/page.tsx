'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Smile, Paperclip } from 'lucide-react';

const conversations = [
  {
    id: '1',
    name: '@user1',
    initials: 'U1',
    lastMessage: 'Hi, I want to book your space...',
    time: '2h ago',
    unread: true,
  },
  {
    id: '2',
    name: '@user2',
    initials: 'U2',
    lastMessage: 'Thanks for the confirmation!',
    time: '1d ago',
    unread: false,
  },
];

const messages = [
  {
    id: '1',
    sender: 'user',
    text: 'Hi, I want to book your Fotostudio for next week.',
    time: '10:30',
  },
  {
    id: '2',
    sender: 'me',
    text: 'Sure! Which date would you prefer?',
    time: '10:32',
  },
  {
    id: '3',
    sender: 'user',
    text: 'October 15th would be perfect.',
    time: '10:35',
  },
];

export default function MessagesPage(): React.ReactElement {
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">Communicate with your customers</p>
      </div>

      <Card className="h-[600px]">
        <div className="grid grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="border-r">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Conversations</h3>
            </div>
            <ScrollArea className="h-[calc(600px-60px)]">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full p-4 flex items-start space-x-3 hover:bg-accent transition-colors ${
                    selectedConv?.id === conv.id ? 'bg-accent' : ''
                  }`}
                >
                  <Avatar>
                    <AvatarFallback>{conv.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{conv.name}</span>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  )}
                </button>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{selectedConv?.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedConv?.name}</h3>
                  <p className="text-xs text-muted-foreground">Active now</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        msg.sender === 'me'
                          ? 'bg-gradient-to-r from-primary to-emerald-600 text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
                  className="flex-1"
                />
                <Button className="bg-gradient-to-r from-primary to-emerald-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
