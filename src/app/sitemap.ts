import { MetadataRoute } from "next";
import { getNewsList } from "@/lib/data/newsRepository";
import { getGalleryAlbums } from "@/lib/data/galleryRepository";
import { getCategories } from "@/lib/data/categoryRepository";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static Core Routes
  const staticRoutes = [
    "",
    "/about",
    "/welfare",
    "/sports",
    "/achievements",
    "/gallery",
    "/news",
    "/contact",
    "/search",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic News Articles
  const news = getNewsList({ status: "published" });
  const newsRoutes = news.map((item) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: new Date(item.publishedAt || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic Gallery Albums
  const albums = getGalleryAlbums({ status: "published" });
  const albumRoutes = albums.map((alb) => ({
    url: `${baseUrl}/gallery/${alb.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic Category Archives
  const categories = getCategories();
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes, ...albumRoutes, ...categoryRoutes];
}
