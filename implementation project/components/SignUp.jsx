import React, { useState } from 'react';

export default function SignUp({ onNavigateToLogin, onSignUpSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill out all identity credentials.');
      return;
    }
    // Fire callback to save user profile into parent application state context
    onSignUpSuccess({ name: formData.name, email: formData.email });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-slate-50/50">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-rose-950/5 text-left space-y-6">
        
        <div className="text-center">
          <span className="text-2xl font-black text-[#9c2747]">Create Account</span>
          <p className="text-xs text-slate-400 mt-1 font-medium">Join DocPot medical registry suite today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Rakib Ahmed" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#f4f5f7] border-none rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#9c2747]/20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#f4f5f7] border-none rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#9c2747]/20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-[#f4f5f7] border-none rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#9c2747]/20"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#9c2747] hover:bg-[#801f39] text-white text-xs uppercase font-black tracking-widest py-3.5 rounded-xl transition shadow-md mt-2"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-50">
          <p className="text-xs text-slate-400 font-medium">
            Already have an account?{' '}
            <button onClick={onNavigateToLogin} className="text-[#9c2747] font-bold hover:underline">
              Log In
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}