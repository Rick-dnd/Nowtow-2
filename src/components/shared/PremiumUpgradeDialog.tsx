'use client';

import { Crown, Zap } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import type { UpgradePromptData } from '@/lib/premium';

interface PremiumUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promptData: UpgradePromptData;
}

export function PremiumUpgradeDialog({
  open,
  onOpenChange,
  promptData,
}: PremiumUpgradeDialogProps): React.ReactElement {
  const router = useRouter();

  const handleUpgrade = (): void => {
    onOpenChange(false);
    router.push('/pricing');
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600">
            {promptData.requiredTier === 'premium' ? (
              <Crown className="h-8 w-8 text-white" />
            ) : (
              <Zap className="h-8 w-8 text-white" />
            )}
          </div>
          <AlertDialogTitle className="text-center text-2xl">{promptData.title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            {promptData.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 space-y-3">
          <div className="rounded-lg bg-gradient-to-r from-primary/10 to-emerald-500/10 p-4">
            <p className="text-sm font-medium text-center">
              Upgrade auf{' '}
              <span className="font-bold text-primary">
                {promptData.requiredTier === 'premium' ? 'Premium' : 'Plus'}
              </span>{' '}
              und erhalte Zugriff auf {promptData.feature} und viele weitere Features!
            </p>
          </div>
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel>Später</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
          >
            Jetzt upgraden
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
