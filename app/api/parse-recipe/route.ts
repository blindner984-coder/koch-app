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

    // Titel extrahieren
    const title = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content') || 'Neues Rezept';

    // BILD FIX: Priorität auf das OpenGraph-Meta-Tag (og:image), da dort das echte Hauptfoto von Cookidoo liegt!
    const image_url = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src') || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600';

    // ZUBEREITUNG FIX: Vollständige Schritte sauber auslesen
    const instructions: string[] = [];
    $('p, li').each((_, el) => {
      const text = $(el).text().trim();
      // Filter für echte Kochschritte (vermeidet Menüs oder Platzhalter)
      if (text.length > 20 && 
          (text.includes('Min') || text.includes('Stufe') || text.includes('geben') || text.includes('verrühren') || text.includes('.')) &&
          !instructions.includes(text) &&
          !text.includes('Cookie') && !text.includes('Thermomix') && !text.includes('Abo')) {
        instructions.push(text);
      }
    });

    const finalInstructions = instructions.length > 0 ? instructions.slice(0, 8) : [
      'Zutaten nach Anweisung vorbereiten und abwiegen.',
      'Schritte gemäß der Kochanleitung durchführen.',
      'Anrichten, servieren und genießen.'
    ];

    // Zutaten extrahieren
    const ingredients: any[] = [];
    $('ul li, tr').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 2 && text.length < 50 && !text.includes('Portion')) {
        ingredients.push({ name: text, amountNeeded: '', unit: '' });
      }
    });

    return NextResponse.json({
      id: 'recipe-' + Date.now(),
      title: title.replace(/- Cookidoo.*/gi, '').trim(),
      category: 'Hauptgericht',
      prep_time: 30,
      image_url,
      ingredients: ingredients.slice(0, 15),
      instructions: finalInstructions
    });
  } catch (error) {
    return NextResponse.json({ error: 'Parsing fehlgeschlagen' }, { status: 500 });
  }
}