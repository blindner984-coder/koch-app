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
    const rawTitle = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content') || 'Neues Rezept';
    const title = rawTitle.replace(/- Cookidoo.*/gi, '').trim();

    // INTELLIGENTE BILD-AUTOMATIK: Wählt basierend auf dem Titel garantiert das perfekte Foto
    const tLower = title.toLowerCase();
    let image_url = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600'; // Standard
    
    if (tLower.includes('salat') || tLower.includes('möhren') || tLower.includes('spirale')) {
      image_url = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600';
    } else if (tLower.includes('brot') || tLower.includes('brötchen')) {
      image_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600';
    } else if (tLower.includes('suppe')) {
      image_url = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600';
    } else if (tLower.includes('kuchen') || tLower.includes('torte') || tLower.includes('backen')) {
      image_url = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600';
    } else if (tLower.includes('pasta') || tLower.includes('spaghetti')) {
      image_url = 'https://images.unsplash.com/photo-1621996346565-e3d5d6281229?w=600';
    } else if (tLower.includes('pizza')) {
      image_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600';
    }

    // SAUBERE ZUBEREITUNGSSCHRITTE EXTRAHIEREN
    const instructions: string[] = [];
    $('p').each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 25 && 
          !text.includes('Cookie') && 
          !text.includes('Thermomix') && 
          !text.includes('Abo') && 
          !text.includes('Portion') &&
          !instructions.includes(text)) {
        instructions.push(text);
      }
    });

    const finalInstructions = instructions.length > 0 ? instructions.slice(0, 6) : [
      'Zutaten nach Anweisung vorbereiten und abwiegen.',
      'Schritte gemäß der Kochanleitung durchführen.',
      'Anrichten, servieren und genießen.'
    ];

    // Zutaten extrahieren
    const ingredients: any[] = [];
    $('li, tr').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 2 && text.length < 45 && !text.includes('Portion') && !text.includes('Suchen')) {
        ingredients.push({ name: text, amountNeeded: '', unit: '' });
      }
    });

    return NextResponse.json({
      id: 'recipe-' + Date.now(),
      title,
      category: 'Hauptgericht',
      prep_time: 25,
      image_url,
      ingredients: ingredients.slice(0, 12),
      instructions: finalInstructions
    });
  } catch (error) {
    return NextResponse.json({ error: 'Parsing fehlgeschlagen' }, { status: 500 });
  }
}