/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 重要：如果你没有绑定域名，而是用 github.io/repo-name/，这里必须设置 basePath
  // 但因为我们要做通用适配，且推荐最后用 CF，所以这里我们暂时留空。
  // 如果部署到 GitHub Pages 子路径后样式丢失，需要回来改这里为 '/-' (你的仓库名)
  // basePath: '/-', 
};

module.exports = nextConfig;
