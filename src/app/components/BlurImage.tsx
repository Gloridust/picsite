'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BlurImageProps {
  src: string
  alt: string
}

const BlurImage: React.FC<BlurImageProps> = ({ src, alt }) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <span className="inline-block relative overflow-hidden rounded-lg" style={{ aspectRatio: '16 / 9' }}>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
      )}
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className={`duration-700 ease-in-out ${
          isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
    </span>
  )
}

export default BlurImage