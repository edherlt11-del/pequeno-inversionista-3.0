/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface FastImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

// Global in-memory cache to prevent duplicate fetch flashes
const loadedImagesCache = new Set<string>();

/**
 * Optimized image component with:
 * - Immediate pre-decoding
 * - Instant rendering if cached in memory
 * - Smooth skeleton shimmer loader while downloading
 * - Smooth fade-in transition
 * - Zero layout shift
 */
export function FastImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  ...props
}: FastImageProps) {
  const isAlreadyLoaded = loadedImagesCache.has(src);
  const [isLoaded, setIsLoaded] = useState(isAlreadyLoaded);

  useEffect(() => {
    if (!src || loadedImagesCache.has(src)) {
      setIsLoaded(true);
      return;
    }

    const img = new Image();
    img.src = src;
    img.referrerPolicy = 'no-referrer';
    img.onload = () => {
      loadedImagesCache.add(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Smooth Shimmer placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-emerald-500 animate-spin opacity-50" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => {
          loadedImagesCache.add(src);
          setIsLoaded(true);
        }}
        className={`transition-all duration-300 ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-xs'
        } ${className}`}
        {...props}
      />
    </div>
  );
}

/**
 * Preloads an array of image URLs in the background.
 */
export function preloadImages(urls: string[]) {
  if (typeof window === 'undefined') return;

  urls.forEach((url) => {
    if (!url || loadedImagesCache.has(url)) return;
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.src = url;
    img.onload = () => {
      loadedImagesCache.add(url);
    };
  });
}
