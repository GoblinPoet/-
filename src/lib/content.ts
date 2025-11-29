import fs from 'fs';
import path from 'path';
import { ContentItem, ComicContent, VideoContent, ProductContent, ArticleContent } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), 'public', 'content');

// 辅助函数：读取某个类型下的所有内容
async function getItemsByType(type: string): Promise<ContentItem[]> {
  const typeDir = path.join(CONTENT_DIR, type);
  
  if (!fs.existsSync(typeDir)) return [];

  const items = fs.readdirSync(typeDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() || dirent.name.endsWith('.md'))
    .map(dirent => {
      const slug = dirent.name.replace('.md', '');
      
      // 处理 Markdown 文章
      if (type === 'article' && dirent.isFile()) {
        // 简单处理：实际项目中需要解析 frontmatter
        // 这里为了演示，我们假设文章也是文件夹结构，或者暂时简化处理
        return null; 
      }

      // 处理文件夹形式的内容 (漫画、视频、产品)
      const metaPath = path.join(typeDir, slug, 'meta.json');
      if (!fs.existsSync(metaPath)) return null;

      try {
        const metaContent = fs.readFileSync(metaPath, 'utf-8');
        const meta = JSON.parse(metaContent);
        
        // 自动修正图片路径: ./cover.jpg -> /content/comics/slug/cover.jpg
        // 注意：在 Next.js public 目录映射中，我们需要一种方式来访问这些图片
        // 最简单的方式是将 content 目录视为 public 的一部分，或者在构建时复制
        // 这里我们假设用户会将 content 目录放在 public/content 下，或者我们配置了拷贝脚本
        // 为了简化，我们假设路径前缀需要手动处理，或者 content 就在 public 下
        // 修正策略：假设 content 文件夹在根目录，我们需要在 next.config.js 中或者通过脚本将其暴露
        // **为了最简单的静态体验，我们将把 content 目录建议放在 public/content**
        
        return {
          ...meta,
          id: slug,
          slug,
          type,
          // 确保图片路径正确
          coverImage: meta.coverImage?.startsWith('http') 
            ? meta.coverImage 
            : `/content/${type}/${slug}/${meta.coverImage}`,
          
          // 特殊处理漫画图片
          comicImages: meta.comicImages?.map((img: string) => 
            img.startsWith('http') ? img : `/content/${type}/${slug}/${img}`
          ),
          
          // 特殊处理产品截图
          appInfo: meta.appInfo ? {
            ...meta.appInfo,
            screenshots: meta.appInfo.screenshots?.map((img: string) => 
                img.startsWith('http') ? img : `/content/${type}/${slug}/${img}`
            )
          } : undefined
        } as ContentItem;
      } catch (e) {
        console.error(`Error parsing meta for ${slug}`, e);
        return null;
      }
    })
    .filter((item): item is ContentItem => item !== null);

  return items;
}

export async function getAllContent(): Promise<ContentItem[]> {
  // 如果是构建时，确保能读到文件
  const types = ['comic', 'video', 'product', 'article'];
  let allItems: ContentItem[] = [];
  
  for (const type of types) {
    const items = await getItemsByType(type);
    allItems = [...allItems, ...items];
  }
  
  // 按日期倒序
  return allItems.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export async function getContentByType(type: string): Promise<ContentItem[]> {
  if (type === 'all') return getAllContent();
  return getItemsByType(type);
}

export async function getContentBySlug(type: string, slug: string): Promise<ContentItem | undefined> {
  const items = await getItemsByType(type);
  return items.find(item => item.slug === slug);
}
