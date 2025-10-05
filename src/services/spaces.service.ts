import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Space = Database['public']['Tables']['spaces']['Row'];
type SpaceInsert = Database['public']['Tables']['spaces']['Insert'];
type SpaceUpdate = Database['public']['Tables']['spaces']['Update'];

export interface SpaceFilters {
  type?: string | null;
  spaceType?: string | null; // Alias for type
  city?: string;
  maxPrice?: number;
  minCapacity?: number;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export const spacesService = {
  async getSpaces(filters?: SpaceFilters): Promise<Space[]> {
    const supabase = createClient();
    let query = supabase
      .from('spaces')
      .select('*')
      .order('created_at', { ascending: false });

    const spaceTypeValue = filters?.type || filters?.spaceType;
    if (spaceTypeValue) {
      query = query.eq('type', spaceTypeValue);
    }

    if (filters?.city) {
      query = query.eq('city', filters.city);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('hourly_price', filters.maxPrice);
    }

    if (filters?.minCapacity !== undefined) {
      query = query.gte('capacity', filters.minCapacity);
    }

    if (filters?.searchQuery) {
      query = query.or(`name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters?.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch spaces: ${error.message}`);
    }

    return data || [];
  },

  async getSpaceById(id: string): Promise<Space | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch space: ${error.message}`);
    }

    return data;
  },

  async createSpace(space: SpaceInsert): Promise<Space> {
    const supabase = createClient();
    const { data, error} = await supabase
      .from('spaces')
      .insert(space)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create space: ${error.message}`);
    }

    return data;
  },

  async updateSpace(id: string, updates: SpaceUpdate): Promise<Space> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('spaces')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update space: ${error.message}`);
    }

    return data;
  },

  async deleteSpace(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('spaces')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete space: ${error.message}`);
    }
  },

  async getSpacesByOwner(ownerId: string): Promise<Space[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch owner spaces: ${error.message}`);
    }

    return data || [];
  },
};
