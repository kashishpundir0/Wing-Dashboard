import React, { useMemo } from 'react';
import { 
  Users, UserPlus, CalendarClock, CheckSquare, 
  UserCheck, UserX, HelpCircle, MapPin, Filter
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import GenderChart from '../components/Dashboard/GenderChart';

const Overview = () => {
  // Mock data for regional breakdown
  const regionalData = [
    { location: 'Bengaluru', male: 60, female: 50 },
    { location: 'Mumbai', male: 45, female: 38 },
    { location: 'Delhi', male: 30, female: 42 },
  ];

  const stats = useMemo(() => [
    { label: 'Total Visits', value: '12,450', icon: Users, color: 'text-[#632281]' },
    { label: 'Signed Up', value: '3,200', icon: UserPlus, color: 'text-[#632281]' },
    { label: 'Scheduled Interview', value: '450', icon: CalendarClock, color: 'text-yellow-700' },
    { label: 'Completed Interview', value: '380', icon: CheckSquare, color: 'text-emerald-600' },
    { label: 'Got Accepted', value: '120', icon: UserCheck, color: 'text-emerald-600' }, // Varied color for success
    { label: 'Got Rejected', value: '260', icon: UserX, color: 'text-rose-500' }, // Varied color for "bad" stats
    { label: 'Completed Quiz', value: '1,850', icon: HelpCircle, color: 'text-[#632281]' },
  ], []);

  return (
    <div className="p-2 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard 
            key={i} 
            label={s.label}
            value={s.value}
            icon={s.icon}
            colorClass={s.color}
          />
        ))}
      </div>

      {/* Chart Section */}
      <div className="mt-12">
        <GenderChart 
          maleCount={1800} 
          femaleCount={1400} 
          regionalBreakdown={regionalData} 
        />
      </div>
    </div>
  );
};

export default Overview;