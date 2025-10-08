import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

export type SubscriptionTier = 'free' | 'plus' | 'premium';

export interface PremiumLimits {
  maxEventsPerMonth: number;
  maxSpacesPerMonth: number;
  maxServicesPerMonth: number;
  maxCommunityPosts: number;
  maxBlogPosts: number;
  canCreatePolls: boolean;
  canCreateStories: boolean;
  canSendVoiceNotes: boolean;
  canAccessAnalytics: boolean;
  canPromotePosts: boolean;
  canSchedulePosts: boolean;
}

export const TIER_LIMITS: Record<SubscriptionTier, PremiumLimits> = {
  free: {
    maxEventsPerMonth: 2,
    maxSpacesPerMonth: 1,
    maxServicesPerMonth: 1,
    maxCommunityPosts: 10,
    maxBlogPosts: 0, // Free users cannot create blog posts
    canCreatePolls: false,
    canCreateStories: false,
    canSendVoiceNotes: false,
    canAccessAnalytics: false,
    canPromotePosts: false,
    canSchedulePosts: false,
  },
  plus: {
    maxEventsPerMonth: 10,
    maxSpacesPerMonth: 5,
    maxServicesPerMonth: 5,
    maxCommunityPosts: 50,
    maxBlogPosts: 5,
    canCreatePolls: true,
    canCreateStories: true,
    canSendVoiceNotes: false,
    canAccessAnalytics: true,
    canPromotePosts: false,
    canSchedulePosts: true,
  },
  premium: {
    maxEventsPerMonth: 999,
    maxSpacesPerMonth: 999,
    maxServicesPerMonth: 999,
    maxCommunityPosts: 999,
    maxBlogPosts: 999,
    canCreatePolls: true,
    canCreateStories: true,
    canSendVoiceNotes: true,
    canAccessAnalytics: true,
    canPromotePosts: true,
    canSchedulePosts: true,
  },
};

export function getUserTier(profile: Profile | null | undefined): SubscriptionTier {
  if (!profile || !profile.subscription_tier) {
    return 'free';
  }
  return profile.subscription_tier as SubscriptionTier;
}

export function getTierLimits(tier: SubscriptionTier): PremiumLimits {
  return TIER_LIMITS[tier];
}

export function canUserAccessFeature(
  profile: Profile | null | undefined,
  feature: keyof Omit<PremiumLimits, 'maxEventsPerMonth' | 'maxSpacesPerMonth' | 'maxServicesPerMonth' | 'maxCommunityPosts' | 'maxBlogPosts'>
): boolean {
  const tier = getUserTier(profile);
  const limits = getTierLimits(tier);
  return limits[feature];
}

export function hasReachedLimit(
  profile: Profile | null | undefined,
  limitType: 'maxEventsPerMonth' | 'maxSpacesPerMonth' | 'maxServicesPerMonth' | 'maxCommunityPosts' | 'maxBlogPosts',
  currentCount: number
): boolean {
  const tier = getUserTier(profile);
  const limits = getTierLimits(tier);
  return currentCount >= limits[limitType];
}

export interface UpgradePromptData {
  title: string;
  description: string;
  requiredTier: SubscriptionTier;
  feature: string;
}

export function getUpgradePrompt(feature: string, requiredTier: SubscriptionTier = 'plus'): UpgradePromptData {
  const prompts: Record<string, UpgradePromptData> = {
    poll: {
      title: 'Umfragen erstellen',
      description: 'Upgrade auf Plus oder Premium um Umfragen in deinen Posts zu erstellen.',
      requiredTier,
      feature: 'Umfragen',
    },
    story: {
      title: 'Stories erstellen',
      description: 'Upgrade auf Plus oder Premium um Stories zu teilen.',
      requiredTier,
      feature: 'Stories',
    },
    voiceNote: {
      title: 'Sprachnachrichten senden',
      description: 'Nur Premium-Mitglieder können Sprachnachrichten senden.',
      requiredTier: 'premium',
      feature: 'Sprachnachrichten',
    },
    analytics: {
      title: 'Analytics Dashboard',
      description: 'Upgrade auf Plus oder Premium um detaillierte Analytics zu sehen.',
      requiredTier,
      feature: 'Analytics',
    },
    blogPost: {
      title: 'Blog-Artikel erstellen',
      description: 'Upgrade auf Plus oder Premium um Blog-Artikel zu veröffentlichen.',
      requiredTier,
      feature: 'Blog-Artikel',
    },
    promotePosts: {
      title: 'Posts promoten',
      description: 'Nur Premium-Mitglieder können Posts promoten.',
      requiredTier: 'premium',
      feature: 'Post-Promotion',
    },
    schedulePosts: {
      title: 'Posts planen',
      description: 'Upgrade auf Plus oder Premium um Posts zu planen.',
      requiredTier,
      feature: 'Post-Planung',
    },
    maxEvents: {
      title: 'Mehr Events erstellen',
      description: `Du hast dein monatliches Limit erreicht. Upgrade für mehr Events.`,
      requiredTier,
      feature: 'Events',
    },
    maxSpaces: {
      title: 'Mehr Räume vermieten',
      description: `Du hast dein monatliches Limit erreicht. Upgrade für mehr Räume.`,
      requiredTier,
      feature: 'Räume',
    },
    maxServices: {
      title: 'Mehr Services anbieten',
      description: `Du hast dein monatliches Limit erreicht. Upgrade für mehr Services.`,
      requiredTier,
      feature: 'Services',
    },
  };

  return prompts[feature] ?? {
    title: 'Premium Feature',
    description: 'Dieses Feature erfordert ein Upgrade.',
    requiredTier,
    feature,
  };
}
