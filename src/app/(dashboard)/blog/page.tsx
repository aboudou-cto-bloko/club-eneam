import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Blog</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Comptes rendus, actualités et ressources du club
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Newspaper size={40} className="text-[#94a3b8] mb-4" />
          <p className="text-[#334155] font-medium">Aucun article pour l'instant</p>
          <p className="text-sm text-muted-foreground mt-1">
            Les comptes rendus des activités apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="border-border shadow-none hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="py-4 px-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-[#0f172a]">{post.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{post.excerpt}</p>
                      <p className="text-[11px] text-[#22a84a] font-medium mt-2">{post.date}</p>
                    </div>
                    {post.category && (
                      <Badge className="bg-[#e8eef9] text-[#1a3a8f] border-0 text-[10px] shrink-0">
                        {post.category}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
