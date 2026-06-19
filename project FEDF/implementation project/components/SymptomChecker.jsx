import React, { useState } from 'react';

export default function SymptomChecker({ darkMode, onRouteToSpecialist }) {
  const [symptomText, setSymptomText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [triageResult, setTriageResult] = useState(null);

  const handlePatientAssessment = (e) => {
    e.preventDefault();
    if (!symptomText.trim()) return;

    setIsScanning(true);
    setTriageResult(null);

    // Simulate an algorithmic triage scan computation delay
    setTimeout(() => {
      const input = symptomText.toLowerCase();
      let assessment = {
        specialty: 'General Physician',
        urgency: 'Standard Care',
        matchRate: '94%',
        explanation: 'Your description indicates general systemic or baseline infection indicators. A standard clinical evaluation is ideal to isolate target symptoms.',
        badgeColor: 'bg-blue-500/10 text-blue-500'
      };

      if (input.includes('heart') || input.includes('chest') || input.includes('bp') || input.includes('dizzy') || input.includes('breathing')) {
        assessment = {
          specialty: 'Cardiologist',
          urgency: 'High Priority',
          matchRate: '98%',
          explanation: 'Potential cardiovascular anomalies or blood pressure deviations flagged. We recommend prioritizing an operational booking with a heart specialist.',
          badgeColor: 'bg-rose-500/10 text-rose-500'
        };
      } else if (input.includes('skin') || input.includes('rash') || input.includes('acne') || input.includes('allergy') || input.includes('itch')) {
        assessment = {
          specialty: 'Dermatologist',
          urgency: 'Routine Assessment',
          matchRate: '91%',
          explanation: 'Epidermal localized tissue inflammation or chronic contact allergy paths discovered. A specific dermatological scan index is advised.',
          badgeColor: 'bg-amber-500/10 text-amber-500'
        };
      } else if (input.includes('child') || input.includes('baby') || input.includes('pediatric') || input.includes('kid') || input.includes('daughter') || input.includes('son')) {
        assessment = {
          specialty: 'Pediatrician',
          urgency: 'Standard Care',
          matchRate: '96%',
          explanation: 'Juvenile metabolic profiles or infant milestone indicators noted. This context should map to verified children practitioners.',
          badgeColor: 'bg-emerald-500/10 text-emerald-500'
        };
      }

      setTriageResult(assessment);
      setIsScanning(false);
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto text-left space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-black">AI Symptom Triage Desk</h2>
        <p className="text-xs text-slate-400 font-semibold">
          Describe what you are physically feeling. Our system maps your parameters to filter the correct specialist department automatically.
        </p>
      </div>

      <form onSubmit={handlePatientAssessment} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Patient Assessment Brief
          </label>
          <textarea
            rows="4"
            required
            disabled={isScanning}
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder="Type your current physical condition (e.g., 'I have sharp chest tightness and dizziness' or 'Woke up with an itchy red rash on my hand')..."
            className={`w-full p-4 text-xs font-semibold rounded-2xl focus:outline-none border focus:ring-2 focus:ring-[#9c2747]/20 transition ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={isScanning || !symptomText.trim()}
          className="w-full bg-[#9c2747] hover:bg-[#801f39] text-white text-xs uppercase font-black tracking-widest py-3.5 rounded-xl transition shadow-md disabled:opacity-40"
        >
          {isScanning ? 'Processing Triage Indicators...' : 'Run Diagnostics Analysis Scan ⚡'}
        </button>
      </form>

      {isScanning && (
        <div className="p-8 text-center space-y-3 rounded-2xl border border-dashed dark:border-slate-800 animate-pulse">
          <div className="w-5 h-5 border-2 border-[#9c2747] border-t-transparent rounded-full mx-auto animate-spin"></div>
          <p className="text-xs text-slate-400 font-bold">Parsing text descriptors against specialty lookup matrix arrays...</p>
        </div>
      )}

      {triageResult && !isScanning && (
        <div className={`p-6 rounded-3xl border space-y-5 shadow-xs animate-fadeIn ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">Recommended Department</span>
              <h3 className="text-lg font-black tracking-tight">{triageResult.specialty}</h3>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-xl uppercase tracking-wider block ${triageResult.badgeColor}`}>
                {triageResult.urgency}
              </span>
              <span className="text-[10px] font-bold text-slate-400 block mt-1">Accuracy: {triageResult.matchRate}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-dashed dark:border-slate-800">
            {triageResult.explanation}
          </p>

          <button
            onClick={() => onRouteToSpecialist(triageResult.specialty)}
            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white text-xs font-black py-3 rounded-xl transition shadow-sm"
          >
            Find Matching {triageResult.specialty} Specialists Now &rarr;
          </button>
        </div>
      )}
    </div>
  );
}