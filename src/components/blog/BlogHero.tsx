'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Heart, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SubscriptionBadge } from '@/components/ui/subscription-badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { BlogPostWithAuthor } from '@/services/blog.service';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

interface BlogHeroProps {
  featuredPosts: BlogPostWithAuthor[];
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'Gerade eben';
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function BlogHero({ featuredPosts }: BlogHeroProps): React.ReactElement {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  if (!featuredPosts || featuredPosts.length === 0) {
    return <div />;
  }

  return (
    <section className="relative h-[600px] bg-gradient-to-br from-background via-muted/30 to-background">
      <Carousel
        plugins={[plugin.current]}
        className="h-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent className="h-full">
          {featuredPosts.map((post) => (
            <CarouselItem key={post.id} className="relative h-full">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                {post.featured_image ? (
                  <>
                    <Image
                      src={post.featured_image}
                      alt={post.title ?? ''}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-emerald-500/20 to-teal-500/20" />
                )}
              </div>

              {/* Content */}
              <div className="container mx-auto px-4 h-full relative z-10">
                <div className="flex flex-col justify-end h-full pb-16 max-w-3xl">
                  {post.category && (
                    <Badge className="w-fit mb-4 bg-white/90 text-primary hover:bg-white">
                      {post.category}
                    </Badge>
                  )}

                  <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                    {post.title}
                  </h1>

                  <p className="text-lg md:text-xl text-white/90 mb-6 line-clamp-2">
                    {post.excerpt || (post.content ?? '').substring(0, 200) + '...'}
                  </p>

                  {/* Author & Meta */}
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-12 h-12 border-2 border-white/20">
                      <AvatarImage
                        src={post.author?.avatar_url ?? undefined}
                        alt={post.author?.username ?? 'Author'}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white font-semibold">
                        {post.author?.username?.[0]?.toUpperCase() ?? 'A'}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">
                          {post.author?.full_name || `@${post.author?.username ?? 'unknown'}`}
                        </span>
                        {post.author?.subscription_tier && (
                          <SubscriptionBadge
                            tier={post.author.subscription_tier as 'free' | 'plus' | 'premium'}
                            size="sm"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/70">
                        <span>{formatDate(post.created_at)}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{calculateReadingTime(post.content ?? '')}</span>
                        </div>
                        {(post.likes_count !== null && post.likes_count !== undefined && post.likes_count > 0) && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes_count}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div>
                    <Button asChild size="lg" className="rounded-full">
                      <Link href={`/blog/${post.id}`}>
                        Artikel lesen
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {featuredPosts.length > 1 && (
          <>
            <CarouselPrevious className="left-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
            <CarouselNext className="right-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
          </>
        )}
      </Carousel>
    </section>
  );
}
