import RecentPosts from "@/app/components/RecentPosts";

import { getAllPosts } from "@/lib/api";

export default async function WikiHome() {
  const posts = await getAllPosts();

  return (
    <main className="flex-1">
      <RecentPosts posts={posts}/>
    </main>
  );
}
