'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setLoading(true);
    setCurrentSrc(src);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        className={`duration-700 ease-in-out ${
          loading
            ? 'grayscale blur-2xl scale-110'
            : 'grayscale-0 blur-0 scale-100'
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default ProgressiveImage;