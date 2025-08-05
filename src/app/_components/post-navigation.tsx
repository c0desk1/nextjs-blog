import Link from "next/link";
import React from "react";

type Props = {
  prevPost?: {
    slug: string;
    title: string;
  };
  nextPost?: {
    slug: string;
    title: string;
  };
};

export default function PostNavigation({ prevPost, nextPost }: Props) {
  if (!prevPost && !nextPost) return null;

  return (
    <nav className="flex justify-between border-t border-[var(--border)] pt-8 text-md text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
      {prevPost ? (
        <Link href={`/posts/${prevPost.slug}`} className="hover:underline max-w-[45%]">
          ← {prevPost.title}
        </Link>
      ) : <div />}

      {nextPost ? (
        <Link href={`/posts/${nextPost.slug}`} className="hover:underline text-right max-w-[45%]">
          {nextPost.title} →
        </Link>
      ) : <div />}
    </nav>
  );
}
