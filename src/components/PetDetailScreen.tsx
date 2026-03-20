import React from 'react';
import { ArrowLeft, Share2, Heart, MapPin, MessageCircle, CheckCircle, Home, Clock, History } from 'lucide-react';
import { Pet } from '../types';

interface PetDetailScreenProps {
  pet: Pet;
  onBack: () => void;
  onApply: () => void;
  onMessage: () => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export default function PetDetailScreen({ pet, onBack, onApply, onMessage, isFavorited, onToggleFavorite }: PetDetailScreenProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#211911] overflow-x-hidden pb-32">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.5) 100%), url("${pet.imageUrl}")` 
          }}
        />
        <div className="flex items-center p-4 justify-between relative z-10">
          <button 
            onClick={onBack}
            className="bg-white/20 backdrop-blur-md text-white rounded-full p-2 hover:bg-white/40 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <button className="bg-white/20 backdrop-blur-md text-white rounded-full p-2 hover:bg-white/40 transition-colors">
            <Share2 size={24} />
          </button>
        </div>
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          <div className="size-1.5 rounded-full bg-white"></div>
          <div className="size-1.5 rounded-full bg-white opacity-50"></div>
          <div className="size-1.5 rounded-full bg-white opacity-50"></div>
          <div className="size-1.5 rounded-full bg-white opacity-50"></div>
        </div>
      </div>

      {/* Content Body */}
      <div className="px-6 -mt-8 relative z-10 bg-white dark:bg-[#211911] rounded-t-[32px] pt-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{pet.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-[#e38736]">
              <MapPin size={14} />
              <span className="text-sm font-medium">{pet.location}</span>
            </div>
          </div>
          <button 
            onClick={onToggleFavorite}
            className={`p-3 rounded-full transition-colors ${
              isFavorited ? 'bg-[#e38736] text-white shadow-lg shadow-[#e38736]/30' : 'bg-[#e38736]/10 text-[#e38736]'
            }`}
          >
            <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-[#f8f7f6] dark:bg-[#e38736]/10 p-3 rounded-2xl flex flex-col items-center">
            <span className="text-[#e38736] font-bold text-sm">年龄</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">{pet.age}</span>
          </div>
          <div className="bg-[#f8f7f6] dark:bg-[#e38736]/10 p-3 rounded-2xl flex flex-col items-center">
            <span className="text-[#e38736] font-bold text-sm">性别</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">{pet.gender === 'male' ? '雄性' : '雌性'}</span>
          </div>
          <div className="bg-[#f8f7f6] dark:bg-[#e38736]/10 p-3 rounded-2xl flex flex-col items-center">
            <span className="text-[#e38736] font-bold text-sm">体重</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">{pet.weight || '未知'}</span>
          </div>
        </div>

        {/* Personality Section */}
        {pet.personality && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">性格 (Personality)</h3>
            <div className="flex flex-wrap gap-2">
              {pet.personality.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-[#e38736]/10 text-[#e38736] font-medium rounded-xl text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Shelter Info */}
        <div className="flex items-center justify-between p-4 border border-[#e38736]/20 rounded-2xl mb-8">
          <div className="flex items-center gap-3">
            <div 
              className="h-12 w-12 rounded-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu7mRi06Ew5X_p9nxxdHWMHlKKSat7jl4cMmVeBYYOaiFaJYNfBXJCYxR5FL0B14B3fV2EBE9nGCH8tYhjGsnyp7kXpmWD4tVa5Jl1lIfzQrvN9acB_rp9Rl5ofOqJ_vCodtazYJM998FO9l0Fzxy0OhU4s9w4muDmCgyvdVbFwOXw9enMDcWq9JO8yNFQNxcgKLaCTEG4Tojr6UofMaCbaAgqdltWfZ2d3CAz7D_-rbjLXW_iEwbioa-D0r9INcHEL3KXu5Sazi4')" }}
            />
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">爪爪救助之家</p>
              <p className="text-sm text-slate-500">救助机构</p>
            </div>
          </div>
          <button 
            onClick={onMessage}
            className="bg-[#e38736] p-2 text-white rounded-xl hover:bg-[#e38736]/90 transition-colors"
          >
            <MessageCircle size={20} />
          </button>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">关于 {pet.name}</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {pet.about || '暂无详细介绍。'}
          </p>
        </div>

        {/* Health Status */}
        {pet.healthStatus && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">健康状况</h3>
            <div className="flex flex-wrap gap-2">
              {pet.healthStatus.map((status) => (
                <div key={status} className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-medium">
                  <CheckCircle size={14} /> {status}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Adoption Requirements */}
        {pet.requirements && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">领养要求</h3>
            <ul className="space-y-3">
              {pet.requirements.map((req, idx) => {
                const Icon = idx === 0 ? Home : idx === 1 ? Clock : History;
                return (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <Icon size={20} className="text-[#e38736] shrink-0" />
                    <span>{req}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-[#211911]/80 backdrop-blur-lg border-t border-[#e38736]/10 p-4 pb-8 flex gap-4 z-20">
        <button 
          onClick={onApply}
          className="flex-1 bg-[#e38736] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#e38736]/30 hover:bg-[#e38736]/90 transition-all flex items-center justify-center gap-2"
        >
          <PawPrint size={20} />
          立即申请领养
        </button>
      </div>
    </div>
  );
}

const PawPrint = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    <path d="M16.5 15.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    <path d="M7.5 15.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    <path d="M19.5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    <path d="M4.5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    <path d="M12 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);
