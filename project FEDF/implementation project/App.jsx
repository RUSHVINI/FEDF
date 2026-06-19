import React, { useState } from 'react';
import Dashboard from './components/Dashboard';

// 🌐 MAIN REACT APPLICATION FLOW ARCHITECTURE
export default function App() {
  const [user, setUser] = useState({
    name: 'Rakib',
    email: 'rakib@medicare.com',
    profilePic: '👨‍🦱'
  });

  const handleLogout = () => {
    alert('Logging out of your secure DocPot health session...');
    setUser(null);
  };

  const handleLogin = () => {
    setUser({
      name: 'Rakib',
      email: 'rakib@medicare.com',
      profilePic: '👨‍🦱'
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {user ? (
        // Only the Dashboard is rendered if user exists
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        // Fallback login view
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl text-[#9c2747] mb-4 font-black">＋</div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Session Disconnected</h2>
          <button 
            onClick={handleLogin} 
            className="mt-6 bg-[#9c2747] text-white text-xs uppercase font-black tracking-widest px-8 py-3.5 rounded-xl transition shadow-md"
          >
            Re-Login as Rakib
          </button>
        </div>
      )}
    </div>
  );
}