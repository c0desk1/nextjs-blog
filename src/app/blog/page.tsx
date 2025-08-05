'use client';

import { useState } from "react";
import { getAllPosts } from "@/lib/api";
import { Container } from "@/app/_components/container";
import { PostPreview } from "@/app/_components/post-preview";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const [visibleCount, setVisibleCount] = useState(6);

  const visiblePosts = allPosts.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <main className="py-16">
      <Container size="md">
        <h1 className="text-3xl font-bold mb-12">All Posts</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {visiblePosts.map((post) => (
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

        {visibleCount < allPosts.length && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 rounded bg-black text-white hover:bg-neutral-800 transition"
            >
              Load More
            </button>
          </div>
        )}
      </Container>
    </main>
  );
}
