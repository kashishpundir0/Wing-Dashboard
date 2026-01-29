import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, UserPlus } from 'lucide-react';
import { loginUser, registerAdmin } from '../api/loginApi'; 

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false); // Mode toggle
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        // Handle Registration
        await registerAdmin(formData);
        alert("Admin registered successfully! Please login.");
        setIsRegister(false); // Switch to login mode
      } else {
        // Handle Login
        const data = await loginUser(formData);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        navigate('/overview');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-purple-100 p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="bg-purple-300 w-full max-w-md rounded-[3rem] shadow-2xl shadow-purple-100/50 p-10 md:p-12 z-10 border border-gray-50">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#632281] rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-orange-200 mb-4">
            W
          </div>
          <h1 className="text-3xl font-black text-gray-800">
            {isRegister ? "Admin Registration" : "Admin Portal"}
          </h1>
          <p className="text-gray-400 font-medium mt-1">
            {isRegister ? "Create a new admin account" : "Sign in to DateApp Admin"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-200 text-red-600 text-sm rounded-xl text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="email"
                required
                placeholder="admin@dateapp.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#632281] focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium text-gray-700"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-wider">Password</label>
              {!isRegister && <button type="button" className="text-xs font-bold text-[#632281] hover:underline">Forgot?</button>}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#632281] focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium text-gray-700"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                disabled={loading}
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
            disabled={loading}
            className="w-full bg-[#632281] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-purple-200 hover:bg-[#4d1a64] active:scale-[0.98] transition-all mt-4 disabled:bg-purple-400"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <span>{isRegister ? "Register Admin Account" : "Sign In to Dashboard"}</span>
                {isRegister ? <UserPlus size={20} /> : <ArrowRight size={20} />}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button" 
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="text-sm font-bold text-[#632281] hover:underline"
          >
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
          <p className="text-black-400 text-sm font-medium mt-6">
            &copy; 2024 DateApp Admin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;