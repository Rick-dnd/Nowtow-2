'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Star, Flag, MessageSquare } from 'lucide-react';

const reviews = [
  {
    id: '1',
    rating: 5,
    customer: '@user1',
    initials: 'U1',
    date: '2 days ago',
    item: 'Summer Night Party',
    type: 'Event',
    text: 'Amazing event! Highly recommend. The atmosphere was perfect and everything was well organized.',
    reply: 'Thank you so much! 🙏',
    hasReply: true,
  },
  {
    id: '2',
    rating: 3,
    customer: '@user2',
    initials: 'U2',
    date: '1 week ago',
    item: 'Studio Mitte',
    type: 'Space',
    text: 'Good space but could be cleaner. Equipment was in great condition though.',
    reply: null,
    hasReply: false,
  },
  {
    id: '3',
    rating: 5,
    customer: '@user3',
    initials: 'U3',
    date: '2 weeks ago',
    item: 'Photography Session',
    type: 'Service',
    text: 'Professional service, will book again!',
    reply: 'Thank you! Looking forward to our next session.',
    hasReply: true,
  },
];

export default function ReviewsPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
        <p className="text-muted-foreground mt-1">Manage customer feedback</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Rating</CardTitle>
            <CardDescription>Average rating from all reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold">4.8</div>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on 234 reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Breakdown</CardTitle>
            <CardDescription>Distribution of ratings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <span className="text-sm w-8">{stars}★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${stars === 5 ? 75 : stars === 4 ? 15 : stars === 3 ? 7 : 2}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12">
                  {stars === 5 ? '75%' : stars === 4 ? '15%' : stars === 3 ? '7%' : '2%'}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Latest customer feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-4 pb-6 border-b last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{review.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.customer}</span>
                      <span className="text-sm text-muted-foreground">• {review.date}</span>
                      <Badge variant="outline">{review.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.item}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <p className="text-sm">{review.text}</p>

              {review.hasReply && review.reply && (
                <div className="ml-10 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Your Reply:</p>
                  <p className="text-sm">{review.reply}</p>
                </div>
              )}

              {!review.hasReply && (
                <div className="ml-10 space-y-2">
                  <Textarea placeholder="Write a reply..." className="text-sm" />
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-emerald-600">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
