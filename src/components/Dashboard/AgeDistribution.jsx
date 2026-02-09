import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

const AgeDistribution = ({ ageData }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-purple-100 shadow-xl shadow-purple-100/20">
    {/* Header Section */}
    <div className="flex justify-between items-start mb-10">
      <div>
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Age Distribution</h3>
        <p className="text-sm text-gray-400 font-medium">User base breakdown</p>
      </div>
      <div className="bg-purple-50 px-5 py-3 rounded-2xl text-right border border-purple-100/50">
        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Avg. Age</p>
        <p className="text-3xl font-black text-[#632281] leading-none">{ageData.average}</p>
      </div>
    </div>

    {/* Vertical Bars Container */}
    <div className="flex justify-around items-end h-64 px-2 gap-2">
      {ageData.distribution.map((group, idx) => (
        <div key={idx} className="flex flex-col items-center gap-4 w-full group">
          {/* The Bar Track */}
          <div className="relative w-full max-w-[48px] bg-gray-50 rounded-2xl h-48 overflow-hidden border border-gray-100 flex flex-col justify-end">
            
            {/* Percentage Label inside track (optional, shows on top of bar) */}
            <div className="absolute inset-x-0 top-2 text-center z-10">
               <span className="text-[10px] font-black text-gray-400 group-hover:text-[#632281] transition-colors">
                {group.percentage}%
               </span>
            </div>

            {/* The Actual Bar Fill */}
            <div 
              className="w-full bg-purple-300 group-hover:bg-[#632281] rounded-t-xl transition-all duration-1000 ease-out"
              style={{ height: `${group.percentage}%` }}
            />
          </div>

          {/* X-Axis Labels */}
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">
              {group.range}
            </p>
            {/* Optional: Show raw count if available, otherwise just keep range */}
            <p className="text-xs font-black text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
                {group.percentage}%
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Footer Milestone */}
    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-3">
        <div className="p-2 bg-green-50 rounded-lg text-green-600">
            <TrendingUp size={16} />
        </div>
        <p className="text-xs font-bold text-gray-500">
            Primary target audience is <span className="text-[#632281] font-black">Ages 18-24</span>
        </p>
    </div>
  </div>
);

export default AgeDistribution;