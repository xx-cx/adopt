<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  <h1>🐾 PawAdopt (爪爪救助)</h1>

  <p>一个集“流浪动物救助、领养双向撮合、以及全流程无纸化审批”于一体的<b>全栈式公益 Web 应用</b>。</p>
</div>

---

## 🌟 项目四大核心板块 (Features)

### 1. 🐶 领养大厅与动态展示室 (Home & Rescue Circle)
* **痛点解决**：过去领养信息靠朋友圈发，信息不仅容易沉没也不规范。
* **功能特色**：提供了一个像小红书一样美观的瀑布流大厅。个人和救助机构可以发布每只毛孩子的清晰照片、品种、脾气和状态（待领养/已领养）。不仅如此，里面还有一个社区圈子，可以发救助日记或者紧急流浪动物线索求助。

### 2. 📝 在线结构化领养审批流 (Application Flow)
* **痛点解决**：以前领养要加微信发长长的问卷，低效且隐私泄露风险大。
* **功能特色**：看中宠物的家庭，可以直接在 App 内填写一份结构化的领养志愿书（包含：家庭类型、是否有院子、养宠经验、领养原因）。提交后，数据瞬间加密同步至云端数据库。

### 3. 🛡️ 现代化安全机制的个人中心 (Smart Auth Profile)
* **痛点解决**：传统应用需要设置繁琐的密码，还容易忘。
* **功能特色**：引入了极简的“手机号一键验证码登录/注册”融合流程，无需记密码即可无门槛进入领养社区；个人大厅还会实时追踪该用户“已申请的次数”、“收藏的宠物”等成就数据。

### 4. 👑 内嵌式超级管理控制台 (Admin Dashboard)
* **痛点解决**：运营者通常需要自己去查冰冷的数据库黑框框来管理项目，非常痛苦。
* **功能特色**：直接在项目里嵌入了一个“上帝视角”的可视化后台。只要是以超管（Admin）身份登入，就能在一个专门的统计大屏里，看到系统有多少注册用户、一键“通过/驳回”堆积的领养申请、还能直接管理或下线违规发布的动物档案。

---

## 🛠️ 技术栈 (Tech Stack)
- **Frontend Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS + Lucide React (Icons) + Framer Motion (Animations)
- **Backend & Database:** Supabase (PostgreSQL, Auth, RLS)

---

## 🚀 本地运行指南 (Run Locally)

**环境要求:** Node.js

1. 下载并安装依赖：
   ```bash
   npm install
   ```
2. 确保在根目录创建 `.env` 文件并填入您的 Supabase 密钥配置：
   ```env
   VITE_SUPABASE_URL=您的Project_URL
   VITE_SUPABASE_ANON_KEY=您的Public_Key
   ```
3. 运行本地开发服务器：
   ```bash
   npm run dev
   ```

*(This project was initially bootstrapped with AI Studio)*
