import Link from 'next/link'
import { Home, User, FolderOpen, Mail } from 'lucide-react'

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
        <span className="text-sm font-bold tracking-wider uppercase">
          Sonya Moorjani
        </span>
      </Link>

      <div className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-all [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive py-2 px-3 w-full justify-start gap-3 h-12 hover:text-primary"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
