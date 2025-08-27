"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"
import type { Project } from "./types"

function extractYouTubeId(input?: string): string | undefined {
  if (!input) return undefined
  // If it's already an ID (no URL), return as-is
  if (!/^https?:\/\//.test(input)) return input
  try {
    const u = new URL(input)
    // youtu.be/<id>
    if (u.hostname.includes("youtu")) {
      if (u.pathname.startsWith("/watch")) {
        return u.searchParams.get("v") || undefined
      }
      const parts = u.pathname.split("/").filter(Boolean)
      // /shorts/<id> or /embed/<id> or /<id>
      return parts[1] || parts[0]
    }
  } catch {}
  return undefined
}

type MaybeVideoUrl = { videoUrl?: string }
function getProjectYouTubeId(project: Project | MaybeVideoUrl): string | undefined {
  const id = (project as Project).youtubeId
  const url = (project as MaybeVideoUrl).videoUrl
  return extractYouTubeId(id ?? url)
}


export function ProjectCard({
  project,
  href,
  onOpenVideo,
}: { project: Project; href?: string; onOpenVideo?: (p: Project) => void }) {
  const link = href ?? (project.slug ? `/projects/${project.slug}` : "#")

  // Prefer client line under the title; fall back to tag/year/duration if missing
  const meta = project.client
    ? project.client
    : [
        project.tags?.[0],
        project.year ? String(project.year) : undefined,
        project.durationSec != null ? formatDuration(project.durationSec) : undefined,
      ]
        .filter(Boolean)
        .join(" · ")

  return (
    <Link
      href={link}
      aria-label={`View project: ${project.title}`}
      className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      onClick={(e) => {
        if (onOpenVideo && getProjectYouTubeId(project)) {
          e.preventDefault()
          onOpenVideo(project)
        }
      }}
    >
      <Card
        className={cn(
          "overflow-hidden rounded-lg border bg-card transition-colors gap-0 py-0",
          "focus-within:ring-2 focus-within:ring-ring/60 focus-visible:ring-offset-0",
          "motion-safe:hover:shadow-lg/5 motion-safe:hover:-translate-y-[2px]",
          "transition-transform"
        )}
      >
        <div className="relative">
          <AspectRatio ratio={5 / 5}>
            {/* Using next/image prevents layout shift */}
            <Image
              src={project.cover}
              alt={`${project.title} poster`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className={cn(
                "object-cover transition will-change-transform",
                "group-hover:scale-[1.02] group-focus-within:scale-[1.02]",
                "motion-reduce:transition-none motion-reduce:transform-none"
              )}
            />
          </AspectRatio>

          {/* Overlay gradient for legibility */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              "bg-gradient-to-t from-background/70 via-background/20 to-transparent",
              "opacity-80 transition-opacity group-hover:opacity-90"
            )}
          />

          {/* Tag chips overlay */}
          <div className="absolute left-2 right-2 top-2 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-sm border-foreground/10 bg-background/30 text-[10px] leading-none text-foreground/90 backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 2 && (
              <Badge variant="outline" className="rounded-full bg-background/20 text-[10px]">
                +{project.tags.length - 2}
              </Badge>
            )}
          </div>

          {/* Optional meta top-right (placeholder for a play icon or duration) */}
          {project.durationSec != null && (
            <div className="absolute right-2 top-2 rounded-md bg-background/40 px-1.5 py-0.5 text-[10px] text-foreground backdrop-blur-sm">
              <span className="sr-only">Duration</span>{formatDuration(project.durationSec)}
            </div>
          )}
        </div>

        <CardContent className="p-4 min-h-20 flex flex-col gap-1">
          <h3 className="line-clamp-1 text-lg font-semibold tracking-tight">{project.title}</h3>
          <p className="line-clamp-1 text-xs sm:text-sm text-muted-foreground">{meta}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function formatDuration(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

