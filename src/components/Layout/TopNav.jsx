import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const TopNav = ({ title, onMenuClick }) => (
  <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
    <div className="flex items-center gap-4">
      {/* Hamburger Button visible only on mobile */}
      <button 
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
      >
        <Menu size={24} />
      </button>
      
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
        {title.replace('-', ' ')}
      </h1>
    </div>

    <div className="flex items-center gap-3 md:gap-6">
      {/* Search - Hidden on small mobile */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search data..." 
          className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm w-48 lg:w-64 focus:ring-2 focus:ring-purple-200 outline-none" 
        />
      </div>

      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-800">Admin User</p>
          <p className="text-xs text-gray-400">Super Admin</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#632281] flex items-center justify-center text-white font-bold shadow-md">
          A
        </div>
      </div>
    </div>
  </header>
);

export default TopNav;