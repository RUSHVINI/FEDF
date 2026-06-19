import React, { useState } from 'react';

export default function MedicineStore({ darkMode, onProceedToPayment }) {
  const [cart, setCart] = useState([]);

  // 💊 Pharmacy Stock Inventory Registry
  const medicineInventory = [
    { id: 101, name: "Paracetamol 650mg", category: "Analgesic", price: 40, description: "Fever and mild pain relief" },
    { id: 102, name: "Amoxicillin 500mg", category: "Antibiotic", price: 120, description: "Bacterial infection track control" },
    { id: 103, name: "Cetirizine 10mg", category: "Antihistamine", price: 35, description: "Allergy relief and cold treatment" },
    { id: 104, name: "Metformin 500mg", category: "Antidiabetic", price: 90, description: "Blood sugar management matrix" },
    { id: 105, name: "Atorvastatin 10mg", category: "Cardiovascular", price: 150, description: "Cholesterol level optimization" },
    { id: 106, name: "B-Complex Multivitamins", category: "Supplements", price: 75, description: "Immunity and energy booster" }
  ];

  const addToCart = (med) => {
    const existing = cart.find(item => item.id === med.id);
    if (existing) {
      setCart(cart.map(item => item.id === med.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...med, qty: 1 }]);
    }
  };

  const updateQty = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your medicine cart is empty!");
      return;
    }

    // Build the structural entity payload to mirror the custom doctor scheme layout
    const medicineOrderPayload = {
      isMedicine: true,
      name: "Pharmacy Dispensary Orders",
      specialty: `${cart.length} Prescription Items`,
      fee: `₹${cartTotal}`,
      itemsSummary: cart.map(item => `${item.name} (x${item.qty})`).join(', ')
    };

    // Staging booking timeline configuration properties
    const checkoutDetails = {
      date: new Date().toISOString().split('T')[0],
      time: "Immediate Pickup"
    };

    onProceedToPayment(medicineOrderPayload, checkoutDetails);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3 text-left animate-fadeIn">
      {/* MEDICINE CATALOG LIST */}
      <div className="md:col-span-2 space-y-4">
        <div>
          <h2 className="text-xl font-black">E-Pharmacy Store</h2>
          <p className="text-xs text-slate-400 font-semibold">Select required clinical medications to your prescription cart.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {medicineInventory.map(med => (
            <div key={med.id} className={`p-4 rounded-xl border flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xs'
            }`}>
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-black tracking-tight">{med.name}</h4>
                  <span className="text-[9px] font-black text-[#9c2747] dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
                    ₹{med.price}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">{med.category}</p>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">{med.description}</p>
              </div>

              <button
                onClick={() => addToCart(med)}
                className="w-full mt-3 bg-slate-100 dark:bg-slate-800 hover:bg-[#9c2747] hover:text-white transition text-[11px] font-black py-1.5 rounded-lg text-center"
              >
                + Add To Order
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PERSISTENT BASKET BREAKDOWN SUMMARY CARD */}
      <div className={`p-5 rounded-2xl border h-fit space-y-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xs'
      }`}>
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Order Manifest</h3>
        {cart.length === 0 ? (
          <p className="text-xs text-slate-400 font-bold py-6 text-center">Your pharmacy cart is empty.</p>
        ) : (
          <>
            <div className="space-y-2 max-h-48 overflow-y-auto divide-y dark:divide-slate-800">
              {cart.map(item => (
                <div key={item.id} className="pt-2 flex justify-between items-center text-xs font-bold">
                  <div className="max-w-[60%] truncate">
                    <p className="text-slate-800 dark:text-slate-200 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400">₹{item.price * item.qty}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded-lg">
                    <button onClick={() => updateQty(item.id, -1)} className="hover:text-[#9c2747]">-</button>
                    <span className="text-[11px] font-black">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="hover:text-[#9c2747]">+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t dark:border-slate-800 pt-3 flex justify-between items-center font-black text-sm">
              <span>Total Price:</span>
              <span className="text-[#9c2747] dark:text-rose-400">₹{cartTotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#9c2747] hover:bg-[#801f39] text-white text-xs font-black py-3 rounded-xl tracking-widest uppercase transition shadow-md"
            >
              Secure Order Checkout &rarr;
            </button>
          </>
        )}
      </div>
    </div>
  );
}