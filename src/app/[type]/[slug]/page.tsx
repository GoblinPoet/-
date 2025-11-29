import React from 'react';
import { notFound } from 'next/navigation';
import { getContentBySlug, getContentByType } from '@/lib/content';
import { ComicReader } from '@/components/ComicReader';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ComicContent, VideoContent } from '@/types/content';
import Image from 'next/image';
import { Download, Star, CheckCircle2 } from 'lucide-react';

// 1. 静态生成所有详情页路由
// 这一步是生成静态网站的关键：告诉 Next.js 有哪些页面需要生成
export async function generateStaticParams() {
  const types = ['comic', 'video', 'product', 'article'];
  let params: { type: string; slug: string }[] = [];

  for (const type of types) {
    const items = await getContentByType(type);
    const typeParams = items.map((item) => ({
      type: item.type,
      slug: item.slug || String(item.id),
    }));
    params = [...params, ...typeParams];
  }

  return params;
}

export default async function DetailPage({ params }: { params: { type: string; slug: string } }) {
  const item = await getContentBySlug(params.type, params.slug);

  if (!item) {
    notFound();
  }

  // Render based on type
  if (item.type === 'comic') {
    return <ComicReader comic={item as ComicContent} />;
  }

  if (item.type === 'video') {
    return <VideoPlayer video={item as VideoContent} />;
  }

  // Fallback for Article and Product (Simple Layout)
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-xl">
        {/* 使用 unoptimized=true 的普通 img 标签或者 Next Image (在 next.config.js 已配置 unoptimized) */}
        <Image 
          src={item.coverImage} 
          alt={item.title} 
          fill 
          className="object-cover"
        />
      </div>

      <div className="prose prose-lg prose-yellow mx-auto">
        <h1>{item.title}</h1>
        <p className="lead">{item.excerpt}</p>
        
        {/* Product Specific UI */}
        {item.type === 'product' && (item as any).appInfo && (
            <div className="my-8 bg-gray-50 p-6 rounded-xl border border-gray-100 not-prose">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">
                        🎁
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{(item as any).appInfo.version}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center text-yellow-500"><Star size={14} fill="currentColor" /> {(item as any).appInfo.rating}</span>
                            <span>•</span>
                            <span>{(item as any).appInfo.size}</span>
                        </div>
                    </div>
                    <button className="ml-auto bg-black text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                        <Download size={18} /> 下载
                    </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(item as any).appInfo.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 size={16} className="text-green-500" /> {f}
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Article Content */}
        {item.type === 'article' && (item as any).content && (
            <div dangerouslySetInnerHTML={{ __html: (item as any).content }} />
        )}
      </div>
    </div>
  );
}
