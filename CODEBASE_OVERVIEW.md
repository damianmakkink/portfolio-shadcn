# Codebase Overview (my-landing)

This document is a concise, practical guide to the repository so another agent can quickly understand structure, responsibilities, and how to extend it. It follows shadcn + Tailwind conventions (Next.js App Router).

## Stack
- Next.js 15 (App Router) with Turbopack for dev
- React 19
- Tailwind CSS v4 with shadcn/ui components
- Radix UI primitives under the hood (dialogs, sheets, navigation)

## Key conventions
- Dark-first design; CSS variables defined in src/app/globals.css
- Fixed top navigation with CSS var `--top-nav-height` (48px)
- Section containers use `mx-auto w-full max-w-6xl px-4`
- Spacing rhythm: section paddings via `pt-*/pb-*`. Anchors use `scroll-mt-[var(--top-nav-height)]` when needed

## App layout
- src/app/layout.tsx
  - Applies fonts and theme classes
  - Provides the shadcn Sidebar layout primitives
  - Renders `TopNav`, then wraps the page in `SidebarInset` with padding top for fixed header (`pt-[var(--top-nav-height)]`)
- src/app/page.tsx
  - Home page: `<Hero115 />`, `<Projects />`, and local `SiteFooter`

## Navigation and layout components
- src/components/layout/top-nav.tsx
  - Fixed header; brand + SidebarTrigger and a CTA button linking to `#contact`
- src/components/ui/sidebar.tsx
  - Full shadcn Sidebar implementation (Provider, Sidebar, SidebarInset, etc.)
  - `SidebarInset` is used by layout.tsx to render the page content area

## Hero section
- src/components/hero115.tsx (exported as Hero115)
  - Props: `{ icon?, heading, description, button: { text, url, icon? }, trustText?, imageSrc?, imageAlt? }`
  - Structure: media (image cover) on top, then a 2-col split for copy on `md+`
  - Recent UX tweaks:
    - Reduced section padding to bring hero higher: `pt-12 pb-16 md:pt-16 md:pb-20`
    - Reduced gaps inside to `gap-6` and `gap-3`
    - Added `scroll-mt-[var(--top-nav-height,64px)]` to the `#reel` anchor target
    - Softened decorative radial backdrop and hide it on small screens
    - Aligned media to container left (removed `mx-auto` on image)

## Projects grid
- src/components/projects/Projects.tsx (client component)
  - Imports projects dataset from `/projects.ts` at repo root:
    - `import { projects as ALL, TAGS } from "../../../projects"`
  - Local state:
    - `active` (single-select filter)
    - Video dialog state: `videoOpen`, `videoProject`
  - `extractYouTubeId()` helper accepts either a direct ID or various YouTube URL formats and returns an ID
  - Renders:
    - Section container with reduced spacing: `pt-12 pb-16 md:pt-14 md:pb-20`
    - Title (Projects)
    - Filter pill bar (unstyled buttons with minimal styles)
    - Responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
    - `ProjectCard` items; clicking a card opens the dialog if a YouTube/video is present
    - `VideoDialog` with `youtubeId` derived from either `youtubeId` or `videoUrl` in data

- src/components/projects/ProjectCard.tsx
  - Uses next/image inside a fixed AspectRatio for stable layout
  - Accepts `{ project, href?, onOpenVideo? }`
  - If `onOpenVideo` exists and a YouTube id can be derived from the project, intercepts click and calls `onOpenVideo(project)` instead of navigating
  - Shows top-left tag badges and optional duration chip

- src/components/projects/VideoDialog.tsx
  - Props: `{ open, onOpenChange, youtubeId?, project? }`
  - Dialog content is a wide video player (16:9) with optional meta (title, year, tags)

- src/components/projects/types.ts
  - Shared type used by project components

## Projects data
- my-landing/projects.ts (primary dataset)
  - `export type Project` definition
  - `export const projects: Project[]` large list (id, title, cover, tags, etc.)
  - Some entries include `videoUrl` (YouTube links including shorts, watch, etc.)
  - `export const TAGS` master list used by filter bar (e.g., All, AI, Color, Docu, Edit, Narrative, Production, Promo, R&D, VFX)
- Note: There is also `src/components/projects/data.ts` (a smaller sample dataset used earlier); current UI reads from `/projects.ts` at repo root

## Styling and theme
- src/app/globals.css
  - Tailwind v4 imports; design tokens via CSS variables for light/dark
  - `--top-nav-height: 3rem` used for header height and scroll margins
  - Minimal base layer applying bg/text color and borders

## UI primitives (shadcn)
- src/components/ui/* contains generated shadcn components: button, card, dialog, sheet, sidebar, badges, etc.

## Build & scripts
- package.json
  - `dev`: `next dev --turbopack`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `next lint`

## How to run
1. `npm install`
2. `npm run dev` — open http://localhost:3000
3. `npm run build && npm start` for production build

## Extending the site
- Add new projects by editing `/projects.ts` (cover URLs can be remote; Next.js Image is configured to accept remote sources via next.config if present; otherwise use static `/public` paths)
- To support Vimeo or local MP4 playback in the dialog, extend `extractYouTubeId` or add a `source` enum and player detection in `VideoDialog`
- To adjust spacing system-wide:
  - Hero: tweak paddings/gap in `src/components/hero115.tsx`
  - Projects section paddings in `src/components/projects/Projects.tsx`
  - Global header height: `--top-nav-height` in `globals.css`

## Known considerations
- Lint warns about using `<img>` in `hero115.tsx`; consider switching to `next/image` for optimized LCP
- Two datasets exist; ensure consumers use `/projects.ts` (the root one). The smaller `src/components/projects/data.ts` can be removed if no longer needed

## File map (high level)
- src/app/
  - layout.tsx (providers + shell)
  - page.tsx (home)
  - globals.css (theme + tokens)
- src/components/
  - hero115.tsx (hero section)
  - layout/top-nav.tsx (fixed header)
  - projects/
    - Projects.tsx
    - ProjectCard.tsx
    - VideoDialog.tsx
    - types.ts
  - ui/… (shadcn primitives, including sidebar)
- projects.ts (data)

If you need a deeper dive into any module, ask for a focused walkthrough and I’ll expand this doc with examples and sequences.

