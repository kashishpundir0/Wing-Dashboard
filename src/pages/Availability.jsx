import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Calendar as CalendarIcon, Clock, X, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { availabilityApi } from '../api/availabilityApi';

const Availability = () => {
  const [loading, setLoading] = useState(false);
  const [allAvailability, setAllAvailability] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form States
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');

  // Dynamic ID from LocalStorage
  const interviewerId = localStorage.getItem('userId');
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  /**
   * Fetch current availability from backend
   */
  const fetchAvailability = useCallback(async () => {
    // Safety check to prevent api/null/availability calls
    if (!interviewerId || interviewerId === "null") {
      console.warn("Availability: No valid userId found in localStorage.");
      return;
    }

    try {
      setLoading(true);
      const res = await availabilityApi.getInterviewerAvailability(interviewerId);
      if (res.data.success) {
        setAllAvailability(res.data.data);
      }
    } catch (err) {
      // 404 just means no slots have been created yet, which is fine
      if (err.response?.status !== 404) {
        toast.error("Failed to load availability");
      }
    } finally {
      setLoading(false);
    }
  }, [interviewerId]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  /**
   * Save new slot to backend
   */
  const handleSaveAvailability = async () => {
    if (!interviewerId || interviewerId === "null") {
      toast.error("Session expired. Please log out and log in again.");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a valid date");
      return;
    }

    try {
      setLoading(true);

      // Constructing payload matching your backend: { slots: [{ day, date, times: [] }] }
      const payload = {
        slots: [
          {
            day: selectedDay,
            date: selectedDate,
            times: [selectedTime]
          }
        ]
      };

      const res = await availabilityApi.setAvailability(interviewerId, payload);

      if (res.data.success) {
        toast.success("Schedule Updated Successfully");
        setIsModalOpen(false);
        fetchAvailability(); // Refresh list
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  // If userId is missing, show a helpful warning instead of an empty page
  if (!interviewerId || interviewerId === "null") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-10 text-center">
        <AlertCircle size={48} className="text-amber-500 mb-4" />
        <h2 className="text-xl font-bold uppercase text-[#1F1F2E]">Session Identification Missing</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-xs">
          We couldn't identify your account ID. Please log out and sign in again to manage your availability.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full pt-10 px-4 md:px-10 pb-20 animate-in fade-in duration-500">

      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight text-[#1F1F2E]">Manage Availability</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Set your active interview hours</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Provision New Slot
        </button>
      </div>

      {/* AVAILABILITY GRID */}
      {loading && !isModalOpen ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-black" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allAvailability.length > 0 ? (
            allAvailability.map((slot) => (
              <div key={slot._id} className="bg-white p-7 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-[#1F1F2E] rounded-2xl flex items-center justify-center text-white">
                    <CalendarIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-sm text-[#1F1F2E]">{slot.day}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {slot.times.map((t, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-[11px] font-bold text-[#1F1F2E] flex items-center gap-2">
                      <Clock size={14} className="text-emerald-500" /> {t}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-300">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">No Active Slots Found. Add your first slot above.</p>
            </div>
          )}
        </div>
      )}

      {/* ADD SLOT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#1F1F2E]">Provision Slot</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-slate-50 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 ml-1">Day of Week</label>
                <select
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] outline-none focus:bg-white focus:border-black transition-all"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 ml-1">Specific Date</label>
                <input
                  type="date"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] outline-none focus:bg-white focus:border-black transition-all"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 ml-1">Time Slot</label>
                <input
                  type="time"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] outline-none focus:bg-white focus:border-black transition-all"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveAvailability}
                  disabled={loading}
                  className="w-full py-5 bg-[#1F1F2E] text-white rounded-2xl font-bold uppercase text-[11px] tracking-widest shadow-xl hover:bg-black flex items-center justify-center gap-3 transition-all disabled:bg-slate-300"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Save Availability'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Availability;