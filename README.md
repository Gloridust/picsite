# PicSite

<p align="center">
  <a href="#">
    <img width="180" src="public\images\about\logo-rc.png">
  </a>
</p>
<h2 align="center">PicSite</h2>
<!-- <div align="center"><p><a href="./README.md">简体中文</a>|<a href="./README_EN.md">English(US)</a></p></div> -->

PicSite 是一个使用 Next.js 构建的在线图片展示网站。它允许用户浏览相册、查看图片，并提供了简单的搜索功能。

## 功能特点

- 相册展示：以网格形式展示多个相册
- 图片浏览：点击相册查看其中的所有图片
- 搜索功能：根据相册名称或描述搜索相册
- 响应式设计：适配桌面和移动设备
- 图片加载效果：使用优雅的加载动画提升用户体验
- 原图查看：点击图片可在新标签页中查看原图

## 技术栈

- Next.js 13+
- React
- TypeScript
- Tailwind CSS

## 部署流程

1. 克隆仓库：
   ```
   git clone https://github.com/Gloridust/picsite.git
   cd picsite
   ```

2. 安装依赖：
   ```
   npm install
   ```

3. 本地调试：
   ```
   npm run dev
   ```

4. 构建项目：
   ```
   npm run build
   ```

5. 启动生产服务器：
   ```
   npm start
   ```

   现在，您可以通过 `http://localhost:3000` 访问您的网站。

6. 部署到托管平台：
    您可以使用 Vercel 进行一键部署（推荐）。

## 如何添加相册和描述

1. 在 `src/content/albums/` 目录下创建一个新的 Markdown 文件，例如 `nature.md`。

2. 在文件的顶部添加 frontmatter，包括相册的元数据：

   ```markdown
   ---
   id: nature
   name: 自然风光
   date: 2024-03-15
   description: 美丽的自然风光摄影集
   coverImage: images/nature/cover.jpg
   ---
   - images/nature/1.jpg
   - images/nature/2.jpg
   - images/nature/3.jpg
   ```

3. 在 `public/images/` 目录下创建对应的文件夹（例如 `nature`），并将图片文件放入其中。

4. 确保 `coverImage` 路径和图片列表中的路径与实际文件位置相匹配。

## 贡献

欢迎提交 Pull Requests 来改进这个项目。对于重大更改，请先开一个 issue 讨论您想要改变的内容。

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)
