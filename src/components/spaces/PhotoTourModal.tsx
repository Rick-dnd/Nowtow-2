'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { Dialog, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { SpaceImage } from '@/types/space-images';

interface PhotoTourModalProps {
  open: boolean;
  onClose: () => void;
  images: SpaceImage[];
  spaceName: string;
}

// Kategorie-Mapping (Deutsch)
const CATEGORY_LABELS: Record<string, string> = {
  'living-room': 'Wohnzimmer',
  'kitchen': 'Voll ausgestattete Küche',
  'dining': 'Essbereich',
  'bedroom': 'Schlafzimmer',
  'bathroom': 'Badezimmer',
  'backyard': 'Hinterhof',
  'terrace': 'Terrasse',
  'exterior': 'Außenbereich',
  'additional': 'Zusätzliche Fotos',
};

export function PhotoTourModal({ open, onClose, images, spaceName }: PhotoTourModalProps): React.ReactElement {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Gruppiere Bilder nach Kategorie
  const categorizedImages = images.reduce((acc, img) => {
    const category = img.category || 'additional';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(img);
    return acc;
  }, {} as Record<string, SpaceImage[]>);

  // Sortiere Kategorien: alle vorhandenen Kategorien dynamisch, 'additional' am Ende
  const sortedCategories = Object.keys(categorizedImages).sort((a, b) => {
    // 'additional' (Keine Kategorie) immer am Ende
    if (a === 'additional' || a === 'Keine Kategorie') return 1;
    if (b === 'additional' || b === 'Keine Kategorie') return -1;
    // Restliche alphabetisch sortieren
    return a.localeCompare(b, 'de');
  });

  // Alle Bilder für Lightbox
  const allSlides = images.map((img, idx) => ({
    src: img.url,
    alt: `${spaceName} - Bild ${idx + 1}`,
    width: 1920,
    height: 1080,
  }));

  const handleImageClick = (imageUrl: string): void => {
    const index = images.findIndex((img) => img.url === imageUrl);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const scrollToCategory = (category: string): void => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogPortal>
          {/* Fullscreen Overlay */}
          <div className="fixed inset-0 z-50 bg-background">
            <DialogTitle>
              <VisuallyHidden>Fotorundgang - {spaceName}</VisuallyHidden>
            </DialogTitle>

            <div className="flex h-full">
              {/* Sidebar Navigation */}
              <aside className="hidden md:flex md:w-64 border-r bg-background flex-col">
                <div className="p-6 overflow-y-auto flex-1">
                  <h2 className="text-lg font-semibold mb-4">Fotorundgang</h2>
                  <div className="space-y-1">
                    {sortedCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => scrollToCategory(category)}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-sm transition-colors"
                      >
                        <div className="font-medium">{CATEGORY_LABELS[category] || category}</div>
                        <div className="text-xs text-muted-foreground">
                          {categorizedImages[category]?.length || 0} Fotos
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-background border-b p-4 flex items-center justify-between">
                  <h1 className="text-xl font-semibold">{spaceName}</h1>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    aria-label="Schließen"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </header>

                {/* Photo Grid by Category - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-8 space-y-12 max-w-7xl mx-auto">
                    {sortedCategories.map((category) => {
                      const categoryImages = categorizedImages[category] || [];
                      return (
                        <section
                          key={category}
                          id={`category-${category}`}
                          className="scroll-mt-20"
                        >
                          <h3 className="text-2xl font-semibold mb-6">
                            {CATEGORY_LABELS[category] || category}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categoryImages.map((image, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleImageClick(image.url)}
                                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group focus:outline-none"
                                aria-label={`${CATEGORY_LABELS[category]} - Bild ${idx + 1}`}
                              >
                                <Image
                                  src={image.url}
                                  alt={`${CATEGORY_LABELS[category]} - ${spaceName}`}
                                  fill
                                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                  className="object-cover transition-transform group-hover:scale-105"
                                  quality={90}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                              </button>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogPortal>
      </Dialog>

      {/* Lightbox for full-screen viewing */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allSlides}
        on={{
          view: ({ index: newIndex }) => setLightboxIndex(newIndex),
        }}
        plugins={[Fullscreen, Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
        }}
        carousel={{
          finite: images.length <= 1,
          preload: 2,
        }}
        toolbar={{
          buttons: ['zoom', 'fullscreen', 'close'],
        }}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
          },
        }}
        animation={{
          fade: 300,
          swipe: 300,
        }}
      />
    </>
  );
}
