import ReactMarkdown from 'react-markdown'

const aboutContent = `
# 关于 PicSite

PicSite 是一个简单而强大的在线图片展示网站。

## 主要功能

- 按相册分类展示图片
- 搜索相册功能
- 响应式设计，支持移动端和桌面端
`

export default function About() {
  return (
    <div className="prose">
      <ReactMarkdown>{aboutContent}</ReactMarkdown>
    </div>
  )
}