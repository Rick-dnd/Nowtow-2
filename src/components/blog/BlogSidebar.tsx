'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  FolderOpen,
  TrendingUp,
  Bookmark,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  Search,
  PenTool,
  Edit3,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { useBlogStats, usePopularBlogPosts } from '@/hooks/useBlog';
import { useAuth } from '@/hooks/useAuth';
import { AuthorApplicationDialog } from '@/components/blog/AuthorApplicationDialog';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count?: number;
  active?: boolean;
}

function SidebarLink({
  href,
  icon: Icon,
  label,
  count,
  active = false,
}: SidebarLinkProps): React.ReactElement {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-start gap-2 hover:bg-accent/50 transition-colors',
          active && 'bg-primary text-white font-semibold border-l-2 border-primary-foreground'
        )}
      >
        <Icon className={cn('h-4 w-4', active && 'text-white')} />
        <span className="flex-1 text-left">{label}</span>
        {count !== undefined && (
          <span className={cn('text-xs', active ? 'text-white/80' : 'text-muted-foreground')}>
            {count}
          </span>
        )}
      </Button>
    </Link>
  );
}

interface BlogSidebarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function BlogSidebar({
  searchQuery = '',
  onSearchChange,
}: BlogSidebarProps): React.ReactElement {
  const pathname = usePathname();
  const { profile } = useAuth();
  const { data: stats, isLoading: statsLoading } = useBlogStats();
  const { data: popularPosts, isLoading: popularLoading } =
    usePopularBlogPosts(5);
  const [authorDialogOpen, setAuthorDialogOpen] = useState(false);

  const isAuthor = profile?.is_author === true;

  // Helper function to check if a link is active
  const isActive = (href: string): boolean => {
    if (href === '/blog') {
      return pathname === '/blog' || pathname === '/blog/';
    }
    return pathname === href || pathname?.startsWith(`${href}/`) || false;
  };

  return (
    <div className="space-y-6">
      {/* Logo/Brand */}
      <div className="mb-6">
        <Link href="/blog" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">Nowtown</span>
          <span className="text-2xl font-bold text-muted-foreground">Blog</span>
        </Link>
      </div>

      {/* Artikel schreiben Button (Nur für Autoren) */}
      {isAuthor && (
        <Button asChild className="w-full" size="lg">
          <Link href="/blog/write">
            <PenTool className="h-4 w-4 mr-2" />
            Artikel schreiben
          </Link>
        </Button>
      )}

      {/* Autor werden Button (Nur für Nicht-Autoren) */}
      {!isAuthor && (
        <Button
          className="w-full"
          size="lg"
          variant="outline"
          onClick={(): void => setAuthorDialogOpen(true)}
        >
          <Edit3 className="h-4 w-4 mr-2" />
          Autor werden
        </Button>
      )}

      {/* Suchfeld */}
      {onSearchChange && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Suchen..."
            className="pl-10"
            value={searchQuery}
            onChange={(e): void => onSearchChange(e.target.value)}
          />
        </div>
      )}

      {/* ALLGEMEIN Bereich */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-3">
          Allgemein
        </h3>
        <div className="space-y-1">
          <SidebarLink
            href="/blog"
            icon={FileText}
            label="Alle Artikel"
            count={statsLoading ? undefined : stats?.total_articles}
            active={isActive('/blog')}
          />
          <SidebarLink
            href="/blog/categories"
            icon={FolderOpen}
            label="Kategorien"
            active={isActive('/blog/categories')}
          />
          <SidebarLink
            href="/blog/popular"
            icon={TrendingUp}
            label="Beliebte Artikel"
            active={isActive('/blog/popular')}
          />
          <SidebarLink
            href="/blog/bookmarks"
            icon={Bookmark}
            label="Lesezeichen"
            active={isActive('/blog/bookmarks')}
          />
        </div>
      </Card>

      {/* WERKZEUGE Bereich (nur für Autoren) */}
      {isAuthor && (
        <>
          <Card className="p-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-3">
              Werkzeuge
            </h3>
            <div className="space-y-1">
              <SidebarLink
                href="/blog/your-articles"
                icon={FileText}
                label="Deine Artikel"
                active={isActive('/blog/your-articles')}
              />
              <SidebarLink
                href="/blog/calendar"
                icon={Calendar}
                label="Kalender"
                active={isActive('/blog/calendar')}
              />
              <SidebarLink
                href="/blog/authors"
                icon={Users}
                label="Autoren"
                active={isActive('/blog/authors')}
              />
              <SidebarLink
                href="/blog/comments"
                icon={MessageSquare}
                label="Kommentare"
                count={statsLoading ? undefined : stats?.total_comments}
                active={isActive('/blog/comments')}
              />
              <SidebarLink
                href="/blog/settings"
                icon={Settings}
                label="Einstellungen"
                active={isActive('/blog/settings')}
              />
            </div>
          </Card>
        </>
      )}

      {/* Kategorien */}
      {statsLoading ? (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Kategorien</h3>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </Card>
      ) : (
        stats &&
        stats.categories.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Kategorien</h3>
            <div className="space-y-2">
              {stats.categories.slice(0, 6).map((category) => (
                <Link
                  key={category.name}
                  href={`/blog/category/${encodeURIComponent(category.name)}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        )
      )}

      {/* Beliebte Artikel */}
      {popularLoading ? (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Beliebte Artikel</h3>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        </Card>
      ) : (
        popularPosts &&
        popularPosts.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Beliebte Artikel</h3>
            <div className="space-y-3">
              {popularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="block group"
                >
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>@{post.author?.username ?? 'unknown'}</span>
                    {post.likes_count !== undefined && post.likes_count > 0 && (
                      <>
                        <span>•</span>
                        <span>{post.likes_count} Likes</span>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        )
      )}

      {/* Author Application Dialog */}
      <AuthorApplicationDialog
        open={authorDialogOpen}
        onOpenChange={setAuthorDialogOpen}
      />
    </div>
  );
}
