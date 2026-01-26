import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';

const PlannedDates = () => {
  const dates = [
    { id: 1, restaurant: "The Grand Italian", location: "Downtown", time: "07:00 PM", date: "Oct 28", user1: "John", user2: "Sarah", status: "Confirmed" },
    { id: 2, restaurant: "Sushi Zen", location: "West End", time: "08:30 PM", date: "Oct 30", user1: "Mike", user2: "Jessica", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl text-[#632281] shadow-sm"><Calendar /></div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">14 Dates Planned</h2>
            <p className="text-sm text-[#632281]">Upcoming this week</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dates.map((d) => (
          <div key={d.id} className="bg-white p-6 rounded-4xl border border-gray-50 shadow-sm relative overflow-hidden group hover:border-[#632281] transition-all">
            <div className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-bold uppercase rounded-bl-xl ${d.status === 'Confirmed' ? 'bg-green-500 text-white' : 'bg-orange-400 text-white'}`}>
              {d.status}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{d.restaurant}</h3>
            <p className="text-gray-400 text-sm flex items-center gap-1 mb-4"><MapPin size={14} /> {d.location}</p>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#632281] border-2 border-white flex items-center justify-center text-[10px] text-white">U1</div>
                <div className="w-8 h-8 rounded-full bg-purple-300 border-2 border-white flex items-center justify-center text-[10px] text-white">U2</div>
              </div>
              <p className="text-xs font-bold text-gray-700">{d.user1} & {d.user2}</p>
            </div>

            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-gray-400">{d.date}</span>
              <span className="text-[#632281]">{d.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlannedDates;