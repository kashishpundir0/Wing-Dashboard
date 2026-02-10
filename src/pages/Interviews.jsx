import React, { useState, useEffect } from 'react';
import { 
  Video, X, MapPin, CheckCircle2, Ruler, 
  Phone, Star, Calendar as CalendarIcon, Clock, Briefcase, 
  Instagram, Heart, User, Layers, AlertCircle, MessageSquare,
  ShieldCheck, Wine, Cigarette, Dumbbell, UserCheck, Filter
} from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-10 right-10 z-[110] animate-in slide-in-from-right-10 duration-300">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
        type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
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
  const [selectedDate, setSelectedDate] = useState('All'); // Default to All
  
  const [rejectingUser, setRejectingUser] = useState(null);
  const [rejectionComment, setRejectionComment] = useState('');

  const showNotify = (msg, type = 'success') => {
    setNotification({ msg, type });
  };

  const handleConfirmReject = () => {
    if (!rejectionComment.trim()) {
        showNotify('Reason required', 'error');
        return;
    }
    showNotify(`Rejected ${rejectingUser.name}`, 'error');
    setRejectingUser(null);
    setRejectionComment('');
  };

  const quickDates = ['24 Jan', '25 Jan', '26 Jan'];

  const data = [
    { 
        id: 1, 
        name: 'Jessica Parker', 
        interviewer: 'Sarah Jenkins',
        age: 23,
        jobTitle: 'Senior Software Developer',
        compatibility: '94%',
        time: '10:30 AM', 
        date: '24 Jan', 
        height: "5'7\"", 
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800', 
        gallery: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400'],
        location: 'Chicago, IL, US',
        distance: '1.2 km away',
        aboutMe: ['Bengaluru, India', 'Vegetarian', 'Yoga Enthusiast'],
        story: 'I am a creative soul who loves blending technology with art.',
        interests: ['Tech', 'Hiking', 'Art'],
        lifestyle: { drink: 'Socially', smoke: 'Never', exercise: 'Daily' }
    },
    { 
        id: 2, 
        name: 'Michael Chen', 
        interviewer: 'David Miller',
        age: 27,
        jobTitle: 'Product Designer',
        compatibility: '88%',
        time: '02:00 PM', 
        date: '25 Jan', 
        height: "6'0\"", 
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800', 
        gallery: [],
        location: 'New York, NY',
        distance: '3.5 km away',
        aboutMe: ['Non-smoker', 'Fitness Freak'],
        story: 'Passionate about minimal design and coffee.',
        interests: ['Design', 'Coffee'],
        lifestyle: { drink: 'Never', smoke: 'Never', exercise: 'Daily' }
    }
  ];

  // LOGIC: Filter by All or specific date
  const filteredData = selectedDate === 'All' 
    ? data 
    : data.filter(item => item.date === selectedDate);

  const handleCustomDateChange = (e) => {
    const val = e.target.value; // Format: YYYY-MM-DD
    if (val) {
        // Converting YYYY-MM-DD to "DD MMM" format for our mock data comparison
        const dateObj = new Date(val);
        const formatted = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        setSelectedDate(formatted);
    }
  };

  return (
   <div className="relative md:pt-4 md:pb-10 bg-slate-50/50 min-h-screen space-y-8">
      {notification && <Toast message={notification.msg} type={notification.type} onClose={() => setNotification(null)} />}

      {/* Enhanced Header & Multi-Filter Bar */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Interview Pipeline</h1>
          <p className="text-indigo-600 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Daily Session Management</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          {/* Option 1: All */}
          <button 
            onClick={() => setSelectedDate('All')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              selectedDate === 'All' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            All Sessions
          </button>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

          {/* Option 2: Quick Dates */}
          <div className="flex gap-1">
            {quickDates.map(date => (
                <button 
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedDate === date ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                }`}
                >
                {date}
                </button>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

          {/* Option 3: Calendar Selector */}
          <div className="relative flex items-center group">
              <CalendarIcon size={16} className={`absolute left-4 pointer-events-none transition-colors ${selectedDate !== 'All' && !quickDates.includes(selectedDate) ? 'text-indigo-600' : 'text-slate-400'}`} />
              <input 
                type="date" 
                onChange={handleCustomDateChange}
                className={`pl-11 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer ${selectedDate !== 'All' && !quickDates.includes(selectedDate) ? 'border-indigo-200 text-indigo-700' : 'text-slate-500'}`}
              />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
          <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200">
                  <tr>
                      <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Candidate</th>
                      <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Interviewer</th>
                      <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Schedule</th>
                      <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? filteredData.map((user) => (
                    <tr key={user.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                        <td className="px-8 py-6 cursor-pointer" onClick={() => setSelectedUser(user)}>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img src={user.photo} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-indigo-400 transition-all shadow-md" alt="" />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{user.name}, {user.age}</p>
                                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5"><MapPin size={12} className="text-indigo-400" /> {user.location}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-3 bg-blue-50/50 w-fit px-4 py-2 rounded-xl border border-blue-100">
                                <UserCheck size={16} className="text-blue-600" />
                                <span className="text-sm font-bold text-blue-900">{user.interviewer}</span>
                            </div>
                        </td>
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                                <CalendarIcon size={16} className="text-indigo-500" />
                                <div>
                                    <p className="text-sm font-bold text-slate-700">{user.date}</p>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{user.time}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2.5">
                                <button onClick={() => showNotify('Joining Video...')} className="p-3 bg-gradient-to-br from-cyan-500 to-emerald-500 text-white rounded-xl shadow-lg shadow-cyan-100 hover:-translate-y-0.5 transition-all">
                                    <Video size={18} />
                                </button>
                                <button onClick={() => setRejectingUser(user)} className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-500 hover:text-white transition-all">
                                    Reject
                                </button>
                                <button onClick={() => showNotify('Approved')} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-slate-200">
                                    Approve
                                </button>
                            </div>
                        </td>
                    </tr>
                    )) : (
                        <tr>
                            <td colSpan="4" className="py-24 text-center">
                                <Filter size={40} className="mx-auto text-slate-200 mb-3" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No sessions found for {selectedDate}.</p>
                            </td>
                        </tr>
                    )}
              </tbody>
          </table>
      </div>

      {/* Modal - Rejection (Structure Kept Same, Styling Updated) */}
      {rejectingUser && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[120] flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-rose-50 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Rejection Reason</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{rejectingUser.name}</p>
                            </div>
                        </div>
                        <button onClick={() => setRejectingUser(null)}><X size={20} className="text-slate-400" /></button>
                    </div>

                    <textarea 
                        autoFocus
                        value={rejectionComment}
                        onChange={(e) => setRejectionComment(e.target.value)}
                        placeholder="Detail why this profile was rejected..."
                        className="w-full h-40 bg-slate-50 border border-slate-100 rounded-[1.5rem] p-5 text-slate-700 font-medium focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all resize-none"
                    />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <button onClick={() => setRejectingUser(null)} className="py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold text-xs uppercase hover:bg-slate-100">Cancel</button>
                        <button onClick={handleConfirmReject} className="py-4 rounded-2xl bg-rose-600 text-white font-bold text-xs uppercase shadow-lg shadow-rose-100">Reject</button>
                    </div>
                </div>
            </div>
        )}

      {/* Profile Review Modal (Full Information Included) */}
      {selectedUser && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-6xl rounded-[3.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500 max-h-[95vh] flex flex-col md:flex-row border border-white/20">
                  
                  {/* LEFT COLUMN */}
                  <div className="w-full md:w-[40%] relative bg-slate-900 flex flex-col overflow-hidden">
                      <img src={selectedUser.photo} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
                      <div className="relative z-10 p-8 flex justify-between">
                        <button onClick={() => setSelectedUser(null)} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white transition-all"><X size={24} /></button>
                      </div>
                      <div className="mt-auto relative z-10 p-10 space-y-4">
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] inline-block text-white">
                              <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Compatibility</p>
                              <p className="text-white text-4xl font-black">{selectedUser.compatibility}</p>
                          </div>
                          <div>
                            <h2 className="text-white text-5xl font-black tracking-tight">{selectedUser.name}</h2>
                            <p className="text-indigo-300 text-xl font-bold uppercase tracking-widest">{selectedUser.age} Years Old</p>
                          </div>
                      </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="w-full md:w-[60%] bg-white overflow-y-auto custom-scrollbar flex flex-col">
                      <div className="p-10 md:p-14 space-y-12">
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                              <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Career</p>
                                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm"><Briefcase size={16} className="text-indigo-500"/> {selectedUser.jobTitle}</div>
                              </div>
                              <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Height</p>
                                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm"><Ruler size={16} className="text-emerald-500"/> {selectedUser.height}</div>
                              </div>
                              <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distance</p>
                                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm"><MapPin size={16} className="text-rose-500"/> {selectedUser.distance}</div>
                              </div>
                              <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interviewer</p>
                                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm"><ShieldCheck size={16} className="text-blue-500"/> {selectedUser.interviewer}</div>
                              </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-xl shadow-sm"><Wine size={16} className="text-rose-400"/></div>
                                  <div><p className="text-[9px] font-black text-slate-400 uppercase">Drink</p><p className="text-xs font-bold text-slate-700">{selectedUser.lifestyle.drink}</p></div>
                              </div>
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-xl shadow-sm"><Cigarette size={16} className="text-slate-400"/></div>
                                  <div><p className="text-[9px] font-black text-slate-400 uppercase">Smoke</p><p className="text-xs font-bold text-slate-700">{selectedUser.lifestyle.smoke}</p></div>
                              </div>
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-xl shadow-sm"><Dumbbell size={16} className="text-emerald-500"/></div>
                                  <div><p className="text-[9px] font-black text-slate-400 uppercase">Exercise</p><p className="text-xs font-bold text-slate-700">{selectedUser.lifestyle.exercise}</p></div>
                              </div>
                          </div>

                          <section>
                              <div className="flex items-center gap-3 mb-6"><p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em]">Story</p><div className="h-px flex-1 bg-slate-100"></div></div>
                              <p className="text-slate-600 text-lg leading-relaxed font-medium italic text-center px-6">"{selectedUser.story}"</p>
                          </section>

                          <section className="space-y-4">
                              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><User size={14} className="text-indigo-500" /> Identity</h4>
                              <div className="flex flex-wrap gap-2">
                                  {selectedUser.aboutMe.map(tag => (
                                      <span key={tag} className="px-4 py-2 bg-white text-slate-600 rounded-xl text-xs font-bold border border-slate-100 shadow-sm">{tag}</span>
                                  ))}
                              </div>
                          </section>

                          <section className="space-y-4">
                              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><Heart size={14} className="text-rose-500" /> Passions</h4>
                              <div className="flex flex-wrap gap-3">
                                  {selectedUser.interests.map(i => (
                                      <span key={i} className="px-5 py-2.5 bg-indigo-50/50 text-indigo-700 rounded-2xl text-xs font-black flex items-center gap-2 border border-indigo-100"><Star size={12} className="text-amber-400" fill="currentColor" /> {i}</span>
                                  ))}
                              </div>
                          </section>

                          <section className="space-y-4 pb-6">
                              <div className="flex justify-between items-center"><h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><Layers size={14} className="text-indigo-500" /> Photo Gallery</h4></div>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                  {selectedUser.gallery.map((img, idx) => (
                                      <div key={idx} className="group overflow-hidden rounded-2xl aspect-square bg-slate-100 border border-slate-100 shadow-sm">
                                          <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer" alt="" />
                                      </div>
                                  ))}
                              </div>
                          </section>
                      </div>

                      <div className="mt-auto p-10 bg-slate-50 border-t border-slate-100 flex justify-center">
                          <button onClick={() => setSelectedUser(null)} className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-95">Close Review</button>
                      </div>
                  </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Interviews;