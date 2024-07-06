'use client'

import { useState } from 'react'
import AlbumGrid from './AlbumGrid'
import { Album } from '@/types/album'

export default function SearchBar({ albums }: { albums: Album[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAlbums = albums.filter(album => {
    if (!album || typeof album !== 'object') return false;
    
    const name = album.name ?? '';
    const description = album.description ?? '';

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          placeholder="搜索相册..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredAlbums.length > 0 ? (
        <AlbumGrid albums={filteredAlbums} />
      ) : (
        <p className="text-center text-gray-500">没有找到匹配的相册</p>
      )}
    </>
  )
}