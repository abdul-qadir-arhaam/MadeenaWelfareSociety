import React from "react";
import { getNewsList } from "@/lib/data/newsRepository";
import { NewsPageClient } from "@/components/news/NewsPageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function NewsPage() {
  const publishedNews = getNewsList({ status: "published" });

  return <NewsPageClient initialNews={publishedNews} />;
}
