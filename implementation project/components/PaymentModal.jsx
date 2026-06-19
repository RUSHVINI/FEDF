import React, { useState } from 'react';

export default function PaymentModal({ doctorObj, bookingDetails, onPaymentSuccess, darkMode }) {
  const [payMethod, setPayMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto text-left space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-black">Secure Checkout Gateway</h2>
        <p className="text-xs text-slate-400 font-semibold">Verify invoicing criteria parameters prior to finalizing transaction.</p>
      </div>

      <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'}`}>
        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Booking Invoice Details</span>
        
        <div className="flex justify-between items-center pb-3 border-b dark:border-slate-800">
          <div>
            <h4 className="text-sm font-black">{doctorObj?.name}</h4>
            <p className="text-xs text-slate-400 font-bold">{doctorObj?.specialty}</p>
          </div>
          <span className="text-sm font-black text-[#9c2747] dark:text-rose-400 text-right">{doctorObj?.fee} Total</span>
        </div>

        {/* 📋 IF IT IS A MEDICINE CHECKOUT, DISPLAY SPECIFIC ITEMS INCLUDED */}
        {doctorObj?.itemsSummary && (
          <div className="py-2.5 border-b dark:border-slate-800 space-y-1">
            <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase block">Items Purchased:</span>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{doctorObj.itemsSummary}</p>
          </div>
        )}

        <div className="pt-3 flex justify-between text-xs font-bold text-slate-500">
          <span>📅 Date: {bookingDetails?.date}</span>
          <span>⏰ Time: {bookingDetails?.time}</span>
        </div>
      </div>

      {/* FUNDING SELECTOR CONTROLS */}
      <div className="space-y-3">
        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Select Funding Channel</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPayMethod('card')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all ${
              payMethod === 'card' ? 'border-[#9c2747] bg-rose-50/20 text-[#9c2747] font-black' : 'border-transparent bg-slate-100 dark:bg-slate-900 text-slate-500'
            }`}
          >
            💳 Credit / Debit Card
          </button>
          <button
            type="button"
            onClick={() => setPayMethod('upi')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all ${
              payMethod === 'upi' ? 'border-[#9c2747] bg-rose-50/20 text-[#9c2747] font-black' : 'border-transparent bg-slate-100 dark:bg-slate-900 text-slate-500'
            }`}
          >
            📱 Unified Payments (UPI)
          </button>
        </div>
      </div>

      <form onSubmit={handleProcessPayment} className="space-y-4">
        {payMethod === 'card' ? (
          <div className="space-y-2">
            <input type="text" required placeholder="Cardholder Number" className={`w-full px-4 py-3 text-xs font-semibold rounded-xl focus:outline-none border ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-transparent text-slate-800'}`} />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" required placeholder="MM / YY" className={`w-full px-4 py-3 text-xs font-semibold rounded-xl focus:outline-none border ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-transparent text-slate-800'}`} />
              <input type="password" required placeholder="CVV" className={`w-full px-4 py-3 text-xs font-semibold rounded-xl focus:outline-none border ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-transparent text-slate-800'}`} />
            </div>
          </div>
        ) : (
          <input type="text" required placeholder="Enter UPI ID (e.g., user@upi)" className={`w-full px-4 py-3 text-xs font-semibold rounded-xl focus:outline-none border ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-transparent text-slate-800'}`} />
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-[#9c2747] hover:bg-[#801f39] text-white text-xs uppercase font-black tracking-widest py-4 rounded-xl transition disabled:opacity-50"
        >
          {isProcessing ? 'Processing Secure Settlement...' : `Pay ${doctorObj?.fee} Now`}
        </button>
      </form>
    </div>
  );
}