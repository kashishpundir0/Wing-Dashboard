import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Calendar as CalendarIcon, Clock, X, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { availabilityApi } from '../api/availabilityApi';

const Availability = () => {
  const [loading, setLoading] = useState(false);
  const [allAvailability, setAllAvailability] = useState([]); // Raw data from API

  // UI States for adding slots
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState('');
  const [newTime, setNewTime] = useState({ start: '09:00', end: '17:00' });
  const [customDateSlot, setCustomDateSlot] = useState({ date: '', start: '09:00', end: '17:00' });

  // Use ID from local storage or fallback to the provided test ID
  const interviewerId = localStorage.getItem('userId') || "698d74fde50071085e5e77ad";
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // --- 1. Fetch Availability Logic ---
  const fetchAvailability = useCallback(async () => {
    try {
      setLoading(true);
      const res = await availabilityApi.getInterviewerAvailability(interviewerId);
      if (res.data.success) {
        setAllAvailability(res.data.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load availability settings");
    } finally {
      setLoading(false);
    }
  }, [interviewerId]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // --- 2. Save Availability Logic ---
  const handleSaveSlot = async (dateValue, startTime, endTime, isWeekly = false) => {
    if (!dateValue) return toast.error("Please select a date or day");

    const payload = {
      interviewerId,
      date: dateValue,
      timeSlots: [{ startTime, endTime }]
    };

    try {
      setLoading(true);
      const res = await availabilityApi.setAvailability(payload);
      if (res.data.success) {
        toast.success(res.data.message || "Slot added successfully");
        await fetchAvailability(); // Refresh data from server
        if (isWeekly) {
          setIsModalOpen(false);
        } else {
          setCustomDateSlot({ date: '', start: '09:00', end: '17:00' });
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save slot");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. Delete Availability Logic ---
  const handleDeleteDay = async (availabilityId) => {
    // Optional: Add confirmation dialog
    if (!window.confirm("Are you sure you want to remove all slots for this day?")) return;

    try {
      setLoading(true);
      const res = await availabilityApi.deleteAvailability(availabilityId);
      if (res.data.success) {
        toast.success("Availability deleted successfully");
        await fetchAvailability(); // Refresh data from server
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete availability");
    } finally {
      setLoading(false);
    }
  };

  // --- 4. Filtering Logic for UI display ---
  // Separate items into Weekly Recurring and Specific Dates based on the "date" field string
  const weeklyData = allAvailability.filter(item => daysOfWeek.includes(item.date));
  const specificDateData = allAvailability.filter(item => !daysOfWeek.includes(item.date));

  return (
    <div className="w-full -mt-8 animate-in slide-in-from-bottom-4 duration-500 relative">

      {/* Global Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <Loader2 className="animate-spin text-indigo-600" size={40} />
        </div>
      )}

      {/* Modal for adding Weekly Slots */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-black text-[#1F1F2E]">Add Slot for {activeDay}</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Start Time</label>
                <input
                  type="time"
                  value={newTime.start}
                  onChange={(e) => setNewTime({ ...newTime, start: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">End Time</label>
                <input
                  type="time"
                  value={newTime.end}
                  onChange={(e) => setNewTime({ ...newTime, end: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>
            </div>
            <button
              onClick={() => handleSaveSlot(activeDay, newTime.start, newTime.end, true)}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Confirm Slot
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center gap-4 mb-8 bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-3xl font-black text-[#1F1F2E]">My Availability</h3>
          <p className="text-slate-500 font-medium">Manage your recurring schedule and specific date overrides</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full uppercase tracking-tighter">
          <Clock size={14} /> GMT +5:30
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Left Column: Weekly Schedule */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Clock size={20} />
              </div>
              <h4 className="text-xl font-bold text-[#1F1F2E]">Weekly Recurring</h4>
            </div>

            <div className="space-y-2">
              {daysOfWeek.map((day) => {
                const dayEntry = weeklyData.find(d => d.date === day);
                return (
                  <div key={day} className="flex flex-col md:flex-row md:items-center gap-6 p-5 rounded-3xl hover:bg-[#F5F6FA] transition-all border border-transparent hover:border-slate-100">
                    <div className="w-32">
                      <span className="font-black text-[#1F1F2E] text-md uppercase tracking-tight">{day}</span>
                    </div>

                    <div className="flex-1 flex flex-wrap gap-3">
                      {dayEntry?.timeSlots.map((slot) => (
                        <div key={slot._id} className="flex items-center bg-white border border-slate-200 pl-4 pr-2 py-2 rounded-xl gap-4 shadow-sm">
                          <span className="text-slate-700 font-bold text-sm">{slot.startTime} - {slot.endTime}</span>
                          <button
                            onClick={() => handleDeleteDay(dayEntry._id)}
                            className="text-slate-300 hover:text-rose-500 p-1.5 hover:bg-rose-50 rounded-lg transition-all"
                            title="Delete this day's availability"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => { setActiveDay(day); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-indigo-50 transition-colors border border-slate-200 shadow-sm"
                      >
                        <Plus size={14} /> Add Slot
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Date Specific Overrides */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <CalendarIcon size={20} />
              </div>
              <h4 className="text-xl font-bold text-[#1F1F2E]">Specific Dates</h4>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-3 mb-8 pr-2 custom-scrollbar">
              {specificDateData.length > 0 ? specificDateData.map(group => (
                group.timeSlots.map(slot => (
                  <div key={slot._id} className="p-4 bg-[#F5F6FA] rounded-2xl border border-slate-100 flex items-center justify-between group">
                    <div>
                      <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">{group.date}</p>
                      <p className="font-bold text-[#1F1F2E]">{slot.startTime} - {slot.endTime}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteDay(group._id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )) : (
                <p className="text-center text-slate-400 text-sm py-8 italic">No custom dates added</p>
              )}
            </div>

            {/* Date Input Add Form */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Select Date</label>
                <input
                  type="date"
                  value={customDateSlot.date}
                  onChange={(e) => setCustomDateSlot({ ...customDateSlot, date: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500 font-bold text-slate-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Start</label>
                  <input
                    type="time"
                    value={customDateSlot.start}
                    onChange={(e) => setCustomDateSlot({ ...customDateSlot, start: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">End</label>
                  <input
                    type="time"
                    value={customDateSlot.end}
                    onChange={(e) => setCustomDateSlot({ ...customDateSlot, end: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-sm"
                  />
                </div>
              </div>
              <button
                onClick={() => handleSaveSlot(customDateSlot.date, customDateSlot.start, customDateSlot.end)}
                className="w-full py-4 bg-[#1F1F2E] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg"
              >
                Add Custom Date Slot
              </button>
            </div>
          </div>

          {/* Timezone Info Box */}
          <div className="p-6 bg-slate-900 rounded-4xl text-white overflow-hidden relative shadow-2xl shadow-slate-200">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-amber-400">
                <AlertCircle size={18} />
                <span className="font-bold uppercase tracking-widest text-[10px]">Note</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Custom date slots will take priority over your weekly recurring schedule for the selected day.
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Availability;