import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Mail, 
  Frown, 
  Meh, 
  Smile, 
  Laugh, 
  Angry, 
  CheckCircle2 
} from 'lucide-react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ratings = [
    { id: 1, icon: <Angry size={32} />, label: "Terrible", color: "hover:text-red-500" },
    { id: 2, icon: <Frown size={32} />, label: "Bad", color: "hover:text-orange-500" },
    { id: 3, icon: <Meh size={32} />, label: "Okay", color: "hover:text-yellow-500" },
    { id: 4, icon: <Smile size={32} />, label: "Good", color: "hover:text-green-500" },
    { id: 5, icon: <Laugh size={32} />, label: "Amazing", color: "hover:text-emerald-500" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating");
    setIsSubmitted(true);
    // Logic to send feedback to API would go here
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-purple-100 flex flex-col items-center text-center max-w-md border border-purple-50">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={44} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-500 font-medium">Your feedback has been received. We appreciate your help in making Wingmann better.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="mt-8 text-[#632281] font-black uppercase text-xs tracking-widest hover:underline"
          >
            Send another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-100 text-[#632281] rounded-2xl">
          <MessageSquare size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-800">Feedback</h1>
          <p className="text-purple-500 font-medium">We value your thoughts on the experience.</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-purple-100 border border-purple-50 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Illustration/Text Area */}
        <div className="bg-[#632281] p-12 text-white md:w-1/3 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-black leading-tight mb-4">How's your experience with Wingmann?</h2>
            <p className="text-purple-200 font-medium">Your genuine feedback will help us to serve you better and improve our platform.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-1 bg-purple-400 rounded-full mb-4 opacity-50"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Admin Portal v1.0</p>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="p-8 md:p-12 md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Rating Selection */}
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Rate your experience</label>
              <div className="flex justify-between items-center max-w-sm">
                {ratings.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRating(item.id)}
                    className={`group flex flex-col items-center gap-2 transition-all duration-300 ${
                      rating === item.id ? 'scale-125 text-[#632281]' : 'text-gray-300 hover:scale-110'
                    } ${item.color}`}
                  >
                    <div className={`${rating === item.id ? 'bg-purple-100 p-2 rounded-xl' : ''}`}>
                      {item.icon}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-tighter transition-opacity ${rating === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Your Comments</label>
              <textarea 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write message..."
                className="w-full h-40 p-6 bg-purple-50 border-2 border-transparent focus:border-purple-200 focus:bg-white rounded-[2rem] outline-none transition-all font-medium text-gray-700 resize-none shadow-inner"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span className="text-xs font-bold italic">hello@wingmann.in</span>
              </div>
              
              <button 
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#632281] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-purple-100 hover:bg-purple-900 transition-all active:scale-95"
              >
                Send Feedback <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;