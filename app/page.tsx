'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { allRecipes, Recipe } from './recipes';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [kiRecipes, setKiRecipes] = useState<Recipe[]>([]);
  const [manualRecipes, setManualRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const savedKi = JSON.parse(localStorage.getItem('savedKiRecipes') || '[]');
    const savedManual = JSON.parse(localStorage.getItem('manualRecipes') || '[]');
    setKiRecipes(savedKi);
    setManualRecipes(savedManual);
  }, []);

  const combinedRecipes = [...allRecipes, ...kiRecipes, ...manualRecipes];
  const categories = ['Alle', 'Klassiker', 'Suppe', 'Pasta', 'Auflauf', 'Hauptgericht', 'Fisch', 'Salat', 'Vegetarisch', 'Dessert', 'Backen'];

  const filteredRecipes = combinedRecipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-8 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-xs font-semibold text-slate-600 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            KI-gestützte Rezeptverwaltung
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3 leading-tight break-words">
            Deine digitale <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent">Kochkunst.</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-lg font-normal leading-relaxed">
            Über 100+ Thermomix-Klassiker, smarte KI-Rezepte und ein automatisierter Einkaufskorb ohne Chaos.
          </p>
        </div>

        <div className="mt-6 sm:mt-8 max-w-xl w-full">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Nach Rezepten oder Zutaten suchen..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-sm outline-none focus:border-slate-900 text-slate-900 placeholder:text-slate-400 font-medium text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pt-4 sm:pt-6 pb-2 no-scrollbar w-full max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl font-semibold text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {filteredRecipes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/60 p-12 text-center shadow-sm w-full">
            <span className="text-4xl mb-3 block">🍽️</span>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Keine Rezepte gefunden</h3>
            <p className="text-slate-500 text-sm">Versuche einen anderen Suchbegriff oder eine andere Kategorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {filteredRecipes.map((recipe) => {
              const isManual = manualRecipes.some((m) => m.id === recipe.id);
              const isKi = kiRecipes.some((k) => k.id === recipe.id);
              const badgeText = isManual ? '✍️ Manuell' : isKi ? '⭐ Gespeichert' : (recipe.category || 'Rezept');
              const imageUrl = recipe.image_url || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600';

              return (
                <Link 
                  href={`/rezept/${recipe.id}`} 
                  key={recipe.id}
                  className="group bg-white rounded-3xl border border-slate-200/70 overflow-hidden shadow-sm flex flex-col w-full"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img src={imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm border border-white/25 z-10">
                      {badgeText}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900 mb-1 line-clamp-1">{recipe.title}</h2>
                      <p className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
                        <span>⏱️</span> ca. {recipe.prep_time} Minuten
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}