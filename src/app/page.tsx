import Intro from "@/app/components/Intro";
import RecentPosts from "@/app/components/RecentPosts";

import { getAllPosts } from "@/lib/api";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="flex-1">
      <Intro />

      <RecentPosts posts={posts}/>
    </main>
  );
}
