'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bookmark,
  Calendar,
  Building2,
  Briefcase,
  MessageSquare,
  FolderOpen,
  Plus,
  Lock,
  Globe
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const savedLists = [
  {
    id: '1',
    name: 'München Summer Events 2025',
    description: 'Meine Lieblings-Events für den Sommer',
    itemCount: 12,
    isPrivate: false,
    thumbnail: '/placeholder-community.png',
  },
  {
    id: '2',
    name: 'Coworking Spaces',
    description: 'Beste Spaces zum Arbeiten',
    itemCount: 8,
    isPrivate: true,
    thumbnail: '/placeholder-community.png',
  },
  {
    id: '3',
    name: 'Yoga & Wellness',
    description: 'Entspannung und Achtsamkeit',
    itemCount: 15,
    isPrivate: false,
    thumbnail: '/placeholder-community.png',
  },
];

const savedEvents = [
  {
    id: '1',
    title: 'Yoga im Englischen Garten',
    date: '2025-06-15',
    image: '/categories/Yoga-und-Tanzraeume.jpg',
    price: '€15',
  },
  {
    id: '2',
    title: 'Street Food Festival',
    date: '2025-06-20',
    image: '/categories/spontane-treffen.jpg',
    price: 'Kostenlos',
  },
  {
    id: '3',
    title: 'Live Jazz Night',
    date: '2025-06-25',
    image: '/categories/Musik-und-Performance.jpg',
    price: '€25',
  },
];

export default function SavedPage(): React.ReactElement {
  const [activeTab, setActiveTab] = useState('lists');

  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Bookmark className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Gespeicherte Items
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Organisiere deine Lieblings-Events, Spaces und Services in Listen
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="lists" className="flex items-center space-x-2">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Listen</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="spaces" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Spaces</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Posts</span>
            </TabsTrigger>
          </TabsList>

          {/* Lists Tab */}
          <TabsContent value="lists" className="space-y-6 mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Meine Listen</h2>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <Plus className="mr-2 h-4 w-4" />
                Neue Liste erstellen
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedLists.map((list) => (
                <Link key={list.id} href={`/saved/list/${list.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FolderOpen className="h-16 w-16 text-primary/40" />
                      </div>
                      <div className="absolute top-2 right-2">
                        {list.isPrivate ? (
                          <div className="p-1.5 bg-background/80 backdrop-blur-sm rounded-full">
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ) : (
                          <div className="p-1.5 bg-background/80 backdrop-blur-sm rounded-full">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                    <CardContent className="pt-4 space-y-2">
                      <h3 className="font-bold text-lg line-clamp-1">{list.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{list.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-muted-foreground">{list.itemCount} Items</span>
                        <span className="text-xs text-muted-foreground">
                          {list.isPrivate ? 'Privat' : 'Öffentlich'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold">Gespeicherte Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative">
                      <div className="absolute top-2 right-2">
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <Bookmark className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="pt-4 space-y-2">
                      <h3 className="font-bold line-clamp-2">{event.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{event.date}</span>
                        <span className="font-semibold text-primary">{event.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="spaces" className="mt-8">
            <Card>
              <CardContent className="py-12 text-center">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Keine gespeicherten Spaces</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-8">
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Keine gespeicherten Services</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="mt-8">
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Keine gespeicherten Posts</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    <Footer />
    </>
  );
}
