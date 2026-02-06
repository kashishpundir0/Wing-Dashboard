import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// 1. IMPORT LAYOUT COMPONENTS
import Sidebar from './components/Layout/Sidebar';
import TopNav from './components/Layout/TopNav';

// 2. IMPORT ALL PAGES (Ensure these paths match your folder structure)
import Login from './pages/Login'; // <--- THIS WAS LIKELY MISSING
import Overview from './pages/Overview';
import Interviews from './pages/Interviews';
import PlannedDates from './pages/PlannedDates';
import Restaurants from './pages/Restaurants';
import Demographics from './pages/Demographics';
import Interviewers from './pages/Interviewers';
import Feedback from './pages/Feedback';

//    RBAC 
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'psychiatrist' ? "/interviews" : "/overview"} replace />;
  }

  return children;
};

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');
  
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';


  const getTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path || path === 'login') return 'Welcome';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  // LOGIN LAYOUT
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

  // DASHBOARD LAYOUT (With Sidebar and TopNav)
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
            {/* ADMIN ONLY ROUTES */}
            <Route path="/overview" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Overview />
              </ProtectedRoute>
            } />
            <Route path="/demographics" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Demographics />
              </ProtectedRoute>
            } />
            <Route path="/interviewer-list" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Interviewers />
              </ProtectedRoute>
            } />
            <Route path="/dates" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PlannedDates />
              </ProtectedRoute>
            } />
            <Route path="/restaurants" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Restaurants />
              </ProtectedRoute>
            } />

            {/* SHARED ROUTES (Psychiatrist can access) */}
            <Route path="/interviews" element={
              <ProtectedRoute allowedRoles={['admin', 'psychiatrist']}>
                <Interviews />
              </ProtectedRoute>
            } />
            <Route path="/feedback" element={
              <ProtectedRoute allowedRoles={['admin', 'psychiatrist']}>
                <Feedback/>
              </ProtectedRoute>
            } />

            {/* FALLBACK REDIRECT */}
            <Route path="*" element={
              <Navigate to={userRole === 'psychiatrist' ? "/interviews" : "/overview"} />
            } />
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