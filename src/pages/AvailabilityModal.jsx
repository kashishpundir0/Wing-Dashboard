import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Loader2, Copy, ExternalLink } from 'lucide-react';
import { availabilityApi } from '../api/availabilityApi';
import toast from 'react-hot-toast';

const AvailabilityModal = ({ isOpen, onClose, availability, name, interviewerId }) => {
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookedData, setBookedData] = useState(null);

    if (!isOpen) return null;

    const handleBookSlot = async (slot, time) => {
        setBookingLoading(true);
        try {
            const payload = {
                userName: localStorage.getItem('userName') || "Admin",
                userEmail: "admin@wingmann.online",
                day: slot.day,
                date: slot.date,
                time: time
            };
            const res = await availabilityApi.bookSlot(interviewerId, payload);
            if (res.data.success) {
                setBookedData(res.data.data);
                toast.success("Slot Booked Successfully");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Booking failed");
        } finally { setBookingLoading(false); }
    };

    if (bookedData) {
        return (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center animate-in zoom-in-95">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div>
                    <h2 className="text-2xl font-bold uppercase">Confirmed</h2>
                    <div className="bg-slate-50 p-5 rounded-2xl my-6 text-left border">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Google Meet Link</p>
                        <code className="text-[11px] font-bold text-blue-600 break-all">{bookedData.meetLink}</code>
                    </div>
                    <div className="flex flex-col gap-3">
                        <a href={bookedData.meetLink} target="_blank" rel="noreferrer" className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold uppercase text-[10px] flex items-center justify-center gap-2">Join Now <ExternalLink size={14} /></a>
                        <button onClick={() => { setBookedData(null); onClose(); }} className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase text-[10px]">Close</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-start mb-8">
                    <h2 className="text-2xl font-bold uppercase text-[#1F1F2E]">{name}{"'s"} Schedule</h2>
                    <button onClick={onClose} className="p-2 bg-slate-50 rounded-lg hover:bg-red-500 hover:text-white transition-all"><X size={20} /></button>
                </div>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    {availability && availability.length > 0 ? availability.map((slot) => (
                        <div key={slot._id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Calendar size={16} className="text-black" />
                                <p className="text-sm font-bold">{slot.day} - {new Date(slot.date).toDateString()}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {slot.times.map((t, idx) => (
                                    <button key={idx} onClick={() => handleBookSlot(slot, t)} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold hover:border-emerald-500 transition-all">{t}</button>
                                ))}
                            </div>
                        </div>
                    )) : <div className="text-center py-10 font-bold uppercase text-slate-400 text-[10px]">No Availability Set</div>}
                </div>
            </div>
            {bookingLoading && <div className="absolute inset-0 z-[130] bg-white/60 backdrop-blur-sm flex items-center justify-center"><Loader2 className="animate-spin" size={40} /></div>}
        </div>
    );
};

export default AvailabilityModal;