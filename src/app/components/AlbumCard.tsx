import Image from 'next/image'
import Link from 'next/link'
import { Album } from '@/types/album'

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

// 辅助函数：生成 SVG
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default AlbumCard