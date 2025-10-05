import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type ServiceInsert = Database['public']['Tables']['services']['Insert'];
type ServiceUpdate = Database['public']['Tables']['services']['Update'];

export interface ServiceFilters {
  category?: string | null;
  city?: string;
  maxPrice?: number;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export const servicesService = {
  async getServices(filters?: ServiceFilters): Promise<Service[]> {
    const supabase = createClient();
    let query = supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.city) {
      query = query.eq('city', filters.city);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('price_from', filters.maxPrice);
    }

    if (filters?.searchQuery) {
      query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch services: ${error.message}`);
    }

    return data || [];
  },

  async getServiceById(id: string): Promise<Service | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch service: ${error.message}`);
    }

    return data;
  },

  async createService(service: ServiceInsert): Promise<Service> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create service: ${error.message}`);
    }

    return data;
  },

  async updateService(id: string, updates: ServiceUpdate): Promise<Service> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update service: ${error.message}`);
    }

    return data;
  },

  async deleteService(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete service: ${error.message}`);
    }
  },

  async getServicesByProvider(providerId: string): Promise<Service[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch provider services: ${error.message}`);
    }

    return data || [];
  },
};
