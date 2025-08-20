"use client"


import { Projects } from "@/components/projects/Projects"
import ContentSection from "@/components/content-3"
import { Contact7 } from "@/components/contact7"

// Inline components to keep everything in one file for now
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Hero content block (reel cover + copy) */}
      <ContentSection
        heading="Video Editor"
        description="Cutting stories with rhythm and taste. Commercials, music videos, narrative – delivered fast with a director’s eye and an engineer’s rigor."
        button={{ text: "Watch Reel", url: "#reel" }}
        imageSrc="/images/reel-cover.svg"
        imageAlt="Selected work"
      />

      {/* Selected work grid */}
      <Projects />

      {/* Contact */}
      <section id="contact" className="mx-auto w-full max-w-6xl px-4 md:px-6 py-12 md:py-16">
        <Contact7
          title="Get in touch"
          description="Connect with me for collaborations, questions, or opportunities."
          emailLabel="LinkedIn"
          emailDescription="Reach out on LinkedIn"
          email="https://www.linkedin.com/in/sonyamoorjani/"
          officeLabel="Email"
          officeDescription="I'll respond as soon as I can"
          officeAddress="hello@example.com"
          phoneLabel="Instagram"
          phoneDescription="Follow and DM"
          phone="https://www.instagram.com/sonya.moorjani/"
        />
      </section>

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