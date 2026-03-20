import React, { useState } from 'react';
import { ArrowLeft, Smartphone, Loader2, Lock, User as UserIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

type AuthMode = 'otp' | 'password';
type Step = 'login' | 'otp-code' | 'set-profile';

export default function LoginScreen({ onBack, onSuccess }: LoginScreenProps) {
  const [mode, setMode] = useState<AuthMode>('otp');
  const [step, setStep] = useState<Step>('login');
  
  // Form controls
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // for password login
  const [code, setCode] = useState(''); // for otp verification
  
  // Set Profile controls
  const [nickname, setNickname] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Send OTP / Handle Password Login
  const handlePrimarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 11) {
      setError('请输入有效的手机号码');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (mode === 'otp') {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          phone: '+86' + phone,
        });
        if (otpError) throw otpError;
        setStep('otp-code');
      } else {
        // Password Login
        if (!password) {
          setError('请输入密码');
          setIsLoading(false);
          return;
        }
        const { error: signInError } = await supabase.auth.signInWithPassword({
          phone: '+86' + phone,
          password
        });
        if (signInError) throw signInError;
        onSuccess();
      }
    } catch (err: any) {
      console.error(err);
      setError(mode === 'otp' ? '发送验证码失败: ' + err.message : '登录失败: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Verify OTP
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      setError('请输入完整的验证码');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        phone: '+86' + phone,
        token: code,
        type: 'sms',
      });

      if (verifyError) throw verifyError;
      
      if (data.user) {
        // Detect if this is a newly created user (created within the last 60 seconds)
        const isNewUser = new Date(data.user.created_at).getTime() > Date.now() - 60000;
        if (isNewUser) {
          setStep('set-profile');
        } else {
          onSuccess();
        }
      }
    } catch (err: any) {
      console.error(err);
      setError('验证失败: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Set Profile for new users
  const handleSetProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !newPassword || newPassword.length < 6) {
      setError('请完整填写昵称并设置至少 6 位的密码');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 1. Set Auth Password for future logins
      const { error: pwdError } = await supabase.auth.updateUser({ password: newPassword });
      if (pwdError) throw pwdError;

      // 2. Set Profile full_name
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({ id: user.id, full_name: nickname, phone: phone });
        
        if (profileError && profileError.code !== '23505') { 
          // ignore unique phone constraint error if already exists, just in case
          throw profileError;
        }
      }
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError('设置失败: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForms = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-8">
        <button
          type="button"
          onClick={() => { setMode('otp'); setError(''); }}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
            mode === 'otp' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          验证码登录/注册
        </button>
        <button
          type="button"
          onClick={() => { setMode('password'); setError(''); }}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
            mode === 'password' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          密码登录
        </button>
      </div>

      <form onSubmit={handlePrimarySubmit} className="space-y-6">
        <div className="space-y-4">
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

          {mode === 'password' && (
            <div className="relative flex items-center animate-in slide-in-from-top-2 duration-200">
              <div className="absolute left-4 text-slate-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-[#e26136] focus:ring-0 outline-none transition-all text-base font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                placeholder="请输入密码"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || phone.length < 11 || (mode === 'password' && !password)}
          className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all ${
            isLoading || phone.length < 11 || (mode === 'password' && !password)
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
              : 'bg-[#e26136] hover:bg-[#c9532e] text-white shadow-lg shadow-[#e26136]/30 active:scale-95'
          }`}
        >
          {isLoading ? <Loader2 size={24} className="animate-spin" /> : (mode === 'otp' ? '获取验证码' : '立即登录')}
        </button>
      </form>
    </div>
  );

  const renderOtpCode = () => (
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
        {isLoading ? <Loader2 size={24} className="animate-spin" /> : '验证登录'}
      </button>
      
      <div className="text-center mt-6">
        <button 
          type="button" 
          onClick={() => { setStep('login'); setCode(''); }}
          className="text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          返回修改手机号
        </button>
      </div>
    </form>
  );

  const renderSetProfile = () => (
    <form onSubmit={handleSetProfile} className="space-y-6 animate-in slide-in-from-right-8 duration-300">
      <div className="text-center mb-6">
        <div className="size-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon size={28} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">手机号注册成功！</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">请为您设置一个名字，及以后登录用的密码。</p>
      </div>

      <div className="space-y-4">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400">
            <UserIcon size={20} />
          </div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-[#e26136] focus:ring-0 outline-none transition-all text-base font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            placeholder="您的名字/昵称"
            autoFocus
          />
        </div>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400">
            <Lock size={20} />
          </div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-[#e26136] focus:ring-0 outline-none transition-all text-base font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            placeholder="设置 6 位以上登录密码"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !nickname || newPassword.length < 6}
        className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all ${
          isLoading || !nickname || newPassword.length < 6
            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
            : 'bg-[#e26136] hover:bg-[#c9532e] text-white shadow-lg shadow-[#e26136]/30 active:scale-95'
        }`}
      >
        {isLoading ? <Loader2 size={24} className="animate-spin" /> : '完成设置并进入'}
      </button>

      <div className="text-center mt-4">
        <button 
          type="button" 
          onClick={onSuccess} // skip setup
          className="text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          以后再设置，直接带我进去
        </button>
      </div>
    </form>
  );

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen flex flex-col pt-12 pb-6 px-6 relative shadow-xl overflow-y-auto">
      <button 
        onClick={step === 'login' ? onBack : () => {
          if (step === 'otp-code') setStep('login');
          if (step === 'set-profile') onSuccess();
        }}
        className="absolute top-6 left-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
      >
        <ArrowLeft size={20} className="text-slate-700 dark:text-slate-300" />
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full py-10">
        
        {step !== 'set-profile' && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">登录 / 注册</h1>
            <p className="text-slate-500 dark:text-slate-400">未注册的手机号验证通过自动注册</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 border border-red-100 dark:border-red-800/50">
            {error}
          </div>
        )}

        {step === 'login' && renderLoginForms()}
        {step === 'otp-code' && renderOtpCode()}
        {step === 'set-profile' && renderSetProfile()}
        
      </div>
    </div>
  );
}
