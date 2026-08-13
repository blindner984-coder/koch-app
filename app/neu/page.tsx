'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewRecipePage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/parse-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      let recipeData;
      if (res.ok) {
        recipeData = await res.json();
      } else {
        recipeData = {
          id: 'recipe-' + Date.now(),
          title: 'Importiertes Rezept',
          category: 'Hauptgericht',
          prep_time: 30,
          image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
          ingredients: [{ name: 'Zutaten nach Anleitung', amountNeeded: '', unit: '' }],
          instructions: ['Zutaten vorbereiten und nach Kochanleitung zubereiten.']
        };
      }

      const saved = JSON.parse(localStorage.getItem('savedKiRecipes') || '[]');
      saved.push(recipeData);
      localStorage.setItem('savedKiRecipes', JSON.stringify(saved));

      router.push('/');
    } catch (err) {
      setError('Fehler beim Importieren. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFC] text-slate-900 pb-32 overflow-x-hidden">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between w-full">
          <Link href="/" className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">KochApp</Link>
          <Link href="/" className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900">← Zurück</Link>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16 w-full">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm w-full">
          <div className="text-center mb-6">
            <span className="text-3xl sm:text-4xl mb-2 block">✨</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Magic Import</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Füge einen Rezept-Link (z.B. von Cookidoo) ein. Die App erledigt den Rest!
            </p>
          </div>

          <form onSubmit={handleImport} className="space-y-4">
            <div>
              <input
                type="url"
                required
                placeholder="https://cookidoo.at/recipes/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border border-slate-200/90 outline-none focus:border-slate-900 text-slate-900 font-medium text-sm sm:text-base bg-slate-50/50"
              />
            </div>

            {error && <p className="text-red-500 text-xs sm:text-sm font-medium text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 sm:py-4 rounded-2xl transition-all shadow-md text-sm sm:text-base disabled:opacity-50"
            >
              {loading ? 'Analysiere Rezept...' : 'Rezept importieren ✨'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}