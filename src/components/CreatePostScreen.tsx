import React, { useState } from 'react';
import { ArrowLeft, Camera, X, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../AppContext';

interface CreatePostScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CreatePostScreen({ onBack, onSuccess }: CreatePostScreenProps) {
  const { t } = useAppContext();
  const [type, setType] = useState<'diary' | 'stray'>('diary');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddImage = () => {
    // Simulate image upload
    const mockImages = [
      'https://picsum.photos/seed/pet1/800/600',
      'https://picsum.photos/seed/pet2/800/600',
      'https://picsum.photos/seed/pet3/800/600'
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setImages([...images, randomImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!content) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-700 dark:text-slate-300" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('post')}</h1>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={!content || isSubmitting}
          className={`px-6 py-2 rounded-full font-bold transition-all ${
            !content || isSubmitting
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-[#e26136] text-white shadow-lg shadow-[#e26136]/20 active:scale-95'
          }`}
        >
          {isSubmitting ? '...' : t('post')}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Type Selector */}
        <div className="flex gap-4">
          {[
            { id: 'diary', label: t('postDiary') },
            { id: 'stray', label: t('reportStray') }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setType(item.id as any)}
              className={`flex-1 py-3 rounded-2xl font-bold transition-all border-2 ${
                type === item.id 
                  ? 'border-[#e26136] bg-[#e26136]/5 text-[#e26136]' 
                  : 'border-slate-100 dark:border-slate-800 text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('contentPlaceholder')}
          className="w-full h-40 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e26136] text-slate-900 dark:text-slate-100 resize-none"
        />

        {/* Image Upload */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 px-2">{t('uploadImage')}</h3>
          <div className="grid grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {images.map((img, idx) => (
                <motion.div
                  key={img + idx}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative aspect-square rounded-2xl overflow-hidden group"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center" 
                    style={{ backgroundImage: `url('${img}')` }}
                  />
                  <button 
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 size-6 bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {images.length < 9 && (
              <button 
                onClick={handleAddImage}
                className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:text-[#e26136] hover:border-[#e26136] transition-all"
              >
                <Camera size={24} />
                <span className="text-[10px] mt-1 font-bold">{images.length}/9</span>
              </button>
            )}
          </div>
        </div>

        {/* Location Input (Only for stray) */}
        {type === 'stray' && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900 dark:text-slate-100 px-2 flex items-center gap-1">
              <MapPin size={14} className="text-[#e26136]" />
              {t('location')}
            </label>
            <input 
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="请输入发现位置..."
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e26136] text-slate-900 dark:text-slate-100"
            />
          </div>
        )}
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 bg-[#e26136] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#e26136]/20 animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">发布中...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
