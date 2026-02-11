import React, { useState } from 'react';
import { Plus, Trash2, Save, Calendar as CalendarIcon, Clock, AlertCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Availability = () => {
  // State for weekly recurring slots
  const [weeklySlots, setWeeklySlots] = useState([
    { id: 1, day: 'Monday', start: '09:00', end: '12:00' },
    { id: 2, day: 'Wednesday', start: '14:00', end: '18:00' },
  ]);

  // State for specific date overrides
  const [dateSlots, setDateSlots] = useState([
    { id: 101, date: '2023-11-25', start: '10:00', end: '15:00' }
  ]);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState('');
  const [newTime, setNewTime] = useState({ start: '09:00', end: '17:00' });
  const [customDateSlot, setCustomDateSlot] = useState({ date: '', start: '09:00', end: '17:00' });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSave = () => {
    toast.success('Availability Settings Saved', {
      style: { background: '#1F1F2E', color: '#fff', borderRadius: '15px' }
    });
  };

  const removeSlot = (id, type) => {
    if (type === 'weekly') {
      setWeeklySlots(weeklySlots.filter(s => s.id !== id));
    } else {
      setDateSlots(dateSlots.filter(s => s.id !== id));
    }
  };

  // Function to add a weekly slot
  const openAddWeeklyModal = (day) => {
    setActiveDay(day);
    setIsModalOpen(true);
  };

  const handleAddWeeklySlot = () => {
    const newSlot = {
      id: Date.now(),
      day: activeDay,
      start: newTime.start,
      end: newTime.end
    };
    setWeeklySlots([...weeklySlots, newSlot]);
    setIsModalOpen(false);
    toast.success(`Slot added to ${activeDay}`);
  };

  // Function to add a specific date slot
  const handleAddDateSlot = () => {
    if (!customDateSlot.date) {
      toast.error("Please select a date");
      return;
    }
    const newSlot = {
      id: Date.now(),
      ...customDateSlot
    };
    setDateSlots([...dateSlots, newSlot]);
    setCustomDateSlot({ date: '', start: '09:00', end: '17:00' });
    toast.success(`Slot added for ${newSlot.date}`);
  };

  return (
    <div className="w-full -mt-8 animate-in slide-in-from-bottom-4 duration-500 relative">

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-4xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-black text-[#1F1F2E]">Add Slot for {activeDay}</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Start Time</label>
                  <input
                    type="time"
                    value={newTime.start}
                    onChange={(e) => setNewTime({ ...newTime, start: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  />
                </div>
                <div className="space-y-1">
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
                onClick={handleAddWeeklySlot}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Confirm Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-3xl font-black text-[#1F1F2E]">My Availability</h3>
          <p className="text-slate-500 font-medium">Manage your recurring schedule and specific date overrides</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
        >
          <Save size={18} /> Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Left Column: Weekly Schedule */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Clock className="text-indigo-600" size={20} />
              </div>
              <h4 className="text-xl font-bold text-[#1F1F2E]">Weekly Recurring</h4>
            </div>

            <div className="space-y-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex flex-col md:flex-row md:items-center gap-6 p-5 rounded-3xl hover:bg-[#F5F6FA] transition-all border border-transparent hover:border-slate-100">
                  <div className="w-32">
                    <span className="font-black text-[#1F1F2E] text-md uppercase tracking-tight">{day}</span>
                  </div>

                  <div className="flex-1 flex flex-wrap gap-3">
                    {weeklySlots.filter(s => s.day === day).map((slot) => (
                      <div key={slot.id} className="flex items-center bg-white border border-slate-200 pl-4 pr-2 py-2 rounded-xl gap-4 shadow-sm">
                        <span className="text-slate-700 font-bold text-sm">{slot.start} - {slot.end}</span>
                        <button
                          onClick={() => removeSlot(slot.id, 'weekly')}
                          className="text-slate-300 hover:text-rose-500 p-1.5 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => openAddWeeklyModal(day)}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-indigo-50 transition-colors border border-slate-200"
                    >
                      <Plus size={14} /> Add Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Date Specific Overrides */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <CalendarIcon className="text-amber-600" size={20} />
              </div>
              <h4 className="text-xl font-bold text-[#1F1F2E]">Specific Dates</h4>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-3 mb-8 pr-2 custom-scrollbar">
              {dateSlots.length > 0 ? dateSlots.map(slot => (
                <div key={slot.id} className="p-4 bg-[#F5F6FA] rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">{slot.date}</p>
                    <p className="font-bold text-[#1F1F2E]">{slot.start} - {slot.end}</p>
                  </div>
                  <button
                    onClick={() => removeSlot(slot.id, 'date')}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )) : (
                <p className="text-center text-slate-400 text-sm py-4 italic">No custom dates added</p>
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
                onClick={handleAddDateSlot}
                className="w-full py-4 bg-[#1F1F2E] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all"
              >
                Add Custom Date Slot
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-4xl text-white overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-amber-400">
                <AlertCircle size={18} />
                <span className="font-bold uppercase tracking-widest text-[10px]">Timezone</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Currently operating in <span className="text-white font-bold">(GMT+5:30)</span>.
                Slots are automatically adjusted for global candidates.
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