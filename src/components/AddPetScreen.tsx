import React, { useState } from 'react';
import { ArrowLeft, Camera, Plus, X, Upload, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddPetScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function AddPetScreen({ onBack, onSuccess }: AddPetScreenProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageUpload = () => {
    // Mock image upload
    const mockImages = [
      'https://picsum.photos/seed/pet1/400/400',
      'https://picsum.photos/seed/pet2/400/400',
      'https://picsum.photos/seed/pet3/400/400'
    ];
    if (images.length < 3) {
      setImages([...images, mockImages[images.length]]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f8f6f6] dark:bg-[#211511] overflow-x-hidden">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onSuccess}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="size-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={40} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">发布成功！</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                您的领养信息已成功发布，<br />
                正在等待审核。
              </p>
              <button 
                onClick={onSuccess}
                className="w-full bg-[#e26136] text-white font-bold py-4 rounded-xl transition-all active:scale-95"
              >
                返回首页
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center bg-white dark:bg-slate-900 p-4 pb-2 justify-between border-b border-[#e26136]/10 sticky top-0 z-20">
        <button 
          onClick={onBack}
          className="text-[#e26136] flex size-12 shrink-0 items-center justify-center cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">发布领养</h2>
      </div>

      <main className="max-w-2xl mx-auto w-full px-4 py-6 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-2">
                <Camera size={20} className="text-[#e26136]" /> 宠物照片
              </h3>
              <span className="text-xs text-slate-400">{images.length}/3</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img src={img} alt="Pet" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 size-6 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {images.length < 3 && (
                <button 
                  type="button"
                  onClick={handleImageUpload}
                  className="aspect-square rounded-xl border-2 border-dashed border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-[#e26136] hover:border-[#e26136]/50 transition-all"
                >
                  <Plus size={24} />
                  <span className="text-[10px] font-bold">添加照片</span>
                </button>
              )}
            </div>
            <p className="mt-3 text-[10px] text-slate-400 flex items-center gap-1">
              <Info size={12} /> 建议上传清晰的宠物全身照、正面照
            </p>
          </div>

          {/* Basic Info Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-2">基本信息</h3>
            
            <div className="flex flex-col w-full">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-2">宠物昵称</p>
              <input 
                required
                className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal" 
                placeholder="给它取个好听的名字吧" 
                type="text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col w-full">
                <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-2">宠物类型</p>
                <select className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-14 p-[15px] text-base font-normal appearance-none">
                  <option>狗狗</option>
                  <option>猫咪</option>
                  <option>兔子</option>
                  <option>其他</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-2">宠物年龄</p>
                <input 
                  required
                  className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal" 
                  placeholder="例如：2岁" 
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-2">所在地</p>
              <input 
                required
                className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal" 
                placeholder="例如：上海市浦东新区" 
                type="text"
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
            <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-4">详细描述</h3>
            <textarea 
              required
              className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-40 placeholder:text-slate-400 p-[15px] text-base font-normal resize-none" 
              placeholder="介绍一下它的性格、健康状况、领养要求等..."
            />
          </div>

          {/* Submit Button */}
          <button 
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-[#e26136] hover:bg-[#e26136]/90 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#e26136]/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                确认发布 <Upload size={20} />
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
