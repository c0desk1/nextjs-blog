import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAdjacentPosts, getAllPosts } from "@/lib/api";
import { siteConfig } from "../../../lib/constants";
import markdownToHtml from "../../../lib/markdownToHtml";
import { Container } from "@/app/_components/container";
import { PostBody } from "../../_components/post-body";
import { PostHeader } from "../../_components/post-header";
import { PostFooter } from "@/app/_components/post-footer";
import PostNavigation from "@/app/_components/post-navigation";
import Spacer from "@/app/_components/_ui/Spacer";
import ShareButtons from "@/app/_components/_ui/ShareButtons";
import Breadcrumb from "@/app/_components/_ui/Breadcrumb";
import BackToTop from "@/app/_components/_ui/BackToTop";
import ReadingProgress from "@/app/_components/_ui/ReadingProgress";
import { Post as PostInterface } from "@/interfaces/post";

export default async function Post({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = (await getPostBySlug(slug)) as PostInterface;
  const { prevPost, nextPost } = await getAdjacentPosts(slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main className="py-16">
      <ReadingProgress />
      <Container size="md">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
        />
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = (await getPostBySlug(slug)) as PostInterface;

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${siteConfig.name}`;

  return {
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
