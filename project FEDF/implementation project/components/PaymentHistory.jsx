import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function PaymentHistory({ items, darkMode }) {
  const [activePass, setActivePass] = useState(null);

  const generateQRValue = (item) => {
    return JSON.stringify({
      ticketId: `TXN-${item.id}`,
      type: item.itemsSummary ? "PHARMACY_PICKUP" : "DOCTOR_APPOINTMENT",
      title: item.name,
      details: item.itemsSummary || item.specialty,
      date: item.date,
      time: item.time,
    });
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      <div>
        <h2 className="text-xl font-black">Billing Ledger & Receipt Desk</h2>
        <p className="text-xs text-slate-400 font-semibold">Review historical cleared statements and pull up clinical check-in QR passes.</p>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className={`p-10 rounded-3xl border border-dashed text-center space-y-2 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-2xl block">🧾</span>
            <p className="text-xs text-slate-400 font-bold">No historical payment logs or statements found.</p>
          </div>
        ) : (
          <div className={`border rounded-2xl overflow-hidden ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className={`border-b font-bold text-slate-400 ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-slate-50/50'}`}>
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Account Details</th>
                  <th className="p-3">Summary / Items</th>
                  <th className="p-3">Schedule</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3 text-center">Gate QR Pass</th>
                </tr>
              </thead>
              <tbody className="font-semibold text-slate-600 dark:text-slate-300 divide-y dark:divide-slate-800">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/30 transition">
                    <td className="p-3 text-slate-400">#TXN-{item.id}</td>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-100">{item.name}</td>
                    <td className="p-3 text-slate-500 max-w-xs truncate">{item.itemsSummary || item.specialty}</td>
                    <td className="p-3">📅 {item.date} • ⏰ {item.time}</td>
                    <td className="p-3 font-black text-[#9c2747] dark:text-rose-400">{item.fee}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setActivePass(item)}
                        className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#9c2747] hover:text-white transition text-[11px] font-black"
                      >
                        📱 Scan Pass
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* POPUP VIEW PASS MODAL */}
      {activePass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-xs p-6 rounded-3xl text-center border shadow-xl relative ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'}`}>
            <button onClick={() => setActivePass(null)} className="absolute top-4 right-4 text-xs font-black text-slate-400 hover:text-slate-600">✕</button>
            <span className="text-[9px] font-black tracking-widest text-[#9c2747] dark:text-rose-400 uppercase block mb-1">Official Security Token</span>
            <h3 className="text-base font-black tracking-tight mb-4">{activePass.itemsSummary ? "Pharmacy Allocation" : "Hospital Gate Access"}</h3>

            <div className="p-4 bg-white rounded-2xl inline-block border border-slate-100 mb-4">
              <QRCodeSVG value={generateQRValue(activePass)} size={150} level="M" />
            </div>

            <div className="text-left space-y-1.5 text-[11px] font-bold border-t pt-3 dark:border-slate-800">
              <p className="text-xs font-black truncate">📍 Destination: {activePass.name}</p>
              {activePass.itemsSummary && <p className="text-slate-400 line-clamp-2">📦 Items: {activePass.itemsSummary}</p>}
              <p className="text-slate-400">⏰ Check-In: {activePass.date} at {activePass.time}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}