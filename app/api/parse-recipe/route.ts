import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.9,en;q=0.9',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the recipe page' }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    let title = '';
    let image_url = '';
    let ingredients: string[] = [];
    let instructions: string[] = [];
    let prep_time = 30;
    let category = 'Hauptgericht';

    // Wörter, die NIEMALS eine Zutat sein dürfen (Menü-Müll von Websites)
    const blacklist = [
      'für dich', 'entdecken', 'meine rezepte', 'meine woche', 'einkaufsliste', 
      'abo vorteile', 'hilfe', 'registrieren', 'anmelden', 'konto', 'zurück', 
      'suche', 'suchen', 'drucken', 'teilen', 'feedback', 'kontakt', 'impressum'
    ];

    const isValidIngredient = (text: string) => {
      const lower = text.toLowerCase();
      if (!text || text.length < 2 || text.length > 100) return false;
      return !blacklist.some(badWord => lower.includes(badWord));
    };

    // 1. JSON-LD Extraktion
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const jsonText = $(element).html();
        if (!jsonText) return;
        const data = JSON.parse(jsonText);
        
        const items = Array.isArray(data) ? data : [data];
        for (const item of items) {
          const recipeObj = item['@type'] === 'Recipe' ? item : (item['@graph'] ? item['@graph'].find((g: any) => g['@type'] === 'Recipe') : null);
          
          if (recipeObj) {
            if (recipeObj.name) title = recipeObj.name;
            if (recipeObj.image) {
              image_url = typeof recipeObj.image === 'string' ? recipeObj.image : (Array.isArray(recipeObj.image) ? recipeObj.image[0] : recipeObj.image.url);
            }
            if (recipeObj.recipeIngredient) {
              const rawIngs = Array.isArray(recipeObj.recipeIngredient) ? recipeObj.recipeIngredient : [recipeObj.recipeIngredient];
              ingredients = rawIngs.map((i: string) => i.trim()).filter(isValidIngredient);
            }
            if (recipeObj.recipeInstructions) {
              instructions = recipeObj.recipeInstructions.map((step: any) => {
                if (typeof step === 'string') return step;
                return step.text || step.name || '';
              }).filter(Boolean);
            }
          }
        }
      } catch (e) {
        // Fehler ignorieren
      }
    });

    // 2. Fallbacks falls JSON-LD nichts hergab
    if (!title) {
      title = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content') || 'Rezept';
    }
    if (!image_url) {
      image_url = $('meta[property="og:image"]').attr('content') || '';
    }

    if (ingredients.length === 0) {
      // Spezifischere Cookidoo / allgemeine Selektoren
      $('.core-recipe-detail__ingredients-item, [itemprop="recipeIngredient"], .recipe-details__ingredient-item, li.ingredient, .ingredient-row').each((_, el) => {
        const text = $(el).text().trim();
        if (isValidIngredient(text) && !ingredients.includes(text)) {
          ingredients.push(text);
        }
      });
    }

    return NextResponse.json({
      title: title || 'Unbenanntes Rezept',
      image_url: image_url || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600',
      prep_time,
      category,
      ingredients: ingredients.length > 0 ? ingredients : ['1 Pck. Bitte Zutaten manuell ergänzen'],
      instructions: instructions.length > 0 ? instructions : ['Bitte Anweisungen manuell ergänzen.'],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}