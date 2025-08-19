"use client"

import { useMemo, useState } from "react"

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
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 pt-12 pb-16 md:pt-14 md:pb-20">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Projects</h2>
      </div>

      {/* Top tags bar — sharp edge, negative space */}
      <div className="mb-6 flex flex-wrap items-center gap-1">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            aria-current={active === t ? "true" : undefined}
            className={[
              "px-2 py-1 text-sm",
              "rounded-none",
              "text-muted-foreground hover:text-foreground",
              active === t ? "bg-muted/30 text-foreground" : "bg-transparent",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-xl border p-8 text-center text-sm text-muted-foreground">
            <p>No projects match this tag.</p>
          </div>
        ) : (
          filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onOpenVideo={openVideo} />
          ))
        )}
      </div>

      <VideoDialog
        open={videoOpen}
        onOpenChange={setVideoOpen}
        youtubeId={activeYouTubeId}
        project={videoProject ?? undefined}
      />
    </section>
  )
}

