# Next.js 静态博客使用指南

这是一个基于 Next.js 的全静态博客，专为 GitHub Pages 设计。

## 🚀 核心理念
**“文件即数据库”** - 你不需要管理复杂的后台，只需要管理文件夹。

## 📁 如何更新内容
所有内容都存放在 `public/content` 目录下。

### 1. 添加漫画
在 `public/content/comic/` 下新建一个文件夹（例如 `my-new-comic`）：
- `meta.json`: 必须包含 `title`, `comicImages` 等信息（参考 `mock-comic` 文件夹）。
- 图片文件: 直接放在该文件夹内，然后在 `meta.json` 中引用路径。

### 2. 添加视频
在 `public/content/video/` 下新建一个文件夹（例如 `my-vlog`）：
- `meta.json`: 包含 `videoUrl` (YouTube/B站 嵌入链接)。

## 🛠 如何预览与发布

### 方法 A：如果你没有安装 Node.js (推荐)
**直接利用 GitHub 的云端能力。**
1. 将代码上传到 GitHub。
2. 在 GitHub 仓库 -> Settings -> Pages 中，Source 选择 **GitHub Actions**。
3. 每次你上传新文件，GitHub 会自动构建并更新网站。

### 方法 B：如果你想在本地测试
你需要先安装 [Node.js](https://nodejs.org/)。
1. 安装依赖: `npm install`
2. 本地预览: `npm run dev` (浏览器打开 http://localhost:3000)
3. 生成静态 HTML: `npm run build` (生成的文件在 `out/` 目录)

## 📄 目录结构说明
- `public/content`: 你的内容仓库 (在这里增删改查)。
- `src/`: 网站源代码 (如果只改内容，不需要动这里)。

