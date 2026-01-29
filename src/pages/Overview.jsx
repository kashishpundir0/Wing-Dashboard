import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';

const Overview = () => {
  // Brand Colors
  const PURPLE_DEEP = "#632281";
  const PURPLE_MID = "#A855F7";
  const PURPLE_LIGHT = "#C084FC";
  const PURPLE_SOFT = "#E9D5FF";
  const BG_SOFT = "#F3E8FF";

  // 1. Volume Metrics (Acquisition)
  const acquisitionData = [
    { name: 'Total Visits', value: 12450, color: PURPLE_DEEP },
    { name: 'Signed Up', value: 3200, color: PURPLE_MID },
    { name: 'Completed Quiz', value: 1850, color: PURPLE_LIGHT },
    { name: 'Planned Dates', value: 2050, color: PURPLE_SOFT },
  ];

  // 2. Interview Funnel
  const interviewData = [
    { stage: 'Scheduled', count: 450 },
    { stage: 'Completed', count: 380 },
    { stage: 'Accepted', count: 120 },
    { stage: 'Rejected', count: 260 },
  ];

  // 3. Outcome Ratio
  const outcomeData = [
    { name: 'Accepted', value: 120, color: PURPLE_DEEP },
    { name: 'Rejected', value: 260, color: PURPLE_MID },
  ];

  // 4. NEW: Knowledge Base / Quiz Activity Data
  const quizActivityData = [
    { day: 'Mon', completions: 120 },
    { day: 'Tue', completions: 300 },
    { day: 'Wed', completions: 250 },
    { day: 'Thu', completions: 420 },
    { day: 'Fri', completions: 380 },
    { day: 'Sat', completions: 200 },
    { day: 'Sun', completions: 180 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-purple-50/30 min-h-screen">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Overview</h1>
          <p className="text-[#632281] font-bold text-sm uppercase tracking-widest mt-1">Platform Analytics Core</p>
        </div>
        <div className="bg-purple-100 px-6 py-3 rounded-xl shadow-sm border border-purple-100">
          <span className="text-[10px] font-black text-purple-300 uppercase block">Global Reach</span>
          <span className="text-xl font-black text-[#632281]">12,450 Total Visits</span>
        </div>
      </div>

      {/* Row 1: Volume Analysis (Pie Chart) */}
      <div className="bg-gradient-to-r from-purple-200 to-pink-100 p-8 rounded-xl shadow-xl shadow-purple-100/40 border border-purple-50">
        <h3 className="text-xl font-black text-gray-800 mb-2">User Acquisition Volume</h3>
        <p className="text-sm text-purple-500 font-bold mb-4">Distribution of user engagement stages</p>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip 
                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
              />
              <Legend 
                verticalAlign="middle" 
                align="right" 
                layout="vertical"
                iconType="circle"
                wrapperStyle={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11px', paddingLeft: '20px' }}
              />
              <Pie
                data={acquisitionData}
                cx="40%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {acquisitionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <text x="40%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-purple-900 font-black text-xl">
                Users
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Interview Pipeline */}
        <div className="bg-gradient-to-r from-purple-200 to-pink-100 p-8 rounded-xl shadow-xl shadow-purple-100/40 border border-purple-50">
          <h3 className="text-xl font-black text-gray-800 mb-6">Interview Pipeline</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={interviewData}>
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PURPLE_DEEP} stopOpacity={0.5} />
                    <stop offset="95%" stopColor={PURPLE_DEEP} stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={BG_SOFT} />
                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontWeight: 'bold', fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontWeight: 'bold', fill: '#94a3b8' }} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke={PURPLE_DEEP} strokeWidth={4} fill="url(#purpleGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Outcomes, Success Metric, and NEW Knowledge Base Graph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Interview Outcomes Pie */}
          <div className="bg-purple-100 p-6 rounded-xl border border-purple-200 shadow-lg shadow-purple-100/20 flex flex-col items-center">
            <p className="text-[10px] font-black text-purple-400 uppercase mb-4 tracking-tighter">Interview Outcomes</p>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={outcomeData} innerRadius={25} outerRadius={45} paddingAngle={5} dataKey="value">
                    {outcomeData.map((entry, index) => <Cell key={index} fill={entry.color} cornerRadius={10} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex gap-4 text-[9px] font-black uppercase">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#632281]" /> Acc.</span>
              <span className="flex items-center gap-1 text-purple-400"><div className="w-2 h-2 rounded-full bg-[#A855F7]" /> Rej.</span>
            </div>
          </div>

          {/* Success Metric Card */}
          <div className="bg-[#8f66a1] p-6 rounded-xl flex flex-col justify-center text-white">
            <span className="text-purple-200 font-bold uppercase text-[10px] tracking-widest mb-1">Success Metric</span>
            <h4 className="text-4xl font-black italic">2,050</h4>
            <p className="font-bold text-xs leading-tight mt-1">Confirmed Dates Planned</p>
            <div className="mt-6 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[65%] rounded-full" />
            </div>
          </div>

          {/* NEW Knowledge Base Section with Bar Graph */}
          <div className="bg-purple-100 p-6 rounded-xl sm:col-span-2 border border-purple-200 shadow-xl shadow-purple-900/5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-black text-[#632281] uppercase tracking-widest">Knowledge Base</p>
                <h5 className="text-2xl font-black text-gray-800">1,850 <span className="text-xs font-bold text-purple-400">Total Quiz Completions</span></h5>
              </div>
              <div className="px-3 py-1 bg-white rounded-lg text-[#632281] font-black text-sm shadow-sm">
                82% Avg. Score
              </div>
            </div>
            
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quizActivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9D5FF" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 'bold', fill: '#A855F7'}} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f3e8ff'}}
                    contentStyle={{borderRadius: '10px', border: 'none', fontWeight: 'bold'}}
                  />
                  <Bar 
                    dataKey="completions" 
                    fill={PURPLE_DEEP} 
                    radius={[4, 4, 0, 0]} 
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Overview;