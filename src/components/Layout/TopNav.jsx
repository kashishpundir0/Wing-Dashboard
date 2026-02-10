import React, { useState } from 'react';
import { Search, Bell, Menu, X, Info, Calendar, UserCheck } from 'lucide-react';

const TopNav = ({ title, onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "New Interview", time: "2 mins ago", unread: true },
    { id: 2, title: "System Update", time: "1 hour ago", unread: false }
  ];

  return (
    // Added w-full and max-w-full to prevent overflow
    <header className="h-24 w-full max-w-full bg-[#F5F6FA] flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
      <div className="flex items-center gap-4 min-w-0"> {/* min-w-0 prevents flex items from over-expanding */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2.5 bg-white border border-slate-200 rounded-xl text-[#1F1F2E] shadow-sm hover:bg-slate-50 transition-all shrink-0"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex flex-col truncate">
          <h1 className="text-xl md:text-2xl font-bold text-[#1F1F2E] tracking-tight leading-none truncate">
            Welcome back, Admin
          </h1>
          <div className="flex items-center gap-2 mt-1.5 overflow-hidden">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Platform</span>
            <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{title.replace('-', ' ')}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        {/* Search - Width adjusted for responsiveness */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search analytics..." 
            className="pl-11 pr-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-[#1F1F2E] w-48 xl:w-72 focus:border-[#1F1F2E] focus:ring-4 focus:ring-[#1F1F2E]/5 outline-none transition-all placeholder:text-slate-400 font-medium shadow-sm" 
          />
        </div>

        {/* Notification Bell */}
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className={`p-2.5 rounded-full border transition-all relative shadow-sm ${
            showNotifications 
            ? 'bg-[#1F1F2E] text-white border-[#1F1F2E]' 
            : 'bg-white text-[#1F1F2E] border-slate-200'
          }`}
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#F5F6FA]"></span>
        </button>

        {/* User Profile - High Contrast */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-[#1F1F2E] leading-none">Admin User</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1F1F2E] border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-xs">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;