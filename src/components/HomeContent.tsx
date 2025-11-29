'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Play, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { ContentCard } from '@/components/ContentCard';
import { ContentItem } from '@/types/content';

const CATEGORIES = [
  { id: 'all', label: '全部', icon: <Star size={18} />, color: 'bg-gray-800 text-white' },
  { id: 'comic', label: '漫画', icon: <BookOpen size={18} />, color: 'bg-yellow-400 text-gray-900' },
  { id: 'video', label: '视频', icon: <Play size={18} />, color: 'bg-blue-400 text-white' },
  { id: 'product', label: '好物', icon: <ShoppingBag size={18} />, color: 'bg-pink-500 text-white' },
  { id: 'article', label: '杂谈', icon: <MessageCircle size={18} />, color: 'bg-green-500 text-white' },
];

export default function HomeContent({ initialPosts }: { initialPosts: ContentItem[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState<ContentItem[]>(initialPosts);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredPosts(initialPosts);
    } else {
      setFilteredPosts(initialPosts.filter(post => post.type === activeCategory));
    }
  }, [activeCategory, initialPosts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-happy text-4xl md:text-6xl font-bold text-gray-800 mb-4"
        >
          欢迎来到 <span className="text-tutu-yellow relative inline-block">
            翻斗花园
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-tutu-red opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-500 max-w-2xl mx-auto"
        >
          这里没有复杂的算法，只有像图图一样简单的快乐。
          <br/>
          漫画、视频、好物推荐，还有一些碎碎念。
        </motion.p>
      </section>

      {/* Category Filter */}
      <section className="mb-12 flex flex-wrap justify-center gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all transform hover:scale-105
              ${activeCategory === cat.id 
                ? `${cat.color} shadow-lg ring-4 ring-opacity-20 ring-gray-200` 
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </section>

      {/* Content Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredPosts.map((post) => (
            <ContentCard key={post.id} item={post} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-happy">这里好像什么都没有呢...</p>
          <p>去看看别的分类吧？</p>
        </div>
      )}
    </div>
  );
}

