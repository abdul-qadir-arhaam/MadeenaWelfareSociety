export interface Achievement {
  id: string;
  title: string;
  year: string;
  category: string;
  image: string;
  description: string;
  isFeatured: boolean;
  status: "published" | "draft";
}

let achievementsStore: Achievement[] = [
  {
    id: "ach-1",
    title: "Cosmos Golden Jubilee Trophy Winner (₹75,000 Cash Prize)",
    year: "2026",
    category: "Sports",
    image: "/images/instagram/insta_post_10.jpg",
    description: "MWS Youth Cricket squad defeated top regional sides to win the prestigious Cosmos Golden Jubilee Championship trophy and ₹75,000 in Bhatkal.",
    isFeatured: true,
    status: "published",
  },
  {
    id: "ach-2",
    title: "State Level Community Excellence & Humanitarian Honor",
    year: "2026",
    category: "Social Work",
    image: "/images/instagram/insta_post_8.jpg",
    description: "Recognized by regional authorities and civic federation for exemplary food relief, medical aid, and emergency support campaigns across Uttar Kannada.",
    isFeatured: true,
    status: "published",
  },
  {
    id: "ach-3",
    title: "Madina Ta'leemi Academic Excellence Milestone (₹10+ Lakhs)",
    year: "2025–2026",
    category: "Education",
    image: "/images/instagram/insta_post_11.jpg",
    description: "Surpassed ₹10 Lakhs in distributed merit scholarships, empowering 83+ students in Hifz, Fazilat, SSLC, PUC, and professional degree programs.",
    isFeatured: true,
    status: "published",
  },
  {
    id: "ach-4",
    title: "Bhatkal Night Turf Cricket Championship Trophy",
    year: "2025",
    category: "Sports",
    image: "/images/instagram/posts/post_DUcvUHVkYX-_1.jpg",
    description: "Undefeated championship run in the high-stakes night turf tournament under stadium floodlights.",
    isFeatured: false,
    status: "published",
  },
];

export function getAchievements(filter?: {
  status?: string;
  category?: string;
  search?: string;
}): Achievement[] {
  let list = [...achievementsStore];

  if (filter?.status && filter.status !== "all") {
    list = list.filter((a) => a.status === filter.status);
  }

  if (filter?.category && filter.category !== "all") {
    list = list.filter((a) => a.category.toLowerCase() === filter.category?.toLowerCase());
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }

  return list;
}

export function getAchievementById(id: string): Achievement | undefined {
  return achievementsStore.find((a) => a.id === id);
}

export function createAchievement(data: Omit<Achievement, "id">): Achievement {
  const newAch: Achievement = {
    ...data,
    id: `ach-${Date.now()}`,
  };
  achievementsStore.unshift(newAch);
  return newAch;
}

export function updateAchievement(
  id: string,
  updates: Partial<Achievement>
): Achievement | null {
  const index = achievementsStore.findIndex((a) => a.id === id);
  if (index === -1) return null;

  achievementsStore[index] = {
    ...achievementsStore[index],
    ...updates,
  };

  return achievementsStore[index];
}

export function deleteAchievement(id: string): boolean {
  const prevLen = achievementsStore.length;
  achievementsStore = achievementsStore.filter((a) => a.id !== id);
  return achievementsStore.length < prevLen;
}
