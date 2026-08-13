'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MagicImportPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSmartImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchQuery })
      });

      if (!response.ok) {
        throw new Error('Fehler bei der KI-Verbindung oder Webseite nicht lesbar.');
      }

      const generatedRecipe = await response.json();
      
      generatedRecipe.id = 'ki-' + Date.now();
      generatedRecipe.image_url = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600';

      const existingRecipes = JSON.parse(localStorage.getItem('savedKiRecipes') || '[]');
      localStorage.setItem('savedKiRecipes', JSON.stringify([...existingRecipes, generatedRecipe]));

      alert(`🎉 Rezept "${generatedRecipe.title}" wurde erfolgreich importiert!`);
      router.push('/');
      
    } catch (error: any) {
      alert("Fehler: " + error.message);
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 pb-32">
      <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors mb-8 block font-medium">← Zurück zur Übersicht</Link>
      <div className="bg-white rounded-3xl p-8 border shadow-2xl text-center relative overflow-hidden">
        <h1 className="text-3xl font-extrabold mb-3">Magic Import ✨</h1>
        <p className="text-gray-500 mb-8">
          Füge einen <b>Rezept-Link</b> (z.B. von Cookidoo) ein oder tippe den Namen des Gerichts ein. Die App erledigt den Rest!
        </p>

        {!isSearching ? (
          <form onSubmit={handleSmartImport} className="flex flex-col gap-4">
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="z.B. https://cookidoo.at/... oder 'Gulasch'" 
              className="w-full p-4 bg-gray-50 rounded-2xl border-2 text-center text-lg focus:border-gray-900 focus:outline-none transition-all" 
              required 
            />
            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-800 transition-colors text-lg">
              Rezept importieren 🪄
            </button>
          </form>
        ) : (
          <div className="py-12 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-100 border-t-gray-900 rounded-full animate-spin mb-6"></div>
            <p className="text-lg font-bold animate-pulse text-gray-800">Lade Webseite & analysiere Rezept...</p>
            <p className="text-sm text-gray-500 mt-2">Das kann ein paar Sekunden dauern.</p>
          </div>
        )}
      </div>
    </div>
  );
}