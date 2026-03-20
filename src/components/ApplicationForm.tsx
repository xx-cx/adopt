import React from 'react';
import { ArrowLeft, Send, Building2, Home, TreePine, ChevronRight, PartyPopper, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface ApplicationFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function ApplicationForm({ onBack, onSubmit }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [housingType, setHousingType] = React.useState<'apartment' | 'house'>('apartment');
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form state
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [ownership, setOwnership] = React.useState<'own' | 'rent'>('own');
  const [hasOutdoor, setHasOutdoor] = React.useState(false);
  const [experience, setExperience] = React.useState('');
  const [reason, setReason] = React.useState('');

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      onBack();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          {
            full_name: fullName,
            phone,
            email,
            housing_type: housingType,
            ownership,
            has_outdoor: hasOutdoor,
            experience,
            reason
          }
        ]);

      if (error) {
        throw error;
      }
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('提交失败，请稍后重试。错误信息: ' + (error as any).message);
    } finally {
      setIsSubmitting(false);
    }
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
              onClick={onSubmit}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl text-center overflow-hidden"
            >
              {/* Firework Decorations */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-4 left-4 text-[#e26136]/20"
              >
                <Sparkles size={40} />
              </motion.div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -15, 15, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-12 right-4 text-[#e26136]/20"
              >
                <Sparkles size={32} />
              </motion.div>

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200 }}
                      className="size-24 bg-[#e26136] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#e26136]/30"
                    >
                      <PartyPopper size={48} />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -top-2 -right-2 size-10 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-white"
                    >
                      <CheckCircle2 size={20} />
                    </motion.div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">提交成功！</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  您的领养申请已成功提交。<br />
                  我们的工作人员将在 1-3 个工作日内与您联系，请保持电话畅通。
                </p>

                <button 
                  onClick={onSubmit}
                  className="w-full bg-[#e26136] hover:bg-[#e26136]/90 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#e26136]/20"
                >
                  返回首页
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top App Bar */}
      <div className="flex items-center bg-white dark:bg-slate-900 p-4 pb-2 justify-between border-b border-[#e26136]/10 sticky top-0 z-20">
        <button 
          onClick={handlePrev}
          className="text-[#e26136] flex size-12 shrink-0 items-center justify-center cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">领养申请表</h2>
      </div>

      {/* Progress Indicator */}
      <div className="flex w-full flex-col items-center justify-center gap-3 py-8 px-4">
        <div className="flex items-center justify-center gap-4 w-full max-w-md">
          <div className="flex flex-col items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all ${
              currentStep >= 1 ? 'bg-[#e26136] text-white' : 'bg-[#e26136]/20 border-2 border-[#e26136]/40 text-[#e26136]'
            }`}>1</div>
            <span className={`text-xs font-medium ${currentStep >= 1 ? 'text-[#e26136]' : 'text-slate-500'}`}>个人信息</span>
          </div>
          <div className={`h-0.5 flex-1 transition-all ${currentStep >= 2 ? 'bg-[#e26136]' : 'bg-[#e26136]/10'}`}></div>
          <div className="flex flex-col items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all ${
              currentStep >= 2 ? 'bg-[#e26136] text-white' : 'bg-[#e26136]/20 border-2 border-[#e26136]/40 text-[#e26136]'
            }`}>2</div>
            <span className={`text-xs font-medium ${currentStep >= 2 ? 'text-[#e26136]' : 'text-slate-500'}`}>居住情况</span>
          </div>
          <div className={`h-0.5 flex-1 transition-all ${currentStep >= 3 ? 'bg-[#e26136]' : 'bg-[#e26136]/10'}`}></div>
          <div className="flex flex-col items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all ${
              currentStep >= 3 ? 'bg-[#e26136] text-white' : 'bg-[#e26136]/20 border-2 border-[#e26136]/40 text-[#e26136]'
            }`}>3</div>
            <span className={`text-xs font-medium ${currentStep >= 3 ? 'text-[#e26136]' : 'text-slate-500'}`}>养宠经验</span>
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto w-full px-4 pb-20 flex-1 flex flex-col">
        <div className="flex-1">
          {/* Section 1: Personal Info */}
          {currentStep === 1 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-slate-900 dark:text-slate-100 tracking-light text-xl font-bold leading-tight pb-6 border-b border-[#e26136]/5">第一步：个人信息</h3>
              <div className="space-y-4 pt-6">
                <div className="flex flex-col w-full">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-2">全名</p>
                  <input 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal" 
                    placeholder="例如：张三" 
                    type="text"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-2">电话号码</p>
                  <input 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal" 
                    placeholder="请输入您的联系电话" 
                    type="tel"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-2">电子邮箱</p>
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-14 placeholder:text-slate-400 p-[15px] text-base font-normal" 
                    placeholder="example@email.com" 
                    type="email"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Living Situation */}
          {currentStep === 2 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-slate-900 dark:text-slate-100 tracking-light text-xl font-bold leading-tight pb-6 border-b border-[#e26136]/5">第二步：居住情况</h3>
              <div className="space-y-6 pt-6">
                <div className="flex flex-col w-full">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-3">住房类型</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setHousingType('apartment')}
                      className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all active:scale-95 ${
                        housingType === 'apartment' 
                          ? 'border-[#e26136] bg-[#e26136]/5 text-[#e26136] font-bold' 
                          : 'border-[#e26136]/10 bg-[#f8f6f6] dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold'
                      }`}
                    >
                      <Building2 size={20} /> 公寓
                    </button>
                    <button 
                      onClick={() => setHousingType('house')}
                      className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all active:scale-95 ${
                        housingType === 'house' 
                          ? 'border-[#e26136] bg-[#e26136]/5 text-[#e26136] font-bold' 
                          : 'border-[#e26136]/10 bg-[#f8f6f6] dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold'
                      }`}
                    >
                      <Home size={20} /> 独栋/住宅
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-3">住房所有权</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        checked={ownership === 'own'}
                        onChange={() => setOwnership('own')}
                        className="w-5 h-5 text-[#e26136] focus:ring-[#e26136] bg-[#f8f6f6]" name="ownership" type="radio" 
                      />
                      <span className="text-slate-700 dark:text-slate-300">自有</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        checked={ownership === 'rent'}
                        onChange={() => setOwnership('rent')}
                        className="w-5 h-5 text-[#e26136] focus:ring-[#e26136] bg-[#f8f6f6]" name="ownership" type="radio" 
                      />
                      <span className="text-slate-700 dark:text-slate-300">租房</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800">
                    <div className="flex items-center gap-3">
                      <TreePine size={20} className="text-[#e26136]" />
                      <p className="text-slate-700 dark:text-slate-300 font-medium">是否有户外花园/阳台？</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        checked={hasOutdoor}
                        onChange={(e) => setHasOutdoor(e.target.checked)}
                        className="sr-only peer" type="checkbox" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#e26136]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Pet Experience */}
          {currentStep === 3 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-slate-900 dark:text-slate-100 tracking-light text-xl font-bold leading-tight pb-6 border-b border-[#e26136]/5">第三步：养宠经验</h3>
              <div className="space-y-6 pt-6">
                <div className="flex flex-col w-full">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-2">既往养宠经验</p>
                  <textarea 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-32 placeholder:text-slate-400 p-[15px] text-base font-normal resize-none" 
                    placeholder="请简述您过去照顾宠物的经历..."
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold pb-2">您为什么要领养宠物？</p>
                  <textarea 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#e26136]/50 border border-[#e26136]/20 bg-[#f8f6f6] dark:bg-slate-800 h-32 placeholder:text-slate-400 p-[15px] text-base font-normal resize-none" 
                    placeholder="分享您迎接新成员的初衷..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-4 mt-auto">
          {currentStep < 3 ? (
            <button 
              onClick={handleNext}
              className="w-full bg-[#e26136] hover:bg-[#e26136]/90 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-[#e26136]/20 flex items-center justify-center gap-2"
            >
              下一步 <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-[#e26136]/50' : 'bg-[#e26136] hover:bg-[#e26136]/90'} text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-[#e26136]/20 flex items-center justify-center gap-2`}
            >
              {isSubmitting ? '提交中...' : '完成并提交'} {!isSubmitting && <Send size={20} />}
            </button>
          )}
          
          <p className="text-center text-slate-500 text-xs px-8">
            {currentStep === 3 
              ? "提交申请即表示您同意我们的服务条款和动物福利政策。" 
              : "请确保您填写的信息准确无误，以便我们更好地审核您的申请。"}
          </p>
        </div>
      </main>
    </div>
  );
}
