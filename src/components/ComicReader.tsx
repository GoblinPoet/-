'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import { ComicContent } from '@/types/content';
import Image from 'next/image';

export const ComicReader = ({ comic }: { comic: ComicContent }) => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // In a real app, we would fetch the images for the specific chapter
  // For now, we just use the comicImages from the mock data
  const images = comic.comicImages || [];

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-20">
      {/* Reader Header */}
      <div className="sticky top-0 z-40 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center">
        <h2 className="text-sm font-bold truncate max-w-[60%]">{comic.title} - 第 {currentChapter} 话</h2>
        <div className="flex gap-4">
           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-gray-800 rounded-full">
             <List size={20} />
           </button>
        </div>
      </div>

      {/* Chapter Selector Drawer */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-0 top-14 z-30 bg-gray-800 border-b border-gray-700 p-4 max-h-[50vh] overflow-y-auto"
        >
          <div className="grid grid-cols-3 gap-2">
            {comic.chapters?.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setCurrentChapter(Number(ch.id));
                  setIsMenuOpen(false);
                }}
                className={`p-2 text-sm rounded hover:bg-gray-700 ${currentChapter === ch.id ? 'bg-tutu-yellow text-gray-900 font-bold' : 'bg-gray-900'}`}
              >
                {ch.title}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Image List (Webtoon Style) */}
      <div className="max-w-3xl mx-auto">
        {images.map((src, index) => (
          <div key={index} className="relative w-full">
             {/* We use specific aspect ratio or auto height in real world */}
             <img 
               src={src} 
               alt={`Page ${index + 1}`} 
               className="w-full h-auto block"
               loading="lazy"
             />
          </div>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 inset-x-0 bg-gray-900/90 backdrop-blur p-4 border-t border-gray-800 flex justify-between max-w-3xl mx-auto w-full">
        <button 
            disabled={currentChapter <= 1}
            onClick={() => setCurrentChapter(c => c - 1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30"
        >
            <ChevronLeft /> 上一话
        </button>
        <span className="text-sm font-bold py-2">第 {currentChapter} / {comic.chapters?.length || 1} 话</span>
        <button 
            disabled={currentChapter >= (comic.chapters?.length || 1)}
            onClick={() => setCurrentChapter(c => c + 1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30"
        >
            下一话 <ChevronRight />
        </button>
      </div>
    </div>
  );
};

