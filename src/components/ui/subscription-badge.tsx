import React from 'react';
import { User, Zap, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

type SubscriptionTier = 'free' | 'plus' | 'premium';

interface SubscriptionBadgeProps {
  tier: SubscriptionTier;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

const tierConfig: Record<SubscriptionTier, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  textColor: string;
  shimmer: boolean;
}> = {
  free: {
    label: 'Free',
    icon: User,
    gradient: 'bg-gray-500',
    textColor: 'text-white',
    shimmer: false,
  },
  plus: {
    label: 'Plus',
    icon: Zap,
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    textColor: 'text-white',
    shimmer: false,
  },
  premium: {
    label: 'Premium',
    icon: Crown,
    gradient: 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600',
    textColor: 'text-white',
    shimmer: true,
  },
};

const sizeConfig = {
  sm: {
    container: 'px-2 py-0.5 text-xs gap-1',
    icon: 'h-3 w-3',
  },
  md: {
    container: 'px-3 py-1 text-sm gap-1.5',
    icon: 'h-3.5 w-3.5',
  },
  lg: {
    container: 'px-4 py-1.5 text-base gap-2',
    icon: 'h-4 w-4',
  },
};

export function SubscriptionBadge({
  tier,
  size = 'md',
  className,
  showIcon = true,
}: SubscriptionBadgeProps): React.ReactElement {
  const config = tierConfig[tier];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold',
        'transition-all duration-300 hover:scale-105',
        config.gradient,
        config.textColor,
        sizeStyles.container,
        config.shimmer && 'relative overflow-hidden',
        className
      )}
    >
      {/* Shimmer effect for Premium */}
      {config.shimmer && (
        <div
          className={cn(
            'absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]',
            'bg-gradient-to-r from-transparent via-white/30 to-transparent'
          )}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-inherit">
        {showIcon && <Icon className={sizeStyles.icon} />}
        {config.label}
      </span>
    </div>
  );
}
