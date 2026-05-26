import type { Root } from 'hast'

export type Post = {
    title: string
    slug: string
    author?: string
    date?: string
    excerpt?: string
    content: string
    toc?: boolean
    tags?: string[]
    preview?: boolean
    links?: Set<string>
    ast: Root
    [key: string]: unknown
}
