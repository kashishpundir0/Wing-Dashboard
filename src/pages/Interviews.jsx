import React, { useState, useEffect } from 'react';
import {
    Video, X, CheckCircle2,
    Calendar as CalendarIcon, UserCheck, AlertCircle, Loader2
} from 'lucide-react';
import { interviewApi } from '../api/interviewApi';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-10 right-10 z-[100] animate-in slide-in-from-right-10 duration-300">
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <p className="font-bold text-sm">{message}</p>
            </div>
        </div>
    );
};

const Interviews = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [selectedDate, setSelectedDate] = useState('All');

    const [rejectingUser, setRejectingUser] = useState(null);
    const [rejectionComment, setRejectionComment] = useState('');

    const userRole = localStorage.getItem('userRole');
    const currentUserName = localStorage.getItem('userName') || "Interviewer";

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await interviewApi.getBookings();
            if (response.success) {
                // Assuming response structure is { success: true, data: [...] }
                setBookings(response.data || []);
            }
        } catch (error) {
            showNotify('Failed to load bookings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showNotify = (msg, type = 'success') => setNotification({ msg, type });

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    const filteredData = bookings.filter(item => {
        if (selectedDate === 'All') return true;
        return formatDate(item.date) === selectedDate;
    });

    const uniqueDates = ['All', ...new Set(bookings.map(item => formatDate(item.date)))];

    // --- API ACTION: APPROVE ---
    const handleApprove = async (id) => {
        try {
            setActionLoading(true);
            const res = await interviewApi.updateBookingStatus(id, 'accepted');
            if (res.success) {
                showNotify('Interview Approved successfully', 'success');
                fetchBookings(); // Refresh list
            }
        } catch (error) {
            showNotify(error.message || 'Approval failed', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    // --- API ACTION: REJECT ---
    const handleConfirmReject = async () => {
        if (!rejectionComment.trim()) {
            showNotify('Please provide a reason for rejection', 'error');
            return;
        }

        try {
            setActionLoading(true);
            const res = await interviewApi.updateBookingStatus(rejectingUser._id, 'rejected', rejectionComment);
            if (res.success) {
                showNotify(`Rejected ${rejectingUser.userName}`, 'success');
                setRejectingUser(null);
                setRejectionComment('');
                fetchBookings(); // Refresh list
            }
        } catch (error) {
            showNotify(error.message || 'Rejection failed', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    const openMeet = (link) => {
        if (link) { window.open(link, '_blank'); }
        else { showNotify('Meeting link not available', 'error'); }
    };

    if (loading) return <div className="p-10 text-center font-bold text-slate-500">Loading pipeline...</div>;

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
                    {uniqueDates.map(date => (
                        <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedDate === date ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
                        >
                            {date}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/80 border-b border-slate-200">
                        <tr>
                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Candidate</th>
                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Schedule</th>
                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredData.length > 0 ? filteredData.map((booking) => (
                            <tr key={booking._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                            {booking.userName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{booking.userName}</p>
                                            <p className="text-[10px] text-slate-400 font-medium uppercase">{booking.userEmail}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <CalendarIcon size={16} className="text-indigo-500" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-700">{formatDate(booking.date)}</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{booking.time}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${booking.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                                            booking.status === 'rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {booking.status || 'pending'}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2.5">
                                        <button
                                            onClick={() => openMeet(booking.meetLink)}
                                            className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:-translate-y-0.5 transition-all"
                                            title="Join Meeting"
                                        >
                                            <Video size={18} />
                                        </button>

                                        {/* Show controls only if status is not already decided or allow overrides */}
                                        <button
                                            disabled={actionLoading}
                                            onClick={() => setRejectingUser(booking)}
                                            className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                                        >
                                            Reject
                                        </button>

                                        <button
                                            disabled={actionLoading}
                                            onClick={() => handleApprove(booking._id)}
                                            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                                        >
                                            {actionLoading ? <Loader2 size={14} className="animate-spin" /> : 'Approve'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="px-8 py-10 text-center text-slate-400 font-medium">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Rejection Modal */}
            {rejectingUser && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-4xl p-8 shadow-2xl border border-rose-50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-slate-900">Rejection Reason</h3>
                            <button onClick={() => setRejectingUser(null)}><X size={20} className="text-slate-400" /></button>
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Rejecting: {rejectingUser.userName}</p>
                        <textarea
                            autoFocus
                            value={rejectionComment}
                            onChange={(e) => setRejectionComment(e.target.value)}
                            placeholder="Detail why this profile was rejected (Mandatory)..."
                            className="w-full h-40 bg-slate-50 border border-slate-100 rounded-3xl p-5 text-slate-700 font-medium focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all resize-none outline-none"
                        />
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button
                                onClick={() => setRejectingUser(null)}
                                className="py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold text-xs uppercase hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={actionLoading || !rejectionComment.trim()}
                                onClick={handleConfirmReject}
                                className="py-4 rounded-2xl bg-rose-600 text-white font-bold text-xs uppercase shadow-lg hover:bg-rose-700 transition-all disabled:bg-slate-300 flex items-center justify-center gap-2"
                            >
                                {actionLoading ? <Loader2 size={16} className="animate-spin" /> : 'Confirm Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Interviews;