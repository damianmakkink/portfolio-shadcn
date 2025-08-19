"use client"

import * as React from "react"
import {
  Home as HomeIcon,
  Folder,
  Mail,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,

  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Minimal site sidenav
  const primary = [
    { title: "Home", href: "/", icon: HomeIcon },
    { title: "Projects", href: "#projects", icon: Folder },
    { title: "Contact", href: "#contact", icon: Mail },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="size-5 rounded-sm bg-foreground" />
          <span className="text-sm font-semibold">SAHIL LULLA</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {primary.map((i) => (
              <SidebarMenuItem key={i.title}>
                <SidebarMenuButton asChild>
                  <a href={i.href}>
                    <i.icon />
                    <span>{i.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <a href="#reel" className="m-2 block rounded-md bg-primary px-3 py-2 text-center text-sm text-primary-foreground">
          Watch Reel
        </a>
      </SidebarFooter>
    </Sidebar>
  )
}
