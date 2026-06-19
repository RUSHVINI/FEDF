import React, { useState } from 'react';

export default function BookingAppointment({ chosenDoctor, onCompleteBooking, darkMode }) {
  // Dynamically set to today's date placeholder instead of a static historical fallback
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');

  // Fixed matrix for available clinical morning consultation hours
  const morningSlots = ['08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM'];

  // Early return fallback if a user navigates directly here without selecting a doctor
  if (!chosenDoctor) {
    return (
      <div className="text-center py-12 text-xs text-slate-400 font-bold max-w-sm mx-auto animate-fadeIn">
        <div className="text-3xl mb-3">⚠️</div>
        <p className="leading-relaxed">
          Please select a practitioner from the Doctor Details screen first to configure an active booking timeline window.
        </p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert('Please select an available morning session time window slot.');
      return;
    }
    
    // Pass date and time metrics up to the dashboard pipeline securely
    onCompleteBooking({ date: selectedDate, time: selectedTime });
  };

  return (
    <div className="max-w-xl mx-auto text-left space-y-6 animate-fadeIn">
      {/* HEADER TITLE SEGMENT */}
      <div>
        <h2 className="text-xl font-black">Configure Booking</h2>
        <p className="text-xs text-slate-400 font-semibold">Select your preferred date and available morning sessions.</p>
      </div>

      {/* QUICK SUMMARY CARD OF SELECTED PRACTITIONER */}
      <div className={`p-4 rounded-2xl flex items-center gap-4 border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'
      }`}>
        <img src={chosenDoctor.photo} alt={chosenDoctor.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
        <div>
          <h4 className="text-sm font-black">{chosenDoctor.name}</h4>
          <p className="text-xs text-slate-400 font-bold">{chosenDoctor.specialty} • {chosenDoctor.fee}</p>
        </div>
      </div>

      {/* SCHEDULING SELECTION CRITERIA FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* CALENDAR DATE FIELD ROW */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Choose Consultation Date
          </label>
          <input 
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]} // Prevents selection of past calendar days
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`w-full max-w-xs border rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#9c2747]/20 transition ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          />
        </div>

        {/* INTERACTIVE TIMING CHIP MATRIX GRID */}
        <div className="space-y-3">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Available Morning Timings
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {morningSlots.map(slot => (
              <button
                type="button"
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`p-3 rounded-xl border text-xs font-bold text-center transition-all active:scale-98 ${
                  selectedTime === slot 
                    ? 'border-[#9c2747] bg-rose-50/40 text-[#9c2747] dark:bg-rose-950/20 dark:text-rose-400 font-black shadow-xs' 
                    : (darkMode 
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700' 
                        : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 shadow-2xs'
                      )
                }`}
              >
                ☀️ {slot}
              </button>
            ))}
          </div>
        </div>

        {/* SUBMIT PROGRESS ACTION TRIGGER */}
        <button
          type="submit"
          className="w-full bg-[#9c2747] hover:bg-[#801f39] text-white text-xs uppercase font-black tracking-widest py-4 rounded-xl transition shadow-md active:scale-98"
        >
          Proceed to Payment &rarr;
        </button>
      </form>
    </div>
  );
}