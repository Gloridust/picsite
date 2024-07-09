import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'

export default function About() {
  const aboutPath = path.join(process.cwd(), 'src/content/about.md')
  const aboutContent = fs.readFileSync(aboutPath, 'utf8')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose max-w-none">
        <ReactMarkdown>{aboutContent}</ReactMarkdown>
      </div>
    </div>
  )
}