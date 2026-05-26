import Link from "next/link";
import { type Post } from "@/types/post";

function PostEntry({ post }: { post: Post }) {
    return (
        <article className="
            relative mb-[var(--gap)] p-[var(--gap)]
            rounded-[var(--radius)]
            border border-transparent
            bg-transparent
            transition-colors duration-150
            hover:bg-[var(--entry)]
            hover:border-[var(--border)]
            active:scale-[0.98]
        ">
            {/* Post link */}
            <Link href={`/${post.slug}`} className="block">
                <h2 className="text-xl font-semibold">
                    {post.title}
                </h2>
            </Link>

            <p className="text-neutral-500 mt-1">
                {post.excerpt}
            </p>

            <footer className="relative mt-4 text-sm text-[#777]">
                {/* Tags */}
                {post.tags?.map((tag) => (
                    <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="mr-2 text-xs font-mono rounded-full border border-neutral-200 px-2 py-0.5 before:content-['#'] hover:text-black"
                    >
                        {tag}
                    </Link>
                ))}

                {/* Date */}
                <span className="absolute right-0">
                    {post.date}
                </span>
            </footer>
        </article>
    );
}

export default function PostList({ posts }:{ posts: Post[] }) {
    return (
        <section>
            {posts.map((post) => (
                <PostEntry key={post.slug} post={post} />
            ))}
        </section>
    );
}