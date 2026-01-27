import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, Users, ChevronRight, Filter, Clock } from 'lucide-react';

const PlannedDates = () => {
  // 1. Get today's and tomorrow's date strings dynamically so the demo always works
  const todayStr = new Date().toISOString().split('T')[0];
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // 2. State defaults to today
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // 3. Mock Data - Now using dynamic dates so "Today" is never empty
  const rawDates = [
    { 
      id: 1, 
      restaurant: "The Grand Italian", 
      location: "Downtown", 
      time: "07:00 PM", 
      date: todayStr, // Dynamically set to today
      participants: ["John", "Sarah"], 
      status: "Confirmed", 
      category: "Dinner" 
    },
    { 
      id: 2, 
      restaurant: "Blue Bottle Coffee", 
      location: "Market St", 
      time: "10:00 AM", 
      date: todayStr, // Dynamically set to today
      participants: ["Alex", "Taylor"], 
      status: "Confirmed", 
      category: "Breakfast" 
    },
    { 
      id: 3, 
      restaurant: "Sushi Zen", 
      location: "West End", 
      time: "08:30 PM", 
      date: tomorrowStr, // Set to tomorrow
      participants: ["Mike", "Jessica"], 
      status: "Pending", 
      category: "Late Night" 
    },
  ];

  // 4. Filter logic
  const filteredDates = useMemo(() => {
    return rawDates.filter(d => d.date === selectedDate);
  }, [selectedDate, rawDates]);

  // Helper for quick date selection
  const setToday = () => setSelectedDate(todayStr);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      
      {/* --- Admin Control Header --- */}
      <div className="bg-purple-100 p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#632281] ring-8 ring-purple-50/50">
            <Calendar size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Schedule Manager</h1>
            <p className="text-slate-500 text-sm font-medium">
              Managing <span className="text-[#632281] font-bold">{rawDates.length} total</span> planned dates
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
            {/* Quick Filters */}
            <div className="flex bg-slate-100 p-1 rounded-xl mr-2">
                <button 
                    onClick={setToday}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${selectedDate === todayStr ? 'bg-white shadow-sm text-[#632281]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Today
                </button>
                <button 
                    onClick={() => setSelectedDate(tomorrowStr)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${selectedDate === tomorrowStr ? 'bg-white shadow-sm text-[#632281]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Tomorrow
                </button>
            </div>
            
            {/* Date Input */}
            <div className="relative">
                <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all cursor-pointer"
                />
                <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      {filteredDates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDates.map((d) => (
            <div key={d.id} className="group bg-purple-100 p-1 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300">
              <div className="bg-slate-50/50 p-6 rounded-[2.2rem]">
                
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${d.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {d.status}
                  </span>
                  <button className="text-slate-300 hover:text-slate-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight group-hover:text-[#632281] transition-colors">{d.restaurant}</h3>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mb-6">
                    <MapPin size={12} className="text-[#632281]" />
                    {d.location} • {d.category}
                </div>
                
                {/* Users Display */}
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl mb-6 ring-1 ring-slate-100 shadow-sm">
                  <div className="flex -space-x-3">
                    {d.participants.map((p, i) => (
                        <div key={i} className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${i === 0 ? 'bg-[#632281]' : 'bg-purple-300'}`}>
                            {p.charAt(0)}
                        </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1">Pairing</p>
                    <p className="text-xs font-bold text-slate-700">{d.participants.join(' & ')}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center px-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={14} />
                    <span className="text-xs font-black uppercase">{d.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#632281] bg-purple-50 px-3 py-1.5 rounded-lg">
                    <Clock size={14} />
                    <span className="text-sm font-black">{d.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mb-4">
                <Calendar size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No dates scheduled</h3>
            <p className="text-slate-400 text-sm">There are no activities planned for {selectedDate}.</p>
            <button 
                onClick={setToday}
                className="mt-6 text-sm font-bold text-[#632281] hover:underline"
            >
                Back to today
            </button>
        </div>
      )}
    </div>
  );
};

export default PlannedDates;