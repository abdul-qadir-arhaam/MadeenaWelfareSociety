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
}

let settingsStore: SiteSettings = {
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
};

export function getSiteSettings(): SiteSettings {
  return { ...settingsStore };
}

export function updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
  settingsStore = {
    ...settingsStore,
    ...updates,
  };
  return { ...settingsStore };
}
