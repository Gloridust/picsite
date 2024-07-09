'use client';

import { notFound } from 'next/navigation';
import ImageGrid from '@/app/components/ImageGrid';
import { getAlbumById } from '@/app/utils/albums';

export default function Album({ params }: { params: { id: string } }) {
  const album = getAlbumById(params.id);

  if (!album) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{album.name}</h1>
      <p className="text-gray-600 mb-2">{album.date}</p>
      <p className="mb-6">{album.description}</p>
      <ImageGrid images={album.images} />
    </div>
  );
}