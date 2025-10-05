// Core database types for Nowtown Platform
// Generated from Supabase schema

export interface Profile {
  id: string;
  email: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  subscription_tier: 'free' | 'starter' | 'pro' | 'unlimited';
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category:
    | 'kunst-kreativ'
    | 'musik-performance'
    | 'sport-fitness'
    | 'familie-kinder'
    | 'workshop'
    | 'essen-geniessen'
    | 'spontane-treffen'
    | 'party-nightlife';
  host_id: string;
  location_address: string;
  location_lat: number;
  location_lng: number;
  start_time: string;
  end_time: string;
  price: number;
  capacity: number;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface Space {
  id: string;
  title: string;
  description: string;
  space_type:
    | 'tonstudio'
    | 'fotostudio'
    | 'werkstaetten'
    | 'kunst-toepfer'
    | 'popup-retail'
    | 'sportraeume'
    | 'gaming-podcast'
    | 'kuechen-food'
    | 'other';
  host_id: string;
  location_address: string;
  location_lat: number;
  location_lng: number;
  hourly_rate: number;
  daily_rate: number | null;
  weekly_rate: number | null;
  size_sqm: number;
  capacity: number;
  amenities: string[];
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  provider_id: string;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface ServicePackage {
  id: string;
  service_id: string;
  name: string;
  description: string;
  price: number;
  duration_hours: number | null;
  features: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  bookable_type: 'event' | 'space' | 'service';
  bookable_id: string;
  start_time: string;
  end_time: string | null;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  reviewed_id: string;
  review_type: 'event' | 'space' | 'service' | 'user';
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  community_id: string | null;
  content: string;
  media_urls: string[];
  poll_data: PollData | null;
  visibility: 'public' | 'community' | 'followers';
  created_at: string;
  updated_at: string;
}

export interface PollData {
  question: string;
  options: Array<{
    text: string;
    votes: number;
  }>;
  endsAt: string;
  multiSelect: boolean;
}

export interface CommunityStory {
  id: string;
  user_id: string;
  media_url: string;
  media_type: 'image' | 'video';
  caption: string | null;
  expires_at: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  status: 'draft' | 'published' | 'recovery';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria_type: string;
  criteria_value: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
}

// Database type for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>;
      };
      spaces: {
        Row: Space;
        Insert: Omit<Space, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Space, 'id' | 'created_at' | 'updated_at'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>;
      };
      service_packages: {
        Row: ServicePackage;
        Insert: Omit<ServicePackage, 'id' | 'created_at'>;
        Update: Partial<Omit<ServicePackage, 'id' | 'created_at'>>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at'>;
        Update: Partial<Omit<Review, 'id' | 'created_at'>>;
      };
      community_posts: {
        Row: CommunityPost;
        Insert: Omit<CommunityPost, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CommunityPost, 'id' | 'created_at' | 'updated_at'>>;
      };
      community_stories: {
        Row: CommunityStory;
        Insert: Omit<CommunityStory, 'id' | 'created_at'>;
        Update: Partial<Omit<CommunityStory, 'id' | 'created_at'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>;
      };
      achievement_definitions: {
        Row: Achievement;
        Insert: Omit<Achievement, 'id'>;
        Update: Partial<Omit<Achievement, 'id'>>;
      };
      user_achievements: {
        Row: UserAchievement;
        Insert: Omit<UserAchievement, 'id' | 'earned_at'>;
        Update: Partial<Omit<UserAchievement, 'id' | 'earned_at'>>;
      };
    };
  };
}
