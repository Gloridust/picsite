'use client'

import Image from 'next/image'
import { shimmer, toBase64 } from '@/utils/imageUtils'

interface ImageGridProps {
  images: string[]
}

const ImageItem: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  const openOriginalImage = () => {
    window.open(src, '_blank')
  }

  return (
    <div 
      className="relative aspect-square cursor-pointer"
      onClick={openOriginalImage}
    >
      <Image
        src={src}
        alt={`Image ${index + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      />
    </div>
  )
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <ImageItem key={index} src={image} index={index} />
      ))}
    </div>
  )
}

export default ImageGrid