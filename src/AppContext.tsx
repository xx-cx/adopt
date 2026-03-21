import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Language, ThemeMode } from './types';
import { MOCK_USER } from './constants';
import { translations } from './translations';
import { supabase } from './lib/supabase';

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  isAdmin: boolean;
  t: (key: keyof typeof translations['zh']) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('pet_app_user');
    return saved ? JSON.parse(saved) : MOCK_USER;
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('pet_app_language');
    return (saved as Language) || MOCK_USER.settings.language;
  });
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('pet_app_theme');
    return (saved as ThemeMode) || MOCK_USER.settings.theme;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase.from('profiles').select('is_admin').eq('id', userId).single();
      if (data) {
        setIsAdmin(!!data.is_admin);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('pet_app_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pet_app_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('pet_app_theme', theme);
  }, [theme]);

  useEffect(() => {
    // Apply theme
    const root = window.document.documentElement;
    const applyTheme = (mode: ThemeMode) => {
      if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const t = (key: keyof typeof translations['zh']) => {
    return translations[language][key] || translations['zh'][key];
  };

  return (
    <AppContext.Provider value={{ user, setUser, language, setLanguage, theme, setTheme, isLoggedIn, setIsLoggedIn, isAdmin, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
