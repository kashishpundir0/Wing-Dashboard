import React from 'react';
import { Users, GraduationCap, Briefcase } from 'lucide-react';
import GenderChart from '../components/Dashboard/GenderChart';
import OccupationCard from '../components/Dashboard/OccupationCard';
import AgeDistribution from '../components/Dashboard/AgeDistribution';

const Demographics = () => {
  const genderData = {
    male: 1800,
    female: 1400,
    total: 3200,
    regional: [
      { location: 'Bengaluru', male: 60, female: 50 },
      { location: 'Mumbai', male: 45, female: 38 },
      { location: 'Delhi', male: 30, female: 42 },
      { location: 'Pune', male: 25, female: 20 },
      { location: 'Hyderabad', male: 15, female: 18 },
    ]
  };

  const occupationData = [
    { label: 'Academic / Students', count: 2100, icon: GraduationCap, percentage: 65 },
    { label: 'Corporate / Professionals', count: 1100, icon: Briefcase, percentage: 35 },
  ];

  const ageData = {
    average: 24,
    distribution: [
      { range: '18-22', percentage: 45 },
      { range: '23-27', percentage: 35 },
      { range: '28-32', percentage: 15 },
      { range: '33+', percentage: 5 },
    ]
  };

    return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-slate-50/30 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">User Analytics</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Active Demographic Intelligence</p>
        </div>
        <div className="flex items-center gap-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm px-8">
          <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg"><Users size={22} /></div>
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Audience</p>
            <p className="text-2xl font-black text-slate-900 leading-none mt-1">{genderData.total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* ROW 1: Gender & Regional */}
      <GenderChart 
        maleCount={genderData.male} 
        femaleCount={genderData.female} 
        regionalBreakdown={genderData.regional} 
      />

      {/* ROW 2: Age & Occupation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <AgeDistribution ageData={ageData} />
        
        <div className="flex flex-col gap-6">
           <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Market Segments</h3>
           {occupationData.map((item, idx) => (
             <OccupationCard key={idx} {...item} />
           ))}
        </div>
      </div>
    </div>
  );
};

export default Demographics;