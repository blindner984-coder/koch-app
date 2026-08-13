'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function RezeptDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // Gespeicherte Rezepte aus dem Browser laden
    const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    
    // Standard-Fallback-Rezepte
    const defaultRecipes = [
      {
        id: 'karotten-ingwer-suppe',
        title: 'Karotten-Ingwer-Suppe',
        category: 'Suppe',
        prep_time: 25,
        image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600',
        ingredients: ['500g Karotten', '1 Stk. Ingwer', '1 Zwiebel', '500ml Gemüsebrühe'],
        instructions: ['Karotten und Ingwer schneiden.', 'Anbraten und mit Brühe ablöschen.', 'Pürieren und servieren.']
      }
    ];

    const allRecipes = [...storedRecipes, ...defaultRecipes];
    const found = allRecipes.find((r: any) => r.id === id);

    if (found) {
      setRecipe(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6 text-center text-gray-500">Lade Rezept...</div>;
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Rezept nicht gefunden!</h1>
        <Link href="/" className="text-blue-600 underline">← Zurück zur Übersicht</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/" className="text-sm text-gray-500 hover:underline mb-4 inline-block">
        ← Zurück zur Übersicht
      </Link>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm p-6 mb-6">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
        <p className="text-gray-600 mb-6">Zubereitungszeit: ca. {recipe.prep_time} Minuten</p>

        <h2 className="text-xl font-bold mb-3">Zutaten</h2>
        <ul className="list-disc list-inside mb-8 space-y-2 text-gray-800">
          {recipe.ingredients?.map((ing: string, i: number) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mb-3">Zubereitung</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-800">
          {recipe.instructions?.map((step: string, i: number) => (
            <li key={i} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}