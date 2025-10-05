'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, Calendar, Building2, Briefcase, Users } from 'lucide-react';
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

export function Header(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  // Authentication state
  const { data: user, isLoading } = useUser();
  const { data: profile } = useProfile(user?.id);
  const signOut = useSignOut();

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      // setIsScrolled(window.scrollY > 20);
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/nowtown-logo.png"
            alt="Nowtown"
            width={160}
            height={53}
            priority
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <DropdownMenu key={link.href}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-accent text-foreground"
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={link.href}>Entdecken</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${link.href}/create`}>Erstellen</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          {standaloneLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Auth Buttons / User Dropdown */}
        <div className="hidden md:flex items-center space-x-3">
          {!isLoading && user ? (
            <UserDropdown user={user} profile={profile ?? null} onAction={handleUserAction} />
          ) : (
            <>
              <Button variant="ghost" onClick={(): void => setAuthModalOpen(true)}>
                Anmelden
              </Button>
              <Button asChild>
                <Link href="/register">Registrieren</Link>
              </Button>
            </>
          )}
        </div>

        {/* Auth Modal */}
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menü</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={(): void => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              {standaloneLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-3 rounded-lg hover:bg-accent transition-colors font-medium"
                  onClick={(): void => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-border space-y-3">
                {!isLoading && user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={(): void => {
                        setMobileMenuOpen(false);
                        router.push('/dashboard');
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={(): void => {
                        setMobileMenuOpen(false);
                        router.push('/saved');
                      }}
                    >
                      Gespeichert
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
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
                      className="w-full"
                      onClick={(): void => {
                        setMobileMenuOpen(false);
                        setAuthModalOpen(true);
                      }}
                    >
                      Anmelden
                    </Button>
                    <Button className="w-full" asChild>
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
