'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Ingredient {
  name: string;
  amountNeeded: string;
  unit: string;
}

interface ManualRecipe {
  id: string;
  title: string;
  prep_time: string;
  category: string;
  image_url: string;
  ingredients: Ingredient[];
  instructions: string[];
}

export default function ManualRecipesPage() {
  const [recipes, setRecipes] = useState<ManualRecipe[]>([]);
  const [title, setTitle] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [category, setCategory] = useState('Hauptgericht');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('manualRecipes') || '[]');
    setRecipes(saved);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Bitte gib einen Rezepttitel ein!');
      return;
    }

    // Zutaten zeilenweise parsen (z.B. "200 g Mehl")
    const ingredients: Ingredient[] = ingredientsText
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const parts = line.trim().split(' ');
        return {
          amountNeeded: parts[0] || '1',
          unit: parts[1] || '',
          name: parts.slice(2).join(' ') || line.trim()
        };
      });

    const instructions = instructionsText
      .split('\n')
      .filter(line => line.trim() !== '');

    const newRecipe: ManualRecipe = {
      id: 'manual-' + Date.now(),
      title,
      prep_time: prepTime || '30',
      category,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600',
      ingredients,
      instructions
    };

    const updated = [newRecipe, ...recipes];
    setRecipes(updated);
    localStorage.setItem('manualRecipes', JSON.stringify(updated));

    // Formular leeren
    setTitle('');
    setPrepTime('');
    setImageUrl('');
    setIngredientsText('');
    setInstructionsText('');
    alert('Manuelles Rezept erfolgreich gespeichert!');
  };

  const deleteRecipe = (id: string) => {
    if (confirm('Möchtest du dieses manuelle Rezept wirklich löschen?')) {
      const updated = recipes.filter(r => r.id !== id);
      setRecipes(updated);
      localStorage.setItem('manualRecipes', JSON.stringify(updated));
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFC] text-slate-900 pb-32">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-bold text-slate-700 hover:text-slate-900">
            ← Zurück zur Übersicht
          </Link>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">Manuelle Rezepte ✍️</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-black tracking-tight mb-2">Eigene Rezepte mit der Hand erfassen</h1>
        <p className="text-slate-500 mb-8">Hier verwaltest du deine komplett selbst geschriebenen Rezepte.</p>

        {/* Eingabeformular */}
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm mb-12 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Neues Rezept erstellen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Rezepttitel</label>
              <input 
                type="text" 
                placeholder="z.B. Omas Sonntagsbraten"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Zubereitungszeit (Minuten)</label>
              <input 
                type="text" 
                placeholder="z.B. 45"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Kategorie</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 font-medium"
              >
                <option value="Hauptgericht">Hauptgericht</option>
                <option value="Suppe">Suppe</option>
                <option value="Pasta">Pasta</option>
                <option value="Auflauf">Auflauf</option>
                <option value="Fisch">Fisch</option>
                <option value="Salat">Salat</option>
                <option value="Vegetarisch">Vegetarisch</option>
                <option value="Dessert">Dessert</option>
                <option value="Backen">Backen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Bild-URL (optional)</label>
              <input 
                type="text" 
                placeholder="https://example.com/bild.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Zutaten (jede Zeile eine Zutat, z.B. &quot;200 g Mehl&quot;)</label>
            <textarea 
              rows={4}
              placeholder="200 g Mehl&#10;2 Stk Eier&#10;1 Prise Salz"
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Zubereitungsschritte (jeder Schritt eine Zeile)</label>
            <textarea 
              rows={4}
              placeholder="Mehl mit Eiern vermengen.&#10;Teig ausrollen und backen."
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
              className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 font-medium"
            />
          </div>

          <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-md transition">
            + Manuelles Rezept speichern
          </button>
        </form>

        {/* Liste */}
        <h2 className="text-2xl font-bold mb-6">Deine manuellen Rezepte ({recipes.length})</h2>
        {recipes.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200/80 shadow-sm">
            <p className="text-slate-500 font-medium">Noch keine manuellen Rezepte erfasst.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((r) => (
              <div key={r.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full">
                      {r.category}
                    </span>
                    <button onClick={() => deleteRecipe(r.id)} className="text-slate-400 hover:text-red-600 font-bold">
                      ✕
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{r.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">⏱️ {r.prep_time} Min. | {r.ingredients.length} Zutaten</p>
                </div>
                <Link 
                  href={`/rezept/${r.id}`}
                  className="block text-center bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-2xl transition text-sm"
                >
                  Ansehen & Kochen
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}