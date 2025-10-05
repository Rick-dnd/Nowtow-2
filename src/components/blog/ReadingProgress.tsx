'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ReadingProgressProps {
  targetRef?: React.RefObject<HTMLElement>;
  className?: string;
  color?: string;
}

export function ReadingProgress({
  targetRef,
  className,
  color = 'bg-primary',
}: ReadingProgressProps): React.ReactElement {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = (): void => {
      if (targetRef?.current) {
        const element = targetRef.current;
        const elementTop = element.offsetTop;
        const elementHeight = element.scrollHeight;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;

        const distanceScrolled = scrollTop - elementTop + windowHeight;
        const totalDistance = elementHeight;

        const currentProgress = Math.min(
          Math.max((distanceScrolled / totalDistance) * 100, 0),
          100
        );
        setProgress(currentProgress);
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setProgress(Math.min(Math.max(scrollPercent, 0), 100));
      }
    };

    calculateProgress();

    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return (): void => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [targetRef]);

  return (
    <div
      className={cn('fixed top-0 left-0 right-0 h-1 bg-muted z-50', className)}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className={cn('h-full transition-all duration-150', color)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
