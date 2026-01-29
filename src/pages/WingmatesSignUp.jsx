import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Sparkles, Clock, Calendar, X, Mail, Lock, Phone } from 'lucide-react';
import { registerInterviewer, updateInterviewer } from '../api/interviewerApi';

const WingmatesSignUp = ({ onClose, refreshData, isModal = false, initialData = null }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      setFormData({ ...initialData, password: '' });
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
      // 🔥 FIX: Remove internal MongoDB fields that cause 400/500 errors
      const { _id, __v, createdAt, updatedAt, ...cleanPayload } = formData;

      // Ensure role is strictly 'interviewer'
      cleanPayload.role = 'interviewer';

      if (initialData?._id) {
        // UPDATE MODE
        await updateInterviewer(initialData._id, cleanPayload);
        alert('Interviewer Updated Successfully!');
      } else {
        // REGISTER MODE
        await registerInterviewer(cleanPayload);
        alert('Interviewer Registered Successfully!');
      }

      if (refreshData) refreshData();
      if (onClose) onClose();
    } catch (error) {
      // Log the actual error message from the server to help debugging
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Operation failed';
      console.error("API Error:", error.response?.data);
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative ${!isModal ? 'mx-auto my-10 border border-purple-100' : ''}`}>
      
      <div className="bg-[#632281] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-2xl"></div>
          <div className="flex items-center justify-center gap-2 mb-2 relative z-10">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <Heart className="text-[#632281] w-5 h-5" fill="currentColor" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">Wingmates</span>
          </div>
          <h1 className="text-2xl font-black text-white relative z-10">
            {initialData ? 'Update Profile' : 'Interviewer Registration'}
          </h1>
          {isModal && (
            <button type="button" onClick={onClose} className="absolute right-6 top-6 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
              <X size={20} />
            </button>
          )}
      </div>

      <div className="p-8 md:p-10 bg-gray-50/30">
          <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Email Address</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-white rounded-2xl border border-gray-100 focus:border-purple-400 outline-none font-bold text-sm shadow-sm transition-all" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Password</label>
                      <input required={!initialData} type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-white rounded-2xl border border-gray-100 focus:border-purple-400 outline-none font-bold text-sm shadow-sm transition-all" placeholder={initialData ? '••••••••' : 'Enter password'} />
                  </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Phone Number</label>
                      <input type="text" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} className="w-full px-4 py-3 bg-white rounded-2xl border border-gray-100 outline-none font-bold text-sm shadow-sm" placeholder="9876543210" />
                  </div>
                  <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Location</label>
                      <input type="text" name="address" value={formData.address || ''} onChange={handleChange} className="w-full px-4 py-3 bg-white rounded-2xl border border-gray-100 outline-none font-bold text-sm shadow-sm" placeholder="Mumbai, India" />
                  </div>
              </div>

              <div className="bg-purple-50/50 p-6 rounded-[2rem] border border-purple-100 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={14} className="text-[#632281]" />
                    <span className="text-[10px] font-black text-[#632281] uppercase tracking-widest">Availability Details</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Calendar Date</label>
                        <input type="date" name="date" value={formData.date || ''} onChange={handleDateChange} className="w-full px-4 py-2.5 bg-white rounded-xl border border-purple-100 font-bold text-xs outline-none focus:border-purple-400" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Day</label>
                        <input type="text" name="day" readOnly value={formData.day || ''} className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-none font-bold text-xs text-purple-700 cursor-not-allowed" placeholder="Calculated..." />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Time</label>
                        <input type="text" name="time" value={formData.time || ''} onChange={handleChange} className="w-full px-4 py-2.5 bg-white rounded-xl border border-purple-100 font-bold text-xs outline-none focus:border-purple-400" placeholder="10:00 AM" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Slot Name</label>
                        <input type="text" name="slot" value={formData.slot || ''} onChange={handleChange} className="w-full px-4 py-2.5 bg-white rounded-xl border border-purple-100 font-bold text-xs outline-none focus:border-purple-400" placeholder="Morning Slot" />
                      </div>
                  </div>
              </div>

              <div className="pt-4">
                  <button type="submit" disabled={loading} className="w-full bg-[#632281] text-white px-10 py-4 rounded-2xl font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-purple-100 hover:bg-purple-900 transition-all active:scale-[0.98] disabled:opacity-50">
                      {loading ? 'Processing...' : (initialData ? 'Update Profile' : 'Confirm Registration')} <Sparkles size={16} />
                  </button>
              </div>
          </form>
      </div>
    </div>
  );
};

export default WingmatesSignUp;