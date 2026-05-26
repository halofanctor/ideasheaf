import { join } from 'path'
import { type Root } from 'hast'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPathsInDirectory } from '@/lib/api'

import Rehype from '@/app/components/Rehype'

const blogDirectory = join(process.cwd(), "content", "blog");

type Props = {
  params: Promise<{ slug: string }>
}

interface ProseProps {
  title: string
  hast: Root
}

const Prose = ({ title, hast }: ProseProps) => {
  return (
    <main className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert mx-auto">
      <h1 className="text-3xl pb-4">{title}</h1>
      <Rehype hast={hast} />
    </main>
  )
}

// Page component
export default async function Page(props: Props) {
  const { slug } = await props.params
  const post = await getPostBySlug(`/blog/${slug}`)

  if (!post) {
    return notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-[var(--gap)]">
      <Prose
        title={post.title || "Untitled"}
        hast={post.ast}
      />
    </div>
  )
}


// Generate metadata
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const post = await getPostBySlug(`/blog/${slug}`)

  if (!post) {
    return notFound()
  }

  return {
    title: `${post.title || post.basename} | Ideasheaf`,
  }
}

// Generate static params
export async function generateStaticParams() {
  const paths = getAllPathsInDirectory(blogDirectory)
                  .map((p: string) => ({
                    slug: p.split("/").pop()!.replace(/\.org$/, ""),
                }));
  return paths;
}