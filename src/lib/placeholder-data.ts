import type { Database } from '@/types/database';

type Event = Database['public']['Tables']['events']['Row'];
type Space = Database['public']['Tables']['spaces']['Row'];
type Service = Database['public']['Tables']['services']['Row'];

// Empty arrays for components that need to show empty states when no real data exists
export const emptyEvents: Event[] = [];
export const emptySpaces: Space[] = [];
export const emptyServices: Service[] = [];
