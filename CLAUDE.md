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
│   └── mock-data.ts              # Development mock data
│
├── hooks/                        # Custom React hooks
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

**4. Data Fetching Pattern**
- TanStack Query for server state
- Zustand for client state (if needed)
- Mock data in `src/lib/mock-data.ts` for development

**5. Map Components**
- Uses `@vis.gl/react-google-maps`
- Map components in `src/components/events/EventsMap.tsx` and `src/components/spaces/SpacesMap.tsx`
- Props are flattened (no nested `options` object)

**6. Table Pattern (Dashboard)**
- TanStack Table in `src/app/dashboard/events/page.tsx`
- Explicit typing: `Row<T>`, `Cell<T>`, `Header<T>`, `HeaderGroup<T>`
- Type annotations on map functions for cells and headers

**7. Form Handling**
- React Hook Form + Zod validation
- shadcn/ui form components with proper type inference
- `useFormField` hook provides form context

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

## Critical Rules for Code Changes

1. **NEVER use `any` type** - Always define proper types or use generics
2. **ALWAYS add explicit return types** to all functions
3. **ALWAYS handle null/undefined** with `?.` or `??` operators
4. **ALWAYS type React event handlers** explicitly
5. **NEVER commit without passing** `npm run lint` and `npm run type-check`
6. When editing shadcn/ui components, maintain the `: React.ReactElement` pattern
7. Use `React.ReactElement` for component return types, not `JSX.Element`
8. For hooks returning cleanup functions, use `: (() => void) | void` for useEffect

## Testing Commands

Currently no test framework configured. Type checking serves as primary validation:
```bash
npm run type-check  # Must pass with 0 errors
npm run lint        # Must pass with 0 warnings/errors
npm run build       # Must build successfully
```
