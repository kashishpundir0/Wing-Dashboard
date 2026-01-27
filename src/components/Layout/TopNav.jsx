import React, { useState } from 'react';
import { Search, Bell, Menu, X, Info, Calendar, UserCheck } from 'lucide-react';

const TopNav = ({ title, onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy Notification Data
  const notifications = [
    {
      id: 1,
      icon: <UserCheck size={16} className="text-green-600" />,
      title: "New Interview Scheduled",
      desc: "Sarah Jenkins has booked a slot for 10:30 AM.",
      time: "2 mins ago",
      unread: true
    },
    {
      id: 2,
      icon: <Calendar size={16} className="text-purple-600" />,
      title: "New Restaurant Onboarded",
      desc: "Wisteria Chalet has completed their profile.",
      time: "1 hour ago",
      unread: true
    },
    {
      id: 3,
      icon: <Info size={16} className="text-blue-600" />,
      title: "System Update",
      desc: "Dashboard version 2.4 is now live.",
      time: "5 hours ago",
      unread: false
    }
  ];

  return (
    <header className="h-20 bg-purple-100/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
      <div className="flex items-center gap-4">
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
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search data..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border border-purple-100 rounded-full text-sm w-48 lg:w-64 focus:ring-2 focus:ring-purple-200 outline-none transition-all" 
          />
        </div>

        {/* Notification Bell with Toggle */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full relative transition-all ${showNotifications ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:bg-purple-50'}`}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Notification Dropdown / Modal */}
          {showNotifications && (
            <>
              {/* Invisible backdrop to close on click outside */}
              <div 
                className="fixed inset-0 z-[-1]" 
                onClick={() => setShowNotifications(false)}
              ></div>
              
              <div className="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-[2rem] shadow-2xl border border-purple-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300">
                {/* Header */}
                <div className="bg-purple-600 p-6 flex justify-between items-center">
                  <h3 className="text-white font-bold text-lg">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-purple-200 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                {/* List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 border-b border-gray-50 flex gap-4 hover:bg-purple-50/50 transition-colors cursor-pointer ${notif.unread ? 'bg-purple-50/20' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-purple-50 flex items-center justify-center shrink-0 text-purple-600">
                        {notif.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className={`text-sm font-bold ${notif.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                            {notif.title}
                          </p>
                          {notif.unread && <span className="w-2 h-2 bg-purple-600 rounded-full"></span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.desc}</p>
                        <p className="text-[10px] text-purple-400 font-bold mt-2 uppercase tracking-tight">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 text-center">
                  <button className="text-xs font-black text-purple-600 uppercase tracking-widest hover:underline">
                    View All Activity
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-400 font-medium">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#632281] flex items-center justify-center text-white font-bold shadow-md ring-2 ring-purple-100">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;