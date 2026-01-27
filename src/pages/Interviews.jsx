import React, { useState } from 'react';
import { 
  Video, 
  X, 
  Heart, 
  MapPin, 
  CheckCircle2, 
} from 'lucide-react';
import { Button } from '../components/Shared/Button';

const Interviews = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const data = [
    { 
        id: 1, 
        name: 'Sarah Jenkins', 
        age: 24,
        time: '10:30 AM', 
        date: '24 Jan', 
        height: "5'7\"", 
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 
        bio: 'Looking for someone who can keep up with my hiking pace and doesn\'t mind a coffee date that turns into dinner.',
        location: 'Manhattan, NY',
        goals: 'Long-term relationship',
        interests: ['Reading', 'Singing', 'Vegan Cooking', 'Photography'],
        lifestyle: { drink: 'Socially', smoke: 'Never', exercise: 'Active' }
    },
    { 
        id: 2, 
        name: 'Michael Ross', 
        age: 28,
        time: '01:00 PM', 
        date: '24 Jan', 
        height: "6'1\"", 
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', 
        bio: 'Architect by day, amateur chef by night. I value deep conversations and a good sense of humor.',
        location: 'Brooklyn, NY',
        goals: 'Life Partner',
        interests: ['Architecture', 'Traveling', 'Dogs'],
        lifestyle: { drink: 'Socially', smoke: 'Occasionally', exercise: 'Gym Rat' }
    },
  ];

  const handleVideoCall = (name) => {
    alert(`Starting Video Verification with ${name}...`);
  };

  return (
    <div className="bg-purple-100 rounded-xl border border-purple-100 shadow-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-purple-300 border-b border-purple-300">
          <tr>
            <th className="px-8 py-6 text-xs font-black text-white uppercase tracking-widest">Candidate</th>
            <th className="px-8 py-6 text-xs font-black text-white uppercase tracking-widest">Interview Slot</th>
            <th className="px-8 py-6 text-xs font-black text-white uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-50">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-purple-50/50 transition-colors">
              <td className="px-8 py-5 flex items-center gap-4">
                <div className="relative">
                    <img src={user.photo} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-100 shadow-sm" alt="" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <p className="font-bold text-gray-800 text-lg">{user.name}, {user.age}</p>
                    <p className="text-xs text-purple-500 font-bold flex items-center gap-1">
                        <MapPin size={10} /> {user.location}
                    </p>
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="bg-purple-50 border border-purple-100 rounded-xl px-3 py-2 inline-block">
                    <p className="text-sm font-bold text-gray-700">{user.date}</p>
                    <p className="text-[10px] text-purple-600 font-black uppercase">{user.time}</p>
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => handleVideoCall(user.name)}
                        className="p-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 shadow-md transition-all active:scale-95"
                    >
                        <Video size={20} />
                    </button>
                    <Button 
                        onClick={() => setSelectedUser(user)} 
                        className="py-2.5 px-6 rounded-2xl bg-purple-500 text-white hover:bg-purple-800 transition-all font-bold text-sm shadow-lg shadow-purple-100"
                    >
                        Review Profile
                    </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed inset-0 bg-purple-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row h-full">
                {/* Left: Image */}
                <div className="md:w-5/12 relative h-64 md:h-auto">
                    <img src={selectedUser.photo} className="w-full h-full object-cover" alt="" />
                    <button 
                        onClick={() => setSelectedUser(null)} 
                        className="absolute top-6 left-6 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Right: Details */}
                <div className="md:w-7/12 p-10 overflow-y-auto max-h-[90vh]">
                    <h2 className="text-4xl font-black text-gray-800">{selectedUser.name}, {selectedUser.age}</h2>
                    <p className="text-purple-600 font-bold flex items-center gap-1 text-sm mt-1 mb-6">
                        <CheckCircle2 size={16} /> Identity Verified
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {Object.entries(selectedUser.lifestyle).slice(0,3).map(([key, val]) => (
                            <div key={key} className="bg-purple-50 border border-purple-100 p-2 rounded-xl text-center">
                                <p className="text-[9px] font-bold text-purple-400 uppercase">{key}</p>
                                <p className="text-xs font-black text-gray-700">{val}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mb-8">
                        <p className="text-xs font-black text-purple-300 uppercase mb-2">Bio</p>
                        <p className="text-gray-600 text-sm italic font-medium">"{selectedUser.bio}"</p>
                    </div>

                    <div className="mb-10">
                        <p className="text-xs font-black text-purple-300 uppercase mb-3">Interests</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedUser.interests.map(i => (
                                <span key={i} className="px-3 py-1 bg-purple-600 text-white rounded-full text-[10px] font-bold">
                                    {i}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* FIXED: High contrast footer buttons */}
                    <div className="mt-10 flex gap-4">
                        <Button 
                            className="flex-1 bg-red-600! text-white! hover:bg-red-700! py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-red-100"
                        >
                            Reject Profile
                        </Button>
                        <Button 
                            className="flex-1 bg-purple-600! text-white! hover:bg-purple-800! py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-purple-200"
                        >
                            Approve
                        </Button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interviews;