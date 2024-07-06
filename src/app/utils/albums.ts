import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Album } from '@/types/album'

const albumsDirectory = path.join(process.cwd(), 'src/content/albums')

export function getAllAlbums(): Album[] {
  const fileNames = fs.readdirSync(albumsDirectory)
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(albumsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as Omit<Album, 'id' | 'images'>),
      images: matterResult.content.split('\n').filter(Boolean).map(line => line.trim().replace('- ', '')),
    }
  })
}

export function getAlbumById(id: string): Album | undefined {
  const albums = getAllAlbums()
  return albums.find(album => album.id === id)
}