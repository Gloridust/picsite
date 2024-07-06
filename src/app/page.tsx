'use client'

import { useState } from 'react'
import AlbumGrid from './components/AlbumGrid'
import { getAllAlbums } from './utils/albums'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const albums = getAllAlbums()

  const filteredAlbums = albums.filter(album =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="搜索相册..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <AlbumGrid albums={filteredAlbums} />
    </div>
  )
}