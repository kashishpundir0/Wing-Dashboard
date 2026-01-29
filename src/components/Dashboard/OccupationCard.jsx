import React from 'react';

const OccupationCard = ({ label, count, icon: Icon, percentage }) => (
  <div className="bg-purple-100 p-6 rounded-xl border border-gray-100 shadow-xl flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className="p-4 bg-purple-50 rounded-xl text-[#632281]">
        <Icon size={28} />
      </div>
      <span className="text-2xl font-black text-[#632281] bg-purple-100 px-3 py-1 rounded-xl">
        {percentage}%
      </span>
    </div>
    <div className="mt-8">
      <h3 className="text-gray-500 font-bold uppercase text-xs tracking-widest">{label}</h3>
      <p className="text-3xl font-black text-gray-800 mt-1">{count.toLocaleString()}</p>
      <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#632281] transition-all duration-1000" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  </div>
);

export default OccupationCard;