import React from 'react';
import { 
  Users, 
  UserPlus, 
  CalendarClock, 
  CheckSquare, 
  UserCheck, 
  UserX, 
  Brain, 
  HelpCircle 
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import GenderChart from '../components/Dashboard/GenderChart';

const Overview = () => {
 
  const stats = [
    { 
        label: 'Total Visits', 
        value: '12,450', 
        icon: Users, 
        color: 'bg-blue-50 text-blue-600' 
    },
    { 
        label: 'Signed Up', 
        value: '3,200', 
        icon: UserPlus, 
        color: 'bg-indigo-50 text-indigo-600' 
    },
    { 
        label: 'Scheduled Interview', 
        value: '450', 
        icon: CalendarClock, 
        color: 'bg-purple-50 text-[#632281]' 
    },
    { 
        label: 'Completed Interview', 
        value: '380', 
        icon: CheckSquare, 
        color: 'bg-purple-600 text-white' 
    },
    { 
        label: 'Got Accepted', 
        value: '120', 
        icon: UserCheck, 
        color: 'bg-emerald-50 text-emerald-600' 
    },
    { 
        label: 'Got Rejected', 
        value: '260', 
        icon: UserX, 
        color: 'bg-red-50 text-red-600' 
    },
    { 
        label: 'Completed Algo', 
        value: '2,100', 
        icon: Brain, 
        color: 'bg-pink-50 text-pink-600' 
    },
    { 
        label: 'Completed Quiz', 
        value: '1,850', 
        icon: HelpCircle, 
        color: 'bg-orange-50 text-orange-600' 
    },
  ];

  return (
    <div className="space-y-10">
      {/* Requirement 1: Stats Grid (8 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Requirement 2: Gender Breakdown Chart */}
      <div className="max-w-4xl">
        <GenderChart maleCount={1800} femaleCount={1400} />
      </div>
    </div>
  );
};

export default Overview;