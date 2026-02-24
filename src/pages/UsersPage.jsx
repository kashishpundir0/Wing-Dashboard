import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Mail, Phone, Loader2, UserX } from 'lucide-react';
import { fetchUsers } from '../api/usersApi';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        limit: 10
    });

    const getUsersData = async (page, search = '') => {
        setLoading(true);
        try {
            const data = await fetchUsers(page, pagination.limit, search);
            if (data.success) {
                setUsers(data.users);
                setPagination(prev => ({
                    ...prev,
                    currentPage: data.page,
                    totalPages: data.totalPages,
                    totalUsers: data.totalUsers
                }));
            }
        } catch (error) {
            console.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getUsersData(1, searchQuery);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            getUsersData(newPage, searchQuery);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                    <p className="text-sm text-slate-500">
                        {searchQuery ? `Found ${pagination.totalUsers} results for "${searchQuery}"` : `Manage and view all ${pagination.totalUsers} registered platform users`}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email or mobile..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64 transition-all"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Users Table Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative min-h-100">
                {loading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <Loader2 className="animate-spin text-indigo-600" size={32} />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">User Details</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Demographics</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Contact Information</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-700">{user.name || "Unknown User"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-slate-600 font-medium capitalize">
                                                    {user.gender || 'N/A'}, {user.age ? `${user.age} yrs` : 'Age N/A'}
                                                </span>
                                                <span className="text-xs text-slate-400">{user.state || 'No State'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                {/* Added Email Row */}
                                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                                    <Mail size={14} className="text-indigo-400" />
                                                    <span className="truncate max-w-50">{user.email || 'No Email'}</span>
                                                </div>
                                                {/* Mobile Row */}
                                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                                    <Phone size={14} className="text-slate-400" />
                                                    {user.mobile || 'No contact'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm text-slate-600">
                                                {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short', day: 'numeric', year: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                !loading && (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-2 text-slate-400">
                                                <UserX size={40} strokeWidth={1.5} />
                                                <p>No users found matching "{searchQuery}"</p>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {users.length > 0 && (
                    <div className="px-8 py-5 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
                        <p className="text-xs text-slate-500">
                            Showing {users.length} of {pagination.totalUsers} users
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={pagination.currentPage === 1}
                                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-1">
                                <span className="px-4 py-2 text-xs font-bold bg-white shadow-sm border border-slate-200 rounded-lg text-indigo-600">
                                    {pagination.currentPage}
                                </span>
                                <span className="text-xs text-slate-400 px-2">of {pagination.totalPages}</span>
                            </div>

                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersPage;