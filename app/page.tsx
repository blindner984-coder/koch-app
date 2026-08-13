'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { allRecipes } from './recipes';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [appRecipes, setAppRecipes] = useState(allRecipes);

  // LÄDT DIE KI-REZEPTE ZUVERLÄSSIG (Auch beim Zurück-Navigieren!)
  useEffect(() => {
    const loadRecipes = () => {
      const kiRecipes = JSON.parse(localStorage.getItem('savedKiRecipes') || '[]');
      setAppRecipes([...allRecipes, ...kiRecipes]); 
    };

    // 1. Direkt beim Start laden
    loadRecipes(); 

    // 2. Trick: Alle 1 Sekunde prüfen, ob ein neues Rezept gespeichert wurde
    // Das umgeht den Next.js Cache, wenn man über den Zurück-Button kommt.
    const intervalId = setInterval(loadRecipes, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const categories = ['Alle', 'Suppe', 'Pasta', 'Auflauf', 'Hauptgericht', 'Fisch', 'Salat', 'Vegetarisch', 'Dessert', 'Backen'];

  const filteredRecipes = appRecipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Deine Rezeptsammlung ✨</h1>
          <p className="text-gray-500 mt-1">Über 100+ Thermomix-Klassiker, Kochen und Einkaufen ohne Chaos.</p>
        </div>
        <Link 
          href="/neu" 
          className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-3 rounded-2xl shadow-sm transition"
        >
          + Neues Rezept
        </Link>
      </div>

      {/* Suchleiste */}
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">🔍</span>
        <input 
          type="text"
          placeholder="Nach Rezepten suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/10 shadow-sm text-gray-800"
        />
      </div>

      {/* Kategorie-Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
              selectedCategory === cat 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rezept Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link 
              href={`/rezept/${recipe.id}`} 
              key={recipe.id} 
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={recipe.image_url || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600'} 
                  alt={recipe.title} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full text-gray-700 shadow-sm">
                  {recipe.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {recipe.title}
                </h3>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 font-medium">
                  <span>⏱️ {recipe.prep_time} Min.</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-5xl mb-4 block">🤔</span>
          <h3 className="text-xl font-semibold text-gray-700">Kein Rezept gefunden...</h3>
        </div>
      )}
    </div>
  );
}