'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
}

export function ImageGallery({ images, className = '' }: ImageGalleryProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Keine Bilder verfügbar</p>
      </div>
    );
  }

  // Slides mit width/height für responsive srcset
  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    width: img.width || 1920,
    height: img.height || 1080,
  }));

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid gap-2 ${className}`} role="region" aria-label="Bildergalerie">
        {images.length === 1 ? (
          <button
            onClick={() => {
              setIndex(0);
              setOpen(true);
            }}
            className="relative aspect-video w-full overflow-hidden rounded-lg cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Bild vergrößern: ${images[0]?.alt || 'Bild 1'}`}
          >
            <Image
              src={images[0]?.src || ''}
              alt={images[0]?.alt || 'Bild 1'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
              priority
              quality={90}
            />
          </button>
        ) : (
          <>
            {/* Main Image */}
            <button
              onClick={() => {
                setIndex(0);
                setOpen(true);
              }}
              className="relative aspect-video w-full overflow-hidden rounded-lg cursor-pointer group col-span-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Hauptbild vergrößern: ${images[0]?.alt || 'Bild 1'}`}
            >
              <Image
                src={images[0]?.src || ''}
                alt={images[0]?.alt || 'Bild 1'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-105"
                priority
                quality={90}
              />
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  +{images.length - 1} weitere
                </div>
              )}
            </button>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(1, 5).map((image, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => {
                      setIndex(idx + 1);
                      setOpen(true);
                    }}
                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`Bild ${idx + 2} vergrößern: ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 25vw, 10vw"
                      className="object-cover transition-transform group-hover:scale-105"
                      quality={90}
                    />
                    {idx === 3 && images.length > 5 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold">
                        +{images.length - 5}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Modal - Nur Fullscreen & Zoom */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{
          view: ({ index: newIndex }) => setIndex(newIndex),
        }}
        // Nur Fullscreen und Zoom Plugins
        plugins={[Fullscreen, Zoom]}
        // Zoom-Konfiguration
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
        // Standard Toolbar Buttons
        toolbar={{
          buttons: ['zoom', 'fullscreen', 'close'],
        }}
        // Styles für größere, optimierte Darstellung
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
