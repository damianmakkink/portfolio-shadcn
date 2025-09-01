export type Project = {
  id: string
  title: string
  slug?: string
  cover: string // URL or /public path
  year?: number
  durationSec?: string
  tags: string[]
  client?: string
  role?: string[]
  createdAt?: string // ISO, used for Latest fallback
}

