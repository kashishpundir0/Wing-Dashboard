import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../components/Shared/Button';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in...", formData);
    navigate('/overview');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAFAFB] p-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl shadow-purple-100/50 p-10 md:p-12 z-10 border border-gray-50">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#632281] rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-orange-200 mb-4">
            W
          </div>
          <h1 className="text-3xl font-black text-gray-800">Admin Portal</h1>
          <p className="text-gray-400 font-medium mt-1">Please sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="email"
                required
                placeholder="admin@company.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#632281] focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium text-gray-700"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-wider">Password</label>
              <button type="button" className="text-xs font-bold text-[#632281] hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#632281] focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium text-gray-700"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

        

          <button 
            type="submit"
            className="w-full bg-[#632281] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-purple-200 hover:bg-[#4d1a64] active:scale-[0.98] transition-all mt-4"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight size={20} />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm font-medium">
            Protected by secure encryption. <br />
            &copy; 2024 DateApp Admin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;