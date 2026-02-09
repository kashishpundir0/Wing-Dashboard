import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; 
import { getInterviewers, deleteInterviewer } from '../api/interviewerApi';
import WingmatesSignUp from './WingmatesSignUp';
import { UserPlus, Mail, MapPin, Edit3, Trash2, Sparkles } from 'lucide-react';

const Interviewers = () => {
  const [interviewers, setInterviewers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- AUTO GENERATION LOGIC ---
  const generateRandomData = () => {
    const prefixes = ['sky', 'pilot', 'wing', 'cloud', 'aero', 'fly', 'partner'];
    const cities = ['Chicago, IL', 'Mumbai, MH', 'London, UK', 'Dubai, UAE', 'New York, NY', 'Singapore'];
    const streets = ['Aviation Blvd', 'Skyline Road', 'Horizon St', 'Pilot Avenue'];
    
    const randomID = Math.floor(1000 + Math.random() * 9000);
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomStreet = streets[Math.floor(Math.random() * streets.length)];

    // Generate secure password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let generatedPassword = "";
    for (let i = 0; i < 10; i++) {
      generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return {
      email: `${randomPrefix}.${randomID}@wingmates.com`,
      address: `${Math.floor(Math.random() * 500)} ${randomStreet}, ${randomCity}`,
      password: generatedPassword,
      // Default placeholder values for form fields
      day: 'Monday',
      time: '10:00 AM'
    };
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
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-gray-800">Delete this record permanently?</p>
        <div className="flex gap-2 justify-end">
          <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1.5 text-xs font-bold text-gray-400">Cancel</button>
          <button 
            onClick={() => { toast.dismiss(t.id); executeDelete(id); }}
            className="px-4 py-1.5 bg-red-500 text-white text-xs font-black rounded-lg"
          >
            CONFIRM DELETE
          </button>
        </div>
      </div>
    ));
  };

  const executeDelete = async (id) => {
    const loadingToast = toast.loading("Processing...");
    try {
      await deleteInterviewer(id);
      toast.success("Record deleted!", { id: loadingToast });
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
    // We generate the random data first
    const autoData = generateRandomData();
    // We pass it as the "initialData" so the form inside WingmatesSignUp is pre-filled
    setSelectedInterviewer(autoData);
    setIsModalOpen(true);
    toast.success("New credentials auto-generated!", { icon: '✨' });
  };

  useEffect(() => { fetchInterviewers(); }, []);

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Partner Directory</h2>
          <p className="text-gray-500 text-sm font-medium">Manage and view all wingmates.</p>
        </div>
        <div className="flex gap-3">
            <button 
              onClick={openAddModal}
              className="bg-[#632281] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-purple-900 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles size={18} /> Add Interviewer
            </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-[#632281] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#632281] font-black uppercase tracking-widest text-[10px]">Syncing Directory...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {interviewers.map((person) => (
            <div key={person._id} className="bg-white p-6 rounded-2xl shadow-xl shadow-purple-900/5 border border-purple-50 hover:border-purple-200 transition-all group relative">
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => openEditModal(person)} className="p-2.5 bg-white text-purple-600 rounded-xl shadow-md border border-purple-50 hover:bg-purple-50">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDeleteConfirm(person._id)} className="p-2.5 bg-white text-red-500 rounded-xl shadow-md border border-red-50 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#632281] font-black text-2xl mb-4 shadow-inner">
                {person.email[0].toUpperCase()}
              </div>

              <h3 className="font-black text-gray-800 text-lg truncate pr-16 capitalize">{person.email.split('@')[0].replace(/[\._]/g, ' ')}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-6"><Mail size={12} className="text-purple-300"/> {person.email}</div>

              <div className="space-y-4 pt-4 border-t border-purple-50">
                <div className="flex items-start gap-2 text-xs text-gray-600 font-bold">
                    <MapPin size={14} className="text-purple-400 mt-0.5 shrink-0" /> 
                    <span className="leading-relaxed">{person.address || 'Location Not Set'}</span>
                </div>
                
                <div className="bg-purple-50/50 p-4 rounded-2xl grid grid-cols-2 gap-4 border border-purple-100/50">
                   <div className="space-y-1">
                      <span className="text-[9px] uppercase font-black text-purple-400 block tracking-tighter">Schedule</span>
                      <span className="text-xs font-bold text-gray-700 block">{person.day || '-'}</span>
                   </div>
                   <div className="space-y-1 text-right">
                      <span className="text-[9px] uppercase font-black text-purple-400 block tracking-tighter">Timing</span>
                      <span className="text-xs font-bold text-gray-700 block">{person.time || '-'}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
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