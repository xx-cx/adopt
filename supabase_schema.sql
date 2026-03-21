-- ==========================================
-- 爪爪救助 (PawAdopt) Supabase 数据库表结构设计
-- 请将此文件的内容复制到 Supabase 的 SQL Editor 中运行
-- ==========================================

-- 1. 用户登录与信息数据 (User Profile Data)
-- 此表与 Supabase 自带的 auth.users 绑定，用于存储公开的个人资料
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  phone text UNIQUE,
  full_name text,
  avatar_url text,
  profession text,
  is_admin boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 2. 领养上传的数据 (Adoption Upload Data)
-- a. 救助站/个人 上传的待领养宠物信息
CREATE TABLE public.pets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  uploader_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  breed text,
  age text,
  gender text, -- 'male' | 'female'
  type text, -- 'cat' | 'dog' | 'rabbit' | 'bird' | 'other'
  image_url text,
  location text,
  about text,
  status text DEFAULT 'available', -- 'available' | 'adopted' | 'pending'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- b. 领养申请表单数据 
CREATE TABLE public.applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id uuid REFERENCES public.pets(id) ON DELETE CASCADE,
  applicant_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  housing_type text NOT NULL,
  ownership text NOT NULL,
  has_outdoor boolean NOT NULL DEFAULT false,
  experience text,
  reason text,
  status text DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 3. 领养日记的数据 (Adoption Diary Data)
-- 用户记录宠物成长或领养后的日记
CREATE TABLE public.diaries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  images text[] DEFAULT '{}',
  likes_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 4. 流浪猫狗发布的数据 (Stray Animals Posting Data)
-- 救助圈里大家发布的流浪动物线索/求助
CREATE TABLE public.stray_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  images text[] DEFAULT '{}',
  location text NOT NULL,
  likes_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 5. 消息板块的数据 (Message Board Data)
-- a. 聊天会话 (Chat Rooms)
CREATE TABLE public.chats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id uuid REFERENCES public.pets(id) ON DELETE CASCADE,
  adopter_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  rescuer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- b. 具体消息内容 (Messages)
CREATE TABLE public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id uuid REFERENCES public.chats(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ==========================================
-- 配置安全策略 (Row Level Security) 
-- 为了便于当前前后端快速测试，暂时全面开放权限，后续正式上线前可收紧权限
-- ==========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stray_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all ops for profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Enable all ops for pets" ON public.pets FOR ALL USING (true);
CREATE POLICY "Enable all ops for applications" ON public.applications FOR ALL USING (true);
CREATE POLICY "Enable all ops for diaries" ON public.diaries FOR ALL USING (true);
CREATE POLICY "Enable all ops for stray_reports" ON public.stray_reports FOR ALL USING (true);
CREATE POLICY "Enable all ops for chats" ON public.chats FOR ALL USING (true);
CREATE POLICY "Enable all ops for messages" ON public.messages FOR ALL USING (true);
