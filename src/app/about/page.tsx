import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import BlurImage from '../components/BlurImage'

type MarkdownNodeProps = {
  node: {
    children: Array<{
      tagName?: string
      properties?: {
        src?: string
        alt?: string
      }
    }>
  }
  children: React.ReactNode
}

const MarkdownComponents: ReactMarkdownOptions['components'] = {
  p: ({ node, children }: MarkdownNodeProps) => {
    if (node.children[0].tagName === 'img') {
      const image = node.children[0]
      return (
        <BlurImage
          src={image.properties?.src || ''}
          alt={image.properties?.alt || ''}
        />
      )
    }
    return <p>{children}</p>
  },
  img: ({ src, alt }) => <BlurImage src={src || ''} alt={alt || ''} />
}

export default function About() {
  const aboutPath = path.join(process.cwd(), 'src/content/about.md')
  const aboutContent = fs.readFileSync(aboutPath, 'utf8')

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-sm sm:prose sm:prose mx-auto">
        <ReactMarkdown components={MarkdownComponents}>{aboutContent}</ReactMarkdown>
      </article>
    </div>
  )
}