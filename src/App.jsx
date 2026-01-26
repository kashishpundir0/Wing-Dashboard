import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import Layout Components
import Sidebar from './components/Layout/Sidebar';
import TopNav from './components/Layout/TopNav';

// Import Pages (Ensure these files exist in your pages folder)
import Overview from './pages/Overview';
import Interviews from './pages/Interviews';
import PlannedDates from './pages/PlannedDates';
import Restaurants from './pages/Restaurants';
import Login from './pages/Login';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  const isLoginPage = location.pathname === '/login';

  // Helper to get title based on path
  const getTitle = () => {
    const path = location.pathname.split('/')[1];
    return path || 'Dashboard';
  };

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFB] flex">
      {/* Sidebar logic handles its own mobile visibility via props */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* 
          Main Content Area 
          lg:ml-64 means it only adds margin for sidebar on large screens 
      */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all duration-300">
        <TopNav 
          title={getTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />

        <main className="p-6 md:p-10 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/dates" element={<PlannedDates />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;