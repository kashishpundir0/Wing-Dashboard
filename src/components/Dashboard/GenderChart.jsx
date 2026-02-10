import React from 'react';
import { MapPin, Globe, Users2 } from 'lucide-react';

const GenderChart = ({ maleCount, femaleCount, regionalBreakdown = [] }) => {
  const total = maleCount + femaleCount;
  const malePercent = Math.round((maleCount / total) * 100);
  const femalePercent = Math.round((femaleCount / total) * 100);
  const ratio = (maleCount / femaleCount).toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* GENDER SECTION */}
      <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Gender Distribution</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Global User Ratio</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase">Ratio (M:F)</p>
              <p className="text-2xl font-black text-slate-900">{ratio} : 1</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-200 mx-2" />
            <div className="bg-slate-900 p-2.5 rounded-xl text-white shadow-lg"><Globe size={18} /></div>
          </div>
        </div>

        <div className="flex justify-around items-end h-56 px-4">
          {/* Male Bar */}
          <div className="flex flex-col items-center gap-4 w-full group max-w-[120px]">
             <div className="relative w-full bg-slate-50 h-48 rounded-xl border border-slate-100 flex flex-col justify-end overflow-hidden">
                <div className="w-full bg-slate-900 transition-all duration-700" style={{ height: `${malePercent}%` }} />
                <span className="absolute inset-x-0 bottom-4 text-center text-[10px] font-black text-white uppercase tracking-widest">Male</span>
             </div>
             <p className="text-xl font-black text-slate-900">{malePercent}%</p>
          </div>

          {/* Female Bar */}
          <div className="flex flex-col items-center gap-4 w-full group max-w-[120px]">
             <div className="relative w-full bg-slate-50 h-48 rounded-xl border border-slate-100 flex flex-col justify-end overflow-hidden">
                <div className="w-full bg-slate-300 transition-all duration-700" style={{ height: `${femalePercent}%` }} />
                <span className="absolute inset-x-0 bottom-4 text-center text-[10px] font-black text-slate-600 uppercase tracking-widest">Female</span>
             </div>
             <p className="text-xl font-black text-slate-900">{femalePercent}%</p>
          </div>
        </div>
      </div>

      {/* REGIONAL SECTION (Refined) */}
      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
        <div className="bg-slate-900 p-5 flex justify-between items-center">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <MapPin size={14} /> Regional Reach
            </h4>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Top 5</span>
        </div>

        <div className="flex-1 p-6 space-y-5 overflow-y-auto max-h-[320px] custom-scrollbar">
          {regionalBreakdown.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div>
                <p className="text-slate-900 font-bold text-sm uppercase tracking-tight">{item.location}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                  M: {item.male} • F: {item.female}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-slate-900">
                    {Math.round(((item.male + item.female) / total) * 100)}%
                </span>
                <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-slate-900" style={{ width: `${Math.round(((item.male + item.female) / total) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenderChart;