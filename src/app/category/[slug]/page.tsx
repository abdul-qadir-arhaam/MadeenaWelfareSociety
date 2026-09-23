import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug } from "@/lib/data/categoryRepository";
import { getNewsList } from "@/lib/data/newsRepository";
import { Calendar, User, ArrowRight, Tag, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allNews = getNewsList({ status: "published" });
  const categoryNews = allNews.filter(
    (item) =>
      item.categoryId === category.id ||
      item.categoryName.toLowerCase() === category.name.toLowerCase() ||
      item.categoryName.toLowerCase().includes(category.slug.toLowerCase())
  );

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="mb-10">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#047857] mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All News</span>
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-[#047857] border-emerald-200 bg-emerald-50 text-xs">
            <Tag className="w-3 h-3 me-1" />
            <span>Category Archive</span>
          </Badge>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500">{categoryNews.length} Articles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2238] tracking-tight">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {/* Articles Grid */}
      {categoryNews.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Tag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-700">No articles found in this category</h3>
          <p className="text-xs text-slate-500 mt-1">Check back later or browse other categories.</p>
          <Link
            href="/news"
            className="inline-block mt-4 px-4 py-2 bg-[#047857] text-white text-xs font-semibold rounded-lg hover:bg-[#036449] transition-colors"
          >
            Browse All News
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categoryNews.map((article) => {
            const translation = article.translations.en || article.translations.kn || article.translations.ur;
            const title = translation?.title || article.slug;
            const excerpt = translation?.excerpt || "";

            return (
              <Card
                key={article.id}
                className="overflow-hidden border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <Image
                      src={article.featuredImage}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 start-3">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#047857] rounded-md shadow-xs border border-slate-200">
                        {article.categoryName}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{article.publishedAt}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>{article.author}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors line-clamp-2 leading-snug">
                      <Link href={`/news/${article.slug}`}>{title}</Link>
                    </h3>

                    {excerpt && (
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {excerpt}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#047857] hover:text-[#036449] transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
