import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getInterviewers, deleteInterviewer } from '../api/interviewerApi';
import WingmatesSignUp from './WingmatesSignUp';
import { UserPlus, Mail, MapPin, Edit3, Trash2, Phone, ClipboardList, Lock, Copy, AlertTriangle, Eye } from 'lucide-react';

const Interviewers = () => {
  const [interviewers, setInterviewers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInterviewers = async () => {
    setLoading(true);
    try {
      const data = await getInterviewers();
      // LOG THIS TO SEE WHAT THE BACKEND IS SENDING
      console.log("Full List Data from Server:", data);
      setInterviewers(data || []);
    } catch (error) {
      toast.error("Failed to sync directory.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-tight">
          <AlertTriangle size={16} className="text-red-500" />
          Confirm Removal?
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteInterviewer(id);
                toast.success("Partner Removed");
                fetchInterviewers();
              } catch (err) { toast.error("Delete failed"); }
            }}
            className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all"
          >
            Delete
          </button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest">Cancel</button>
        </div>
      </div>
    ), { duration: 5000, position: 'top-center' });
  };

  useEffect(() => { fetchInterviewers(); }, []);

  return (
    <div className="w-full px-4 md:px-0 lg:pl-10 pt-10 pb-20 animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 border-b border-slate-200 pb-6 mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1F1F2E] tracking-tight uppercase">Partner Directory</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Network Intelligence</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 px-6">
            <ClipboardList size={18} className="text-[#1F1F2E]" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Total</p>
              <p className="text-xl font-bold text-[#1F1F2E]">{interviewers.length}</p>
            </div>
          </div>
          <button
            onClick={() => { setSelectedInterviewer(null); setIsModalOpen(true); }}
            className="bg-[#1F1F2E] text-white px-6 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-black transition-all"
          >
            <UserPlus size={18} className="inline mr-2" /> Provision Partner
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#1F1F2E] rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {interviewers.map((person) => {
            // TRYING ALL POSSIBLE DATA PATHS FOR THE PASSWORD
            const accessKey = person.generatedCredentials?.password || person.password || person.pass || person.accessKey;

            return (
              <div key={person._id} className="bg-white p-7 rounded-[2.5rem] border border-slate-200 hover:shadow-xl transition-all relative flex flex-col">
                <div className="absolute top-6 right-6 flex gap-2">
                  <button onClick={() => { setSelectedInterviewer(person); setIsModalOpen(true); }} className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-[#1F1F2E] hover:text-white transition-all"><Edit3 size={14} /></button>
                  <button onClick={() => confirmDelete(person._id)} className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                </div>

                <div className="w-14 h-14 bg-[#1F1F2E] rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-5">{person.name?.[0]}</div>
                <h3 className="font-bold text-[#1F1F2E] text-lg uppercase mb-4">{person.name}</h3>

                <div className="space-y-3 flex-grow">
                  <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <Mail size={14} className="text-[#1F1F2E]" /> {person.email || person.generatedCredentials?.email || "N/A"}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <Phone size={14} className="text-[#1F1F2E]" /> {person.mobileNumber}
                  </div>

                  {/* PASSWORD BOX */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Lock size={12} className="text-emerald-600" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Access Key</span>
                      </div>
                      {accessKey && (
                        <button
                          onClick={() => { navigator.clipboard.writeText(accessKey); toast.success("Copied!"); }}
                          className="text-[8px] font-bold text-slate-400 hover:text-[#1F1F2E]"
                        >
                          COPY
                        </button>
                      )}
                    </div>
                    <code className="block w-full text-[10px] font-bold text-[#1F1F2E] tracking-tight bg-white px-2 py-2 rounded shadow-sm break-all min-h-[30px]">
                      {accessKey || "N/A"}
                    </code>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#1F1F2E]" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{person.city || person.address}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1F1F2E]/40 backdrop-blur-md">
          <WingmatesSignUp onClose={() => setIsModalOpen(false)} refreshData={fetchInterviewers} initialData={selectedInterviewer} />
        </div>
      )}
    </div>
  );
};

export default Interviewers;