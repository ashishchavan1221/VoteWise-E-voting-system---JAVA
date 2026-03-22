import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import AOS from 'aos';

function App() {
  const [alert, setAlert] = useState(null);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ once: true, offset: 50 });
  }, []);

  // Simple global alert mechanism attached to window for easy migration
  window.showAlert = (msg, type = 'success') => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="font-sans text-gray-900 flex flex-col min-h-screen relative">
      {!isAuthPage && <Header />}
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}

      <Chatbot />

      {/* Global Alert */}
      {alert && (
        <div className={`fixed top-6 right-6 px-8 py-4 rounded-3xl text-white font-bold shadow-2xl z-50 transition-all duration-500 animate-[fadeInScale_0.3s_ease-out] ${alert.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          <div className="flex items-center gap-3">
            <span>{alert.type === 'success' ? '🗳️' : '⚠️'}</span>
            <span>{alert.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
