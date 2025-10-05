'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
  className?: string;
}

export function TableOfContents({
  contentSelector = '.blog-content',
  className,
}: TableOfContentsProps): React.ReactElement | null {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    const headingElements = contentElement.querySelectorAll('h2, h3, h4');
    const tocItems: TocItem[] = [];

    headingElements.forEach((heading, index) => {
      // Generate ID if not present
      let id = heading.id;
      if (!id) {
        id = `heading-${index}`;
        heading.id = id;
      }

      const level = parseInt(heading.tagName[1] ?? '2', 10);
      tocItems.push({
        id,
        text: heading.textContent ?? '',
        level,
      });
    });

    setHeadings(tocItems);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1.0,
      }
    );

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return (): void => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, [contentSelector]);

  const handleClick = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <Card className={cn('sticky top-24', className)}>
      <CardHeader>
        <CardTitle className="text-base">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <nav aria-label="Table of contents">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{
                  paddingLeft: `${(heading.level - 2) * 16}px`,
                }}
              >
                <button
                  onClick={(): void => handleClick(heading.id)}
                  className={cn(
                    'text-sm text-left w-full hover:text-primary transition-colors',
                    activeId === heading.id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  )}
                  aria-current={activeId === heading.id ? 'location' : undefined}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}
