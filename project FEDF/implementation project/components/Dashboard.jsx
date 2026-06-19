import React, { useState } from 'react';

// Central Modular Component Workspace Imports
import SignUp from './SignUp';
import Login from './Login';
import DoctorDetails from './DoctorDetails';
import BookingAppointment from './BookingAppointment';
import PaymentModal from './PaymentModal';
import PaymentHistory from './PaymentHistory';
import SymptomChecker from './SymptomChecker';
import CheckupHistory from './CheckupHistory'; 
import DietPlanning from './DietPlanning'; 
import MedicineStore from './MedicineStore'; // 💊 INTEGRATED: Adding Medicine Order Component

export default function Dashboard() {
  // 🌓 Universal Theme Control State Engine
  const [darkMode, setDarkMode] = useState(false);
  
  // 🔑 Authentication Router State Matrix: 'signup', 'login', 'app_portal'
  const [authStep, setAuthStep] = useState('signup');
  const [sessionUser, setSessionUser] = useState(null);

  // 📂 Sidebar Panel State Slide Selector
  const [activeSlide, setActiveSlide] = useState('overview');

  // Multi-Step Shared Pipeline Parameters Cache
  const [chosenDoctor, setChosenDoctor] = useState(null);
  const [pendingBooking, setPendingBooking] = useState(null);
  const [aiDepartmentFilter, setAiDepartmentFilter] = useState(''); 
  
  // Confirmed Appointments and Payment Tracking Ledgers
  const [appointments, setAppointments] = useState([]);
  const [paymentLedger, setPaymentLedger] = useState([]);

  // --- ⏰ DYNAMIC TIME-BASED GREETING ENGINE ---
  const getTimeBasedGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return '🌅 Good Morning';
    if (hours < 17) return '☀️ Good Afternoon';
    return '🌙 Good Evening';
  };

  // --- 🍏 PREMIUM HEALTH & WELLNESS SLOGANS ---
  const getHealthSlogan = () => {
    const slogans = [
      "Your health is your greatest wealth—invest in it daily.",
      "Empowering your wellness journey, one secure appointment at a time.",
      "Prevention is the best prescription for a vibrant life.",
      "Your physical well-being is our digital priority.",
      "Small healthy choices today build a stronger tomorrow."
    ];
    const dayIndex = new Date().getDate() % slogans.length;
    return slogans[dayIndex];
  };

  // --- WORKSPACE COMPONENT SIGNAL PIPELINE CHANNELS ---
  const handleSelectDoctorToBook = (doc) => {
    setChosenDoctor(doc);
    setActiveSlide('booking_appointment');
  };

  const handleSlotSelectionConfirmed = (slotDetails) => {
    setPendingBooking(slotDetails);
    setActiveSlide('payment');
  };

  // 📦 INTEGRATED: Captures medicine checkouts and maps them directly to the common payment gateway layout template
  const handleMedicineCheckoutToGate = (medicinePayload, checkoutDetails) => {
    setChosenDoctor(medicinePayload); 
    setPendingBooking(checkoutDetails);
    setActiveSlide('payment');
  };

  const handlePaymentSettledSuccessfully = () => {
    const transactionId = Math.floor(1000 + Math.random() * 9000);
    const newRecordItem = {
      id: transactionId,
      name: chosenDoctor.name,
      specialty: chosenDoctor.specialty,
      itemsSummary: chosenDoctor.itemsSummary || null, // 💊 Appends medicine itemization text arrays safely
      date: pendingBooking.date,
      time: pendingBooking.time,
      photo: chosenDoctor.photo || "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=120&auto=format&fit=crop", 
      fee: chosenDoctor.fee || '₹500',
      completed: false
    };

    // Commit straight into the histories ledger databases
    setPaymentLedger([newRecordItem, ...paymentLedger]);
    
    // Only book a patient room window if it isn't an over-the-counter medicine order
    if (!chosenDoctor.isMedicine) {
      setAppointments([newRecordItem, ...appointments]);
    }

    setPendingBooking(null);
    setChosenDoctor(null);
    setActiveSlide('payment_history'); // Route directly to receipt desk to scan their token pass
    alert(chosenDoctor.isMedicine ? '🎉 Pharmacy Order Placed successfully!' : '🎉 Secure Payment Complete! Your medical consultation is fully confirmed.');
  };

  const handleMarkAsCompleted = (id) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, completed: true } : app
    ));
    alert('✅ Treatment Logged! This appointment has been archived into your Checkup History.');
  };

  const handleGlobalSignout = () => {
    setSessionUser(null);
    setAuthStep('login');
    setActiveSlide('overview');
    setAiDepartmentFilter('');
  };

  // State filtering logic engines
  const activeAppointments = appointments.filter(app => !app.completed);
  const completedAppointments = appointments.filter(app => app.completed);

  // --- RENDER REGMENT 1: Public Gateway Forms Authentication Screening ---
  if (authStep === 'signup') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
        <SignUp 
          darkMode={darkMode} 
          onSignUpSuccess={(userObj) => { setSessionUser(userObj); setAuthStep('login'); }} 
          onNavigateToLogin={() => setAuthStep('login')} 
        />
      </div>
    );
  }

  if (authStep === 'login') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
        <Login 
          darkMode={darkMode} 
          registeredUser={sessionUser} 
          onLoginSuccess={(userObj) => { setSessionUser(userObj); setAuthStep('app_portal'); }} 
          onNavigateToSignUp={() => setAuthStep('signup')} 
        />
      </div>
    );
  }

  // --- RENDER SEGMENT 2: Secure Application Patient Portal Workspace ---
  return (
    <div className={`min-h-screen font-sans antialiased flex transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-800'
    }`}>

      {/* 🧭 NAVIGATION SIDEBAR DRAWER FRAMEWORK */}
      <aside className={`w-64 border-r hidden md:flex flex-col justify-between p-6 shrink-0 transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'
      }`}>
        <div className="space-y-8">
          <div>
            <span className="text-xl font-black text-[#9c2747] tracking-tight block">DocPot</span>
            <span className="text-[9px] font-bold text-slate-400 tracking-widest block uppercase mt-0.5">Patient Central Hub</span>
          </div>

          <nav className="flex flex-col gap-1.5">
            <button
              onClick={() => setActiveSlide('overview')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                activeSlide === 'overview' ? 'bg-[#9c2747] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              📊 Overview Home
            </button>
            
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>

            <button
              onClick={() => setActiveSlide('symptom_checker')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                activeSlide === 'symptom_checker' ? 'bg-[#9c2747] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              🤖 AI Symptom Checker
            </button>

            <button
              onClick={() => {
                setAiDepartmentFilter('');
                setActiveSlide('doctors_details');
              }}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                activeSlide === 'doctors_details' ? 'bg-[#9c2747] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              🔍 Doctors Details (Search)
            </button>

            <button
              onClick={() => setActiveSlide('booking_appointment')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                activeSlide === 'booking_appointment' ? 'bg-[#9c2747] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              📅 Booking Appointment
            </button>

            {/* 💊 NEW MEDICINE STORE SIDEBAR ACTION LINK */}
            <button
              onClick={() => setActiveSlide('medicine_store')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                activeSlide === 'medicine_store' ? 'bg-[#9c2747] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              💊 Pharmacy Medicine Order
            </button>

            <button
              onClick={() => setActiveSlide('diet_planning')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                activeSlide === 'diet_planning' ? 'bg-[#9c2747] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              🥗 Age & Weight Diet Plans
            </button>

            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>

            <button
              onClick={() => setActiveSlide('payment')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                activeSlide === 'payment' ? 'bg-[#9c2747] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              💳 Core Payment Desk
            </button>
            
            <button
              onClick={() => setActiveSlide('payment_history')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                activeSlide === 'payment_history' ? 'bg-[#9c2747] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              🧾 Payment History
            </button>

            <button
              onClick={() => setActiveSlide('checkup_history')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                activeSlide === 'checkup_history' ? 'bg-[#9c2747] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              🩺 Checkup History
            </button>
          </nav>
        </div>

        <div>
          <button 
            onClick={handleGlobalSignout}
            className="w-full text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/20 py-2.5 rounded-xl transition hover:opacity-80"
          >
            Logout Profile 🚪
          </button>
        </div>
      </aside>

      {/* 💻 MAIN STAGE DISPLAY WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* UPPER STATUS HEADER MODULE BAR */}
        <header className={`h-16 px-6 lg:px-12 flex items-center justify-between border-b transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center gap-2 md:hidden">
            <span className="text-sm font-black text-[#9c2747]">DocPot</span>
          </div>

          <div className="ml-auto flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition tracking-wide ${
                darkMode ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800"></div>

            {/* 👤 ACCOUNT IDENTITY COMPONENT VIEW */}
            <div className="text-left flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9c2747] to-rose-400 text-white font-black text-xs flex items-center justify-center shadow-sm">
                {sessionUser?.name?.charAt(0).toUpperCase() || 'P'}
              </div>
              <div className="hidden sm:block leading-none">
                <p className="text-xs font-black">{sessionUser?.name || 'Patient Account'}</p>
                <span className="text-[9px] text-slate-400 font-bold block mt-0.5 uppercase tracking-wider">My Profile</span>
              </div>
            </div>
          </div>
        </header>

        {/* COMPONENT INTERACTION VIEWS LAYOUT CONTAINER ROUTER */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-4xl mx-auto">
          
          {/* SLIDE A: HOME DASHBOARD OVERVIEW */}
          {activeSlide === 'overview' && (
            <div className="space-y-6 text-left animate-fadeIn">
              
              {/* ✨ DYNAMIC TIME-AWARE PATIENT GREETING BANNER */}
              <div className={`p-6 rounded-3xl border transition-all ${
                darkMode ? 'bg-gradient-to-r from-slate-900 to-slate-900/40 border-slate-800' : 'bg-gradient-to-r from-white to-rose-50/20 border-slate-100 shadow-xs'
              }`}>
                <div className="space-y-1">
                  <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
                    {getTimeBasedGreeting()}, <span className="text-[#9c2747] dark:text-rose-400">{sessionUser?.name || 'Valued Patient'}</span>!
                  </h1>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-base shrink-0">✨</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold italic tracking-wide">
                      "{getHealthSlogan()}"
                    </p>
                  </div>
                </div>
              </div>

              {/* 🛡️ CLINICAL HEALTH PRECAUTIONS */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">
                  🛡️ Daily Health Precautions & Guide
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className={`p-4 rounded-2xl border flex gap-3 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xs'}`}>
                    <span className="text-xl">💧</span>
                    <div>
                      <h4 className="text-xs font-black uppercase text-blue-500 tracking-wide">Hydration Index</h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-relaxed">
                        Consume a minimum of 3 Liters of filtered water throughout the day to balance biochemical cellular systems.
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border flex gap-3 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xs'}`}>
                    <span className="text-xl">🛏️</span>
                    <div>
                      <h4 className="text-xs font-black uppercase text-purple-500 tracking-wide">Circadian Rhythm</h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-relaxed">
                        Maintain 7 to 8 hours of uninterrupted deep sleep cycles to promote full cognitive and metabolic repair.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📊 QUANTITATIVE METRICS SUMMARY GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'}`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Bookings</span>
                  <p className="text-xl font-black mt-1 text-[#9c2747]">{activeAppointments.length}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'}`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Invoices Cleared</span>
                  <p className="text-xl font-black mt-1 text-blue-500">{paymentLedger.length}</p>
                </div>
                <div className={`p-4 rounded-2xl border col-span-2 sm:col-span-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'}`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Visits</span>
                  <p className="text-xl font-black mt-1 text-purple-500">{completedAppointments.length}</p>
                </div>
              </div>

              {/* UPCOMING APPOINTMENTS SECTION CONTAINER */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">
                  🗓️ Upcoming Appointments ({activeAppointments.length})
                </h2>

                {activeAppointments.length === 0 ? (
                  <div className={`p-10 rounded-3xl border border-dashed text-center space-y-3 ${
                    darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <span className="text-3xl block">📭</span>
                    <p className="text-xs text-slate-400 font-bold max-w-xs mx-auto">
                      You do not have any active upcoming medical appointments booked right now.
                    </p>
                    <button
                      onClick={() => setActiveSlide('symptom_checker')}
                      className="bg-[#9c2747] text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition hover:opacity-90 inline-block"
                    >
                      Run AI Symptom Assessment &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {activeAppointments.map((app) => (
                      <div 
                        key={app.id} 
                        className={`p-5 rounded-2xl border flex flex-col gap-4 transition-all ${
                          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'
                        }`}
                      >
                        <div className="flex gap-4 items-center w-full">
                          <img src={app.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider text-amber-600 bg-amber-500/10 border border-amber-500/20">
                              ⏳ Treatment Pending
                            </span>
                            <h3 className="text-sm font-black tracking-tight mt-1">{app.name}</h3>
                            <p className="text-xs text-slate-400 font-semibold">{app.specialty}</p>
                          </div>
                        </div>

                        <div className="w-full pt-2 border-t border-dashed dark:border-slate-800 flex justify-between text-[11px] font-bold text-slate-500">
                          <span>📅 {app.date}</span>
                          <span>⏰ {app.time}</span>
                        </div>

                        <div className="w-full pt-1">
                          <button
                            onClick={() => handleMarkAsCompleted(app.id)}
                            className="w-full py-2 text-xs font-black text-white bg-[#9c2747] hover:bg-[#801f39] rounded-xl shadow-xs transition duration-200 active:scale-[0.98]"
                          >
                            Click if Checkup Completed ✓
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 💊 SLIDE M: PHARMACY MEDICINE ORDER MODULE CONTAINER */}
          {activeSlide === 'medicine_store' && (
            <MedicineStore 
              darkMode={darkMode} 
              onProceedToPayment={handleMedicineCheckoutToGate} 
            />
          )}

          {/* 🥗 SLIDE I: INTERACTIVE DIET PLANNING WORKSPACE */}
          {activeSlide === 'diet_planning' && (
            <DietPlanning darkMode={darkMode} />
          )}

          {/* SLIDE H: EXTERNAL COMPONENT EMBED */}
          {activeSlide === 'checkup_history' && (
            <CheckupHistory 
              darkMode={darkMode}
              completedAppointments={completedAppointments}
            />
          )}

          {/* SLIDE B: UNIQUE INTERACTIVE PATIENT-SIDE SYMPTOM TRIAGE LAYER */}
          {activeSlide === 'symptom_checker' && (
            <SymptomChecker
              darkMode={darkMode}
              onRouteToSpecialist={(specialtyKeyword) => {
                setAiDepartmentFilter(specialtyKeyword);
                setActiveSlide('doctors_details');
              }}
            />
          )}

          {/* SLIDE C: DOCTORS DIRECTORY WITH AUTOMATED COMPONENT FILTER PASSTHROUGH */}
          {activeSlide === 'doctors_details' && (
            <DoctorDetails 
              darkMode={darkMode}
              initialSearchQuery={aiDepartmentFilter}
              onSelectDoctor={handleSelectDoctorToBook}
            />
          )}

          {/* SLIDE D: APPOINTMENT TIME SCHEDULING CALENDAR MATRIX */}
          {activeSlide === 'booking_appointment' && (
            <BookingAppointment
              darkMode={darkMode}
              chosenDoctor={chosenDoctor}
              onCompleteBooking={handleSlotSelectionConfirmed}
            />
          )}

          {/* SLIDE E: INVOICE PROCESSING DESK GATING SHEETS */}
          {activeSlide === 'payment' && (
            chosenDoctor && pendingBooking ? (
              <PaymentModal
                darkMode={darkMode}
                doctorObj={chosenDoctor}
                bookingDetails={pendingBooking}
                onPaymentSuccess={handlePaymentSettledSuccessfully}
              />
            ) : (
              <div className="text-center py-12 space-y-4 max-w-md mx-auto text-left animate-fadeIn">
                <div className="text-4xl text-center">💳</div>
                <h2 className="text-lg font-black text-center">No Active Invoice Found</h2>
                <p className="text-xs text-slate-400 font-semibold text-center leading-relaxed">
                  Your payment gateway queue is currently empty because you haven't finalized a scheduling time window yet.
                </p>
                <div className="pt-2 text-center">
                  <button
                    onClick={() => setActiveSlide('doctors_details')}
                    className="bg-[#9c2747] hover:bg-[#801f39] text-white text-xs font-black px-5 py-3 rounded-xl transition shadow-md inline-block"
                  >
                    &larr; Choose a Doctor to Book
                  </button>
                </div>
              </div>
            )
          )}

          {/* SLIDE F: REVENUE CLEARANCE RECORD TRANSACTIONS LEDGER */}
          {activeSlide === 'payment_history' && (
            <PaymentHistory 
              darkMode={darkMode}
              items={paymentLedger}
            />
          )}

        </main>
      </div>
    </div>
  );
}