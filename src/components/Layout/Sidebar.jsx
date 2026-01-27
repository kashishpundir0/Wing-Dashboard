import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Utensils, 
  LogOut,
  X 
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/overview' },
    { id: 'interviews', label: 'Interviews', icon: Calendar, path: '/interviews' },
    { id: 'dates', label: 'Planned Dates', icon: Clock, path: '/dates' },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils, path: '/restaurants' },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate('/');
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-purple-100 border-r border-gray-100 flex flex-col z-50 shadow-sm
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        
        {/* Logo Section */}
        <div className="p-8 flex items-center justify-between bg-purple-200 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#632281] rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">W</div>
            <span className="text-xl font-bold text-[#632281]">Admin</span>
          </div>
          {/* Close button for mobile */}
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:bg-gray-100 p-1 rounded-lg">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto pb-24">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) => `
                w-full flex items-center rounded-xl gap-4 px-4 py-3.5 font-bold transition-all
                ${isActive 
                  ? 'bg-purple-100 text-[#632281]' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}
              `}
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-0 left-0 w-full bg-purple-100 border-t border-gray-50 p-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all group"
          >
            <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;