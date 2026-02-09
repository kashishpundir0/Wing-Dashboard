import React, { useState, useMemo } from 'react';
import { 
  MapPin, Calendar, Users, ChevronRight, 
  Clock, Phone, Mail, X, Globe, AlertCircle, Trash2, CalendarDays 
} from 'lucide-react';

const PlannedDates = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedCity, setSelectedCity] = useState('All');
  const [activeTab, setActiveTab] = useState('planned'); 
  const [viewingDetails, setViewingDetails] = useState(null);

  const rawDates = [
    { 
      id: 1, 
      restaurant: "The Grand Italian", 
      city: "Mumbai",
      location: "Bandra West", 
      time: "07:00 PM", 
      date: todayStr,
      status: "Confirmed", 
      category: "Dinner",
      restaurantPhone: "+91 22 4567 8901",
      participants: [
        { name: "John Doe", phone: "+91 98765 00001", email: "john.d@gmail.com", photo: "J" },
        { name: "Sarah Khan", phone: "+91 98765 00002", email: "sarah.k@yahoo.com", photo: "S" }
      ]
    },
    { 
      id: 2, 
      restaurant: "Blue Bottle Coffee", 
      city: "Bengaluru",
      location: "Indiranagar", 
      time: "10:00 AM", 
      date: todayStr,
      status: "Confirmed", 
      category: "Breakfast",
      restaurantPhone: "+91 80 1234 5678",
      participants: [
        { name: "Alex V", phone: "+91 98765 00003", email: "alex@wingmates.com", photo: "A" },
        { name: "Taylor S", phone: "+91 98765 00004", email: "taylor@gmail.com", photo: "T" }
      ]
    },
    { 
        id: 3, 
        restaurant: "Olive Bar & Kitchen", 
        city: "Mumbai",
        location: "Khar", 
        time: "08:30 PM", 
        date: "2025-12-30", // Future date
        status: "Confirmed", 
        category: "Dinner",
        restaurantPhone: "+91 22 4567 8901",
        participants: [
          { name: "Mike R", phone: "+91 98765 55555", email: "mike@gmail.com", photo: "M" },
          { name: "Lisa W", phone: "+91 98765 66666", email: "lisa@yahoo.com", photo: "L" }
        ]
      },
    { 
      id: 101, 
      restaurant: "Social Offline", 
      city: "Mumbai",
      location: "Colaba", 
      time: "09:00 PM", 
      date: todayStr,
      status: "Cancelled", 
      cancelReason: "User Sarah reported feeling unwell.",
      category: "Drinks",
      restaurantPhone: "+91 22 9999 8888",
      participants: [{ name: "Rahul M", photo: "R" }, { name: "Sneha G", photo: "S" }]
    }
  ];

  // Helper to format date labels
  const getDateLabel = (dateStr) => {
    if (dateStr === todayStr) return "Today";
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateStr === tomorrow.toISOString().split('T')[0]) return "Tomorrow";
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Grouping Function: Filters and then groups by date
  const groupedDates = useMemo(() => {
    const filtered = rawDates.filter(d => {
      const matchCity = selectedCity === 'All' || d.city === selectedCity;
      const matchStatus = activeTab === 'planned' ? d.status !== 'Cancelled' : d.status === 'Cancelled';
      return matchCity && matchStatus;
    });

    // Grouping by date
    const groups = filtered.reduce((acc, curr) => {
      if (!acc[curr.date]) acc[curr.date] = [];
      acc[curr.date].push(curr);
      return acc;
    }, {});

    // Sort dates chronologically
    return Object.keys(groups).sort().map(date => ({
      date,
      label: getDateLabel(date),
      items: groups[date]
    }));
  }, [selectedCity, activeTab]);

  const cities = ['All', 'Mumbai', 'Bengaluru', 'Delhi', 'Pune'];

  return (
    <div className="max-w-7xl mx-auto space-y-8 bg-gray-50/50 min-h-screen">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Timeline Directory</h1>
          <p className="text-purple-600 font-bold text-xs uppercase tracking-[0.2em] mt-1">Date Planning & Management</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Tab Switcher */}
            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-purple-100">
                <button 
                    onClick={() => setActiveTab('planned')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'planned' ? 'bg-[#632281] text-white shadow-lg' : 'text-gray-400'}`}
                >
                    PLANNED
                </button>
                <button 
                    onClick={() => setActiveTab('cancelled')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'cancelled' ? 'bg-rose-500 text-white shadow-lg' : 'text-gray-400'}`}
                >
                    CANCELLED
                </button>
            </div>

            {/* Jump to Date */}
            <div className="relative flex items-center bg-white px-4 py-2.5 rounded-2xl border border-purple-100 shadow-sm">
                <CalendarDays size={16} className="text-purple-400 mr-2" />
                <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent border-none text-xs font-black text-gray-800 focus:ring-0 cursor-pointer"
                />
            </div>
        </div>
      </div>

      {/* --- City Filters --- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              selectedCity === city 
              ? 'bg-purple-600 border-purple-600 text-white shadow-md' 
              : 'bg-white border-purple-100 text-gray-400 hover:border-purple-300'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* --- Chronological Content --- */}
      <div className="space-y-12">
        {groupedDates.length > 0 ? (
          groupedDates.map((group) => (
            <div key={group.date} className="space-y-6">
              {/* Date Divider */}
              <div className="flex items-center gap-4">
                 <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-100" />
                 <h2 className={`text-sm font-black uppercase tracking-[0.3em] ${group.date === todayStr ? 'text-[#632281]' : 'text-gray-400'}`}>
                    {group.label}
                 </h2>
                 <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-100" />
              </div>

              {/* Grid for this specific date */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((d) => (
                  <div 
                    key={d.id} 
                    onClick={() => setViewingDetails(d)}
                    className={`bg-white group p-6 rounded-[2rem] border transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                      activeTab === 'cancelled' ? 'border-rose-100 hover:border-rose-300' : 'border-purple-50 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-gray-50 px-3 py-1.5 rounded-xl flex items-center gap-2">
                            <Globe size={12} className="text-purple-400" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{d.city}</span>
                        </div>
                        <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                             d.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>{d.status}</span>
                    </div>

                    <h3 className="text-xl font-black text-gray-900 group-hover:text-[#632281] transition-colors">{d.restaurant}</h3>
                    <p className="text-xs font-bold text-gray-400 flex items-center gap-1 mt-1 mb-6">
                        <MapPin size={12} className="text-purple-300" /> {d.location}
                    </p>

                    {activeTab === 'cancelled' && (
                        <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl mb-6">
                            <p className="text-[10px] font-bold text-rose-600 leading-tight">Reason: {d.cancelReason}</p>
                        </div>
                    )}

                    <div className="flex justify-between items-end border-t border-gray-50 pt-6">
                        <div className="flex -space-x-3">
                            {d.participants.map((p, i) => (
                                <div key={i} className={`w-10 h-10 rounded-2xl border-4 border-white flex items-center justify-center text-xs font-black text-white ${i === 0 ? 'bg-[#632281]' : 'bg-purple-300'}`}>
                                    {p.photo}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-gray-300 uppercase leading-none mb-1">Timing</span>
                            <div className="flex items-center gap-1.5 text-[#632281] font-black">
                                <Clock size={14} />
                                <span className="text-sm">{d.time}</span>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-purple-100 shadow-inner">
              <div className="w-16 h-16 bg-purple-50 text-purple-200 rounded-full flex items-center justify-center mb-4">
                  <Calendar size={32} />
              </div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No activity found for this filter</p>
          </div>
        )}
      </div>

      {/* --- Detail Modal --- */}
      {viewingDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-10">
                <div>
                   <h2 className="text-2xl font-black text-gray-900 leading-tight">Session Intel</h2>
                   <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">{viewingDetails.date} • {viewingDetails.time}</p>
                </div>
                <button onClick={() => setViewingDetails(null)} className="p-3 bg-gray-50 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                  {/* Restaurant Info */}
                  <div className="p-6 bg-purple-50 rounded-[1.5rem] border border-purple-100">
                    <h4 className="font-black text-[#632281] text-lg leading-none mb-4">{viewingDetails.restaurant}</h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                            <Phone size={14} className="text-emerald-500" /> {viewingDetails.restaurantPhone}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                            <MapPin size={14} className="text-[#632281]" /> {viewingDetails.location}, {viewingDetails.city}
                        </div>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="grid grid-cols-1 gap-4">
                    {viewingDetails.participants.map((u, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black ${idx === 0 ? 'bg-[#632281]' : 'bg-purple-400'}`}>
                                {u.photo}
                            </div>
                            <div>
                                <h5 className="font-black text-gray-800 text-sm leading-none mb-1">{u.name}</h5>
                                <p className="text-[10px] font-bold text-gray-400">{u.email || 'Contact Protected'}</p>
                            </div>
                        </div>
                    ))}
                  </div>
              </div>

              <button 
                onClick={() => setViewingDetails(null)}
                className={`w-full mt-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg transition-all active:scale-95 ${
                  activeTab === 'planned' ? 'bg-[#632281] text-white shadow-purple-200' : 'bg-rose-500 text-white shadow-rose-200'
                }`}
              >
                Dismiss Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannedDates;