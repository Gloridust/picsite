import { notFound } from 'next/navigation'
import ImageGrid from '@/app/components/ImageGrid'
import { getAlbumById } from '@/app/utils/albums'

export default function Album({ params }: { params: { id: string } }) {
  const album = getAlbumById(params.id)

  if (!album) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{album.name}</h1>
        <p className="text-gray-600">{album.date}</p>
        <p>{album.description}</p>
      </div>
      <ImageGrid images={album.images} />
    </div>
  )
}