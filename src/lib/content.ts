import fs from 'fs';
import path from 'path';
import { ContentItem } from "@/types/content";

// CHANGE: Use process.cwd() directly, assuming build runs in root and public/ is accessible
// During build, Next.js doesn't serve 'public' via http, but files are on disk.
// GitHub Actions checkout puts files in root.
const CONTENT_DIR = path.join(process.cwd(), 'public', 'content');

// 辅助函数：读取某个类型下的所有内容
async function getItemsByType(type: string): Promise<ContentItem[]> {
  const typeDir = path.join(CONTENT_DIR, type);
  
  if (!fs.existsSync(typeDir)) {
      // Debug log for build time
      console.warn(`Warning: Content directory not found: ${typeDir}`);
      return [];
  }

  const items = fs.readdirSync(typeDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() || dirent.name.endsWith('.md'))
    .map(dirent => {
      const slug = dirent.name.replace('.md', '');
      
      // 处理 Markdown 文章
      if (type === 'article' && dirent.isFile()) {
        return null; 
      }

      // 处理文件夹形式的内容 (漫画、视频、产品)
      const metaPath = path.join(typeDir, slug, 'meta.json');
      if (!fs.existsSync(metaPath)) return null;

      try {
        const metaContent = fs.readFileSync(metaPath, 'utf-8');
        const meta = JSON.parse(metaContent);
        
        return {
          ...meta,
          id: slug,
          slug,
          type,
          // 修正图片路径，移除可能的 public 前缀，确保是绝对路径
          coverImage: meta.coverImage?.startsWith('http') 
            ? meta.coverImage 
            : `/content/${type}/${slug}/${meta.coverImage}`,
          
          comicImages: meta.comicImages?.map((img: string) => 
            img.startsWith('http') ? img : `/content/${type}/${slug}/${img}`
          ),
          
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
  const types = ['comic', 'video', 'product', 'article'];
  let allItems: ContentItem[] = [];
  
  for (const type of types) {
    const items = await getItemsByType(type);
    allItems = [...allItems, ...items];
  }
  
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
