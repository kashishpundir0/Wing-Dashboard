import React, { useState, useEffect } from 'react';
import { 
  Video, X, MapPin, CheckCircle2, Ruler, 
  Phone, Star, Calendar, Clock, Briefcase, 
  Instagram, Heart, User, Layers, AlertCircle, MessageSquare
} from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-10 right-10 z-[110] animate-in slide-in-from-right-10 duration-300">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
        type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
      }`}>
        {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
        <p className="font-bold text-sm">{message}</p>
      </div>
    </div>
  );
};

const Interviews = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // New States for Rejection
  const [rejectingUser, setRejectingUser] = useState(null);
  const [rejectionComment, setRejectionComment] = useState('');

  const showNotify = (msg, type = 'success') => {
    setNotification({ msg, type });
  };

  const handleConfirmReject = () => {
    if (!rejectionComment.trim()) {
        showNotify('Please provide a reason for rejection', 'error');
        return;
    }
    // Logic to handle rejection (API call, etc.)
    console.log(`User ${rejectingUser.name} rejected. Reason: ${rejectionComment}`);
    
    showNotify(`Rejected ${rejectingUser.name}`, 'error');
    setRejectingUser(null);
    setRejectionComment('');
  };

  const data = [
    { 
        id: 1, 
        name: 'Jessica Parker', 
        age: 23,
        jobTitle: 'Senior Software Developer',
        compatibility: '94%',
        time: '10:30 AM', 
        date: '24 Jan', 
        height: "5'7\"", 
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800', 
        gallery: [
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        ],
        location: 'Chicago, IL, United States',
        distance: '1.2 km away',
        aboutMe: ['Bengaluru, India', 'Vegetarian', 'Hindu', 'Occasionally 🍸', 'Never 🚬', 'Yoga Enthusiast'],
        story: 'I am a creative soul who loves blending technology with art. My name is Jessica and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading sci-fi and hiking on weekends.',
        interests: ['Tech', 'Hiking', 'Art', 'Music', 'Cooking', 'Travel'],
        lifestyle: { drink: 'Socially', smoke: 'Never', exercise: 'Daily' }
    },
  ];

  return (
    <div className="relative p-4 md:p-6 bg-gray-50 min-h-screen">
      {notification && <Toast message={notification.msg} type={notification.type} onClose={() => setNotification(null)} />}

      <div className="mx-auto">
        <div className="bg-white rounded-xl shadow-xl shadow-purple-100/50 border border-purple-50 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#632281]">
                    <tr>
                        <th className="px-10 py-6 text-[11px] font-black text-purple-100 uppercase tracking-[0.2em]">Candidate</th>
                        <th className="px-10 py-6 text-[11px] font-black text-purple-100 uppercase tracking-[0.2em]">Schedule</th>
                        <th className="px-10 py-6 text-[11px] font-black text-purple-100 uppercase tracking-[0.2em] text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.map((user) => (
                    <tr key={user.id} className="group hover:bg-purple-50/30 transition-all duration-300">
                        <td className="px-10 py-6 cursor-pointer" onClick={() => setSelectedUser(user)}>
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <img src={user.photo} className="w-16 h-16 rounded-[1.5rem] object-cover ring-4 ring-purple-50 group-hover:ring-purple-200 shadow-md" alt="" />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
                                </div>
                                <div>
                                    <p className="font-black text-gray-800 text-xl group-hover:text-[#632281] transition-colors">{user.name}, {user.age}</p>
                                    <p className="text-xs text-gray-400 font-bold flex items-center gap-1 mt-0.5"><MapPin size={12} className="text-purple-400" /> {user.location}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-10 py-6">
                            <div className="flex items-center gap-3 bg-gray-50 w-fit px-4 py-2 rounded-2xl border border-gray-100">
                                <Calendar size={16} className="text-[#632281]" />
                                <div>
                                    <p className="text-sm font-black text-gray-700 leading-none">{user.date}</p>
                                    <p className="text-[10px] text-[#632281] font-black uppercase mt-1">{user.time}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => showNotify('Joining Video...')} className="p-3.5 bg-green-500 text-white rounded-2xl hover:bg-green-600 shadow-lg shadow-green-100 transition-transform hover:-translate-y-1">
                                    <Video size={20} />
                                </button>
                                
                                {/* REJECT BUTTON: Now opens rejection modal */}
                                <button 
                                    onClick={() => setRejectingUser(user)} 
                                    className="px-6 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-100 font-bold text-sm hover:bg-red-100 transition-all"
                                >
                                    Reject
                                </button>
                                
                                <button onClick={() => showNotify('Profile Approved')} className="px-6 py-3 rounded-2xl bg-[#632281] text-white font-bold text-sm hover:bg-purple-900 shadow-lg shadow-purple-100 transition-all hover:-translate-y-1">
                                    Approve
                                </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* REJECTION COMMENT MODAL */}
        {rejectingUser && (
            <div className="fixed inset-0 bg-[#1a0b2e]/60 backdrop-blur-md z-[120] flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-purple-100 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Rejection Reason</h3>
                                <p className="text-xs text-gray-400 font-bold">Candidate: {rejectingUser.name}</p>
                            </div>
                        </div>
                        <button onClick={() => setRejectingUser(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    <textarea 
                        autoFocus
                        value={rejectionComment}
                        onChange={(e) => setRejectionComment(e.target.value)}
                        placeholder="Please provide details on why this profile was rejected..."
                        className="w-full h-40 bg-gray-50 border border-gray-100 rounded-[1.5rem] p-5 text-gray-700 font-medium placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-100 focus:bg-white transition-all resize-none"
                    />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <button 
                            onClick={() => setRejectingUser(null)}
                            className="py-4 rounded-2xl bg-gray-50 text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleConfirmReject}
                            className="py-4 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-100 transition-all active:scale-95"
                        >
                            Confirm Rejection
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* PRE-EXISTING PROFILE MODAL CODE ... */}
         {selectedUser && (
          <div className="fixed inset-0 bg-[#1a0b2e]/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl rounded-[3.5rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative animate-in zoom-in-95 duration-500 max-h-[92vh] flex flex-col md:flex-row border border-white/20">
                  
                  {/* LEFT COLUMN: VISUALS (40% Width) */}
                  <div className="w-full md:w-[40%] relative bg-gray-900 flex flex-col overflow-hidden">
                      <img src={selectedUser.photo} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#632281] via-transparent to-black/30" />
                      
                      {/* Top Controls */}
                      <div className="relative z-10 p-8 flex justify-between">
                        <button onClick={() => setSelectedUser(null)} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white transition-all">
                            <X size={24} />
                        </button>
                        <div className="flex gap-2">
                            <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white transition-all">
                                <Instagram size={20} />
                            </button>
                        </div>
                      </div>

                      {/* Floating Identity Info */}
                      <div className="mt-auto relative z-10 p-10 space-y-4">
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] inline-block">
                              <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Compatibility</p>
                              <p className="text-white text-4xl font-black">{selectedUser.compatibility}</p>
                          </div>
                          <div>
                            <h2 className="text-white text-5xl font-black">{selectedUser.name}</h2>
                            <p className="text-purple-200 text-xl font-bold">{selectedUser.age} Years Old</p>
                          </div>
                      </div>
                  </div>

                  {/* RIGHT COLUMN: DETAILS (60% Width) */}
                  <div className="w-full md:w-[60%] bg-white overflow-y-auto custom-scrollbar flex flex-col">
                      <div className="p-10 md:p-14 space-y-12">
                          
                          {/* Basic Quick Stats */}
                          <div className="grid grid-cols-3 gap-6">
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#632281]"><Briefcase size={20}/></div>
                                  <div>
                                      <p className="text-[10px] font-black text-gray-400 uppercase">Career</p>
                                      <p className="text-sm font-bold text-gray-800 truncate">{selectedUser.jobTitle}</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#632281]"><Ruler size={20}/></div>
                                  <div>
                                      <p className="text-[10px] font-black text-gray-400 uppercase">Height</p>
                                      <p className="text-sm font-bold text-gray-800">{selectedUser.height}</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#632281]"><MapPin size={20}/></div>
                                  <div>
                                      <p className="text-[10px] font-black text-gray-400 uppercase">Distance</p>
                                      <p className="text-sm font-bold text-gray-800">{selectedUser.distance}</p>
                                  </div>
                              </div>
                          </div>

                          {/* My Story Section */}
                          <section>
                              <div className="flex items-center gap-3 mb-4">
                                  <div className="h-px flex-1 bg-gray-100"></div>
                                  <p className="text-[11px] font-black text-purple-300 uppercase tracking-widest">Profile Story</p>
                                  <div className="h-px flex-1 bg-gray-100"></div>
                              </div>
                              <p className="text-gray-600 text-lg leading-relaxed font-medium italic text-center px-6">
                                  "{selectedUser.story}"
                              </p>
                          </section>

                          {/* Attribute Tags */}
                          <section className="space-y-4">
                              <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                  <User size={14} className="text-[#632281]" /> Personal Attributes
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                  {selectedUser.aboutMe.map(tag => (
                                      <span key={tag} className="px-5 py-2.5 bg-gray-50 text-gray-600 rounded-2xl text-[13px] font-bold border border-gray-100 hover:border-purple-200 transition-colors">
                                          {tag}
                                      </span>
                                  ))}
                              </div>
                          </section>

                          {/* Interests Section */}
                          <section className="space-y-4">
                              <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                  <Heart size={14} className="text-[#632281]" /> Interests & Hobbies
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                  {selectedUser.interests.map(i => (
                                      <span key={i} className="px-6 py-3 bg-purple-50/50 text-[#632281] rounded-2xl text-[13px] font-black flex items-center gap-2 border border-purple-100 shadow-sm">
                                          <Star size={14} className="text-orange-400" fill="currentColor" /> {i}
                                      </span>
                                  ))}
                              </div>
                          </section>

                          {/* Gallery Grid */}
                          <section className="space-y-4">
                              <div className="flex justify-between items-center">
                                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                      <Layers size={14} className="text-[#632281]" /> Gallery Photos
                                  </h4>
                                  <button className="text-[#632281] text-[10px] font-black uppercase hover:underline">View All Images</button>
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                  {selectedUser.gallery.map((img, idx) => (
                                      <div key={idx} className="group overflow-hidden rounded-3xl h-32 md:h-40 bg-gray-100 border border-gray-100 shadow-sm">
                                          <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer" alt="" />
                                      </div>
                                  ))}
                              </div>
                          </section>
                      </div>

                      {/* Sticky Profile Footer: Close Only */}
                      <div className="mt-auto p-10 bg-gray-50/50 border-t border-gray-100 flex justify-center">
                          <button 
                            onClick={() => setSelectedUser(null)}
                            className="px-12 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-sm hover:bg-gray-100 transition-all active:scale-95"
                          >
                              Close Profile Review
                          </button>
                      </div>
                  </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;