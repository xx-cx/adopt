import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Bell, Shield, Globe, Moon, HelpCircle, ChevronRight, LogOut, Camera, Check, Smartphone, Users, Plus, X } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { Language, ThemeMode, User as UserType } from '../types';
import { MOCK_USERS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsScreenProps {
  onBack: () => void;
}

type SettingsView = 'main' | 'profile' | 'notifications' | 'privacy' | 'language' | 'theme' | 'changePhone';

interface ProfileViewProps {
  user: UserType;
  setUser: (user: UserType) => void;
  onSave: () => void;
  t: (key: any) => string;
}

function ProfileView({ user, setUser, onSave, t }: ProfileViewProps) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [profession, setProfession] = useState(user.profession || '');
  const [avatar, setAvatar] = useState(user.avatarUrl);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const avatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsmr04JGL0YQWRZvcDhLgUoi4N77MhoIKSZpjKa5jUjhNyOHuVti-MKw0nag-sfHOW-cVQk-X-nc6Ol7YjTJQZUbDL4ef-k52Ln7Lwr4CMzyL2xsh2otJids1yuWlhwLsgq4_7jLlR2G-FrKJCx7CA9pDPIsaZYPOVV6yndxcpQE0mtFU0-3jOyvsZuPRbhnjdea3JyPUK4uxd-coDZCVPh5rXRO96YRduRzPsB0hdF4WdE_ksD3ue5GY0Xn31VcqdZoNeRGRmK5c',
    'https://picsum.photos/seed/user1/200/200',
    'https://picsum.photos/seed/user2/200/200',
    'https://picsum.photos/seed/user3/200/200',
    'https://picsum.photos/seed/user4/200/200',
    'https://picsum.photos/seed/user5/200/200',
  ];

  const handleSave = () => {
    setUser({ ...user, name, phone, profession, avatarUrl: avatar });
    onSave();
  };

  return (
    <div className="flex-1 p-4 space-y-6 overflow-y-auto">
      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <div className="size-24 rounded-full border-4 border-[#e26136]/20 p-1">
            <div 
              className="w-full h-full rounded-full bg-center bg-cover" 
              style={{ backgroundImage: `url('${avatar}')` }}
            />
          </div>
          <button 
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="absolute bottom-0 right-0 bg-[#e26136] text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-900"
          >
            <Camera size={16} />
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-400">{t('avatar')}</p>
        
        {showAvatarPicker && (
          <div className="mt-4 grid grid-cols-3 gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl animate-in fade-in zoom-in duration-200">
            {avatars.map((url, i) => (
              <button 
                key={i}
                onClick={() => {
                  setAvatar(url);
                  setShowAvatarPicker(false);
                }}
                className={`size-16 rounded-full bg-center bg-cover border-2 transition-all ${avatar === url ? 'border-[#e26136] scale-110' : 'border-transparent hover:border-slate-200'}`}
                style={{ backgroundImage: `url('${url}')` }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase px-2">{t('nickname')}</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e26136] text-slate-700 dark:text-slate-200 font-semibold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase px-2">{t('phone')}</label>
          <input 
            type="text" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e26136] text-slate-700 dark:text-slate-200 font-semibold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase px-2">{t('profession')}</label>
          <input 
            type="text" 
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e26136] text-slate-700 dark:text-slate-200 font-semibold"
            placeholder={t('profession')}
          />
        </div>
      </div>

      <button 
        onClick={handleSave}
        className="w-full p-4 mt-8 rounded-2xl bg-[#e26136] text-white font-bold shadow-lg shadow-[#e26136]/20 active:scale-95 transition-transform"
      >
        {t('save')}
      </button>
    </div>
  );
}

interface ChangePhoneViewProps {
  user: UserType;
  setUser: (user: UserType) => void;
  onSuccess: () => void;
  t: (key: any) => string;
}

function ChangePhoneView({ user, setUser, onSuccess, t }: ChangePhoneViewProps) {
  const [newPhone, setNewPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendCode = () => {
    if (!newPhone) return;
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setCountdown(60);
    }, 1000);
  };

  const handleConfirm = () => {
    if (!newPhone || !code) return;
    setUser({ ...user, phone: newPhone });
    onSuccess();
  };

  return (
    <div className="flex-1 p-4 space-y-6 overflow-y-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase px-2">{t('newPhone')}</label>
          <input 
            type="tel" 
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder={t('enterNewPhone')}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e26136] text-slate-700 dark:text-slate-200 font-semibold"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase px-2">{t('verificationCode')}</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t('enterCode')}
              className="flex-1 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e26136] text-slate-700 dark:text-slate-200 font-semibold"
            />
            <button 
              onClick={handleSendCode}
              disabled={countdown > 0 || isSending || !newPhone}
              className={`px-4 rounded-2xl font-bold text-sm transition-colors ${
                countdown > 0 || isSending || !newPhone
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-[#e26136]/10 text-[#e26136] hover:bg-[#e26136]/20'
              }`}
            >
              {countdown > 0 ? `${countdown}s` : isSending ? '...' : t('sendCode')}
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={handleConfirm}
        disabled={!newPhone || !code}
        className={`w-full p-4 mt-8 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
          !newPhone || !code
            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            : 'bg-[#e26136] text-white shadow-[#e26136]/20'
        }`}
      >
        {t('confirmChange')}
      </button>
    </div>
  );
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const { user, setUser, language, setLanguage, theme, setTheme, t } = useAppContext();
  const [currentSubView, setCurrentSubView] = useState<SettingsView>('main');
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleBack = () => {
    if (currentSubView === 'main') {
      onBack();
    } else {
      setCurrentSubView('main');
    }
  };

  const renderMain = () => {
    const sections = [
      {
        title: t('accountSettings'),
        items: [
          { icon: User, label: t('profile'), color: 'text-blue-500', bg: 'bg-blue-50', view: 'profile' },
          { icon: Bell, label: t('notifications'), color: 'text-amber-500', bg: 'bg-amber-50', view: 'notifications' },
          { icon: Shield, label: t('privacy'), color: 'text-emerald-500', bg: 'bg-emerald-50', view: 'privacy' },
        ]
      },
      {
        title: t('generalSettings'),
        items: [
          { icon: Globe, label: t('language'), color: 'text-indigo-500', bg: 'bg-indigo-50', view: 'language', value: t(language === 'zh' ? 'chinese' : language === 'en' ? 'english' : 'japanese') },
          { icon: Moon, label: t('theme'), color: 'text-purple-500', bg: 'bg-purple-50', view: 'theme', value: t(theme) },
          { icon: HelpCircle, label: t('help'), color: 'text-slate-500', bg: 'bg-slate-50', view: 'main' },
        ]
      }
    ];

    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              {section.title}
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              {section.items.map((item, itemIdx) => (
                <button 
                  key={itemIdx}
                  onClick={() => item.view !== 'main' && setCurrentSubView(item.view as SettingsView)}
                  className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group ${
                    itemIdx !== section.items.length - 1 ? 'border-b border-slate-50 dark:border-slate-800/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${item.bg} dark:bg-slate-800`}>
                      <item.icon size={20} className={item.color} />
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className="text-sm text-slate-400">{item.value}</span>
                    )}
                    <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-3 mt-4">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/20 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors shadow-sm"
          >
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </button>
          <button 
            onClick={() => setShowSwitchModal(true)}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Users size={20} />
            <span>{t('switchAccount')}</span>
          </button>
        </div>

        <div className="text-center py-8">
          <p className="text-xs text-slate-400">版本 1.2.5 (20260320)</p>
        </div>
      </div>
    );
  };

  const renderNotifications = () => {
    return (
      <div className="flex-1 p-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-slate-800">
                <Bell size={20} className="text-amber-500" />
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{t('notifications')}</span>
            </div>
            <button 
              onClick={() => setUser({ ...user, settings: { ...user.settings, notifications: !user.settings.notifications } })}
              className={`w-12 h-6 rounded-full transition-colors relative ${user.settings.notifications ? 'bg-[#e26136]' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${user.settings.notifications ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPrivacy = () => {
    const devices = [
      { name: 'iPhone 15 Pro', lastLogin: '2026-03-20 10:30', current: true },
      { name: 'MacBook Air', lastLogin: '2026-03-19 14:20', current: false },
      { name: 'iPad Pro', lastLogin: '2026-03-15 09:15', current: false },
    ];

    return (
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div className="space-y-3">
          <h2 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('phoneBinding')}</h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <button 
              onClick={() => setCurrentSubView('changePhone')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-slate-800">
                  <Smartphone size={20} className="text-emerald-500" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{t('changePhone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">{user.phone || t('notBound')}</span>
                <ChevronRight size={18} className="text-slate-300" />
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('deviceManagement')}</h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            {devices.map((device, i) => (
              <div key={i} className={`p-4 flex items-center justify-between ${i !== devices.length - 1 ? 'border-b border-slate-50 dark:border-slate-800/50' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <Smartphone size={20} className="text-slate-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{device.name}</span>
                      {device.current && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                          {t('currentDevice')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{t('lastLogin')}: {device.lastLogin}</p>
                  </div>
                </div>
                {!device.current && (
                  <button className="text-xs font-bold text-red-500 hover:text-red-600 p-2">
                    {t('logout')}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLanguage = () => {
    const langs: { id: Language; label: string }[] = [
      { id: 'zh', label: t('chinese') },
      { id: 'en', label: t('english') },
      { id: 'ja', label: t('japanese') },
    ];

    return (
      <div className="flex-1 p-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
          {langs.map((lang, idx) => (
            <button 
              key={lang.id}
              onClick={() => {
                setLanguage(lang.id);
                setUser({ ...user, settings: { ...user.settings, language: lang.id } });
              }}
              className={`w-full flex items-center justify-between p-4 ${idx !== langs.length - 1 ? 'border-b border-slate-50 dark:border-slate-800/50' : ''}`}
            >
              <span className={`font-semibold ${language === lang.id ? 'text-[#e26136]' : 'text-slate-700 dark:text-slate-200'}`}>{lang.label}</span>
              {language === lang.id && <Check size={20} className="text-[#e26136]" />}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTheme = () => {
    const modes: { id: ThemeMode; label: string; icon: typeof Moon }[] = [
      { id: 'light', label: t('light'), icon: Globe },
      { id: 'dark', label: t('dark'), icon: Moon },
      { id: 'system', label: t('system'), icon: Smartphone },
    ];

    return (
      <div className="flex-1 p-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
          {modes.map((mode, idx) => (
            <button 
              key={mode.id}
              onClick={() => {
                setTheme(mode.id);
                setUser({ ...user, settings: { ...user.settings, theme: mode.id } });
              }}
              className={`w-full flex items-center justify-between p-4 ${idx !== modes.length - 1 ? 'border-b border-slate-50 dark:border-slate-800/50' : ''}`}
            >
              <div className="flex items-center gap-3">
                <mode.icon size={20} className={theme === mode.id ? 'text-[#e26136]' : 'text-slate-400'} />
                <span className={`font-semibold ${theme === mode.id ? 'text-[#e26136]' : 'text-slate-700 dark:text-slate-200'}`}>{mode.label}</span>
              </div>
              {theme === mode.id && <Check size={20} className="text-[#e26136]" />}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const getTitle = () => {
    switch (currentSubView) {
      case 'profile': return t('profile');
      case 'notifications': return t('notifications');
      case 'privacy': return t('privacy');
      case 'language': return t('language');
      case 'theme': return t('theme');
      case 'changePhone': return t('changePhone');
      default: return t('settings');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="flex items-center px-4 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <button 
          onClick={handleBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors mr-2"
        >
          <ArrowLeft size={24} className="text-slate-700 dark:text-slate-300" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{getTitle()}</h1>
      </header>

      {currentSubView === 'main' && renderMain()}
      {currentSubView === 'profile' && (
        <ProfileView 
          user={user} 
          setUser={setUser} 
          onSave={() => setCurrentSubView('main')} 
          t={t} 
        />
      )}
      {currentSubView === 'notifications' && renderNotifications()}
      {currentSubView === 'privacy' && renderPrivacy()}
      {currentSubView === 'language' && renderLanguage()}
      {currentSubView === 'theme' && renderTheme()}
      {currentSubView === 'changePhone' && (
        <ChangePhoneView 
          user={user} 
          setUser={setUser} 
          onSuccess={() => setCurrentSubView('privacy')} 
          t={t} 
        />
      )}

      {/* Switch Account Modal */}
      <AnimatePresence>
        {showSwitchModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSwitchModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('switchAccountTitle')}</h3>
                  <button onClick={() => setShowSwitchModal(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {MOCK_USERS.map((u, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        setUser(u);
                        setLanguage(u.settings.language);
                        setTheme(u.settings.theme);
                        setShowSwitchModal(false);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${user.phone === u.phone ? 'border-[#e26136] bg-[#e26136]/5' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={u.avatarUrl} alt={u.name} className="size-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <div className="text-left">
                          <p className="font-bold text-slate-900 dark:text-slate-100">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.phone}</p>
                        </div>
                      </div>
                      {user.phone === u.phone && <Check size={20} className="text-[#e26136]" />}
                    </button>
                  ))}
                  
                  <button className="w-full flex items-center gap-3 p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:text-[#e26136] hover:border-[#e26136] transition-all group">
                    <div className="size-10 rounded-full border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-[#e26136]">
                      <Plus size={20} />
                    </div>
                    <span className="font-bold">{t('addAccount')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xs bg-white dark:bg-slate-900 rounded-3xl p-6 text-center shadow-2xl"
            >
              <div className="size-16 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center mx-auto mb-4">
                <LogOut size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{t('logout')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t('confirmLogout')}</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button 
                  onClick={() => {
                    // In a real app, this would clear tokens etc.
                    setShowLogoutConfirm(false);
                    onBack();
                  }}
                  className="p-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  {t('logout')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
