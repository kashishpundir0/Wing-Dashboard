import React from 'react';
import { Calendar, CheckCircle, Clock, Star,  ChevronRight,Users } from 'lucide-react';

const InterviewerOverview = () => {
  const stats = [
    { label: 'Upcoming', value: '8', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Completed', value: '42', icon: CheckCircle, color: 'bg-emerald-500' },
    { label: 'Avg. Rating', value: '4.9', icon: Star, color: 'bg-amber-500' },
    { label: 'Total Hours', value: '124', icon: Clock, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black mt-2 text-[#1F1F2E]">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg shadow-${stat.color.split('-')[1]}-200`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <h3 className="text-xl font-black text-[#1F1F2E] mb-6">Upcoming Schedule</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-4 bg-[#F5F6FA] rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-white rounded-xl flex flex-col items-center justify-center border border-slate-200 mr-4 shadow-sm group-hover:scale-105 transition-transform">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Oct</span>
                  <span className="text-xl font-black text-[#1F1F2E]">2{i}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1F1F2E]">Interview with Sarah Jenkins</h4>
                  <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                    <Clock size={14} className="text-indigo-500" /> 10:30 AM - 11:30 AM
                  </p>
                </div>
                <button className="p-2 bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1F1F2E] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Availability Status</h3>
                <p className="text-slate-400 text-sm mb-6">You are currently visible for new bookings.</p>
                <div className="space-y-4">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Profile Completion</span>
                            <span className="font-bold">85%</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full w-[85%]" />
                        </div>
                    </div>
                    <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-indigo-600/20">
                        Manage Availability
                    </button>
                </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default InterviewerOverview;