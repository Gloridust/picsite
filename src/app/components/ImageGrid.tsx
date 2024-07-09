'use client';

import ProgressiveImage from './ProgressiveImage';

interface ImageGridProps {
  images: string[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square">
          <ProgressiveImage
            src={image}
            alt={`Image ${index + 1}`}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;