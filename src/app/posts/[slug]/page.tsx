import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAdjacentPosts  } from "@/lib/api";
import { CMS_NAME } from "../../../lib/constants";
import markdownToHtml from "../../../lib/markdownToHtml";
import { Container } from "@/app/_components/container";
import { PostBody } from "../../_components/post-body";
import { PostHeader } from "../../_components/post-header";
import { PostFooter } from "@/app/_components/post-footer";
import PostNavigation from "@/app/_components/post-navigation";


import Spacer from "@/app/_components/_ui/Spacer"

import ShareButtons from "@/app/_components/_ui/ShareButtons"
import Breadcrumb from "@/app/_components/_ui/Breadcrumb"
import BackToTop from "@/app/_components/_ui/BackToTop"
import ReadingProgress from "@/app/_components/_ui/ReadingProgress"

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);
  const { prevPost, nextPost } = getAdjacentPosts(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main className="py-16">
      <ReadingProgress />
      <Container size="md">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]} />
        <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            category={post.category}
          />
        <article className="prose">
          <PostBody content={content} />
        </article>
        <PostFooter tags={post.tags} />
        <div className="px-4 border-y border-[var(--border)]">
          <ShareButtons title={post.title} />
        </div>
        <Spacer />
        <PostNavigation prevPost={prevPost} nextPost={nextPost} />
        <BackToTop />
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
