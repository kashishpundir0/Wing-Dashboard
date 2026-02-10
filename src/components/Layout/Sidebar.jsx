import React from 'react';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Utensils, 
  LogOut, 
  X, 
  BarChart3, 
  Users, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import LogoImg from '../../assets/logo.png';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const userRole = localStorage.getItem('userRole') || "";

  const handleLogout = () => {
    toast((t) => (
      <div className="bg-slate-900 border border-slate-700 p-6 shadow-2xl rounded-2xl">
        <p className="text-sm font-semibold text-slate-100 mb-5">Are you sure you want to sign out?</p>
        <div className="flex gap-3 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => { localStorage.clear(); window.location.href = "/"; }} 
            className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
          >
            Sign Out
          </button>
        </div>
      </div>
    ), { style: { background: 'transparent', boxShadow: 'none' }});
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/overview', roles: ['admin'] },
    { id: 'demographics', label: 'Demographics', icon: BarChart3, path: '/demographics', roles: ['admin'] },
    { id: 'interviewer-list', label: 'Interviewers', icon: Users, path: '/interviewer-list', roles: ['admin'] },
    { id: 'dates', label: 'Planned Dates', icon: Clock, path: '/dates', roles: ['admin'] },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils, path: '/restaurants', roles: ['admin'] },
    { id: 'interviews', label: 'Interviews', icon: Calendar, path: '/interviews', roles: ['admin', 'psychiatrist'] },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, path: '/feedback', roles: ['admin', 'psychiatrist'] },
    { id: 'availability', label: 'My Availability', icon: Clock, path: '/availability', roles: ['psychiatrist'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item?.roles?.includes(userRole));

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-md transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-72 bg-slate-950 border-r border-slate-800/60 flex flex-col z-50 transition-all duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo Section */}
        <div className="px-8 py-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center p-2.5 shadow-xl shadow-indigo-500/20 ring-1 ring-white/20">
              <img src={LogoImg} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight leading-none">WingMann</span>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mt-1.5">System Admin</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pt-2 custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-6 opacity-70">Main Menu</p>
          
          {filteredMenuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) => `
                relative flex items-center gap-4 px-4 py-3.5 transition-all duration-300 group rounded-xl
                ${isActive 
                  ? 'text-white bg-indigo-600/10 shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'}
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Left Active Glow Indicator */}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                  )}

                  <item.icon 
                    size={20} 
                    className={`transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} 
                  />
                  
                  <span className={`text-[15px] tracking-wide transition-transform duration-300 group-hover:translate-x-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </span>

                  {isActive && (
                    <ChevronRight size={14} className="ml-auto text-indigo-400/50" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-6 bg-slate-950/50 backdrop-blur-xl border-t border-slate-900">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-slate-900 border border-slate-800 text-slate-300 rounded-2xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-300 group shadow-sm active:scale-[0.96]"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;