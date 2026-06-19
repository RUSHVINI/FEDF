import React, { useState } from 'react';

export default function Login({ registeredUser, onNavigateToSignUp, onLoginSuccess }) {
  const [email, setEmail] = useState(registeredUser?.email || '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please provide account email and security key thresholds.');
      return;
    }
    
    // Simulate validation pass using fallback constants if sign up step was skipped
    const finalUser = registeredUser && registeredUser.email === email
      ? registeredUser 
      : { name: 'Rakib', email: email };

    onLoginSuccess(finalUser);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-slate-50/50">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-rose-950/5 text-left space-y-6">
        
        <div className="text-center">
          <span className="text-2xl font-black text-[#9c2747]">Welcome Back</span>
          <p className="text-xs text-slate-400 mt-1 font-medium">Log into your safe health workspace panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f4f5f7] border-none rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#9c2747]/20"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <span className="text-[10px] text-slate-400 font-semibold hover:underline cursor-pointer">Forgot?</span>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f4f5f7] border-none rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#9c2747]/20"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#9c2747] hover:bg-[#801f39] text-white text-xs uppercase font-black tracking-widest py-3.5 rounded-xl transition shadow-md mt-2"
          >
            Log In
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-50">
          <p className="text-xs text-slate-400 font-medium">
            Don't have an account yet?{' '}
            <button onClick={onNavigateToSignUp} className="text-[#9c2747] font-bold hover:underline">
              Sign Up
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
