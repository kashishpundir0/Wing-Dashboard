import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, Loader2, UserX, MapPin, Calendar, Smartphone } from 'lucide-react';
import { fetchUsers } from '../api/usersApi';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getUsersData();
    }, []);

    const getUsersData = async () => {
        setLoading(true);
        try {
            const response = await fetchUsers();
            if (response.success) {
                // FILTER: Only show users with the role "user"
                const onlyUsers = response.data.filter(u => u.role === 'user');
                setUsers(onlyUsers);
            }
        } catch (error) {
            console.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    // Age Calculation
    const calculateAge = (dob) => {
        if (!dob) return "N/A";
        const birthDate = new Date(dob);
        const difference = Date.now() - birthDate.getTime();
        const ageDate = new Date(difference);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    // Search Filter logic (Search by name, email, or phone)
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile?.includes(searchQuery)
    );

    return (
        <div className="space-y-6 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
                    <p className="text-sm text-slate-500 font-medium">
                        Detailed overview of all platform <span className="text-indigo-600 font-bold">Candidates</span>
                    </p>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email or ph..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 w-72 transition-all font-semibold"
                    />
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                        <Loader2 className="animate-spin text-indigo-600" size={32} />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile</th>
                                <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Demographics</th>
                                <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Details</th>
                                <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Bio / Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50/50 transition-all">
                                        {/* Profile Column */}
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-indigo-50 border-2 border-white shadow-sm shrink-0">
                                                    {user.photos?.[0] ? (
                                                        <img src={user.photos[0]} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-indigo-600 font-black">
                                                            {user.name?.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="font-bold text-slate-800 text-base">{user.name}</p>
                                            </div>
                                        </td>

                                        {/* Demographics Column */}
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-slate-700 font-bold">
                                                    {user.gender || 'N/A'} • {calculateAge(user.DOB)} yrs
                                                </span>
                                                <div className="flex items-center gap-1 text-slate-400">
                                                    <MapPin size={12} />
                                                    <span className="text-[10px] font-bold uppercase tracking-tighter">
                                                        {user.state || 'Location N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Contact Details Column (EMAIL AND PHONE) */}
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-2">
                                                {/* Email Row */}
                                                <div className="flex items-center gap-2.5 group/contact">
                                                    <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500 group-hover/contact:bg-indigo-600 group-hover/contact:text-white transition-colors">
                                                        <Mail size={12} />
                                                    </div>
                                                    <span className="text-xs font-semibold text-slate-600">{user.email || 'No email'}</span>
                                                </div>

                                                {/* Phone Row */}
                                                <div className="flex items-center gap-2.5 group/contact">
                                                    <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-500 group-hover/contact:bg-emerald-600 group-hover/contact:text-white transition-colors">
                                                        <Smartphone size={12} />
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-700">
                                                        {user.mobile || user.phone || '+91 ————————'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Bio / Joined Column */}
                                        <td className="px-6 py-6">
                                            <div className="max-w-xs space-y-2">
                                                <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                                                    "{user.story || 'No bio available'}"
                                                </p>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Calendar size={12} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                !loading && (
                                    <tr>
                                        <td colSpan="4" className="py-24 text-center">
                                            <div className="flex flex-col items-center gap-3 text-slate-300">
                                                <UserX size={48} strokeWidth={1} />
                                                <p className="text-xs font-black uppercase tracking-widest">No users found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Status Footer */}
                <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Role Filter: Candidates Only
                    </p>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                        Total Users: {filteredUsers.length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;