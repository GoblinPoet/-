import { getAllContent } from '@/lib/content';
import HomeContent from '@/components/HomeContent';

// This is a Server Component that runs at build time
export default async function Home() {
  const posts = await getAllContent();
  return <HomeContent initialPosts={posts} />;
}
