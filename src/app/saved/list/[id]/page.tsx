'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Settings,
  Lock,
  Globe,
  Plus,
  Bookmark,
  Calendar,
  Building2,
  Briefcase,
  MoreVertical
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const listData = {
  '1': {
    name: 'München Summer Events 2025',
    description: 'Meine Lieblings-Events für den Sommer in München',
    isPrivate: false,
    itemCount: 12,
  },
  '2': {
    name: 'Coworking Spaces',
    description: 'Beste Spaces zum Arbeiten in München',
    isPrivate: true,
    itemCount: 8,
  },
  '3': {
    name: 'Yoga & Wellness',
    description: 'Entspannung und Achtsamkeit',
    isPrivate: false,
    itemCount: 15,
  },
};

const savedItems = [
  {
    id: '1',
    type: 'event',
    title: 'Yoga im Englischen Garten',
    subtitle: '15. Juni 2025',
    price: '€15',
    icon: Calendar,
  },
  {
    id: '2',
    type: 'space',
    title: 'CoWork München Zentrum',
    subtitle: 'Sendlinger Str. 42',
    price: '€25/Tag',
    icon: Building2,
  },
  {
    id: '3',
    type: 'event',
    title: 'Street Food Festival',
    subtitle: '20. Juni 2025',
    price: 'Kostenlos',
    icon: Calendar,
  },
  {
    id: '4',
    type: 'service',
    title: 'Personal Yoga Coach',
    subtitle: 'Lisa M.',
    price: '€50/Std',
    icon: Briefcase,
  },
];

export default function SavedListDetailPage(): React.ReactElement {
  const params = useParams();
  const listId = params.id as string;
  const list = listData[listId as keyof typeof listData] || listData['1'];

  const [items, setItems] = useState(savedItems);

  const handleRemoveItem = (itemId: string): void => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-8">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link href="/saved">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zu Gespeicherten Items
          </Link>
        </Button>

        {/* List Header */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold">{list.name}</h1>
                  <Badge variant={list.isPrivate ? 'secondary' : 'outline'}>
                    {list.isPrivate ? (
                      <><Lock className="mr-1 h-3 w-3" /> Privat</>
                    ) : (
                      <><Globe className="mr-1 h-3 w-3" /> Öffentlich</>
                    )}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{list.description}</p>
                <p className="text-sm text-muted-foreground">{list.itemCount} gespeicherte Items</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Items hinzufügen
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Gespeicherte Items</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Bookmark className="h-4 w-4 fill-current" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRemoveItem(item.id)}>
                          Aus Liste entfernen
                        </DropdownMenuItem>
                        <DropdownMenuItem>Zu anderer Liste hinzufügen</DropdownMenuItem>
                        <DropdownMenuItem>Teilen</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <item.icon className="h-16 w-16 text-primary/40" />
                  </div>
                </div>
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {item.type === 'event' ? 'Event' : item.type === 'space' ? 'Space' : 'Service'}
                    </Badge>
                  </div>
                  <h3 className="font-bold line-clamp-2">{item.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{item.subtitle}</span>
                    <span className="font-semibold text-primary">{item.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <Bookmark className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Keine Items in dieser Liste</h3>
                <p className="text-muted-foreground">
                  Füge Events, Spaces oder Services zu dieser Liste hinzu
                </p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <Plus className="mr-2 h-4 w-4" />
                Items hinzufügen
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
