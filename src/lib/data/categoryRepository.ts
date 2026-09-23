export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  type: "news" | "welfare" | "sports" | "gallery";
  isActive: boolean;
  description?: string;
  itemCount?: number;
}

export const INITIAL_CATEGORIES: CategoryItem[] = [
  // News Categories
  { id: "cat-1", name: "General", slug: "general", type: "news", isActive: true },
  { id: "cat-2", name: "Welfare", slug: "welfare", type: "news", isActive: true },
  { id: "cat-3", name: "Sports", slug: "sports", type: "news", isActive: true },
  { id: "cat-4", name: "Achievements", slug: "achievements", type: "news", isActive: true },
  { id: "cat-5", name: "Events", slug: "events", type: "news", isActive: true },
  { id: "cat-6", name: "Announcements", slug: "announcements", type: "news", isActive: true },

  // Welfare Categories
  { id: "cat-7", name: "Community Support", slug: "community-support", type: "welfare", isActive: true },
  { id: "cat-8", name: "Education", slug: "education", type: "welfare", isActive: true },
  { id: "cat-9", name: "Food Distribution", slug: "food-distribution", type: "welfare", isActive: true },
  { id: "cat-10", name: "Health Programs", slug: "health-programs", type: "welfare", isActive: true },

  // Sports Categories
  { id: "cat-11", name: "Cricket", slug: "cricket", type: "sports", isActive: true },
  { id: "cat-12", name: "Football", slug: "football", type: "sports", isActive: true },
  { id: "cat-13", name: "Tournaments", slug: "tournaments", type: "sports", isActive: true },

  // Gallery Categories
  { id: "cat-14", name: "Celebration", slug: "celebration", type: "gallery", isActive: true },
  { id: "cat-15", name: "Sports Gallery", slug: "sports-gallery", type: "gallery", isActive: true },
  { id: "cat-16", name: "Social Media", slug: "social-media", type: "gallery", isActive: true },
  { id: "cat-17", name: "Identity", slug: "identity", type: "gallery", isActive: true },
];

let inMemoryCategories = [...INITIAL_CATEGORIES];

export function getCategories(type?: string): CategoryItem[] {
  if (type) {
    return inMemoryCategories.filter((c) => c.type === type && c.isActive);
  }
  return inMemoryCategories;
}

export function getCategoryById(id: string): CategoryItem | undefined {
  return inMemoryCategories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return inMemoryCategories.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function createCategory(cat: Omit<CategoryItem, "id">): CategoryItem {
  const newCat: CategoryItem = {
    ...cat,
    id: `cat-${Date.now()}`,
  };
  inMemoryCategories.push(newCat);
  return newCat;
}

export function updateCategory(id: string, updates: Partial<CategoryItem>): CategoryItem | null {
  const index = inMemoryCategories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  inMemoryCategories[index] = { ...inMemoryCategories[index], ...updates };
  return inMemoryCategories[index];
}

export function deleteCategory(id: string): boolean {
  const index = inMemoryCategories.findIndex((c) => c.id === id);
  if (index === -1) return false;
  inMemoryCategories.splice(index, 1);
  return true;
}
