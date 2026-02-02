import React, { useState, useMemo } from 'react';
import { 
  MapPin, Calendar, Users, ChevronRight, 
  Filter, Clock, Phone, Mail, X, Globe, AlertCircle, Trash2 
} from 'lucide-react';

const PlannedDates = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedCity, setSelectedCity] = useState('All');
  const [activeTab, setActiveTab] = useState('planned'); // New: 'planned' or 'cancelled'
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
    // CANCELLED DATA EXAMPLES
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
      participants: [
        { name: "Rahul M", phone: "+91 98765 11111", email: "rahul@mail.com", photo: "R" },
        { name: "Sneha G", phone: "+91 98765 22222", email: "sneha@mail.com", photo: "S" }
      ]
    },
    { 
      id: 102, 
      restaurant: "Farzi Cafe", 
      city: "Delhi",
      location: "CP", 
      time: "01:00 PM", 
      date: todayStr,
      status: "Cancelled", 
      cancelReason: "Restaurant overbooked / Table unavailable.",
      category: "Lunch",
      restaurantPhone: "+91 11 0000 1111",
      participants: [
        { name: "Amit S", phone: "+91 98765 33333", email: "amit@mail.com", photo: "A" },
        { name: "Priya B", phone: "+91 98765 44444", email: "priya@mail.com", photo: "P" }
      ]
    },
  ];

  const filteredDates = useMemo(() => {
    return rawDates.filter(d => {
      const matchDate = d.date === selectedDate;
      const matchCity = selectedCity === 'All' || d.city === selectedCity;
      const matchStatus = activeTab === 'planned' ? d.status !== 'Cancelled' : d.status === 'Cancelled';
      return matchDate && matchCity && matchStatus;
    });
  }, [selectedDate, selectedCity, activeTab]);

  const cities = ['All', 'Mumbai', 'Bengaluru', 'Delhi', 'Pune'];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* --- Admin Header --- */}
      <div className="bg-purple-100 p-6 rounded-xl shadow-xl shadow-purple-100/50 border border-purple-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${activeTab === 'planned' ? 'bg-[#632281]' : 'bg-rose-500'}`}>
            {activeTab === 'planned' ? <Calendar size={26} /> : <Trash2 size={26} />}
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              {activeTab === 'planned' ? 'Planned Schedules' : 'Cancelled History'}
            </h1>
            <p className="text-slate-500 text-sm font-medium">Viewing {selectedCity} list</p>
          </div>
        </div>

        <div className="flex bg-white/50 p-1.5 rounded-2xl border border-purple-100">
          <button 
            onClick={() => setActiveTab('planned')}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'planned' ? 'bg-[#632281] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            PLANNED
          </button>
          <button 
            onClick={() => setActiveTab('cancelled')}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'cancelled' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            CANCELLED
          </button>
        </div>

        <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white border-none px-6 py-3 rounded-2xl text-sm font-bold text-[#632281] shadow-sm cursor-pointer"
        />
      </div>

      {/* --- City Selector --- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              selectedCity === city 
              ? 'bg-[#632281] text-white' 
              : 'bg-purple-100 text-slate-500 hover:bg-purple-200'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* --- Main Grid --- */}
      {filteredDates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDates.map((d) => (
            <div 
              key={d.id} 
              onClick={() => setViewingDetails(d)}
              className={`cursor-pointer group p-2 rounded-xl border shadow-sm hover:shadow-2xl transition-all duration-500 bg-purple-100 ${
                activeTab === 'cancelled' ? 'border-rose-100 hover:shadow-rose-100' : 'border-purple-50 hover:shadow-purple-100'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full">
                    <Globe size={12} className={activeTab === 'planned' ? 'text-[#632281]' : 'text-rose-500'} />
                    <span className="text-[10px] font-black uppercase">{d.city}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    d.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                    d.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {d.status}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-800 mb-1">{d.restaurant}</h3>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mb-6">
                    <MapPin size={12} className="text-[#632281]" />
                    {d.location}
                </div>

                {activeTab === 'cancelled' && (
                  <div className="mb-6 p-3 bg-rose-50 rounded-xl flex items-start gap-3 border border-rose-100">
                    <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-rose-600 leading-tight">Reason: {d.cancelReason}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl mb-6">
                  <div className="flex -space-x-3">
                    {d.participants.map((p, i) => (
                        <div key={i} className={`w-10 h-10 rounded-xl border-2 border-white flex items-center justify-center text-xs font-black text-white ${i === 0 ? 'bg-[#632281]' : 'bg-purple-300'}`}>
                            {p.photo}
                        </div>
                    ))}
                  </div>
                  <ChevronRight className="text-purple-300 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[#632281] font-black">
                    <Clock size={16} />
                    <span className="text-sm">{d.time}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase">View Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-purple-50 rounded-[3rem] border-2 border-dashed border-purple-200">
            <p className="text-slate-400 font-bold">No {activeTab} dates found here.</p>
        </div>
      )}

      {/* --- Detail Modal (Includes Contact Info) --- */}
      {viewingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#632281]/20 backdrop-blur-md">
          <div className="bg-purple-100 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Date Info</h2>
                  {viewingDetails.status === 'Cancelled' && (
                    <span className="text-rose-500 text-[10px] font-black uppercase tracking-widest">Cancelled Transaction</span>
                  )}
                </div>
                <button onClick={() => setViewingDetails(null)} className="p-3 bg-white rounded-full hover:bg-rose-50 hover:text-rose-500 transition-colors shadow-sm">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                {/* Restaurant */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-50">
                  <p className="text-[10px] font-black text-purple-300 uppercase mb-3">Restaurant</p>
                  <h4 className="text-lg font-black text-[#632281] mb-2">{viewingDetails.restaurant}</h4>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-600 mb-2">
                    <Phone size={14} className="text-emerald-500" /> {viewingDetails.restaurantPhone}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <MapPin size={14} className="text-[#632281]" /> {viewingDetails.location}, {viewingDetails.city}
                  </div>
                </div>

                {/* Users Contact Details */}
                <div className="grid grid-cols-1 gap-4">
                  {viewingDetails.participants.map((u, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-purple-50 flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg ${idx === 0 ? 'bg-[#632281]' : 'bg-purple-400'}`}>
                        {u.photo}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-black text-slate-800 leading-none mb-2">{u.name}</h5>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                            <Phone size={12} className="text-[#632281]" /> {u.phone}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                            <Mail size={12} className="text-purple-400" /> {u.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setViewingDetails(null)}
                className={`w-full mt-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transition-all ${
                  activeTab === 'planned' ? 'bg-[#632281] shadow-purple-200' : 'bg-rose-500 shadow-rose-200'
                } text-white`}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannedDates;