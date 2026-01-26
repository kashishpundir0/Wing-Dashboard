import React from 'react';

const GenderChart = ({ maleCount, femaleCount }) => {
  const total = maleCount + femaleCount;
  const malePercent = Math.round((maleCount / total) * 100);
  const femalePercent = Math.round((femaleCount / total) * 100);

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Gender Demographics</h3>
          <p className="text-sm text-gray-400">Distribution of total registered users</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-[#632281]">{total.toLocaleString()}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Total Users</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Male Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Male Users</p>
              <p className="text-2xl font-black text-gray-800">{maleCount.toLocaleString()}</p>
            </div>
            <p className="text-xl font-black text-[#632281]">{malePercent}%</p>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#632281] rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${malePercent}%` }}
            ></div>
          </div>
        </div>

        {/* Female Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Female Users</p>
              <p className="text-2xl font-black text-gray-800">{femaleCount.toLocaleString()}</p>
            </div>
            <p className="text-xl font-black text-purple-300">{femalePercent}%</p>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-300 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${femalePercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderChart;