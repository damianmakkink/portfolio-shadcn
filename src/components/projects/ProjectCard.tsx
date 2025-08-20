"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
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
      className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      onClick={(e) => {
        if (onOpenVideo && getProjectYouTubeId(project)) {
          e.preventDefault()
          onOpenVideo(project)
        }
      }}
    >
      <Card
        className={cn(
          "overflow-hidden rounded-2xl border border-white/20 bg-card/5 transition-colors gap-0 py-0",
          "focus-within:ring-2 focus-within:ring-ring/60 focus-visible:ring-offset-0",
          "motion-safe:hover:shadow-lg/5 motion-safe:hover:-translate-y-[2px]",
          "transition-transform"
        )}
      >
        <div className="relative">
          <AspectRatio ratio={4 / 5}>
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

          {/* Bottom gradient overlay for legibility */}
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-32",
              "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
              "transition-colors group-hover:from-black/90 group-hover:via-black/50"
            )}
          />

          {/* Bottom text block: title + meta over gradient */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <h3 className="text-white text-base sm:text-lg font-semibold leading-snug truncate sm:line-clamp-2">{project.title}</h3>
            <p className="text-white/80 text-xs sm:text-sm mt-1 truncate">{meta}</p>
          </div>

          {/* Tag chips overlay */}
          <div className="absolute left-2 right-2 top-2 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-sm border border-white/15 bg-black/40 text-[10px] leading-none text-white/90 backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 2 && (
              <Badge variant="outline" className="rounded-full border border-white/15 bg-black/40 text-[10px] text-white/85">
                +{project.tags.length - 2}
              </Badge>
            )}
          </div>

          {/* Optional meta top-right (placeholder for a play icon or duration) */}
          {project.durationSec != null && (
            <div className="absolute right-2 top-2 rounded-md bg-black/55 border border-white/15 px-2 py-1 text-xs text-white/90 [font-variant-numeric:tabular-nums] backdrop-blur-sm">
              <span className="sr-only">Duration</span>{formatDuration(project.durationSec)}
            </div>
          )}
        </div>


      </Card>
    </Link>
  )
}

function formatDuration(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

