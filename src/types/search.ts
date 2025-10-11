// Search parameter types for unified search functionality

export interface SearchParams {
  search?: string;
  location?: string;
  category?: string;
  subcategory?: string;
  from?: string;
  to?: string;
  guests?: number;
  adults?: number;
  children?: number;
  pets?: number;
}

// Event categories matching EventsFilterSidebar
export const eventCategories = [
  { id: 'kunst-kreativ', label: 'Kunst & Kreativ' },
  { id: 'musik-performance', label: 'Musik & Performance' },
  { id: 'sport-fitness', label: 'Sport & Fitness' },
  { id: 'familie-kinder', label: 'Familie & Kinder' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'essen-geniessen', label: 'Essen & Genießen' },
  { id: 'spontane-treffen', label: 'Spontane Treffen' },
  { id: 'party-nightlife', label: 'Party & Nightlife' },
] as const;

// Space types matching SpacesFilterSidebar
export const spaceTypes = [
  { id: 'tonstudio', label: 'Tonstudio' },
  { id: 'fotostudio', label: 'Fotostudio' },
  { id: 'werkstaetten', label: 'Werkstätten' },
  { id: 'kunst-toepfer', label: 'Kunst & Töpfer' },
  { id: 'popup-retail', label: 'Popup & Retail' },
  { id: 'sportraeume', label: 'Sporträume' },
  { id: 'gaming-podcast', label: 'Gaming & Podcast' },
  { id: 'kuechen-food', label: 'Küchen & Food' },
] as const;

// Service categories matching services page
export const serviceCategories = [
  { id: 'koeche', label: 'Köch:innen' },
  { id: 'training', label: 'Training' },
  { id: 'fotografie', label: 'Fotografie' },
  { id: 'musik', label: 'Musik' },
  { id: 'sport', label: 'Sport' },
  { id: 'workshop', label: 'Workshop' },
] as const;

// Type for main search categories
export type MainCategory = 'Events' | 'Räume' | 'Services';

// Map main categories to their subcategories
export const categoryMap = {
  Events: eventCategories,
  Räume: spaceTypes,
  Services: serviceCategories,
} as const;

// Helper function to build search URL
export function buildSearchUrl(category: MainCategory, params: SearchParams): string {
  const basePath = category === 'Events' ? '/events' : category === 'Räume' ? '/spaces' : '/services';
  const searchParams = new URLSearchParams();

  if (params.location) searchParams.set('location', params.location);
  if (params.subcategory) searchParams.set('category', params.subcategory);
  if (params.from) searchParams.set('from', params.from);
  if (params.to) searchParams.set('to', params.to);
  if (params.adults) searchParams.set('adults', params.adults.toString());
  if (params.children) searchParams.set('children', params.children.toString());
  if (params.pets) searchParams.set('pets', params.pets.toString());

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}