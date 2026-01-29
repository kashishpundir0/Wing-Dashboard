import React, { useEffect, useState } from 'react';
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
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this interviewer permanently?")) {
      try {
        await deleteInterviewer(id);
        fetchInterviewers();
      } catch (error) {
        alert("Delete failed.");
      }
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800">Interviewer Directory</h2>
          <p className="text-gray-500 text-sm font-medium">Manage and view all flight partners.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#632281] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-purple-900 transition-all"
        >
          <UserPlus size={18} /> Add New
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-[#632281] font-bold animate-pulse">Loading Directory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {interviewers.map((person) => (
            <div key={person._id} className="bg-gradient-to-br from-purple-200 to-pink-100 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-purple-300 transition-all group relative">
              
              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => openEditModal(person)} className="p-2.5 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDelete(person._id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-[#632281] font-black text-2xl mb-4">
                {person.email[0].toUpperCase()}
              </div>

              <h3 className="font-black text-gray-800 text-lg truncate pr-16 capitalize">{person.email.split('@')[0].replace('.', ' ')}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-6"><Mail size={12} /> {person.email}</div>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-bold"><MapPin size={14} className="text-purple-400" /> {person.address || 'N/A'}</div>
                
                <div className="bg-purple-50/50 p-4 rounded-2xl grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <span className="text-[9px] uppercase font-black text-purple-400 block">Schedule</span>
                      <span className="text-xs font-bold text-gray-700 block">{person.day || '-'}</span>
                      <span className="text-[10px] text-purple-600 font-bold">{person.date || ''}</span>
                   </div>
                   <div className="space-y-1 text-right">
                      <span className="text-[9px] uppercase font-black text-purple-400 block">Timing</span>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <WingmatesSignUp 
              isModal={true} 
              onClose={() => setIsModalOpen(false)} 
              refreshData={fetchInterviewers} 
              initialData={selectedInterviewer}
           />
        </div>
      )}
    </div>
  );
};

export default Interviewers;