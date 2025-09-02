"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"
import type { Project } from "./types"

export function ProjectCard({ project }: { project: Project }) {
  const meta = [
    project.tags?.[0],
    project.year ? String(project.year) : undefined,
    project.durationSec != null ? formatDuration(project.durationSec) : undefined,
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <Card
      className={cn(
        "overflow-hidden border bg-card transition-colors gap-0 py-0 group",
        "focus-within:ring-1 focus-within:ring-ring/50"
      )}
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={4 / 5}>
          {/* Using next/image prevents layout shift */}
          <Image
            src={project.cover}
            alt={`${project.title} poster`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={cn(
              "object-cover transition will-change-transform duration-300",
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
          {project.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-full border-foreground/10 bg-background/30 text-[10px] leading-none text-foreground/90 backdrop-blur-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Optional meta top-right (placeholder for a play icon or duration) */}
        {project.durationSec != null && (
          <div className="absolute right-2 top-2 bg-background/40 px-1.5 py-0.5 text-[10px] text-foreground backdrop-blur-sm">
            <span className="sr-only">Duration</span>{formatDuration(project.durationSec)}
          </div>
        )}
      </div>

      <CardContent className="border-t p-4">
        <h3 className="line-clamp-1 text-base font-semibold tracking-tight">{project.title}</h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">{meta}</p>
      </CardContent>
    </Card>
  )
}

function formatDuration(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

