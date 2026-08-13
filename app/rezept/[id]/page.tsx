'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { allRecipes, Recipe } from '../../recipes';

interface IngredientState {
  selected: boolean;
  amount: number | string;
}

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  
  const [ingStates, setIngStates] = useState<Record<string, IngredientState>>({});

  useEffect(() => {
    const kiRecipes = JSON.parse(localStorage.getItem('savedKiRecipes') || '[]');
    const combinedRecipes = [...allRecipes, ...kiRecipes];
    
    const found = combinedRecipes.find((r) => r.id === id);
    if (found) {
      setRecipe(found);
      
      const initialStates: Record<string, IngredientState> = {};
      found.ingredients?.forEach((ing: any, index: number) => {
        const uniqueKey = `${found.id}-ing-${index}`;
        initialStates[uniqueKey] = { selected: true, amount: ing.amountNeeded };
      });
      setIngStates(initialStates);
    }
    setLoading(false);
  }, [id]);

  const toggleIngredient = (key: string) => {
    setIngStates(prev => ({
      ...prev,
      [key]: { ...prev[key], selected: !prev[key].selected }
    }));
  };

  const updateAmount = (key: string, newAmount: string) => {
    setIngStates(prev => ({
      ...prev,
      [key]: { ...prev[key], amount: newAmount }
    }));
  };

  const addToShoppingList = () => {
    if (!recipe || !recipe.ingredients) return;

    const currentList = JSON.parse(localStorage.getItem('shoppingList') || '[]');

    const itemsToAdd = recipe.ingredients
      .map((ing: any, index: number) => {
        const uniqueKey = `${recipe.id}-ing-${index}`;
        return { ing, uniqueKey, state: ingStates[uniqueKey] };
      })
      .filter((item: any) => item.state?.selected)
      .map((item: any) => ({
        id: 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        name: item.ing.name,
        amount: item.state.amount,
        unit: item.ing.unit,
        recipeTitle: recipe.title,
        checked: false
      }));

    if (itemsToAdd.length === 0) {
      alert("Du hast keine Zutaten ausgewählt!");
      return;
    }

    localStorage.setItem('shoppingList', JSON.stringify([...currentList, ...itemsToAdd]));
    
    setAddedToList(true);
    setTimeout(() => setAddedToList(false), 3000);
  };

  if (loading) return <div className="p-16 text-center text-xl font-bold text-gray-500">Lade Rezept... ⏳</div>;

  if (!recipe) {
    return (
      <div className="p-16 text-center">
        <span className="text-5xl mb-4 block">🔍</span>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Rezept nicht gefunden!</h1>
        <Link href="/" className="text-blue-500 hover:underline font-medium">← Zurück zur Übersicht</Link>
      </div>
    );
  }

  const selectedCount = Object.values(ingStates).filter((state: any) => state?.selected).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
      <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors mb-6 block font-medium">
        ← Zurück zur Übersicht
      </Link>
      
      <img 
        src={recipe.image_url || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600'} 
        alt={recipe.title} 
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600'; }}
        className="w-full h-80 object-cover rounded-3xl mb-8 shadow-md" 
      />
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{recipe.title}</h1>
      <p className="text-gray-500 font-medium mb-8">⏱️ Zubereitungszeit: ca. {recipe.prep_time} Minuten</p>
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Zutatenliste 🛒</h2>
          <p className="text-sm text-gray-500 font-medium">Was fehlt noch?</p>
        </div>
        
        <div className="space-y-2 mb-8">
          {recipe.ingredients?.map((ing: any, index: number) => {
            const uniqueKey = `${recipe.id}-ing-${index}`;
            const state = ingStates[uniqueKey] || { selected: true, amount: ing.amountNeeded };
            
            return (
              <div 
                key={uniqueKey} 
                className={`flex flex-col sm:flex-row justify-between py-3 px-2 rounded-xl transition-colors ${state.selected ? 'hover:bg-gray-50' : 'opacity-60 bg-gray-50'}`}
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer mb-2 sm:mb-0 flex-grow" 
                  onClick={() => toggleIngredient(uniqueKey)}
                >
                  <div className={`w-6 h-6 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-colors ${state.selected ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
                    {state.selected && <span className="text-white text-sm font-bold">✓</span>}
                  </div>
                  <span className={`font-medium ${state.selected ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                    {ing.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto pl-10 sm:pl-0">
                  {state.selected ? (
                    <>
                      <input 
                        type="number" 
                        step="any"
                        value={state.amount} 
                        onChange={(e) => updateAmount(uniqueKey, e.target.value)}
                        className="w-16 p-1.5 text-center bg-white border border-gray-200 rounded-lg font-bold text-gray-900 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 shadow-sm"
                      />
                      <span className="text-gray-700 font-bold bg-gray-100 px-3 py-1.5 rounded-lg min-w-[3rem] text-center">
                        {ing.unit}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400 font-medium bg-transparent px-3 py-1.5 rounded-lg line-through">
                      {ing.amountNeeded} {ing.unit}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={addToShoppingList}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
            addedToList 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
        >
          {addedToList 
            ? '✅ Auf der Einkaufsliste!' 
            : `+ ${selectedCount} Zutaten auf die Einkaufsliste`}
        </button>
      </div>

      <div className="bg-gray-900 text-white p-6 md:p-8 rounded-3xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Zubereitung 👨‍🍳</h2>
        
        {recipe.instructions && recipe.instructions.length > 0 ? (
          <ol className="space-y-6">
            {recipe.instructions.map((step: string, index: number) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center font-bold shadow-sm">
                  {index + 1}
                </span>
                <p className="pt-1 leading-relaxed text-gray-100">{step}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-400 italic">Keine Zubereitungsschritte hinterlegt.</p>
        )}
      </div>
    </div>
  );
}