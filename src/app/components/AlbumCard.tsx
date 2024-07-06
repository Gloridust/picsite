'use client'

import { Album } from '@/types/album'
import Image from 'next/image'
import Link from 'next/link'

interface AlbumCardProps {
  album: Album
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Link href={`/album/${album.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative h-48">
          <Image
            src={album.coverImage}
            alt={album.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{album.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{album.date}</p>
          <p className="text-sm text-gray-700 line-clamp-2">{album.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default AlbumCard