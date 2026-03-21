import React from 'react';
import { ArrowLeft, Settings, Edit2, Heart, Bell, LogOut, ChevronRight, User as UserIcon } from 'lucide-react';
import { PETS } from '../constants';
import { useAppContext } from '../AppContext';
import { supabase } from '../lib/supabase';

interface ProfileScreenProps {
  onNavigate: (view: string) => void;
  favoritesCount: number;
}

export default function ProfileScreen({ onNavigate, favoritesCount }: ProfileScreenProps) {
  const { user, t, isLoggedIn, isAdmin } = useAppContext();
  const applications = PETS.filter(p => p.status);

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen flex flex-col shadow-xl items-center justify-center p-6 text-center">
        <div className="size-24 bg-[#e26136]/10 rounded-full flex items-center justify-center mb-6">
          <UserIcon size={48} className="text-[#e26136]" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">欢迎来到爪爪救助</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-12">登录以查看您的领养申请、个人信息、收藏和消息</p>
        
        <button 
          onClick={() => onNavigate('login')}
          className="w-full bg-[#e26136] hover:bg-[#e26136]/90 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#e26136]/20 mb-4"
        >
          登录 / 注册
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen flex flex-col shadow-xl pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
        <button 
          onClick={() => onNavigate('home')}
          className="p-2 hover:bg-[#e26136]/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-700 dark:text-slate-300" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t('personalProfile')}</h1>
        <button 
          onClick={() => onNavigate('settings')}
          className="p-2 hover:bg-[#e26136]/10 rounded-full transition-colors"
        >
          <Settings size={24} className="text-slate-700 dark:text-slate-300" />
        </button>
      </header>

      {/* Profile Section */}
      <div className="px-6 py-6 flex flex-col items-center">
        <div className="relative">
          <div className="size-32 rounded-full border-4 border-[#e26136]/20 p-1">
            <div 
              className="w-full h-full rounded-full bg-center bg-cover" 
              style={{ backgroundImage: `url('${user.avatarUrl}')` }}
            />
          </div>
          <button 
            onClick={() => onNavigate('settings')}
            className="absolute bottom-1 right-1 bg-[#e26136] text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-900"
          >
            <Edit2 size={14} />
          </button>
        </div>
        <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-slate-100">{user.name}</h2>
        {user.profession && (
          <p className="text-[#e26136] font-bold text-sm mt-1">{user.profession}</p>
        )}
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{t('joinDate')} {user.joinDate}</p>
      </div>

      {/* Stats Row */}
      <div className="flex px-6 gap-3 mb-8">
        <div className="flex-1 bg-[#e26136]/5 dark:bg-[#e26136]/10 p-4 rounded-xl flex flex-col items-center border border-[#e26136]/10">
          <span className="text-xl font-bold text-[#e26136]">{user.stats.applied}</span>
          <span className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold">{t('applied')}</span>
        </div>
        <div 
          onClick={() => onNavigate('favorites')}
          className="flex-1 bg-[#e26136]/5 dark:bg-[#e26136]/10 p-4 rounded-xl flex flex-col items-center border border-[#e26136]/10 cursor-pointer active:scale-95 transition-transform"
        >
          <span className="text-xl font-bold text-[#e26136]">{favoritesCount}</span>
          <span className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold">{t('favorites')}</span>
        </div>
        <div className="flex-1 bg-[#e26136]/5 dark:bg-[#e26136]/10 p-4 rounded-xl flex flex-col items-center border border-[#e26136]/10">
          <span className="text-xl font-bold text-[#e26136]">{user.stats.guides}</span>
          <span className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold">{t('guides')}</span>
        </div>
      </div>

      {isAdmin && (
        <div className="px-6 mb-8 mt-[-10px]">
          <button 
            onClick={() => onNavigate('admin')}
            className="w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-black/10 flex items-center justify-center gap-2"
          >
            <Settings size={20} /> 进入超级管理后台
          </button>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="px-6 flex-1 space-y-8">
        {/* My Applications */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t('myApplications')}</h3>
            <button className="text-[#e26136] text-sm font-bold">{t('viewAll')}</button>
          </div>
          <div className="space-y-3">
            {applications.map((pet) => (
              <div key={pet.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div 
                  className="size-16 rounded-lg bg-cover bg-center" 
                  style={{ backgroundImage: `url('${pet.imageUrl}')` }}
                />
                <div className="flex-1">
                  <h4 className="font-bold">{pet.name}</h4>
                  <p className="text-sm text-slate-500">{pet.breed} • {pet.age}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  pet.status === 'pending' 
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {pet.status === 'pending' ? '审核中' : '已通过'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Adoption Resources */}
        <section>
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">{t('adoptionResources')}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-2 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu5tIxKwYi36r3QZaVXQy4Xlwir8sBRWCjoaiYwN00A4dcPVurkX-Tn2UU4lbC9IB2HwQ-jk-kOjSdTkJF16850Wu2pV_sZncPRZVCw4YLqtlU04SUa8hW7eYoiMM37N9jhSisTvzqaY-e1b2C7Bj1QDn7vRIeKN7AjNWNE5QUj1yiT4fUS1uy9DiWbvQLS_rUtkLpAES1F83DxgS0Lphzg5oqwHgSCsMUpOs0_zN80EEfe3wpYKUcwbdapSLa8JSpdc3vY3T19KQ" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm font-bold leading-snug">第一周：犬类护理必备知识</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-2 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD82o0rf36oWu2zffzJvEDDT2tHypDL68jbDHkEmKXx9CWn7avOqMShddxnoX39BBc2lauZxI2G4t_OD0IGLrtUw3xagWeslR4Tjy6NPicy72Vr3gZ7Tw9nKkwOUkShzNCRM2PjvOGB4-KNaY8LwuCKZshAClChKVmvhwspvMX-E-oZAOu9h8KjWXzkCPbS9wGu-2MlULwPh61adJSsCLrGgYL64_sTjHgUd1fzEWBz1zQjk9ijURTUKJ6wMC6a690dEdsoBkyV8UE" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm font-bold leading-snug">公寓猫咪安全指南</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-2">
          <button 
            onClick={() => onNavigate('favorites')}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Heart size={20} className="text-[#e26136]" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">{t('favorites')}</span>
            </div>
            <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-[#e26136]" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">{t('messages')}</span>
            </div>
            <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group text-red-500"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              <span className="font-semibold">{t('logout')}</span>
            </div>
          </button>
        </section>
      </main>
    </div>
  );
}
