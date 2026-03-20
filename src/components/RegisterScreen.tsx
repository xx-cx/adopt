import React, { useState } from 'react';
import { ArrowLeft, UserPlus, Lock, Smartphone, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RegisterScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  onNavigateToLogin: () => void;
}

export default function RegisterScreen({ onBack, onSuccess, onNavigateToLogin }: RegisterScreenProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'details' | 'code'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 11) {
      setError('请输入有效的手机号码');
      return;
    }
    if (!password || password.length < 6) {
      setError('密码长度至少为 6 位');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        phone: '+86' + phone,
        password: password
      });

      if (error) throw error;
      
      // Supabase sends an OTP verification code on signup if phone confirmation is enabled
      // If it's already verified or confirmation is disabled, it might immediately log them in
      if (data.session) {
        onSuccess();
      } else {
        setStep('code');
      }
    } catch (err: any) {
      console.error(err);
      setError('注册失败: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      setError('请输入完整的验证码');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: '+86' + phone,
        token: code,
        type: 'sms',
      });

      if (error) throw error;
      
      if (data.session) {
        onSuccess();
      }
    } catch (err: any) {
      console.error(err);
      setError('验证失败: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen flex flex-col pt-12 pb-6 px-6 relative shadow-xl">
      <button 
        onClick={step === 'code' ? () => setStep('details') : onBack}
        className="absolute top-6 left-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <ArrowLeft size={20} className="text-slate-700 dark:text-slate-300" />
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-[#e26136]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus size={32} className="text-[#e26136]" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">注册账号</h1>
          <p className="text-slate-500 dark:text-slate-400">免费成为爪爪救助的一员</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 border border-red-100 dark:border-red-800/50">
            {error}
          </div>
        )}

        {step === 'details' ? (
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">手机号码</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-slate-400">
                    <Smartphone size={20} />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-[#e26136] focus:ring-0 outline-none transition-all text-base font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                    placeholder="请输入 11 位手机号"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">设置密码</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-slate-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-[#e26136] focus:ring-0 outline-none transition-all text-base font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                    placeholder="至少 6 位字符"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || phone.length < 11 || password.length < 6}
              className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all ${
                isLoading || phone.length < 11 || password.length < 6
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                  : 'bg-[#e26136] hover:bg-[#c9532e] text-white shadow-lg shadow-[#e26136]/30 active:scale-95'
              }`}
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : '注册并发送验证码'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-6 animate-in slide-in-from-right-8 duration-300">
            <div className="space-y-2 text-center mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                已发送验证码至 <span className="font-bold text-slate-900 dark:text-slate-100">+86 {phone}</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full tracking-[0.5em] text-center py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-[#e26136] focus:ring-0 outline-none transition-all text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 placeholder:tracking-normal"
                placeholder="6位验证码"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || code.length < 6}
              className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all ${
                isLoading || code.length < 6
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                  : 'bg-[#e26136] hover:bg-[#c9532e] text-white shadow-lg shadow-[#e26136]/30 active:scale-95'
              }`}
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : '验证并完成注册'}
            </button>
            
            <div className="text-center mt-6">
              <button 
                type="button" 
                onClick={() => setStep('details')}
                className="text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                修改注册信息
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
        已有账号？{' '}
        <button 
          onClick={onNavigateToLogin}
          className="text-[#e26136] font-bold hover:underline"
        >
          一键登录
        </button>
      </div>
    </div>
  );
}
