import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; 
import { getInterviewers, deleteInterviewer } from '../api/interviewerApi';
import WingmatesSignUp from './WingmatesSignUp';
import { UserPlus, Mail, MapPin, Edit3, Trash2 } from 'lucide-react';

const Interviewers = () => {
  const [interviewers, setInterviewers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInterviewers = async () => {
    setLoading(true);
    try {
      const data = await getInterviewers();
      setInterviewers(data || []);
    } catch (error) {
      toast.error("Failed to sync directory with server.", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-gray-800">Delete this record permanently?</p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              toast.dismiss(t.id);
              executeDelete(id);
            }}
            className="px-4 py-1.5 bg-red-500 text-white text-xs font-black rounded-lg hover:bg-red-600 transition-all shadow-md"
          >
            CONFIRM DELETE
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  };

  const executeDelete = async (id) => {
    const loadingToast = toast.loading("Processing deletion...");
    try {
      await deleteInterviewer(id);
      // Added duration here to override the infinite loading toast duration
      toast.success("Record deleted successfully!", { 
        id: loadingToast, 
        duration: 3000 
      });
      fetchInterviewers();
    } catch (error) {
      toast.error("Delete failed. Check permissions.", { 
        id: loadingToast, 
        duration: 4000 
      });
    }
  };

  const openEditModal = (person) => {
    setSelectedInterviewer(person);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedInterviewer(null);
    setIsModalOpen(true);
  };

  useEffect(() => { fetchInterviewers(); }, []);

  return (
    <div className="space-y-6">
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 3000, // Global auto-dismiss after 3 seconds
          style: {
            borderRadius: '16px',
            background: '#fff',
            color: '#632281',
            fontWeight: 'bold',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
          success: { 
            duration: 3000,
            iconTheme: { primary: '#632281', secondary: '#fff' } 
          },
          error: {
            duration: 4000
          }
        }}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800">Interviewer Directory</h2>
          <p className="text-gray-500 text-sm font-medium">Manage and view all flight partners.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#632281] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-purple-900 transition-all hover:scale-105 active:scale-95"
        >
          <UserPlus size={18} /> Add New Partner
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-[#632281] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#632281] font-black uppercase tracking-widest text-xs">Loading Directory...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {interviewers.map((person) => (
            <div key={person._id} className="bg-linear-to-br from-purple-200 to-pink-100 p-6 rounded-xl shadow-sm border border-gray-100 hover:border-purple-300 transition-all group relative">
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => openEditModal(person)} className="p-2.5 bg-white text-purple-600 rounded-xl shadow-md hover:bg-purple-50">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDeleteConfirm(person._id)} className="p-2.5 bg-white text-red-500 rounded-xl shadow-md hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-[#632281] font-black text-2xl mb-4">
                {person.email[0].toUpperCase()}
              </div>

              <h3 className="font-black text-gray-800 text-lg truncate pr-16 capitalize">{person.email.split('@')[0].replace('.', ' ')}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-6"><Mail size={12} /> {person.email}</div>

              <div className="space-y-4 pt-4 border-t border-purple-50">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-bold"><MapPin size={14} className="text-purple-400" /> {person.address || 'N/A'}</div>
                <div className="bg-white/40 p-4 rounded-2xl grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <span className="text-[9px] uppercase font-black text-purple-400 block tracking-tighter">Schedule</span>
                      <span className="text-xs font-bold text-gray-700 block">{person.day || '-'}</span>
                      <span className="text-[10px] text-purple-600 font-bold">{person.date || ''}</span>
                   </div>
                   <div className="space-y-1 text-right">
                      <span className="text-[9px] uppercase font-black text-purple-400 block tracking-tighter">Timing</span>
                      <span className="text-xs font-bold text-gray-700 block">{person.time || '-'}</span>
                      <span className="text-[10px] text-purple-600 font-bold">{person.slot || ''}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <WingmatesSignUp 
              isModal={true} 
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