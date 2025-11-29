export type ContentType = 'comic' | 'video' | 'product' | 'article';

export interface BaseContent {
  id: string | number;
  slug?: string; // Optional for mock data compatibility initially
  type: ContentType;
  title: string;
  excerpt: string; // Brief description
  coverImage: string; // Uniform name for 'image'
  publishDate: string;
  category: string;
  readTime?: string;
  likes?: number;
}

export interface ComicContent extends BaseContent {
  type: 'comic';
  comicImages?: string[];
  chapters?: { id: number | string; title: string }[];
}

export interface VideoContent extends BaseContent {
  type: 'video';
  videoUrl?: string;
  duration?: string;
  videoMeta?: {
    director: string;
    studio: string;
    cast: string[];
    rating: number;
  };
}

export interface ProductContent extends BaseContent {
  type: 'product';
  price?: string;
  appInfo?: {
    version: string;
    size: string;
    rating: number;
    platform: string;
    downloadLink: string;
    features: string[];
    pricing: { label: string; price: string; desc: string; recommend?: boolean }[];
    screenshots: string[];
  };
}

export interface ArticleContent extends BaseContent {
  type: 'article';
  content?: string; // HTML content for now
}

export type ContentItem = ComicContent | VideoContent | ProductContent | ArticleContent;

