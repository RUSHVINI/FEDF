import React, { useState } from 'react';

export default function DietPlanning({ darkMode }) {
  // Functional Filtering State Baselines
  const [ageGroup, setAgeGroup] = useState('adult');
  const [weightInput, setWeightInput] = useState('65');
  const [fitnessGoal, setFitnessGoal] = useState('maintain');

  // Multi-tier Database Registry for Clinical Diet Configurations
  const dietMatrix = {
    child: {
      range: 'Ages 2 - 12',
      baseMultiplier: 35,
      proteinRatio: '1.2g/kg',
      advice: 'Prioritize whole milk, calcium matrices, lean protein shards, and seasonal fresh fruits. Restrict sugars completely.',
      meals: { breakfast: 'Oatmeal porridge with sliced bananas and almonds', lunch: 'Dal khichdi with mixed vegetables and ghee curd', snack: 'Boiled apple mash or fresh carrot sticks', dinner: 'Soft paneer wrap or multi-grain paratha' }
    },
    teen: {
      range: 'Ages 13 - 19',
      baseMultiplier: 40,
      proteinRatio: '1.5g/kg',
      advice: 'High-energy requirements. Target complex carbs and healthy lipids for hormonal architecture scaling.',
      meals: { breakfast: 'Sprouted moong cheela with peanut butter toast', lunch: 'Brown rice with dense chickpea curry and green salad', snack: 'Roasted makhana or walnut fruit smoothie', dinner: 'Grilled tofu/paneer skewered greens with whole wheat chapati' }
    },
    adult: {
      range: 'Ages 20 - 59',
      baseMultiplier: 30,
      proteinRatio: '1.8g/kg',
      advice: 'Focus on glycemic indexes, low insulin impact macro targets, dynamic metabolic balancing.',
      meals: { breakfast: 'Egg white omelet or multi-grain vegetable upma', lunch: 'Quinoa bowl or broken wheat dahlia with rich paneer subji', snack: 'Greek yogurt or handful of pumpkin seeds', dinner: 'Clear vegetable lentil soup with sauted leafy structures' }
    },
    senior: {
      range: 'Ages 60+',
      baseMultiplier: 25,
      proteinRatio: '1.4g/kg',
      advice: 'Target light digestible proteins, low structural sodium, fiber matrix additions for joint/vascular protection.',
      meals: { breakfast: 'Soft ragi ruti or rava idli with coconut chutney', lunch: 'Mashed dal rice with stewed ash-gourd compilation', snack: 'Warm buttermilk with roasted cumin or tender papaya slices', dinner: 'Baked vegetable broth with light yellow mung bean lentil stew' }
    }
  };

  const selectedDiet = dietMatrix[ageGroup];
  const activeWeight = parseFloat(weightInput) || 60;

  // 🧮 Interactive Macro Intake Calculation Engine
  let computedCalories = Math.round(activeWeight * selectedDiet.baseMultiplier);
  if (fitnessGoal === 'lose') computedCalories -= 400;
  if (fitnessGoal === 'gain') computedCalories += 500;

  const absoluteProteinGrams = Math.round(activeWeight * parseFloat(selectedDiet.proteinRatio));

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      <div>
        <h2 className="text-xl font-black">Clinical Nutritional & Diet Planning Workspace</h2>
        <p className="text-xs text-slate-400 font-semibold">Calibrate age scales and current weights to define precise consumption guidelines.</p>
      </div>

      {/* 🎛️ NUTRITIONAL METRIC CONTROLLER MATRIX */}
      <div className={`p-5 rounded-2xl border grid gap-4 grid-cols-1 sm:grid-cols-3 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'
      }`}>
        {/* Param 1: Age Classification Groups */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Age Demographics Classification</label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className={`w-full px-3 py-2 text-xs font-bold rounded-xl focus:outline-none border transition ${
              darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="child">👶 Child ({dietMatrix.child.range})</option>
            <option value="teen">⚡ Teenager ({dietMatrix.teen.range})</option>
            <option value="adult">💼 Adult ({dietMatrix.adult.range})</option>
            <option value="senior">👵 Senior Citizen ({dietMatrix.senior.range})</option>
          </select>
        </div>

        {/* Param 2: Current Weight Slider Filter Channel */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Current Weight Scale</label>
            <span className="text-xs font-black text-[#9c2747] dark:text-rose-400">{weightInput} kg</span>
          </div>
          <input
            type="range"
            min="10"
            max="150"
            step="1"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            className="w-full accent-[#9c2747] h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>

        {/* Param 3: Dynamic Metabolic Fitness Strategy */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Target Metric Goal</label>
          <select
            value={fitnessGoal}
            onChange={(e) => setFitnessGoal(e.target.value)}
            className={`w-full px-3 py-2 text-xs font-bold rounded-xl focus:outline-none border transition ${
              darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="lose">📉 Caloric Deficit (Weight Loss)</option>
            <option value="maintain">⚖️ Homeostasis Maintenance (Stay Healthy)</option>
            <option value="gain">📈 Caloric Surplus (Muscle Mass Gain)</option>
          </select>
        </div>
      </div>

      {/* 📊 QUANTITATIVE MACRO INTAKE DASHBOARD */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={`p-5 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <span className="text-3xl">🔥</span>
          <div>
            <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase block">Calculated Daily Intake Baseline</span>
            <h3 className="text-xl font-black text-[#9c2747] dark:text-rose-400 mt-0.5">{computedCalories} kCal / day</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Energy limits optimized for {fitnessGoal} parameters.</p>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <span className="text-3xl">🥩</span>
          <div>
            <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase block">Required Protein Target Bounds</span>
            <h3 className="text-xl font-black text-blue-500 mt-0.5">~ {absoluteProteinGrams} Grams / day</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Calculated ratio indexing: {selectedDiet.proteinRatio} macro window.</p>
          </div>
        </div>
      </div>

      {/* 📝 METRIC-SPECIFIC ADVOCACY AND MEAL ARCHITECTURE TILES */}
      <div className={`p-6 rounded-2xl border text-slate-700 dark:text-slate-300 space-y-4 ${
        darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xs'
      }`}>
        <div>
          <h3 className="text-xs font-black uppercase text-[#9c2747] dark:text-rose-400 tracking-wider">📋 Clinical Guidelines</h3>
          <p className="text-xs font-medium mt-1 leading-relaxed text-slate-400">{selectedDiet.advice}</p>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>

        <div>
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">🍽️ Recommended Daily Indian Meal Schedule Blueprint</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wide block">🍳 Breakfast (08:00 AM)</span>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">{selectedDiet.meals.breakfast}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-wide block">🍛 Lunch (01:30 PM)</span>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">{selectedDiet.meals.lunch}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-wide block">☕ Afternoon Snack (05:00 PM)</span>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">{selectedDiet.meals.snack}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
              <span className="text-[10px] font-black text-purple-500 uppercase tracking-wide block">🥣 Dinner (08:30 PM)</span>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">{selectedDiet.meals.dinner}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}