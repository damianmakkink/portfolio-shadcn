// @ts-nocheck
import * as Icons from 'lucide-react'

export default function Icon({ name, ...props }: { name: keyof typeof Icons; [key: string]: unknown }) {
  const LucideIcon = Icons[name]
  if (!LucideIcon) return null
  return <LucideIcon {...props} />
}
