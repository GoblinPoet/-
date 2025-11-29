import React from 'react';
import { cn } from '@/lib/utils'; // We need to create this utility first
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

// Since we don't have the utility yet, I'll create it inline or separately.
// Let's create src/lib/utils.ts first.

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: '全部', href: '/' },
    { label: '漫画', href: '/category/comic' },
    { label: '视频', href: '/category/video' },
    { label: '产品', href: '/category/product' },
    { label: '杂谈', href: '/category/article' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-tutu-yellow rounded-full flex items-center justify-center border-2 border-gray-800 shadow-sm">
                <span className="text-lg">👦</span>
              </div>
              <span className="font-happy text-xl font-bold text-gray-800 tracking-wider">翻斗花园</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.label}
                href={item.href} 
                className="text-gray-600 hover:text-tutu-red font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tutu-red transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-tutu-yellow transition-colors rounded-full hover:bg-gray-50">
              <Search size={20} />
            </button>
            <button className="bg-gray-800 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-gray-700 transition-transform hover:scale-105 active:scale-95 shadow-lg">
              订阅更新
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-tutu-red hover:bg-orange-50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

