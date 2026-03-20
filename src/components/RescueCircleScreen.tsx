import React, { useState } from 'react';
import { ArrowLeft, Plus, Heart, MessageSquare, Share2, MapPin, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../AppContext';
import { MOCK_POSTS } from '../constants';
import { Post } from '../types';

interface RescueCircleScreenProps {
  onBack: () => void;
  onCreatePost: () => void;
}

export default function RescueCircleScreen({ onBack, onCreatePost }: RescueCircleScreenProps) {
  const { t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'all' | 'diary' | 'stray'>('all');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    return post.type === activeTab;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-slate-700 dark:text-slate-300" />
            </button>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('rescueCircle')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
              <Search size={20} />
            </button>
            <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: 'all', label: t('allPosts') },
            { id: 'diary', label: t('diary') },
            { id: 'stray', label: t('strayPet') }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#e26136] text-white shadow-lg shadow-[#e26136]/20' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Posts Feed */}
      <div className="flex-1 p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-800"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="size-10 rounded-full bg-cover bg-center border border-slate-100 dark:border-slate-800" 
                    style={{ backgroundImage: `url('${post.userAvatar}')` }}
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{post.userName}</h4>
                    <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                  post.type === 'diary' 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500' 
                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-500'
                }`}>
                  {post.type === 'diary' ? t('diary') : t('strayPet')}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                {post.content}
              </p>

              {/* Post Images */}
              {post.images.length > 0 && (
                <div className="mb-3 rounded-2xl overflow-hidden">
                  <div 
                    className="aspect-video bg-cover bg-center" 
                    style={{ backgroundImage: `url('${post.images[0]}')` }}
                  />
                </div>
              )}

              {/* Location if stray */}
              {post.type === 'stray' && post.location && (
                <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-3">
                  <MapPin size={12} />
                  <span>{post.location}</span>
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800/50">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-[#e26136] transition-colors">
                    <Heart size={18} />
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">
                    <MessageSquare size={18} />
                    <span className="text-xs font-bold">{post.comments}</span>
                  </button>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onCreatePost}
        className="fixed bottom-28 right-6 size-14 bg-[#e26136] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#e26136]/30 active:scale-90 transition-transform z-30"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
