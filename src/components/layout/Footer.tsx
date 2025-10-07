'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    unternehmen: [
      { href: '/about', label: 'Über uns' },
      { href: '/pricing', label: 'Angebote' },
      { href: '/privacy', label: 'Datenschutz' },
      { href: '/terms', label: 'AGB' },
      { href: '/imprint', label: 'Impressum' },
      { href: '/terms', label: 'Terms' },
      { href: '/cookies', label: 'Cookie' },
      { href: '/help/faq', label: 'FAQ' },
    ],
    entdecke: [
      { href: '/events', label: 'Events' },
      { href: '/spaces', label: 'Spaces' },
      { href: '/services', label: 'Services' },
      { href: '/hosting', label: 'Hosting' },
      { href: '/community', label: 'Community' },
      { href: '/blog', label: 'Blog' },
      { href: '/ambassador', label: 'Ambassador' },
    ],
    supportGastgeber: [
      { href: '/help', label: 'Hilfe Center' },
      { href: '/safety', label: 'Sicherheit' },
      { href: '/spaces/create', label: 'Raum anbieten' },
      { href: '/events/create', label: 'Event erstellen' },
    ],
  };

  type SocialLink = {
    href: string;
    icon: React.ComponentType<{ className?: string }> | (() => React.ReactElement);
    label: string;
  };

  const socialLinks: SocialLink[] = [
    { href: 'https://x.com/nowtown', icon: (): React.ReactElement => <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: 'X (Twitter)' },
    { href: 'https://instagram.com/nowtown', icon: Instagram, label: 'Instagram' },
    { href: 'https://facebook.com/nowtown', icon: Facebook, label: 'Facebook' },
    { href: 'https://pinterest.com/nowtown', icon: (): React.ReactElement => <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>, label: 'Pinterest' },
    { href: 'https://tiktok.com/@nowtown', icon: (): React.ReactElement => <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 0 1-1-.1z"/></svg>, label: 'TikTok' },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Column 1: Logo & Newsletter */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/nowtown-logo.png"
                alt="Nowtown"
                width={140}
                height={46}
                className="h-10 md:h-11 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Dein lokales Erlebnis-Netzwerk für München
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Newsletter abonnieren</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="E-Mail"
                  className="text-sm"
                  aria-label="Email für Newsletter"
                />
                <Button size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {React.createElement(social.icon as React.ComponentType<{ className?: string }>, { className: "h-5 w-5" })}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Unternehmen */}
          <div>
            <h3 className="font-semibold mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              {footerLinks.unternehmen.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Entdecke */}
          <div>
            <h3 className="font-semibold mb-4">Entdecke</h3>
            <ul className="space-y-2">
              {footerLinks.entdecke.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Gastgeber */}
          <div>
            <h3 className="font-semibold mb-4">Support & Gastgeber</h3>
            <ul className="space-y-2">
              {footerLinks.supportGastgeber.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Länder */}
          <div>
            <h3 className="font-semibold mb-4">Länder</h3>
            <Select defaultValue="munich">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Standort wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="munich">München</SelectItem>
                <SelectItem value="berlin">Berlin</SelectItem>
                <SelectItem value="hamburg">Hamburg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-border pt-6 mb-6">
          <p className="text-xs text-muted-foreground mb-3">Sichere Zahlungsmethoden</p>
          <div className="flex flex-wrap gap-3">
            <div className="px-3 py-1 bg-background border border-border rounded text-xs font-medium">
              Visa
            </div>
            <div className="px-3 py-1 bg-background border border-border rounded text-xs font-medium">
              Mastercard
            </div>
            <div className="px-3 py-1 bg-background border border-border rounded text-xs font-medium">
              PayPal
            </div>
            <div className="px-3 py-1 bg-background border border-border rounded text-xs font-medium">
              Apple Pay
            </div>
            <div className="px-3 py-1 bg-background border border-border rounded text-xs font-medium">
              Google Pay
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>🇩🇪 Deutschland</span>
              <span>•</span>
              <span>München</span>
            </div>
            <p>
              © {currentYear} Nowtown. Alle Rechte vorbehalten. •{' '}
              <a href="mailto:info@nowtown.co" className="hover:text-primary transition-colors">
                info@nowtown.co
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
