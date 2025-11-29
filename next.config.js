/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 核心配置：生成纯静态 HTML/CSS/JS
  images: {
    unoptimized: true, // 必须开启：因为没有服务器处理图片
  },
  // 如果你要发布到 GitHub Pages 的子路径 (https://username.github.io/repo-name/)
  // 需要开启 basePath。如果你绑定了自定义域名，则不需要这行。
  // basePath: '/your-repo-name', 
};

module.exports = nextConfig;
