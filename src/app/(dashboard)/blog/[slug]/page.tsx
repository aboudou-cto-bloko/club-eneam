import { getPostBySlug, getAllPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#1a3a8f] transition-colors"
      >
        <ArrowLeft size={15} />
        Retour au blog
      </Link>

      <article>
        <div className="mb-6">
          {post.category && (
            <Badge className="bg-[#e8eef9] text-[#1a3a8f] border-0 text-[10px] mb-3">
              {post.category}
            </Badge>
          )}
          <h1 className="text-2xl font-bold text-[#0f172a] leading-tight">{post.title}</h1>
          <p className="text-sm text-[#22a84a] font-medium mt-2">{post.date}</p>
        </div>

        <div
          className="prose prose-sm max-w-none prose-headings:text-[#0f172a] prose-headings:font-bold prose-a:text-[#1a3a8f] prose-strong:text-[#0f172a]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
