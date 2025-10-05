/**
 * Stories Cleanup Edge Function
 *
 * This function deletes stories that are older than 24 hours.
 * Run this as a scheduled Supabase Edge Function or cron job.
 *
 * Setup:
 * 1. Deploy as Supabase Edge Function
 * 2. Schedule to run every hour via Supabase Dashboard
 * 3. Or set up as Vercel Cron Job in vercel.json
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const TWENTY_FOUR_HOURS_AGO = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

export async function cleanupExpiredStories(): Promise<{
  success: boolean;
  deletedCount: number;
  error?: string;
}> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase credentials');
    }

    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

    // Delete stories older than 24 hours
    // Note: 'stories' table needs to be added to database schema
    // For now, use community_posts with story type filter
    const { error, count } = await supabase
      .from('community_posts')
      .delete({ count: 'exact' })
      .eq('type', 'story')
      .lt('created_at', TWENTY_FOUR_HOURS_AGO);

    if (error) {
      throw error;
    }

    console.log(`Successfully deleted ${count ?? 0} expired stories`);

    return {
      success: true,
      deletedCount: count ?? 0,
    };
  } catch (error) {
    console.error('Error cleaning up expired stories:', error);
    return {
      success: false,
      deletedCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// For Vercel Cron Jobs
export async function GET(): Promise<Response> {
  const result = await cleanupExpiredStories();

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
