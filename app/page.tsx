'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { allRecipes, Recipe } from './recipes';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [kiRecipes, setKiRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedKiRecipes') || '[]');
    setKiRecipes(saved);
  }, []);

  const combinedRecipes = [...allRecipes, ...kiRecipes];

  const categories = ['Alle', 'Suppe', 'Pasta', 'Auflauf', 'Hauptgericht', 'Fisch', 'Salat', 'Vegetarisch', 'Dessert', 'Backen'];

  const filteredRecipes = combinedRecipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#FAFAFC] text-slate-900 selection:bg-slate-900 selection:text-white pb-32">
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-md shadow-slate-900/10">
              <span className="text-white text-lg font-black">K</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">KochApp</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/neu" 
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm flex items-center gap-2"
            >
              <span>✨</span> Neues Rezept
            </Link>
            <Link 
              href="/einkaufsliste" 
              className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 rounded-2xl border border-slate-200/80 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm flex items-center gap-2"
            >
              <span>🛒</span> Einkaufsliste
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 text-xs font-semibold text-slate-600 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            KI-gestützte Rezeptverwaltung
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-[1.1]">
            Deine digitale <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent">Kochkunst.</span>
          </h1>
          <p className="text-slate-500 text-lg font-normal leading-relaxed">
            Über 100+ Thermomix-Klassiker, smarte KI-Rezepte und ein automatisierter Einkaufskorb ohne Chaos.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              🔍
            </span>
            <input 
              type="text" 
              placeholder="Nach Rezepten oder Zutaten suchen..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat 
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredRecipes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/60 p-16 text-center shadow-sm">
            <span className="text-4xl mb-3 block">🍽️</span>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Keine Rezepte gefunden</h3>
            <p className="text-slate-500 text-sm">Versuche einen anderen Suchbegriff oder eine andere Kategorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <Link 
                href={`/rezept/${recipe.id}`} 
                key={recipe.id}
                className="group bg-white rounded-3xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img 
                    src={recipe.image_url || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600'} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-white/20">
                    {recipe.category || 'Rezept'}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-slate-600 transition-colors mb-2 line-clamp-1">
                      {recipe.title}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
                      <span>⏱️</span> ca. {recipe.prep_time} Minuten
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-slate-900">
                    <span className="group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                      Rezept öffnen <span className="text-xs">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}