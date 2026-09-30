import React from "react";
import { getNewsList } from "@/lib/data/newsRepository";
import { NewsPageClient } from "@/components/news/NewsPageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const publishedNews = await getNewsList({ status: "published" });

  return <NewsPageClient initialNews={publishedNews} />;
}
