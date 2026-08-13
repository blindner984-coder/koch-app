'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NeuesRezeptPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState<any>(null);

  const handleParse = async (e: React.FormEvent) => {
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

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Fehler beim Laden des Rezepts');
      }

      setRecipe(data);
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!recipe) return;

    // Eindeutige ID generieren, um /rezept/undefined zu verhindern
    const recipeId = recipe.id || recipe.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();

    const recipeToSave = {
      ...recipe,
      id: recipeId,
    };

    const existing = JSON.parse(localStorage.getItem('recipes') || '[]');
    localStorage.setItem('recipes', JSON.stringify([recipeToSave, ...existing]));

    router.push(`/rezept/${recipeId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Neues Rezept importieren</h1>

      <form onSubmit={handleParse} className="flex gap-2 mb-6">
        <input
          type="url"
          placeholder="Rezept-URL eingeben (z.B. Cookidoo)..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Lade...' : 'Einlesen'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {recipe && (
        <div className="border rounded-xl p-6 shadow-sm bg-white">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
          <p className="text-gray-600 mb-4">Zubereitungszeit: ca. {recipe.prep_time} Minuten</p>

          <h3 className="font-semibold mb-2">Zutaten ({recipe.ingredients.length}):</h3>
          <ul className="list-disc list-inside mb-6 text-sm space-y-1">
            {recipe.ingredients.map((ing: string, i: number) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>

          <button
            onClick={handleSave}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            Rezept speichern & anzeigen
          </button>
        </div>
      )}
    </div>
  );
}