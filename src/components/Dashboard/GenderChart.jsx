import React from 'react';
import { MapPin, Users as UsersIcon } from 'lucide-react';

const GenderChart = ({ maleCount, femaleCount, regionalBreakdown = [] }) => {
  const total = maleCount + femaleCount;
  const malePercent = Math.round((maleCount / total) * 100);
  const femalePercent = Math.round((femaleCount / total) * 100);

  return (
    <div className="bg-purple-100 rounded-xl border border-gray-100 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 p-8 border-r border-gray-50">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Gender Demographics</h3>
              <p className="text-sm text-gray-500">Global user distribution</p>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-xl text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Active</p>
              <p className="text-xl font-black text-[#632281]">{total.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Male Stats */}
            <div className="group">
              <div className="flex justify-between items-end mb-2">
                <p className="text-sm font-bold text-gray-600 uppercase flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#632281]" /> Male
                </p>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-800">{maleCount.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-[#632281] font-bold bg-purple-50 px-2 py-0.5 rounded-md">{malePercent}%</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#632281] rounded-full transition-all duration-1000" 
                  style={{ width: `${malePercent}%` }}
                />
              </div>
            </div>

            {/* Female Stats */}
            <div className="group">
              <div className="flex justify-between items-end mb-2">
                <p className="text-sm font-bold text-gray-600 uppercase flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-300" /> Female
                </p>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-800">{femaleCount.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-[#632281] font-bold bg-purple-50 px-2 py-0.5 rounded-md">{femalePercent}%</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#632281] rounded-full transition-all duration-1000" 
                  style={{ width: `${femalePercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Regional Sidebar */}
        <div className="bg-purple-300/50 p-8">
          <h4 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MapPin size={16} className="text-[#632281]" />
           Locations Demographics
          </h4>
          
          <div className="space-y-5">
            {regionalBreakdown.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm font-bold text-gray-800 mb-2">{item.location}</p>
                <div className="flex justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-medium">Male</span>
                    <span className="text-[#632281] font-bold">{item.male}</span>
                  </div>
                  <div className="w-px bg-gray-100 h-full mx-2" />
                  <div className="flex flex-col text-right">
                    <span className="text-gray-400 font-medium">Female</span>
                    <span className="text-[#632281] font-bold">{item.female}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 text-xs font-bold text-[#632281] hover:underline">
            View All Locations 
          </button>
        </div>

      </div>
    </div>
  );
};

export default GenderChart;