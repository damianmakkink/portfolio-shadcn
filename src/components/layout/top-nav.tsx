"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-[var(--top-nav-height)] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-md bg-foreground" />
          <span className="text-sm font-semibold tracking-wide">Sonya Moorjani</span>
          {/* Collapse/hamburger to the right of the brand */}
          <SidebarTrigger className="ml-1" />
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="sm:h-8 sm:px-3 md:h-9 md:px-4" variant="outline">
            <Link href="#contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

