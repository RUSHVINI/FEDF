import React from 'react';

export default function CheckupHistory({ darkMode, completedAppointments }) {
  const totalCompletedCount = completedAppointments.length;

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* HEADER WITH QUANTITATIVE COUNTER METRIC */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-black">🩺 Checkup Consultation History</h2>
          <p className="text-xs text-slate-400 font-semibold">
            A permanent ledger of all your completed medical appointments and past visits.
          </p>
        </div>
        
        {/* Total Metric Badge */}
        <div className={`px-4 py-2 rounded-2xl border text-center shrink-0 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'
        }`}>
          <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Total Handled</span>
          <span className="text-base font-black text-purple-500">{totalCompletedCount} Treatments</span>
        </div>
      </div>

      {completedAppointments.length === 0 ? (
        <div className={`p-12 rounded-3xl border border-dashed text-center space-y-3 ${
          darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className="text-3xl block">📋</span>
          <p className="text-xs text-slate-400 font-bold max-w-xs mx-auto">
            No completed checkups found in your historical archive files yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {completedAppointments.map((app) => (
            <div 
              key={app.id}
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'
              }`}
            >
              <div className="flex gap-4 items-center">
                <img src={app.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black tracking-tight">{app.name}</h3>
                    
                    {/* EXPLICIT STATUS BADGE FOR COMPLETED STATE */}
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider text-blue-500 bg-blue-500/10 border border-blue-500/20">
                      ✓ Treatment Completed
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold">{app.specialty}</p>
                </div>
              </div>

              <div className="flex sm:flex-col justify-between w-full sm:w-auto text-left sm:text-right border-t sm:border-t-0 border-dashed pt-3 sm:pt-0 dark:border-slate-800 text-xs font-bold text-slate-500 gap-1">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block tracking-wider">Date of Visit</span>
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">📅 {app.date}</span>
                </div>
                <div className="sm:mt-1">
                  <span className="text-[10px] uppercase text-slate-400 block sm:hidden tracking-wider">Time</span>
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">⏰ {app.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}