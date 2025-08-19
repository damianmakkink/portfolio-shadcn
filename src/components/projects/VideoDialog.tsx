"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"

export function VideoDialog({
  open,
  onOpenChange,
  youtubeId,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  youtubeId?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-xl w-[min(96vw,1200px)] border-0 bg-black p-0">
        <div className="aspect-video w-full">
          {youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title="YouTube video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

