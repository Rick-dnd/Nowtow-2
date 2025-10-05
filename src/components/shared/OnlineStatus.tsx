'use client';

import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface OnlineStatusProps {
  userId?: string;
  isOnline?: boolean; // TODO: Integrate with useRealtime Presence
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

export function OnlineStatus({
  isOnline = false,
  size = 'md',
  showTooltip = true,
  className = '',
}: OnlineStatusProps): React.ReactElement {
  // TODO: Use useRealtimePresence hook to get actual online status
  // const { presenceState } = useRealtimePresence('online-users');
  // const isOnline = presenceState?.[userId]?.online ?? false;

  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  const statusDot = (
    <span
      className={cn(
        'inline-block rounded-full',
        isOnline ? 'bg-green-500 ring-2 ring-background' : 'bg-gray-400',
        sizeClasses[size],
        className
      )}
      aria-label={isOnline ? 'Online' : 'Offline'}
      role="status"
    />
  );

  if (!showTooltip) {
    return statusDot;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {statusDot}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{isOnline ? 'Online' : 'Offline'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface OnlineStatusAvatarProps {
  userId?: string;
  children: React.ReactNode;
  isOnline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Wrapper component that adds online status indicator to an avatar
 */
export function OnlineStatusAvatar({
  children,
  isOnline = false,
  size = 'md',
  className = '',
}: OnlineStatusAvatarProps): React.ReactElement {
  const dotSizeClasses = {
    sm: 'h-2 w-2 border',
    md: 'h-3 w-3 border-2',
    lg: 'h-4 w-4 border-2',
  };

  return (
    <div className={cn('relative inline-block', className)}>
      {children}
      <span
        className={cn(
          'absolute bottom-0 right-0 rounded-full border-background',
          isOnline ? 'bg-green-500' : 'bg-gray-400',
          dotSizeClasses[size]
        )}
        aria-label={isOnline ? 'Online' : 'Offline'}
        role="status"
      />
    </div>
  );
}
