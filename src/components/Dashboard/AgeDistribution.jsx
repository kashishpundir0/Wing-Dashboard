import React from 'react';
import { Calendar } from 'lucide-react';

const AgeDistribution = ({ ageData }) => (
  <div className="bg-purple-100 p-8 rounded-xl border border-gray-100 shadow-xl">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h3 className="text-xl font-bold text-gray-800">Age Distribution</h3>
        {/* <p className="text-sm text-gray-500">Breakdown by age brackets</p> */}
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs font-bold text-gray-400 uppercase">Avg. Age</span>
        <span className="text-3xl font-black text-[#632281]">{ageData.average}</span>
      </div>
    </div>

    <div className="space-y-6">
      {ageData.distribution.map((group, idx) => (
        <div key={idx}>
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-gray-600">Ages {group.range}</span>
            <span className="text-gray-800">{group.percentage}%</span>
          </div>
          <div className="h-4 bg-purple-50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-300 rounded-full"
              style={{ width: `${group.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AgeDistribution;