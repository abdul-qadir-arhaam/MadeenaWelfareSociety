import { LatestNewsStrip } from "@/components/home/LatestNewsStrip";
import { HeroSection } from "@/components/home/HeroSection";
import { WelfarePrograms } from "@/components/home/WelfarePrograms";
import { LatestNewsSection } from "@/components/home/LatestNewsSection";
import { AchievementsSpotlight } from "@/components/home/AchievementsSpotlight";
import { GallerySection } from "@/components/home/GallerySection";
import { GetInTouchSection } from "@/components/home/GetInTouchSection";
import { getSiteSettings } from "@/lib/data/settingsRepository";
import { getNewsList } from "@/lib/data/newsRepository";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const settings = getSiteSettings();
  const publishedNews = await getNewsList({ status: "published" });

  return (
    <>
      <LatestNewsStrip initialNews={publishedNews} />
      <HeroSection initialBackgroundImage={settings.heroBackgroundImage} />
      <WelfarePrograms />
      <LatestNewsSection initialNews={publishedNews} />
      <AchievementsSpotlight />
      <GallerySection />
      <GetInTouchSection />
    </>
  );
}
