"use client"

import Link from 'next/link'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const items = [
    {
      href: "#about",
      label: "About"
    },
    {
      href: "#services",
      label: "Services"
    },
    {
      href: "#projects",
      label: "Projects"
    },
    {
      href: "#contact",
      label: "Contact"
    }
  ]

  return (
    <header className="block md:hidden sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto w-full max-w-7xl flex h-14 items-center justify-between px-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="h-4 w-4 rounded-sm bg-foreground" />
          <span className="text-sm font-medium tracking-wider">
            Sonya Moorjani
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-base"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="#contact">
            <Button
              size="sm"
              variant="default"
              className="cursor-pointer"
            >
              Get in touch
            </Button>
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden">
                <span className="sr-only">Menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40"
            >
              {items.map((item) => (
                <DropdownMenuItem key={item.label}>
                  <a
                    href={item.href}
                    className="block w-full px-4 py-2 text-sm text-muted-foreground"
                  >
                    {item.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </header>
  )
}
