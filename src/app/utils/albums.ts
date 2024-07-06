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

    // 确保日期是字符串格式
    const date = matterResult.data.date
      ? new Date(matterResult.data.date).toISOString().split('T')[0]
      : ''

    return {
      id,
      name: matterResult.data.name || '',
      date, // 使用处理后的日期
      description: matterResult.data.description || '',
      coverImage: matterResult.data.coverImage || '',
      images: matterResult.content.split('\n').filter(Boolean).map(line => line.trim().replace('- ', '')),
    }
  })
}

export function getAlbumById(id: string): Album | undefined {
  const albums = getAllAlbums()
  return albums.find(album => album.id === id)
}