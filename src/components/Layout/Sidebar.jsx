import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Utensils, 
  LogOut,
  X ,
  BarChart3,
  Users,
  MessageSquare
} from 'lucide-react';

import LogoImg from '../../assets/logo.png';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || "";

  // 1. DEFINE EXECUTE LOGOUT FIRST (Ensures it is available when called)
 const executeLogout = () => {
    localStorage.clear();
    // Use a small delay so the user sees the success toast
    toast.success("Signed out successfully");
    setTimeout(() => {
        window.location.href = "/"; // This is the safest way to reset the app state on logout
    }, 500);
  };

  // 2. DEFINE CONFIRMATION TOAST
  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-3 min-w-[220px]">
        <p className="text-sm font-black text-gray-800">Exit the dashboard?</p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
          >
            Stay
          </button>
          <button 
            onClick={() => {
              toast.dismiss(t.id);
              executeLogout(); // Calling the function defined above
            }}
            className="px-4 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-600 transition-all shadow-md active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    ), {
      position: 'top-center',
      duration: 5000,
    });
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/overview', roles: ['admin'] },
    { id: 'demographics', label: 'Demographics', icon: BarChart3, path: '/demographics', roles: ['admin'] },
    { id: 'interviews', label: 'Interviews', icon: Calendar, path: '/interviews', roles: ['admin', 'psychiatrist'] },
    { id: 'interviewer-list', label: 'Interviewers', icon: Users, path: '/interviewer-list', roles: ['admin'] },
    { id: 'dates', label: 'Planned Dates', icon: Clock, path: '/dates', roles: ['admin'] },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils, path: '/restaurants', roles: ['admin'] },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, path: '/feedback', roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item?.roles?.includes(userRole)
  );

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-all"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-purple-100 border-r border-purple-200 flex flex-col z-50 shadow-sm
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        
        <div className="p-6 flex items-center justify-between bg-purple-200 border-b border-purple-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#632281] rounded-2xl flex items-center justify-center p-1 shadow-lg border border-white/50 overflow-hidden">
              <img 
                src={LogoImg} 
                alt="WingMann Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-black text-[#632281] leading-none tracking-tight">
                    {userRole === 'admin' ? 'WingMann' : 'Partner'}
                </span>
                <span className="text-[10px] font-bold text-[#632281]/60 uppercase tracking-widest mt-1">Management</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-[#632281] hover:bg-white/20 p-1 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto pb-24 custom-scrollbar">
          {filteredMenuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) => `
                w-full flex items-center rounded-xl gap-4 px-4 py-3.5 text-sm font-black transition-all group
                ${isActive 
                  ? 'bg-white text-[#632281] shadow-xl shadow-purple-900/5' 
                  : 'text-purple-400 hover:bg-white/50 hover:text-[#632281]'}
              `}
            >
              <item.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full bg-purple-100 border-t border-purple-200 p-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500 font-black text-sm hover:bg-red-50 rounded-2xl transition-all group shadow-sm hover:shadow-red-100"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;