import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'

export default function About() {
  const aboutPath = path.join(process.cwd(), 'src/content/about.md')
  const aboutContent = fs.readFileSync(aboutPath, 'utf8')

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-sm sm:prose sm:prose mx-auto prose-img:mx-auto">
        <ReactMarkdown>{aboutContent}</ReactMarkdown>
      </article>
    </div>
  )
}