import Link from "next/link";
import { FaRss } from "react-icons/fa"; 
import { type Post } from "@/types/post";

function RecentPostEntry({ post }: { post: Post }) {
    const type = post.slug.startsWith("wiki/")
        ? "wiki"
        : "blog";

    return (
        <li
            className="
                grid
                grid-cols-[6rem_3.2rem_1fr_auto]
                items-baseline
                gap-4
                border-b border-dotted border-neutral-200
                py-2
            "
        >
            <time className="whitespace-nowrap text-sm text-neutral-500 tabular-nums">
                {post.date}
            </time>

            <span className="text-xs text-neutral-700 before:content-['@'] font-mono rounded-full border border-neutral-200 px-2 py-0.5">
                {type}
            </span>

            <Link
                href={`/${post.slug}`}
                className="truncate hover:underline"
            >
                {post.title}
            </Link>

            <div className="flex-1 min-w-0 flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-neutral-500">
                {post.tags?.map((tag) => (
                    <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="whitespace-nowrap rounded-full border border-neutral-200 px-2 py-0.5 before:content-['#'] hover:text-black"
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </li>
    );
}

export default function RecentPosts({ posts }: { posts: Post[] }) {
    return (
        <section className="mx-auto max-w-4xl px-[var(--gap)]">
            <div className="flex items-baseline py-[var(--gap)]">
                <h2 className="pr-2"> Recent Posts </h2>
                <Link 
                    href="/"
                >
                <FaRss />
                </Link>
            </div>
            <ul className="space-y-1">
                {posts.map((post) => (
                    <RecentPostEntry key={post.slug} post={post} />
                ))}
            </ul>
        </section>
    );
}