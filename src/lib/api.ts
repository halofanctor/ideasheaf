import fs from "fs";
import { join, relative, sep } from "path";
import { type Post } from "@/types/post";
import orgToHtml from "@/lib/orgToHtml";
import { dateFormatter, makeExcerpt } from "@/lib/utils";

const contentDirectory = join(process.cwd(), "content");

function getPostPaths(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
            return getPostPaths(fullPath);
        }

        return entry.isFile() && entry.name.endsWith(".org")
            ? [fullPath]
            : [];
    });
}

export function getAllPaths(): string[] {
    return getPostPaths(contentDirectory);
}

export function getAllPathsInDirectory(dir: string): string[] {
    return getPostPaths(dir);
}

export function getAllSlugs(): string[] {
    return getPostPaths(contentDirectory).map((fullPath) =>
        relative(contentDirectory, fullPath)
            .replace(/\.org$/, "")
            .split(sep)
            .join("/")
    );
}

export function getAllSlugsInDirectory(dir: string): string[] {
    return getPostPaths(dir).map((fullPath) =>
        relative(dir, fullPath)
            .replace(/\.org$/, "")
            .split(sep)
            .join("/")
    );
}

export async function getPostBySlug(slug: string): Promise<Post> {
    const realSlug = slug.replace(/\.org$/, "");
    const fullPath = join(
        contentDirectory,
        ...realSlug.split("/")
    ) + ".org";

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${realSlug}`);
    }

    const fileContent = await fs.promises.readFile(fullPath, "utf-8");

    const post = await orgToHtml(fileContent);

    return {
        slug: realSlug,
        title: post.data?.title ?? realSlug,
        date: dateFormatter(post.data?.date),
        excerpt: post.data?.excerpt ?? makeExcerpt(post.data?.content), 
        content: post.data?.content ?? "",
        tags: post.data?.tags?.trim().split(/\s+/) ?? [],
        ast: post.result,
    };
}

export async function getAllPosts(): Promise<Post[]> {
    const posts = await Promise.all(
        getAllSlugs().map((slug) => getPostBySlug(slug))
    );

    return posts.sort((a, b) => {
        if (!a.date || !b.date) return 0;

        return (
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );
    });
}

export async function getAllPostsInDirectory(dir: string): Promise<Post[]> {
    const posts = await Promise.all(
        getAllSlugsInDirectory(dir).map((slug) => getPostBySlug(join(relative(contentDirectory, dir), slug)))
    );

    return posts.sort((a, b) => {
        if (!a.date || !b.date) return 0;

        return (
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );
    });
}