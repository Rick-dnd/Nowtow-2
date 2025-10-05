'use client';

import { Header } from '@/components/layout/Header';
import { CommunitySidebar } from '@/components/community/CommunitySidebar';
import { CommunityFeed } from '@/components/community/CommunityFeed';
import { TrendingSidebar } from '@/components/community/TrendingSidebar';

export default function CommunityPage(): React.ReactElement {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20">
                <CommunitySidebar />
              </div>
            </aside>

            {/* Center Feed */}
            <div className="lg:col-span-6">
              <CommunityFeed />
            </div>

            {/* Right Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20">
                <TrendingSidebar />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
