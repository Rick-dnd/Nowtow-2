'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Star, Flag, MessageSquare, Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useAuth';
import { useReviews, useUpdateReview } from '@/hooks/useReviews';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';

export default function ReviewsPage(): React.ReactElement {
  const { data: user } = useUser();
  const { data: reviews, isLoading } = useReviews();
  const updateReview = useUpdateReview();
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  // Filter reviews for the current user (as the provider/host)
  const userReviews = useMemo(() => {
    if (!reviews || !user) return [];
    return reviews.filter(r => r.provider_id === user.id);
  }, [reviews, user]);

  const averageRating = useMemo(() => {
    if (!userReviews || userReviews.length === 0) return 0;
    const sum = userReviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return sum / userReviews.length;
  }, [userReviews]);

  const ratingDistribution = useMemo(() => {
    if (!userReviews) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    userReviews.forEach(r => {
      const rating = r.rating || 0;
      if (rating >= 1 && rating <= 5) {
        dist[rating as keyof typeof dist]++;
      }
    });
    return dist;
  }, [userReviews]);

  const handleReply = async (reviewId: string): Promise<void> => {
    const reply = replyText[reviewId];
    if (!reply?.trim()) return;

    try {
      await updateReview.mutateAsync({
        id: reviewId,
        updates: { response: reply },
      });
      setReplyText(prev => ({ ...prev, [reviewId]: '' }));
      toast.success('Antwort gesendet!');
    } catch (error) {
      toast.error('Fehler beim Senden der Antwort');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalReviews = userReviews?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bewertungen & Ratings</h1>
        <p className="text-muted-foreground mt-1">Verwalte Kundenfeedback</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gesamtbewertung</CardTitle>
            <CardDescription>Durchschnittliche Bewertung aller Reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${star <= averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Basierend auf {totalReviews} Bewertungen</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bewertungsverteilung</CardTitle>
            <CardDescription>Verteilung der Ratings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingDistribution[stars as keyof typeof ratingDistribution];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{stars}★</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktuelle Bewertungen</CardTitle>
          <CardDescription>Neuestes Kundenfeedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!userReviews || userReviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Noch keine Bewertungen
            </div>
          ) : (
            userReviews.map((review) => (
              <div key={review.id} className="space-y-4 pb-6 border-b last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {review.reviewer_id?.slice(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium font-mono text-sm">
                          #{review.reviewer_id?.slice(0, 8)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          • {review.created_at && formatDistanceToNow(parseISO(review.created_at), { addSuffix: true, locale: de })}
                        </span>
                        <Badge variant="outline">{review.bookable_type || 'Unbekannt'}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Bewertungs-ID: {review.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating || 0)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <p className="text-sm">{review.comment}</p>

                {review.response && (
                  <div className="ml-10 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Deine Antwort:</p>
                    <p className="text-sm">{review.response}</p>
                  </div>
                )}

                {!review.response && (
                  <div className="ml-10 space-y-2">
                    <Textarea
                      placeholder="Schreibe eine Antwort..."
                      className="text-sm"
                      value={replyText[review.id] || ''}
                      onChange={(e) => setReplyText(prev => ({ ...prev, [review.id]: e.target.value }))}
                    />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Flag className="mr-2 h-4 w-4" />
                        Melden
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-emerald-600"
                        onClick={() => handleReply(review.id)}
                        disabled={!replyText[review.id]?.trim() || updateReview.isPending}
                      >
                        {updateReview.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <MessageSquare className="mr-2 h-4 w-4" />
                        )}
                        Antworten
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
