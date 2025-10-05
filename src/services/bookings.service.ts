import { createClient } from '@/lib/supabase/client';
import type { Booking, BookingInsert, BookingUpdate } from '@/types/database';

export interface BookingFilters {
  userId?: string;
  bookableType?: string;
  bookableId?: string;
  status?: string;
}

export const bookingsService = {
  async createBooking(data: BookingInsert): Promise<Booking> {
    const supabase = createClient();

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create booking: ${error.message}`);
    }

    return booking;
  },

  async getBooking(id: string): Promise<Booking | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch booking: ${error.message}`);
    }

    return data;
  },

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch user bookings: ${error.message}`);
    }

    return data;
  },

  async getBookingsByBookable(
    bookableType: string,
    bookableId: string
  ): Promise<Booking[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('bookable_type', bookableType)
      .eq('bookable_id', bookableId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }

    return data;
  },

  async getBookings(filters?: BookingFilters): Promise<Booking[]> {
    const supabase = createClient();

    let query = supabase.from('bookings').select('*');

    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }

    if (filters?.bookableType) {
      query = query.eq('bookable_type', filters.bookableType);
    }

    if (filters?.bookableId) {
      query = query.eq('bookable_id', filters.bookableId);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) {
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }

    return data;
  },

  async updateBooking(id: string, updates: BookingUpdate): Promise<Booking> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update booking: ${error.message}`);
    }

    return data;
  },

  async cancelBooking(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to cancel booking: ${error.message}`);
    }
  },

  async confirmBooking(id: string): Promise<Booking> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to confirm booking: ${error.message}`);
    }

    return data;
  },

  async deleteBooking(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from('bookings').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete booking: ${error.message}`);
    }
  },
};
