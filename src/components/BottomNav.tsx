import React from 'react';
import { Home, Heart, MessageCircle, User, Plus } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'favorites', label: '收藏', icon: Heart },
    { id: 'add-pet', label: '', icon: Plus, isAction: true },
    { id: 'messages', label: '消息', icon: MessageCircle },
    { id: 'profile', label: '个人中心', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-3 flex justify-between items-center z-30">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        if (tab.isAction) {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative -top-6 size-14 bg-[#e26136] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#e26136]/30 active:scale-90 transition-transform border-4 border-white dark:border-slate-900"
            >
              <Icon size={28} />
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-[#e26136]' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <Icon size={24} fill={isActive ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
