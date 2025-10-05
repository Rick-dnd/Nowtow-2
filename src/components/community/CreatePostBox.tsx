'use client';

import { Image as ImageIcon, BarChart3, MapPin, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function CreatePostBox(): React.ReactElement {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
          U
        </div>
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="What's happening?"
            className="min-h-[80px] resize-none border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Image</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Poll</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Location</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Smile className="h-4 w-4" />
                <span className="hidden sm:inline">Emoji</span>
              </Button>
            </div>

            <Button size="sm" className="rounded-full">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
