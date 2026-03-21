import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Users, FileText, PawPrint, LayoutDashboard, Check, X, Trash2, ShieldAlert, Loader2 } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

type Tab = 'overview' | 'pets' | 'applications' | 'users';

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  // Data States
  const [users, setUsers] = useState<any[]>([]);
  const [pets, setPets] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, petsRes, appsRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('pets').select('*').order('created_at', { ascending: false }),
        supabase.from('applications').select(`
          *,
          pet:pets(name),
          applicant:profiles(full_name)
        `).order('created_at', { ascending: false })
      ]);
      
      setUsers(usersRes.data || []);
      setPets(petsRes.data || []);
      setApplications(appsRes.data || []);
    } catch(err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateAppStatus = async (id: string, status: string) => {
    await supabase.from('applications').update({ status }).eq('id', id);
    fetchData(); // refresh list
  };

  const handleDeletePet = async (id: string) => {
    if(window.confirm('确定要删除这个宠物档案吗？此操作不可恢复。')) {
      await supabase.from('pets').delete().eq('id', id);
      fetchData(); // refresh list
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-500">总注册用户</h3>
          <Users className="text-blue-500" size={24} />
        </div>
        <p className="text-5xl font-extrabold text-slate-900 dark:text-slate-100">{users.length}</p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-500">动物库存档</h3>
          <PawPrint className="text-emerald-500" size={24} />
        </div>
        <p className="text-5xl font-extrabold text-slate-900 dark:text-slate-100">{pets.length}</p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-500">待审批领养</h3>
          <FileText className="text-amber-500" size={24} />
        </div>
        <p className="text-5xl font-extrabold text-slate-900 dark:text-slate-100">{applications.filter(a => a.status === 'pending').length}</p>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-sm border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="p-4 font-semibold">用户ID</th>
              <th className="p-4 font-semibold">昵称</th>
              <th className="p-4 font-semibold">手机号</th>
              <th className="p-4 font-semibold">注册时间</th>
              <th className="p-4 font-semibold">超管身份</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-mono text-xs text-slate-400">{u.id.substring(0, 8)}</td>
                <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{u.full_name || '未设置'}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{u.phone}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  {u.is_admin ? (
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs font-bold border border-red-200 dark:border-red-800/50">
                      是 (管理员)
                    </span>
                  ) : (
                    <span className="text-slate-400">否</span>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">暂无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPets = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-sm border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="p-4 font-semibold">首图</th>
              <th className="p-4 font-semibold">名字</th>
              <th className="p-4 font-semibold">特征</th>
              <th className="p-4 font-semibold">系统状态</th>
              <th className="p-4 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            {pets.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  {p.image_url ? (
                    <div className="w-12 h-12 rounded-lg bg-cover bg-center border border-slate-200 dark:border-slate-700" style={{ backgroundImage: `url(${p.image_url})` }} />
                  ) : (
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                      <PawPrint size={16} />
                    </div>
                  )}
                </td>
                <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{p.name}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{p.type} • {p.breed || '未知品种'}</td>
                <td className="p-4">
                   <span className={`px-2 py-1 rounded text-xs font-bold border ${
                     p.status === 'adopted' 
                      ? 'bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800/50' 
                      : 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800/50'
                   }`}>
                     {p.status === 'adopted' ? '已领养 (Adopted)' : '待领养 (Available)'}
                   </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDeletePet(p.id)} 
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                    title="彻底删除该动物档案"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {pets.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">暂无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-sm border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="p-4 font-semibold">申请人留名</th>
              <th className="p-4 font-semibold">联系电话</th>
              <th className="p-4 font-semibold">目标宠物</th>
              <th className="p-4 font-semibold">居住概述</th>
              <th className="p-4 font-semibold">当前进度</th>
              <th className="p-4 font-semibold text-right">审核操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            {applications.map(a => (
              <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{a.full_name}</td>
                <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{a.phone}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400 text-xs">
                  {a.pet ? a.pet.name : <span className="italic text-slate-400">未知/已删宠物</span>}
                </td>
                <td className="p-4 text-xs text-slate-500 dark:text-slate-400">
                  {a.housing_type === 'apartment' ? '公寓' : '住宅'} 
                  ({a.ownership === 'own' ? '自有' : '租凭'})
                  {a.has_outdoor ? ' • 带室外' : ''}
                </td>
                <td className="p-4">
                   <span className={`px-2 py-1 rounded text-xs font-bold border ${
                     a.status === 'pending' ? 'bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800/50' : 
                     a.status === 'approved' ? 'bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800/50' : 
                     'bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:border-red-800/50'
                   }`}>
                     {a.status === 'pending' ? '待审核' : a.status === 'approved' ? '已批准' : '已直接驳回'}
                   </span>
                </td>
                <td className="p-4 text-right">
                  {a.status === 'pending' ? (
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleUpdateAppStatus(a.id, 'approved')} className="flex items-center gap-1 text-emerald-700 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-800/50 px-2 py-1.5 rounded-lg text-xs font-bold transition-colors">
                        <Check size={14} /> 批准
                      </button>
                      <button onClick={() => handleUpdateAppStatus(a.id, 'rejected')} className="flex items-center gap-1 text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 px-2 py-1.5 rounded-lg text-xs font-bold transition-colors">
                        <X size={14} /> 驳回
                      </button>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs italic">已结办</span>
                  )}
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-slate-400">暂无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar Focus Layer */}
      <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 shadow-lg z-10">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#e26136]/10 rounded-xl flex items-center justify-center shrink-0">
            <ShieldAlert className="text-[#e26136]" size={24} />
          </div>
          <h1 className="text-lg font-black tracking-tight leading-tight">PawAdopt<br/><span className="text-slate-500 text-sm font-medium">超级管理后台</span></h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'overview' ? 'bg-[#e26136] text-white shadow-md shadow-[#e26136]/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} /> 数据总览
          </button>
          <button onClick={() => setActiveTab('pets')} className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'pets' ? 'bg-[#e26136] text-white shadow-md shadow-[#e26136]/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <PawPrint size={20} /> 领养动物库
          </button>
          <button onClick={() => setActiveTab('applications')} className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'applications' ? 'bg-[#e26136] text-white shadow-md shadow-[#e26136]/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <FileText size={20} /> 申请审批库
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-[#e26136] text-white shadow-md shadow-[#e26136]/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <Users size={20} /> 全量用户池
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={onBack} className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold w-full p-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700">
            <ArrowLeft size={18} /> 返回主 App
          </button>
        </div>
      </div>
      
      {/* Main Content Pane */}
      <div className="flex-1 overflow-auto p-10">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold text-[#e26136] uppercase tracking-wider mb-1">System Administration</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {activeTab === 'overview' && '数据与趋势总览'}
              {activeTab === 'pets' && '管理动物入库与下架'}
              {activeTab === 'applications' && '审批全站领养申请表'}
              {activeTab === 'users' && '用户档案检索'}
            </h2>
          </div>
          <button onClick={fetchData} className="px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors active:scale-95 text-slate-700 dark:text-slate-300">
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : '↻ 手动拉取最新数据'}
          </button>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 size={36} className="animate-spin mb-4 text-[#e26136]" />
            <p className="font-medium animate-pulse">正在与 Supabase 同步数据...</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'pets' && renderPets()}
            {activeTab === 'applications' && renderApplications()}
          </div>
        )}
      </div>
    </div>
  );
}
