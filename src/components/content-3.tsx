import { Button } from '@/components/ui/button'

type ContentHeroProps = {
  heading?: string
  description?: string
  button?: { text: string; url: string }
  imageSrc?: string
  imageAlt?: string
}

export default function ContentSection({
  heading = 'Video Editor',
  description = "Cutting stories with rhythm and taste. Commercials, music videos, narrative – delivered fast with a director’s eye and an engineer’s rigor.",
  button = { text: 'Watch Reel', url: '#reel' },
  imageSrc = '/images/reel-cover.svg',
  imageAlt = 'Selected work',
}: ContentHeroProps) {
  return (
    <section className="overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col gap-6">
          {/* Video/cover first */}
          <div id="reel" className="relative mb-8 md:mb-12 scroll-mt-[var(--top-nav-height,64px)] rounded-lg overflow-hidden border border-foreground/10 bg-background/5">
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/25 to-transparent" />
            {/* Using plain img to mirror existing hero. Can be swapped to next/image later. */}
            <img src={imageSrc} alt={imageAlt} className="w-full aspect-[16/9] object-cover" />
            <div className="absolute top-2 left-2 text-xs text-foreground/75 px-2 py-1 rounded-sm border border-foreground/15 bg-background/40">Selected work</div>
          </div>

          {/* Copy block below in a split layout */}
          <div className="relative grid items-start gap-6 md:grid-cols-[1fr_minmax(320px,420px)] md:gap-10">
            {/* Heading column */}
            <div className="flex flex-col gap-3">
              <h2 className="max-w-3xl text-left text-4xl md:text-5xl leading-tight tracking-[-0.02em] font-medium text-balance">
                {heading}
              </h2>
            </div>

            {/* Description / CTA column */}
            <div className="flex flex-col gap-3">
              <p className="text-base md:text-[17px] leading-relaxed text-muted-foreground max-w-[65ch]">
                {description}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-white text-black px-4 py-2 text-sm md:text-[15px] font-medium hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <a href={button.url}>{button.text}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
