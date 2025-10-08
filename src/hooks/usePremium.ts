import { useState } from 'react';
import { useProfile } from '@/hooks/useAuth';
import {
  canUserAccessFeature,
  hasReachedLimit,
  getUserTier,
  getUpgradePrompt,
  type SubscriptionTier,
  type UpgradePromptData,
} from '@/lib/premium';

export function usePremiumCheck(): {
  tier: SubscriptionTier;
  canAccess: (feature: string) => boolean;
  checkLimit: (limitType: string, currentCount: number) => boolean;
  showUpgradePrompt: (feature: string) => void;
  upgradePromptOpen: boolean;
  setUpgradePromptOpen: (open: boolean) => void;
  promptData: UpgradePromptData | null;
} {
  const { data: profile } = useProfile(undefined);
  const [upgradePromptOpen, setUpgradePromptOpen] = useState(false);
  const [promptData, setPromptData] = useState<UpgradePromptData | null>(null);

  const tier = getUserTier(profile);

  const canAccess = (feature: string): boolean => {
    switch (feature) {
      case 'polls':
        return canUserAccessFeature(profile, 'canCreatePolls');
      case 'stories':
        return canUserAccessFeature(profile, 'canCreateStories');
      case 'voiceNotes':
        return canUserAccessFeature(profile, 'canSendVoiceNotes');
      case 'analytics':
        return canUserAccessFeature(profile, 'canAccessAnalytics');
      case 'promote':
        return canUserAccessFeature(profile, 'canPromotePosts');
      case 'schedule':
        return canUserAccessFeature(profile, 'canSchedulePosts');
      default:
        return true;
    }
  };

  const checkLimit = (limitType: string, currentCount: number): boolean => {
    switch (limitType) {
      case 'events':
        return hasReachedLimit(profile, 'maxEventsPerMonth', currentCount);
      case 'spaces':
        return hasReachedLimit(profile, 'maxSpacesPerMonth', currentCount);
      case 'services':
        return hasReachedLimit(profile, 'maxServicesPerMonth', currentCount);
      case 'posts':
        return hasReachedLimit(profile, 'maxCommunityPosts', currentCount);
      case 'blog':
        return hasReachedLimit(profile, 'maxBlogPosts', currentCount);
      default:
        return false;
    }
  };

  const showUpgradePrompt = (feature: string): void => {
    const prompt = getUpgradePrompt(feature);
    setPromptData(prompt);
    setUpgradePromptOpen(true);
  };

  return {
    tier,
    canAccess,
    checkLimit,
    showUpgradePrompt,
    upgradePromptOpen,
    setUpgradePromptOpen,
    promptData,
  };
}
