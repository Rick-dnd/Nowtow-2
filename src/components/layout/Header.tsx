'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Calendar, Building2, Briefcase, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AuthModal } from '@/components/auth/AuthModal';
import { UserDropdown } from '@/components/ui/user-dropdown';
import { useUser, useProfile, useSignOut } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export function Header(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Authentication state
  const { data: user, isLoading } = useUser();
  const { data: profile } = useProfile(user?.id);
  const signOut = useSignOut();

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return (): void => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/events', label: 'Events', icon: Calendar, hasDropdown: true },
    { href: '/spaces', label: 'Räume', icon: Building2, hasDropdown: true },
    { href: '/services', label: 'Services', icon: Briefcase, hasDropdown: true },
    { href: '/community', label: 'Community', icon: Users, hasDropdown: true },
  ];

  const standaloneLinks = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ];

  // Handle user dropdown actions
  const handleUserAction = (action: string): void => {
    switch (action) {
      case 'profile':
        router.push('/dashboard');
        break;
      case 'saved':
        router.push('/saved');
        break;
      case 'settings':
        router.push('/dashboard/settings');
        break;
      case 'notifications':
        router.push('/dashboard');
        break;
      case 'upgrade':
        router.push('/pricing');
        break;
      case 'referrals':
        // TODO: Implement referrals page
        break;
      case 'download':
        // Opens app download page in new tab
        window.open('/register', '_blank', 'noopener,noreferrer');
        break;
      case 'whats-new':
        // Opens blog/changelog in new tab
        window.open('/blog', '_blank', 'noopener,noreferrer');
        break;
      case 'help':
        // Opens FAQ/help page in new tab
        window.open('/help/faq', '_blank', 'noopener,noreferrer');
        break;
      case 'switch':
        // TODO: Implement account switching
        break;
      case 'logout':
        signOut.mutate();
        router.push('/');
        break;
      default:
        break;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 px-4 md:px-6">
      <div
        className={cn(
          'mx-auto max-w-7xl flex items-center justify-between px-4 md:px-6 header-transition rounded-2xl md:rounded-full',
          isScrolled ? 'glass-header-scrolled h-12 md:h-14' : 'glass-header h-14 md:h-16'
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/nowtown-logo.png"
            alt="Nowtown"
            width={160}
            height={53}
            priority
            className={cn(
              'logo-transition w-auto',
              isScrolled ? 'h-8' : 'h-10 md:h-12'
            )}
          />
        </Link>

        {/* Desktop Navigation - Pills Style */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <DropdownMenu key={link.href}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 !rounded-full font-medium text-sm transition-all duration-300',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90'
                        : 'hover:bg-accent/80 hover:scale-105 hover:shadow-md active:scale-95'
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                    <ChevronDown className="h-3 w-3 opacity-70" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-dropdown" align="center">
                  <DropdownMenuItem asChild>
                    <Link href={link.href} className="flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      <span>Entdecken</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`${link.href}/create`} className="flex items-center gap-2">
                      <span>Erstellen</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
          {standaloneLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 !rounded-full font-medium text-sm transition-all duration-300',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90'
                    : 'hover:bg-accent/80 hover:scale-105 hover:shadow-md active:scale-95'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons / User Dropdown */}
        <div className="hidden lg:flex items-center gap-3">
          {!isLoading && user ? (
            <UserDropdown user={user} profile={profile ?? null} onAction={handleUserAction} />
          ) : (
            <>
              <Button
                variant="ghost"
                className="px-4 py-2 !rounded-full hover:bg-accent/80 hover:scale-105 transition-all duration-300"
                onClick={(): void => setAuthModalOpen(true)}
              >
                Anmelden
              </Button>
              <Button asChild className="!rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <Link href="/register">Registrieren</Link>
              </Button>
            </>
          )}
        </div>

        {/* Auth Modal */}
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="!rounded-full p-2 hover:bg-accent/80 hover:scale-105 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] glass-mobile-menu">
            <SheetHeader>
              <SheetTitle className="text-left">Menü</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-2 mt-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
                return (
                  <div key={link.href} className="space-y-1">
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl transition-all',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'hover:bg-accent/50'
                      )}
                      onClick={(): void => setMobileMenuOpen(false)}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                    <Link
                      href={`${link.href}/create`}
                      className="flex items-center gap-3 p-2 pl-11 rounded-xl hover:bg-accent/30 transition-all text-sm"
                      onClick={(): void => setMobileMenuOpen(false)}
                    >
                      <span className="text-muted-foreground">Erstellen</span>
                    </Link>
                  </div>
                );
              })}
              {standaloneLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'p-3 rounded-xl transition-all font-medium',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-accent/50'
                    )}
                    onClick={(): void => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-6 border-t border-border/50 space-y-2">
                {!isLoading && user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl"
                      onClick={(): void => {
                        setMobileMenuOpen(false);
                        router.push('/dashboard');
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl"
                      onClick={(): void => {
                        setMobileMenuOpen(false);
                        router.push('/saved');
                      }}
                    >
                      Gespeichert
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full rounded-xl"
                      onClick={(): void => {
                        setMobileMenuOpen(false);
                        signOut.mutate();
                        router.push('/');
                      }}
                    >
                      Abmelden
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl"
                      onClick={(): void => {
                        setMobileMenuOpen(false);
                        setAuthModalOpen(true);
                      }}
                    >
                      Anmelden
                    </Button>
                    <Button className="w-full rounded-xl shadow-lg" asChild>
                      <Link href="/register">Registrieren</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
