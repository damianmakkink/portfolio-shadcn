"use client"


import { Projects } from "@/components/projects/Projects"
import { Hero115 } from "@/components/hero115"

// Inline components to keep everything in one file for now
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <Hero115
        icon={null}
        heading="Video Editor"
        description="Cutting stories with rhythm and taste. Commercials, music videos, narrative – delivered fast with a director’s eye and an engineer’s rigor."
        button={{ text: "Watch Reel", url: "#reel" }}
        trustText={undefined}
        imageSrc="/images/reel-cover.svg"
        imageAlt="Selected work"
      />
      <Projects />
      <SiteFooter />
    </main>
  )
}



function SiteFooter() {
  return (
    <footer id="contact" className="border-t">
      <div className="mx-auto w-full max-w-6xl flex flex-col items-center justify-between gap-4 px-4 py-10 md:h-20 md:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sahil Lulla. All rights reserved.</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <a className="hover:text-foreground" href="#">Instagram</a>
          <a className="hover:text-foreground" href="#">Vimeo</a>
          <a className="hover:text-foreground" href="#">Email</a>
        </div>
      </div>
    </footer>
  )
}