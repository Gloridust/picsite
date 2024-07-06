import { Album } from '@/types/album'

const albums: Album[] = [
  {
    id: 'nature',
    name: '自然风光',
    date: '2024-03-15',
    description: '美丽的自然风光摄影集',
    coverImage: '/images/nature/cover.jpg',
    images: [
      '/images/nature/1.jpg',
      '/images/nature/2.jpg',
      '/images/nature/3.jpg',
    ],
  },
  // 添加更多相册...
]

export function getAllAlbums(): Album[] {
  return albums
}

export function getAlbumById(id: string): Album | undefined {
  return albums.find(album => album.id === id)
}