'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { Button } from '@/components/ui/button';
import { Grid3x3 } from 'lucide-react';
import { PhotoTourModal } from './PhotoTourModal';
import type { SpaceImage } from '@/types/space-images';

interface SpaceImageGalleryProps {
  images: SpaceImage[];
  spaceName: string;
  className?: string;
}

export function SpaceImageGallery({ images, spaceName, className = '' }: SpaceImageGalleryProps): React.ReactElement {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
        <p className="text-muted-foreground">Keine Bilder verfügbar</p>
      </div>
    );
  }

  // Sort images by order
  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  // First 5 images for hero layout
  const heroImages = sortedImages.slice(0, 5);
  const mainImage = heroImages[0];
  const sideImages = heroImages.slice(1, 5);

  // Prepare slides for lightbox
  const slides = sortedImages.map((img, idx) => ({
    src: img.url,
    alt: `${spaceName} - Bild ${idx + 1}`,
    width: 1920,
    height: 1080,
  }));

  // Group images by category for photo tour section
  const categorizedImages = sortedImages.reduce((acc, img) => {
    const category = img.category || 'Alle Fotos';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(img);
    return acc;
  }, {} as Record<string, SpaceImage[]>);

  const hasCategories = Object.keys(categorizedImages).length > 1 ||
                        (Object.keys(categorizedImages).length === 1 && !categorizedImages['Alle Fotos']);

  return (
    <div className={className}>
      {/* Hero Grid Layout */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[500px] rounded-lg overflow-hidden">
        {/* Main Image - Left Side (60%) */}
        {mainImage && (
          <button
            onClick={() => {
              setIndex(0);
              setLightboxOpen(true);
            }}
            className="relative col-span-1 md:col-span-2 h-full overflow-hidden cursor-pointer group"
            aria-label={`Hauptbild vergrößern: ${spaceName}`}
          >
            <Image
              src={mainImage.url}
              alt={`${spaceName} - Hauptbild`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform group-hover:scale-105"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        )}

        {/* Side Images Grid - Right Side (40%) */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-2">
          {sideImages.map((image, idx) => (
            <button
              key={idx + 1}
              onClick={() => {
                setIndex(idx + 1);
                setLightboxOpen(true);
              }}
              className="relative overflow-hidden cursor-pointer group"
              aria-label={`Bild ${idx + 2} vergrößern`}
            >
              <Image
                src={image.url}
                alt={`${spaceName} - Bild ${idx + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          ))}
        </div>

        {/* "Alle Fotos anzeigen" Button */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 z-10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPhotoTourOpen(true)}
              className="bg-white text-black hover:bg-white/90 shadow-lg"
            >
              <Grid3x3 className="h-4 w-4 mr-2" />
              Alle Fotos anzeigen ({images.length})
            </Button>
          </div>
        )}
      </div>

      {/* Photo Tour Section - Only show if more than 5 images */}
      {images.length > 5 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">
            {hasCategories ? 'Fotorundgang' : 'Weitere Fotos'}
          </h2>

          {hasCategories ? (
            // Categorized view
            <div className="space-y-8">
              {Object.entries(categorizedImages).map(([category, categoryImages]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-4">
                    {category} ({categoryImages.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryImages.map((image, idx) => {
                      const globalIndex = sortedImages.findIndex((img) => img.url === image.url);
                      return (
                        <button
                          key={globalIndex}
                          onClick={() => {
                            setIndex(globalIndex);
                            setLightboxOpen(true);
                          }}
                          className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                          aria-label={`${category} - Bild ${idx + 1}`}
                        >
                          <Image
                            src={image.url}
                            alt={`${category} - ${spaceName}`}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform group-hover:scale-105"
                            quality={90}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Simple grid view without categories
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedImages.slice(5).map((image, idx) => {
                const globalIndex = idx + 5;
                return (
                  <button
                    key={globalIndex}
                    onClick={() => {
                      setIndex(globalIndex);
                      setLightboxOpen(true);
                    }}
                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                    aria-label={`Bild ${globalIndex + 1}`}
                  >
                    <Image
                      src={image.url}
                      alt={`${spaceName} - Bild ${globalIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform group-hover:scale-105"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Photo Tour Modal */}
      <PhotoTourModal
        open={photoTourOpen}
        onClose={() => setPhotoTourOpen(false)}
        images={sortedImages}
        spaceName={spaceName}
      />

      {/* Lightbox Modal for clicking individual images */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={index}
        slides={slides}
        on={{
          view: ({ index: newIndex }) => setIndex(newIndex),
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
    </div>
  );
}
