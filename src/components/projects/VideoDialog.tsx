"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { Project } from "./types"

export function VideoDialog({
  open,
  onOpenChange,
  youtubeId,
  project,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  youtubeId?: string
  project?: Partial<Pick<Project, "title" | "tags" | "year" | "client" | "role">>
}) {
  const title = project?.title || "Project video"
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-2xl w-[min(98vw,1600px)] border-0 bg-black p-0">
        {/* A11y: required title (visually hidden) */}
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {/* Video */}
        <div className="aspect-video w-full">
          {youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          )}
        </div>
        {/* Meta block */}
        {(project?.title || (project?.tags && project.tags.length > 0)) && (
          <div className="px-4 py-4 md:px-6 md:py-5">
            {project?.title && (
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base md:text-lg font-semibold tracking-tight">
                  {project.title}
                </h3>
                {project?.year && (
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                )}
              </div>
            )}
            {project?.tags && project.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 8).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-foreground/10 bg-white/5 px-2 py-0.5 text-[10px] leading-none text-foreground/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

