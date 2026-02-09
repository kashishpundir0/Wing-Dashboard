import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList, AreaChart, Area
} from 'recharts';
import { ArrowUpRight, Users, Calendar, BookOpen, MousePointer2 } from 'lucide-react';

const Overview = () => {
  const PURPLE_DEEP = "#632281";
  const PURPLE_MID = "#A855F7";
  const PURPLE_LIGHT = "#C084FC";
  const PURPLE_SOFT = "#E9D5FF";

  // Data sets
  const acquisitionData = [
    { name: 'Visits', value: 12450, color: PURPLE_DEEP },
    { name: 'Signups', value: 3200, color: PURPLE_MID },
    { name: 'Quizzes', value: 1850, color: PURPLE_LIGHT },
    { name: 'Dates', value: 2050, color: PURPLE_SOFT },
  ];

  const interviewData = [
    { stage: 'Scheduled', count: 450 },
    { stage: 'Completed', count: 380 },
    { stage: 'Accepted', count: 120 },
    { stage: 'Rejected', count: 260 },
  ];

  const outcomeData = [
    { name: 'Accepted', value: 120, fill: PURPLE_DEEP },
    { name: 'Rejected', value: 260, fill: PURPLE_SOFT },
  ];

  const quizActivityData = [
    { day: 'Mon', completions: 120 },
    { day: 'Tue', completions: 300 },
    { day: 'Wed', completions: 250 },
    { day: 'Thu', completions: 420 },
    { day: 'Fri', completions: 380 },
    { day: 'Sat', completions: 200 },
    { day: 'Sun', completions: 180 },
  ];

  // Helper Component for KPI Cards
  const StatCard = ({ title, value, icon: Icon, trend, subtext }) => (
    <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Icon size={20} className="text-[#632281]" />
        </div>
        <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <ArrowUpRight size={12} /> {trend}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
        <p className="text-[10px] text-gray-400 mt-1 font-medium">{subtext}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen font-sans">
      
      {/* 1. Header & Quick Stats */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-purple-600 font-bold text-xs uppercase tracking-[0.2em]">Real-time Platform Performance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Traffic" value="12,450" icon={MousePointer2} trend="14%" subtext="Visits this month" />
          <StatCard title="New Signups" value="3,200" icon={Users} trend="8%" subtext="25.7% Conversion rate" />
          <StatCard title="Quiz Activity" value="1,850" icon={BookOpen} trend="22%" subtext="82% Avg. score" />
          <StatCard title="Dates Planned" value="2,050" icon={Calendar} trend="18%" subtext="Success milestone" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. Acquisition Breakdown (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
  <div className="flex justify-between items-center mb-8">
    <div>
      <h3 className="text-lg font-black text-gray-800 tracking-tight">User Acquisition Funnel</h3>
      <p className="text-sm text-gray-400 font-medium">Stage-by-stage user drop-off</p>
    </div>
    <div className="text-right">
      <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Primary Metric</span>
    </div>
  </div>
  
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      {/* Removed layout="vertical" to make it stand upright */}
      <BarChart data={acquisitionData} margin={{ top: 25, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
        
        {/* XAxis now shows the names */}
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontWeight: 'bold', fontSize: 12, fill: '#64748b' }} 
        />
        
        {/* YAxis is hidden to keep the clean "funnel" look */}
        <YAxis hide />
        
        <Tooltip 
          cursor={{ fill: '#F3E8FF', opacity: 0.4 }} 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
        />
        
        <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
          {acquisitionData.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
          {/* Added LabelList so numbers are visible at a glance */}
          <LabelList 
            dataKey="value" 
            position="top" 
            style={{ fill: '#632281', fontSize: '12px', fontWeight: '900' }} 
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

        {/* 3. Acceptance Gauge */}
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-gray-800">Interview Success</h3>
            <p className="text-sm text-gray-400 font-medium">Acceptance vs Rejection</p>
          </div>
          
          <div className="h-52 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={outcomeData}
                  innerRadius={65}
                  outerRadius={85}
                  startAngle={180}
                  endAngle={0}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {outcomeData.map((entry, index) => <Cell key={index} fill={entry.fill} cornerRadius={4} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
              <span className="text-3xl font-black text-gray-800">31.5%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Approval Rate</span>
            </div>
          </div>

          <div className="space-y-2">
             <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2 text-xs font-bold text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-[#632281]" /> Accepted
                </span>
                <span className="text-xs font-black">120</span>
             </div>
             <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2 text-xs font-bold text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-[#E9D5FF]" /> Rejected
                </span>
                <span className="text-xs font-black text-gray-400">260</span>
             </div>
          </div>
        </div>

        {/* 4. Interview Pipeline (Trend) */}
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-800 mb-6">Pipeline Volume</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={interviewData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PURPLE_MID} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={PURPLE_MID} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold', fill: '#94A3B8'}} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke={PURPLE_MID} strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Weekly Activity (Knowledge Base) */}
        <div className="lg:col-span-2 bg-[#632281] p-6 rounded-2xl shadow-xl shadow-purple-900/20 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-black">Knowledge Base Activity</h3>
              <p className="text-purple-300 text-sm font-medium">Quiz completions over the last 7 days</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10">
               <p className="text-[10px] uppercase font-bold text-purple-200">Total Weekly</p>
               <p className="text-xl font-black">1,850</p>
            </div>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#E9D5FF'}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{backgroundColor: '#FFF', borderRadius: '8px', color: '#000'}}
                />
                <Bar dataKey="completions" fill="#C084FC" radius={[6, 6, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;