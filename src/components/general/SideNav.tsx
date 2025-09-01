import Link from 'next/link'
import { Home, User, FolderOpen, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { icon: Home, label: 'Home', href: '#' },
  { icon: User, label: 'About', href: '#about' },
  { icon: FolderOpen, label: 'Projects', href: '#projects' },
  { icon: Mail, label: 'Contact', href: '#contact' }
]

export default function SideNav() {
  return (
    <nav className="hidden md:block fixed left-0 top-0 h-full w-64 bg-card/50 backdrop-blur-sm border-r border-border p-6 z-50">
      <Link
        href="/"
        className="flex items-center gap-2 mb-12"
      >
        <div className="h-4 w-4 rounded-sm bg-foreground" />
        <span className="text-sm font-medium tracking-wider uppercase">
          Sonya Moorjani
        </span>
      </Link>

      <div className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-3 h-12 text-left hover:bg-accent/50"
            asChild
          >
            <a href={item.href}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </a>
          </Button>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <Button className="w-full">
          Get in touch
        </Button>
      </div>
    </nav>
  )
}
