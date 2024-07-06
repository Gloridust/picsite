'use client'

import { useState } from 'react'
import { getAllAlbums } from './utils/albums'
import AlbumGrid from './components/AlbumGrid'
import { Album } from '@/types/album'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const albums: Album[] = getAllAlbums()

  const filteredAlbums = albums.filter(album =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">PicSite 相册集</h1>
      
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
    </div>
  )
}