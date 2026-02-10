import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; 
import { getInterviewers, deleteInterviewer } from '../api/interviewerApi';
import WingmatesSignUp from './WingmatesSignUp';
import { UserPlus, Mail, MapPin, Edit3, Trash2, User, Search } from 'lucide-react';

const Interviewers = () => {
  const [interviewers, setInterviewers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- SECURE PASSWORD GENERATION ---
  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let retVal = "";
    for (let i = 0; i < 12; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return retVal;
  };

  const fetchInterviewers = async () => {
    setLoading(true);
    try {
      const data = await getInterviewers();
      setInterviewers(data || []);
    } catch (error) {
      toast.error("Failed to sync directory.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <p className="text-sm font-bold text-slate-800">Delete this record permanently?</p>
        <div className="flex gap-2 justify-end">
          <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
          <button 
            onClick={() => { toast.dismiss(t.id); executeDelete(id); }}
            className="px-4 py-1.5 bg-red-500 text-white text-xs font-black rounded-lg hover:bg-red-600 shadow-md transition-all active:scale-95"
          >
            DELETE
          </button>
        </div>
      </div>
    ));
  };

  const executeDelete = async (id) => {
    const loadingToast = toast.loading("Processing...");
    try {
      await deleteInterviewer(id);
      toast.success("Record deleted", { id: loadingToast });
      fetchInterviewers();
    } catch (error) {
      toast.error("Delete failed.", { id: loadingToast });
    }
  };

  const openEditModal = (person) => {
    setSelectedInterviewer(person);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    // Admin provides info; system provides password
    setSelectedInterviewer({
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      password: generatePassword(),
    });
    setIsModalOpen(true);
  };

  useEffect(() => { fetchInterviewers(); }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Toaster position="top-center" />

      {/* Header & Primary Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Partner Directory</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage platform access for all wingmates.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 text-sm uppercase tracking-wider"
        >
          <UserPlus size={18} /> Add Interviewer
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Directory...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewers.map((person) => (
            <div key={person._id} className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all group relative">
              
              {/* Quick Actions (Hover) */}
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => openEditModal(person)} className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm">
                  <Edit3 size={15} />
                </button>
                <button onClick={() => handleDeleteConfirm(person._id)} className="p-2.5 bg-slate-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Avatar Box */}
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 font-black text-2xl mb-6 border border-slate-100">
                {person.name ? person.name[0].toUpperCase() : person.email[0].toUpperCase()}
              </div>

              {/* Identity Info */}
              <div className="space-y-1 pr-12">
                <h3 className="font-black text-slate-900 text-lg truncate capitalize tracking-tight">
                    {person.name || 'Unnamed Partner'}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <Mail size={12} className="text-slate-300" /> {person.email}
                </div>
              </div>

              {/* Location & Schedule Details */}
              <div className="mt-8 pt-6 border-t border-slate-50 space-y-4">
                <div className="flex items-start gap-3 text-xs text-slate-600 font-bold">
                    <MapPin size={16} className="text-slate-300 shrink-0 mt-0.5" /> 
                    <span className="leading-relaxed">{person.address || 'Location Not Defined'}</span>
                </div>
                
                <div className="bg-slate-50/50 p-4 rounded-2xl grid grid-cols-2 gap-4 border border-slate-50">
                   <div className="space-y-1">
                      <span className="text-[9px] uppercase font-black text-slate-300 block tracking-widest">Schedule</span>
                      <span className="text-xs font-bold text-slate-700 block">{person.day || 'PENDING'}</span>
                   </div>
                   <div className="space-y-1 text-right">
                      <span className="text-[9px] uppercase font-black text-slate-300 block tracking-widest">Timing</span>
                      <span className="text-xs font-bold text-slate-700 block">{person.time || '-'}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Integration */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <WingmatesSignUp 
              isModal={true} 
              isAdminView={true} // Only shows identity fields & auto-gen password
              onClose={() => setIsModalOpen(false)} 
              refreshData={() => fetchInterviewers()} 
              initialData={selectedInterviewer}
           />
        </div>
      )}
    </div>
  );
};

export default Interviewers;