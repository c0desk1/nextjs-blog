// src/app/blog/page.tsx
import { getAllPosts } from "@/lib/api";
import { PostPreview } from "@/app/_components/post-preview";
import { Container } from "@/app/_components/container";

export default function BlogPage() {
  const posts = getAllPosts(); // ✅ fs hanya dipanggil di server

  return (
    <main className="py-16">
      <Container size="md">
        <h1 className="text-3xl font-bold mb-12">All Posts</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {posts.map((post) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              excerpt={post.excerpt}
              author={post.author}
              slug={post.slug}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
