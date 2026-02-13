import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Calendar as CalendarIcon, Clock, X, Loader2, AlertCircle, Eraser } from 'lucide-react';
import toast from 'react-hot-toast';
import { availabilityApi } from '../api/availabilityApi';

const Availability = () => {
  const [loading, setLoading] = useState(false);
  const [allAvailability, setAllAvailability] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState('');
  const [newTime, setNewTime] = useState({ start: '09:00', end: '17:00' });
  const [customDateSlot, setCustomDateSlot] = useState({ date: '', start: '09:00', end: '17:00' });

  // Use the ID from local storage
  const interviewerId = localStorage.getItem('userId') || "698d74fde50071085e5e77ad";
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const fetchAvailability = useCallback(async () => {
    try {
      setLoading(true);
      const res = await availabilityApi.getInterviewerAvailability(interviewerId);
      if (res.data.success) {
        setAllAvailability(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load availability");
    } finally {
      setLoading(false);
    }
  }, [interviewerId]);

  useEffect(() => { fetchAvailability(); }, [fetchAvailability]);

  // --- DELETE DAY ---
  const handleDeleteDay = async (dateValue) => {
    if (!window.confirm(`Clear all slots for ${dateValue}?`)) return;
    try {
      setLoading(true);
      // Construct payload exactly as Postman expects
      const payload = {
        interviewerId: interviewerId,
        date: dateValue
      };
      const res = await availabilityApi.deleteDayByDate(payload);
      if (res.data.success) {
        toast.success("Day cleared successfully");
        await fetchAvailability();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE SPECIFIC SLOT ---
  const handleDeleteSpecificSlot = async (dateValue, slotId) => {
    try {
      setLoading(true);
      // Construct payload exactly as Postman expects
      const payload = {
        interviewerId: interviewerId,
        date: dateValue,
        slotId: slotId
      };

      const res = await availabilityApi.deleteSlotByDate(payload);
      if (res.data.success) {
        toast.success("Slot removed");
        await fetchAvailability();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Remove failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSlot = async (dateValue, startTime, endTime, isWeekly = false) => {
    try {
      setLoading(true);
      const payload = { interviewerId, date: dateValue, timeSlots: [{ startTime, endTime }] };
      await availabilityApi.setAvailability(payload);
      toast.success("Slot added");
      await fetchAvailability();
      if (isWeekly) setIsModalOpen(false);
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const weeklyData = allAvailability.filter(item => daysOfWeek.includes(item.date));
  const specificDateData = allAvailability.filter(item => !daysOfWeek.includes(item.date));

  return (
    <div className="w-full -mt-8 relative p-4">
      {loading && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/50 backdrop-blur-sm"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold">Add Slot for {activeDay}</h4>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <input type="time" value={newTime.start} onChange={(e) => setNewTime({ ...newTime, start: e.target.value })} className="p-3 border rounded-xl" />
              <input type="time" value={newTime.end} onChange={(e) => setNewTime({ ...newTime, end: e.target.value })} className="p-3 border rounded-xl" />
            </div>
            <button onClick={() => handleSaveSlot(activeDay, newTime.start, newTime.end, true)} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Confirm</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Weekly Section */}
        <div className="xl:col-span-2 bg-white rounded-4xl p-8 border">
          <h4 className="text-xl font-bold mb-8">Weekly Recurring</h4>
          {daysOfWeek.map((day) => {
            const dayEntry = weeklyData.find(d => d.date === day);
            return (
              <div key={day} className="flex flex-col md:flex-row gap-6 p-5 hover:bg-slate-50 rounded-3xl">
                <div className="w-32">
                  <span className="font-black uppercase">{day}</span>
                  {dayEntry && (
                    <button onClick={() => handleDeleteDay(dayEntry.date)} className="text-[9px] font-bold text-rose-500 block mt-1 uppercase">Clear Day</button>
                  )}
                </div>
                <div className="flex-1 flex flex-wrap gap-3">
                  {dayEntry?.timeSlots.map((slot) => (
                    <div key={slot._id} className="flex items-center bg-white border px-3 py-2 rounded-xl gap-3">
                      <span className="text-sm font-bold">{slot.startTime} - {slot.endTime}</span>
                      <button onClick={() => handleDeleteSpecificSlot(dayEntry.date, slot._id)} className="text-slate-300 hover:text-rose-500"><Trash2 size={14} /></button>
                    </div>
                  ))}
                  <button onClick={() => { setActiveDay(day); setIsModalOpen(true); }} className="px-4 py-2 border border-dashed rounded-xl text-indigo-600">+ Add Slot</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specific Date Section */}
        <div className="xl:col-span-1 bg-white rounded-4xl p-8 border">
          <h4 className="text-xl font-bold mb-6">Specific Dates</h4>
          <div className="max-h-80 overflow-y-auto space-y-3 mb-8">
            {specificDateData.map(group => group.timeSlots.map(slot => (
              <div key={slot._id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-black text-indigo-600 uppercase">{group.date}</p>
                  <p className="font-bold">{slot.startTime} - {slot.endTime}</p>
                </div>
                <button onClick={() => handleDeleteSpecificSlot(group.date, slot._id)} className="text-slate-400 hover:text-rose-500"><Trash2 size={18} /></button>
              </div>
            )))}
          </div>
          <div className="space-y-4 pt-6 border-t">
            <input type="date" value={customDateSlot.date} onChange={(e) => setCustomDateSlot({ ...customDateSlot, date: e.target.value })} className="w-full p-3 rounded-xl border font-bold" />
            <div className="grid grid-cols-2 gap-3">
              <input type="time" value={customDateSlot.start} onChange={(e) => setCustomDateSlot({ ...customDateSlot, start: e.target.value })} className="p-2.5 rounded-xl border font-bold" />
              <input type="time" value={customDateSlot.end} onChange={(e) => setCustomDateSlot({ ...customDateSlot, end: e.target.value })} className="p-2.5 rounded-xl border font-bold" />
            </div>
            <button onClick={() => handleSaveSlot(customDateSlot.date, customDateSlot.start, customDateSlot.end)} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">Add Custom Date Slot</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;