'use client'

import Image from 'next/image'

interface ImageGridProps {
  images: string[]
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square">
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}

export default ImageGrid