'use client';

import React from 'react';
import { VideoContent } from '@/types/content';
import { Play, User, Building2, Star } from 'lucide-react';

export const VideoPlayer = ({ video }: { video: VideoContent }) => {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Video Container */}
      <div className="w-full aspect-video bg-black relative flex items-center justify-center">
        {video.videoUrl ? (
            <iframe 
                src={video.videoUrl} 
                className="w-full h-full" 
                allowFullScreen 
                title={video.title}
            />
        ) : (
            <div className="text-center">
                <Play size={48} className="mx-auto mb-4 text-gray-500" />
                <p className="text-gray-500">视频加载失败</p>
            </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{video.title}</h1>
        
        <div className="flex items-center gap-6 text-gray-400 mb-8 border-b border-gray-800 pb-8">
            <span className="flex items-center gap-2">
                <Play size={16} /> {video.duration}
            </span>
            <span className="flex items-center gap-2">
                <Star size={16} className="text-tutu-yellow" /> {video.videoMeta?.rating}
            </span>
            <span>{video.publishDate}</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <h3 className="text-lg font-bold mb-4 text-white">简介</h3>
                <p className="text-gray-400 leading-relaxed">{video.excerpt}</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl h-fit">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">制作信息</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <User size={20} className="text-gray-500" />
                        <div>
                            <span className="block text-xs text-gray-500">导演</span>
                            <span className="font-medium">{video.videoMeta?.director || 'Unknown'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Building2 size={20} className="text-gray-500" />
                        <div>
                            <span className="block text-xs text-gray-500">出品</span>
                            <span className="font-medium">{video.videoMeta?.studio || 'Unknown'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

