/**
 * Type definitions for Space image management with optional categorization
 */

export interface SpaceImage {
  url: string;
  category?: string;
  is_main?: boolean;
  order: number;
}

export interface SpaceImageInput {
  file?: File;
  url?: string;
  category?: string;
  is_main?: boolean;
  order: number;
}

export const DEFAULT_SPACE_IMAGE_CATEGORIES = [
  'Keine Kategorie',
  'Eingangsbereich',
  'Arbeitsbereich',
  'Besprechungsraum',
  'Küche',
  'Pausenraum',
  'Technik & Equipment',
  'Außenbereich',
  'Sanitäranlagen',
  'Lager & Stauraum',
] as const;

export type SpaceImageCategory = typeof DEFAULT_SPACE_IMAGE_CATEGORIES[number] | string;
