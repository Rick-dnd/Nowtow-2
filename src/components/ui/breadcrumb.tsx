import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function Breadcrumb({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>): React.ReactElement {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentPropsWithoutRef<'ol'>): React.ReactElement {
  return <ol className={cn('flex items-center space-x-1', className)} {...props} />;
}

function BreadcrumbItem({ className, ...props }: React.ComponentPropsWithoutRef<'li'>): React.ReactElement {
  return <li className={cn('inline-flex items-center', className)} {...props} />;
}

function BreadcrumbLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>): React.ReactElement {
  return (
    <Link
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentPropsWithoutRef<'span'>): React.ReactElement {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-medium text-foreground', className)}
      {...props}
    />
  );
}

interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<'li'> {
  children?: React.ReactNode;
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps): React.ReactElement {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentPropsWithoutRef<'span'>): React.ReactElement {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <span className="sr-only">More</span>
      <span>...</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
