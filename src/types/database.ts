export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievement_definitions: {
        Row: {
          category: string | null
          community_id: string | null
          created_at: string | null
          description: string | null
          display_name: string
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          points: number | null
          requirements: Json
        }
        Insert: {
          category?: string | null
          community_id?: string | null
          created_at?: string | null
          description?: string | null
          display_name: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          points?: number | null
          requirements: Json
        }
        Update: {
          category?: string | null
          community_id?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          points?: number | null
          requirements?: Json
        }
        Relationships: [
          {
            foreignKeyName: "achievement_definitions_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "achievement_definitions_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
        ]
      }
      ai_generation_logs: {
        Row: {
          created_at: string | null
          generation_type: string
          id: string
          input_data: Json
          output_data: Json
          user_id: string
        }
        Insert: {
          created_at?: string | null
          generation_type: string
          id?: string
          input_data: Json
          output_data: Json
          user_id: string
        }
        Update: {
          created_at?: string | null
          generation_type?: string
          id?: string
          input_data?: Json
          output_data?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_generation_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_generation_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_generation_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          created_at: string | null
          device_info: Json | null
          event_data: Json | null
          event_name: string
          id: string
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          event_data?: Json | null
          event_name: string
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          event_data?: Json | null
          event_name?: string
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action_type: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          moderator_id: string | null
          target_id: string | null
          target_type: string | null
          user_agent: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          moderator_id?: string | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          moderator_id?: string | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      author_ban_logs: {
        Row: {
          author_id: string
          ban_type: string | null
          banned_by: string
          created_at: string | null
          duration_hours: number | null
          id: string
          lift_reason: string | null
          lifted_at: string | null
          lifted_by: string | null
          reason: string
        }
        Insert: {
          author_id: string
          ban_type?: string | null
          banned_by: string
          created_at?: string | null
          duration_hours?: number | null
          id?: string
          lift_reason?: string | null
          lifted_at?: string | null
          lifted_by?: string | null
          reason: string
        }
        Update: {
          author_id?: string
          ban_type?: string | null
          banned_by?: string
          created_at?: string | null
          duration_hours?: number | null
          id?: string
          lift_reason?: string | null
          lifted_at?: string | null
          lifted_by?: string | null
          reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "author_ban_logs_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "author_ban_logs_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "author_ban_logs_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "author_ban_logs_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "author_ban_logs_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "author_ban_logs_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "author_ban_logs_lifted_by_fkey"
            columns: ["lifted_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "author_ban_logs_lifted_by_fkey"
            columns: ["lifted_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "author_ban_logs_lifted_by_fkey"
            columns: ["lifted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      auto_moderation_rules: {
        Row: {
          action: string
          applies_to: string[] | null
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          pattern: string | null
          rule_type: string
          severity: number | null
          updated_at: string | null
        }
        Insert: {
          action: string
          applies_to?: string[] | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          pattern?: string | null
          rule_type: string
          severity?: number | null
          updated_at?: string | null
        }
        Update: {
          action?: string
          applies_to?: string[] | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          pattern?: string | null
          rule_type?: string
          severity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auto_moderation_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auto_moderation_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auto_moderation_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_bookmarks: {
        Row: {
          created_at: string | null
          folder: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          folder?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          folder?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          post_count: number | null
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          post_count?: number | null
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          post_count?: number | null
          slug?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          parent_id: string | null
          post_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string
          category: string | null
          comment_count: number | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          featured_image: string | null
          id: string
          like_count: number | null
          meta_description: string | null
          meta_keywords: string[] | null
          published_at: string | null
          reading_time: number | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id: string
          category?: string | null
          comment_count?: number | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          like_count?: number | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string
          category?: string | null
          comment_count?: number | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          like_count?: number | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          attendees: number | null
          base_price: number | null
          bookable_id: string
          bookable_type: string | null
          buyer_service_fee: number | null
          created_at: string | null
          end_datetime: string
          host_fee: number | null
          host_net_payout: number | null
          host_payout: number | null
          host_service_fee: number | null
          id: string
          payment_status: string | null
          service_fee: number | null
          start_datetime: string
          status: string | null
          tax: number | null
          total_price: number
          updated_at: string | null
          user_id: string | null
          vat_amount: number | null
          vat_rate: number | null
        }
        Insert: {
          attendees?: number | null
          base_price?: number | null
          bookable_id: string
          bookable_type?: string | null
          buyer_service_fee?: number | null
          created_at?: string | null
          end_datetime: string
          host_fee?: number | null
          host_net_payout?: number | null
          host_payout?: number | null
          host_service_fee?: number | null
          id?: string
          payment_status?: string | null
          service_fee?: number | null
          start_datetime: string
          status?: string | null
          tax?: number | null
          total_price: number
          updated_at?: string | null
          user_id?: string | null
          vat_amount?: number | null
          vat_rate?: number | null
        }
        Update: {
          attendees?: number | null
          base_price?: number | null
          bookable_id?: string
          bookable_type?: string | null
          buyer_service_fee?: number | null
          created_at?: string | null
          end_datetime?: string
          host_fee?: number | null
          host_net_payout?: number | null
          host_payout?: number | null
          host_service_fee?: number | null
          id?: string
          payment_status?: string | null
          service_fee?: number | null
          start_datetime?: string
          status?: string | null
          tax?: number | null
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
          vat_amount?: number | null
          vat_rate?: number | null
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          created_at: string | null
          date: string
          id: string
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      challenge_participants: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          progress: number | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "community_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          category: string | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          members_count: number | null
          name: string
          privacy: string | null
          rules: string[] | null
          settings: Json | null
          slug: string | null
          tags: string[] | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          members_count?: number | null
          name: string
          privacy?: string | null
          rules?: string[] | null
          settings?: Json | null
          slug?: string | null
          tags?: string[] | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          members_count?: number | null
          name?: string
          privacy?: string | null
          rules?: string[] | null
          settings?: Json | null
          slug?: string | null
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "communities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_announcements: {
        Row: {
          author_id: string
          community_id: string
          content: string
          created_at: string | null
          display_until: string
          id: string
          is_pinned: boolean | null
          styling: Json | null
          updated_at: string | null
        }
        Insert: {
          author_id: string
          community_id: string
          content: string
          created_at?: string | null
          display_until: string
          id?: string
          is_pinned?: boolean | null
          styling?: Json | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          community_id?: string
          content?: string
          created_at?: string | null
          display_until?: string
          id?: string
          is_pinned?: boolean | null
          styling?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_announcements_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_announcements_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_announcements_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_announcements_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_announcements_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
        ]
      }
      community_bookings: {
        Row: {
          booking_date: string | null
          community_id: string | null
          created_at: string | null
          event_id: string | null
          id: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_date?: string | null
          community_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_date?: string | null
          community_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_bookings_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_bookings_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "community_bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_bookmarks: {
        Row: {
          created_at: string | null
          folder: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          folder?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          folder?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_challenge_participants: {
        Row: {
          challenge_id: string
          completed_at: string | null
          id: string
          joined_at: string | null
          progress: Json | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          id?: string
          joined_at?: string | null
          progress?: Json | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          id?: string
          joined_at?: string | null
          progress?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "community_challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_challenge_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_challenge_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_challenge_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_challenges: {
        Row: {
          challenge_type: string | null
          community_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string
          id: string
          is_active: boolean | null
          participant_count: number | null
          requirements: Json
          reward_badge: string | null
          reward_points: number | null
          start_date: string
          title: string
        }
        Insert: {
          challenge_type?: string | null
          community_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          participant_count?: number | null
          requirements: Json
          reward_badge?: string | null
          reward_points?: number | null
          start_date: string
          title: string
        }
        Update: {
          challenge_type?: string | null
          community_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          participant_count?: number | null
          requirements?: Json
          reward_badge?: string | null
          reward_points?: number | null
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_challenges_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_challenges_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "community_challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_challenges_reward_badge_fkey"
            columns: ["reward_badge"]
            isOneToOne: false
            referencedRelation: "achievement_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      community_events: {
        Row: {
          community_id: string | null
          created_at: string | null
          discussion_thread_id: string | null
          event_id: string
          id: string
          is_premium_only: boolean | null
          special_badge_id: string | null
        }
        Insert: {
          community_id?: string | null
          created_at?: string | null
          discussion_thread_id?: string | null
          event_id: string
          id?: string
          is_premium_only?: boolean | null
          special_badge_id?: string | null
        }
        Update: {
          community_id?: string | null
          created_at?: string | null
          discussion_thread_id?: string | null
          event_id?: string
          id?: string
          is_premium_only?: boolean | null
          special_badge_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "premium_events_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "premium_events_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "premium_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "premium_events_special_badge_id_fkey"
            columns: ["special_badge_id"]
            isOneToOne: false
            referencedRelation: "achievement_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      community_join_requests: {
        Row: {
          community_id: string
          created_at: string | null
          id: string
          message: string | null
          processed_at: string | null
          processed_by: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          community_id: string
          created_at?: string | null
          id?: string
          message?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          community_id?: string
          created_at?: string | null
          id?: string
          message?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_join_requests_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_join_requests_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "community_join_requests_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_join_requests_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_join_requests_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_join_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_join_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_join_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_members: {
        Row: {
          community_id: string | null
          id: string
          joined_at: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          community_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          community_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "community_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_poll_votes: {
        Row: {
          created_at: string | null
          id: string
          option_index: number
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          option_index: number
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          option_index?: number
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_poll_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_polls: {
        Row: {
          created_at: string | null
          created_by: string | null
          ends_at: string | null
          id: string
          multi_select: boolean | null
          options: Json
          post_id: string | null
          question: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          ends_at?: string | null
          id?: string
          multi_select?: boolean | null
          options?: Json
          post_id?: string | null
          question: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          ends_at?: string | null
          id?: string
          multi_select?: boolean | null
          options?: Json
          post_id?: string | null
          question?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_polls_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author_id: string | null
          category: string | null
          comments_count: number | null
          community_id: string | null
          content: string
          content_warning: string | null
          created_at: string | null
          event_date: string | null
          event_id: string | null
          hashtags: string[] | null
          id: string
          image_url: string | null
          is_announcement: boolean | null
          is_pinned: boolean | null
          is_sensitive: boolean | null
          likes_count: number | null
          location: string | null
          mentions: string[] | null
          poll_data: Json | null
          reaction_counts: Json | null
          service_id: string | null
          share_count: number | null
          shares_count: number | null
          space_id: string | null
          updated_at: string | null
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          comments_count?: number | null
          community_id?: string | null
          content: string
          content_warning?: string | null
          created_at?: string | null
          event_date?: string | null
          event_id?: string | null
          hashtags?: string[] | null
          id?: string
          image_url?: string | null
          is_announcement?: boolean | null
          is_pinned?: boolean | null
          is_sensitive?: boolean | null
          likes_count?: number | null
          location?: string | null
          mentions?: string[] | null
          poll_data?: Json | null
          reaction_counts?: Json | null
          service_id?: string | null
          share_count?: number | null
          shares_count?: number | null
          space_id?: string | null
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          comments_count?: number | null
          community_id?: string | null
          content?: string
          content_warning?: string | null
          created_at?: string | null
          event_date?: string | null
          event_id?: string | null
          hashtags?: string[] | null
          id?: string
          image_url?: string | null
          is_announcement?: boolean | null
          is_pinned?: boolean | null
          is_sensitive?: boolean | null
          likes_count?: number | null
          location?: string | null
          mentions?: string[] | null
          poll_data?: Json | null
          reaction_counts?: Json | null
          service_id?: string | null
          share_count?: number | null
          shares_count?: number | null
          space_id?: string | null
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "community_posts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      community_stories: {
        Row: {
          caption: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          image_url: string
          is_highlight: boolean | null
          link_text: string | null
          link_url: string | null
          media_types: string[] | null
          media_urls: string[] | null
          music_url: string | null
          poll_data: Json | null
          stickers: Json | null
          user_id: string | null
          view_count: number | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          image_url: string
          is_highlight?: boolean | null
          link_text?: string | null
          link_url?: string | null
          media_types?: string[] | null
          media_urls?: string[] | null
          music_url?: string | null
          poll_data?: Json | null
          stickers?: Json | null
          user_id?: string | null
          view_count?: number | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string
          is_highlight?: boolean | null
          link_text?: string | null
          link_url?: string | null
          media_types?: string[] | null
          media_urls?: string[] | null
          music_url?: string | null
          poll_data?: Json | null
          stickers?: Json | null
          user_id?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "community_stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string | null
          email: string
          id: string
          internal_notes: string | null
          message: string
          name: string
          priority: string | null
          replied_at: string | null
          resolution_time: unknown | null
          resolved_at: string | null
          status: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          email: string
          id?: string
          internal_notes?: string | null
          message: string
          name: string
          priority?: string | null
          replied_at?: string | null
          resolution_time?: unknown | null
          resolved_at?: string | null
          status?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          email?: string
          id?: string
          internal_notes?: string | null
          message?: string
          name?: string
          priority?: string | null
          replied_at?: string | null
          resolution_time?: unknown | null
          resolved_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_messages_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_messages_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_messages_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_reports: {
        Row: {
          action_taken: string | null
          content_id: string
          content_type: string
          created_at: string | null
          description: string | null
          id: string
          report_reason: string
          reporter_id: string | null
          resolved_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          action_taken?: string | null
          content_id: string
          content_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          report_reason: string
          reporter_id?: string | null
          resolved_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          action_taken?: string | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          report_reason?: string
          reporter_id?: string | null
          resolved_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_warnings: {
        Row: {
          added_by: string | null
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          warning_type: string
        }
        Insert: {
          added_by?: string | null
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          warning_type: string
        }
        Update: {
          added_by?: string | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          warning_type?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          last_message_at: string | null
          participant1_id: string
          participant2_id: string
          service_id: string | null
          space_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          last_message_at?: string | null
          participant1_id: string
          participant2_id: string
          service_id?: string | null
          space_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          last_message_at?: string | null
          participant1_id?: string
          participant2_id?: string
          service_id?: string | null
          space_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant1_id_fkey"
            columns: ["participant1_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant1_id_fkey"
            columns: ["participant1_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant1_id_fkey"
            columns: ["participant1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant2_id_fkey"
            columns: ["participant2_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant2_id_fkey"
            columns: ["participant2_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant2_id_fkey"
            columns: ["participant2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_spotlight: {
        Row: {
          created_at: string | null
          id: string
          metrics: Json | null
          spotlight_type: string | null
          user_id: string
          week_end: string
          week_start: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metrics?: Json | null
          spotlight_type?: string | null
          user_id: string
          week_end: string
          week_start: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metrics?: Json | null
          spotlight_type?: string | null
          user_id?: string
          week_end?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_spotlight_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_spotlight_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_spotlight_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_notifications: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          recipient_email: string
          sent_at: string | null
          status: string | null
          subject: string
          template: string
          template_data: Json | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          recipient_email: string
          sent_at?: string | null
          status?: string | null
          subject: string
          template: string
          template_data?: Json | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          recipient_email?: string
          sent_at?: string | null
          status?: string | null
          subject?: string
          template?: string
          template_data?: Json | null
        }
        Relationships: []
      }
      events: {
        Row: {
          address: string | null
          auto_delete: boolean | null
          auto_pause_after_end: boolean | null
          cancellation_policy: string | null
          category: string | null
          city: string | null
          community_id: string | null
          created_at: string | null
          current_attendees: number | null
          delete_after_hours: number | null
          description: string | null
          district: string | null
          dress_code: string | null
          early_bird_enabled: boolean | null
          early_bird_expires_minutes: number | null
          early_bird_per_user_limit: number | null
          early_bird_price: number | null
          early_bird_quota: number | null
          end_datetime: string
          event_category: Database["public"]["Enums"]["event_category"] | null
          event_rules: Json | null
          highlights: string[] | null
          id: string
          image_path: string | null
          image_url: string | null
          images: Json | null
          includes: string[] | null
          latitude: number | null
          longitude: number | null
          max_attendees: number | null
          min_age: number | null
          name: string
          organizer_id: string | null
          requirements: string | null
          safety_features: Json | null
          space_id: string | null
          start_datetime: string
          status: string | null
          tags: string[] | null
          tax_rate: number | null
          ticket_per_user_limit: number | null
          ticket_price: number | null
          updated_at: string | null
          venue_name: string | null
        }
        Insert: {
          address?: string | null
          auto_delete?: boolean | null
          auto_pause_after_end?: boolean | null
          cancellation_policy?: string | null
          category?: string | null
          city?: string | null
          community_id?: string | null
          created_at?: string | null
          current_attendees?: number | null
          delete_after_hours?: number | null
          description?: string | null
          district?: string | null
          dress_code?: string | null
          early_bird_enabled?: boolean | null
          early_bird_expires_minutes?: number | null
          early_bird_per_user_limit?: number | null
          early_bird_price?: number | null
          early_bird_quota?: number | null
          end_datetime: string
          event_category?: Database["public"]["Enums"]["event_category"] | null
          event_rules?: Json | null
          highlights?: string[] | null
          id?: string
          image_path?: string | null
          image_url?: string | null
          images?: Json | null
          includes?: string[] | null
          latitude?: number | null
          longitude?: number | null
          max_attendees?: number | null
          min_age?: number | null
          name: string
          organizer_id?: string | null
          requirements?: string | null
          safety_features?: Json | null
          space_id?: string | null
          start_datetime: string
          status?: string | null
          tags?: string[] | null
          tax_rate?: number | null
          ticket_per_user_limit?: number | null
          ticket_price?: number | null
          updated_at?: string | null
          venue_name?: string | null
        }
        Update: {
          address?: string | null
          auto_delete?: boolean | null
          auto_pause_after_end?: boolean | null
          cancellation_policy?: string | null
          category?: string | null
          city?: string | null
          community_id?: string | null
          created_at?: string | null
          current_attendees?: number | null
          delete_after_hours?: number | null
          description?: string | null
          district?: string | null
          dress_code?: string | null
          early_bird_enabled?: boolean | null
          early_bird_expires_minutes?: number | null
          early_bird_per_user_limit?: number | null
          early_bird_price?: number | null
          early_bird_quota?: number | null
          end_datetime?: string
          event_category?: Database["public"]["Enums"]["event_category"] | null
          event_rules?: Json | null
          highlights?: string[] | null
          id?: string
          image_path?: string | null
          image_url?: string | null
          images?: Json | null
          includes?: string[] | null
          latitude?: number | null
          longitude?: number | null
          max_attendees?: number | null
          min_age?: number | null
          name?: string
          organizer_id?: string | null
          requirements?: string | null
          safety_features?: Json | null
          space_id?: string | null
          start_datetime?: string
          status?: string | null
          tags?: string[] | null
          tax_rate?: number | null
          ticket_per_user_limit?: number | null
          ticket_price?: number | null
          updated_at?: string | null
          venue_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "events_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_scores: {
        Row: {
          created_at: string | null
          engagement_score: number | null
          id: string
          interacted: boolean | null
          interest_score: number | null
          post_id: string
          recency_score: number | null
          shown_at: string | null
          total_score: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          interacted?: boolean | null
          interest_score?: number | null
          post_id: string
          recency_score?: number | null
          shown_at?: string | null
          total_score?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          interacted?: boolean | null
          interest_score?: number | null
          post_id?: string
          recency_score?: number | null
          shown_at?: string | null
          total_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feed_scores_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      ip_bans: {
        Row: {
          banned_by: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          ip_address: unknown
          ip_range: unknown | null
          is_active: boolean | null
          metadata: Json | null
          reason: string | null
        }
        Insert: {
          banned_by?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          ip_address: unknown
          ip_range?: unknown | null
          is_active?: boolean | null
          metadata?: Json | null
          reason?: string | null
        }
        Update: {
          banned_by?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown
          ip_range?: unknown | null
          is_active?: boolean | null
          metadata?: Json | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ip_bans_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ip_bans_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ip_bans_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      keyword_blacklist: {
        Row: {
          action: string | null
          added_by: string | null
          applies_to: string[] | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_regex: boolean | null
          keyword: string
          match_count: number | null
          replacement_text: string | null
          severity: string | null
          updated_at: string | null
        }
        Insert: {
          action?: string | null
          added_by?: string | null
          applies_to?: string[] | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_regex?: boolean | null
          keyword: string
          match_count?: number | null
          replacement_text?: string | null
          severity?: string | null
          updated_at?: string | null
        }
        Update: {
          action?: string | null
          added_by?: string | null
          applies_to?: string[] | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_regex?: boolean | null
          keyword?: string
          match_count?: number | null
          replacement_text?: string | null
          severity?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "keyword_blacklist_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "keyword_blacklist_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "keyword_blacklist_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mass_messages: {
        Row: {
          content: string
          created_at: string | null
          failed_count: number | null
          id: string
          message_type: string | null
          recipient_count: number | null
          recipient_filter: Json | null
          scheduled_at: string | null
          sent_at: string | null
          sent_by: string | null
          sent_count: number | null
          status: string | null
          subject: string
        }
        Insert: {
          content: string
          created_at?: string | null
          failed_count?: number | null
          id?: string
          message_type?: string | null
          recipient_count?: number | null
          recipient_filter?: Json | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_by?: string | null
          sent_count?: number | null
          status?: string | null
          subject: string
        }
        Update: {
          content?: string
          created_at?: string | null
          failed_count?: number | null
          id?: string
          message_type?: string | null
          recipient_count?: number | null
          recipient_filter?: Json | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_by?: string | null
          sent_count?: number | null
          status?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "mass_messages_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mass_messages_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mass_messages_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_read: boolean | null
          recipient_id: string
          sender_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          recipient_id: string
          sender_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          recipient_id?: string
          sender_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_actions: {
        Row: {
          action_type: string
          created_at: string | null
          id: string
          metadata: Json | null
          moderator_id: string | null
          reason: string | null
          target_content_id: string | null
          target_content_type: string | null
          target_user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          moderator_id?: string | null
          reason?: string | null
          target_content_id?: string | null
          target_content_type?: string | null
          target_user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          moderator_id?: string | null
          reason?: string | null
          target_content_id?: string | null
          target_content_type?: string | null
          target_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_actions_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_actions_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_actions_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_actions_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_actions_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_actions_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_queue: {
        Row: {
          auto_mod_flags: string[] | null
          auto_mod_score: number | null
          content_data: Json
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          auto_mod_flags?: string[] | null
          auto_mod_score?: number | null
          content_data: Json
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          auto_mod_flags?: string[] | null
          auto_mod_score?: number | null
          content_data?: Json
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_queue_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_queue_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_queue_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_queue_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_queue_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_queue_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string | null
          source: string | null
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          source?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          source?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          content_type: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string | null
          metadata: Json | null
          related_content_id: string | null
          related_user_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          metadata?: Json | null
          related_content_id?: string | null
          related_user_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          metadata?: Json | null
          related_content_id?: string | null
          related_user_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          post_id: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          reaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_event_registrations: {
        Row: {
          event_id: string
          id: string
          registered_at: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "premium_event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "premium_event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      private_calendar_events: {
        Row: {
          all_day: boolean | null
          color: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          event_type: string | null
          id: string
          location: string | null
          recurring: boolean | null
          recurring_pattern: string | null
          reminder_minutes: number | null
          start_date: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          all_day?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          recurring?: boolean | null
          recurring_pattern?: string | null
          reminder_minutes?: number | null
          start_date: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          all_day?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          recurring?: boolean | null
          recurring_pattern?: string | null
          reminder_minutes?: number | null
          start_date?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          admin_since: string | null
          articles_count: number | null
          author_accepted_rules_at: string | null
          author_applied_at: string | null
          author_ban_expires_at: string | null
          author_banned_by: string | null
          author_bio: string | null
          author_last_warning_at: string | null
          author_status: string | null
          author_warning_count: number | null
          avatar_url: string | null
          ban_reason: string | null
          banned_at: string | null
          bio: string | null
          birth_date: string | null
          blog_settings: Json | null
          community_notes: Json | null
          created_at: string | null
          full_name: string | null
          gender: string | null
          host_accepted_at: string | null
          host_applied_at: string | null
          host_auto_accept_min_score: number | null
          host_status: string | null
          id: string
          is_admin: boolean | null
          is_author: boolean | null
          is_host: boolean | null
          is_moderator: boolean | null
          last_strike_at: string | null
          location: string | null
          moderator_since: string | null
          phone: string | null
          reputation_points: number | null
          strike_reason: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_expires_at: string | null
          subscription_started_at: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          trust_score: number | null
          updated_at: string | null
          user_strikes: number | null
          username: string | null
          website: string | null
        }
        Insert: {
          admin_since?: string | null
          articles_count?: number | null
          author_accepted_rules_at?: string | null
          author_applied_at?: string | null
          author_ban_expires_at?: string | null
          author_banned_by?: string | null
          author_bio?: string | null
          author_last_warning_at?: string | null
          author_status?: string | null
          author_warning_count?: number | null
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          bio?: string | null
          birth_date?: string | null
          blog_settings?: Json | null
          community_notes?: Json | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          host_accepted_at?: string | null
          host_applied_at?: string | null
          host_auto_accept_min_score?: number | null
          host_status?: string | null
          id: string
          is_admin?: boolean | null
          is_author?: boolean | null
          is_host?: boolean | null
          is_moderator?: boolean | null
          last_strike_at?: string | null
          location?: string | null
          moderator_since?: string | null
          phone?: string | null
          reputation_points?: number | null
          strike_reason?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_started_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          trust_score?: number | null
          updated_at?: string | null
          user_strikes?: number | null
          username?: string | null
          website?: string | null
        }
        Update: {
          admin_since?: string | null
          articles_count?: number | null
          author_accepted_rules_at?: string | null
          author_applied_at?: string | null
          author_ban_expires_at?: string | null
          author_banned_by?: string | null
          author_bio?: string | null
          author_last_warning_at?: string | null
          author_status?: string | null
          author_warning_count?: number | null
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          bio?: string | null
          birth_date?: string | null
          blog_settings?: Json | null
          community_notes?: Json | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          host_accepted_at?: string | null
          host_applied_at?: string | null
          host_auto_accept_min_score?: number | null
          host_status?: string | null
          id?: string
          is_admin?: boolean | null
          is_author?: boolean | null
          is_host?: boolean | null
          is_moderator?: boolean | null
          last_strike_at?: string | null
          location?: string | null
          moderator_since?: string | null
          phone?: string | null
          reputation_points?: number | null
          strike_reason?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_started_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          trust_score?: number | null
          updated_at?: string | null
          user_strikes?: number | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_author_banned_by_fkey"
            columns: ["author_banned_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_author_banned_by_fkey"
            columns: ["author_banned_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_author_banned_by_fkey"
            columns: ["author_banned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      push_tokens: {
        Row: {
          app_version: string | null
          created_at: string | null
          device_info: Json | null
          id: string
          last_used: string | null
          platform: string
          token: string
          user_id: string
        }
        Insert: {
          app_version?: string | null
          created_at?: string | null
          device_info?: Json | null
          id?: string
          last_used?: string | null
          platform: string
          token: string
          user_id: string
        }
        Update: {
          app_version?: string | null
          created_at?: string | null
          device_info?: Json | null
          id?: string
          last_used?: string | null
          platform?: string
          token?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          bookable_id: string
          bookable_type: string | null
          booking_id: string | null
          comment: string | null
          created_at: string | null
          helpful_count: number | null
          id: string
          provider_id: string | null
          rating: number | null
          response: string | null
          response_date: string | null
          reviewed_id: string | null
          reviewer_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          bookable_id: string
          bookable_type?: string | null
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          provider_id?: string | null
          rating?: number | null
          response?: string | null
          response_date?: string | null
          reviewed_id?: string | null
          reviewer_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          bookable_id?: string
          bookable_type?: string | null
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          provider_id?: string | null
          rating?: number | null
          response?: string | null
          response_date?: string | null
          reviewed_id?: string | null
          reviewer_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      security_events: {
        Row: {
          blocked: boolean | null
          client_ip: unknown
          created_at: string | null
          description: string
          event_type: string
          id: string
          metadata: Json | null
          method: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          threat_score: number | null
          timestamp: string
          updated_at: string | null
          url: string | null
          user_agent: string
          user_id: string | null
        }
        Insert: {
          blocked?: boolean | null
          client_ip: unknown
          created_at?: string | null
          description: string
          event_type: string
          id?: string
          metadata?: Json | null
          method?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          threat_score?: number | null
          timestamp?: string
          updated_at?: string | null
          url?: string | null
          user_agent: string
          user_id?: string | null
        }
        Update: {
          blocked?: boolean | null
          client_ip?: unknown
          created_at?: string | null
          description?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          method?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          threat_score?: number | null
          timestamp?: string
          updated_at?: string | null
          url?: string | null
          user_agent?: string
          user_id?: string | null
        }
        Relationships: []
      }
      service_bookings: {
        Row: {
          booking_date: string
          booking_time: string | null
          created_at: string | null
          guest_count: number | null
          id: string
          location: string | null
          notes: string | null
          package_id: string | null
          provider_id: string | null
          service_id: string | null
          status: string | null
          total_price: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_date: string
          booking_time?: string | null
          created_at?: string | null
          guest_count?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          package_id?: string | null
          provider_id?: string | null
          service_id?: string | null
          status?: string | null
          total_price: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          booking_time?: string | null
          created_at?: string | null
          guest_count?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          package_id?: string | null
          provider_id?: string | null
          service_id?: string | null
          status?: string | null
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "service_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_images: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          is_featured: boolean | null
          service_id: string | null
          sort_order: number | null
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          service_id?: string | null
          sort_order?: number | null
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          service_id?: string | null
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_images_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_packages: {
        Row: {
          created_at: string | null
          description: string | null
          duration: string | null
          features: string[] | null
          id: string
          name: string
          price: number
          service_id: string | null
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          features?: string[] | null
          id?: string
          name: string
          price: number
          service_id?: string | null
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          features?: string[] | null
          id?: string
          name?: string
          price?: number
          service_id?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "service_packages_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_providers: {
        Row: {
          business_name: string | null
          career_highlights: string | null
          created_at: string | null
          education: string | null
          id: string
          is_individual: boolean | null
          portfolio_urls: string[] | null
          qualifications: string | null
          updated_at: string | null
          user_id: string | null
          verified_at: string | null
          vetted_at: string | null
          years_experience: number | null
        }
        Insert: {
          business_name?: string | null
          career_highlights?: string | null
          created_at?: string | null
          education?: string | null
          id?: string
          is_individual?: boolean | null
          portfolio_urls?: string[] | null
          qualifications?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified_at?: string | null
          vetted_at?: string | null
          years_experience?: number | null
        }
        Update: {
          business_name?: string | null
          career_highlights?: string | null
          created_at?: string | null
          education?: string | null
          id?: string
          is_individual?: boolean | null
          portfolio_urls?: string[] | null
          qualifications?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified_at?: string | null
          vetted_at?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "service_providers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_providers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_providers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          service_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          service_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          service_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "service_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          availability_status: string | null
          category: string
          city: string
          created_at: string | null
          description: string | null
          id: string
          is_vetted: boolean | null
          languages: string[] | null
          location: string
          price_from: number
          price_unit: string
          provider_id: string | null
          rating: number | null
          review_count: number | null
          service_area: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          availability_status?: string | null
          category: string
          city: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_vetted?: boolean | null
          languages?: string[] | null
          location: string
          price_from: number
          price_unit: string
          provider_id?: string | null
          rating?: number | null
          review_count?: number | null
          service_area?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          availability_status?: string | null
          category?: string
          city?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_vetted?: boolean | null
          languages?: string[] | null
          location?: string
          price_from?: number
          price_unit?: string
          provider_id?: string | null
          rating?: number | null
          review_count?: number | null
          service_area?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          address: string | null
          amenities: Json | null
          availability_hours: Json | null
          booking_mode: string | null
          cancellation_policy: string | null
          capacity: number | null
          check_in_time: string | null
          check_out_time: string | null
          city: string | null
          created_at: string | null
          custom_cancellation_text: string | null
          daily_price: number | null
          description: string | null
          district: string | null
          hourly_price: number | null
          house_rules: Json | null
          id: string
          image_path: string | null
          image_url: string | null
          images: Json | null
          latitude: number | null
          longitude: number | null
          minimum_stay_days: number | null
          name: string
          owner_id: string | null
          postal_code: string | null
          rating: number | null
          review_count: number | null
          safety_amenities: Json | null
          size_sqm: number | null
          status: string | null
          tax_rate: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          amenities?: Json | null
          availability_hours?: Json | null
          booking_mode?: string | null
          cancellation_policy?: string | null
          capacity?: number | null
          check_in_time?: string | null
          check_out_time?: string | null
          city?: string | null
          created_at?: string | null
          custom_cancellation_text?: string | null
          daily_price?: number | null
          description?: string | null
          district?: string | null
          hourly_price?: number | null
          house_rules?: Json | null
          id?: string
          image_path?: string | null
          image_url?: string | null
          images?: Json | null
          latitude?: number | null
          longitude?: number | null
          minimum_stay_days?: number | null
          name: string
          owner_id?: string | null
          postal_code?: string | null
          rating?: number | null
          review_count?: number | null
          safety_amenities?: Json | null
          size_sqm?: number | null
          status?: string | null
          tax_rate?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          amenities?: Json | null
          availability_hours?: Json | null
          booking_mode?: string | null
          cancellation_policy?: string | null
          capacity?: number | null
          check_in_time?: string | null
          check_out_time?: string | null
          city?: string | null
          created_at?: string | null
          custom_cancellation_text?: string | null
          daily_price?: number | null
          description?: string | null
          district?: string | null
          hourly_price?: number | null
          house_rules?: Json | null
          id?: string
          image_path?: string | null
          image_url?: string | null
          images?: Json | null
          latitude?: number | null
          longitude?: number | null
          minimum_stay_days?: number | null
          name?: string
          owner_id?: string | null
          postal_code?: string | null
          rating?: number | null
          review_count?: number | null
          safety_amenities?: Json | null
          size_sqm?: number | null
          status?: string | null
          tax_rate?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      story_highlights: {
        Row: {
          cover_image: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          story_ids: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          story_ids?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          story_ids?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_highlights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_highlights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_highlights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      story_reactions: {
        Row: {
          created_at: string | null
          id: string
          reaction_type: string
          story_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reaction_type: string
          story_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reaction_type?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_reactions_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "community_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      story_views: {
        Row: {
          id: string
          story_id: string | null
          viewed_at: string | null
          viewer_id: string | null
        }
        Insert: {
          id?: string
          story_id?: string | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Update: {
          id?: string
          story_id?: string | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_views_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "community_stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      strike_logs: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          issued_by: string | null
          reason: string
          strike_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          issued_by?: string | null
          reason: string
          strike_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          issued_by?: string | null
          reason?: string
          strike_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "strike_logs_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strike_logs_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strike_logs_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strike_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strike_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strike_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          billing_period: string | null
          cancelled_at: string | null
          created_at: string | null
          currency: string | null
          expires_at: string | null
          id: string
          started_at: string | null
          status: string | null
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          user_id: string
        }
        Insert: {
          amount: number
          billing_period?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          expires_at?: string | null
          id?: string
          started_at?: string | null
          status?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          user_id: string
        }
        Update: {
          amount?: number
          billing_period?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          expires_at?: string | null
          id?: string
          started_at?: string | null
          status?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          user_id?: string
        }
        Relationships: []
      }
      system_announcements: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          is_dismissible: boolean | null
          priority: number | null
          requires_acknowledgment: boolean | null
          show_on_pages: string[] | null
          target_audience: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_dismissible?: boolean | null
          priority?: number | null
          requires_acknowledgment?: boolean | null
          show_on_pages?: string[] | null
          target_audience?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_dismissible?: boolean | null
          priority?: number | null
          requires_acknowledgment?: boolean | null
          show_on_pages?: string[] | null
          target_audience?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "system_announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "system_announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_hashtags: {
        Row: {
          created_at: string | null
          hashtag: string
          id: string
          last_used_at: string | null
          trending_score: number | null
          usage_count: number | null
        }
        Insert: {
          created_at?: string | null
          hashtag: string
          id?: string
          last_used_at?: string | null
          trending_score?: number | null
          usage_count?: number | null
        }
        Update: {
          created_at?: string | null
          hashtag?: string
          id?: string
          last_used_at?: string | null
          trending_score?: number | null
          usage_count?: number | null
        }
        Relationships: []
      }
      trust_scores: {
        Row: {
          changed_by: string | null
          created_at: string | null
          id: string
          reason: string | null
          score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          reason?: string | null
          score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          reason?: string | null
          score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trust_scores_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trust_scores_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trust_scores_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trust_scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trust_scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trust_scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          metadata: Json | null
          progress: number | null
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          metadata?: Json | null
          progress?: number | null
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          metadata?: Json | null
          progress?: number | null
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievement_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activities: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          resource_id: string | null
          resource_type: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string | null
          id: string
          reason: string | null
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      user_consents: {
        Row: {
          consent_type: string
          created_at: string | null
          data_categories: string[]
          granted: boolean
          granted_at: string | null
          id: string
          ip_address: unknown | null
          legal_basis: string
          purpose: string
          retention_period: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string
          version: number | null
          withdrawn_at: string | null
        }
        Insert: {
          consent_type: string
          created_at?: string | null
          data_categories: string[]
          granted: boolean
          granted_at?: string | null
          id?: string
          ip_address?: unknown | null
          legal_basis: string
          purpose: string
          retention_period?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id: string
          version?: number | null
          withdrawn_at?: string | null
        }
        Update: {
          consent_type?: string
          created_at?: string | null
          data_categories?: string[]
          granted?: boolean
          granted_at?: string | null
          id?: string
          ip_address?: unknown | null
          legal_basis?: string
          purpose?: string
          retention_period?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string
          version?: number | null
          withdrawn_at?: string | null
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      user_interests: {
        Row: {
          created_at: string | null
          id: string
          topic: string
          user_id: string
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          topic: string
          user_id: string
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          topic?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      voice_notes: {
        Row: {
          audio_url: string
          comment_id: string | null
          created_at: string | null
          duration_seconds: number | null
          id: string
          post_id: string | null
          transcript: string | null
          user_id: string
        }
        Insert: {
          audio_url: string
          comment_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          post_id?: string | null
          transcript?: string | null
          user_id: string
        }
        Update: {
          audio_url?: string
          comment_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          post_id?: string | null
          transcript?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_notes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voice_notes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_collaborators: {
        Row: {
          created_at: string
          invited_by: string
          role: string
          user_id: string
          wishlist_id: string
        }
        Insert: {
          created_at?: string
          invited_by: string
          role: string
          user_id: string
          wishlist_id: string
        }
        Update: {
          created_at?: string
          invited_by?: string
          role?: string
          user_id?: string
          wishlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_collaborators_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_item_notes: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          item_id: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          item_id: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_item_notes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "wishlist_items"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_item_votes: {
        Row: {
          created_at: string
          item_id: string
          value: number
          voter_id: string
        }
        Insert: {
          created_at?: string
          item_id: string
          value?: number
          voter_id: string
        }
        Update: {
          created_at?: string
          item_id?: string
          value?: number
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_item_votes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "wishlist_items"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_items: {
        Row: {
          added_at: string
          added_by: string
          entity_id: string
          entity_type: string
          id: string
          wishlist_id: string
        }
        Insert: {
          added_at?: string
          added_by: string
          entity_id: string
          entity_type: string
          id?: string
          wishlist_id: string
        }
        Update: {
          added_at?: string
          added_by?: string
          entity_id?: string
          entity_type?: string
          id?: string
          wishlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_user_id: string
          updated_at: string
          visibility: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_user_id: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_user_id?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: []
      }
    }
    Views: {
      active_authors: {
        Row: {
          article_count: number | null
          author_applied_at: string | null
          author_status: string | null
          avatar_url: string | null
          bio: string | null
          full_name: string | null
          id: string | null
          is_author: boolean | null
          total_likes: number | null
          total_views: number | null
          username: string | null
        }
        Relationships: []
      }
      community_analytics: {
        Row: {
          avg_comments_per_post: number | null
          avg_likes_per_post: number | null
          community_id: string | null
          community_name: string | null
          new_members_last_week: number | null
          posts_last_24h: number | null
          posts_last_week: number | null
          total_members: number | null
          total_posts: number | null
        }
        Relationships: []
      }
      community_top_contributors: {
        Row: {
          active_days: number | null
          avatar_url: string | null
          community_id: string | null
          full_name: string | null
          post_count: number | null
          total_comments: number | null
          total_likes: number | null
          user_id: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community_analytics"
            referencedColumns: ["community_id"]
          },
        ]
      }
      hosts: {
        Row: {
          articles_count: number | null
          author_accepted_rules_at: string | null
          author_applied_at: string | null
          author_ban_expires_at: string | null
          author_banned_by: string | null
          author_bio: string | null
          author_last_warning_at: string | null
          author_status: string | null
          author_warning_count: number | null
          avatar_url: string | null
          ban_reason: string | null
          banned_at: string | null
          bio: string | null
          blog_settings: Json | null
          created_at: string | null
          full_name: string | null
          host_accepted_at: string | null
          host_applied_at: string | null
          host_status: string | null
          id: string | null
          is_author: boolean | null
          is_host: boolean | null
          location: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_expires_at: string | null
          subscription_started_at: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          articles_count?: number | null
          author_accepted_rules_at?: string | null
          author_applied_at?: string | null
          author_ban_expires_at?: string | null
          author_banned_by?: string | null
          author_bio?: string | null
          author_last_warning_at?: string | null
          author_status?: string | null
          author_warning_count?: number | null
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          bio?: string | null
          blog_settings?: Json | null
          created_at?: string | null
          full_name?: string | null
          host_accepted_at?: string | null
          host_applied_at?: string | null
          host_status?: string | null
          id?: string | null
          is_author?: boolean | null
          is_host?: boolean | null
          location?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_started_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          articles_count?: number | null
          author_accepted_rules_at?: string | null
          author_applied_at?: string | null
          author_ban_expires_at?: string | null
          author_banned_by?: string | null
          author_bio?: string | null
          author_last_warning_at?: string | null
          author_status?: string | null
          author_warning_count?: number | null
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          bio?: string | null
          blog_settings?: Json | null
          created_at?: string | null
          full_name?: string | null
          host_accepted_at?: string | null
          host_applied_at?: string | null
          host_status?: string | null
          id?: string | null
          is_author?: boolean | null
          is_host?: boolean | null
          location?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_started_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_author_banned_by_fkey"
            columns: ["author_banned_by"]
            isOneToOne: false
            referencedRelation: "active_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_author_banned_by_fkey"
            columns: ["author_banned_by"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_author_banned_by_fkey"
            columns: ["author_banned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_votes: {
        Row: {
          created_at: string | null
          id: string | null
          option_index: number | null
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          option_index?: number | null
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          option_index?: number | null
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_poll_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      award_achievement: {
        Args: { p_achievement_name: string; p_user_id: string }
        Returns: undefined
      }
      calculate_analysis_metrics: {
        Args: Record<PropertyKey, never>
        Returns: {
          average_confidence: number
          high_confidence_analyses: number
          root_cause_distribution: Json
          total_analyses: number
        }[]
      }
      calculate_host_response_stats: {
        Args: { p_host_id: string }
        Returns: {
          avg_response_time_minutes: number
          response_rate: number
          total_received: number
          total_responded: number
        }[]
      }
      calculate_incident_metrics: {
        Args: Record<PropertyKey, never>
        Returns: {
          average_response_time: number
          critical_incidents: number
          sla_compliance_rate: number
          total_incidents: number
        }[]
      }
      check_community_achievements: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      cleanup_old_analytics_events: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_data: {
        Args: { days_to_keep?: number }
        Returns: {
          deleted_conversations: number
          deleted_messages: number
        }[]
      }
      create_notification: {
        Args: {
          p_action_url?: string
          p_content_type?: string
          p_message?: string
          p_metadata?: Json
          p_related_content_id?: string
          p_related_user_id?: string
          p_title: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      decrement_community_members: {
        Args: { community_id: string }
        Returns: undefined
      }
      decrement_count: {
        Args: { column_name: string; row_id: string; table_name: string }
        Returns: undefined
      }
      decrement_likes: {
        Args: { post_id: string }
        Returns: undefined
      }
      format_response_time: {
        Args: { minutes: number }
        Returns: string
      }
      get_events_with_saved_filter: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_only_saved?: boolean
          p_user_id: string
        }
        Returns: {
          event_data: Json
          is_saved: boolean
        }[]
      }
      get_maps_api_key: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_or_create_conversation: {
        Args:
          | {
              p_event_id?: string
              p_service_id?: string
              p_space_id?: string
              p_user1_id: string
              p_user2_id: string
            }
          | {
              p_event_id?: string
              p_space_id?: string
              p_user1_id: string
              p_user2_id: string
            }
        Returns: string
      }
      get_or_create_default_wishlist: {
        Args: { user_id: string }
        Returns: string
      }
      get_saved_events: {
        Args: { p_limit?: number; p_offset?: number; p_user_id: string }
        Returns: {
          added_at: string
          event_data: Json
          event_id: string
          wishlist_id: string
          wishlist_name: string
        }[]
      }
      get_saved_spaces: {
        Args: { p_limit?: number; p_offset?: number; p_user_id: string }
        Returns: {
          added_at: string
          space_data: Json
          space_id: string
          wishlist_id: string
          wishlist_name: string
        }[]
      }
      get_spaces_with_saved_filter: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_only_saved?: boolean
          p_user_id: string
        }
        Returns: {
          is_saved: boolean
          space_data: Json
        }[]
      }
      get_unread_message_count: {
        Args: { p_user_id: string }
        Returns: number
      }
      increment_comments: {
        Args: { post_id: string }
        Returns: undefined
      }
      increment_community_members: {
        Args: { community_id: string }
        Returns: undefined
      }
      increment_count: {
        Args: { column_name: string; row_id: string; table_name: string }
        Returns: undefined
      }
      increment_likes: {
        Args: { post_id: string }
        Returns: undefined
      }
      increment_shares: {
        Args: { post_id: string }
        Returns: undefined
      }
      is_current_user_moderator: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_item_saved: {
        Args: { p_entity_id: string; p_entity_type: string; p_user_id: string }
        Returns: boolean
      }
      is_premium_or_moderator: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_premium_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      update_table_statistics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      event_category:
        | "cultural"
        | "sports"
        | "charity"
        | "business"
        | "fair"
        | "party"
        | "gastronomy"
        | "other"
      subscription_tier: "free" | "plus" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_category: [
        "cultural",
        "sports",
        "charity",
        "business",
        "fair",
        "party",
        "gastronomy",
        "other",
      ],
      subscription_tier: ["free", "plus", "premium"],
    },
  },
} as const

// Convenience type exports
export type Event = Database['public']['Tables']['events']['Row']
export type EventInsert = Database['public']['Tables']['events']['Insert']
export type EventUpdate = Database['public']['Tables']['events']['Update']

export type Space = Database['public']['Tables']['spaces']['Row']
export type SpaceInsert = Database['public']['Tables']['spaces']['Insert']
export type SpaceUpdate = Database['public']['Tables']['spaces']['Update']

export type Service = Database['public']['Tables']['services']['Row']
export type ServiceInsert = Database['public']['Tables']['services']['Insert']
export type ServiceUpdate = Database['public']['Tables']['services']['Update']

export type Booking = Database['public']['Tables']['bookings']['Row']
export type BookingInsert = Database['public']['Tables']['bookings']['Insert']
export type BookingUpdate = Database['public']['Tables']['bookings']['Update']

export type Review = Database['public']['Tables']['reviews']['Row']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update']

export type CommunityPost = Database['public']['Tables']['community_posts']['Row']
export type CommunityPostInsert = Database['public']['Tables']['community_posts']['Insert']
export type CommunityPostUpdate = Database['public']['Tables']['community_posts']['Update']

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Message = Database['public']['Tables']['messages']['Row']
export type MessageInsert = Database['public']['Tables']['messages']['Insert']
export type MessageUpdate = Database['public']['Tables']['messages']['Update']

export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

// Conversations (already exported Message above)
export type Conversation = Database['public']['Tables']['conversations']['Row']
export type ConversationInsert = Database['public']['Tables']['conversations']['Insert']
export type ConversationUpdate = Database['public']['Tables']['conversations']['Update']
