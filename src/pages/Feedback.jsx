import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search,
  Filter,
  User,
  Star,
  MoreVertical,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Smile,
  Frown,
  Meh
} from 'lucide-react';

const Feedback = () => {
  const [filter, setFilter] = useState('All');

  // Mock Data for User Feedbacks
  const feedbackData = [
    {
      id: 1,
      user: "Kashish Pundir",
      email: "kashish@gmail.com",
      rating: 5,
      sentiment: "Amazing",
      comment: "The interface is extremely clean and easy to navigate. I love the new appointment scheduling feature!",
      date: "Oct 24, 2023",
      status: "Read"
    },
    {
      id: 2,
      user: "Rohan Sharma",
      email: "rohan.s@outlook.com",
      rating: 3,
      sentiment: "Okay",
      comment: "The platform is good but I experienced some lag during the video call yesterday.",
      date: "Oct 23, 2023",
      status: "Unread"
    },
    {
      id: 3,
      user: "Ananya Iyer",
      email: "ananya.i@gmail.com",
      rating: 2,
      sentiment: "Bad",
      comment: "I found it difficult to find the restaurant menu on the mobile version. Please improve the UX for small screens.",
      date: "Oct 22, 2023",
      status: "Read"
    },
    {
      id: 4,
      user: "Vikram Singh",
      email: "v.singh@wingmates.in",
      rating: 5,
      sentiment: "Amazing",
      comment: "Excellent support team! They resolved my query within 10 minutes.",
      date: "Oct 21, 2023",
      status: "Read"
    }
  ];

  const stats = [
    { label: "Total Responses", value: "1,284", icon: MessageSquare, trend: "+12%" },
    { label: "Avg. Rating", value: "4.8", icon: Star, trend: "+0.2" },
    { label: "Positive Sentiment", value: "92%", icon: TrendingUp, trend: "+5%" },
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'Amazing': return <Smile className="text-emerald-500" size={18} />;
      case 'Okay': return <Meh className="text-amber-500" size={18} />;
      case 'Bad': return <Frown className="text-rose-500" size={18} />;
      default: return <Smile size={18} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6 bg-white min-h-screen">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">User Feedback</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Sentiment & Experience Analysis</p>
        </div>
        
        {/* Quick Stats Grid */}
        <div className="flex flex-wrap gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl min-w-[160px]">
              <div className="flex justify-between items-start mb-2">
                <stat.icon size={16} className="text-slate-400" />
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                  <ArrowUpRight size={10} /> {stat.trend}
                </span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 mt-0.5">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-100 w-full md:w-auto">
          {['All', 'Positive', 'Neutral', 'Negative'].map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === opt ? 'bg-black text-white shadow-lg' : 'text-slate-400 hover:text-black'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="SEARCH FEEDBACK..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:border-black outline-none transition-all uppercase tracking-widest" 
          />
        </div>
      </div>

      {/* 3. Feedback List */}
      <div className="grid grid-cols-1 gap-4">
        {feedbackData.map((item) => (
          <div key={item.id} className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-slate-200 transition-all group">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              
              {/* User Info & Rating */}
              <div className="flex gap-4 min-w-[240px]">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 font-black shrink-0 border border-slate-200">
                  {item.user[0]}
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{item.user}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.email}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={i < item.rating ? 'fill-black text-black' : 'text-slate-200'} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1 bg-slate-50/50 p-5 rounded-2xl border border-slate-50 relative">
                <div className="flex items-center gap-2 mb-2">
                  {getSentimentIcon(item.sentiment)}
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.sentiment}</span>
                </div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed italic">"{item.comment}"</p>
                {item.status === 'Unread' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* Date & Actions */}
              <div className="flex md:flex-col justify-between items-end min-w-[100px]">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.date}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-black">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-center pt-6 pb-10">
        <button className="px-10 py-4 bg-slate-50 border border-slate-200 text-slate-400 font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-black hover:text-white hover:border-black transition-all">
          Load Archive
        </button>
      </div>

    </div>
  );
};

export default Feedback;