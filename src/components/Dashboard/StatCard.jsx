import React from 'react';

const StatCard = ({ label, value, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-4xl] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;