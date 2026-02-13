import React, { useState, useEffect } from 'react';
import {
    Video, X, MapPin, CheckCircle2, Ruler,
    Phone, Star, Calendar as CalendarIcon, Clock, Briefcase,
    Heart, User, Layers, AlertCircle, MessageSquare,
    ShieldCheck, Wine, Cigarette, Dumbbell, UserCheck, Filter
} from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-10 right-10 z-[150] animate-in slide-in-from-right-10 duration-300">
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <p className="font-bold text-sm">{message}</p>
            </div>
        </div>
    );
};

const Interviews = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const [selectedDate, setSelectedDate] = useState('All');

    // State for Rejection Modal
    const [rejectingUser, setRejectingUser] = useState(null);
    const [rejectionComment, setRejectionComment] = useState('');

    const userRole = localStorage.getItem('userRole');
    const currentUserName = userRole === 'admin' ? null : "Sarah Jenkins";

    const data = [
        {
            id: 1,
            name: 'Jessica Parker',
            interviewer: 'Sarah Jenkins',
            age: 23,
            date: '24 Jan',
            time: '10:30 AM',
            compatibility: '90%',
            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
            location: 'Chicago, IL, United States',
            jobTitle: 'Software Developer',
            distance: '1 km',
            aboutMe: [
                { label: 'Bengaluru, India', icon: <MapPin size={12} /> },
                { label: 'Regularly', icon: <Dumbbell size={12} /> },
                { label: 'Hindu', icon: null },
                { label: 'Occasionally', icon: <Wine size={12} /> },
                { label: 'Rarely', icon: <Cigarette size={12} /> },
            ],
            story: "My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading..",
            interests: [
                { label: 'Yoga', icon: '🧘' },
                { label: 'Film lover', icon: '🎬' },
                { label: 'Matcha', icon: '🍵' }
            ],
            gallery: [
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            ]
        }
    ];

    const roleFilteredData = userRole === 'admin' ? data : data.filter(item => item.interviewer === currentUserName);
    const finalData = selectedDate === 'All' ? roleFilteredData : roleFilteredData.filter(item => item.date === selectedDate);

    const showNotify = (msg, type = 'success') => setNotification({ msg, type });

    const handleConfirmReject = () => {
        if (!rejectionComment.trim()) {
            showNotify('Please provide a reason', 'error');
            return;
        }
        showNotify(`Rejected ${rejectingUser.name}`, 'error');
        setRejectingUser(null);
        setRejectionComment('');
    };

    return (
        <div className="relative md:pt-4 md:pb-10 bg-slate-50/50 min-h-screen space-y-8 px-6">
            {notification && <Toast message={notification.msg} type={notification.type} onClose={() => setNotification(null)} />}

            {/* Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        {userRole === 'admin' ? 'Global Pipeline' : 'My Interviews'}
                    </h1>
                    <p className="text-indigo-600 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">
                        {userRole === 'admin' ? 'Viewing all system sessions' : `Logged in as ${currentUserName}`}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                    <button onClick={() => setSelectedDate('All')} className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedDate === 'All' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}>All</button>
                    {['24 Jan', '25 Jan', '26 Jan'].map(date => (
                        <button key={date} onClick={() => setSelectedDate(date)} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${selectedDate === date ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>{date}</button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/80 border-b border-slate-200">
                        <tr>
                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Candidate</th>
                            {userRole === 'admin' && <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Interviewer</th>}
                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Schedule</th>
                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {finalData.map((user) => (
                            <tr key={user.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                <td className="px-8 py-6 cursor-pointer" onClick={() => setSelectedUser(user)}>
                                    <div className="flex items-center gap-4">
                                        <img src={user.photo} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-indigo-400 transition-all" alt="" />
                                        <div>
                                            <p className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{user.name}, {user.age}</p>
                                            <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5"><MapPin size={12} /> {user.location}</p>
                                        </div>
                                    </div>
                                </td>
                                {userRole === 'admin' && (
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3 bg-blue-50/50 w-fit px-4 py-2 rounded-xl border border-blue-100">
                                            <UserCheck size={16} className="text-blue-600" />
                                            <span className="text-sm font-bold text-blue-900">{user.interviewer}</span>
                                        </div>
                                    </td>
                                )}
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
                                        <button onClick={() => showNotify('Joining Video...')} className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:-translate-y-0.5 transition-all">
                                            <Video size={18} />
                                        </button>

                                        {/* Restored Reject Button */}
                                        <button onClick={() => setRejectingUser(user)} className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-500 hover:text-white transition-all">
                                            Reject
                                        </button>

                                        <button onClick={() => showNotify('Approved')} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200">
                                            Approve
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Restored Rejection Box (Modal) */}
            {rejectingUser && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-4xl p-8 shadow-2xl border border-rose-50 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-slate-900">Rejection Reason</h3>
                            <button onClick={() => setRejectingUser(null)}><X size={20} className="text-slate-400" /></button>
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Rejecting: {rejectingUser.name}</p>
                        <textarea
                            autoFocus
                            value={rejectionComment}
                            onChange={(e) => setRejectionComment(e.target.value)}
                            placeholder="Detail why this profile was rejected..."
                            className="w-full h-40 bg-slate-50 border border-slate-100 rounded-3xl p-5 text-slate-700 font-medium focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all resize-none outline-none"
                        />
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button onClick={() => setRejectingUser(null)} className="py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold text-xs uppercase hover:bg-slate-100 transition-colors">Cancel</button>
                            <button onClick={handleConfirmReject} className="py-4 rounded-2xl bg-rose-600 text-white font-bold text-xs uppercase shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all">Reject</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Review Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500 max-h-[92vh] flex flex-col md:flex-row border border-slate-100">

                        <div className="w-full md:w-1/2 relative bg-slate-200">
                            <img src={selectedUser.photo} className="absolute inset-0 w-full h-full object-cover" alt="" />
                            <div className="absolute top-8 left-8 bg-white px-5 py-2 rounded-full shadow-lg border border-slate-100">
                                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{selectedUser.compatibility} Compatible</span>
                            </div>
                            <button onClick={() => setSelectedUser(null)} className="absolute top-8 right-8 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all z-20">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="w-full md:w-1/2 bg-white overflow-y-auto custom-scrollbar flex flex-col">
                            <div className="p-10 md:p-14 space-y-10">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 leading-tight">{selectedUser.name}, {selectedUser.age}</h2>
                                        <p className="text-slate-400 font-bold text-sm">{selectedUser.jobTitle}</p>
                                    </div>
                                    <button className="p-4 border border-slate-100 rounded-full text-slate-400 hover:bg-slate-50 transition-all">
                                        <Phone size={24} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Location</h4>
                                    <div className="flex justify-between items-center">
                                        <p className="text-slate-600 font-bold text-sm">{selectedUser.location}</p>
                                        <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">{selectedUser.distance}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">About me</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedUser.aboutMe.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-full text-slate-600 text-xs font-bold">
                                                {item.icon} {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">My Story</h4>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        {selectedUser.story}
                                        <button className="text-indigo-600 font-black ml-1 text-xs uppercase tracking-tighter">Read more</button>
                                    </p>
                                </div>

                                <div className="space-y-4 pb-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Gallery</h4>
                                        <button className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">See all</button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <img src={selectedUser.gallery[0]} className="w-full h-48 object-cover rounded-[1.5rem]" alt="" />
                                            <img src={selectedUser.gallery[1]} className="w-full h-48 object-cover rounded-[1.5rem]" alt="" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <img src={selectedUser.gallery[2]} className="w-full h-28 object-cover rounded-2xl" alt="" />
                                            <img src={selectedUser.gallery[3]} className="w-full h-28 object-cover rounded-2xl" alt="" />
                                            <img src={selectedUser.gallery[4]} className="w-full h-28 object-cover rounded-2xl" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button className="w-full py-5 bg-[#6438A8] text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-indigo-100 hover:-translate-y-1 transition-all">
                                        Request For A Date
                                    </button>
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