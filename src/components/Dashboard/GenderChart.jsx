import React from 'react';
import { MapPin, Globe } from 'lucide-react';

const GenderChart = ({ maleCount, femaleCount, regionalBreakdown = [] }) => {
  const total = maleCount + femaleCount;
  const malePercent = Math.round((maleCount / total) * 100);
  const femalePercent = Math.round((femaleCount / total) * 100);

  return (
    /* Removed mx-auto, set to w-full */
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 items-start py-2">
      
      {/* LEFT SIDE: Gender Section */}
      <div className="bg-white rounded-[1.5rem] border border-purple-100 shadow-lg p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-base font-black text-gray-900 leading-tight">Gender Demographics</h3>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">Global Distribution</p>
          </div>
          <div className="bg-purple-50 p-2 rounded-xl text-[#632281]"><Globe size={16} /></div>
        </div>

        <div className="flex justify-around items-end h-40 px-2">
          {/* Male */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="relative w-10 bg-gray-50 rounded-xl h-28 overflow-hidden border border-gray-100 flex flex-col justify-end">
              <div className="w-full bg-[#632281] rounded-t-lg" style={{ height: `${malePercent}%` }} />
              <span className="absolute inset-x-0 top-1 text-[9px] font-black text-gray-400 text-center">{malePercent}%</span>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-black text-gray-400 uppercase">Male</p>
              <p className="text-sm font-black text-gray-800">{maleCount.toLocaleString()}</p>
            </div>
          </div>
          {/* Female */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="relative w-10 bg-gray-50 rounded-xl h-28 overflow-hidden border border-gray-100 flex flex-col justify-end">
              <div className="w-full bg-purple-300 rounded-t-lg" style={{ height: `${femalePercent}%` }} />
              <span className="absolute inset-x-0 top-1 text-[9px] font-black text-gray-400 text-center">{femalePercent}%</span>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-black text-gray-400 uppercase">Female</p>
              <p className="text-sm font-black text-gray-800">{femaleCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Active Users</span>
            <span className="text-lg font-black text-[#632281]">{total.toLocaleString()}</span>
        </div>
      </div>

      {/* RIGHT SIDE: Regional */}
      <div className="bg-[#632281] rounded-[1.5rem] p-5 shadow-lg flex flex-col h-full">
        <h4 className="text-[10px] font-black text-purple-200 uppercase tracking-widest mb-3 flex items-center gap-2"><MapPin size={12} /> Regional</h4>
        <div className="space-y-2 overflow-y-auto max-h-[180px] custom-scrollbar">
          {regionalBreakdown.map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-white font-black text-xs">{item.location}</p>
                <div className="flex gap-3 mt-1">
                  <div className="flex flex-col"><span className="text-[8px] font-bold text-purple-300 uppercase">M</span><span className="text-white text-[10px] font-bold">{item.male}</span></div>
                  <div className="flex flex-col"><span className="text-[8px] font-bold text-purple-300 uppercase">F</span><span className="text-white text-[10px] font-bold">{item.female}</span></div>
                </div>
              </div>
              <span className="text-[9px] font-black text-purple-900 bg-purple-200 px-2 py-1 rounded-md">{Math.round(((item.male + item.female) / total) * 100)}%</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 py-2 rounded-lg border border-white/10 text-white text-[10px] font-black uppercase tracking-tighter">View All</button>
      </div>
    </div>
  );
};

export default GenderChart;