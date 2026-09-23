import { LatestNewsStrip } from "@/components/home/LatestNewsStrip";
import { HeroSection } from "@/components/home/HeroSection";
import { WelfarePrograms } from "@/components/home/WelfarePrograms";
import { LatestNewsSection } from "@/components/home/LatestNewsSection";
import { AchievementsSpotlight } from "@/components/home/AchievementsSpotlight";
import { GallerySection } from "@/components/home/GallerySection";
import { GetInTouchSection } from "@/components/home/GetInTouchSection";

export default function HomePage() {
  return (
    <>
      <LatestNewsStrip />
      <HeroSection />
      <WelfarePrograms />
      <LatestNewsSection />
      <AchievementsSpotlight />
      <GallerySection />
      <GetInTouchSection />
    </>
  );
}
