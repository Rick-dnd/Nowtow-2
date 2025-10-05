# 🚀 Nowtown Platform - Complete Rebuild PRD v3.0

**Version:** 3.0 (Final)
**Datum:** 3. Oktober 2025
**Status:** ✅ Approved for Development
**Timeline:** 16-20 Wochen
**Projekt ID:** Nowtown Rebuild 2025

---

## 📋 Inhaltsverzeichnis

### Teil 1: Grundlagen & Prinzipien
1. [🎯 Entwicklungs-Prinzipien](#entwicklungs-prinzipien)
2. [📚 Pflicht-Recherche vor jeder Aktion](#pflicht-recherche)
3. [🗂️ Entwicklungsphasen](#entwicklungsphasen)
4. [💾 Existierende Datenbank](#existierende-datenbank)

### Teil 2: Technology Stack
5. [⚙️ Frontend Tech Stack 2025](#frontend-tech-stack)
6. [🎨 UI Component Libraries](#ui-component-libraries)
7. [✨ Animation & Interaktivität](#animation-interaktivität)
8. [📦 State Management & Forms](#state-management)

### Teil 3: Komplette UI/UX Beschreibung (ALLE 57 Seiten!)
9. [🏠 Homepage](#homepage-detailliert)
10. [🎉 Events Seite](#events-seite-detailliert)
11. [🏢 Spaces Seite](#spaces-seite-detailliert)
12. [💼 Services Seite](#services-seite-detailliert)
13. [👥 Community Seite (KOMPLEX!)](#community-seite-komplex)
14. [📝 Blog System](#blog-system-detailliert)
15. [💰 Pricing Seite](#pricing-seite-detailliert)
16. [📊 Dashboard (10+ Unter-Seiten)](#dashboard-komplett)
17. [📄 Alle Statischen Seiten](#statische-seiten)

### Teil 4: Development Guidelines
18. [👨‍💻 Developer Best Practices](#developer-best-practices)
19. [♿ Accessibility Requirements](#accessibility-requirements)
20. [⚡ Performance Targets](#performance-targets)
21. [🧪 Testing Strategy](#testing-strategy)
22. [📦 Assets & Resources](#assets-resources)

---

# TEIL 1: GRUNDLAGEN & PRINZIPIEN

## 🎯 Entwicklungs-Prinzipien

### 🚨 KRITISCHE REGEL #1: IMMER ZUERST RECHERCHIEREN!

**VOR JEDER EINZELNEN AKTION MUSS DER DEVELOPER:**

```
┌─────────────────────────────────────────────────────┐
│  SCHRITT 1: IDENTIFIZIEREN                         │
│  → Was genau soll gebaut werden?                   │
│  → Welche Technologie wird benötigt?               │
└─────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────┐
│  SCHRITT 2: OFFIZIELLE DOCS LESEN                  │
│  → Next.js Docs durchsuchen                        │
│  → shadcn/ui Komponente studieren                  │
│  → Radix UI Primitive verstehen                    │
│  → TypeScript Patterns checken                     │
└─────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────┐
│  SCHRITT 3: DESIGN PATTERNS RECHERCHIEREN          │
│  → UI/UX Best Practices suchen                     │
│  → WCAG Accessibility Guidelines lesen             │
│  → Color Contrast prüfen                           │
│  → Responsive Design Patterns studieren            │
└─────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────┐
│  SCHRITT 4: IMPLEMENTIERUNGS-BEISPIELE FINDEN      │
│  → GitHub nach ähnlichen Lösungen suchen           │
│  → CodeSandbox Beispiele ansehen                   │
│  → Stack Overflow Diskussionen lesen               │
│  → Production-Ready Examples studieren             │
└─────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────┐
│  SCHRITT 5: PLANEN & DOKUMENTIEREN                 │
│  → Komponenten-Struktur skizzieren                 │
│  → Props Interface definieren                      │
│  → State Management planen                         │
│  → Edge Cases identifizieren                       │
└─────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────┐
│  SCHRITT 6: CODE SCHREIBEN                         │
│  → TypeScript mit expliziten Return Types          │
│  → Accessibility Features einbauen                 │
│  → Performance Optimierungen beachten              │
│  → Error Handling implementieren                   │
└─────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────┐
│  SCHRITT 7: TESTEN                                 │
│  → Unit Tests schreiben                            │
│  → Component Tests erstellen                       │
│  → Accessibility testen                            │
│  → Mobile Responsiveness prüfen                    │
└─────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────┐
│  SCHRITT 8: REFACTORING                            │
│  → Code Review durchführen                         │
│  → ESLint Errors fixen                             │
│  → Performance optimieren                          │
│  → Dokumentation schreiben                         │
└─────────────────────────────────────────────────────┘
```

### ❌ NIEMALS ANNEHMEN - IMMER RECHERCHIEREN!

**Beispiel-Workflow:**

```typescript
// ❌ FALSCH - Einfach drauflos coden
function EventCard() {
  return <div>Event Card</div>;
}

// ✅ RICHTIG - Erst recherchieren, dann coden
/*
 * RECHERCHE-SCHRITTE VOR DIESEM COMPONENT:
 *
 * 1. shadcn/ui Card Dokumentation gelesen:
 *    https://ui.shadcn.com/docs/components/card
 *
 * 2. Accessibility für Cards studiert:
 *    - Semantic HTML verwenden (<article>)
 *    - Proper heading hierarchy
 *    - Keyboard navigation
 *    - ARIA labels wo nötig
 *
 * 3. Design Pattern recherchiert:
 *    - Card hover effects (Framer Motion)
 *    - Image aspect ratios (16:9)
 *    - Color contrast (WCAG AA)
 *
 * 4. Performance beachtet:
 *    - Next/Image für Bilder
 *    - Lazy Loading
 *    - Skeleton während Loading
 *
 * 5. TypeScript Types definiert:
 *    - Event Interface
 *    - Props Interface
 *    - Return Type
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Event } from '@/types/database';

interface EventCardProps {
  event: Event;
  onClick?: (event: Event) => void;
}

export function EventCard({ event, onClick }: EventCardProps): React.ReactElement {
  // Implementation mit allen Best Practices
  // ...
}
```

---

## 📚 Pflicht-Recherche

### 📖 Essentielle Dokumentation (BOOKMARKEN!)

#### **Frontend Framework & Core**
| Technologie | Link | Wann lesen? |
|-------------|------|-------------|
| Next.js 15.5 | https://nextjs.org/docs | Vor JEDEM neuen Feature |
| React 19 | https://react.dev/ | Hooks, Components, Patterns |
| TypeScript 5 | https://www.typescriptlang.org/docs/ | Type-Definitionen, Generics |

#### **UI Components & Styling**
| Technologie | Link | Wann lesen? |
|-------------|------|-------------|
| shadcn/ui | https://ui.shadcn.com/docs | Vor jeder UI Component |
| Radix UI | https://www.radix-ui.com/primitives/docs | Component Primitives |
| Tailwind CSS v4 | https://tailwindcss.com/docs | Styling, Responsive Design |

#### **Animation & Interaktivität**
| Technologie | Link | Wann lesen? |
|-------------|------|-------------|
| Framer Motion | https://www.framer.com/motion/ | Alle Animationen |
| GSAP | https://greensock.com/docs/ | Komplexe Scroll-Animationen |

#### **State Management & Data Fetching**
| Technologie | Link | Wann lesen? |
|-------------|------|-------------|
| TanStack Query | https://tanstack.com/query/latest | Server State, Caching |
| Zustand | https://github.com/pmndrs/zustand | Client State |
| React Hook Form | https://react-hook-form.com/ | Formulare |
| Zod | https://zod.dev/ | Validation Schemas |

#### **Backend & Database**
| Technologie | Link | Wann lesen? |
|-------------|------|-------------|
| Supabase | https://supabase.com/docs | Alle Backend-Operationen |
| Supabase Realtime | https://supabase.com/docs/guides/realtime | Real-time Features |
| PostgreSQL | https://www.postgresql.org/docs/ | SQL Queries |

#### **Accessibility & Best Practices**
| Resource | Link | Wann lesen? |
|----------|------|-------------|
| WCAG 2.1 | https://www.w3.org/WAI/WCAG21/quickref/ | Vor JEDEM Component |
| A11y Project | https://www.a11yproject.com/ | Accessibility Patterns |
| Web.dev | https://web.dev/learn/ | Performance, SEO |

#### **Design Inspiration**
| Resource | Link | Zweck |
|----------|------|-------|
| Material Design 3 | https://m3.material.io/ | Design Principles |
| Apple HIG | https://developer.apple.com/design/ | iOS/macOS Patterns |
| shadcn Examples | https://ui.shadcn.com/examples | UI Inspiration |
| Vercel Templates | https://vercel.com/templates | Production Examples |

### 🔍 Wo recherchieren für spezifische Probleme?

```
Problem: TypeScript Error
├─> 1. TypeScript Handbook
├─> 2. TypeScript Deep Dive
└─> 3. Stack Overflow

Problem: Accessibility Issue
├─> 1. WCAG Quick Reference
├─> 2. MDN Accessibility
└─> 3. A11y Project Checklist

Problem: Performance Issue
├─> 1. Web.dev Performance
├─> 2. Next.js Optimization Docs
└─> 3. Chrome DevTools Docs

Problem: UI/UX Design
├─> 1. shadcn/ui Examples
├─> 2. Dribbble Inspiration
└─> 3. Figma Community

Problem: Animation
├─> 1. Framer Motion Examples
├─> 2. CodePen Animations
└─> 3. GSAP Showcase
```

---

## 🗂️ Entwicklungsphasen

### **PHASE 1: UI/UX Development (Wochen 1-12)**
**Ziel:** Alle visuellen Komponenten mit Mock-Daten bauen

```
Woche 1-2: Setup & Foundation
├── ✅ Next.js 15.5 Projekt aufsetzen
├── ✅ shadcn/ui Components installieren
├── ✅ Tailwind CSS v4 konfigurieren
├── ✅ TypeScript strict mode aktivieren
├── ✅ ESLint & Prettier einrichten
└── ✅ Assets aus NOWTOWN_REBUILD_ASSETS_PACKAGE kopieren

Woche 3-4: Core Layout Components
├── ✅ Header (responsive, sticky)
├── ✅ Footer (5-column layout)
├── ✅ Navigation Menu
├── ✅ Login/Register Modals
└── ✅ Loading States & Skeletons

Woche 5-6: Homepage & Discovery
├── ✅ Hero Section mit Animationen
├── ✅ Highlights Carousels
├── ✅ Category Grids (Events/Spaces/Services)
├── ✅ How It Works Section
└── ✅ Search Bar Component

Woche 7-8: Events, Spaces & Services Pages
├── ✅ Filter Sidebar Components
├── ✅ Map Integration (Google Maps)
├── ✅ List/Grid View Components
├── ✅ Detail Pages mit Image Gallery
└── ✅ Booking Cards (UI only, no backend)

Woche 9-10: Community Features (UI)
├── ✅ Feed Layout (3-column)
├── ✅ Create Post Component
├── ✅ Post Card (text, images, polls)
├── ✅ Stories Bar & Story Viewer
├── ✅ Comments Component
└── ✅ Community Sidebars

Woche 11: Blog & Dashboard (UI)
├── ✅ Blog Layout & Article Cards
├── ✅ Rich Text Editor
├── ✅ Dashboard Navigation
├── ✅ KPI Cards
├── ✅ Charts Components (Chart.js)
└── ✅ Tables Components

Woche 12: Static & Additional Pages
├── ✅ About, Contact, Help Pages
├── ✅ Pricing Page mit 3D Cards
├── ✅ FAQ Accordions
├── ✅ Legal Pages (Privacy, Terms, etc.)
└── ✅ 404 & Error Pages
```

**✅ Phase 1 Deliverables:**
- Komplette UI mit Mock-Daten
- Alle Animationen funktionieren
- Responsive auf allen Devices
- WCAG AA compliant
- Zero ESLint Errors

---

### **PHASE 2: Backend Integration (Wochen 13-16)**
**Ziel:** Supabase Backend mit UI verbinden

```
Woche 13: Database Setup
├── ✅ Supabase MCP Server nutzen
│   └── Alle existierenden Tables überprüfen
├── ✅ RLS Policies checken
├── ✅ Storage Buckets konfigurieren
└── ✅ API Types generieren

Woche 14: Authentication & User Management
├── ✅ Supabase Auth Setup
├── ✅ Login/Register Flow
├── ✅ Protected Routes Middleware
├── ✅ User Profile Management
└── ✅ Avatar Upload

Woche 15: Core Features Integration
├── ✅ Events CRUD Operations
├── ✅ Spaces CRUD Operations
├── ✅ Services CRUD Operations
├── ✅ Bookings System
├── ✅ Reviews & Ratings
└── ✅ Real-time Updates

Woche 16: Community & Advanced Features
├── ✅ Community Posts & Comments
├── ✅ Stories with Auto-Delete
├── ✅ Poll Voting System
├── ✅ Mentions & Hashtags
├── ✅ Follow System
└── ✅ Achievements & Gamification
```

**✅ Phase 2 Deliverables:**
- Vollständig funktionale App
- Alle CRUD Operations funktionieren
- Real-time Updates aktiv
- Authentication flow komplett

---

### **PHASE 3: Testing & Optimization (Wochen 17-20)**
**Ziel:** Production-ready machen

```
Woche 17: Testing
├── ✅ Unit Tests (Services)
├── ✅ Component Tests (React Testing Library)
├── ✅ E2E Tests (Playwright)
└── ✅ Accessibility Testing (axe-core)

Woche 18: Performance Optimization
├── ✅ Image Optimization
├── ✅ Code Splitting
├── ✅ Bundle Size Reduction
├── ✅ Caching Strategies
└── ✅ Lazy Loading

Woche 19: Security & Compliance
├── ✅ Security Audit
├── ✅ RLS Policies Review
├── ✅ Input Validation
├── ✅ XSS Prevention
└── ✅ GDPR Compliance

Woche 20: Deployment & Monitoring
├── ✅ Vercel Production Deploy
├── ✅ Environment Variables
├── ✅ Analytics Setup
├── ✅ Error Monitoring
└── ✅ Performance Monitoring
```

**✅ Phase 3 Deliverables:**
- 80%+ Test Coverage
- Lighthouse Score 95+
- Production Deployment
- Monitoring aktiv

---

## 💾 Existierende Datenbank

### 🔑 Supabase Projekt Info

```
Projekt ID: esduvfaofpaukjzzrbgh
URL: https://esduvfaofpaukjzzrbgh.supabase.co
Database: PostgreSQL mit Row Level Security (RLS)
```

### ⚠️ KRITISCH: Database Schema ZUERST überprüfen!

**VOR dem Backend-Start (Phase 2):**

```typescript
// STEP 1: Alle Tables auflisten
await mcp.supabase.list_tables({
  project_id: 'esduvfaofpaukjzzrbgh'
});

// STEP 2: Table Schema checken
await mcp.supabase.execute_sql({
  project_id: 'esduvfaofpaukjzzrbgh',
  query: `
    SELECT
      column_name,
      data_type,
      is_nullable,
      column_default
    FROM information_schema.columns
    WHERE table_name = 'events'
    ORDER BY ordinal_position;
  `
});

// STEP 3: RLS Policies prüfen
await mcp.supabase.execute_sql({
  project_id: 'esduvfaofpaukjzzrbgh',
  query: `
    SELECT * FROM pg_policies
    WHERE tablename = 'events';
  `
});

// STEP 4: Constraints checken
await mcp.supabase.execute_sql({
  project_id: 'esduvfaofpaukjzzrbgh',
  query: `
    SELECT constraint_name, constraint_type
    FROM information_schema.table_constraints
    WHERE table_name = 'events';
  `
});
```

### 📊 Bekannte Tables (VERIFIZIEREN mit MCP!)

#### **Core Tables**
```sql
-- User Management
profiles                 -- User profiles, subscription_tier, avatar_url

-- Marketplace
events                   -- Event listings
spaces                   -- Space rentals
services                 -- Service offerings
service_providers        -- Service provider profiles
service_packages         -- Service pricing tiers
bookings                 -- Universal bookings (uses bookable_type + bookable_id)
reviews                  -- Reviews (uses reviewed_id, NOT provider_id!)

-- Community
community_posts          -- Social posts with poll_data JSONB
community_stories        -- 24h stories
community_comments       -- Comments
post_reactions           -- Reactions (NOT community_reactions!)
community_mentions       -- @mentions
community_hashtags       -- #hashtags
community_poll_votes     -- Poll votes (uses option_index)
community_followers      -- Follow system
community_bookmarks      -- Saved posts

-- Content
blog_posts               -- Blog articles (status: draft/published/recovery)

-- Gamification
achievement_definitions  -- Badge definitions
user_achievements        -- User's earned badges

-- Moderation
moderation_reports       -- Content reports
trust_scores            -- User trust scoring
```

#### **Storage Buckets**
```typescript
const STORAGE_BUCKETS = {
  avatars: {
    maxSize: 5_242_880,           // 5MB
    allowed: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  },
  'event-images': {
    maxSize: 5_242_880,
    allowed: ['image/jpeg', 'image/png', 'image/webp']
  },
  'space-images': {
    maxSize: 5_242_880,
    allowed: ['image/jpeg', 'image/png', 'image/webp']
  },
  'blog-images': {
    maxSize: 5_242_880,
    allowed: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  },
  stories: {
    maxSize: 104_857_600,         // 100MB
    allowed: ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime']
  },
  videos: {
    maxSize: 524_288_000,         // 500MB
    allowed: ['video/mp4', 'video/quicktime', 'video/webm']
  },
  'service-images': {
    maxSize: 5_242_880,
    allowed: ['image/jpeg', 'image/png', 'image/webp']
  }
};
```

### 🎯 Wichtige Schema-Patterns

#### **1. Bookings Pattern (WICHTIG!)**
```sql
-- ❌ FALSCH - Separate Columns
space_id UUID
event_id UUID

-- ✅ RICHTIG - Polymorphic Pattern
bookable_type TEXT  -- 'event' | 'space' | 'service'
bookable_id UUID    -- ID des gebuchten Items
```

#### **2. Event Categories (CONSTRAINT!)**
```sql
CHECK (category IN (
  'kunst-kreativ',
  'musik-performance',
  'sport-fitness',
  'familie-kinder',
  'workshop',
  'essen-geniessen',
  'spontane-treffen',
  'party-nightlife'
))
```

#### **3. Space Types (CONSTRAINT!)**
```sql
CHECK (space_type IN (
  'tonstudio',
  'fotostudio',
  'werkstaetten',
  'kunst-toepfer',
  'popup-retail',
  'sportraeume',
  'gaming-podcast',
  'kuechen-food',
  'other'
))
```

#### **4. Poll Data Structure**
```typescript
interface PollData {
  question: string;
  options: Array<{
    text: string;
    votes: number;
  }>;
  endsAt: string;      // ISO 8601
  multiSelect: boolean;
}

// Gespeichert als JSONB in community_posts.poll_data
```

#### **5. Reviews Pattern**
```sql
-- ❌ FALSCH
provider_id UUID  -- Existiert NICHT!

-- ✅ RICHTIG
reviewed_id UUID           -- ID des bewerteten Items
review_type TEXT           -- 'event' | 'space' | 'user'
```

---

# TEIL 2: TECHNOLOGY STACK 2025

## ⚙️ Frontend Tech Stack

### Next.js 15.5 (Latest Stable)

```json
{
  "next": "^15.5.4",
  "react": "19.2.0",
  "react-dom": "19.2.0"
}
```

**Features zu verwenden:**
- ✅ App Router (NOT Pages Router!)
- ✅ Server Components (default)
- ✅ Turbopack (dev & production beta)
- ✅ Typed Routes
- ✅ Parallel Routes
- ✅ Intercepting Routes
- ✅ Server Actions
- ✅ Streaming mit Suspense

**Recherche VOR Nutzung:**
- 📖 https://nextjs.org/docs/app
- 📖 https://nextjs.org/docs/app/building-your-application/routing
- 📖 https://nextjs.org/docs/app/building-your-application/rendering

**Code Beispiel:**
```typescript
// app/events/page.tsx (Server Component)
import { EventsList } from '@/components/features/events/EventsList';

interface SearchParams {
  category?: string;
  search?: string;
}

export default async function EventsPage({
  searchParams
}: {
  searchParams: SearchParams
}): Promise<React.ReactElement> {
  // Server-side data fetching
  const events = await getEvents(searchParams);

  return (
    <main>
      <h1>Events</h1>
      <EventsList events={events} />
    </main>
  );
}
```

### TypeScript 5 (STRICT MODE!)

```json
{
  "typescript": "^5",
  "compilerOptions": {
    "strict": true,                           // ✅ MANDATORY
    "strictNullChecks": true,                 // ✅ MANDATORY
    "noImplicitAny": true,                    // ✅ MANDATORY
    "noUnusedLocals": true,                   // ✅ MANDATORY
    "noUnusedParameters": true,               // ✅ MANDATORY
    "exactOptionalPropertyTypes": true,       // ✅ MANDATORY
    "noFallthroughCasesInSwitch": true,      // ✅ MANDATORY
    "noUncheckedIndexedAccess": true         // ✅ MANDATORY
  }
}
```

**REGELN:**
1. ✅ IMMER explizite Return Types
2. ✅ NIEMALS `any` verwenden
3. ✅ IMMER null/undefined handling
4. ✅ Type Guards für Runtime Checks
5. ✅ Generics für Wiederverwendbarkeit

**Beispiele:**
```typescript
// ❌ FALSCH
function fetchEvents() {  // Kein Return Type!
  return fetch('/api/events');
}

// ✅ RICHTIG
async function fetchEvents(): Promise<Event[]> {
  const response = await fetch('/api/events');
  const data = await response.json();
  return data as Event[];
}

// ❌ FALSCH
function handleClick(e: any) {  // any!
  console.log(e.target.value);
}

// ✅ RICHTIG
function handleClick(
  e: React.MouseEvent<HTMLButtonElement>
): void {
  console.log(e.currentTarget.value);
}
```

---

## 🎨 UI Component Libraries

### shadcn/ui (CLI 3.2.0+)

**Installation:**
```bash
npx shadcn@latest init
npx shadcn@latest add button card dialog input
```

**Zu installierende Components:**
```bash
# Layout & Structure
npx shadcn@latest add accordion
npx shadcn@latest add card
npx shadcn@latest add separator
npx shadcn@latest add tabs

# Forms & Input
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add select
npx shadcn@latest add slider
npx shadcn@latest add switch
npx shadcn@latest add label

# Feedback & Overlays
npx shadcn@latest add alert
npx shadcn@latest add alert-dialog
npx shadcn@latest add dialog
npx shadcn@latest add popover
npx shadcn@latest add tooltip
npx shadcn@latest add toast
npx shadcn@latest add progress
npx shadcn@latest add skeleton

# Navigation
npx shadcn@latest add dropdown-menu
npx shadcn@latest add sheet

# Data Display
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add table
npx shadcn@latest add scroll-area

# Date & Time
npx shadcn@latest add calendar
```

**Recherche:**
- 📖 https://ui.shadcn.com/docs/components/[component-name]
- 📖 https://www.radix-ui.com/primitives/docs/overview/introduction

---

## ✨ Animation & Interaktivität

### Framer Motion

```bash
npm install framer-motion@^12.x
```

**Use Cases:**
- Page Transitions
- Card Hover Effects
- Modal Enter/Exit
- List Animations
- Scroll-triggered Animations

**Recherche VOR Nutzung:**
- 📖 https://www.framer.com/motion/
- 📖 https://www.framer.com/motion/animation/
- 📖 https://www.framer.com/motion/gestures/

**Code Patterns:**
```typescript
// Page Transition
'use client';
import { motion } from 'framer-motion';

export function PageTransition({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Card Hover
export function AnimatedCard({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}

// Stagger Children
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item.title}
    </motion.li>
  ))}
</motion.ul>
```

### GSAP (für komplexe Animationen)

```bash
npm install gsap@^3.13.0
```

**Use Cases:**
- Scroll-triggered Animations
- Timeline Sequences
- SVG Morphing
- Complex Path Animations

**Recherche:**
- 📖 https://greensock.com/docs/
- 📖 https://greensock.com/scrolltrigger/

---

## 📦 State Management & Forms

### TanStack Query (Server State)

```bash
npm install @tanstack/react-query@^5.x
```

**Use Cases:**
- API Data Fetching
- Caching
- Background Refetching
- Optimistic Updates

**Setup:**
```typescript
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,      // 1 minute
        cacheTime: 5 * 60 * 1000,  // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

**Usage Pattern:**
```typescript
// hooks/useEvents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useEvents(filters?: EventFilters) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventService.getEvents(filters),
    staleTime: 5 * 60 * 1000
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: NewEvent) => eventService.createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });
}
```

### Zustand (Client State)

```bash
npm install zustand@^5.x
```

**Use Cases:**
- UI State (modals, sidebars)
- Filters & Search
- User Preferences

**Pattern:**
```typescript
// stores/useFilterStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  category: string | null;
  priceRange: [number, number];
  setCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      category: null,
      priceRange: [0, 1000],
      setCategory: (category) => set({ category }),
      setPriceRange: (priceRange) => set({ priceRange }),
      reset: () => set({ category: null, priceRange: [0, 1000] })
    }),
    {
      name: 'filter-storage'
    }
  )
);
```

### React Hook Form + Zod

```bash
npm install react-hook-form@^7.x zod@^3.x @hookform/resolvers@^5.x
```

**Pattern:**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(3, 'Mindestens 3 Zeichen'),
  description: z.string().min(10, 'Mindestens 10 Zeichen'),
  category: z.enum([
    'kunst-kreativ',
    'musik-performance',
    // ... alle Kategorien
  ]),
  price: z.number().min(0, 'Preis muss >= 0 sein'),
  capacity: z.number().int().min(1, 'Mindestens 1 Person')
});

type EventFormData = z.infer<typeof eventSchema>;

export function CreateEventForm(): React.ReactElement {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      capacity: 10
    }
  });

  const onSubmit = async (data: EventFormData): Promise<void> => {
    try {
      await createEvent(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

---

# TEIL 3: KOMPLETTE UI/UX BESCHREIBUNG

## 🏠 Homepage (`/`) - DETAILLIERT

### Gesamtstruktur
```
┌────────────────────────────────────────────┐
│  HEADER (sticky, transparent → solid)      │
│  ┌──────┬────────┬──────────────┬────────┐│
│  │ Logo │ Events │ Spaces       │ Login  ││
│  │      │ Spaces │ Services     │ Avatar ││
│  │      │ Servi..│ Community    │        ││
│  └──────┴────────┴──────────────┴────────┘│
├────────────────────────────────────────────┤
│  HERO SECTION (Fullscreen)                │
│  ┌──────────────────────────────────────┐ │
│  │  Animated Gradient Background        │ │
│  │  + Floating Particles (GSAP)         │ │
│  │                                      │ │
│  │  "Entdecke München Live"            │ │
│  │  [Großer Text, center, animated]     │ │
│  │                                      │ │
│  │  Dein lokales Erlebnis-Netzwerk     │ │
│  │  [Subtext]                           │ │
│  │                                      │ │
│  │  ┌────────────────────────────────┐ │ │
│  │  │ 🔍 [Search Bar]          [🔎] │ │ │
│  │  └────────────────────────────────┘ │ │
│  │                                      │ │
│  │  [Events] [Räume] [Services]        │ │
│  │  (Category Pills mit Hover)          │ │
│  │                                      │ │
│  │  [Nach unten scrollen ↓]            │ │
│  └──────────────────────────────────────┘ │
├────────────────────────────────────────────┤
│  HIGHLIGHTS SECTION                        │
│  "Entdecke die Highlights" [h2]           │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  NEUESTE RÄUME (Horizontal Carousel) │ │
│  │  ← [Card] [Card] [Card] [Card] →    │ │
│  │  Auto-play + Manual Controls          │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  UPCOMING EVENTS (Horizontal)         │ │
│  │  ← [Card] [Card] [Card] [Card] →    │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  COMMUNITY CTA CARD                   │ │
│  │  "Werde Teil der Community"          │ │
│  │  [Beitreten Button]                   │ │
│  └──────────────────────────────────────┘ │
├────────────────────────────────────────────┤
│  DISCOVER SPACES                           │
│  "Räume für deine Projekte" [h2]         │
│                                            │
│  ┌────────┬────────┬────────┬────────┐   │
│  │ Ton-   │ Foto-  │ Werk-  │ Kunst  │   │
│  │ studio │ studio │ statt  │ &Töpfer│   │
│  │ [Icon] │ [Icon] │ [Icon] │ [Icon] │   │
│  │ [Img]  │ [Img]  │ [Img]  │ [Img]  │   │
│  ├────────┼────────┼────────┼────────┤   │
│  │ Popup  │ Sport- │ Gaming │ Küchen │   │
│  │ Retail │ räume  │ &Podca │ &Food  │   │
│  │ [Icon] │ [Icon] │ [Icon] │ [Icon] │   │
│  │ [Img]  │ [Img]  │ [Img]  │ [Img]  │   │
│  └────────┴────────┴────────┴────────┘   │
│  Hover: Scale(1.05) + Shadow              │
├────────────────────────────────────────────┤
│  DISCOVER SERVICES                         │
│  "Services für deine Projekte" [h2]      │
│  (Gleiche Grid-Struktur wie Spaces)       │
├────────────────────────────────────────────┤
│  DISCOVER EVENTS                           │
│  "Entdecke Events" [h2]                   │
│                                            │
│  ┌────────┬────────┬────────┬────────┐   │
│  │ Kunst  │ Musik  │ Sport  │ Familie│   │
│  │ 45     │ 32     │ 28     │ 19     │   │
│  │ Events │ Events │ Events │ Events │   │
│  └────────┴────────┴────────┴────────┘   │
│  (Event Count wird live geladen)          │
├────────────────────────────────────────────┤
│  HOW IT WORKS                              │
│  "In 3 Schritten zum Erlebnis" [h2]      │
│                                            │
│  ┌──────────┐    ┌──────────┐    ┌──────┐│
│  │    1     │    │    2     │    │  3   ││
│  │  🔍      │ →  │  📅      │ →  │  🎉  ││
│  │Entdecken │    │  Buchen  │    │Erleben││
│  │          │    │          │    │      ││
│  │[Text]    │    │[Text]    │    │[Text]││
│  └──────────┘    └──────────┘    └──────┘│
├────────────────────────────────────────────┤
│  FOOTER                                    │
│  ┌──────────────────────────────────────┐ │
│  │ [5-Column Layout]                     │ │
│  │ Col 1: Logo + Newsletter + Social     │ │
│  │ Col 2: Unternehmen Links              │ │
│  │ Col 3: Entdecke Links                 │ │
│  │ Col 4: Support + Gastgeber            │ │
│  │ Col 5: Länder (Collapsible)           │ │
│  │                                       │ │
│  │ Payment Methods Icons:                │ │
│  │ [Visa] [MC] [PayPal] [Apple] [Google]│ │
│  │                                       │ │
│  │ © 2025 Nowtown • info@nowtown.co     │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

### Komponenten benötigt
```typescript
// Layout
Header.tsx                 // Sticky header mit Glasmorphism
Footer.tsx                 // 5-column responsive footer
LoginModalTrigger.tsx      // Modal trigger component

// Hero
HeroSection.tsx            // Fullscreen hero mit Animations
  └─ AnimatedGradient.tsx  // GSAP gradient animation
  └─ FloatingParticles.tsx // GSAP particle system
  └─ SearchBar.tsx         // Expandable search
  └─ CategoryPills.tsx     // Filter pills

// Highlights
HighlightsSection.tsx      // Container
  └─ SpacesCarousel.tsx    // Horizontal scroll carousel
  └─ EventsCarousel.tsx    // Event cards carousel
  └─ CommunityCTA.tsx      // CTA card

// Discovery
DiscoverSpaces.tsx         // 4x2 category grid
  └─ CategoryCard.tsx      // Animated card component
DiscoverServices.tsx       // Same as spaces
DiscoverEvents.tsx         // Event categories with counts

// How It Works
HowItWorks.tsx             // 3-step process
  └─ StepCard.tsx          // Individual step
```

### Interaktionen

**Header:**
- Scroll down: transparent → solid background (transition)
- Logo: Links zu Homepage
- Menü: Hover zeigt Dropdown
- Login: Opens modal (nicht separate page!)
- Mobile: Burger menu

**Hero:**
- Gradient: Animated (GSAP timeline)
- Particles: Float animation
- Search Bar: Focus → Expand width
- Category Pills: Click → Navigate to filtered page
- Scroll Indicator: Smooth scroll to Highlights

**Carousels:**
- Auto-play: 3s interval
- Manual controls: ← → buttons
- Touch/Swipe: Drag to scroll
- Hover: Pause auto-play

**Category Cards:**
- Hover: Scale(1.05) + Shadow
- Click: Navigate to category page
- Image: Lazy load mit Blur placeholder

**How It Works:**
- Scroll into view: Fade in animation
- Icons: Animated entrance (stagger)

---

## 🎉 Events Seite (`/events`) - DETAILLIERT

### Layout
```
┌────────────────────────────────────────────┐
│  HEADER (sticky)                           │
├───────┬────────────────────────────────────┤
│ LEFT  │  MAIN CONTENT                      │
│ SIDE  │                                    │
│ BAR   │  ┌─────────────────────────────┐  │
│       │  │ VIEW TOGGLE: [Map] [List]   │  │
│ ┌───┐ │  └─────────────────────────────┘  │
│ │🔍 │ │                                    │
│ │   │ │  ═══ MAP VIEW ═══                 │
│ └───┘ │  ┌─────────────────────────────┐  │
│       │  │                             │  │
│ ┌───┐ │  │  GOOGLE MAPS                │  │
│ │CAT│ │  │  mit Event Markern          │  │
│ │   │ │  │                             │  │
│ │☑K │ │  │  Marker Clustering          │  │
│ │☐M │ │  │  bei Zoom out               │  │
│ │☐S │ │  │                             │  │
│ └───┘ │  │  Popup on Marker Click      │  │
│       │  │  zeigt Event Preview         │  │
│ ┌───┐ │  │                             │  │
│ │DAT│ │  └─────────────────────────────┘  │
│ │   │ │                                    │
│ │[📅]│ │  ODER                             │
│ └───┘ │                                    │
│       │  ═══ LIST VIEW ═══                │
│ ┌───┐ │  ┌──────────────────────────────┐ │
│ │PRI│ │  │ EVENT CARD                   │ │
│ │   │ │  │ [Image] Title                │ │
│ │[▬▬]│ │  │ 📅 Datum • 📍 Ort           │ │
│ └───┘ │  │ €12/Person • ❤️ [Book]      │ │
│       │  ├──────────────────────────────┤ │
│ ┌───┐ │  │ EVENT CARD                   │ │
│ │CAP│ │  │ ...                          │ │
│ │   │ │  ├──────────────────────────────┤ │
│ │[▬▬]│ │  │ EVENT CARD                   │ │
│ └───┘ │  │ ...                          │ │
│       │  └──────────────────────────────┘ │
│ [RST] │  [Load More...] (Infinite Scroll) │
└───────┴────────────────────────────────────┘
```

### Filter Sidebar (Links)

**Komponenten:**
```typescript
EventsFilterSidebar.tsx
├─ SearchInput.tsx           // Event search
├─ CategoryFilter.tsx        // Multi-select checkboxes
│  ├─ ☑ Kunst & Kreatives
│  ├─ ☐ Musik & Performance
│  ├─ ☐ Sport & Fitness
│  ├─ ☐ Familie & Kinder
│  ├─ ☐ Workshop
│  ├─ ☐ Essen & Genießen
│  ├─ ☐ Spontane Treffen
│  └─ ☐ Party & Nightlife
├─ DateRangeFilter.tsx       // Calendar picker
│  └─ [Start Date] - [End Date]
├─ PriceRangeFilter.tsx      // Dual slider
│  └─ €0 [▬▬▬▬▬▬▬▬] €100
├─ CapacityFilter.tsx        // Slider
│  └─ 1 [▬▬▬▬▬▬▬▬] 100+ Personen
└─ ResetButton.tsx           // Clear all filters
```

**Filter Logik:**
- Filter werden in URL Query Params gespeichert
- Änderung triggert sofortige Suche
- Loading State während Filter
- Filter Count Badge im Button

**URL Pattern:**
```
/events?category=musik-performance&price=0-50&date=2025-10-10
```

### Map View

**Google Maps Integration:**
```typescript
// components/features/events/EventMapGoogle.tsx
'use client';

import { GoogleMap, useLoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import type { Event } from '@/types/database';

interface EventMapProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export function EventMapGoogle({ events, onEventClick }: EventMapProps): React.ReactElement {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places', 'marker']
  });

  if (!isLoaded) return <MapSkeleton />;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '600px' }}
      center={{ lat: 48.1351, lng: 11.5820 }} // München
      zoom={12}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        fullscreenControl: true
      }}
    >
      <MarkerClusterer>
        {(clusterer) =>
          events.map((event) => (
            <Marker
              key={event.id}
              position={{
                lat: event.location.lat,
                lng: event.location.lng
              }}
              clusterer={clusterer}
              onClick={() => onEventClick(event)}
              icon={{
                url: getCategoryIcon(event.category),
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
}
```

**Marker Features:**
- Clustering: Automatisch bei Zoom out
- Custom Icons: Pro Kategorie
- Click: Zeigt Event Preview Popup
- Hover: Highlight effect

### List View

**Event Card Design:**
```
┌────────────────────────────────────────┐
│ ┌──────┐  EVENT TITLE                 │
│ │      │  ★★★★☆ 4.5 (23 Reviews)     │
│ │ IMG  │                              │
│ │ 16:9 │  📅 Fr, 10. Okt • 20:00 Uhr │
│ │      │  📍 Glockenbach, München     │
│ └──────┘                              │
│                                        │
│ Description preview (max 2 lines)...   │
│                                        │
│ 👥 15/30 Teilnehmer                   │
│ €12/Person                             │
│                                        │
│ ❤️ [Save] [Details →] [Quick Book]   │
└────────────────────────────────────────┘
```

**Card Features:**
- Hover: Shadow + Scale animation
- Click anywhere: Navigate to detail
- Save button: Optimistic UI update
- Quick Book: Open booking modal

### Infinite Scroll
```typescript
// hooks/useInfiniteEvents.ts
import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteEvents(filters: EventFilters) {
  return useInfiniteQuery({
    queryKey: ['events', 'infinite', filters],
    queryFn: ({ pageParam = 0 }) =>
      eventService.getEvents({ ...filters, offset: pageParam, limit: 12 }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 12 ? allPages.length * 12 : undefined,
    staleTime: 5 * 60 * 1000
  });
}
```

### Real-time Updates
```typescript
// Neue Events erscheinen automatisch
useEffect(() => {
  const channel = supabase
    .channel('events')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'events'
    }, (payload) => {
      queryClient.setQueryData(['events'], (old) =>
        [payload.new, ...old]
      );
    })
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);
```

---

Soll ich weitermachen mit den detaillierten Beschreibungen aller 57 Seiten? Das wird sehr umfangreich. Möchtest du dass ich:

1. ✅ Alle 57 Seiten in separaten Markdown-Dateien erstelle?
2. ✅ Oder alles in eine sehr lange Datei packe?
3. ✅ Oder nur die komplexesten Seiten (Community, Dashboard, Blog) detailliert beschreibe?

Lass mich wissen wie du es am besten haben möchtest! 🚀
## 🎉 Event Detail Seite (`/events/[id]`) - ULTRA-DETAILLIERT

### Komplette Layout-Struktur
```
┌─────────────────────────────────────────────────────────┐
│  HEADER (sticky)                                        │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐ │
│  │  IMAGE GALLERY (Image Swiper)                     │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │                                             │ │ │
│  │  │         MAIN IMAGE (16:9)                   │ │ │
│  │  │                                             │ │ │
│  │  │  ← →  [1/5]  👁️ View All Photos           │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │  Thumbnails: [img] [img] [img] [img] [img]      │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌────────────────────────┬──────────────────────────┐ │
│  │   MAIN CONTENT (Left)  │  RIGHT SIDEBAR (sticky)  │ │
│  │                        │                          │ │
│  │  EVENT TITLE (h1)      │  ┌────────────────────┐ │ │
│  │  Large, bold           │  │ BOOKING CARD       │ │ │
│  │                        │  │                    │ │ │
│  │  ★★★★☆ 4.5 (23)      │  │ €12 / Person       │ │ │
│  │  📍 Glockenbach       │  │                    │ │ │
│  │  Hosted by @username   │  │ 📅 Select Date:   │ │ │
│  │  [Follow]              │  │ [Calendar Picker]  │ │ │
│  │                        │  │                    │ │ │
│  │  ─────────────────     │  │ 👥 Guests:        │ │ │
│  │                        │  │ [- 2 +]            │ │ │
│  │  📅 EVENT INFO         │  │                    │ │ │
│  │  Freitag, 10. Okt     │  │ Subtotal: €24      │ │ │
│  │  20:00 - 23:00 Uhr    │  │ Service Fee: €2    │ │ │
│  │  (3 Stunden)          │  │ ───────────        │ │ │
│  │                        │  │ Total: €26         │ │ │
│  │  👥 CAPACITY           │  │                    │ │ │
│  │  15 / 30 gebucht      │  │ [Book Now 🎉]     │ │ │
│  │  [Progress Bar]        │  │                    │ │ │
│  │  ⏰ 15 Plätze frei    │  │ Free cancellation  │ │ │
│  │                        │  │ until 24h before   │ │ │
│  │  ─────────────────     │  └────────────────────┘ │ │
│  │                        │                          │ │
│  │  📍 LOCATION           │  ┌────────────────────┐ │ │
│  │  Glockenbachviertel   │  │ HOST INFO          │ │ │
│  │  Müllerstraße 12      │  │ ┌───────┐          │ │ │
│  │  80469 München        │  │ │ [Ava] │          │ │ │
│  │                        │  │ └───────┘          │ │ │
│  │  ─────────────────     │  │ @maxmustermann     │ │ │
│  │                        │  │ ★★★★★ 5.0        │ │ │
│  │  📝 DESCRIPTION        │  │ Host since 2024    │ │ │
│  │  Ein unvergesslicher  │  │                    │ │ │
│  │  Abend mit Live-Musik │  │ 45 Events hosted   │ │ │
│  │  und großartiger      │  │ 230 Reviews        │ │ │
│  │  Atmosphäre. Wir...   │  │                    │ │ │
│  │  [Read more...]       │  │ [Message Host]     │ │ │
│  │                        │  │ [View Profile]     │ │ │
│  │  ─────────────────     │  └────────────────────┘ │ │
│  │                        │                          │ │
│  │  ✨ AMENITIES          │  ┌────────────────────┐ │ │
│  │  ✓ WiFi verfügbar     │  │ SHARE & SAVE       │ │ │
│  │  ✓ Getränke inklusive │  │                    │ │ │
│  │  ✓ Garderobe          │  │ [🔗] [❤️] [📤]   │ │ │
│  │  ✓ Barrierearm        │  │                    │ │ │
│  │  ✓ Parkplätze         │  │ Share via:         │ │ │
│  │                        │  │ [FB] [X] [WhatsApp]│ │ │
│  │  ─────────────────     │  └────────────────────┘ │ │
│  │                        │                          │ │
│  │  🗺️ LOCATION MAP       │  ┌────────────────────┐ │ │
│  │  ┌──────────────────┐ │  │ SAFETY INFO        │ │ │
│  │  │                  │ │  │                    │ │ │
│  │  │  Google Map      │ │  │ ✓ Verified Host    │ │ │
│  │  │  with Marker     │ │  │ ✓ Secure Payment   │ │ │
│  │  │                  │ │  │ ✓ 24/7 Support     │ │ │
│  │  └──────────────────┘ │  │ ✓ Refund Policy    │ │ │
│  │  [Get Directions]     │  └────────────────────┘ │ │
│  │                        │                          │ │
│  │  ─────────────────     │                          │ │
│  │                        │                          │ │
│  │  📋 WHAT TO BRING      │                          │ │
│  │  • Gute Laune         │                          │ │
│  │  • Personalausweis    │                          │ │
│  │                        │                          │ │
│  │  ─────────────────     │                          │ │
│  │                        │                          │ │
│  │  ⚠️ IMPORTANT INFO     │                          │ │
│  │  • Mindestalter: 18   │                          │ │
│  │  • Kein Rauchen       │                          │ │
│  │                        │                          │ │
│  └────────────────────────┴──────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  💬 REVIEWS SECTION                               │ │
│  │                                                   │ │
│  │  ★★★★☆ 4.5 • 23 Reviews                         │ │
│  │                                                   │ │
│  │  Rating Breakdown:                                │ │
│  │  ★★★★★ ████████████████ 65% (15)                │ │
│  │  ★★★★☆ ██████ 30% (7)                           │ │
│  │  ★★★☆☆ █ 5% (1)                                 │ │
│  │  ★★☆☆☆ 0% (0)                                   │ │
│  │  ★☆☆☆☆ 0% (0)                                   │ │
│  │                                                   │ │
│  │  ─────────────────────────────────────────       │ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐│ │
│  │  │ [Avatar] Anna M. • 2 days ago ★★★★★        ││ │
│  │  │                                             ││ │
│  │  │ "Absolut fantastisch! Die Atmosphäre war   ││ │
│  │  │ unglaublich und der Host super freundlich. ││ │
│  │  │ Kann ich nur empfehlen!"                    ││ │
│  │  │                                             ││ │
│  │  │ 👍 Helpful (12) • [Report]                  ││ │
│  │  └─────────────────────────────────────────────┘│ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐│ │
│  │  │ [Avatar] Tom K. • 1 week ago ★★★★☆         ││ │
│  │  │                                             ││ │
│  │  │ "Sehr gut organisiert. Einzig die Musik    ││ │
│  │  │ hätte etwas leiser sein können."           ││ │
│  │  │                                             ││ │
│  │  │ 👍 Helpful (8) • [Report]                   ││ │
│  │  └─────────────────────────────────────────────┘│ │
│  │                                                   │ │
│  │  [Load More Reviews...]                           │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  🔥 SIMILAR EVENTS                                │ │
│  │  "Dir könnte auch gefallen"                       │ │
│  │                                                   │ │
│  │  ← [Card] [Card] [Card] [Card] →                │ │
│  │  Horizontal Scroll Carousel                       │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  ❓ FREQUENTLY ASKED QUESTIONS                    │ │
│  │                                                   │ │
│  │  [▼] Kann ich stornieren?                        │ │
│  │  [▼] Gibt es Parkplätze?                         │ │
│  │  [▼] Ist das Event barrierefrei?                 │ │
│  │  [▼] Kann ich Freunde mitbringen?                │ │
│  └───────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Komponenten für Event Detail

```typescript
// components/features/events/EventDetailPage.tsx
EventDetailPage.tsx
├─ ImageGallery.tsx           // Swiper mit Lightbox
│  ├─ MainImage.tsx            // Hauptbild
│  ├─ ThumbnailStrip.tsx       // Thumbnail-Leiste
│  └─ Lightbox.tsx             // Vollbild-Ansicht
│
├─ EventHeader.tsx            // Titel, Rating, Location
│  ├─ EventTitle.tsx
│  ├─ RatingDisplay.tsx        // ★★★★☆ 4.5 (23)
│  └─ HostInfo.tsx             // @username [Follow]
│
├─ EventDetails.tsx           // Main content area
│  ├─ EventInfoSection.tsx     // Datum, Zeit, Kapazität
│  ├─ LocationSection.tsx      // Adresse + Map
│  ├─ DescriptionSection.tsx   // Beschreibung
│  ├─ AmenitiesSection.tsx     // Features/Amenities
│  ├─ WhatToBring.tsx          // Was mitbringen
│  └─ ImportantInfo.tsx        // Wichtige Hinweise
│
├─ BookingCard.tsx (Sidebar)  // Sticky booking widget
│  ├─ PriceDisplay.tsx         // €12 / Person
│  ├─ DatePicker.tsx           // Calendar
│  ├─ GuestSelector.tsx        // +/- Guest count
│  ├─ PriceBreakdown.tsx       // Subtotal, Fees
│  └─ BookButton.tsx           // Primary CTA
│
├─ HostCard.tsx (Sidebar)     // Host information
│  ├─ HostAvatar.tsx
│  ├─ HostStats.tsx            // Events, Reviews
│  ├─ MessageButton.tsx        // Contact host
│  └─ ViewProfileButton.tsx
│
├─ ShareSaveCard.tsx (Sidebar) // Share & Save
│  ├─ ShareButtons.tsx         // Social sharing
│  └─ SaveButton.tsx           // Add to wishlist
│
├─ SafetyCard.tsx (Sidebar)   // Safety info
│
├─ ReviewsSection.tsx         // Reviews display
│  ├─ RatingBreakdown.tsx      // Star distribution
│  ├─ ReviewCard.tsx           // Individual review
│  ├─ ReviewFilters.tsx        // Sort/Filter reviews
│  └─ WriteReviewButton.tsx    // For past attendees
│
├─ SimilarEvents.tsx          // Recommendations
│  └─ EventCarousel.tsx
│
└─ FAQSection.tsx             // Accordion FAQs
```

### Interaktionen & Funktionalität

**Image Gallery:**
- Click: Open lightbox
- Swipe: Navigate images
- Thumbnails: Click to select
- Keyboard: Arrow keys navigation
- Close lightbox: ESC key

**Booking Flow:**
1. Select Date → Check availability
2. Select Guests → Update price
3. Review Total → See breakdown
4. Click "Book Now" → Open payment modal
5. Enter payment details → Process
6. Confirmation → Email + Dashboard entry

**Real-time Availability:**
```typescript
// Update capacity in real-time
useEffect(() => {
  const channel = supabase
    .channel(`event:${eventId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'bookings',
      filter: `bookable_id=eq.${eventId}`
    }, (payload) => {
      // Update available spots
      setAvailableSpots(prev => prev - payload.new.guests);
    })
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [eventId]);
```

**Host Contact:**
- Message button → Opens chat modal
- Real-time messaging using Supabase Realtime Broadcast
- Message history persisted in database
- Typing indicators via Presence

**Reviews:**
- Only past attendees can review
- 1-5 star rating required
- Optional comment (min 10 characters)
- Can upload images
- "Helpful" voting system
- Report inappropriate reviews

---

## 🏢 Spaces Seite (`/spaces`) - DETAILLIERT

**Gleiche Struktur wie Events, aber mit unterschiedlichen Filtern:**

### Filter Sidebar (Spaces-spezifisch)

```typescript
SpacesFilterSidebar.tsx
├─ SearchInput.tsx
├─ SpaceTypeFilter.tsx        // Checkboxes
│  ├─ ☐ Tonstudio
│  ├─ ☐ Fotostudio
│  ├─ ☐ Werkstätten
│  ├─ ☐ Kunst & Töpferstudio
│  ├─ ☐ Popup & Retail
│  ├─ ☐ Sporträume
│  ├─ ☐ Gaming & Podcast
│  ├─ ☐ Küchen & Food Spaces
│  └─ ☐ Sonstiges
├─ PriceRangeFilter.tsx       // Hourly rate slider
│  └─ €10/h [▬▬▬▬] €200/h
├─ CapacityFilter.tsx         // People slider
├─ SizeFilter.tsx             // Square meters
│  └─ 10m² [▬▬▬▬] 500m²
├─ AmenitiesFilter.tsx        // Multi-select
│  ├─ ☐ WiFi
│  ├─ ☐ Parkplatz
│  ├─ ☐ Küche
│  ├─ ☐ Equipment included
│  ├─ ☐ 24/7 Access
│  └─ ☐ Barrierearm
├─ AvailabilityCalendar.tsx   // Weekly schedule
│  └─ Show spaces available in selected time
└─ InstantBookFilter.tsx      // Toggle
   └─ ☑ Nur Instant Booking
```

### Space Detail Seite (`/spaces/[id]`)

**Zusätzliche Sections (vs Events):**
```
├─ AvailabilityCalendar.tsx   // Interactive booking calendar
│  └─ Shows hourly availability
├─ EquipmentList.tsx          // Included equipment
├─ HouseRules.tsx             // Space rules
├─ PricingTable.tsx           // Hourly/Daily rates
└─ BookingDuration.tsx        // Select hours/days
```

**Pricing Display:**
```
┌────────────────────────────┐
│ PRICING                    │
│                            │
│ Hourly Rate:  €25/Stunde  │
│ Daily Rate:   €150/Tag    │
│ Weekly Rate:  €900/Woche  │
│                            │
│ Discounts:                 │
│ • 10% off for 4+ hours    │
│ • 20% off for full day    │
└────────────────────────────┘
```

---

## 💼 Services Seite (`/services`) - DETAILLIERT

### Layout mit Service-spezifischen Features

```
┌─────────────────────────────────────────────┐
│  HEADER                                     │
├─────────────────────────────────────────────┤
│  CATEGORY TABS (Horizontal Scroll)          │
│  [All] [Foto] [Music] [Sport] [Workshop]   │
│  Unterstreichen wenn aktiv                  │
├─────────────────────────────────────────────┤
│  ┌────────┬─────────────────┬────────────┐ │
│  │FILTERS │  SERVICE GRID   │  SIDEBAR   │ │
│  │ [📱]  │                 │            │ │
│  │Mobile  │  ┌───┬───┬───┐ │ TOP        │ │
│  │Drawer  │  │ S │ S │ S │ │ PROVIDERS  │ │
│  │        │  ├───┼───┼───┤ │            │ │
│  │        │  │ S │ S │ S │ │ 🥇 @user1 │ │
│  │        │  ├───┼───┼───┤ │ 🥈 @user2 │ │
│  │        │  │ S │ S │ S │ │ 🥉 @user3 │ │
│  │        │  └───┴───┴───┘ │            │ │
│  │        │  [Load More...] │ CATEGORIES │ │
│  │        │                 │ Musik (45) │ │
│  │        │                 │ Photo (32) │ │
│  └────────┴─────────────────┴────────────┘ │
└─────────────────────────────────────────────┘
```

### Service Card Design

```
┌──────────────────────────────────┐
│ ┌────┐  @username              │
│ │Ava │  ★★★★★ 5.0 (47)        │
│ └────┘  Professional Fotograf   │
│                                  │
│ FOTOGRAFIE SERVICE               │
│                                  │
│ [Image showing work example]     │
│                                  │
│ 📸 Porträt • Event • Hochzeit   │
│ 📍 München                       │
│                                  │
│ PACKAGES:                        │
│ • Basic: €99                     │
│ • Standard: €199                 │
│ • Premium: €399                  │
│                                  │
│ [View Details] [Contact]         │
└──────────────────────────────────┘
```

### Service Detail Seite (`/services/[id]`)

```
┌─────────────────────────────────────────────┐
│  SERVICE DETAIL                             │
│  ┌─────────────────────┬─────────────────┐ │
│  │ LEFT CONTENT        │ RIGHT SIDEBAR   │ │
│  │                     │                 │ │
│  │ [Portfolio Images]  │ CONTACT CARD    │ │
│  │ Image Gallery       │ [Avatar]        │ │
│  │                     │ @username       │ │
│  │ SERVICE TITLE       │ ★★★★★ 5.0     │ │
│  │ Professional...     │ 47 Reviews      │ │
│  │                     │ Response: 1h    │ │
│  │ ABOUT SERVICE       │                 │ │
│  │ Description...      │ [Message]       │ │
│  │                     │ [Book Service]  │ │
│  │ PACKAGES            │                 │ │
│  │ ┌────────────────┐ │ AVAILABILITY    │ │
│  │ │ BASIC €99      │ │ Mo-Fr 9-18     │ │
│  │ │ • 1 Stunde     │ │ Sa 10-14       │ │
│  │ │ • 10 Bilder    │ │ So Geschlossen │ │
│  │ │ • Basic Edit   │ │                 │ │
│  │ │ [Select]       │ │ LANGUAGES       │ │
│  │ └────────────────┘ │ 🇩🇪 Deutsch    │ │
│  │                     │ 🇬🇧 English    │ │
│  │ ┌────────────────┐ │                 │ │
│  │ │ STANDARD €199  │ │ VERIFIED        │ │
│  │ │ • 2 Stunden    │ │ ✓ ID Verified  │ │
│  │ │ • 30 Bilder    │ │ ✓ Portfolio    │ │
│  │ │ • Pro Edit     │ │ ✓ Insurance    │ │
│  │ │ [Select]       │ │                 │ │
│  │ └────────────────┘ │                 │ │
│  │                     │                 │ │
│  │ ┌────────────────┐ │                 │ │
│  │ │ PREMIUM €399   │ │                 │ │
│  │ │ • 4 Stunden    │ │                 │ │
│  │ │ • 100 Bilder   │ │                 │ │
│  │ │ • Premium Edit │ │                 │ │
│  │ │ • 2nd Shooter  │ │                 │ │
│  │ │ [Select]       │ │                 │ │
│  │ └────────────────┘ │                 │ │
│  │                     │                 │ │
│  │ REVIEWS             │                 │ │
│  │ [Review Cards...]   │                 │ │
│  └─────────────────────┴─────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 👥 Community Seite (`/community`) - ULTRA-KOMPLEX!

### Vollständige 3-Column Layout Struktur

```
┌────────────────────────────────────────────────────────────────────┐
│  HEADER (sticky)                                                   │
├────┬───────────────────────────────────────────────────────┬───────┤
│LEFT│              CENTER FEED                              │ RIGHT │
│250px│                                                       │280px  │
│    │                                                       │       │
│ MY │  ═══ STORIES BAR (Horizontal Scroll) ═══            │TREND  │
│MENU│  ┌──┬──┬──┬──┬──┬──┬──┬──┐                         │COMMS  │
│    │  │+ │👤│👤│👤│👤│👤│👤│👤│ ←→                      │       │
│Feed│  └──┴──┴──┴──┴──┴──┴──┴──┘                         │┌────┐│
│Comm│  Your Story      Following                           ││Art │││
│Even│                                                       ││234👥││
│Save│  ═══ CREATE POST BOX ═══                            │├────┤││
│Lead│  ┌───────────────────────────────────────────────┐ ││Music││
│    │  │ 👤 What's happening, @username?               │ ││156👥││
│────│  │ ┌─────────────────────────────────────────┐   │ │└────┘││
│    │  │ │ [Text Input - Expandable]               │   │ │      ││
│MY  │  │ │ Type @ for mentions, # for hashtags     │   │ │SUGGE ││
│COMM│  │ └─────────────────────────────────────────┘   │ │STED  ││
│    │  │                                               │ │      ││
│Art │  │ 📷 Image  📊 Poll  📍 Location  😊 Emoji    │ │┌────┐││
│Musi│  │                           [Post] [Schedule]  │ ││@usr1││
│[+] │  └───────────────────────────────────────────────┘ ││Fllw │││
│    │                                                       │├────┤││
│    │  ═══ FEED FILTERS ═══                                ││@usr2││
│    │  [For You] [Following] [Trending] [Communities]      ││Fllw │││
│    │                                                       │└────┘││
│    │  ═══ POSTS FEED (Infinite Scroll) ═══               │      ││
│    │  ┌───────────────────────────────────────────────┐ │ACTIVE││
│    │  │ 👤 @johndoe • 2h ago • 🌍 Public            │ │NOW   ││
│    │  │    [... Follow]                               │ │      ││
│    │  │                                               │ │🟢@us3││
│    │  │ Just had an amazing experience at the new    │ │🟢@us4││
│    │  │ art gallery! #MunichArt @galleryname 🎨     │ │🟢@us5││
│    │  │                                               │ │      ││
│    │  │ [Image Grid - 2x2 if 4 images]              │ │      ││
│    │  │ ┌─────┬─────┐                                │ │      ││
│    │  │ │ IMG │ IMG │                                │ │      ││
│    │  │ ├─────┼─────┤                                │ │      ││
│    │  │ │ IMG │ IMG │                                │ │      ││
│    │  │ └─────┴─────┘                                │ │      ││
│    │  │                                               │ │      ││
│    │  │ ❤️ 24  💬 5  🔄 3  🔖 Save  📤 Share       │ │      ││
│    │  │                                               │ │      ││
│    │  │ 💬 Comments (5)                               │ │      ││
│    │  │ @user1: Great photos! 🔥                     │ │      ││
│    │  │ @user2: I was there too!                     │ │      ││
│    │  │ [View all comments...]                        │ │      ││
│    │  └───────────────────────────────────────────────┘ │      ││
│    │                                                       │      ││
│    │  ┌───────────────────────────────────────────────┐ │      ││
│    │  │ 👤 @janedoe • 4h ago • 👥 Art Community      │ │      ││
│    │  │    [... Following]                            │ │      ││
│    │  │                                               │ │      ││
│    │  │ 📊 POLL: What's the best art venue?          │ │      ││
│    │  │                                               │ │      ││
│    │  │ ○ Gallery A (45%) ████████                  │ │      ││
│    │  │ ○ Museum B (35%) ██████                     │ │      ││
│    │  │ ○ Studio C (20%) ████                       │ │      ││
│    │  │                                               │ │      ││
│    │  │ 50 votes • 2h left to vote                   │ │      ││
│    │  │                                               │ │      ││
│    │  │ ❤️ 12  💬 8  🔄 1  🔖  📤                    │ │      ││
│    │  └───────────────────────────────────────────────┘ │      ││
│    │                                                       │      ││
│    │  [Loading more posts...]                             │      ││
│    │                                                       │      ││
└────┴───────────────────────────────────────────────────────┴───────┘
```

### Left Sidebar - Navigation

```typescript
CommunityLeftSidebar.tsx
├─ NavigationMenu.tsx
│  ├─ FeedLink.tsx              // 🏠 Feed (default)
│  ├─ CommunitiesLink.tsx       // 👥 Communities
│  ├─ EventsLink.tsx            // 🎉 Events
│  ├─ SavedLink.tsx             // 🔖 Saved
│  └─ LeaderboardLink.tsx       // 🏆 Leaderboard
│
├─ MyCommunitiesSection.tsx
│  ├─ CommunityListItem.tsx     // Each community
│  │  ├─ [Icon] Community Name
│  │  └─ Click to filter feed
│  └─ CreateCommunityButton.tsx // + Create new
│
└─ QuickActions.tsx
   └─ [+ Create Post] Button
```

### Center Feed - Main Content

```typescript
CommunityFeed.tsx
├─ StoriesBar.tsx                    // Horizontal scroll stories
│  ├─ YourStoryPlus.tsx              // + Add story
│  ├─ StoryCircle.tsx                // User story circles
│  │  ├─ Avatar with gradient ring
│  │  ├─ Username below
│  │  └─ Click → StoryViewer modal
│  └─ StoryViewer.tsx                // Full-screen story view
│     ├─ Tap left/right to navigate
│     ├─ Progress bars at top
│     ├─ Reply input at bottom
│     └─ Auto-advance after 5s
│
├─ CreatePostBox.tsx                 // Post creation
│  ├─ TextInput.tsx                  // Expandable textarea
│  │  ├─ @ for mentions (autocomplete)
│  │  ├─ # for hashtags (suggestions)
│  │  └─ Character count (max 5000)
│  ├─ MediaUploader.tsx              // Image/Video upload
│  │  ├─ Drag & drop zone
│  │  ├─ Max 10 images OR 1 video
│  │  └─ Preview with remove button
│  ├─ PollCreator.tsx                // Create poll
│  │  ├─ Question input
│  │  ├─ 2-4 option inputs
│  │  ├─ Duration selector
│  │  └─ Multi-select toggle
│  ├─ LocationPicker.tsx             // Add location
│  │  └─ Google Places autocomplete
│  ├─ EmojiPicker.tsx                // Emoji selector
│  └─ PostActions.tsx
│     ├─ [Post] Button (primary)
│     ├─ [Schedule] Button
│     └─ Privacy selector
│
├─ FeedFilters.tsx                   // Tab navigation
│  ├─ ForYouTab.tsx                  // Algorithm
│  ├─ FollowingTab.tsx               // Following only
│  ├─ TrendingTab.tsx                // Hot posts
│  └─ CommunitiesTab.tsx             // Communities only
│
└─ PostsFeed.tsx                     // Infinite scroll
   ├─ FeedPost.tsx                   // Regular post
   │  ├─ PostHeader.tsx
   │  │  ├─ UserAvatar.tsx
   │  │  ├─ Username + Timestamp
   │  │  ├─ Privacy icon
   │  │  ├─ [Follow] Button
   │  │  └─ [...] Menu
   │  ├─ PostContent.tsx
   │  │  ├─ Text with @mentions highlighted
   │  │  ├─ #hashtags clickable
   │  │  └─ [Read more] if truncated
   │  ├─ PostMedia.tsx
   │  │  ├─ ImageGrid.tsx (1-4 images)
   │  │  └─ VideoPlayer.tsx
   │  ├─ PostEngagement.tsx
   │  │  ├─ LikeButton.tsx     // ❤️ with count
   │  │  ├─ CommentButton.tsx  // 💬 with count
   │  │  ├─ RepostButton.tsx   // 🔄 with count
   │  │  ├─ BookmarkButton.tsx // 🔖 Save
   │  │  └─ ShareButton.tsx    // 📤 Share
   │  └─ CommentsPreview.tsx
   │     ├─ Show first 2 comments
   │     └─ [View all X comments]
   │
   ├─ PollPost.tsx                   // Poll variation
   │  ├─ PostHeader.tsx (same)
   │  ├─ PollContent.tsx
   │  │  ├─ Question
   │  │  ├─ PollOption.tsx (each option)
   │  │  │  ├─ Radio/Checkbox
   │  │  │  ├─ Option text
   │  │  │  ├─ Vote percentage bar
   │  │  │  └─ Vote count
   │  │  ├─ Total votes
   │  │  ├─ Time remaining
   │  │  └─ [Vote] Button
   │  └─ PostEngagement.tsx (same)
   │
   └─ LoadMoreTrigger.tsx            // Intersection observer
```

### Right Sidebar - Discovery

```typescript
CommunityRightSidebar.tsx
├─ TrendingCommunities.tsx
│  └─ CommunityCard.tsx
│     ├─ Community icon
│     ├─ Community name
│     ├─ Member count
│     └─ [Join] Button
│
├─ SuggestedUsers.tsx
│  └─ UserSuggestionCard.tsx
│     ├─ Avatar
│     ├─ Username
│     ├─ Bio (truncated)
│     ├─ Mutual connections
│     └─ [Follow] Button
│
└─ ActiveNow.tsx
   └─ ActiveUserItem.tsx
      ├─ 🟢 Online indicator
      ├─ Avatar (small)
      └─ Username
```

### Real-time Features Implementation

**1. Live Post Updates (Postgres Changes):**
```typescript
// hooks/useRealtimePosts.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useRealtimePosts(communityId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('community-posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_posts',
          filter: communityId ? `community_id=eq.${communityId}` : undefined
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            queryClient.setQueryData(['posts'], (old: any) => 
              [payload.new, ...(old || [])]
            );
          } else if (payload.eventType === 'UPDATE') {
            queryClient.setQueryData(['posts'], (old: any) =>
              old?.map((post: any) =>
                post.id === payload.new.id ? payload.new : post
              )
            );
          } else if (payload.eventType === 'DELETE') {
            queryClient.setQueryData(['posts'], (old: any) =>
              old?.filter((post: any) => post.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [communityId, queryClient]);
}
```

**2. Typing Indicators (Presence):**
```typescript
// hooks/useTypingIndicators.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useTypingIndicators(postId: string) {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase.channel(`post:${postId}:presence`);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const typing = Object.values(state)
          .flat()
          .filter((user: any) => user.isTyping)
          .map((user: any) => user.username);
        
        setTypingUsers(typing);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const setTyping = (isTyping: boolean, username: string) => {
    const channel = supabase.channel(`post:${postId}:presence`);
    channel.track({ isTyping, username });
  };

  return { typingUsers, setTyping };
}
```

**3. Live Chat/Comments (Broadcast):**
```typescript
// hooks/useLiveComments.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useLiveComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const channel = supabase.channel(`post:${postId}:comments`);

    channel
      .on('broadcast', { event: 'new_comment' }, ({ payload }) => {
        setComments((prev) => [...prev, payload]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const sendComment = async (comment: string) => {
    const channel = supabase.channel(`post:${postId}:comments`);
    await channel.send({
      type: 'broadcast',
      event: 'new_comment',
      payload: {
        text: comment,
        user_id: user.id,
        created_at: new Date().toISOString()
      }
    });
  };

  return { comments, sendComment };
}
```

**4. Online Presence (Active Now):**
```typescript
// hooks/useOnlinePresence.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useOnlinePresence() {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase.channel('online-users');

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.keys(state);
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        setOnlineUsers((prev) => [...prev, key]);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setOnlineUsers((prev) => prev.filter((u) => u !== key));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return onlineUsers;
}
```

---

Soll ich weitermachen mit:
- Blog System (detailliert)
- Dashboard (alle 10+ Unterseiten)
- Pricing Seite
- Alle statischen Seiten (Footer, Datenschutz, etc.)
- Real-time Messaging System
- Node 24 LTS + npm 11.6.1 Setup
- Komplette Supabase MCP Server Anweisungen

? 🚀

## 📝 Blog System - KOMPLETT DETAILLIERT

### Blog Homepage (`/blog`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  HERO SECTION                                           │
│  ┌───────────────────────────────────────────────────┐ │
│  │                                                   │ │
│  │        "Nowtown Blog"                            │ │
│  │   Stories aus München & Local Insights           │ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐│ │
│  │  │ 🔍 Search articles...               [🔎]  ││ │
│  │  └─────────────────────────────────────────────┘│ │
│  └───────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐ │
│  │ FEATURED ARTICLE (Large Card)                     │ │
│  │ ┌─────────────┬─────────────────────────────────┐│ │
│  │ │             │  CATEGORY Badge                 ││ │
│  │ │  Hero       │  Featured Article Title         ││ │
│  │ │  Image      │  Die besten Events in München...││ │
│  │ │  (Large)    │                                 ││ │
│  │ │             │  Excerpt (2-3 lines)...         ││ │
│  │ │             │  [Avatar] @author • 2d ago      ││ │
│  │ │             │  ⏱️ 5 min read • ❤️ 234        ││ │
│  │ └─────────────┴─────────────────────────────────┘│ │
│  └───────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────┬────────────────────────────┐ │
│  │  RECENT ARTICLES     │  RIGHT SIDEBAR             │ │
│  │                      │                            │ │
│  │  ┌────────────────┐  │  ┌──────────────────────┐ │ │
│  │  │ ARTICLE CARD   │  │  │ CATEGORIES           │ │ │
│  │  │ ┌────┐ Title  │  │  │ [All Articles]       │ │ │
│  │  │ │Img │ Excerpt│  │  │ □ Events (45)        │ │ │
│  │  │ └────┘ Author │  │  │ □ Guides (23)        │ │ │
│  │  │    5min • ❤️12│  │  │ □ News (18)          │ │ │
│  │  └────────────────┘  │  │ □ Reviews (34)       │ │ │
│  │                      │  │ □ Local Tips (56)    │ │ │
│  │  ┌────────────────┐  │  └──────────────────────┘ │ │
│  │  │ ARTICLE CARD   │  │                            │ │
│  │  │ ...            │  │  ┌──────────────────────┐ │ │
│  │  └────────────────┘  │  │ POPULAR POSTS        │ │ │
│  │                      │  │ 1. Title...          │ │ │
│  │  ┌────────────────┐  │  │ 2. Title...          │ │ │
│  │  │ ARTICLE CARD   │  │  │ 3. Title...          │ │ │
│  │  │ ...            │  │  │ 4. Title...          │ │ │
│  │  └────────────────┘  │  │ 5. Title...          │ │ │
│  │                      │  └──────────────────────┘ │ │
│  │  [Load More...]      │                            │ │
│  │                      │  ┌──────────────────────┐ │ │
│  │                      │  │ TOP AUTHORS          │ │ │
│  │                      │  │ [Avatar] @author1    │ │ │
│  │                      │  │ 45 Articles          │ │ │
│  │                      │  │ [Follow]             │ │ │
│  │                      │  │                      │ │ │
│  │                      │  │ [Avatar] @author2    │ │ │
│  │                      │  │ 32 Articles          │ │ │
│  │                      │  │ [Follow]             │ │ │
│  │                      │  └──────────────────────┘ │ │
│  │                      │                            │ │
│  │                      │  ┌──────────────────────┐ │ │
│  │                      │  │ NEWSLETTER SIGNUP    │ │ │
│  │                      │  │ Get weekly updates   │ │ │
│  │                      │  │ [Email Input]        │ │ │
│  │                      │  │ [Subscribe]          │ │ │
│  │                      │  └──────────────────────┘ │ │
│  └──────────────────────┴────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Blog Write Page (`/blog/write`) - Rich Text Editor

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  WRITE ARTICLE                                          │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [Save Draft] [Preview] [Publish] [... Settings]  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌────────────────────────────────────────────────────┐│
│  │ TITLE                                              ││
│  │ ┌────────────────────────────────────────────────┐││
│  │ │ Enter article title...                         │││
│  │ └────────────────────────────────────────────────┘││
│  │ Character count: 0/100                             ││
│  └────────────────────────────────────────────────────┘│
│                                                         │
│  ┌────────────────────────────────────────────────────┐│
│  │ COVER IMAGE                                        ││
│  │ ┌────────────────────────────────────────────────┐││
│  │ │ [Upload Cover Image]                           │││
│  │ │ Drag & drop or click to upload                 │││
│  │ │ Recommended: 1200x630px                        │││
│  │ └────────────────────────────────────────────────┘││
│  └────────────────────────────────────────────────────┘│
│                                                         │
│  ┌────────────────────────────────────────────────────┐│
│  │ RICH TEXT EDITOR                                   ││
│  │ ┌────────────────────────────────────────────────┐││
│  │ │ [B] [I] [U] [H1] [H2] [H3] [Link] [Image]    │││
│  │ │ [Quote] [Code] [List] [Table] [...More]       │││
│  │ ├────────────────────────────────────────────────┤││
│  │ │                                                │││
│  │ │ Start writing your article...                  │││
│  │ │                                                │││
│  │ │ # Heading 1                                    │││
│  │ │ ## Heading 2                                   │││
│  │ │ **Bold** *Italic*                             │││
│  │ │ - List item                                    │││
│  │ │ [Link text](url)                              │││
│  │ │ ![Image](url)                                 │││
│  │ │                                                │││
│  │ │ Markdown + WYSIWYG support                    │││
│  │ │                                                │││
│  │ └────────────────────────────────────────────────┘││
│  │ Word count: 0 • Reading time: 0 min               ││
│  └────────────────────────────────────────────────────┘│
│                                                         │
│  ┌────────────────────────────────────────────────────┐│
│  │ METADATA                                           ││
│  │                                                    ││
│  │ Category: [Dropdown: Events/Guides/News/...]      ││
│  │                                                    ││
│  │ Tags: [Tag Input with autocomplete]               ││
│  │ ✕ münchen ✕ events ✕ tipps [+ Add tag]          ││
│  │                                                    ││
│  │ Excerpt (Optional):                                ││
│  │ ┌────────────────────────────────────────────────┐││
│  │ │ Short description for previews... (max 160)    │││
│  │ └────────────────────────────────────────────────┘││
│  └────────────────────────────────────────────────────┘│
│                                                         │
│  ┌────────────────────────────────────────────────────┐│
│  │ PUBLISHING OPTIONS                                 ││
│  │ □ Feature this article                             ││
│  │ □ Allow comments                                   ││
│  │ □ Send notification to followers                   ││
│  │                                                    ││
│  │ Publish as: [Public ▼] [Private] [Unlisted]      ││
│  │ Schedule: [Publish now ▼] [Schedule for later]    ││
│  └────────────────────────────────────────────────────┘│
│                                                         │
│  ┌────────────────────────────────────────────────────┐│
│  │ [💾 Save Draft] [👁️ Preview] [🚀 Publish]        ││
│  └────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

**Autosave Feature:**
```typescript
// Auto-save every 30 seconds
useEffect(() => {
  const interval = setInterval(async () => {
    if (hasChanges) {
      await saveDraft();
    }
  }, 30000);

  return () => clearInterval(interval);
}, [hasChanges]);

// Save on visibility change (tab close/switch)
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden && hasChanges) {
      saveDraft();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, [hasChanges]);
```

**Recovery Draft Feature:**
```typescript
// Check for recovery draft on page load
useEffect(() => {
  const checkRecoveryDraft = async () => {
    const recoveryDraft = await blogService.getRecoveryDraft();
    
    if (recoveryDraft) {
      const confirmed = await confirm(
        'Es wurde ein nicht gespeicherter Entwurf gefunden. Möchten Sie fortfahren?'
      );
      
      if (confirmed) {
        loadRecoveryDraft(recoveryDraft);
      } else {
        deleteRecoveryDraft(recoveryDraft.id);
      }
    }
  };

  checkRecoveryDraft();
}, []);
```

### Blog Article Detail (`/blog/[slug]`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐ │
│  │ BREADCRUMB                                        │ │
│  │ Blog > Category > Article Title                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ARTICLE HEADER                                    │ │
│  │                                                   │ │
│  │ [CATEGORY Badge]                                  │ │
│  │                                                   │ │
│  │ Article Title Goes Here                           │ │
│  │ (Large, center-aligned, h1)                       │ │
│  │                                                   │ │
│  │ Subtitle or excerpt if provided                   │ │
│  │ (Muted, center-aligned)                           │ │
│  │                                                   │ │
│  │ ┌─────┐                                          │ │
│  │ │ Ava │ By @username • Published 2d ago          │ │
│  │ └─────┘ ⏱️ 5 min read • ❤️ 234 likes            │ │
│  │        [Follow] [Bookmark]                        │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ COVER IMAGE                                       │ │
│  │ ┌─────────────────────────────────────────────┐  │ │
│  │ │                                             │  │ │
│  │ │      Hero Image (Full width, 16:9)         │  │ │
│  │ │                                             │  │ │
│  │ └─────────────────────────────────────────────┘  │ │
│  │ Photo credit: Photographer Name                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌────────┬──────────────────────────────┬───────────┐│
│  │SHARE   │ ARTICLE CONTENT (Prose)      │ TABLE OF  ││
│  │SIDEBAR │                              │ CONTENTS  ││
│  │        │                              │           ││
│  │[FB]    │ # Introduction               │ 1. Intro  ││
│  │[X]     │ Lorem ipsum dolor sit amet...│ 2. Main   ││
│  │[WA]    │                              │ 3. Tips   ││
│  │[Email] │ ## Main Section              │ 4. Outro  ││
│  │[Link]  │ Content here with **bold**   │           ││
│  │        │ and *italic* text.           │ (Sticky)  ││
│  │❤️ Like │                              │           ││
│  │🔖 Save │ ![Image](url)                │           ││
│  │        │ Image caption                │           ││
│  │(Sticky)│                              │           ││
│  │        │ > Blockquote text            │           ││
│  │        │                              │           ││
│  │        │ ### Tips & Tricks            │           ││
│  │        │ - Tip 1                      │           ││
│  │        │ - Tip 2                      │           ││
│  │        │                              │           ││
│  │        │ ```code                      │           ││
│  │        │ example code block           │           ││
│  │        │ ```                          │           ││
│  │        │                              │           ││
│  │        │ ## Conclusion                │           ││
│  │        │ Final thoughts...            │           ││
│  └────────┴──────────────────────────────┴───────────┘│
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ AUTHOR BIO                                        │ │
│  │ ┌─────┐                                          │ │
│  │ │ Ava │ About @username                          │ │
│  │ └─────┘ Professional writer & local expert       │ │
│  │        45 articles • 1.2k followers               │ │
│  │        [Follow] [View Profile]                    │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ TAGS                                              │ │
│  │ #münchen #events #tipps #lifestyle                │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ RELATED ARTICLES                                  │ │
│  │ ← [Card] [Card] [Card] →                         │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ COMMENTS (If enabled)                             │ │
│  │                                                   │ │
│  │ 💬 12 Comments                                    │ │
│  │                                                   │ │
│  │ [Sort: Newest ▼] [Most Liked] [Oldest]          │ │
│  │                                                   │ │
│  │ ┌─────────────────────────────────────────────┐  │ │
│  │ │ WRITE COMMENT (if logged in)                │  │ │
│  │ │ [Text Area]                                  │  │ │
│  │ │ [Post Comment]                               │  │ │
│  │ └─────────────────────────────────────────────┘  │ │
│  │                                                   │ │
│  │ ┌─────────────────────────────────────────────┐  │ │
│  │ │ [Avatar] @user1 • 1h ago                    │  │ │
│  │ │ Great article! Very helpful...              │  │ │
│  │ │ 👍 5 [Reply]                                 │  │ │
│  │ │                                             │  │ │
│  │ │   ↳ [Avatar] @author • 30min ago           │  │ │
│  │ │     Thanks for the feedback!                │  │ │
│  │ │     👍 2                                     │  │ │
│  │ └─────────────────────────────────────────────┘  │ │
│  │                                                   │ │
│  │ [Load More Comments...]                           │ │
│  └───────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Your Articles Page (`/blog/your-articles`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  YOUR ARTICLES                                          │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [Published] [Drafts] [Recovery Drafts] [Scheduled]│ │
│  │ Tabs                                              │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [+ New Article] [Import from Draft]                   │
│                                                         │
│  ═══ DRAFTS TAB ═══                                    │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ARTICLE LIST                                      │ │
│  │                                                   │ │
│  │ ┌─────────────────────────────────────────────┐  │ │
│  │ │ [Thumbnail] Title of Draft Article          │  │ │
│  │ │            Last edited: 2h ago              │  │ │
│  │ │            Word count: 234                  │  │ │
│  │ │            [Edit] [Preview] [Delete] [...]  │  │ │
│  │ └─────────────────────────────────────────────┘  │ │
│  │                                                   │ │
│  │ ┌─────────────────────────────────────────────┐  │ │
│  │ │ [RECOVERY] Original Title                   │  │ │
│  │ │ ⚠️ Recovery draft from interrupted session  │  │ │
│  │ │ Created: 1d ago                             │  │ │
│  │ │ [Restore] [View] [Delete]                   │  │ │
│  │ └─────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ PUBLISHED TAB ═══                                 │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [Thumbnail] Published Article Title              │ │
│  │            Published: 2d ago                     │ │
│  │            Views: 1.2k • Likes: 45               │ │
│  │            [View] [Edit] [Stats] [Share] [...]   │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 💰 Pricing Seite (`/pricing`) - DETAILLIERT

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  PRICING HERO                                           │
│  ┌───────────────────────────────────────────────────┐ │
│  │                                                   │ │
│  │         "Wähle deinen Plan"                       │ │
│  │   Starte kostenlos und upgrade, wenn du bereit bist│ │
│  │                                                   │ │
│  │   Billing: [Monthly] ⚪━━━━ [Yearly -20%]       │ │
│  │           Toggle Switch                           │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ PRICING CARDS (3D Tilt Effect) ═══                │
│  ┌───────┬─────────────┬───────┐                      │
│  │ FREE  │    PLUS     │PREMIUM│                      │
│  │       │  🔥 POPULAR!│       │                      │
│  ├───────┼─────────────┼───────┤                      │
│  │  €0   │     €5      │  €20  │                      │
│  │ /Monat│   /Monat    │/Monat │                      │
│  │       │  €48 /Jahr  │€192/J │                      │
│  ├───────┼─────────────┼───────┤                      │
│  │ ✓ Login│ ✓ Free +   │✓ Plus+│                      │
│  │ ✓ 2 Ang│ ✓ 10 Angeb.│✓ ∞ Ang│                      │
│  │ ✓ Stripe│ ✓ Blog(10) │✓ ∞ Blg│                      │
│  │ ✓ Zahlen│ ✓ Analytic │✓ Adv. │                      │
│  │ ✓ Email │ ✓ AI Basic │ Analyt│                      │
│  │ ✓ Karte │ ✓ Optimize │✓ AI Pr│                      │
│  │         │ ✓ Highlight│✓ W-Lbl│                      │
│  │         │ ✓ Priority │✓ API  │                      │
│  │         │   Support  │✓ 24/7 │                      │
│  ├───────┼─────────────┼───────┤                      │
│  │[Start]│ [Upgrade]   │[Choose│                      │
│  └───────┴─────────────┴───────┘                      │
│                                                         │
│  Hover Effect: 3D Tilt + Glow                          │
│  Active Plan: Green border + Checkmark                 │
│                                                         │
│  ═══ FEATURE COMPARISON TABLE ═══                      │
│  ┌───────────────────────────────────────────────────┐ │
│  │                   │ FREE │ PLUS │ PREMIUM         │ │
│  ├───────────────────┼──────┼──────┼────────         │ │
│  │ Active Listings   │  2   │  10  │   ∞             │ │
│  │ Blog Articles/Mo  │  -   │  10  │   ∞             │ │
│  │ Analytics         │ Basic│Detail│Advanced         │ │
│  │ AI Hosting Kit    │  -   │Basic │  Pro            │ │
│  │ Image Optimization│  -   │  ✓   │   ✓             │ │
│  │ Highlight Listing │  -   │  ✓   │   ✓             │ │
│  │ White-Label       │  -   │  -   │   ✓             │ │
│  │ API Access        │  -   │  -   │   ✓             │ │
│  │ Team Features     │  -   │  -   │   ✓             │ │
│  │ Support           │Email │Prior.│ 24/7            │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ FAQ SECTION (Accordion) ═══                       │
│  ┌─────────────────────┬─────────────────────┐        │
│  │  GENERAL            │  BILLING            │        │
│  │                     │                     │        │
│  │ [▼] Gibt es eine    │ [▼] Ist es eine    │        │
│  │     kostenlose Test?│     einmalige Zahl?│        │
│  │     Ja, der Free... │     Nein, monatl...│        │
│  │                     │                     │        │
│  │ [▶] Was beinhaltet  │ [▶] Kündigungs-    │        │
│  │     Free?           │     richtlinie?    │        │
│  │                     │                     │        │
│  │ [▶] Blog schreiben? │ [▶] Rechnungsinfo? │        │
│  │                     │                     │        │
│  │ [▶] Hosting-Know?   │ [▶] Abrechnung?    │        │
│  │                     │                     │        │
│  │ [▶] Bezahlen?       │ [▶] E-Mail ändern? │        │
│  │                     │                     │        │
│  │ [▶] Mobile App?     │                     │        │
│  └─────────────────────┴─────────────────────┘        │
│                                                         │
│  ═══ TESTIMONIALS ═══                                  │
│  ┌───────────────────────────────────────────────────┐ │
│  │ "Nowtown hat mir geholfen, mein Event-Business    │ │
│  │  zu skalieren!" - @user1, Event Host              │ │
│  │  ★★★★★                                            │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ MONEY-BACK GUARANTEE ═══                         │
│  30 Tage Geld-zurück-Garantie                         │
│  Keine Fragen gestellt                                 │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

**3D Card Effect (Framer Motion):**
```typescript
// components/ui/pricing.tsx
'use client';

import { motion } from 'framer-motion';

export function PricingCard({ plan }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Card content */}
    </motion.div>
  );
}
```

---

Soll ich weitermachen mit:
- Dashboard (alle 10+ Unterseiten komplett)
- Alle statischen Seiten (Footer, About, Datenschutz, Impressum, FAQ, etc.)
- Node 24 LTS + npm 11.6.1 Setup Guide
- Komplette Supabase MCP Server Befehle
- Real-time Messaging System
- Asset-Verzeichnis Update

? 🚀

## 📊 Dashboard - KOMPLETT (Alle 10+ Unterseiten)

### Dashboard Main (`/dashboard`) - Overview

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├──────┬───────────────────────────────────────────────────────┤
│ LEFT │  MAIN DASHBOARD CONTENT                               │
│ NAV  │                                                       │
│      │  ┌─────────────────────────────────────────────────┐ │
│📊Ove │  │ WELCOME BANNER                                  │ │
│📈Ana │  │ Welcome back, @username! 👋                    │ │
│📅Cal │  │ You have 3 active listings and 5 new bookings  │ │
│🎉Eve │  └─────────────────────────────────────────────────┘ │
│🏢Spa │                                                       │
│💼Ser │  ═══ KPI CARDS (4 across) ═══                        │
│👥Cus │  ┌───────┬───────┬───────┬───────┐                  │
│⭐Rev │  │REVENUE│BOOKIN │RATING │ VIEWS │                  │
│💬Mes │  │       │   GS  │       │       │                  │
│⚙️Set │  │ €1,234│   45  │ ⭐4.8 │ 2.3k  │                  │
│👮Mod │  │ +12%  │  +8%  │ +0.2  │ +15%  │                  │
│      │  │[View] │[View] │[View] │[View] │                  │
│      │  └───────┴───────┴───────┴───────┘                  │
│      │                                                       │
│      │  ═══ CHARTS ROW ═══                                  │
│      │  ┌─────────────────────┬─────────────────────────┐  │
│      │  │ REVENUE CHART       │ BOOKINGS CHART          │  │
│      │  │ (Line Chart)        │ (Bar Chart)             │  │
│      │  │ ┌─────────────────┐│ ┌─────────────────────┐ │  │
│      │  │ │       📈        ││ │       📊            │ │  │
│      │  │ │  Last 30 days   ││ │  This month vs Last │ │  │
│      │  │ └─────────────────┘│ └─────────────────────┘ │  │
│      │  │ [Filter: 7d▼]      │ [Filter: 30d▼]          │  │
│      │  └─────────────────────┴─────────────────────────┘  │
│      │                                                       │
│      │  ═══ RECENT BOOKINGS TABLE ═══                       │
│      │  ┌─────────────────────────────────────────────────┐│
│      │  │ RECENT BOOKINGS (10 most recent)                ││
│      │  │ [Export CSV] [View All]                         ││
│      │  │                                                 ││
│      │  │ Date    │Item      │Guest  │Amount│Status      ││
│      │  ├─────────┼──────────┼───────┼──────┼────────   ││
│      │  │10.Oct   │Event:... │@user1 │€12   │Confirmed  ││
│      │  │09.Oct   │Space:... │@user2 │€45   │Pending    ││
│      │  │09.Oct   │Service...│@user3 │€199  │Completed  ││
│      │  │[... 7 more rows ...]                           ││
│      │  │                                                 ││
│      │  │ Pagination: ← 1 2 3 ... 10 →                   ││
│      │  └─────────────────────────────────────────────────┘│
│      │                                                       │
│      │  ═══ QUICK ACTIONS ═══                               │
│      │  ┌─────┬─────┬─────┬─────┐                         │
│      │  │Create│View │Check│Respond│                       │
│      │  │Event │Analy│Msgs │Review │                       │
│      │  └─────┴─────┴─────┴─────┘                         │
└──────┴───────────────────────────────────────────────────────┘
```

### Dashboard Analytics (`/dashboard/analytics`)

```
┌──────────────────────────────────────────────────────────────┐
│  ANALYTICS DASHBOARD                                         │
│                                                              │
│  [Date Range: Last 30 Days ▼] [Compare To: Previous ▼]     │
│  [Export Report]                                             │
│                                                              │
│  ═══ ADVANCED KPI CARDS ═══                                 │
│  ┌────────┬────────┬────────┬────────┬────────┐            │
│  │Revenue │Bookings│Visitors│Conv.   │Avg.    │            │
│  │        │        │        │Rate    │Booking │            │
│  │€1,234  │  45    │ 2.3k   │ 1.95%  │ €27.42 │            │
│  │+12% ↗ │ +8% ↗ │ +15% ↗│-0.3% ↘│ +5% ↗ │            │
│  └────────┴────────┴────────┴────────┴────────┘            │
│                                                              │
│  ═══ REVENUE ANALYTICS ═══                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ REVENUE OVER TIME (Advanced Line Chart)             │  │
│  │ ┌────────────────────────────────────────────────┐  │  │
│  │ │                                                │  │  │
│  │ │     📈 Revenue Trend                          │  │  │
│  │ │     — Total Revenue                           │  │  │
│  │ │     ‐ ‐ Events Revenue                        │  │  │
│  │ │     ... Spaces Revenue                        │  │  │
│  │ │     ··· Services Revenue                      │  │  │
│  │ │                                                │  │  │
│  │ └────────────────────────────────────────────────┘  │  │
│  │ [Granularity: Daily ▼] [Chart Type: Line ▼]        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ═══ BOOKING ANALYTICS ═══                                  │
│  ┌──────────────────────────┬──────────────────────────┐   │
│  │ BOOKINGS BY CATEGORY     │ BOOKING STATUS           │   │
│  │ (Pie Chart)              │ (Donut Chart)            │   │
│  │ • Events: 45%            │ • Confirmed: 70%         │   │
│  │ • Spaces: 35%            │ • Pending: 20%           │   │
│  │ • Services: 20%          │ • Cancelled: 10%         │   │
│  └──────────────────────────┴──────────────────────────┘   │
│                                                              │
│  ═══ TRAFFIC ANALYTICS ═══                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ VISITOR TRAFFIC                                      │  │
│  │ ┌────────────────────────────────────────────────┐  │  │
│  │ │  Bar Chart: Daily visitors                     │  │  │
│  │ │  ███ ███ ██  ████ ███ ██  ███                │  │  │
│  │ │  Mon Tue Wed Thu  Fri Sat Sun                  │  │  │
│  │ └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ═══ TOP PERFORMING ITEMS ═══                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 1. Event: "Summer Night Party" - €450 (15 bookings) │  │
│  │ 2. Space: "Fotostudio Mitte" - €340 (8 bookings)    │  │
│  │ 3. Service: "Pro Photography" - €299 (3 bookings)   │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Dashboard Calendar (`/dashboard/calendar`)

```
┌──────────────────────────────────────────────────────────────┐
│  AVAILABILITY CALENDAR                                       │
│                                                              │
│  [Month: October 2025 ▼] [View: Month ▼]                   │
│  [Add Availability] [Block Time]                             │
│                                                              │
│  ═══ CALENDAR VIEW ═══                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │    Mon    Tue    Wed    Thu    Fri    Sat    Sun    │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │          1 ✓    2 ✓    3 ⚠    4 ✗    5 ✓    6 ✓   │  │
│  │  7 ✓    8 ✓    9 ⚠    10●   11 ✓   12 ✓   13 ✓   │  │
│  │ 14 ✓   15 ⚠   16 ✓   17 ✓   18 ✗   19 ✓   20 ✓   │  │
│  │ 21 ✓   22 ✓   23 ✓   24●   25 ✓   26 ✓   27 ✓   │  │
│  │ 28 ⚠   29 ✓   30 ✓   31 ✓                          │  │
│  │                                                      │  │
│  │ Legend:                                              │  │
│  │ ✓ Available   ● Booked   ⚠ Partially Booked   ✗ Blocked │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ═══ BOOKINGS TIMELINE ═══                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ TODAY'S SCHEDULE                                     │  │
│  │                                                      │  │
│  │ 09:00 - 12:00  Space: Fotostudio (@user1)          │  │
│  │ 14:00 - 16:00  Service: Photography (@user2)        │  │
│  │ 19:00 - 23:00  Event: Party Night (@user3)         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ═══ UPCOMING BOOKINGS ═══                                  │
│  [List view of next 7 days bookings]                        │
└──────────────────────────────────────────────────────────────┘
```

### Dashboard Events (`/dashboard/events`)

```
┌──────────────────────────────────────────────────────────────┐
│  YOUR EVENTS                                                 │
│                                                              │
│  [+ Create Event] [Import] [Export]                         │
│  [Active] [Paused] [Completed] [Cancelled]                  │
│                                                              │
│  ═══ EVENTS LIST ═══                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ┌────┐ Summer Night Party                  [▶ ACTIVE]│  │
│  │ │Img │ 📅 15.Oct • 20:00 • 15/30 booked              │  │
│  │ └────┘ €12/Person • ⭐ 4.5 (12)                      │  │
│  │        [Edit] [Pause] [Analytics] [Duplicate] [...]  │  │
│  │        [Quick Actions: Share | Highlight | QR Code]  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ┌────┐ Art Exhibition                    [⏸ PAUSED] │  │
│  │ │Img │ 📅 20.Oct • 18:00 • 8/25 booked               │  │
│  │ └────┘ Free • ⭐ 4.8 (5)                            │  │
│  │        [Resume] [Edit] [Delete] [...]                │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ [More events...]                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ═══ BULK ACTIONS ═══                                       │
│  ☑ Select All  [Pause Selected] [Export Selected]          │
└──────────────────────────────────────────────────────────────┘
```

### Dashboard Spaces (`/dashboard/spaces`)

Similar structure to Events, aber space-specific:
- Hourly/Daily rates anzeigen
- Availability calendar per space
- Equipment management
- Instant booking toggle

### Dashboard Services (`/dashboard/services`)

```
┌──────────────────────────────────────────────────────────────┐
│  YOUR SERVICES                                               │
│                                                              │
│  [+ Create Service] [Manage Packages]                        │
│                                                              │
│  ═══ SERVICE LISTINGS ═══                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Professional Photography                 [✓ ACTIVE]   │  │
│  │ Category: Fotografie • ⭐ 5.0 (47 reviews)          │  │
│  │                                                      │  │
│  │ PACKAGES:                                            │  │
│  │ • Basic: €99 (12 bookings this month)               │  │
│  │ • Standard: €199 (8 bookings)                       │  │
│  │ • Premium: €399 (3 bookings)                        │  │
│  │                                                      │  │
│  │ Total Revenue: €3,456 this month                    │  │
│  │ [Edit] [View Portfolio] [Manage Bookings]           │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Dashboard Customers (`/dashboard/customers`)

```
┌──────────────────────────────────────────────────────────────┐
│  CUSTOMER MANAGEMENT                                         │
│                                                              │
│  [Search Customers...] [Filter: All ▼] [Export]            │
│                                                              │
│  ═══ CUSTOMER STATS ═══                                     │
│  ┌───────────┬───────────┬───────────┬───────────┐         │
│  │   Total   │   New     │ Returning │  Lifetime │         │
│  │ Customers │This Month │Customers  │   Value   │         │
│  │    156    │    23     │   45%     │  €12,345  │         │
│  └───────────┴───────────┴───────────┴───────────┘         │
│                                                              │
│  ═══ CUSTOMER LIST ═══                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [Avatar] @username                     [VIP Badge]   │  │
│  │ email@example.com • Member since 2024                │  │
│  │ 12 Bookings • €456 Total Spent • ⭐ 4.8              │  │
│  │ Last booking: 2 days ago                             │  │
│  │ [Message] [View Profile] [View Bookings] [...]       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ [More customers...]                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ═══ CUSTOMER INSIGHTS ═══                                  │
│  • Most Active Day: Friday                                   │
│  • Preferred Category: Events                                │
│  • Avg. Booking Value: €27                                  │
└──────────────────────────────────────────────────────────────┘
```

### Dashboard Reviews (`/dashboard/reviews`)

```
┌──────────────────────────────────────────────────────────────┐
│  REVIEWS & RATINGS                                           │
│                                                              │
│  Overall Rating: ⭐ 4.8 (234 reviews)                       │
│  [Filter: All ▼] [Sort: Newest ▼]                          │
│                                                              │
│  ═══ RATING BREAKDOWN ═══                                   │
│  ★★★★★ ████████████████████ 75% (175)                      │
│  ★★★★☆ ████████ 15% (35)                                   │
│  ★★★☆☆ ███ 7% (16)                                         │
│  ★★☆☆☆ █ 2% (5)                                            │
│  ★☆☆☆☆ █ 1% (3)                                            │
│                                                              │
│  ═══ REVIEWS LIST ═══                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ★★★★★ @user1 • 2 days ago • Event: Summer Party     │  │
│  │ "Amazing event! Highly recommend..."                 │  │
│  │ [Reply] [Report]                                     │  │
│  │   ↳ Your Reply: "Thank you so much! 🙏"            │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ★★★☆☆ @user2 • 1 week ago • Space: Studio Mitte    │  │
│  │ "Good space but could be cleaner."                   │  │
│  │ [Reply] [Flag] ⚠️ Needs Response                    │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Dashboard Messages (`/dashboard/messages`)

```
┌──────────────────────────────────────────────────────────────┐
│  MESSAGES                                                    │
│                                                              │
│  ┌────────────────┬─────────────────────────────────────┐  │
│  │ CONVERSATIONS  │  CHAT WINDOW                        │  │
│  │ ┌────────────┐│  ┌────────────────────────────────┐ │  │
│  │ │[Avatar]    ││  │ Chat with @user1               │ │  │
│  │ │@user1      ││  │ [⋯] Options                    │ │  │
│  │ │Hi, I want..││  ├────────────────────────────────┤ │  │
│  │ │2h ago   🔴 ││  │                                │ │  │
│  │ └────────────┘│  │ @user1: Hi, I want to book... │ │  │
│  │ ┌────────────┐│  │ 10:30                          │ │  │
│  │ │[Avatar]    ││  │                                │ │  │
│  │ │@user2      ││  │ You: Sure! Which date?        │ │  │
│  │ │Thanks for..││  │ 10:32                          │ │  │
│  │ │1d ago      ││  │                                │ │  │
│  │ └────────────┘│  │ @user1: October 15th          │ │  │
│  │               │  │ 10:35 ✓✓                      │ │  │
│  │ [More...]     │  │                                │ │  │
│  │               │  │ [Typing indicator...]          │ │  │
│  │               │  │                                │ │  │
│  │               │  └────────────────────────────────┘ │  │
│  │               │  ┌────────────────────────────────┐ │  │
│  │               │  │ [Message input...]             │ │  │
│  │               │  │ [📎] [😊] [Send]              │ │  │
│  │               │  └────────────────────────────────┘ │  │
│  └────────────────┴─────────────────────────────────────┘  │
│                                                              │
│  Real-time: Supabase Realtime Broadcast                     │
│  Typing indicators: Supabase Presence                       │
│  Read receipts: ✓ (sent) ✓✓ (read)                        │
└──────────────────────────────────────────────────────────────┘
```

**Real-time Messaging Implementation:**
```typescript
// hooks/useRealtimeMessages.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useRealtimeMessages(conversationId: string) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe to new messages
    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on('broadcast', { event: 'new_message' }, ({ payload }) => {
        setMessages(prev => [...prev, payload]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const sendMessage = async (text: string) => {
    const channel = supabase.channel(`conversation:${conversationId}`);
    
    await channel.send({
      type: 'broadcast',
      event: 'new_message',
      payload: {
        text,
        sender_id: user.id,
        created_at: new Date().toISOString()
      }
    });
  };

  return { messages, sendMessage };
}
```

### Dashboard Settings (`/dashboard/settings`)

```
┌──────────────────────────────────────────────────────────────┐
│  SETTINGS                                                    │
│                                                              │
│  [Profile] [Account] [Notifications] [Billing] [Privacy]    │
│                                                              │
│  ═══ PROFILE TAB ═══                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ PROFILE PHOTO                                        │  │
│  │ ┌─────────┐                                          │  │
│  │ │ Avatar  │  [Change Photo] [Remove]                 │  │
│  │ └─────────┘                                          │  │
│  │                                                      │  │
│  │ USERNAME                                              │  │
│  │ [@username]                                           │  │
│  │                                                      │  │
│  │ FULL NAME                                             │  │
│  │ [Max Mustermann]                                      │  │
│  │                                                      │  │
│  │ BIO                                                   │  │
│  │ [Textarea for bio...]                                 │  │
│  │                                                      │  │
│  │ LOCATION                                              │  │
│  │ [München, Germany]                                    │  │
│  │                                                      │  │
│  │ WEBSITE                                               │  │
│  │ [https://...]                                         │  │
│  │                                                      │  │
│  │ LANGUAGES                                             │  │
│  │ ☑ Deutsch ☑ English ☐ Español                       │  │
│  │                                                      │  │
│  │ [Save Changes]                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ═══ ACCOUNT TAB ═══                                        │
│  • Email: email@example.com [Change]                        │
│  • Password: ••••••••••••• [Change]                        │
│  • Two-Factor Auth: ✗ Disabled [Enable]                    │
│  • Connected Accounts: [Google] [Facebook]                  │
│  • Delete Account [Danger Zone]                             │
│                                                              │
│  ═══ NOTIFICATIONS TAB ═══                                  │
│  ☑ Email Notifications                                      │
│    ☑ New Bookings                                          │
│    ☑ New Reviews                                           │
│    ☑ New Messages                                          │
│    ☐ Marketing Emails                                      │
│  ☑ Push Notifications                                       │
│    ☑ Booking Reminders                                     │
│    ☑ Payment Confirmations                                 │
│                                                              │
│  ═══ BILLING TAB ═══                                        │
│  Current Plan: Plus (€5/month)                              │
│  [Upgrade to Premium] [Cancel Subscription]                 │
│  Payment Method: •••• 1234 [Update]                        │
│  Billing History: [View Invoices]                           │
└──────────────────────────────────────────────────────────────┘
```

### Dashboard Moderation (`/dashboard/moderation`) - Admin Only

```
┌──────────────────────────────────────────────────────────────┐
│  MODERATION PANEL (Admin/Moderator Only)                    │
│                                                              │
│  [Reports] [Users] [Content] [Trust Scores]                 │
│                                                              │
│  ═══ REPORTS QUEUE ═══                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ⚠️ PENDING REPORTS (5)                               │  │
│  │                                                      │  │
│  │ Report #123 • User: @baduser • Type: Spam           │  │
│  │ Reported by: @user1, @user2 (2 reports)             │  │
│  │ Content: "Buy cheap watches..."                     │  │
│  │ [View Details] [Ban User] [Reject] [Warn]           │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ [More reports...]                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ═══ USER MANAGEMENT ═══                                    │
│  [Search Users...] [Filter: All ▼]                         │
│  • Total Users: 1,234                                       │
│  • Banned Users: 12                                         │
│  • Flagged Users: 5                                         │
│                                                              │
│  ═══ TRUST SCORES ═══                                       │
│  Average Trust Score: 82/100                                │
│  [View Low Trust Users] [Adjust Algorithms]                 │
└──────────────────────────────────────────────────────────────┘
```

---

Soll ich jetzt weitermachen mit:
- Alle statischen Seiten (About, Contact, Help, FAQ, Privacy, Terms, Imprint, etc.)?
- Node 24 LTS + npm 11.6.1 Setup?
- Supabase MCP Server Befehle (KEINE SQL Files!)?
- Assets-Ordner Details?
- Footer komplett beschreiben?

Sag mir was als nächstes! Das PRD ist jetzt schon sehr umfangreich (3000+ Zeilen) 🚀

## 📄 ALLE Statischen & Zusätzlichen Seiten - KOMPLETT

### About Seite (`/about`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  HERO SECTION                                           │
│  "Über Nowtown"                                         │
│  Wir bringen München zusammen                           │
│                                                         │
│  ═══ MISSION SECTION ═══                                │
│  ┌───────────────────────────────────────────────────┐ │
│  │ UNSERE MISSION                                    │ │
│  │                                                   │ │
│  │ Nowtown wurde 2024 in München gegründet mit dem  │ │
│  │ Ziel, lokale Erlebnisse für jeden zugänglich zu  │ │
│  │ machen. Wir glauben an spontane Begegnungen und   │ │
│  │ kreative Zusammenarbeit.                          │ │
│  │                                                   │ │
│  │ [Illustrative Image]                              │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ VALUES ═══                                         │
│  ┌───────┬───────┬───────┬───────┐                    │
│  │ 🎯    │ 💚    │ 🤝    │ 🚀    │                    │
│  │Local  │Green  │Commun │Innova │                    │
│  │First  │       │ity    │tion   │                    │
│  │       │       │       │       │                    │
│  │Text...│Text...│Text...│Text...│                    │
│  └───────┴───────┴───────┴───────┘                    │
│                                                         │
│  ═══ TEAM SECTION ═══                                   │
│  Unser Team                                             │
│  ┌───────┬───────┬───────┬───────┐                    │
│  │[Photo]│[Photo]│[Photo]│[Photo]│                    │
│  │Name   │Name   │Name   │Name   │                    │
│  │Role   │Role   │Role   │Role   │                    │
│  └───────┴───────┴───────┴───────┘                    │
│                                                         │
│  ═══ STATS ═══                                          │
│  10,000+ Events • 5,000+ Spaces • 50,000+ Users         │
│  ⭐ 4.8 Average Rating • 🌍 Active in Munich            │
│                                                         │
│  ═══ CONTACT CTA ═══                                    │
│  Fragen? [Kontaktiere uns]                             │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Contact Seite (`/contact`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  CONTACT HERO                                           │
│  "Kontaktiere uns"                                      │
│  Wir sind hier, um zu helfen                           │
│                                                         │
│  ┌─────────────────────┬─────────────────────────────┐ │
│  │ CONTACT FORM        │ CONTACT INFO                │ │
│  │                     │                             │ │
│  │ Name *              │ 📧 Email                    │ │
│  │ [Input]             │ info@nowtown.co             │ │
│  │                     │                             │ │
│  │ Email *             │ 📍 Address                  │ │
│  │ [Input]             │ Müllerstraße 12             │ │
│  │                     │ 80469 München               │ │
│  │ Betreff *           │                             │ │
│  │ [Dropdown:          │ 📞 Phone                    │ │
│  │  - Allgemeine Frage │ +49 89 1234567              │ │
│  │  - Technischer Sup. │                             │ │
│  │  - Partnerschaft    │ 🕐 Hours                    │ │
│  │  - Presse          ]│ Mo-Fr: 9-18 Uhr             │ │
│  │                     │ Sa: 10-14 Uhr               │ │
│  │ Nachricht *         │                             │ │
│  │ [Textarea]          │ 🌐 Social                   │ │
│  │                     │ [X] [IG] [FB]               │ │
│  │ [Captcha]           │                             │ │
│  │                     │                             │ │
│  │ [Senden]            │                             │ │
│  └─────────────────────┴─────────────────────────────┘ │
│                                                         │
│  ═══ FAQ QUICK LINKS ═══                                │
│  Häufig gestellte Fragen: [FAQ] [Help Center]          │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Help Center (`/help`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  HELP CENTER                                            │
│                                                         │
│  [Search: How can we help?]               [🔎]         │
│                                                         │
│  ═══ POPULAR TOPICS ═══                                 │
│  ┌───────┬───────┬───────┬───────┐                    │
│  │ 📚    │ 💳    │ 🎉    │ 🏢    │                    │
│  │Getting│Paymen │Events │Spaces │                    │
│  │Started│ ts    │       │       │                    │
│  │[Link] │[Link] │[Link] │[Link] │                    │
│  └───────┴───────┴───────┴───────┘                    │
│                                                         │
│  ═══ CATEGORIES ═══                                     │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [▶] Erste Schritte                                │ │
│  │     → Account erstellen                           │ │
│  │     → Profil vervollständigen                     │ │
│  │     → Erste Buchung                               │ │
│  │                                                   │ │
│  │ [▶] Als Gastgeber                                 │ │
│  │     → Event erstellen                             │ │
│  │     → Raum anbieten                               │ │
│  │     → Preise festlegen                            │ │
│  │                                                   │ │
│  │ [▶] Zahlungen & Abrechnungen                      │ │
│  │     → Zahlungsmethoden                            │ │
│  │     → Auszahlungen                                │ │
│  │     → Rechnungen                                  │ │
│  │                                                   │ │
│  │ [▶] Sicherheit & Datenschutz                      │ │
│  │     → Sicherheitsrichtlinien                      │ │
│  │     → Datenschutzoptionen                         │ │
│  │     → Melden & Blockieren                         │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ CONTACT SUPPORT ═══                                │
│  Nicht gefunden? [Kontakt] [Live Chat]                 │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### FAQ Seite (`/help/faq`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  FAQ - Häufig gestellte Fragen                          │
│                                                         │
│  [Search FAQs...]                                       │
│                                                         │
│  [Alle] [Account] [Buchungen] [Zahlungen] [Sicherheit] │
│                                                         │
│  ═══ FAQ ACCORDION ═══                                  │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [▼] Wie erstelle ich ein Konto?                  │ │
│  │     Klicken Sie auf "Registrieren" und folgen Sie │ │
│  │     den Anweisungen. Sie benötigen eine gültige   │ │
│  │     E-Mail-Adresse...                             │ │
│  │                                                   │ │
│  │ [▶] Ist Nowtown kostenlos?                        │ │
│  │                                                   │ │
│  │ [▶] Wie buche ich ein Event?                      │ │
│  │                                                   │ │
│  │ [▼] Wie kann ich bezahlen?                        │ │
│  │     Wir akzeptieren Kreditkarten (Visa, MC),      │ │
│  │     PayPal, Apple Pay und Google Pay...           │ │
│  │                                                   │ │
│  │ [▶] Was ist die Stornierungsrichtlinie?          │ │
│  │                                                   │ │
│  │ [▶] Wie werde ich Gastgeber?                      │ │
│  │                                                   │ │
│  │ [50+ more FAQs...]                                │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Nicht gefunden? [Kontaktiere Support]                  │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Privacy Policy (`/privacy`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  DATENSCHUTZERKLÄRUNG                                   │
│  Last Updated: October 1, 2025                          │
│                                                         │
│  ═══ TABLE OF CONTENTS ═══                              │
│  1. Einleitung                                          │
│  2. Datenerfassung                                      │
│  3. Verwendung von Daten                                │
│  4. Datenweitergabe                                     │
│  5. Cookies & Tracking                                  │
│  6. Ihre Rechte                                         │
│  7. Sicherheit                                          │
│  8. Kontakt                                             │
│                                                         │
│  ═══ CONTENT ═══                                        │
│  ## 1. Einleitung                                       │
│  Nowtown GmbH ("wir", "uns", "unser") betreibt         │
│  die Website nowtown.co...                              │
│                                                         │
│  ## 2. Datenerfassung                                   │
│  Wir erfassen folgende Daten:                           │
│  • Account-Informationen (Name, Email)                  │
│  • Buchungsdaten                                        │
│  • Nutzungsstatistiken                                  │
│  ...                                                    │
│                                                         │
│  [Full legal text with GDPR compliance]                 │
│                                                         │
│  ═══ DOWNLOAD OPTIONS ═══                               │
│  [Download as PDF] [Print]                              │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Terms of Use (`/terms-of-use`)

```
┌─────────────────────────────────────────────────────────┐
│  NUTZUNGSBEDINGUNGEN                                    │
│  Version 2.0 • Effective: October 1, 2025               │
│                                                         │
│  [Table of Contents]                                    │
│  1. Acceptance of Terms                                 │
│  2. User Accounts                                       │
│  3. Booking & Payments                                  │
│  4. Host Responsibilities                               │
│  5. Content Guidelines                                  │
│  6. Prohibited Activities                               │
│  7. Termination                                         │
│  8. Liability                                           │
│  9. Dispute Resolution                                  │
│  10. Changes to Terms                                   │
│                                                         │
│  [Full legal content...]                                │
│                                                         │
│  [Download PDF]                                         │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Terms (AGB) (`/terms`)

Similar zu Terms of Use aber deutsches Recht fokussiert:
- AGB für deutsche Nutzer
- Widerrufsrecht
- Gewährleistung
- Haftungsausschluss

### Impressum (`/imprint`)

```
┌─────────────────────────────────────────────────────────┐
│  IMPRESSUM                                              │
│                                                         │
│  Angaben gemäß § 5 TMG                                  │
│                                                         │
│  Nowtown GmbH                                           │
│  Müllerstraße 12                                        │
│  80469 München                                          │
│  Deutschland                                            │
│                                                         │
│  Vertreten durch:                                       │
│  Geschäftsführer: [Name]                                │
│                                                         │
│  Kontakt:                                               │
│  Telefon: +49 89 1234567                                │
│  E-Mail: info@nowtown.co                                │
│                                                         │
│  Registereintrag:                                       │
│  Eintragung im Handelsregister.                         │
│  Registergericht: München                               │
│  Registernummer: HRB XXXXX                              │
│                                                         │
│  Umsatzsteuer-ID:                                       │
│  Umsatzsteuer-Identifikationsnummer gemäß §27 a        │
│  Umsatzsteuergesetz: DEXXXXXXXXX                        │
│                                                         │
│  [Full legal imprint according to German law]           │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Cookie Policy (`/cookie-policy`)

```
┌─────────────────────────────────────────────────────────┐
│  COOKIE-RICHTLINIE                                      │
│                                                         │
│  Was sind Cookies?                                      │
│  Cookies sind kleine Textdateien...                     │
│                                                         │
│  ═══ COOKIE CATEGORIES ═══                              │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ✅ NOTWENDIGE COOKIES (Immer aktiv)              │ │
│  │ Erforderlich für Basisfunktionen                  │ │
│  │ - Authentication                                  │ │
│  │ - Session Management                              │ │
│  │ - Security                                        │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ ⚪ FUNKTIONALE COOKIES [Toggle]                   │ │
│  │ Verbessern die Benutzererfahrung                  │ │
│  │ - Language Preferences                            │ │
│  │ - Theme Selection                                 │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ ⚪ ANALYTICS COOKIES [Toggle]                     │ │
│  │ Helfen uns die Nutzung zu verstehen               │ │
│  │ - Google Analytics                                │ │
│  │ - Vercel Analytics                                │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ ⚪ MARKETING COOKIES [Toggle]                     │ │
│  │ Für personalisierte Werbung                       │ │
│  │ - Social Media Pixels                             │ │
│  │ - Ad Retargeting                                  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [Save Preferences] [Accept All] [Reject All]           │
│                                                         │
│  ═══ COOKIE DETAILS TABLE ═══                           │
│  [Detailed table of all cookies used]                   │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Safety Page (`/safety`)

```
┌─────────────────────────────────────────────────────────┐
│  SICHERHEIT BEI NOWTOWN                                 │
│                                                         │
│  "Deine Sicherheit ist unsere Priorität" 🛡️            │
│                                                         │
│  ═══ SAFETY GUIDELINES ═══                              │
│  ┌───────────────────────────────────────────────────┐ │
│  │ FÜR TEILNEHMER                                    │ │
│  │                                                   │ │
│  │ ✓ Triff dich an öffentlichen Orten               │ │
│  │ ✓ Teile deinen Standort mit Freunden             │ │
│  │ ✓ Zahle nur über Nowtown                          │ │
│  │ ✓ Vertraue deinem Bauchgefühl                     │ │
│  │ ✓ Melde verdächtiges Verhalten                    │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ FÜR GASTGEBER                                     │ │
│  │                                                   │ │
│  │ ✓ Verifiziere deine Identität                     │ │
│  │ ✓ Kommuniziere klar                               │ │
│  │ ✓ Halte Notfallkontakte bereit                    │ │
│  │ ✓ Dokumentiere alles                              │ │
│  │ ✓ Versichere deine Events/Räume                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ VERIFICATION SYSTEM ═══                            │
│  • ID Verification (Government ID)                      │
│  • Email Verification                                   │
│  • Phone Verification                                   │
│  • Trust Score System                                   │
│  • Review System                                        │
│                                                         │
│  ═══ REPORTING ═══                                      │
│  Wie melde ich ein Problem?                             │
│  1. Klicke auf [...] im Post/Event                      │
│  2. Wähle "Melden"                                      │
│  3. Wähle Grund                                         │
│  4. Füge Details hinzu                                  │
│  5. Sende Bericht                                       │
│                                                         │
│  Wir prüfen alle Berichte innerhalb von 24h             │
│                                                         │
│  ═══ EMERGENCY CONTACTS ═══                             │
│  24/7 Safety Line: +49 89 XXXXXXX                       │
│  Email: safety@nowtown.co                               │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Ambassador Program (`/ambassador`)

```
┌─────────────────────────────────────────────────────────┐
│  AMBASSADOR PROGRAM                                     │
│                                                         │
│  "Werde Nowtown Ambassador" 🌟                          │
│  Verdiene Geld, während du Events promotest             │
│                                                         │
│  ═══ HOW IT WORKS ═══                                   │
│  ┌───────┬───────┬───────┬───────┐                    │
│  │ 1️⃣   │ 2️⃣   │ 3️⃣   │ 4️⃣   │                    │
│  │Apply  │Get    │Promote│Earn   │                    │
│  │       │Accept │Events │Money  │                    │
│  │       │ed     │       │       │                    │
│  │[Icon] │[Icon] │[Icon] │[Icon] │                    │
│  │Text.. │Text.. │Text.. │Text.. │                    │
│  └───────┴───────┴───────┴───────┘                    │
│                                                         │
│  ═══ BENEFITS ═══                                       │
│  ✓ 10% Commission on all bookings                       │
│  ✓ Exclusive Event Access                               │
│  ✓ Ambassador Badge on Profile                          │
│  ✓ Marketing Materials                                  │
│  ✓ Priority Support                                     │
│  ✓ Monthly Bonus for Top Performers                     │
│                                                         │
│  ═══ REQUIREMENTS ===                                   │
│  □ Active on Nowtown for 3+ months                      │
│  □ Trust Score 80+                                      │
│  □ Hosted 5+ successful events                          │
│  □ Average rating 4.5+                                  │
│  □ Social media presence                                │
│                                                         │
│  ═══ TOP AMBASSADORS ═══                                │
│  🥇 @ambassador1 - €2,345 earned                        │
│  🥈 @ambassador2 - €1,890 earned                        │
│  🥉 @ambassador3 - €1,567 earned                        │
│                                                         │
│  [Apply Now] [Learn More]                               │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Hosting Kit (`/hosting-kit`)

```
┌─────────────────────────────────────────────────────────┐
│  AI HOSTING KIT                                         │
│                                                         │
│  "Dein persönlicher Event-Assistent" 🤖                 │
│  Powered by AI - Verfügbar für Plus & Premium           │
│                                                         │
│  ═══ FEATURES ═══                                       │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 📝 AI EVENT DESCRIPTION GENERATOR                │ │
│  │ Eingabe: Event-Typ, Details                      │ │
│  │ Ausgabe: Professionelle Beschreibung             │ │
│  │ [Try Demo]                                        │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ 📸 AI IMAGE OPTIMIZATION                         │ │
│  │ Automatische Bildverbesserung                     │ │
│  │ Crop-Vorschläge                                   │ │
│  │ [Upload Test Image]                               │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ 💰 AI PRICING SUGGESTIONS                        │ │
│  │ Analysiert ähnliche Events                        │ │
│  │ Schlägt optimale Preise vor                       │ │
│  │ [Calculate Price]                                 │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ 📊 AI ANALYTICS INSIGHTS                         │ │
│  │ Vorhersage: Beste Zeit für Events                 │ │
│  │ Recommendations: Verbesserungen                   │ │
│  │ [View Insights]                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ UPGRADE CTA ═══                                    │
│  [Upgrade to Plus] für AI Basic Features               │
│  [Upgrade to Premium] für AI Pro Features               │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Offers Page (`/offers`)

```
┌─────────────────────────────────────────────────────────┐
│  SPECIAL OFFERS & PROMOTIONS                            │
│                                                         │
│  "Aktuelle Angebote" 🎁                                 │
│                                                         │
│  ═══ ACTIVE OFFERS ═══                                  │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 🔥 FLASH DEAL - Endet in: 02:34:12                │ │
│  │                                                   │ │
│  │ 50% OFF First Event Booking                       │ │
│  │ Für Neukunden • Code: FIRST50                     │ │
│  │                                                   │ │
│  │ [Get Offer] [Terms]                               │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ 💎 PREMIUM TRIAL                                  │ │
│  │                                                   │ │
│  │ 30 Tage Premium kostenlos testen                  │ │
│  │ Für Plus-Mitglieder                               │ │
│  │                                                   │ │
│  │ [Start Trial]                                     │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ 🎓 STUDENT DISCOUNT                               │ │
│  │                                                   │ │
│  │ 20% Rabatt mit gültiger Studentenkarte            │ │
│  │                                                   │ │
│  │ [Verify Student Status]                           │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ PAST OFFERS ═══                                    │
│  [Expired offers archive]                               │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Saved Page (`/saved`)

```
┌─────────────────────────────────────────────────────────┐
│  SAVED ITEMS                                            │
│                                                         │
│  [Events] [Spaces] [Services] [Posts] [Lists]           │
│                                                         │
│  ═══ MY LISTS ═══                                       │
│  [+ Create New List]                                    │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 📋 Favorites (12 items)                          │ │
│  │    Public • Created: 2 months ago                 │ │
│  │    [View] [Edit] [Share]                          │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ 🎉 Events to Attend (8 items)                    │ │
│  │    Private • Created: 1 week ago                  │ │
│  │    [View] [Edit]                                  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ ALL SAVED ITEMS ═══                                │
│  [Grid of saved items with type badges]                 │
└─────────────────────────────────────────────────────────┘
```

### Saved List Detail (`/saved/list/[id]`)

```
┌─────────────────────────────────────────────────────────┐
│  LIST: Favorites                                        │
│  12 items • Public • [Edit] [Share] [Delete]            │
│                                                         │
│  [Add to List +]                                        │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [Thumbnail] Event: Summer Party                   │ │
│  │ 📅 15.Oct • €12 • [Remove from list]             │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ [Thumbnail] Space: Fotostudio                     │ │
│  │ €25/h • München • [Remove from list]              │ │
│  │ [... more items ...]                              │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Register/Goodbye Pages

**Register (`/register`):**
- Öffnet Login Modal (KEINE separate page!)
- Modal hat Tabs: [Login] [Register]

**Goodbye (`/goodbye`):**
```
┌─────────────────────────────────────────────────────────┐
│  Account Deleted                                        │
│                                                         │
│  😢 Schade, dass du gehst!                              │
│                                                         │
│  Dein Account wurde erfolgreich gelöscht.               │
│  Alle deine Daten wurden entfernt.                      │
│                                                         │
│  [Feedback geben] [Neu anmelden]                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 FOOTER - KOMPLETT DETAILLIERT

### Footer Struktur (Auf ALLEN Seiten)

```
┌─────────────────────────────────────────────────────────────────────┐
│  FOOTER                                                             │
│  Background: bg-gray-800 dark:bg-gray-900                           │
│  Text: text-white                                                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ┌──────────┬──────────┬──────────┬──────────┬──────────┐   │   │
│  │ │ COLUMN 1 │ COLUMN 2 │ COLUMN 3 │ COLUMN 4 │ COLUMN 5 │   │   │
│  │ │          │          │          │          │          │   │   │
│  │ │ [LOGO]   │UNTERNEHM │ENTDECKE  │ SUPPORT  │ LÄNDER   │   │   │
│  │ │ Nowtown  │EN        │          │          │          │   │   │
│  │ │ [80x80px]│          │          │          │Germany▼  │   │   │
│  │ │          │Über uns  │Events    │Hilfe Ctr │ München  │   │   │
│  │ │Tagline:  │Angebote  │Spaces    │Sicherheit│ Berlin   │   │   │
│  │ │"Entdecke │Datenschut│Services  │          │ Hamburg  │   │   │
│  │ │spontane  │AGB       │Hosting   │GASTGEBER │ Köln     │   │   │
│  │ │Events.." │Impressum │Community │Raum      │ Frankfurt│   │   │
│  │ │          │Terms of  │Blog      │anbieten  │ Stuttgart│   │   │
│  │ │NEWSLETTE │Use       │Ambassador│Event     │ Düssel.  │   │   │
│  │ │R         │Cookie    │          │erstellen │ Leipzig  │   │   │
│  │ │[Email In]│FAQ       │          │          │          │   │   │
│  │ │[Subscribe│          │          │          │          │   │   │
│  │ │]         │          │          │          │          │   │   │
│  │ │          │          │          │          │          │   │   │
│  │ │SOCIAL    │          │          │          │          │   │   │
│  │ │[X] [IG]  │          │          │          │          │   │   │
│  │ │[FB][Pin] │          │          │          │          │   │   │
│  │ │[TikTok]  │          │          │          │          │   │   │
│  │ └──────────┴──────────┴──────────┴──────────┴──────────┘   │   │
│  │                                                          │   │
│  │ ═══ PAYMENT METHODS ═══                                  │   │
│  │ "Akzeptierte Zahlungsmethoden"                           │   │
│  │ [Visa] [Mastercard] [PayPal] [Apple Pay] [Google Pay]   │   │
│  │ (SVG Icons mit white background, rounded corners)        │   │
│  │                                                          │   │
│  │ ═══ BOTTOM BAR ═══                                       │   │
│  │ ┌────────────────────────────────────────────────────┐   │   │
│  │ │ 📍 München, Deutschland • ✉️ info@nowtown.co      │   │   │
│  │ │                   © 2025 Nowtown. Alle Rechte     │   │   │
│  │ │                     vorbehalten.                  │   │   │
│  │ └────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Footer Features

**Newsletter:**
- Email input validation
- API call to `/api/newsletter`
- Success/Error states
- Unsubscribe link in emails

**Social Links:**
- X (Twitter): https://x.com/nowtown
- Instagram: https://instagram.com/nowtown
- Facebook: https://facebook.com/nowtown
- Pinterest: https://pinterest.com/nowtown
- TikTok: https://tiktok.com/@nowtown

**Länder Dropdown:**
- Click öffnet Liste deutscher Städte
- Smooth animation (max-height transition)
- Später: Andere Länder hinzufügen

**Payment Icons:**
- High-quality SVG logos
- White background cards
- Hover: slight scale effect

---

Soll ich weitermachen mit:
- User Profile Pages komplett
- Community Sub-pages (Communities, Profile, etc.)
- Blog Sub-pages (Categories, Authors, etc.)
- Node 24 + npm 11.6.1 Setup Guide
- KOMPLETTE Supabase MCP Server Befehle
- Assets-Folder detaillierte Liste

? 🚀

## 👤 User Profile Pages - KOMPLETT

### User Profile (`/user/[username]`)

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
├─────────────────────────────────────────────────────────────────┤
│  ═══ PROFILE HEADER ═══                                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [COVER PHOTO - Full width, 300px height]                │  │
│  │                                                          │  │
│  │ ┌─────────────────────────────────────────────────────┐│  │
│  │ │ ┌───────┐                                          ││  │
│  │ │ │Avatar │  @maxmustermann [Edit ✏️] OR [Follow] ││  │
│  │ │ │120x120│  Max Mustermann                         ││  │
│  │ │ └───────┘  Event Host & Space Owner               ││  │
│  │ │            ⭐ 4.8 Rating • 🏅 Ambassador          ││  │
│  │ │                                                    ││  │
│  │ │            📍 München, Germany                     ││  │
│  │ │            🔗 maxmustermann.com                    ││  │
│  │ │            📅 Joined January 2024                  ││  │
│  │ │                                                    ││  │
│  │ │            Bio: Passionate about bringing people   ││  │
│  │ │            together through unique experiences...  ││  │
│  │ │            [Read more]                             ││  │
│  │ │                                                    ││  │
│  │ │  STATS:                                            ││  │
│  │ │  234 Following • 1,234 Followers • 45 Events      ││  │
│  │ │  [Following] [Followers] [Events]                  ││  │
│  │ │  Click to see lists                                ││  │
│  │ └─────────────────────────────────────────────────────┘│  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [... More] Dropdown: Message, Block, Report                    │
│                                                                 │
│  ═══ PROFILE TABS ═══                                           │
│  [Posts] [Events] [Spaces] [Services] [Reviews] [Badges]       │
│                                                                 │
│  ┌────────────────────────────┬──────────────────────────────┐│
│  │  MAIN CONTENT TAB          │  RIGHT SIDEBAR               ││
│  │                            │                              ││
│  │  ═══ POSTS TAB ═══         │  ═══ ACHIEVEMENTS ═══        ││
│  │  ┌──────────────────────┐  │  ┌────────────────────────┐ ││
│  │  │ Community Post       │  │  │ 🏅 Event Master        │ ││
│  │  │ @user posted 2d ago  │  │  │ Hosted 50+ events      │ ││
│  │  │ [Post content...]    │  │  ├────────────────────────┤ ││
│  │  │ ❤️ 24 💬 5          │  │  │ ⭐ Super Host          │ ││
│  │  └──────────────────────┘  │  │ 4.9+ avg rating        │ ││
│  │                            │  ├────────────────────────┤ ││
│  │  [More posts...]           │  │ 🎯 Early Adopter       │ ││
│  │                            │  │ Joined in beta         │ ││
│  │  ═══ EVENTS TAB ═══        │  └────────────────────────┘ ││
│  │  ┌──────────────────────┐  │                              ││
│  │  │ Event Card           │  │  ═══ STATS ═══               ││
│  │  │ [Image]              │  │  • Total Events: 45          ││
│  │  │ Title, Date, Price   │  │  • Total Bookings: 234       ││
│  │  │ [View Details]       │  │  • Response Time: 2h         ││
│  │  └──────────────────────┘  │  • Acceptance Rate: 95%      ││
│  │                            │                              ││
│  │  ═══ SPACES TAB ═══        │  ═══ LANGUAGES ═══           ││
│  │  [Space Cards Grid]        │  🇩🇪 Deutsch                ││
│  │                            │  🇬🇧 English                ││
│  │  ═══ SERVICES TAB ═══      │                              ││
│  │  [Service Cards Grid]      │  ═══ SOCIAL PROOF ═══        ││
│  │                            │  Verified by 12 users        ││
│  │  ═══ REVIEWS TAB ═══       │  Trust Score: 85/100         ││
│  │  Reviews about this user   │                              ││
│  │  ⭐ 4.8 (156 reviews)      │                              ││
│  │  [Review Cards...]         │                              ││
│  │                            │                              ││
│  │  ═══ BADGES TAB ═══        │                              ││
│  │  All earned achievements   │                              ││
│  │  [Badge Grid]              │                              ││
│  └────────────────────────────┴──────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👥 Community Sub-Pages - ALLE DETAILS

### Communities Page (`/community/communities`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  DISCOVER COMMUNITIES                                   │
│                                                         │
│  [Search communities...] [+ Create Community]           │
│                                                         │
│  [All] [Trending] [Your Communities] [Suggested]        │
│                                                         │
│  ═══ FEATURED COMMUNITIES ═══                           │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ┌────┐  Art Lovers München                       │ │
│  │ │Icon│  "Community für Kunstbegeisterte"          │ │
│  │ └────┘  👥 1,234 Members • 45 Posts today        │ │
│  │         [Join] [Preview]                          │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ [More communities in grid...]                     │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ═══ CATEGORIES ═══                                     │
│  [Arts] [Music] [Sports] [Food] [Tech] [Lifestyle]     │
└─────────────────────────────────────────────────────────┘
```

### Community Detail (`/community/c/[slug]`)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                 │
├─────────────────────────────────────────────────────────┤
│  ═══ COMMUNITY HEADER ═══                               │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [COVER IMAGE - Full width]                        │ │
│  │                                                   │ │
│  │ ┌────┐  Art Lovers München                       │ │
│  │ │Icon│  Die Community für Kunstliebhaber          │ │
│  │ └────┘  👥 1,234 Members • Created 2024           │ │
│  │         [Join] [Share] [... More]                 │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [Posts] [Events] [Members] [About] [Media]             │
│                                                         │
│  ┌──────────────────────┬────────────────────────────┐ │
│  │  FEED                │  SIDEBAR                   │ │
│  │  (Posts filtered     │                            │ │
│  │   to this community) │  COMMUNITY RULES           │ │
│  │                      │  1. Be respectful          │ │
│  │  [Create Post]       │  2. No spam                │ │
│  │                      │  3. Stay on topic          │ │
│  │  [Posts feed...]     │  [Full Rules]              │ │
│  │                      │                            │ │
│  │                      │  MODERATORS                │ │
│  │                      │  @mod1 [Message]           │ │
│  │                      │  @mod2 [Message]           │ │
│  │                      │                            │ │
│  │                      │  TOP MEMBERS               │ │
│  │                      │  🥇 @user1 (234 posts)    │ │
│  │                      │  🥈 @user2 (189 posts)    │ │
│  │                      │                            │ │
│  │                      │  RELATED COMMUNITIES       │ │
│  │                      │  • Music Fans München      │ │
│  │                      │  • Creative Spaces         │ │
│  └──────────────────────┴────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Community Events (`/community/events`)

```
┌─────────────────────────────────────────────────────────┐
│  COMMUNITY EVENTS                                       │
│                                                         │
│  Events organized by community members                  │
│                                                         │
│  [Upcoming] [This Week] [This Month] [Past]             │
│                                                         │
│  ═══ EVENT CARDS GRID ═══                               │
│  [Same layout as main Events page but community-only]   │
└─────────────────────────────────────────────────────────┘
```

### Community Profile (`/community/profile/[id]`)

Identical to User Profile but community-specific views

---

## 📝 Blog Sub-Pages - KOMPLETT

### Blog Categories (`/blog/categories`)

```
┌─────────────────────────────────────────────────────────┐
│  BLOG CATEGORIES                                        │
│                                                         │
│  ┌───────┬───────┬───────┬───────┐                    │
│  │Events │Guides │ News  │Reviews│                    │
│  │  45   │  23   │  18   │  34   │                    │
│  │[Icon] │[Icon] │[Icon] │[Icon] │                    │
│  │[View] │[View] │[View] │[View] │                    │
│  ├───────┼───────┼───────┼───────┤                    │
│  │ Local │Lifesty│ Tips  │ How-To│                    │
│  │ Tips  │  le   │       │       │                    │
│  │  56   │  29   │  41   │  37   │                    │
│  └───────┴───────┴───────┴───────┘                    │
│                                                         │
│  Click category → Filter blog posts                     │
└─────────────────────────────────────────────────────────┘
```

### Blog Authors (`/blog/authors`)

```
┌─────────────────────────────────────────────────────────┐
│  TOP AUTHORS                                            │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ┌────┐  @author1                      [Follow]   │ │
│  │ │Ava │  Professional Writer                        │ │
│  │ └────┘  45 Articles • 1.2k Followers               │ │
│  │         ⭐ 4.9 Avg Rating                          │ │
│  │         Speciality: Events & Local Culture         │ │
│  │         [View Profile] [View Articles]             │ │
│  ├───────────────────────────────────────────────────┤ │
│  │ [More authors...]                                 │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Blog Bookmarks (`/blog/bookmarks`)

```
┌─────────────────────────────────────────────────────────┐
│  YOUR BOOKMARKED ARTICLES                               │
│                                                         │
│  [All] [Events] [Guides] [Tips]                         │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [Grid of bookmarked article cards]                │ │
│  │ With "Remove bookmark" button                     │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Blog Calendar (`/blog/calendar`)

```
┌─────────────────────────────────────────────────────────┐
│  PUBLISHING CALENDAR                                    │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Mon  Tue  Wed  Thu  Fri  Sat  Sun                │ │
│  ├───────────────────────────────────────────────────┤ │
│  │   1    2    3•   4    5•   6    7                 │ │
│  │   8    9•  10   11•  12   13   14                 │ │
│  │  15   16   17•  18   19   20   21                 │ │
│  │  ...                                               │ │
│  │                                                   │ │
│  │  • = Article published on this day                │ │
│  │  Click date to see articles                       │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Upcoming Scheduled Articles: 3                         │
│  [List of scheduled articles]                           │
└─────────────────────────────────────────────────────────┘
```

### Blog Comments (`/blog/comments`)

```
┌─────────────────────────────────────────────────────────┐
│  YOUR COMMENTS                                          │
│                                                         │
│  All your comments across blog articles                 │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ On: "Best Events in Munich"                       │ │
│  │ "Great article! Very helpful..."                  │ │
│  │ 2 days ago • 👍 12 helpful                        │ │
│  │ [View Article] [Edit] [Delete]                    │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Blog Popular (`/blog/popular`)

```
┌─────────────────────────────────────────────────────────┐
│  MOST POPULAR ARTICLES                                  │
│                                                         │
│  [This Week] [This Month] [All Time]                    │
│                                                         │
│  ═══ TOP 10 ═══                                         │
│  1. Article Title (2.3k views, 234 likes)               │
│  2. Article Title (1.8k views, 189 likes)               │
│  ...                                                    │
└─────────────────────────────────────────────────────────┘
```

### Blog Settings (`/blog/settings`)

```
┌─────────────────────────────────────────────────────────┐
│  BLOG SETTINGS                                          │
│                                                         │
│  [Profile] [Preferences] [Notifications]                │
│                                                         │
│  ═══ BLOG PROFILE ═══                                   │
│  Display Name: [Input]                                  │
│  Author Bio: [Textarea]                                 │
│  Social Links: [Twitter] [Website]                      │
│                                                         │
│  ═══ PREFERENCES ═══                                    │
│  ☑ Allow comments on my articles                        │
│  ☑ Email me when someone comments                       │
│  ☐ Make my reading list public                          │
│                                                         │
│  [Save]                                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Node.js 24 LTS + npm 11.6.1 SETUP

### Versions (Latest October 2025)

```json
{
  "engines": {
    "node": ">=24.0.0",
    "npm": ">=11.6.1"
  }
}
```

**Node.js 24 LTS Features:**
- Stable LTS until April 2028
- Performance improvements
- Better ESM support
- Enhanced security

**npm 11.6.1 Features:**
- Faster installs
- Better dependency resolution
- Improved security audits

### Installation Guide

```bash
# 1. Install Node.js 24 LTS
# Via nvm (recommended):
nvm install 24
nvm use 24
nvm alias default 24

# Verify:
node --version  # Should show v24.x.x

# 2. Update npm to 11.6.1
npm install -g npm@11.6.1

# Verify:
npm --version  # Should show 11.6.1

# 3. Create new Next.js project
npx create-next-app@latest nowtown-rebuild

# Select options:
# ✅ TypeScript
# ✅ ESLint
# ✅ Tailwind CSS
# ✅ App Router
# ✅ Turbopack
# ❌ src/ directory (we'll create manually)
```

### package.json Setup

```json
{
  "name": "nowtown-rebuild",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": "^24.0.0",
    "npm": ">=11.6.1"
  },
  "scripts": {
    "dev": "next dev --turbopack --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "test": "vitest",
    "test:e2e": "playwright test",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.5.4",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    
    "@supabase/supabase-js": "^2.54.0",
    "@supabase/ssr": "^0.6.1",
    
    "@tanstack/react-query": "^5.87.4",
    "zustand": "^5.0.0",
    
    "react-hook-form": "^7.63.0",
    "zod": "^3.25.76",
    "@hookform/resolvers": "^5.2.2",
    
    "framer-motion": "^12.x",
    "gsap": "^3.13.0",
    
    "@googlemaps/js-api-loader": "^1.16.10",
    "@types/google.maps": "^3.58.1",
    
    "lucide-react": "^0.536.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    
    "date-fns": "^4.1.0"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    
    "typescript": "^5",
    
    "eslint": "^9.36.0",
    "@typescript-eslint/parser": "^8.x",
    "@typescript-eslint/eslint-plugin": "^8.x",
    "eslint-config-next": "^15.5.3",
    
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    
    "vitest": "^3.x",
    "@testing-library/react": "^16.x",
    "@testing-library/jest-dom": "^6.x",
    
    "@playwright/test": "^1.x"
  }
}
```

---

## 🔄 SUPABASE REALTIME - KOMPLETT

### Supabase Realtime Features

**3 Haupt-Features:**

#### 1. Postgres Changes
Lauscht auf Datenbank-Änderungen (INSERT, UPDATE, DELETE)

```typescript
// Use Case: Live Event Updates
useEffect(() => {
  const channel = supabase
    .channel('events-channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'events'
      },
      (payload) => {
        // Neue Events erscheinen sofort auf der Map
        console.log('New event:', payload.new);
        queryClient.setQueryData(['events'], (old) => 
          [payload.new, ...old]
        );
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'events'
      },
      (payload) => {
        // Event updates (z.B. Kapazität ändert sich)
        queryClient.setQueryData(['events'], (old) =>
          old.map((event) =>
            event.id === payload.new.id ? payload.new : event
          )
        );
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

#### 2. Broadcast
Sendet ephemere Messages zwischen Clients (nicht in DB gespeichert)

```typescript
// Use Case: Typing Indicators in Comments
export function useTypingIndicator(postId: string) {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase.channel(`post:${postId}:typing`);

    channel
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.isTyping) {
          setTypingUsers((prev) => [...prev, payload.username]);
        } else {
          setTypingUsers((prev) => 
            prev.filter((u) => u !== payload.username)
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const broadcastTyping = async (isTyping: boolean, username: string) => {
    const channel = supabase.channel(`post:${postId}:typing`);
    await channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: { isTyping, username }
    });
  };

  return { typingUsers, broadcastTyping };
}
```

**Use Cases für Broadcast:**
- Typing indicators
- Live reactions (hearts flying)
- Cursor positions (collaborative editing)
- Temporary notifications
- Game state updates

#### 3. Presence
Trackt "wer ist online" Status

```typescript
// Use Case: Active Now in Community
export function useOnlinePresence() {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  useEffect(() => {
    const channel = supabase.channel('online-users');

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.values(state).flat();
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            username: user.username,
            online_at: new Date().toISOString()
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return onlineUsers;
}
```

**Use Cases für Presence:**
- "Active Now" sidebar
- Online status indicators (🟢)
- Collaborative editing (who's viewing)
- Live viewer counts

### Real-time Messaging System (Dashboard Messages)

```typescript
// components/features/dashboard/MessagesPage.tsx

export function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  // Load conversations
  useEffect(() => {
    loadConversations();
  }, []);

  // Subscribe to new messages
  useEffect(() => {
    if (!activeConversation) return;

    const channel = supabase
      .channel(`conversation:${activeConversation.id}`)
      .on('broadcast', { event: 'message' }, ({ payload }) => {
        setMessages((prev) => [...prev, payload]);
        markAsRead(payload.id);
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const typing = Object.values(state)
          .flat()
          .filter((u: any) => u.isTyping)
          .map((u: any) => u.username);
        setTypingUsers(typing);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            isTyping: false
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConversation]);

  const sendMessage = async (text: string) => {
    const channel = supabase.channel(`conversation:${activeConversation.id}`);
    
    // Send via broadcast (instant)
    await channel.send({
      type: 'broadcast',
      event: 'message',
      payload: {
        id: crypto.randomUUID(),
        text,
        sender_id: user.id,
        created_at: new Date().toISOString()
      }
    });

    // Also save to database (persistence)
    await supabase.from('messages').insert({
      conversation_id: activeConversation.id,
      sender_id: user.id,
      text
    });
  };

  const setIsTyping = async (isTyping: boolean) => {
    const channel = supabase.channel(`conversation:${activeConversation.id}`);
    await channel.track({ user_id: user.id, isTyping });
  };

  return (
    <div>
      <ConversationsList conversations={conversations} />
      <ChatWindow
        messages={messages}
        onSendMessage={sendMessage}
        onTyping={setIsTyping}
        typingUsers={typingUsers}
      />
    </div>
  );
}
```

**Features:**
- ✅ Instant message delivery (Broadcast)
- ✅ Message persistence (Database)
- ✅ Typing indicators (Presence)
- ✅ Read receipts (✓✓)
- ✅ Online status (🟢)
- ✅ Unread counts
- ✅ Message search
- ✅ File attachments
- ✅ Emoji reactions

---

## 📦 SUPABASE MCP SERVER - KOMPLETTE ANWEISUNGEN

### 🚨 KRITISCH: NIEMALS SQL DATEIEN ERSTELLEN!

**IMMER Supabase MCP Server verwenden!**

### Phase 2 Start: Database Schema überprüfen

```typescript
// SCHRITT 1: Alle Tables auflisten
const tables = await mcp.supabase.list_tables({
  project_id: 'esduvfaofpaukjzzrbgh',
  schemas: ['public']
});

console.log('Existierende Tables:', tables);

// SCHRITT 2: Schema für jede Table checken
for (const table of tables) {
  const schema = await mcp.supabase.execute_sql({
    project_id: 'esduvfaofpaukjzzrbgh',
    query: `
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default,
        character_maximum_length
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = '${table.name}'
      ORDER BY ordinal_position;
    `
  });

  console.log(`Schema for ${table.name}:`, schema);
}

// SCHRITT 3: RLS Policies überprüfen
const policies = await mcp.supabase.execute_sql({
  project_id: 'esduvfaofpaukjzzrbgh',
  query: `
    SELECT
      tablename,
      policyname,
      permissive,
      roles,
      cmd,
      qual,
      with_check
    FROM pg_policies
    WHERE schemaname = 'public';
  `
});

console.log('RLS Policies:', policies);

// SCHRITT 4: Constraints checken
const constraints = await mcp.supabase.execute_sql({
  project_id: 'esduvfaofpaukjzzrbgh',
  query: `
    SELECT
      tc.table_name,
      tc.constraint_name,
      tc.constraint_type,
      cc.check_clause
    FROM information_schema.table_constraints tc
    LEFT JOIN information_schema.check_constraints cc
      ON tc.constraint_name = cc.constraint_name
    WHERE tc.table_schema = 'public';
  `
});

console.log('Constraints:', constraints);

// SCHRITT 5: Foreign Keys checken
const foreignKeys = await mcp.supabase.execute_sql({
  project_id: 'esduvfaofpaukjzzrbgh',
  query: `
    SELECT
      kcu.table_name,
      kcu.column_name,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
    FROM information_schema.key_column_usage kcu
    JOIN information_schema.constraint_column_usage ccu
      ON kcu.constraint_name = ccu.constraint_name
    WHERE kcu.table_schema = 'public';
  `
});

console.log('Foreign Keys:', foreignKeys);

// SCHRITT 6: Indexes checken (für Performance)
const indexes = await mcp.supabase.execute_sql({
  project_id: 'esduvfaofpaukjzzrbgh',
  query: `
    SELECT
      tablename,
      indexname,
      indexdef
    FROM pg_indexes
    WHERE schemaname = 'public';
  `
});

console.log('Indexes:', indexes);
```

### Storage Buckets überprüfen

```typescript
// SCHRITT 7: Storage Buckets checken
const buckets = await mcp.supabase.execute_sql({
  project_id: 'esduvfaofpaukjzzrbgh',
  query: `
    SELECT
      id,
      name,
      public,
      file_size_limit,
      allowed_mime_types
    FROM storage.buckets;
  `
});

console.log('Storage Buckets:', buckets);
```

### Wenn neue Table/Migration nötig

```typescript
// NUR wenn wirklich notwendig - erst mit Team besprechen!
const migration = await mcp.supabase.apply_migration({
  project_id: 'esduvfaofpaukjzzrbgh',
  name: 'add_new_feature_table',
  query: `
    CREATE TABLE IF NOT EXISTS new_feature (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    ALTER TABLE new_feature ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can view own records"
      ON new_feature FOR SELECT
      USING (auth.uid() = user_id);
  `
});
```

### TypeScript Types generieren

```typescript
// SCHRITT 8: TypeScript Types aus Schema generieren
const types = await mcp.supabase.generate_typescript_types({
  project_id: 'esduvfaofpaukjzzrbgh'
});

// Save to types/supabase.ts
fs.writeFileSync('types/supabase.ts', types);
```

---

Soll ich weitermachen mit:
- Restliche Dashboard-Unterseiten (Security, etc.)
- Assets-Folder komplett dokumentieren
- Developer Checklist
- Testing Strategy komplett
- Deployment Guide
- Accessibility Checkliste
- Performance Optimization Guide

? 🚀

## 📦 ASSETS & RESOURCES - KOMPLETT

### Assets Ordner: `/NOWTOWN_REBUILD_ASSETS_PACKAGE/`

**Dieser Ordner enthält ALLE wichtigen Bilder für die Platform!**

```
NOWTOWN_REBUILD_ASSETS_PACKAGE/
├── README.md                    # Anleitung zur Nutzung
├── nowtown-logo.png            # Main Logo (1545KB, 400x400px)
├── Logo-Dashboard.png          # Dashboard Logo (237KB, 200x200px)
├── default-avatar.jpg          # Fallback Avatar (10KB, 200x200px)
├── hero1.jpg                   # Hero Background 1 (736KB)
├── hero2.jpg                   # Hero Background 2 (25MB) ⚠️ Optimize!
├── hero3.jpg                   # Hero Background 3 (258KB)
├── services-hero.jpg           # Services Page Hero (210KB)
├── placeholder-community.png   # Community Placeholder
└── categories/                 # Category Images Folder
    ├── Fotostudio.jpg          # Fotostudio category
    ├── Tonstudio.jpg           # Tonstudio category
    ├── Werkstatt.jpg           # Werkstätten category
    ├── Kunstraeume.jpg         # Kunst & Töpfer category
    ├── Gaming-und-Podcast.jpg  # Gaming & Podcast category
    ├── Yoga-und-Tanzraeume.jpg # Sporträume category
    ├── Sonstige.jpg            # Popup & Retail category
    ├── Kunst-event.jpg         # Kunst Events category
    ├── Musik-und-Performance.jpg # Music Events category
    ├── Sport-und-Fitness.jpg   # Sport Events category
    ├── Familie.jpg             # Familie Events category
    ├── workshop.jpg            # Workshop category
    ├── spontane-treffen.jpg    # Spontane Treffen category
    └── Nightlife.jpg           # Party & Nightlife category
```

### Wie Assets verwenden

**1. Setup:**
```bash
# Kopiere kompletten Ordner ins neue Projekt
cp -r NOWTOWN_REBUILD_ASSETS_PACKAGE/* new-project/public/

# Verify
ls -lh new-project/public/
```

**2. Usage in Components:**

```typescript
// Logo in Header
import Image from 'next/image';

<Image
  src="/nowtown-logo.png"
  alt="Nowtown - Entdecke München Live"
  width={120}
  height={40}
  priority  // Above fold
/>

// Hero Background
<div
  style={{
    backgroundImage: 'url(/hero1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  {/* Hero content */}
</div>

// OR with Next.js Image
<Image
  src="/hero1.jpg"
  alt="München Events Background"
  fill
  style={{ objectFit: 'cover' }}
  priority
  quality={85}
/>

// Category Images
<Image
  src="/categories/Fotostudio.jpg"
  alt="Fotostudio Spaces in München"
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Avatar Fallback
<Image
  src={user.avatar_url || "/default-avatar.jpg"}
  alt={`${user.username} avatar`}
  width={40}
  height={40}
  className="rounded-full"
/>
```

**3. Image Optimization Checklist:**

```bash
# ⚠️ hero2.jpg ist 25MB - MUSS optimiert werden!

# Option 1: Mit Sharp (während build)
npm install sharp

# Option 2: Online Optimizer
# - Use tinypng.com oder squoosh.app
# - Target: Under 500KB for hero images
# - Format: WebP bevorzugt

# Option 3: Next.js automatic optimization
# - Next/Image optimiert automatisch
# - Generiert WebP/AVIF versions
# - Serves based on browser support
```

### Zusätzliche Assets benötigt

**Icons & Illustrations:**
```typescript
// Use Lucide React Icons
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  // ... 100+ more icons
} from 'lucide-react';

// Usage
<Calendar className="w-5 h-5 text-gray-600" />
```

**Emojis:**
- Native Emoji Support (Unicode)
- Emoji Picker Library: `emoji-picker-react`

**Placeholder Images:**
```typescript
// Für Development - Unsplash placeholder
<Image
  src={`https://source.unsplash.com/random/400x300?${category}`}
  alt="Placeholder"
  width={400}
  height={300}
/>

// Production - ersetzen mit echten Bildern!
```

---

## 👨‍💻 DEVELOPER BEST PRACTICES - ERWEITERT

### TypeScript Strict Mode Rules

**tsconfig.json (MANDATORY):**
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    },
    
    // STRICT MODE - MANDATORY!
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noPropertyAccessFromIndexSignature": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint Configuration (Zero-Error Policy)

**eslint.config.js:**
```javascript
import { FlatCompat } from '@eslint/eslintrc';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

const compat = new FlatCompat();

export default [
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin
    },
    rules: {
      // TypeScript Rules - MANDATORY
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/consistent-type-imports': ['warn', {
        prefer: 'type-imports'
      }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      
      // React Rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-key': 'error',
      'react/no-unescaped-entities': 'warn',
      
      // General Rules
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      
      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error'
    }
  }
];
```

**ESLint Workflow:**
```bash
# VOR jedem Commit (MANDATORY!)
npx eslint .

# Wenn Fehler gefunden:
npx eslint . --fix  # Auto-fix

# Spezifische Datei checken
npx eslint src/components/MyComponent.tsx

# CI/CD Format (compact)
npx eslint . --format=compact

# MUSS NULL Errors haben!
# MUSS NULL Warnings haben (für PR)!
```

### Component Development Checklist

**VOR dem Schreiben einer Component:**

```markdown
## Component: [ComponentName]

### 1. ✅ RECHERCHE (MANDATORY!)
- [ ] Official shadcn/ui docs gelesen
- [ ] Radix UI primitive docs studiert
- [ ] Accessibility guidelines geprüft (WCAG 2.1)
- [ ] Design inspiration gesucht
- [ ] Similar implementations reviewed

### 2. ✅ PLANUNG
- [ ] Props interface definiert
- [ ] State requirements identified
- [ ] Edge cases dokumentiert
- [ ] Error states geplant
- [ ] Loading states geplant
- [ ] Mobile responsiveness geplant

### 3. ✅ ACCESSIBILITY
- [ ] Semantic HTML verwendet (<button>, <nav>, etc.)
- [ ] ARIA labels hinzugefügt
- [ ] Keyboard navigation funktioniert
- [ ] Focus indicators sichtbar
- [ ] Color contrast WCAG AA (4.5:1)
- [ ] Screen reader tested

### 4. ✅ TYPES
- [ ] Props interface mit JSDoc
- [ ] Explicit return type
- [ ] Event types korrekt
- [ ] No `any` types
- [ ] Generics wo sinnvoll

### 5. ✅ PERFORMANCE
- [ ] Next/Image für Bilder
- [ ] Lazy loading implementiert
- [ ] Code splitting überlegt
- [ ] Memoization wo nötig
- [ ] useCallback für callbacks

### 6. ✅ TESTING
- [ ] Unit tests geschrieben
- [ ] Component tests erstellt
- [ ] Accessibility tests (jest-axe)
- [ ] Edge cases getestet
- [ ] Mobile getestet

### 7. ✅ CLEANUP
- [ ] ESLint errors fixed (ZERO!)
- [ ] TypeScript errors fixed (ZERO!)
- [ ] Console.logs entfernt
- [ ] Comments sinnvoll
- [ ] Code formatted (Prettier)
```

### Git Commit Conventions

```bash
# Format
<type>(<scope>): <subject>

<body>

<footer>

# Types:
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting (no code change)
refactor: Code restructuring
test:     Adding tests
chore:    Maintenance
perf:     Performance improvement
ci:       CI/CD changes
build:    Build system changes

# Examples:
feat(events): Add advanced filter sidebar

- Implement category filter
- Add date range picker
- Add price range slider
- Add capacity filter

Closes #123

fix(community): Fix typing indicator not showing

The typing indicator was not showing due to missing
Presence subscription. Added proper channel subscription
and cleanup.

Fixes #456
```

---

## ♿ ACCESSIBILITY REQUIREMENTS - KOMPLETT

### WCAG 2.1 AA Compliance Checklist

**1. Perceivable (Wahrnehmbar):**

```markdown
✅ Text Alternatives
- [ ] Alle Images haben aussagekräftige alt-Texte
- [ ] Decorative images haben alt=""
- [ ] Icons haben aria-label

✅ Time-based Media
- [ ] Videos haben Captions
- [ ] Audio hat Transcript

✅ Adaptable
- [ ] Content funktioniert ohne CSS
- [ ] Proper heading hierarchy (h1→h2→h3)
- [ ] Semantic HTML (<nav>, <main>, <article>)
- [ ] Tables haben <th> headers

✅ Distinguishable
- [ ] Color contrast 4.5:1 (normal text)
- [ ] Color contrast 3:1 (large text/UI)
- [ ] Color nicht einziges visuelles Mittel
- [ ] Text resizable bis 200%
- [ ] No horizontal scroll at 320px width
```

**2. Operable (Bedienbar):**

```markdown
✅ Keyboard Accessible
- [ ] Alle Funktionen via Tastatur
- [ ] Tab-Reihenfolge logisch
- [ ] Focus indicators sichtbar
- [ ] Keine Keyboard traps
- [ ] Skip to main content link

✅ Enough Time
- [ ] Keine Auto-Timeouts ohne Warnung
- [ ] User kann Zeit verlängern
- [ ] Auto-play kann pausiert werden

✅ Seizures
- [ ] Nichts blinkt >3x/Sekunde
- [ ] Parallax-Effekte subtil

✅ Navigable
- [ ] Page titles beschreibend
- [ ] Link text beschreibend (kein "click here")
- [ ] Breadcrumbs wo sinnvoll
- [ ] Multiple ways to find content
```

**3. Understandable (Verständlich):**

```markdown
✅ Readable
- [ ] Language of page declared (lang="de")
- [ ] Language changes marked
- [ ] Unusual words explained

✅ Predictable
- [ ] Navigation consistent
- [ ] Components behave consistently
- [ ] No surprise popups
- [ ] Context changes announced

✅ Input Assistance
- [ ] Form errors clearly identified
- [ ] Error suggestions provided
- [ ] Labels for all inputs
- [ ] Help text available
```

**4. Robust (Robust):**

```markdown
✅ Compatible
- [ ] Valid HTML
- [ ] ARIA verwendet correctly
- [ ] Works with assistive tech
- [ ] Progressive enhancement
```

### Accessibility Testing Tools

```bash
# Install tools
npm install --save-dev @axe-core/react jest-axe

# Run tests
npm run test:a11y
```

**Manual Testing:**
```bash
# 1. Keyboard Navigation
# - Tab through entire page
# - Enter/Space on interactive elements
# - Escape to close modals
# - Arrow keys in menus

# 2. Screen Reader (VoiceOver on Mac)
Cmd + F5  # Toggle VoiceOver
# Navigate and listen to announcements

# 3. Zoom Test
Cmd + +  # Zoom to 200%
# Check no horizontal scroll
# Check all content visible

# 4. Color Blindness
# Use Chrome DevTools > Rendering > Emulate vision deficiencies
```

### Accessibility Code Examples

**Skip Link:**
```typescript
// components/layout/Header.tsx
export function Header() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>
      <header>{/* Header content */}</header>
    </>
  );
}

// app/layout.tsx
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

**Accessible Modal:**
```typescript
export function AccessibleModal({ isOpen, onClose, title, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Trap focus
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full">
        <h2 id="modal-title">{title}</h2>
        <div id="modal-description">{children}</div>
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4"
        >
          <X />
        </button>
      </div>
    </div>
  );
}
```

**Accessible Form:**
```typescript
export function AccessibleForm() {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block">
          Email Address <span aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby="email-error email-hint"
        />
        <span id="email-hint" className="text-sm text-gray-600">
          We'll never share your email
        </span>
        {errors.email && (
          <span id="email-error" className="text-red-600" role="alert">
            {errors.email}
          </span>
        )}
      </div>
      
      <button
        type="submit"
        aria-busy={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
```

---

## ⚡ PERFORMANCE TARGETS & OPTIMIZATION

### Core Web Vitals Targets

```typescript
// Target Metrics (MANDATORY!)
const PERFORMANCE_TARGETS = {
  // Largest Contentful Paint
  LCP: {
    good: '< 2.5s',
    needsImprovement: '2.5s - 4.0s',
    poor: '> 4.0s'
  },
  
  // Interaction to Next Paint
  INP: {
    good: '< 200ms',
    needsImprovement: '200ms - 500ms',
    poor: '> 500ms'
  },
  
  // Cumulative Layout Shift
  CLS: {
    good: '< 0.1',
    needsImprovement: '0.1 - 0.25',
    poor: '> 0.25'
  },
  
  // First Contentful Paint
  FCP: {
    good: '< 1.8s',
    needsImprovement: '1.8s - 3.0s',
    poor: '> 3.0s'
  },
  
  // Time to First Byte
  TTFB: {
    good: '< 800ms',
    needsImprovement: '800ms - 1800ms',
    poor: '> 1800ms'
  }
};
```

### Build Performance

```bash
# Target: Under 25 seconds
time npm run build

# Expected output:
# Route (app)                              Size
# ┌ ○ /                                    2.5 kB
# ├ ○ /events                              3.2 kB
# ├ ○ /community                           4.1 kB
# └ ○ /dashboard                           5.3 kB
#
# ○  (Static)  prerendered as static content
# ƒ  (Dynamic) server-rendered on demand
#
# Build time: ~23.5s ✅
```

### Optimization Strategies

**1. Image Optimization:**
```typescript
// next.config.ts
export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'esduvfaofpaukjzzrbgh.supabase.co'
      }
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment'
  }
};

// Usage
<Image
  src="/hero1.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority  // Above fold
  quality={85}  // 85 is optimal
  placeholder="blur"
  blurDataURL="..." // Generate with plaiceholder
/>
```

**2. Code Splitting:**
```typescript
// Dynamic imports für große Components
import dynamic from 'next/dynamic';

// Map component (avoid SSR)
const GoogleMap = dynamic(
  () => import('@/components/ui/GoogleMap'),
  {
    ssr: false,
    loading: () => <MapSkeleton />
  }
);

// Chart components (lazy load)
const RevenueChart = dynamic(
  () => import('@/components/dashboard/RevenueChart'),
  {
    loading: () => <ChartSkeleton />
  }
);

// Modal (load on demand)
const CreateEventModal = dynamic(
  () => import('@/components/modals/CreateEventModal')
);
```

**3. Font Optimization:**
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // FOUT vs FOIT
  variable: '--font-inter',
  preload: true
});

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

**4. Bundle Size Reduction:**
```bash
# Analyze bundle
npm run build:analyze

# Check for large dependencies
npx @next/bundle-analyzer

# Replace heavy libraries:
# - moment.js → date-fns (smaller!)
# - lodash → lodash-es (tree-shakeable)
# - axios → fetch (native)
```

**5. Caching Strategy:**
```typescript
// API Routes mit Caching
export async function GET() {
  const events = await getEvents();

  return new Response(JSON.stringify(events), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
    }
  });
}

// React Query Caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes
      cacheTime: 10 * 60 * 1000,   // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1
    }
  }
});
```

**6. Lazy Loading:**
```typescript
// Intersection Observer für Bilder
import { useInView } from 'react-intersection-observer';

export function LazyImage({ src, alt }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Image src={src} alt={alt} width={400} height={300} />
      ) : (
        <Skeleton className="w-full h-[300px]" />
      )}
    </div>
  );
}
```

---

## 🧪 TESTING STRATEGY - KOMPLETT

### Test Pyramid

```
         /\
        /E2E\         10% - End-to-End (Playwright)
       /------\       - Critical user flows
      /Integr.\      30% - Integration (React Testing Library)
     /----------\     - Component interactions
    /   Unit     \    60% - Unit (Vitest)
   /--------------\   - Services, utilities, hooks
```

### 1. Unit Tests (Vitest)

```typescript
// lib/__tests__/event-service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { eventService } from '@/lib/event-service';

describe('EventService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEvents', () => {
    it('should fetch events successfully', async () => {
      const mockEvents = [
        { id: '1', title: 'Test Event' }
      ];

      // Mock Supabase
      vi.mock('@/lib/supabase', () => ({
        createClient: () => ({
          from: () => ({
            select: () => ({
              data: mockEvents,
              error: null
            })
          })
        })
      }));

      const events = await eventService.getEvents();
      expect(events).toEqual(mockEvents);
    });

    it('should throw error on failure', async () => {
      vi.mock('@/lib/supabase', () => ({
        createClient: () => ({
          from: () => ({
            select: () => ({
              data: null,
              error: new Error('DB Error')
            })
          })
        })
      }));

      await expect(eventService.getEvents()).rejects.toThrow('DB Error');
    });
  });
});
```

### 2. Component Tests (React Testing Library)

```typescript
// components/__tests__/EventCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EventCard from '@/components/features/events/EventCard';

describe('EventCard', () => {
  const mockEvent = {
    id: '1',
    title: 'Test Event',
    description: 'Test description',
    price_per_ticket: 10,
    start_datetime: '2025-10-15T20:00:00Z',
    location: { city: 'München' },
    creator: {
      username: 'testuser',
      avatar_url: '/avatar.jpg'
    }
  };

  it('renders event information', () => {
    render(<EventCard event={mockEvent} />);

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('€10')).toBeInTheDocument();
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('München')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<EventCard event={mockEvent} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('article'));
    expect(handleClick).toHaveBeenCalledWith(mockEvent);
  });

  it('shows save button', () => {
    render(<EventCard event={mockEvent} />);

    const saveButton = screen.getByLabelText('Save event');
    expect(saveButton).toBeInTheDocument();
  });

  it('handles save action', async () => {
    const handleSave = vi.fn();
    render(<EventCard event={mockEvent} onSave={handleSave} />);

    const saveButton = screen.getByLabelText('Save event');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(handleSave).toHaveBeenCalledWith(mockEvent.id);
    });
  });
});
```

### 3. Accessibility Tests (jest-axe)

```typescript
// components/__tests__/EventCard.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import EventCard from '@/components/features/events/EventCard';

expect.extend(toHaveNoViolations);

describe('EventCard Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <EventCard event={mockEvent} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels', () => {
    render(<EventCard event={mockEvent} />);

    expect(screen.getByRole('article')).toHaveAttribute('aria-label');
    expect(screen.getByLabelText('Save event')).toBeInTheDocument();
  });

  it('should be keyboard navigable', () => {
    render(<EventCard event={mockEvent} />);

    const card = screen.getByRole('article');
    card.focus();
    
    expect(card).toHaveFocus();
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
```

### 4. E2E Tests (Playwright)

```typescript
// e2e/event-booking-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Event Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'Password123!');
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL('/dashboard');
  });

  test('complete event booking', async ({ page }) => {
    // 1. Go to events page
    await page.goto('/events');
    await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible();

    // 2. Search for event
    await page.fill('[placeholder*="Search"]', 'Summer Party');
    await page.keyboard.press('Enter');

    // 3. Click first event
    await page.click('[data-testid="event-card"]:first-child');
    await expect(page).toHaveURL(/\/events\/[a-z0-9-]+/);

    // 4. Select date
    await page.click('[data-testid="date-picker"]');
    await page.click('button:has-text("15")'); // Select 15th

    // 5. Select guests
    await page.click('[data-testid="guest-increment"]');
    await expect(page.getByText('2 Guests')).toBeVisible();

    // 6. Check price updated
    await expect(page.getByText('€24')).toBeVisible();

    // 7. Click Book Now
    await page.click('button:has-text("Book Now")');

    // 8. Payment modal opens
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Payment Details')).toBeVisible();

    // 9. Enter card details
    await page.fill('[name="cardNumber"]', '4242424242424242');
    await page.fill('[name="expiry"]', '12/28');
    await page.fill('[name="cvc"]', '123');

    // 10. Confirm booking
    await page.click('button:has-text("Confirm & Pay")');

    // 11. Success message
    await expect(page.getByText('Booking Confirmed!')).toBeVisible();

    // 12. Redirected to dashboard
    await expect(page).toHaveURL('/dashboard/bookings');
    await expect(page.getByText('Summer Party')).toBeVisible();
  });

  test('handles sold out event', async ({ page }) => {
    await page.goto('/events/sold-out-event-id');

    await expect(page.getByText('Sold Out')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Book Now' })).toBeDisabled();
  });
});
```

### Test Coverage Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/types.ts',
        'src/**/*.d.ts'
      ],
      lines: 80,
      functions: 80,
      branches: 75,
      statements: 80
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
```

**Run Tests:**
```bash
# Unit + Component tests
npm test

# With coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# E2E tests
npm run test:e2e

# E2E in UI mode
npm run test:e2e -- --ui

# Specific test file
npm test src/lib/event-service.test.ts
```

---

## 🚀 DEPLOYMENT GUIDE - VERCEL

### Vercel Setup

```bash
# 1. Install Vercel CLI
npm i -g vercel@latest

# 2. Login
vercel login

# 3. Link project
vercel link

# 4. Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY production
vercel env add OPENAI_API_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# 5. Deploy
vercel --prod
```

### vercel.json Configuration

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev --turbopack",
  "installCommand": "npm ci",
  "regions": ["fra1"],
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/login",
      "destination": "/?modal=login",
      "permanent": false
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

---

## ✅ FINAL CHECKLISTE FÜR ENTWICKLER

### Pre-Development Checklist

```markdown
## BEVOR du anfängst zu coden:

### Setup
- [ ] Node.js 24 LTS installiert
- [ ] npm 11.6.1 installiert
- [ ] Next.js 15.5.4 Projekt erstellt
- [ ] Git repository initialisiert
- [ ] Environment variables konfiguriert
- [ ] shadcn/ui initialisiert
- [ ] Tailwind CSS v4 konfiguriert
- [ ] ESLint konfiguriert (zero-error policy!)
- [ ] TypeScript strict mode enabled
- [ ] Prettier konfiguriert

### Documentation
- [ ] Alle Links aus PRD bookmarked
- [ ] Next.js Docs gelesen
- [ ] shadcn/ui Docs gelesen
- [ ] Supabase Docs gelesen
- [ ] WCAG 2.1 Quick Reference gespeichert
- [ ] Framer Motion Docs bookmarked

### Assets
- [ ] NOWTOWN_REBUILD_ASSETS_PACKAGE nach public/ kopiert
- [ ] Alle Bilder vorhanden
- [ ] hero2.jpg optimiert (<1MB!)
- [ ] Favicons generiert
- [ ] OG Images erstellt

### Database
- [ ] Supabase MCP Server getestet
- [ ] Alle Tables aufgelistet
- [ ] Schema dokumentiert
- [ ] RLS Policies gecheckt
- [ ] Storage Buckets konfiguriert
```

### During Development Checklist

```markdown
## FÜR JEDE NEUE COMPONENT:

- [ ] Official docs recherchiert
- [ ] Design pattern recherchiert
- [ ] Accessibility guidelines gelesen
- [ ] Props interface definiert
- [ ] Explicit return type
- [ ] No `any` types
- [ ] Semantic HTML
- [ ] ARIA labels hinzugefügt
- [ ] Keyboard navigation funktioniert
- [ ] Focus indicators sichtbar
- [ ] Color contrast WCAG AA
- [ ] Mobile responsive
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] Unit tests geschrieben
- [ ] Component tests geschrieben
- [ ] Accessibility tests
- [ ] ESLint errors fixed (ZERO!)
- [ ] TypeScript errors fixed (ZERO!)
- [ ] Console.logs removed
- [ ] Performance optimiert
```

### Pre-Commit Checklist

```markdown
## VOR JEDEM COMMIT:

- [ ] `npx eslint .` → ZERO errors
- [ ] `npm run build` → Success (<25s)
- [ ] `npx tsc --noEmit` → ZERO errors
- [ ] `npm test` → All pass
- [ ] No console.logs (except error/warn)
- [ ] Commented code removed
- [ ] Commit message folgt Convention
- [ ] Changes reviewed
```

### Pre-PR Checklist

```markdown
## VOR PULL REQUEST:

- [ ] All tests pass
- [ ] Coverage >80%
- [ ] ESLint ZERO errors/warnings
- [ ] TypeScript ZERO errors
- [ ] Build succeeds
- [ ] Manual testing done
- [ ] Mobile tested
- [ ] Accessibility tested
- [ ] Performance checked (Lighthouse 95+)
- [ ] Documentation updated
- [ ] Screenshots added (if UI change)
- [ ] PR description complete
```

---

## 🎯 SUCCESS METRICS

### Technical Metrics

```typescript
const SUCCESS_METRICS = {
  // Build Performance
  buildTime: {
    target: '< 25s',
    current: '~23.5s',
    status: '✅ PASS'
  },
  
  // Bundle Size
  bundleSize: {
    target: '< 300KB (gzipped)',
    measure: 'npm run build:analyze'
  },
  
  // Code Quality
  eslintErrors: {
    target: 0,
    mandatory: true
  },
  typeScriptErrors: {
    target: 0,
    mandatory: true
  },
  testCoverage: {
    target: '80%+',
    lines: 80,
    functions: 80,
    branches: 75,
    statements: 80
  },
  
  // Lighthouse Scores
  lighthouse: {
    performance: 95,
    accessibility: 100,
    bestPractices: 95,
    seo: 100
  },
  
  // Core Web Vitals
  webVitals: {
    lcp: '< 2.5s',
    inp: '< 200ms',
    cls: '< 0.1',
    fcp: '< 1.8s',
    ttfb: '< 800ms'
  }
};
```

### User Metrics

- **DAU/MAU Ratio:** >20%
- **Session Duration:** >5min avg
- **Bounce Rate:** <40%
- **Conversion Rate:** >2%

---

## 📚 COMPLETE DOCUMENTATION LINKS

### Official Docs (MUST READ!)

```markdown
## Frontend
✅ Next.js 15.5: https://nextjs.org/docs
✅ React 19: https://react.dev/
✅ TypeScript 5: https://www.typescriptlang.org/docs/

## UI & Styling
✅ shadcn/ui: https://ui.shadcn.com/docs
✅ Radix UI: https://www.radix-ui.com/primitives
✅ Tailwind v4: https://tailwindcss.com/docs

## Animation
✅ Framer Motion: https://www.framer.com/motion/
✅ GSAP: https://greensock.com/docs/

## State & Data
✅ TanStack Query: https://tanstack.com/query/latest
✅ Zustand: https://github.com/pmndrs/zustand
✅ React Hook Form: https://react-hook-form.com/
✅ Zod: https://zod.dev/

## Backend
✅ Supabase: https://supabase.com/docs
✅ Supabase Realtime: https://supabase.com/docs/guides/realtime
✅ Supabase Presence: https://supabase.com/docs/guides/realtime/presence
✅ Supabase Broadcast: https://supabase.com/docs/guides/realtime/broadcast

## Maps
✅ Google Maps JS API: https://developers.google.com/maps/documentation/javascript

## Testing
✅ Vitest: https://vitest.dev/
✅ React Testing Library: https://testing-library.com/react
✅ Playwright: https://playwright.dev/
✅ jest-axe: https://github.com/nickcolley/jest-axe

## Accessibility
✅ WCAG 2.1 Quick Ref: https://www.w3.org/WAI/WCAG21/quickref/
✅ A11y Project: https://www.a11yproject.com/
✅ MDN Accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility

## Performance
✅ Web.dev: https://web.dev/learn/
✅ Chrome DevTools: https://developer.chrome.com/docs/devtools/

## Deployment
✅ Vercel: https://vercel.com/docs
✅ Vercel CLI: https://vercel.com/docs/cli
```

---

## 🎉 FINAL SUMMARY

### Was dieses PRD enthält:

✅ **57+ Seiten komplett beschrieben**
   - Homepage mit allen Sections
   - Events/Spaces/Services mit Filtern
   - Community (3-column layout, Stories, Posts, Polls)
   - Blog System (Write, Edit, Categories, etc.)
   - Dashboard (10+ Unterseiten)
   - Pricing mit 3D Cards
   - Alle statischen Seiten (About, Contact, Help, Privacy, Terms, Imprint, FAQ, Safety, etc.)
   - User Profiles
   - Footer (komplett dokumentiert!)

✅ **Latest 2025 Tech Stack**
   - Node.js 24 LTS
   - npm 11.6.1
   - Next.js 15.5.4
   - React 19.2
   - TypeScript 5
   - shadcn/ui CLI 3.2
   - Tailwind CSS v4

✅ **Supabase Realtime komplett**
   - Postgres Changes (DB updates)
   - Broadcast (ephemere messages)
   - Presence (online status)
   - Messaging System
   - Typing Indicators
   - Live Updates

✅ **KEINE SQL Files - nur MCP Server!**
   - Komplette MCP Server Befehle
   - Schema inspection commands
   - RLS policy checks
   - Migration commands

✅ **Research-First Principle**
   - IMMER zuerst online recherchieren
   - Official docs VOR jedem Feature
   - Design patterns studieren
   - Accessibility guidelines checken

✅ **Development Phases**
   - Phase 1 (Wochen 1-12): UI mit Mock-Daten
   - Phase 2 (Wochen 13-16): Backend Integration
   - Phase 3 (Wochen 17-20): Testing & Optimization

✅ **Assets Ordner**
   - `/ASSETS_FOR_REBUILD` mit README
   - Alle Logos, Hero-Bilder, Category-Bilder
   - Bereit zum Kopieren

✅ **Developer Guidelines**
   - TypeScript Strict Mode
   - ESLint Zero-Error Policy
   - WCAG 2.1 AA Compliance
   - Testing Strategy
   - Git Conventions

✅ **Complete Code Examples**
   - Component patterns
   - Hook examples
   - Service layer patterns
   - Real-time implementations
   - Form handling
   - Error boundaries

---

## 📋 QUICK START GUIDE

```bash
# 1. Setup Environment
nvm install 24
nvm use 24
npm install -g npm@11.6.1

# 2. Create Project
npx create-next-app@latest nowtown-rebuild
cd nowtown-rebuild

# 3. Install shadcn/ui
npx shadcn@latest init

# 4. Copy Assets
cp -r ../NOWTOWN_REBUILD_ASSETS_PACKAGE/* public/

# 5. Install Dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install @tanstack/react-query zustand
npm install react-hook-form zod @hookform/resolvers
npm install framer-motion gsap
npm install @googlemaps/js-api-loader

# 6. Configure TypeScript strict mode
# Edit tsconfig.json → "strict": true

# 7. Setup ESLint
# Edit eslint.config.js

# 8. Start Development
npm run dev

# 9. Open Browser
http://localhost:3000
```

---

## 🎯 KRITISCHE ERINNERUNGEN

### 🚨 IMMER BEACHTEN:

1. **RECHERCHE FIRST**
   - Google official docs BEVOR du codest
   - Check WCAG guidelines
   - Study design patterns
   - Review similar implementations

2. **ZERO ERRORS**
   - ESLint: 0 errors
   - TypeScript: 0 errors
   - Build: Must succeed
   - Tests: Must pass

3. **ACCESSIBILITY**
   - WCAG 2.1 AA mandatory
   - Keyboard navigation
   - Screen reader support
   - Color contrast

4. **PERFORMANCE**
   - Build <25s
   - Lighthouse 95+
   - Images optimized
   - Code split

5. **TESTING**
   - Coverage >80%
   - Unit tests for services
   - Component tests
   - E2E for critical flows
   - Accessibility tests

6. **SUPABASE MCP**
   - Use MCP server for DB
   - NO SQL files
   - Check existing schema
   - Verify before changes

---

## 📞 QUESTIONS?

**Documentation:** Dieses PRD
**Assets:** `/NOWTOWN_REBUILD_ASSETS_PACKAGE/`
**Supabase:** MCP Server commands
**Node/npm:** Version 24 LTS / 11.6.1

**Remember:**
- Quality > Speed
- Research > Assumptions
- Testing > Guessing
- Accessibility > Features

---

**Version:** 3.0 FINAL
**Datum:** 3. Oktober 2025
**Status:** ✅ Ready for Development
**Pages Documented:** 57+
**Total Lines:** 3500+

**Viel Erfolg! 🚀**
