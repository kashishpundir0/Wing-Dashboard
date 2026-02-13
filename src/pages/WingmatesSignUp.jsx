import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Loader2, Lock, ShieldCheck, CheckCircle2, Copy } from 'lucide-react';
import { registerInterviewer, updateInterviewer } from '../api/interviewerApi';
import toast from 'react-hot-toast';

const WingmatesSignUp = ({ onClose, refreshData, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    city: '',
    state: 'Maharashtra',
    password: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.generatedCredentials?.email || initialData.email || '',
        mobileNumber: initialData.mobileNumber || '',
        city: initialData.city || '',
        state: initialData.state || 'Maharashtra',
        password: initialData.generatedCredentials?.password || initialData.password || '',
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        const updatePayload = {
          name: formData.name,
          mobileNumber: formData.mobileNumber,
          city: formData.city,
          state: formData.state
        };
        await updateInterviewer(initialData._id, updatePayload);
        toast.success("Intelligence Updated");
        refreshData();
        onClose();
      } else {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('mobileNumber', formData.mobileNumber);
        data.append('city', formData.city);
        data.append('state', formData.state);
        data.append('country', 'India');
        data.append('address', formData.city);
        data.append('pincode', '123456');
        data.append('gender', 'male');
        data.append('isActive', 'true');

        const response = await registerInterviewer(data);

        // ACCESS THE PASSWORD FROM API RESPONSE
        if (response.success && response.data.generatedCredentials) {
          setCreatedCredentials(response.data.generatedCredentials);
          toast.success("Partner Provisioned Successfully");
          refreshData();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN (Shows the rach8521 style password)
  if (createdCredentials) {
    return (
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 p-10 md:p-12 animate-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#1F1F2E] uppercase tracking-tight">Provision Successful</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Temporary Login Access</p>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Email ID</p>
            <p className="text-sm font-bold text-[#1F1F2E]">{createdCredentials.email}</p>
          </div>

          <div className="p-5 bg-[#1F1F2E] rounded-2xl text-white">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Access Key</p>
              <Lock size={12} className="text-emerald-400" />
            </div>
            <div className="flex items-center justify-between">
              <code className="text-lg font-bold tracking-widest text-emerald-400">{createdCredentials.password}</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(createdCredentials.password);
                  toast.success("Password copied!");
                }}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="w-full py-5 bg-[#1F1F2E] text-white rounded-xl font-bold uppercase text-[11px] tracking-widest mt-8">
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
      <div className="p-10 md:p-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1F1F2E] tracking-tight uppercase leading-none">
              {initialData ? 'Update Intel' : 'New Provision'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
              Credential Management
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-lg hover:bg-[#1F1F2E] hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              placeholder="FULL NAME"
              required
              className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-xl text-[11px] font-bold uppercase tracking-widest focus:bg-white outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                placeholder="MOBILE"
                required
                className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-xl text-[11px] font-bold uppercase tracking-widest focus:bg-white outline-none"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                placeholder="CITY"
                required
                className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-xl text-[11px] font-bold uppercase tracking-widest focus:bg-white outline-none"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          {/* {initialData && (
            <div className="p-5 bg-[#1F1F2E] rounded-2xl text-white mt-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Assigned Access Key</p>
                <Lock size={12} className="text-emerald-400" />
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-emerald-400" />
                <code className="text-[10px] font-bold tracking-widest break-all">
                  {formData.password || "N/A"}
                </code>
              </div>
            </div>
          )} */}

          {!initialData && (
            <div className="text-center bg-slate-50 p-5 rounded-xl border border-dashed border-slate-200">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                Backend will automatically generate <br />
                <span className="text-[#1F1F2E]">Email</span> and <span className="text-[#1F1F2E]">Access Key</span>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#1F1F2E] text-white rounded-xl font-bold uppercase text-[11px] tracking-widest shadow-lg hover:bg-black transition-all flex items-center justify-center gap-3 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (initialData ? 'Update Intel' : 'Confirm Provision')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WingmatesSignUp;