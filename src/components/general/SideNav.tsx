"use client"

import Link from 'next/link'
import {
  Home,
  User,
  FolderOpen,
  Mail,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import { motion, stagger } from 'motion/react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/Wrapper'

const navItems = [
  { icon: Home, label: 'Home', href: '#' },
  { icon: User, label: 'About', href: '#about' },
  { icon: FolderOpen, label: 'Projects', href: '#projects' },
  { icon: Mail, label: 'Contact', href: '#contact' }
]

export default function SideNav() {
  const { isCollapsed, setIsCollapsed } = useSidebar()

  const parentVariant = {
    show: {
      transition: {
        delayChildren: stagger(0.1)
      }
    }
  }

  const childVariant = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <nav className={
      `hidden md:block fixed left-0 top-0 h-full bg-card/50 backdrop-blur-sm border-r border-border/50 p-6 z-50 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`
    }>
      <Button
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-card border border-border hover:!bg-white"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </Button>

      <motion.div
        initial={{ opacity: 0, transform: 'translateX(-20px)' }}
        animate={{ opacity: 1, transform: 'translateX(0px)' }}
        viewport={{ once: true }}
      >
        <Link
          href="/"
          className={`flex items-center gap-2 mb-12 px-3`}
        >
          <div className="h-4 w-4 rounded-sm bg-foreground shrink-0" />
          <span className={`text-sm font-bold tracking-wider uppercase shrink-0 transition-opacity duration-300 ${
            isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            Sonya Moorjani
          </span>
        </Link>
      </motion.div>

      <motion.div
        variants={parentVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-2"
      >
        {navItems.map((item) => (
          <motion.div
            key={item.label}
            variants={childVariant}
          >
            <a
              href={item.href}
              className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-all [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive py-2 px-3 w-full justify-start gap-3 h-12 hover:text-primary"
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && item.label}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </nav>
  )
}
