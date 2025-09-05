"use client"

import SideNav from '@/components/general/SideNav'
import Footer from '@/components/general/Footer'
import Navbar from '@/components/general/Navbar'
import { StoryblokStory } from '@storyblok/react/rsc'
import { createContext, useContext, useState } from 'react'

type SidebarContextType = {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextType | null>(null)
export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within SidebarContext")
  return ctx
}

export default function Wrapper({ story }: { story: unknown }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <main className="min-h-screen bg-background text-foreground">
        <SideNav />
        <Navbar />
        <div className={`p-4 md:p-8 transition-all ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
          <StoryblokStory story={story} />
          <Footer />
        </div>
      </main>
    </SidebarContext.Provider>
  )
}
