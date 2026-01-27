import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import Layout Components
import Sidebar from './components/Layout/Sidebar';
import TopNav from './components/Layout/TopNav';

// Import Pages
import Overview from './pages/Overview';
import Interviews from './pages/Interviews';
import PlannedDates from './pages/PlannedDates';
import Restaurants from './pages/Restaurants';
import Login from './pages/Login';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // FIXED: Now both "/" and "/login" are treated as Login pages without Sidebar/TopNav
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  // Helper to get title based on path
  const getTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path || path === 'login') return 'Welcome';
    return path;
  };

  // 1. LOGIN LAYOUT (No Sidebar, No TopNav)
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* If they try to go to a non-existent page while logged out, send to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

  // 2. DASHBOARD LAYOUT (With Sidebar and TopNav)
  return (
    <div className="min-h-screen bg-[#FAFAFB] flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all duration-300">
        <TopNav 
          title={getTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />

        <main className="p-6 md:p-10 flex-1">
          <Routes>
            {/* The dashboard routes only start from /overview, /interviews etc. */}
            <Route path="/overview" element={<Overview />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/dates" element={<PlannedDates />} />
            <Route path="/restaurants" element={<Restaurants />} />
            
            {/* If they are in the dashboard area and hit an unknown route, go to overview */}
            <Route path="*" element={<Navigate to="/overview" />} />
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