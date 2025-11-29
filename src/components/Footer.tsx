import React from 'react';
import { Twitter, Send, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-happy text-2xl font-bold text-gray-800 block mb-2">翻斗花园</span>
            <p className="text-gray-500 text-sm max-w-xs">
              记录生活中的每一个快乐瞬间，像图图一样保持好奇心。
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <Send size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
              <Heart size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} 翻斗花园制片厂. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

