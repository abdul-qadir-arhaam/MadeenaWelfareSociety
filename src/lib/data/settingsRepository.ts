import fs from "fs";
import path from "path";

export interface SiteSettings {
  clubName: string;
  tagline: string;
  registrationNumber: string;
  establishedYear: string;
  email: string;
  phone: string;
  secondaryPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
  announcementActive: boolean;
  announcementText: string;
  announcementLink: string;
  heroBackgroundImage: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  clubName: "Madeena Welfare Society Bhatkal",
  tagline: "Empowering Community, Elevating Sports, Inspiring Youth Since 1993",
  registrationNumber: "DR/RGN/124/1993-94",
  establishedYear: "1993",
  email: "contact@madeenaws.bhatkal.org",
  phone: "+91 8386 226193",
  secondaryPhone: "+91 94481 23456",
  address: "Madeena Colony, Main Road",
  city: "Bhatkal",
  state: "Karnataka",
  pincode: "581320",
  instagramUrl: "https://www.instagram.com/madeenawelfaresociety",
  facebookUrl: "https://facebook.com/madeenawelfaresociety",
  youtubeUrl: "https://youtube.com/@madeenawelfaresociety",
  whatsappNumber: "+91 8386 226193",
  announcementActive: true,
  announcementText: "Cosmos Golden Jubilee Trophy Champions! Celebrations & Felicitation updates now live.",
  announcementLink: "/sports",
  heroBackgroundImage: "/images/instagram/insta_post_10.jpg",
};

const SETTINGS_FILE_PATH = path.join(process.cwd(), "data", "settings.json");

function loadStoredSettings(): SiteSettings {
  try {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const data = fs.readFileSync(SETTINGS_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
      };
    }
  } catch (err) {
    console.error("Failed to read settings.json:", err);
  }
  return { ...DEFAULT_SETTINGS };
}

function persistSettings(settings: SiteSettings) {
  try {
    const dir = path.dirname(SETTINGS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(settings, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write settings.json:", err);
  }
}

export function getSiteSettings(): SiteSettings {
  return loadStoredSettings();
}

export function updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
  const current = loadStoredSettings();
  const updated: SiteSettings = {
    ...current,
    ...updates,
  };
  persistSettings(updated);
  return updated;
}
