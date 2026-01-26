import React, { useState } from 'react';
import { Button } from '../components/Shared/Button';

const Interviews = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const data = [
    { id: 1, name: 'Sarah Jenkins', time: '10:30 AM', date: '24 Jan', height: "5'7", photo: 'https://i.pravatar.cc/150?u=sarah', bio: 'Love hiking and morning coffee.' },
    { id: 2, name: 'Michael Ross', time: '01:00 PM', date: '24 Jan', height: "6'1", photo: 'https://i.pravatar.cc/150?u=mike', bio: 'Architecture enthusiast.' },
  ];

  return (
    <div className="bg-white rounded-4xl border border-gray-50 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 border-b border-gray-100">
          <tr>
            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase">User</th>
            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase">Scheduled Time</th>
            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-purple-50/30 transition-colors">
              <td className="px-8 py-5 flex items-center gap-4">
                <img src={user.photo} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-50" />
                <div>
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400">ID: #USR-{user.id}</p>
                </div>
              </td>
              <td className="px-8 py-5 font-bold text-[#632281]">{user.date} • {user.time}</td>
              <td className="px-8 py-5 text-right">
                <Button onClick={() => setSelectedUser(user)} variant="outline" className="py-1.5 px-4 text-xs">View Profile</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="h-40 bg-[#632281] relative">
                <button onClick={() => setSelectedUser(null)} className="absolute top-6 right-6 text-white text-2xl font-bold">&times;</button>
                <img src={selectedUser.photo} className="absolute -bottom-10 left-10 w-28 h-28 rounded-3xl border-4 border-white shadow-xl object-cover" />
            </div>
            <div className="pt-16 pb-10 px-10">
                <h2 className="text-2xl font-black text-gray-800">{selectedUser.name}</h2>
                <div className="mt-6 flex gap-10">
                    <div><p className="text-[10px] font-bold text-gray-400 uppercase">Height</p><p className="text-lg font-bold text-[#632281]">{selectedUser.height} Inc</p></div>
                    <div><p className="text-[10px] font-bold text-gray-400 uppercase">Status</p><p className="text-lg font-bold text-green-500">Verified</p></div>
                </div>
                <div className="mt-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">About User</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{selectedUser.bio}</p>
                </div>
                <div className="mt-8 flex gap-3">
                    <Button className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 border-none">Reject</Button>
                    <Button className="flex-1">Accept</Button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Interviews;