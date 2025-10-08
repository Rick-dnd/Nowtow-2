'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogSidebar } from '@/components/blog/BlogSidebar';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Persistent Left Sidebar - 3 columns */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24">
                <BlogSidebar />
              </div>
            </aside>

            {/* Main Content Area - 9 columns */}
            <div className="lg:col-span-9">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
