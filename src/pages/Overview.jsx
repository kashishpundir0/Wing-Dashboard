import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LabelList
} from 'recharts';
import { ArrowUpRight, Users, Calendar, MousePointer2, ClipboardCheck, CheckCircle, XCircle } from 'lucide-react';

const Overview = () => {
  const THEME_DARK = "#1F1F2E";
  const THEME_BG = "#F5F6FA";

  // Data Set 1: User Acquisition Journey
  const acquisitionData = [
    { name: 'Visits', value: 12450, color: THEME_DARK },
    { name: 'Signups', value: 3200, color: '#4F46E5' },
    { name: 'Interviews', value: 450, color: '#94A3B8' },
    { name: 'Dates', value: 2050, color: '#CBD5E1' },
  ];

  // Data Set 2: The Interview Pipeline (Workflow progression)
  const pipelineData = [
    { stage: 'Scheduled', count: 450 },
    { stage: 'Completed', count: 380 },
    { stage: 'Accepted', count: 120 },
    { stage: 'Rejected', count: 260 },
  ];

  // Data Set 3: Success vs Rejection
  const outcomeData = [
    { name: 'Accepted', value: 120, fill: THEME_DARK },
    { name: 'Rejected', value: 260, fill: '#E2E8F0' },
  ];

  const StatCard = ({ title, value, icon: Icon, trend, subtext, isHero }) => (
    <div className={`p-8 rounded-[2.5rem] transition-all flex flex-col justify-between h-56 ${isHero
      ? 'bg-[#1F1F2E] text-white shadow-2xl shadow-[#1F1F2E]/30'
      : 'bg-white text-[#1F1F2E] border border-slate-100 shadow-sm'
      }`}>
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${isHero ? 'bg-white/10' : 'bg-[#F5F6FA]'}`}>
          <Icon size={22} className={isHero ? 'text-white' : 'text-[#1F1F2E]'} />
        </div>
        <span className={`flex items-center text-[11px] font-bold px-3 py-1.5 rounded-full ${isHero ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
          }`}>
          <ArrowUpRight size={14} className="mr-1" /> {trend}
        </span>
      </div>
      <div>
        <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60`}>{title}</h3>
        <p className="text-4xl font-black tracking-tight">{value}</p>
        <p className={`text-[10px] mt-2 font-bold uppercase tracking-widest opacity-40`}>{subtext}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F6FA] w-full md:p-10 space-y-10 overflow-x-hidden">

      {/* 1. KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Traffic" value="12,450" icon={MousePointer2} trend="14%" subtext="Visits this month" isHero={true} />
        <StatCard title="New Signups" value="3,200" icon={Users} trend="8%" subtext="User growth" />
        <StatCard title="Scheduled Interviews" value="450" icon={ClipboardCheck} trend="12%" subtext="Pending sessions" />
        <StatCard title="Dates Planned" value="2,050" icon={Calendar} trend="18%" subtext="Matchmaking success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 2. User Acquisition Funnel */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold text-[#1F1F2E] tracking-tight">Acquisition Funnel</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">Stage-by-stage progression</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={acquisitionData} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontWeight: '700', fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={55}>
                  {acquisitionData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  <LabelList dataKey="value" position="top" style={{ fill: THEME_DARK, fontSize: '12px', fontWeight: '900' }} offset={15} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Interview Success Ring */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#1F1F2E] tracking-tight">Interview Success</h3>
            <p className="text-sm text-slate-400 font-medium mt-1">Acceptance Ratio</p>
          </div>
          <div className="h-60 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={outcomeData} innerRadius={75} outerRadius={95} startAngle={180} endAngle={0} paddingAngle={8} dataKey="value" stroke="none">
                  {outcomeData.map((entry, index) => <Cell key={index} fill={entry.fill} cornerRadius={10} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
              <span className="text-4xl font-black text-[#1F1F2E]">31.5%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Rate</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-[#F5F6FA] rounded-2xl">
              <span className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <CheckCircle size={16} className="text-[#1F1F2E]" /> Accepted
              </span>
              <span className="text-sm font-bold text-[#1F1F2E]">120</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-[#F5F6FA] rounded-2xl opacity-50">
              <span className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <XCircle size={16} className="text-slate-400" /> Rejected
              </span>
              <span className="text-sm font-bold text-slate-400">260</span>
            </div>
          </div>
        </div>

        {/* 4. The Interview Pipeline Trend (Bottom Wide Chart) */}
        <div className="lg:col-span-3 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#1F1F2E] tracking-tight">Pipeline Volume</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">Workflow progression analytics</p>
            </div>
          </div>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pipelineData}>
                <defs>
                  <linearGradient id="colorDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={THEME_DARK} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={THEME_DARK} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: '700', fill: '#94a3b8' }} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="count" stroke={THEME_DARK} strokeWidth={4} fillOpacity={1} fill="url(#colorDark)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;