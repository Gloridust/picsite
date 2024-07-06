import { Suspense } from 'react'
import AlbumGrid from './components/AlbumGrid'
import { getAllAlbums } from './utils/albums'
import SearchBar from './components/SearchBar'

export default function Home() {
  const albums = getAllAlbums()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">PicSite 相册集</h1>
      
      <Suspense fallback={<div>加载中...</div>}>
        <SearchBar albums={albums} />
      </Suspense>
    </div>
  )
}