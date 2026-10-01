import React from "react";
import { notFound } from "next/navigation";
import { getNewsBySlug, getNewsList } from "@/lib/data/newsRepository";
import { getCategories } from "@/lib/data/categoryRepository";
import { NewsDetailClient } from "@/components/news/NewsDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsItem = await getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  const allNews = await getNewsList({ status: "published" });
  const otherNews = allNews.filter((n) => n.slug !== slug).slice(0, 4);
  const categories = getCategories("news");

  return (
    <NewsDetailClient
      newsItem={newsItem}
      otherNews={otherNews}
      categories={categories}
    />
  );
}

