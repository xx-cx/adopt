export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'male' | 'female';
  type: 'cat' | 'dog' | 'rabbit' | 'bird' | 'other';
  imageUrl: string;
  location: string;
  weight?: string;
  personality?: string[];
  about?: string;
  healthStatus?: string[];
  requirements?: string[];
  isFeatured?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
}

export type Language = 'zh' | 'en' | 'ja';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface User {
  name: string;
  joinDate: string;
  avatarUrl: string;
  phone?: string;
  profession?: string;
  stats: {
    applied: number;
    favorites: number;
    guides: number;
  };
  settings: {
    notifications: boolean;
    language: Language;
    theme: ThemeMode;
  };
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  petId: string;
  petName: string;
  petImageUrl: string;
  rescuerName: string;
  rescuerAvatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: 'diary' | 'stray';
  content: string;
  images: string[];
  location?: string;
  timestamp: string;
  likes: number;
  comments: number;
}
