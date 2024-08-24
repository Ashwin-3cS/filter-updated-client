// utils/imageLoader.js
import type { ImageLoader } from 'next/image';

export const customImageLoader: ImageLoader = ({ src, width, quality }) => {
  // Modify this URL if necessary to match your image service's requirements
  return `${src}?w=${width}&q=${quality || 75}`;
};
