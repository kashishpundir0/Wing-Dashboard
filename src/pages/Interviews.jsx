import React, { useState, useEffect } from 'react';
import { 
  Video, X, MapPin, CheckCircle2, MessageSquare, 
  Send, ChevronRight, Ruler, Target, Bell, AlertCircle
} from 'lucide-react';
import { Button } from '../components/Shared/Button';

// --- Responsive Toast Component ---
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    // Responsive positioning: top-4 on mobile, top-10 on desktop
    <div className="fixed top-4 right-4 left-4 md:left-auto md:top-10 md:right-10 z-[100] animate-in slide-in-from-top-10 md:slide-in-from-right-10 duration-300">
      <div className={`flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-2xl border ${
        type === 'success' 
          ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
          : 'bg-red-50 border-red-100 text-red-700'
      }`}>
        {type === 'success' ? <CheckCircle2 size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
        <p className="font-bold text-sm">{message}</p>
        <button onClick={onClose} className="ml-auto opacity-50 hover:opacity-100">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

const Interviews = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [reason, setReason] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotify = (msg, type = 'success') => {
    setNotification({ msg, type });
  };

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
  ];

  const handleApprove = () => {
    showNotify(`${selectedUser.name}'s profile has been approved!`);
    setSelectedUser(null);
  };

  const handleRejectSubmit = () => {
    showNotify(`Profile Rejected. Reason sent to ${selectedUser.name}`, 'error');
    setSelectedUser(null);
    setShowRejectReason(false);
    setReason('');
  };

  return (
    <div className="relative p-2 md:p-0">
      {notification && (
        <Toast 
          message={notification.msg} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      <div className="bg-purple-100 rounded-2xl min-h-screen border border-purple-100 shadow-xl overflow-hidden">
        
        {/* DESKTOP TABLE VIEW (Hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-[#632281] border-b border-purple-300">
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
                            <img src={user.photo} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-100" alt="" />
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
                        <div className="bg-white border border-purple-100 rounded-xl px-3 py-2 inline-block shadow-sm">
                            <p className="text-sm font-bold text-gray-700">{user.date}</p>
                            <p className="text-[10px] text-[#632281] font-black uppercase">{user.time}</p>
                        </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3">
                            <button onClick={() => showNotify('Joining video...')} className="p-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 shadow-md">
                                <Video size={20} />
                            </button>
                            <Button onClick={() => setSelectedUser(user)} className="py-2.5 px-6 rounded-2xl bg-[#632281] text-white hover:bg-purple-900 font-bold text-sm">
                                Review
                            </Button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* MOBILE CARD VIEW (Visible only on mobile) */}
        <div className="md:hidden p-4 space-y-4">
            <h2 className="text-[#632281] font-black uppercase text-xs tracking-widest mb-4">Pending Interviews</h2>
            {data.map((user) => (
                <div key={user.id} className="bg-white rounded-3xl p-5 shadow-sm border border-purple-200">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={user.photo} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                        <div className="flex-1">
                            <p className="font-black text-gray-800 text-lg leading-none mb-1">{user.name}, {user.age}</p>
                            <p className="text-xs text-purple-500 font-bold flex items-center gap-1">
                                <MapPin size={12} /> {user.location}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-black text-[#632281] uppercase">{user.time}</p>
                            <p className="text-[10px] text-gray-400 font-bold">{user.date}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => showNotify('Joining video...')} className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-2xl font-bold text-sm shadow-md">
                            <Video size={18} /> Join
                        </button>
                        <button onClick={() => setSelectedUser(user)} className="flex-[2] bg-[#632281] text-white rounded-2xl font-black text-xs uppercase tracking-widest">
                            Review Profile
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* COMPLETE PROFILE MODAL */}
        {selectedUser && (
          <div className="fixed inset-0 bg-purple-950/60 backdrop-blur-md z-50 flex items-center justify-center p-2 md:p-4">
            <div className="bg-white w-full max-w-4xl rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[90vh] md:max-h-[95vh] flex flex-col md:flex-row">
                  
                  {/* Left: Image (Adjusted height for mobile) */}
                  <div className="w-full md:w-1/2 relative h-64 md:h-auto shrink-0">
                      <img src={selectedUser.photo} className="w-full h-full object-cover" alt="" />
                      <button onClick={() => {setSelectedUser(null); setShowRejectReason(false)}} className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white">
                          <X size={20} />
                      </button>
                  </div>

                  {/* Right: Scrollable Details */}
                  <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto bg-white">
                      {!showRejectReason ? (
                        <>
                          <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-6">
                              <div>
                                  <h2 className="text-3xl md:text-4xl font-black text-gray-800">{selectedUser.name}, {selectedUser.age}</h2>
                                  <p className="text-purple-600 font-bold flex items-center gap-1 text-sm mt-1">
                                      <CheckCircle2 size={16} /> Identity Verified
                                  </p>
                              </div>
                              <div className="md:text-right text-gray-400">
                                  <p className="text-[10px] font-black uppercase tracking-widest">Height</p>
                                  <p className="text-lg font-bold text-gray-700 flex items-center gap-1 md:justify-end"><Ruler size={14}/> {selectedUser.height}</p>
                              </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                              {Object.entries(selectedUser.lifestyle).map(([key, val]) => (
                                  <div key={key} className="bg-purple-50 border border-purple-100 p-2 rounded-xl text-center">
                                      <p className="text-[9px] font-black text-purple-400 uppercase">{key}</p>
                                      <p className="text-xs font-bold text-gray-700 truncate">{val}</p>
                                  </div>
                              ))}
                          </div>

                          <div className="mb-8">
                              <p className="text-xs font-black text-purple-300 uppercase mb-2 tracking-widest">Bio</p>
                              <p className="text-gray-600 text-sm leading-relaxed italic">"{selectedUser.bio}"</p>
                          </div>

                          <div className="mb-10">
                              <p className="text-xs font-black text-purple-300 uppercase mb-3 tracking-widest">Interests</p>
                              <div className="flex flex-wrap gap-2">
                                  {selectedUser.interests.map(i => (
                                      <span key={i} className="px-3 py-1 bg-purple-100 text-[#632281] rounded-full text-[10px] font-black uppercase">
                                          {i}
                                      </span>
                                  ))}
                              </div>
                          </div>

                          {/* Sticky/Fixed Footer for actions on mobile */}
                          <div className="flex gap-3 md:gap-4 mt-auto">
                              <button 
                                  onClick={() => setShowRejectReason(true)}
                                  className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-red-100"
                              >
                                  Reject
                              </button>
                              <button 
                                onClick={handleApprove}
                                className="flex-1 bg-[#632281] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-purple-200"
                              >
                                  Approve
                              </button>
                          </div>
                        </>
                      ) : (
                        /* REJECTION VIEW */
                        <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
                           <button onClick={() => setShowRejectReason(false)} className="mb-6 flex items-center gap-2 text-gray-400 font-bold text-sm">
                               <ChevronRight className="rotate-180" size={16}/> Back
                           </button>
                           <h3 className="text-red-600 font-black text-xl mb-4">Reason for Rejection</h3>
                           <textarea 
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              placeholder="Why is this profile being rejected?"
                              className="w-full h-32 md:h-48 p-4 border-2 border-purple-50 rounded-2xl focus:border-red-200 outline-none text-sm font-medium"
                           />
                           <button 
                              disabled={!reason}
                              onClick={handleRejectSubmit}
                              className="mt-6 w-full bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                           >
                              <Send size={16}/> Confirm Rejection
                           </button>
                        </div>
                      )}
                  </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;