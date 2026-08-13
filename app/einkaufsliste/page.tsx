'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ShoppingItem {
  id: string;
  name: string;
  amount: number | string;
  unit: string;
  recipeTitle: string;
  checked: boolean;
}

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [manualAmount, setManualAmount] = useState('');
  const [manualName, setManualName] = useState('');

  // 1. Daten beim Laden abrufen
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('shoppingList') || '[]');
    setItems(saved);
  }, []);

  // 2. Hilfsfunktion zum Speichern
  const saveAndSet = (newItems: ShoppingItem[]) => {
    setItems(newItems);
    localStorage.setItem('shoppingList', JSON.stringify(newItems));
  };

  // 3. Artikel abhaken
  const toggleCheck = (id: string) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveAndSet(updated);
  };

  // 4. Einzelnen Artikel löschen
  const deleteItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    saveAndSet(updated);
  };

  // 5. Manuelles Hinzufügen
  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    const newItem: ShoppingItem = {
      id: 'manual-' + Date.now(),
      name: manualName,
      amount: manualAmount || '1',
      unit: '',
      recipeTitle: 'Manuell hinzugefügt',
      checked: false
    };

    saveAndSet([...items, newItem]);
    setManualAmount('');
    setManualName('');
  };

  // 6. Komplette Liste leeren
  const clearAll = () => {
    if (confirm('Wirklich alles löschen?')) {
      saveAndSet([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pb-32">
      <Link href="/" className="text-gray-500 hover:text-gray-900 mb-8 block font-medium">← Zurück zur Übersicht</Link>
      
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Einkaufsliste 🛒</h1>
      <p className="text-gray-500 mb-8">Dein digitaler Begleiter für den Supermarkt.</p>

      {/* Eingabeformular */}
      <form onSubmit={handleManualAdd} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm mb-8 flex flex-col sm:flex-row gap-3">
        <input 
          type="text" 
          placeholder="Menge (z.B. 2)" 
          value={manualAmount}
          onChange={(e) => setManualAmount(e.target.value)}
          className="w-full sm:w-1/3 p-3 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:border-gray-900"
        />
        <input 
          type="text" 
          placeholder="Zusatz-Artikel" 
          value={manualName}
          onChange={(e) => setManualName(e.target.value)}
          className="w-full sm:w-2/3 p-3 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:border-gray-900"
        />
        <button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-2xl transition shadow-sm whitespace-nowrap">
          + Hinzufügen
        </button>
      </form>

      {items.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium">Deine Einkaufsliste ist leer. Wähle Zutaten in einem Rezept aus!</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 cursor-pointer flex-grow" onClick={() => toggleCheck(item.id)}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${item.checked ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                    {item.checked && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <div>
                    <p className={`font-bold text-lg ${item.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">{item.recipeTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold bg-gray-100 px-3 py-1 rounded-lg text-gray-800">
                    {item.amount} {item.unit}
                  </span>
                  <button onClick={() => deleteItem(item.id)} className="text-gray-400 hover:text-red-600 font-bold px-2 py-1">
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <button onClick={clearAll} className="w-full py-3 text-red-600 font-bold bg-white border border-red-100 rounded-2xl hover:bg-red-50 transition">
              Komplette Liste leeren
            </button>
          </div>
        </div>
      )}
    </div>
  );
}