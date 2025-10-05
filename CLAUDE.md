# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack (fast refresh)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking only (no emit)
npm run type-check
```

## TypeScript Configuration & Strict Type Requirements

**CRITICAL:** This project enforces **extremely strict TypeScript and ESLint rules**:

### ESLint Rules (eslint.config.mjs)
- `@typescript-eslint/no-explicit-any`: "error" - **NO `any` types allowed**
- `@typescript-eslint/explicit-function-return-type`: "error" - **ALL functions MUST have explicit return types**
- `@typescript-eslint/explicit-module-boundary-types`: "error" - **ALL exported functions MUST have explicit return types**
- `@typescript-eslint/no-unused-vars`: "error" - **NO unused variables**

### TypeScript Compiler Options (tsconfig.json)
- `strict: true` - All strict type checks enabled
- `strictNullChecks: true` - Null and undefined must be explicitly handled
- `noImplicitAny: true` - No implicit any types
- `noUnusedLocals: true` - No unused local variables
- `noUnusedParameters: true` - No unused parameters
- `noUncheckedIndexedAccess: true` - Array access returns `T | undefined`

### Return Type Patterns

**React Components:**
```typescript
function ComponentName(): React.ReactElement {
  return <div>...</div>
}
```

**React Hooks:**
```typescript
function useCustomHook(): ReturnType {
  return { ... }
}
```

**useEffect with cleanup:**
```typescript
React.useEffect((): (() => void) | void => {
  // setup
  return (): void => {
    // cleanup
  }
}, [deps])
```

**Utility functions:**
```typescript
function utilityFn(...args): string {
  return "result"
}
```

**NEVER use `any` - use proper types or generics instead.**

## Architecture Overview

### Tech Stack
- **Framework:** Next.js 15.5.4 (App Router)
- **React:** 19.2.0
- **TypeScript:** 5.9.3 (strict mode)
- **Styling:** Tailwind CSS 4.1.14 with @tailwindcss/postcss
- **UI Components:** shadcn/ui (Radix UI primitives)
- **State Management:** Zustand 5.0.8
- **Data Fetching:** TanStack Query 5.90.2
- **Backend:** Supabase (auth, database)
- **Forms:** React Hook Form + Zod validation
- **Maps:** @vis.gl/react-google-maps
- **Charts:** Recharts
- **Icons:** Lucide React

### Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── (routes)/                 # Public routes
│   │   ├── page.tsx              # Home page
│   │   ├── events/               # Events listing & detail
│   │   ├── spaces/               # Space rental listings
│   │   ├── services/             # Services marketplace
│   │   ├── blog/                 # Blog & articles
│   │   └── community/            # Community feed
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── analytics/            # Analytics with Recharts
│   │   ├── bookings/             # Booking management
│   │   ├── events/               # Event management (TanStack Table)
│   │   └── messages/             # Messaging interface
│   ├── layout.tsx                # Root layout with Providers
│   └── globals.css               # Tailwind base styles
│
├── components/
│   ├── ui/                       # shadcn/ui components (30+ files)
│   │   └── *.tsx                 # All have explicit return types
│   ├── layout/                   # Header, Footer
│   ├── auth/                     # Auth modals
│   ├── cards/                    # Reusable card components
│   ├── events/                   # Event-specific components
│   ├── spaces/                   # Space-specific components
│   ├── services/                 # Service components
│   ├── blog/                     # Blog components
│   └── community/                # Community feed components
│
├── lib/
│   ├── providers.tsx             # TanStack Query + Toaster setup
│   ├── supabase/
│   │   └── client.ts             # Supabase client configuration
│   ├── utils.ts                  # cn() utility (clsx + tailwind-merge)
│   └── placeholder-data.ts       # Empty arrays for empty states only
│
├── services/                     # Service layer (Supabase data access)
│   ├── events.service.ts         # Event CRUD operations
│   ├── spaces.service.ts         # Space CRUD operations
│   ├── services.service.ts       # Services CRUD operations
│   ├── bookings.service.ts       # Booking operations
│   ├── reviews.service.ts        # Review operations
│   ├── blog.service.ts           # Blog operations
│   ├── community.service.ts      # Community posts
│   ├── stories.service.ts        # Stories with 24h auto-delete
│   ├── messaging.service.ts      # Messaging operations
│   ├── auth.service.ts           # Authentication
│   └── storage.service.ts        # File uploads
│
├── hooks/                        # Custom React hooks wrapping services
│   ├── useEvents.ts              # TanStack Query hooks for events
│   ├── useSpaces.ts              # TanStack Query hooks for spaces
│   ├── useServices.ts            # TanStack Query hooks for services
│   ├── useBookings.ts            # Booking hooks
│   ├── useReviews.ts             # Review hooks
│   ├── useCommunity.ts           # Community hooks
│   ├── useStories.ts             # Stories hooks
│   ├── useBlog.ts                # Blog hooks
│   ├── useMessaging.ts           # Messaging hooks
│   ├── useAuth.ts                # Auth hooks
│   ├── useUpload.ts              # Upload hooks
│   ├── useRealtime.ts            # Supabase Realtime hooks
│   ├── useGeolocation.ts         # Geolocation hooks
│   └── use-mobile.ts             # Mobile breakpoint detection
│
└── types/                        # TypeScript type definitions
    └── database.ts               # Supabase database types
```

### Key Architectural Patterns

**1. Provider Hierarchy (src/lib/providers.tsx)**
- TanStack Query wraps the entire app in root layout
- Global toast notifications via Sonner
- React Query DevTools enabled in development
- Query configuration: 1min staleTime, 5min gcTime, no refetch on focus

**2. Supabase Integration**
- Client-side Supabase client in `src/lib/supabase/client.ts`
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Typed with Database type from `@/types/database`
- Auto-refresh tokens, persistent sessions

**3. shadcn/ui Component System**
- All components in `src/components/ui/`
- Built on Radix UI primitives
- Uses `cn()` utility for className merging
- Follows "data-slot" pattern for styling hooks
- **All components must have explicit return types**: `: React.ReactElement`

**4. Service Layer Architecture (CRITICAL PATTERN)**

This app uses a **3-layer data architecture**. ALWAYS follow this pattern:

**Layer 1: Services** (`src/services/*.service.ts`)
- Export typed CRUD functions that call Supabase directly
- Export filter interfaces for type safety
- Handle all Supabase query building, filtering, sorting
- Return plain Promise types

Example:
```typescript
// src/services/events.service.ts
export interface EventFilters {
  category?: string | null;
  city?: string;
  maxPrice?: number;
  searchQuery?: string;
}

export const eventsService = {
  async getEvents(filters?: EventFilters): Promise<Event[]> {
    const supabase = createClient();
    let query = supabase.from('events').select('*');

    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.searchQuery) query = query.ilike('name', `%${filters.searchQuery}%`);

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async getEventById(id: string): Promise<Event | null> { ... }
}
```

**Layer 2: Hooks** (`src/hooks/use*.ts`)
- Wrap services with TanStack Query hooks
- Handle loading states, caching, refetching
- Export typed query/mutation hooks
- Configure staleTime, gcTime, etc.

Example:
```typescript
// src/hooks/useEvents.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { eventsService, type EventFilters } from '@/services/events.service';

export function useEvents(filters?: EventFilters): UseQueryResult<Event[], Error> {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventsService.getEvents(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useEvent(id: string | undefined): UseQueryResult<Event | null, Error> {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => {
      if (!id) throw new Error('Event ID is required');
      return eventsService.getEventById(id);
    },
    enabled: !!id,
  });
}
```

**Layer 3: Components** (use hooks only)
- NEVER import services directly
- ALWAYS use hooks for data fetching
- Handle loading/error states in UI
- Use empty arrays `[]` for fallbacks, never mock data

Example:
```typescript
// src/components/events/EventsList.tsx
export function EventsList({ filters }: Props): React.ReactElement {
  const { data: events, isLoading, error } = useEvents(filters);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div>
      {(events || []).map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

**CRITICAL RULES:**
- ✅ Components call hooks → Hooks call services → Services call Supabase
- ❌ NEVER use mock data in components
- ❌ NEVER call services directly from components
- ❌ NEVER call Supabase client directly from components
- ✅ Use `(data || [])` for safe array iteration
- ✅ Always handle `isLoading` and `error` states

**5. Map Components with Marker Clustering**
- Uses `@vis.gl/react-google-maps` (NOT `@react-google-maps/api`)
- Marker clustering via `@googlemaps/markerclusterer`
- Map components: `EventsMap.tsx`, `SpacesMap.tsx`
- Pattern: `<Map>` wraps `<ClusteredMarkers>` component
- Props are flattened (no nested `options` object)
- Markers only render items with `latitude` and `longitude`

**6. Table Pattern (Dashboard)**
- Uses TanStack Table v8
- Explicit typing required: `Row<T>`, `Cell<T>`, `Header<T>`, `HeaderGroup<T>`
- Type annotations on ALL map functions for cells and headers
- Example: `columns.map((header: Header<Event, unknown>) => ...)`

**7. Form Handling**
- React Hook Form + Zod validation
- shadcn/ui form components with proper type inference
- `useFormField` hook provides form context
- All form schemas defined with Zod

**8. Animations**
- **Page transitions:** Framer Motion
- **Scroll effects:** GSAP
- **Carousels:** Embla Carousel
- Stories viewer: `react-insta-stories`

## Important Type Safety Notes

1. **Null Safety:** Use optional chaining (`?.`) and nullish coalescing (`??`) for potentially undefined values
2. **Array Access:** Due to `noUncheckedIndexedAccess`, array access returns `T | undefined` - always handle undefined case
3. **Event Handlers:** Always type event handlers explicitly:
   ```typescript
   const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
     // ...
   }
   ```

4. **Recharts Labels:** Type chart label props explicitly:
   ```typescript
   label={(props: { name?: string; percent?: number }) => `${props.name ?? ''}`}
   ```

5. **Component Props:** Use `React.ComponentProps<T>` for extending native elements:
   ```typescript
   function Input(props: React.ComponentProps<"input">): React.ReactElement
   ```

## Path Aliases

```typescript
"@/*" -> "./src/*"
```

All imports use the `@/` alias for src directory.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Database Schema (Supabase PostgreSQL)

Key tables in the database (all typed in `src/types/database.ts`):
- `events` - Event listings with organizer, location, pricing
- `spaces` - Space rentals (hourly/daily pricing, capacity, amenities)
- `services` - Service marketplace listings
- `bookings` - Bookings for events/spaces/services
- `reviews` - Reviews with ratings
- `community_posts` - Community feed posts
- `community_stories` - Stories with 24h auto-delete (expires_at timestamp)
- `blog_posts` - Blog articles with categories
- `profiles` - User profiles linked to Supabase auth
- `messages` / `conversations` - Messaging system
- `notifications` - User notifications

**Database Type Generation:**
Types are auto-generated from Supabase and should NOT be manually edited. Use Supabase CLI to regenerate if schema changes.

## Critical Rules for Code Changes

1. **NEVER use `any` type** - Always define proper types or use generics
2. **ALWAYS add explicit return types** to all functions
3. **ALWAYS handle null/undefined** with `?.` or `??` operators
4. **ALWAYS type React event handlers** explicitly
5. **NEVER commit without passing** `npm run lint` and `npm run type-check`
6. **NEVER use mock data** - all data must come from Supabase via hooks
7. **ALWAYS follow 3-layer architecture** - Components → Hooks → Services → Supabase
8. When editing shadcn/ui components, maintain the `: React.ReactElement` pattern
9. Use `React.ReactElement` for component return types, not `JSX.Element`
10. For hooks returning cleanup functions, use `: (() => void) | void` for useEffect
11. For TanStack Table, ALWAYS add explicit types to map callbacks
12. Use `(data || [])` pattern for safe array operations on query results

## Testing Commands

Currently no test framework configured. Type checking serves as primary validation:
```bash
npm run type-check  # Must pass with 0 errors
npm run lint        # Must pass with 0 warnings/errors
npm run build       # Must build successfully
```
