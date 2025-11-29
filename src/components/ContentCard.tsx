'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, ShoppingBag, MessageCircle, ArrowRight, Clock, Heart } from 'lucide-react';
import { ContentItem } from '@/types/content';
import Image from 'next/image';
import Link from 'next/link';

const CATEGORY_CONFIG = {
  comic: { icon: <BookOpen size={16} />, color: 'bg-yellow-400 text-gray-900', label: '漫画' },
  video: { icon: <Play size={16} />, color: 'bg-blue-400 text-white', label: '视频' },
  product: { icon: <ShoppingBag size={16} />, color: 'bg-pink-500 text-white', label: '好物' },
  article: { icon: <MessageCircle size={16} />, color: 'bg-green-500 text-white', label: '杂谈' },
};

export const ContentCard = ({ item }: { item: ContentItem }) => {
  const config = CATEGORY_CONFIG[item.type] || CATEGORY_CONFIG.article;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, rotate: 1 }}
      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-tutu-yellow hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${config.color}`}>
            {config.icon}
            {config.label}
          </span>
        </div>
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full font-bold text-sm transform scale-0 group-hover:scale-100 transition-transform duration-300">
                查看详情
            </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span className="flex items-center gap-1">
                <Clock size={12} />
                {item.publishDate}
            </span>
            <span className="flex items-center gap-1">
                <Heart size={12} className="group-hover:text-red-500 transition-colors" />
                {item.likes}
            </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-tutu-yellow transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
          {item.excerpt}
        </p>

        {/* Type Specific Footer */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                {item.readTime || (item.type === 'product' ? (item as any).price : '')}
            </span>
            <Link 
                href={`/${item.type}/${item.slug || item.id}`} 
                className="text-tutu-text font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
                Go <ArrowRight size={14} />
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

