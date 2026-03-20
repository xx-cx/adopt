import React, { useRef, useState } from 'react';
import { Search, Bell, Heart, Flower2, Rabbit, ChevronRight, Users } from 'lucide-react';
import { PETS } from '../constants';
import { Pet } from '../types';
import { useAppContext } from '../AppContext';

interface HomeScreenProps {
  onPetClick: (pet: Pet) => void;
  favorites: string[];
  onToggleFavorite: (petId: string) => void;
  onNavigateToRescueCircle: () => void;
}

export default function HomeScreen({ onPetClick, favorites, onToggleFavorite, onNavigateToRescueCircle }: HomeScreenProps) {
  const { user, t } = useAppContext();
  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const [currentFeaturedPage, setCurrentFeaturedPage] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState('cats');

  const categories = [
    { id: 'cats', label: t('cats'), icon: Flower2, type: 'cat' },
    { id: 'dogs', label: t('dogs'), icon: Rabbit, type: 'dog' },
  ];

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);
  const nearbyPets = PETS.filter(p => {
    if (p.isFeatured) return false;
    return p.type === selectedCategory?.type;
  });

  const handleFeaturedScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newPage = Math.round(scrollLeft / width);
    if (newPage !== currentFeaturedPage) {
      setCurrentFeaturedPage(newPage);
    }
  };

  const scrollNextFeatured = () => {
    if (featuredScrollRef.current) {
      const featuredCount = PETS.filter(p => p.isFeatured).length;
      const maxPages = Math.min(featuredCount, 3);
      const nextPage = (currentFeaturedPage + 1) % maxPages;
      featuredScrollRef.current.scrollTo({
        left: nextPage * featuredScrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const featuredPets = PETS.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col bg-[#f8f6f6] dark:bg-[#211511] min-h-screen pb-24">
      {/* Header */}
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 z-20 bg-[#f8f6f6]/80 dark:bg-[#211511]/80 backdrop-blur-md">
        <div className="flex size-12 shrink-0 items-center">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#e26136]" 
            style={{ backgroundImage: `url("${user.avatarUrl}")` }}
          />
        </div>
        <div className="flex flex-col flex-1 px-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">{t('location')}</span>
          <h2 className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight tracking-tight">加利福尼亚州，旧金山</h2>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="relative flex size-10 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm">
            <Bell size={20} />
            <span className="absolute top-2 right-2 size-2 bg-[#e26136] rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="flex w-full h-14 items-stretch rounded-xl shadow-sm bg-white dark:bg-slate-800 overflow-hidden">
          <div className="text-slate-400 flex items-center justify-center pl-4">
            <Search size={20} />
          </div>
          <input 
            className="flex w-full min-w-0 flex-1 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-0 px-4 pl-2 text-base font-normal" 
            placeholder={t('searchPlaceholder')}
          />
        </div>
      </div>

      {/* Categories - Simplified Row */}
      <div className="px-4 py-4 flex gap-4 justify-between">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button 
              key={cat.id} 
              onClick={() => setSelectedCategoryId(cat.id)}
              className="flex flex-col items-center gap-2 flex-1 outline-none"
            >
              <div className={`flex size-16 items-center justify-center rounded-2xl shadow-lg transition-all active:scale-95 ${
                isSelected ? 'bg-[#e26136] text-white shadow-[#e26136]/20' : 'bg-white dark:bg-slate-800 text-[#e26136]'
              }`}>
                <Icon size={28} />
              </div>
              <h3 className={`text-xs font-bold whitespace-nowrap transition-colors ${isSelected ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                {cat.label}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Rescue Circle Entry */}
      <div className="px-4 py-2">
        <button 
          onClick={onNavigateToRescueCircle}
          className="w-full bg-gradient-to-r from-[#e26136] to-[#f27d26] rounded-3xl p-4 flex items-center justify-between shadow-lg shadow-[#e26136]/20 active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="size-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
              <Users size={32} />
            </div>
            <div className="text-left">
              <h3 className="text-white font-bold text-lg leading-tight">{t('rescueCircle')}</h3>
              <p className="text-white/80 text-xs mt-1">分享领养日记，救助流浪猫狗</p>
            </div>
          </div>
          <div className="size-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <ChevronRight size={24} />
          </div>
        </button>
      </div>

      {/* Featured Pets Carousel with Snap Scrolling and Arrow */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">{t('featuredPets')}</h2>
          <button className="text-[#e26136] text-sm font-semibold">{t('viewAll')}</button>
        </div>
        
        <div className="relative group/featured">
          <div 
            ref={featuredScrollRef}
            onScroll={handleFeaturedScroll}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
          >
            {featuredPets.map((pet) => (
              <div 
                key={pet.id} 
                onClick={() => onPetClick(pet)}
                className="min-w-full relative rounded-3xl overflow-hidden h-44 group cursor-pointer snap-center"
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${pet.imageUrl}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-white text-lg font-bold">{pet.name}</h3>
                    <p className="text-white/80 text-sm">{pet.breed} • {pet.age}</p>
                  </div>
                  <span className="bg-[#e26136] px-3 py-1 rounded-full text-white text-xs font-bold">
                    {pet.id === '1' ? '特别看护' : '新到访'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Semi-transparent Arrow for Featured Pets */}
          <button 
            onClick={scrollNextFeatured}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-10 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#e26136] shadow-md active:scale-90 transition-all border border-white/20"
          >
            <ChevronRight size={24} className={`transition-transform duration-300 ${currentFeaturedPage === featuredPets.length - 1 ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Page Indicators for Featured Pets */}
        <div className="flex justify-center gap-1.5 mt-2">
          {featuredPets.map((_, idx) => (
            <div key={idx} className={`size-1.5 rounded-full transition-all duration-300 ${idx === currentFeaturedPage ? 'bg-[#e26136] w-3' : 'bg-slate-300 dark:bg-slate-700'}`} />
          ))}
        </div>
      </div>

      {/* Main Feed */}
      <div className="px-4 py-6">
        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight mb-4">{t('nearbyPets')}</h2>
        <div className="grid grid-cols-2 gap-4">
          {nearbyPets.map((pet) => (
            <div 
              key={pet.id} 
              onClick={() => onPetClick(pet)}
              className="bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer"
            >
              <div className="relative mb-3">
                <div className="aspect-[4/5] rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url('${pet.imageUrl}')` }} />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(pet.id);
                  }}
                  className="absolute top-2 right-2 size-8 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#e26136]"
                >
                  <Heart size={16} fill={favorites.includes(pet.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 font-bold">{pet.name}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">{pet.breed} • {pet.age}</span>
                <span className="text-xs font-bold text-[#e26136]">{pet.gender === 'male' ? '公' : '母'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
