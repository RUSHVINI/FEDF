import React, { useState } from 'react';

export default function DoctorDetails({ darkMode, initialSearchQuery, onSelectDoctor }) {
  // 🔍 Interactive Search and Filter State Engine
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  // 🏥 Fully Expanded 12-Doctor Medical Specialist Registry
  const doctorsDatabase = [
    {
      id: 1,
      name: "Dr. Arvind Swamy",
      specialty: "Cardiologist",
      experience: "14 Years",
      rating: "4.9",
      availability: "Mon, Wed, Fri",
      fee: "₹800",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 2,
      name: "Dr. Shalini Kapoor",
      specialty: "Dermatologist",
      experience: "10 Years",
      rating: "4.8",
      availability: "Tue, Thu, Sat",
      fee: "₹600",
      photo: "https://images.unsplash.com/photo-1594824813573-246434e3b96f?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "Dr. Vikram Malhotra",
      specialty: "Neurologist",
      experience: "18 Years",
      rating: "4.9",
      availability: "Mon, Tue, Thu",
      fee: "₹1200",
      photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 4,
      name: "Dr. Meera Deshmukh",
      specialty: "Pediatrician",
      experience: "8 Years",
      rating: "4.7",
      availability: "Wed, Thu, Fri",
      fee: "₹500",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 5,
      name: "Dr. Rohan Joshi",
      specialty: "Orthopedic Surgeon",
      experience: "15 Years",
      rating: "4.9",
      availability: "Mon, Wed, Sat",
      fee: "₹900",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 6,
      name: "Dr. Ananya Iyer",
      specialty: "Psychiatrist",
      experience: "12 Years",
      rating: "4.8",
      availability: "Tue, Wed, Fri",
      fee: "₹750",
      photo: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 7,
      name: "Dr. Kabir Verma",
      specialty: "General Physician",
      experience: "9 Years",
      rating: "4.6",
      availability: "Mon to Sat",
      fee: "₹400",
      photo: "https://images.unsplash.com/photo-1637059824899-a441006a6875?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 8,
      name: "Dr. Sneha Reddy",
      specialty: "Endocrinologist",
      experience: "11 Years",
      rating: "4.8",
      availability: "Mon, Thu",
      fee: "₹850",
      photo: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 9,
      name: "Dr. Alok Mehta",
      specialty: "General Physician",
      experience: "15 Years",
      rating: "4.7",
      availability: "Mon, Tue, Wed, Thu",
      fee: "₹450",
      photo: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 10,
      name: "Dr. Priya Sharma",
      specialty: "General Physician",
      experience: "12 Years",
      rating: "4.8",
      availability: "Wed, Thu, Fri, Sat",
      fee: "₹450",
      photo: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 11,
      name: "Dr. Rajesh Khanna",
      specialty: "Ophthalmologist",
      experience: "16 Years",
      rating: "4.9",
      availability: "Tue, Thu, Fri",
      fee: "₹700",
      photo: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      id: 12,
      name: "Dr. Divya Nair",
      specialty: "ENT Specialist",
      experience: "7 Years",
      rating: "4.5",
      availability: "Mon, Wed, Sat",
      fee: "₹550",
      photo: "https://images.unsplash.com/photo-1594824813573-246434e3b96f?auto=format&fit=crop&w=256&h=256&q=80"
    }
  ];

  // Extraction Engine for Quick-Filter Pill Badges
  const specialties = ['All', ...new Set(doctorsDatabase.map(doc => doc.specialty))];

  // 🔍 Multi-Parameter Matching Pipeline Logic
  const filteredDoctors = doctorsDatabase.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-xl font-black">Medical Specialists Directory</h2>
        <p className="text-xs text-slate-400 font-semibold">
          Browse our expanded team of certified practitioners and book an appointment instantly.
        </p>
      </div>

      {/* SEARCH AND QUICK FILTER CONTROLS */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by specialist name or clinic department..."
            className={`w-full px-4 py-3 pl-11 text-xs font-bold rounded-xl focus:outline-none border transition ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-[#9c2747]' 
                : 'bg-white border-slate-200 text-slate-700 placeholder-slate-400 focus:border-[#9c2747] shadow-xs'
            }`}
          />
          <span className="absolute left-4 top-3.5 text-slate-400 text-sm">🔍</span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* HORIZONTAL QUICK CATEGORY PILLS */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mask-image">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all tracking-wide ${
                selectedSpecialty === spec
                  ? 'bg-[#9c2747] text-white shadow-xs'
                  : darkMode
                    ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* 📋 DOCTORS CARD GRID CONTAINER */}
      {filteredDoctors.length === 0 ? (
        <div className={`p-12 rounded-3xl border border-dashed text-center space-y-3 ${
          darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className="text-3xl block">🩺</span>
          <p className="text-xs text-slate-400 font-bold max-w-xs mx-auto">
            No health practitioners matched your active query filters. Try modifying your search parameters.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:scale-[1.01] ${
                darkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-slate-100 shadow-xs'
              }`}
            >
              <div className="flex gap-4 items-start w-full">
                <img 
                  src={doc.photo} 
                  alt={doc.name} 
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border dark:border-slate-800" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="text-sm font-black tracking-tight truncate">{doc.name}</h3>
                    <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                      ★ {doc.rating}
                    </span>
                  </div>
                  <p className="text-xs text-[#9c2747] dark:text-rose-400 font-extrabold">{doc.specialty}</p>
                  
                  <div className="mt-2 space-y-0.5 text-[11px] font-bold text-slate-400">
                    <p>💼 Experience: <span className="text-slate-500 dark:text-slate-300">{doc.experience}</span></p>
                    <p>🗓️ Active: <span className="text-slate-500 dark:text-slate-300">{doc.availability}</span></p>
                  </div>
                </div>
              </div>

              {/* ACTION FOOTER BAR WITHIN CARD */}
              <div className="w-full pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase block">Consultation Fee</span>
                  <p className="text-sm font-black text-slate-800 dark:text-white leading-none mt-0.5">{doc.fee}</p>
                </div>
                
                <button
                  onClick={() => onSelectDoctor(doc)}
                  className="bg-[#9c2747] hover:bg-[#801f39] text-white text-xs font-black px-4 py-2 rounded-xl transition shadow-xs active:scale-95"
                >
                  Book Slot &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}