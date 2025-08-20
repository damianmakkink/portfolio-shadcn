"use client"

import { useMemo, useState, type ReactNode } from "react"
import { LazyMotion, domAnimation, m } from "framer-motion"

import { Asterisk, Bot, Palette, FileText, Scissors, BookOpenText, Factory, Megaphone, FlaskConical, Sparkles } from "lucide-react"

// Icon mapping for tag labels (h-4 w-4)
const TAG_ICON: Record<string, ReactNode> = {
  All: <Asterisk className="h-4 w-4" aria-hidden={true} />,
  AI: <Bot className="h-4 w-4" aria-hidden={true} />,
  Color: <Palette className="h-4 w-4" aria-hidden={true} />,
  Docu: <FileText className="h-4 w-4" aria-hidden={true} />,
  Edit: <Scissors className="h-4 w-4" aria-hidden={true} />,
  Narrative: <BookOpenText className="h-4 w-4" aria-hidden={true} />,
  Production: <Factory className="h-4 w-4" aria-hidden={true} />,
  Promo: <Megaphone className="h-4 w-4" aria-hidden={true} />,
  "R&D": <FlaskConical className="h-4 w-4" aria-hidden={true} />,
  VFX: <Sparkles className="h-4 w-4" aria-hidden={true} />,
}

import { ProjectCard } from "./ProjectCard"
import { projects as ALL, TAGS } from "../../../projects"

import type { Project } from "./types"
import { VideoDialog } from "./VideoDialog"

// Helper to accept either youtubeId (id) or videoUrl (full URL) from /projects.ts
const extractYouTubeId = (input?: string): string | undefined => {
  if (!input) return undefined
  if (!/^https?:\/\//.test(input)) return input
  try {
    const u = new URL(input)
    if (u.hostname.includes("youtu")) {
      if (u.pathname.startsWith("/watch")) return u.searchParams.get("v") || undefined
      const parts = u.pathname.split("/").filter(Boolean)
      return parts[1] || parts[0]
    }
  } catch {}
  return undefined
}


export function Projects() {
  // Dialog state
  const [videoOpen, setVideoOpen] = useState(false)
  const [videoProject, setVideoProject] = useState<Project | null>(null)
  const openVideo = (p: Project) => {
    setVideoProject(p)
    setVideoOpen(true)
  }
  const activeYouTubeId: string | undefined = extractYouTubeId(
    videoProject?.youtubeId
  ) ?? extractYouTubeId((videoProject as unknown as { videoUrl?: string })?.videoUrl)

  // Filter state (single-select)
  const [active, setActive] = useState<string>("All")

  // Filtered list
  const filtered = useMemo(
    () => (active === "All" ? ALL : ALL.filter((p) => p.tags.includes(active))),
    [active]
  )

  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 md:px-6 pt-12 md:pt-16 pb-20 md:pb-24">
      <div className="mb-4 flex items-center justify-between">
        <LazyMotion features={domAnimation}>
          <m.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-3xl md:text-4xl leading-tight tracking-[-0.01em] font-semibold"
          >
            Projects
          </m.h2>
        </LazyMotion>
      </div>

      {/* Tag row — Variant A: underline micro-nav with icons */}
      <div className="mb-6 md:mb-8 flex flex-wrap items-center gap-5 md:gap-7">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            aria-pressed={active === t}
            className={[
              // Base micro-typography
              "relative inline-flex h-10 items-center gap-2 px-1.5 py-2 uppercase tracking-[0.14em] text-[11px] md:text-xs font-medium",
              // Calm → Active/hover color
              "text-white/70 hover:text-white",
              active === t ? "text-white" : "",
              // Underline indicator
              "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform",
              active === t ? "after:scale-x-100" : "",
              // Focus ring
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            ].join(" ")}
          >
            <span className="shrink-0">{TAG_ICON[t]}</span>
            <span className="whitespace-nowrap">{t}</span>
          </button>
        ))}
      </div>

      <LazyMotion features={domAnimation}>
        <m.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-6 sm:gap-x-6 sm:gap-y-8 lg:gap-x-2 lg:gap-y-2"
        >
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-xl border p-8 text-center text-sm text-muted-foreground">
            <p>No projects match this tag.</p>
          </div>
        ) : (
          filtered.map((p) => (
            <m.div key={p.id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
              <ProjectCard project={p} onOpenVideo={openVideo} />
            </m.div>
          ))
        )}
        </m.div>
      </LazyMotion>

      <VideoDialog
        open={videoOpen}
        onOpenChange={setVideoOpen}
        youtubeId={activeYouTubeId}
        project={videoProject ?? undefined}
      />
    </section>
  )
}

