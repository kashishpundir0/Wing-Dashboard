import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, X, Loader2, AlertCircle, Check, Trash2, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { availabilityApi } from '../api/availabilityApi';

const Availability = () => {
  const [loading, setLoading] = useState(false);
  const [allAvailability, setAllAvailability] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Range Selection States
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  // Staging Area: This holds the custom times for each date
  // Format: { "2026-02-24": ["10:00", "14:00"], "2026-02-25": ["09:00"] }
  const [stagedSlots, setStagedSlots] = useState({});
  const [tempTime, setTempTime] = useState('10:00');

  const interviewerId = localStorage.getItem('userId');

  const fetchAvailability = useCallback(async () => {
    if (!interviewerId || interviewerId === "null") return;
    try {
      setLoading(true);
      const res = await availabilityApi.getInterviewerAvailability(interviewerId);
      if (res.data.success) setAllAvailability(res.data.data);
    } catch (err) {
      if (err.response?.status !== 404) toast.error("Failed to load availability");
    } finally { setLoading(false); }
  }, [interviewerId]);

  useEffect(() => { fetchAvailability(); }, [fetchAvailability]);

  // Generate the list of dates based on range and day filters
  const generateStagedDates = () => {
    if (!startDate || !endDate || selectedDays.length === 0) {
      toast.error("Select range and days first");
      return;
    }

    const newStaged = {};
    let start = new Date(startDate);
    let end = new Date(endDate);
    let temp = new Date(start);

    while (temp <= end) {
      const dayName = temp.toLocaleDateString('en-US', { weekday: 'long' });
      if (selectedDays.includes(dayName)) {
        const dateStr = temp.toISOString().split('T')[0];
        newStaged[dateStr] = []; // Initialize with empty times
      }
      temp.setDate(temp.getDate() + 1);
    }
    setStagedSlots(newStaged);
  };

  const addTimeToDate = (dateStr) => {
    if (stagedSlots[dateStr].includes(tempTime)) return;
    setStagedSlots({
      ...stagedSlots,
      [dateStr]: [...stagedSlots[dateStr], tempTime].sort()
    });
  };

  const removeTimeFromDate = (dateStr, timeToRemove) => {
    setStagedSlots({
      ...stagedSlots,
      [dateStr]: stagedSlots[dateStr].filter(t => t !== timeToRemove)
    });
  };

  const handleSaveAll = async () => {
    const finalSlots = Object.entries(stagedSlots)
      .filter(([_, times]) => times.length > 0) // Only send dates that have times
      .map(([date, times]) => ({
        date,
        day: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
        times
      }));

    if (finalSlots.length === 0) return toast.error("Please add times to at least one date");

    try {
      setLoading(true);
      const res = await availabilityApi.setAvailability(interviewerId, { slots: finalSlots });
      if (res.data.success) {
        toast.success("Custom schedule saved!");
        setIsModalOpen(false);
        setStagedSlots({});
        fetchAvailability();
      }
    } catch (err) {
      toast.error("Save failed");
    } finally { setLoading(false); }
  };

  if (!interviewerId || interviewerId === "null") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-10 text-center">
        <AlertCircle size={48} className="text-amber-500 mb-4" />
        <h2 className="text-xl font-bold uppercase text-[#1F1F2E]">Session Missing</h2>
        <p className="text-slate-500 text-sm">Please re-login.</p>
      </div>
    );
  }
  return (
    <div className="w-full pt-10 px-4 md:px-10 pb-20 animate-in fade-in duration-500">

      <div className="flex justify-between items-end border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight text-[#1F1F2E]">Availability Control</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Granular Schedule Management</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Create Custom Schedule
        </button>
      </div>

      {/* EXISTING SLOTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allAvailability.map((slot) => (
          <div key={slot._id} className="bg-white p-7 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white"><CalendarIcon size={18} /></div>
              <div>
                <h4 className="font-bold uppercase text-xs text-[#1F1F2E]">{slot.day}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{new Date(slot.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {slot.times.map((t, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#1F1F2E] flex items-center gap-2">
                  <Clock size={12} className="text-emerald-500" /> {t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CUSTOM BUILDER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 max-h-[90vh] flex flex-col">

            <div className="flex justify-between items-center mb-8 shrink-0">
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#1F1F2E]">Granular Slot Builder</h2>
              <button onClick={() => { setIsModalOpen(false); setStagedSlots({}); }} className="p-2 bg-slate-50 rounded-lg hover:bg-red-500 hover:text-white transition-all"><X size={20} /></button>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 overflow-hidden">

              {/* LEFT SIDE: CONFIG */}
              <div className="w-full lg:w-1/3 space-y-6 shrink-0">
                <div className="space-y-4">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block ml-1">Date Range</label>
                  <input type="date" className="w-full p-4 bg-slate-50 border rounded-xl font-bold text-[11px]" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  <input type="date" className="w-full p-4 bg-slate-50 border rounded-xl font-bold text-[11px]" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-3 ml-1">Days to Generate</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <button
                        key={day}
                        onClick={() => setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])}
                        className={`py-2 rounded-lg text-[9px] font-bold uppercase border transition-all ${selectedDays.includes(day) ? 'bg-black text-white' : 'bg-white text-slate-400'}`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={generateStagedDates} className="w-full py-4 bg-slate-100 text-[#1F1F2E] rounded-xl font-bold uppercase text-[10px] hover:bg-slate-200">
                  Step 1: Generate Dates
                </button>
              </div>

              {/* RIGHT SIDE: CUSTOMIZER */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-4 ml-1">Step 2: Add specific times to each date</label>

                <div className="flex-1 overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                  {Object.keys(stagedSlots).length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center border border-dashed rounded-4xl text-slate-400">
                      <CalendarIcon size={32} className="mb-2 opacity-20" />
                      <p className="text-[9px] font-bold uppercase">No dates generated yet</p>
                    </div>
                  ) : (
                    Object.keys(stagedSlots).sort().map(dateStr => (
                      <div key={dateStr} className="p-4 bg-slate-50 border rounded-2xl flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-[#1F1F2E] uppercase">
                            {new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <div className="flex items-center gap-2">
                            <input type="time" className="p-1.5 border rounded-lg text-[10px] font-bold" value={tempTime} onChange={(e) => setTempTime(e.target.value)} />
                            <button onClick={() => addTimeToDate(dateStr)} className="p-1.5 bg-black text-white rounded-lg"><Plus size={14} /></button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {stagedSlots[dateStr].map(t => (
                            <div key={t} className="bg-white border px-2 py-1 rounded-md text-[9px] font-bold flex items-center gap-2">
                              {t} <button onClick={() => removeTimeFromDate(dateStr, t)}><X size={10} className="text-red-400" /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-6 shrink-0">
                  <button
                    onClick={handleSaveAll}
                    disabled={loading || Object.keys(stagedSlots).length === 0}
                    className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-bold uppercase text-[11px] shadow-xl hover:bg-emerald-600 flex items-center justify-center gap-3 transition-all disabled:bg-slate-200"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Final Step: Save Custom Schedule'}
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

export default Availability;