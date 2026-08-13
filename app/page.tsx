'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('recipes') || '[]');
    // Standard-Rezepte falls noch keine da sind
    if (loaded.length === 0) {
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
      localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
      setRecipes(defaultRecipes);
    } else {
      setRecipes(loaded);
    }
  }, []);

  const categories = ['Alle', 'Klassiker', 'Suppe', 'Pasta', 'Auflauf', 'Hauptgericht', 'Fisch', 'Salat', 'Vegetarisch', 'Dessert', 'Backen'];

  const filteredRecipes = recipes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Deine digitale Kochkunst.</h1>
        <p className="text-gray-600">Über 100+ Thermomix-Klassiker, smarte KI-Rezepte und ein automatisierter Einkaufskorb ohne Chaos.</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Nach Rezepten oder Zutaten suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl border rounded-full px-6 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Link key={recipe.id} href={`/rezept/${recipe.id}`} className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white block">
            <div className="relative h-48">
              <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                {recipe.category || 'Hauptgericht'}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{recipe.title}</h3>
              <p className="text-gray-500 text-sm">ca. {recipe.prep_time} Minuten</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}