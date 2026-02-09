import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, UserPlus, ArrowLeft } from 'lucide-react';
import { loginUser, registerAdmin, forgotPassword } from '../api/loginApi';
import LogoImg from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login', 'register', or 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Success message

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'register') {
        // registration logic...
      } else {
        const data = await loginUser(formData);
        
        // 1. Save Token
        localStorage.setItem('token', data.token);
        
        // 2. Save User Role (Ensure your API returns 'role' or set it based on email)
        // If your API returns data.role, use that. Otherwise, for testing:
        const role = data.role || 'admin'; 
        localStorage.setItem('userRole', role);
        
        navigate('/overview');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Helper to change modes
  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setMessage('');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-purple-100 p-4">
      {/* Background blobs... */}

      <div className="bg-purple-300 w-full max-w-md rounded-[3rem] shadow-2xl p-10 md:p-12 z-10 border border-gray-50">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#632281] rounded-3xl flex items-center justify-center text-white font-black text-3xl mb-4">
            <img
              src={LogoImg}
              alt="WingMann Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-black text-gray-800">
            {mode === 'register' ? "Admin Registration" : mode === 'forgot' ? "Reset Password" : "Admin Portal"}
          </h1>
          <p className="text-gray-400 font-medium mt-1">
            {mode === 'register' ? "Create a new admin account" :
              mode === 'forgot' ? "Enter email to receive reset link" :
                "Sign in to DateApp Admin"}
          </p>
        </div>

        {/* Status Alerts */}
        {error && <div className="mb-6 p-3 bg-red-100 border border-red-200 text-red-600 text-sm rounded-xl text-center font-bold">{error}</div>}
        {message && <div className="mb-6 p-3 bg-green-100 border border-green-200 text-green-600 text-sm rounded-xl text-center font-bold">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field - Always Visible */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                required
                placeholder="admin@dateapp.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#632281] outline-none transition-all font-medium text-gray-700"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field - Hidden in Forgot Mode */}
          {mode !== 'forgot' && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-wider">Password</label>
                {/* {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-xs font-bold text-[#632281] hover:underline"
                  >
                    Forgot?
                  </button>
                )} */}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#632281] outline-none transition-all font-medium text-gray-700"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#632281] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:bg-[#4d1a64] active:scale-[0.98] transition-all disabled:bg-purple-400"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <span>
                  {mode === 'register' ? "Register Account" :
                    mode === 'forgot' ? "Send Reset Link" : "Sign In to Dashboard"}
                </span>
                {mode === 'register' ? <UserPlus size={20} /> : <ArrowRight size={20} />}
              </>
            )}
          </button>
        </form>

        {/* <div className="mt-8 text-center">
          {mode === 'forgot' ? (
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="text-sm font-bold text-[#632281] flex items-center justify-center gap-2 mx-auto hover:underline"
            >
              <ArrowLeft size={16} /> Back to Login
            </button>
          ) : (
            <button
              type="button"
              onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm font-bold text-[#632281] hover:underline"
            >
              {mode === 'login' ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Login;