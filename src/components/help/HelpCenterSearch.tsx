'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, ChevronRight, FileText, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  url: string;
  relevance: number;
}

interface HelpCenterSearchProps {
  placeholder?: string;
  showPopularArticles?: boolean;
}

// Mock help articles
const helpArticles: SearchResult[] = [
  {
    id: '1',
    title: 'Wie buche ich ein Event?',
    excerpt: 'Eine Schritt-für-Schritt-Anleitung zum Buchen von Events auf Nowtown',
    category: 'Buchungen',
    url: '/help/booking-events',
    relevance: 1.0,
  },
  {
    id: '2',
    title: 'Wie kann ich meine Buchung stornieren?',
    excerpt: 'Erfahre, wie du eine Buchung stornieren und eine Rückerstattung erhalten kannst',
    category: 'Buchungen',
    url: '/help/cancel-booking',
    relevance: 0.95,
  },
  {
    id: '3',
    title: 'Zahlungsmethoden',
    excerpt: 'Welche Zahlungsmethoden werden akzeptiert und wie funktioniert die Zahlung',
    category: 'Zahlungen',
    url: '/help/payment-methods',
    relevance: 0.85,
  },
  {
    id: '4',
    title: 'Wie erstelle ich ein Event?',
    excerpt: 'Leitfaden für Veranstalter zum Erstellen und Veröffentlichen von Events',
    category: 'Veranstalter',
    url: '/help/create-event',
    relevance: 0.9,
  },
  {
    id: '5',
    title: 'Sicherheit und Datenschutz',
    excerpt: 'Wie wir deine Daten schützen und für deine Sicherheit sorgen',
    category: 'Sicherheit',
    url: '/help/security',
    relevance: 0.8,
  },
  {
    id: '6',
    title: 'Kontakt zum Support',
    excerpt: 'Verschiedene Wege, um unser Support-Team zu erreichen',
    category: 'Support',
    url: '/help/contact',
    relevance: 0.75,
  },
];

const popularArticles = helpArticles.slice(0, 4);

export function HelpCenterSearch({
  placeholder = 'Suche nach Hilfe-Artikeln...',
  showPopularArticles = true,
}: HelpCenterSearchProps): React.ReactElement {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (searchQuery: string): void => {
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Simple search algorithm: check if query is in title or excerpt
    const query_lower = searchQuery.toLowerCase();
    const results = helpArticles
      .filter(
        (article) =>
          article.title.toLowerCase().includes(query_lower) ||
          article.excerpt.toLowerCase().includes(query_lower) ||
          article.category.toLowerCase().includes(query_lower)
      )
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 5);

    setSearchResults(results);
  };

  const clearSearch = (): void => {
    setQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
          aria-label="Suche nach Hilfe-Artikeln"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            aria-label="Suche löschen"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="mb-6">
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-3">
                {searchResults.length} Ergebnis{searchResults.length !== 1 ? 'se' : ''} gefunden
              </p>
              {searchResults.map((result) => (
                <Link key={result.id} href={result.url}>
                  <Card className="hover:bg-accent transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold">{result.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{result.excerpt}</p>
                          <Badge variant="secondary" className="text-xs">
                            {result.category}
                          </Badge>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <HelpCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Keine Ergebnisse gefunden</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Versuche es mit anderen Suchbegriffen oder durchsuche unsere Kategorien
                </p>
                <Button variant="outline" onClick={clearSearch}>
                  Suche zurücksetzen
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Popular Articles */}
      {showPopularArticles && !isSearching && (
        <div>
          <h3 className="font-semibold mb-4">Häufig gesucht</h3>
          <div className="grid gap-3">
            {popularArticles.map((article) => (
              <Link key={article.id} href={article.url}>
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-base mb-1">{article.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {article.excerpt}
                        </CardDescription>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Contact Support CTA */}
      {isSearching && searchResults.length === 0 && (
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-6 text-center">
            <h3 className="font-semibold mb-2">Brauchst du weitere Hilfe?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Unser Support-Team steht dir gerne zur Verfügung
            </p>
            <Button asChild>
              <Link href="/help/contact">Kontakt aufnehmen</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
