import Image from 'next/image'
import Link from 'next/link'
import { Album } from '@/types/album'
import { shimmer, toBase64 } from '@/utils/imageUtils'

interface AlbumCardProps {
  album: Album
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Link href={`/album/${album.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48">
          <Image
            src={album.coverImage}
            alt={album.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{album.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{album.date}</p>
          <p className="text-gray-700 text-sm">{album.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default AlbumCard