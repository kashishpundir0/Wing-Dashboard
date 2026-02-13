import React from 'react';
import { Search, Filter, MoreVertical, Mail, Phone } from 'lucide-react';

const UsersPage = () => {
    // Mock data - replace with your API call
    const users = [
        { id: 1, name: 'Alex Johnson', gender: 'Male', city: 'New York', age: 28, contact: 'alex@example.com', signupDate: '2023-10-12', status: 'Active' },
        { id: 2, name: 'Sarah Miller', gender: 'Female', city: 'London', age: 24, contact: '+1 234 567 890', signupDate: '2023-11-05', status: 'Pending' },
        { id: 3, name: 'Michael Chen', gender: 'Male', city: 'Singapore', age: 31, contact: 'm.chen@tech.com', signupDate: '2023-09-20', status: 'Active' },
        { id: 4, name: 'Emma Wilson', gender: 'Female', city: 'Sydney', age: 27, contact: 'emma.w@web.com', signupDate: '2023-12-01', status: 'Active' },
    ];

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                    <p className="text-sm text-slate-500">Manage and view all registered platform users</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64 transition-all"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Users Table Card */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">User Details</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Demographics</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Joined Date</th>
                                {/* <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th> */}
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-700">{user.name}</p>
                                                <p className="text-xs text-slate-400">ID: #USR-{user.id}042</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-600 font-medium">{user.gender}, {user.age} yrs</span>
                                            <span className="text-xs text-slate-400">{user.city}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                {user.contact.includes('@') ? <Mail size={12} /> : <Phone size={12} />}
                                                {user.contact}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm text-slate-600">{new Date(user.signupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </td>
                                    {/* <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td> */}
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-8 py-5 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-xs text-slate-500">Showing 1 to {users.length} of 48 users</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Previous</button>
                        <button className="px-4 py-2 text-xs font-bold bg-white shadow-sm border border-slate-200 rounded-lg text-indigo-600">1</button>
                        <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;