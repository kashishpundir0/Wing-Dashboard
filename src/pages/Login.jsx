import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Shield } from 'lucide-react';
import { loginUser } from '../api/loginApi';
import LogoImg from '../assets/logo.png';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the updated API function
      const response = await loginUser(formData);

      // Use the name directly from the response object
      toast.success(`Welcome back, ${response.userName}`);

      if (response.role === 'interviewer') {
        navigate('/interviewer-overview');
      } else {
        navigate('/overview');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6 font-sans">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] p-10 md:p-12 border border-slate-100 relative overflow-hidden">

        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

        <div className="flex flex-col items-center mb-12 relative z-10">
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center p-2.5 shadow-xl mb-6">
            <img src={LogoImg} alt="Logo" className="w-full h-full object-contain invert brightness-0" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">WingMann Portal</h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 text-center">
            Secure Identity Management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-[0.2em]">Email Identifier</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                required
                placeholder="email@wingmann.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-black outline-none transition-all font-semibold text-slate-700"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-[0.2em]">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-black outline-none transition-all font-semibold text-slate-700"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl hover:bg-slate-800 active:scale-[0.98] transition-all disabled:bg-slate-200"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <><span>Sign In</span><ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-2 opacity-30">
          <Shield size={16} className="text-black" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Encrypted Session</span>
        </div>
      </div>
    </div>
  );
};

export default Login;