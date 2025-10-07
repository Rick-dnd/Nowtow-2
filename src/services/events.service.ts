import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';
import { isValidUUID } from '@/lib/validation';
import { storageService } from './storage.service';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];
type EventUpdate = Database['public']['Tables']['events']['Update'];

export interface EventFilters {
  category?: string | null;
  city?: string;
  startDate?: string;
  endDate?: string;
  maxPrice?: number;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export const eventsService = {
  async getEvents(filters?: EventFilters): Promise<Event[]> {
    const supabase = createClient();
    let query = supabase
      .from('events')
      .select('*')
      .order('start_datetime', { ascending: true });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.city) {
      query = query.eq('city', filters.city);
    }

    if (filters?.startDate) {
      query = query.gte('start_datetime', filters.startDate);
    }

    if (filters?.endDate) {
      query = query.lte('start_datetime', filters.endDate);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('ticket_price', filters.maxPrice);
    }

    if (filters?.searchQuery) {
      query = query.or(`name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }

    return data || [];
  },

  async getEventById(id: string): Promise<Event | null> {
    // Validate UUID format before querying to prevent 400 errors
    if (!isValidUUID(id)) {
      return null;
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch event: ${error.message}`);
    }

    return data;
  },

  async createEvent(event: EventInsert): Promise<Event> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create event: ${error.message}`);
    }

    return data;
  },

  async updateEvent(id: string, updates: EventUpdate): Promise<Event> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update event: ${error.message}`);
    }

    return data;
  },

  async deleteEvent(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete event: ${error.message}`);
    }
  },

  async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('organizer_id', organizerId)
      .order('start_datetime', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch organizer events: ${error.message}`);
    }

    return data || [];
  },

  async incrementAttendees(id: string, count: number = 1): Promise<Event> {
    const supabase = createClient();

    const { data: event } = await supabase
      .from('events')
      .select('current_attendees')
      .eq('id', id)
      .single();

    if (!event) {
      throw new Error('Event not found');
    }

    const { data, error } = await supabase
      .from('events')
      .update({ current_attendees: (event.current_attendees ?? 0) + count })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update attendees: ${error.message}`);
    }

    return data;
  },

  async uploadEventImages(eventId: string, files: File[]): Promise<string[]> {
    if (files.length === 0) return [];

    try {
      const uploadResults = await storageService.uploadMultipleFiles('event-images', files);
      const imageUrls = uploadResults.map((result) => result.publicUrl);

      const supabase = createClient();
      const { error } = await supabase
        .from('events')
        .update({ images: imageUrls })
        .eq('id', eventId);

      if (error) {
        throw new Error(`Failed to update event images: ${error.message}`);
      }

      return imageUrls;
    } catch (error) {
      throw new Error(`Failed to upload event images: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};
