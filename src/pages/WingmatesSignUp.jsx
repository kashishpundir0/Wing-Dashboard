import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast'; 
import { MapPin, Clock, Calendar, X, Mail, Phone, User, Shield, Info } from 'lucide-react';
import { registerInterviewer, updateInterviewer } from '../api/interviewerApi';

const WingmatesSignUp = ({ onClose, refreshData, isModal = false, initialData = null, isAdminView = true }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    password: '', 
    phoneNumber: '', 
    address: '',
    day: '', 
    date: '', 
    time: '', 
    slot: '', 
    role: 'interviewer'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (!selectedDate) return;
    const dateObj = new Date(selectedDate);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    setFormData(prev => ({ ...prev, date: selectedDate, day: dayName }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { _id, __v, createdAt, updatedAt, ...cleanPayload } = formData;
      cleanPayload.role = 'interviewer';

      if (initialData?._id) {
        await updateInterviewer(initialData._id, cleanPayload);
        toast.success('Information Updated');
      } else {
        await registerInterviewer(cleanPayload);
        toast.success('Account Created Successfully');
      }

      if (refreshData) refreshData();
      if (onClose) onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-slate-100 ${!isModal ? 'mx-auto my-10' : ''}`}>
      
      {/* 1. Refined Header (Less Black) */}
      <div className="bg-slate-50 p-8 border-b border-slate-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-sm">
                    <User className="text-white w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-xl font-black text-slate-900 leading-tight">
                        {isAdminView ? (initialData?._id ? 'Edit Partner' : 'New Partner') : 'Manage Availability'}
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        {isAdminView ? 'Identity Management' : 'Schedule Synchronization'}
                    </p>
                </div>
            </div>
            {isModal && (
              <button type="button" onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-all">
                <X size={20} />
              </button>
            )}
          </div>
      </div>

      <div className="p-8 md:p-10 bg-white">
          <form className="space-y-8" onSubmit={handleSubmit}>
              
              {/* SECTION: Identity Info (Visible to Both) */}
              <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                      <Info size={14} className="text-slate-400" />
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">General Information</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
                          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-black outline-none font-semibold text-sm transition-all" placeholder="Enter name..." />
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
                          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-black outline-none font-semibold text-sm transition-all" placeholder="partner@wingmann.com" />
                      </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 ml-1">Phone Number</label>
                          <input type="text" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-black outline-none font-semibold text-sm transition-all" placeholder="+91..." />
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 ml-1">Base Location</label>
                          <input type="text" name="address" value={formData.address || ''} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-black outline-none font-semibold text-sm transition-all" placeholder="City, Country" />
                      </div>
                  </div>
              </div>

              {/* SECTION: Credentials Box (Admin View Only) */}
              {isAdminView && (
                <div className="p-6 bg-slate-900 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Shield size={60} className="text-white" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Access Credentials</p>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Auto-Generated Password</label>
                                <p className="text-lg font-mono font-bold text-white select-all mt-1">{formData.password || 'Generating...'}</p>
                            </div>
                            <div className="bg-white/10 px-3 py-1 rounded text-[10px] text-white font-bold uppercase">Ready to copy</div>
                        </div>
                    </div>
                </div>
              )}

              {/* SECTION: Availability (Interviewer View Only) */}
              {!isAdminView && (
                <div className="border border-slate-100 bg-slate-50/50 p-6 rounded-2xl space-y-5">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-900" />
                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Availability Settings</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Free Date</label>
                            <input type="date" name="date" value={formData.date || ''} onChange={handleDateChange} className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 font-bold text-sm outline-none focus:border-black" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Automatic Day</label>
                            <input type="text" readOnly value={formData.day || ''} className="w-full px-4 py-2.5 bg-slate-100 rounded-xl border-none font-bold text-sm text-slate-400" placeholder="Day name..." />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Session Time</label>
                            <input type="text" name="time" value={formData.time || ''} onChange={handleChange} className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 font-bold text-sm outline-none focus:border-black" placeholder="10:30 AM" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Slot Title</label>
                            <input type="text" name="slot" value={formData.slot || ''} onChange={handleChange} className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 font-bold text-sm outline-none focus:border-black" placeholder="Main Slot" />
                        </div>
                    </div>
                </div>
              )}

              {/* Submit Button (The only pure black element) */}
              <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-black text-white px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                  >
                      {loading ? 'Processing...' : (initialData?._id ? 'Save Changes' : 'Confirm Registration')}
                  </button>
              </div>
          </form>
      </div>
    </div>
  );
};

export default WingmatesSignUp;