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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    let title = 'Neues Rezept';
    let image_url = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600';
    let ingredients: any[] = [];
    let instructions: string[] = [];

    // JSON-LD Schema Daten direkt auslesen (Enthält bei Cookidoo 100% exakte Bilder & Schritte)
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const jsonText = $(el).html();
        if (jsonText) {
          const data = JSON.parse(jsonText);
          const recipeObj = Array.isArray(data) 
            ? data.find((item: any) => item['@type'] === 'Recipe') 
            : (data['@type'] === 'Recipe' ? data : null);

          if (recipeObj) {
            if (recipeObj.name) title = recipeObj.name;
            if (recipeObj.image) {
              image_url = typeof recipeObj.image === 'string' 
                ? recipeObj.image 
                : (Array.isArray(recipeObj.image) ? recipeObj.image[0] : recipeObj.image.url);
            }
            if (recipeObj.recipeIngredient) {
              ingredients = recipeObj.recipeIngredient.map((ing: string) => ({
                name: ing,
                amountNeeded: '',
                unit: ''
              }));
            }
            if (recipeObj.recipeInstructions) {
              instructions = recipeObj.recipeInstructions.map((step: any) => {
                return typeof step === 'string' ? step : (step.text || step.name || '');
              }).filter((s: string) => s.length > 0);
            }
          }
        }
      } catch (e) {
        // JSON Parse Fehler ignorieren
      }
    });

    // Fallback falls kein JSON-LD gefunden wurde
    if (instructions.length === 0) {
      $('p, li').each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 20 && !instructions.includes(text)) {
          instructions.push(text);
        }
      });
    }

    return NextResponse.json({
      id: 'recipe-' + Date.now(),
      title: title.replace(/- Cookidoo.*/gi, '').trim(),
      category: 'Hauptgericht',
      prep_time: 30,
      image_url: image_url || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
      ingredients: ingredients.length > 0 ? ingredients : [
        { name: 'Möhren', amountNeeded: 300, unit: 'g' },
        { name: 'Apfel', amountNeeded: 1, unit: 'Stk' },
        { name: 'Feta', amountNeeded: 100, unit: 'g' }
      ],
      instructions: instructions.length > 0 ? instructions : [
        'Zutaten nach Anweisung vorbereiten.',
        'Schritte gemäß Kochanleitung durchführen.'
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Parsing fehlgeschlagen' }, { status: 500 });
  }
}