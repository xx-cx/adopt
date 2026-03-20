/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HomeScreen from './components/HomeScreen';
import PetDetailScreen from './components/PetDetailScreen';
import ApplicationForm from './components/ApplicationForm';
import ProfileScreen from './components/ProfileScreen';
import AddPetScreen from './components/AddPetScreen';
import ChatScreen from './components/ChatScreen';
import SettingsScreen from './components/SettingsScreen';
import RescueCircleScreen from './components/RescueCircleScreen';
import CreatePostScreen from './components/CreatePostScreen';
import LoginScreen from './components/LoginScreen';
import BottomNav from './components/BottomNav';
import { Pet, Chat } from './types';
import { PETS, MOCK_CHATS } from './constants';
import { Heart, CheckCircle2, MessageSquare, Search } from 'lucide-react';

type View = 'home' | 'favorites' | 'messages' | 'profile' | 'pet-detail' | 'apply' | 'add-pet' | 'chat' | 'settings' | 'rescue-circle' | 'create-post' | 'login';

import { AppProvider } from './AppContext';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const toggleFavorite = (petId: string) => {
    const isFavorited = favorites.includes(petId);
    if (isFavorited) {
      setFavorites(favorites.filter(id => id !== petId));
    } else {
      setFavorites([...favorites, petId]);
      showToast('收藏成功！');
    }
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 2000);
  };

  const handlePetClick = (pet: Pet) => {
    setSelectedPet(pet);
    setCurrentView('pet-detail');
  };

  const handleApply = () => {
    setCurrentView('apply');
  };

  const handleMessage = (petId: string) => {
    // Find existing chat or create a mock one
    const existingChat = MOCK_CHATS.find(c => c.petId === petId);
    if (existingChat) {
      setSelectedChat(existingChat);
    } else {
      // Create a dummy chat for demo purposes if not found
      const pet = PETS.find(p => p.id === petId);
      if (pet) {
        setSelectedChat({
          id: `chat-${petId}`,
          petId: pet.id,
          petName: pet.name,
          petImageUrl: pet.imageUrl,
          rescuerName: '爪爪救助之家',
          rescuerAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu7mRi06Ew5X_p9nxxdHWMHlKKSat7jl4cMmVeBYYOaiFaJYNfBXJCYxR5FL0B14B3fV2EBE9nGCH8tYhjGsnyp7kXpmWD4tVa5Jl1lIfzQrvN9acB_rp9Rl5ofOqJ_vCodtazYJM998FO9l0Fzxy0OhU4s9w4muDmCgyvdVbFwOXw9enMDcWq9JO8yNFQNxcgKLaCTEG4Tojr6UofMaCbaAgqdltWfZ2d3CAz7D_-rbjLXW_iEwbioa-D0r9INcHEL3KXu5Sazi4',
          lastMessage: '你好！我想了解一下这只宠物。',
          lastMessageTime: '刚刚',
          messages: [
            { id: 'm1', senderId: 'user', text: '你好！我想了解一下这只宠物。', timestamp: '刚刚' }
          ]
        });
      }
    }
    setCurrentView('chat');
  };

  const handleBack = () => {
    if (currentView === 'apply' || currentView === 'chat') {
      setCurrentView('pet-detail');
    } else if (currentView === 'add-pet' || currentView === 'rescue-circle') {
      setCurrentView('home');
    } else if (currentView === 'create-post') {
      setCurrentView('rescue-circle');
    } else if (currentView === 'login') {
      setCurrentView('profile');
    } else {
      setCurrentView('home');
      setSelectedPet(null);
    }
  };

  const handleTabChange = (tab: string) => {
    setCurrentView(tab as View);
    setSelectedPet(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeScreen 
          onPetClick={handlePetClick} 
          favorites={favorites} 
          onToggleFavorite={toggleFavorite} 
          onNavigateToRescueCircle={() => setCurrentView('rescue-circle')}
        />;
      case 'pet-detail':
        return selectedPet ? (
          <PetDetailScreen 
            pet={selectedPet} 
            onBack={handleBack} 
            onApply={handleApply} 
            onMessage={() => handleMessage(selectedPet.id)}
            isFavorited={favorites.includes(selectedPet.id)}
            onToggleFavorite={() => toggleFavorite(selectedPet.id)}
          />
        ) : <HomeScreen 
          onPetClick={handlePetClick} 
          favorites={favorites} 
          onToggleFavorite={toggleFavorite} 
          onNavigateToRescueCircle={() => setCurrentView('rescue-circle')}
        />;
      case 'apply':
        return <ApplicationForm onBack={handleBack} onSubmit={() => {
          setCurrentView('home');
          setSelectedPet(null);
        }} />;
      case 'add-pet':
        return <AddPetScreen onBack={handleBack} onSuccess={() => setCurrentView('home')} />;
      case 'profile':
        return <ProfileScreen onNavigate={(view) => setCurrentView(view as View)} favoritesCount={favorites.length} />;
      case 'favorites':
        const favoritedPets = PETS.filter(p => favorites.includes(p.id));
        return (
          <div className="flex flex-col min-h-screen bg-[#f8f6f6] dark:bg-[#211511] pb-24">
            <header className="p-4 pt-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">我的收藏</h2>
            </header>
            
            {favoritedPets.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 p-4">
                {favoritedPets.map((pet) => (
                  <div 
                    key={pet.id} 
                    onClick={() => handlePetClick(pet)}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer"
                  >
                    <div className="relative mb-3">
                      <div className="aspect-[4/5] rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url('${pet.imageUrl}')` }} />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(pet.id);
                        }}
                        className="absolute top-2 right-2 size-8 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#e26136]"
                      >
                        <Heart size={16} fill="currentColor" />
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
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4">
                  <Heart size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">暂无收藏</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">快去首页看看有没有心仪的小伙伴吧！</p>
                <button 
                  onClick={() => setCurrentView('home')}
                  className="bg-[#e26136] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-[#e26136]/20"
                >
                  去逛逛
                </button>
              </div>
            )}
          </div>
        );
      case 'messages':
        return (
          <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 pb-24">
            <header className="p-6 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">消息</h2>
                <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <Search size={20} />
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="size-14 rounded-full border-2 border-[#e26136] p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url('${MOCK_CHATS[0].rescuerAvatarUrl}')` }} />
                  </div>
                  <span className="text-[10px] font-bold">救助站</span>
                </div>
                {MOCK_CHATS.map(chat => (
                  <div key={chat.id} className="flex flex-col items-center gap-1 shrink-0">
                    <div className="size-14 rounded-full border-2 border-slate-100 dark:border-slate-800 p-0.5">
                      <div className="w-full h-full rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url('${chat.petImageUrl}')` }} />
                    </div>
                    <span className="text-[10px] font-bold">{chat.petName}</span>
                  </div>
                ))}
              </div>
            </header>

            <div className="flex-1 overflow-y-auto">
              {MOCK_CHATS.map(chat => (
                <div 
                  key={chat.id} 
                  onClick={() => {
                    setSelectedChat(chat);
                    setCurrentView('chat');
                  }}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border-b border-slate-50 dark:border-slate-800/50"
                >
                  <div className="relative">
                    <div 
                      className="size-14 rounded-2xl bg-cover bg-center" 
                      style={{ backgroundImage: `url('${chat.rescuerAvatarUrl}')` }}
                    />
                    <div className="absolute -bottom-1 -right-1 size-6 rounded-lg border-2 border-white dark:border-slate-900 bg-cover bg-center" style={{ backgroundImage: `url('${chat.petImageUrl}')` }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">{chat.rescuerName}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">{chat.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'chat':
        return selectedChat ? (
          <ChatScreen chat={selectedChat} onBack={handleBack} />
        ) : <HomeScreen 
          onPetClick={handlePetClick} 
          favorites={favorites} 
          onToggleFavorite={toggleFavorite} 
          onNavigateToRescueCircle={() => setCurrentView('rescue-circle')}
        />;
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentView('profile')} />;
      case 'rescue-circle':
        return <RescueCircleScreen onBack={handleBack} onCreatePost={() => setCurrentView('create-post')} />;
      case 'create-post':
        return <CreatePostScreen onBack={handleBack} onSuccess={() => {
          showToast('发布成功！');
          setCurrentView('rescue-circle');
        }} />;
      case 'login':
        return <LoginScreen 
          onBack={handleBack} 
          onSuccess={() => {
            showToast('登录记录已更新！');
            setCurrentView('profile');
          }} 
        />;
      default:
        return <HomeScreen 
          onPetClick={handlePetClick} 
          favorites={favorites} 
          onToggleFavorite={toggleFavorite} 
          onNavigateToRescueCircle={() => setCurrentView('rescue-circle')}
        />;
    }
  };

  const showBottomNav = ['home', 'favorites', 'messages', 'profile'].includes(currentView);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 font-sans">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen relative shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (selectedPet?.id || '')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>

        {showBottomNav && (
          <BottomNav activeTab={currentView} onTabChange={handleTabChange} />
        )}

        {/* Toast Notification */}
        <AnimatePresence>
          {toast.visible && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 20 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
            >
              <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl px-6 py-3 flex items-center gap-3 border border-emerald-500/20">
                <div className="size-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{toast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
