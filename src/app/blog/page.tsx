import { join } from "path";
import PostList from "@/app/components/PostList";
import { getAllPostsInDirectory } from "@/lib/api";

const blogDirectory = join(process.cwd(), "content", "blog");

export default async function BlogHome() {
  const posts = await getAllPostsInDirectory(blogDirectory);

  return (
    <main className="mx-auto py-[var(--gap)]">
      <PostList posts={posts}/>
    </main>
  );
}
