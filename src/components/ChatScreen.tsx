import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { Chat, Message } from '../types';
import { motion } from 'motion/react';

interface ChatScreenProps {
  chat: Chat;
  onBack: () => void;
}

export default function ChatScreen({ chat, onBack }: ChatScreenProps) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      senderId: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#1a1a1a]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div 
              className="size-10 rounded-full bg-cover bg-center border border-slate-100 dark:border-slate-700" 
              style={{ backgroundImage: `url('${chat.rescuerAvatarUrl}')` }}
            />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 leading-tight">{chat.rescuerName}</h3>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">在线</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:text-[#e26136] transition-colors">
            <Phone size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-[#e26136] transition-colors">
            <Video size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-[#e26136] transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => {
          const isUser = msg.senderId === 'user';
          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                  isUser 
                    ? 'bg-[#e26136] text-white rounded-tr-none' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] pb-8">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-4 py-2 border border-slate-100 dark:border-slate-700">
          <input 
            type="text" 
            placeholder="输入消息..." 
            className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-slate-900 dark:text-slate-100"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-2 rounded-xl transition-all ${
              inputText.trim() 
                ? 'bg-[#e26136] text-white shadow-lg shadow-[#e26136]/20' 
                : 'text-slate-300'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
