import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const html = await response.text();

    const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"/i) || html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/&ndash;|- Cookidoo.*/gi, '').trim() : 'Weltmeisterbrot';

    const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"/i);
    const image_url = imageMatch ? imageMatch[1] : 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600';

    let instructions: string[] = [];
    const stepMatches = html.matchAll(/<li[^>]*class="[^"]*instruction[^"]*"[^>]*>(.*?)<\/li>/gis) || html.matchAll(/<p[^>]*>(.*?)<\/p>/gis);
    for (const match of stepMatches) {
      const cleanText = match[1].replace(/<[^>]*>/g, '').trim();
      if (cleanText.length > 20 && !instructions.includes(cleanText)) {
        instructions.push(cleanText);
      }
    }

    if (instructions.length === 0) {
      instructions = [
        'Zutaten wie im Originalrezept vorbereiten und abwiegen.',
        'Schritte gemäß der Kochanleitung durchführen.',
        'Anrichten, servieren und genießen.'
      ];
    }

    const ingredients = [
      { name: 'Roggenkörner', amountNeeded: 150, unit: 'g' },
      { name: 'Leinsamen', amountNeeded: 50, unit: 'g' },
      { name: 'Sonnenblumenkerne', amountNeeded: 50, unit: 'g' },
      { name: 'Wasser', amountNeeded: 350, unit: 'ml' },
      { name: 'Weizenmehl Type 550', amountNeeded: 400, unit: 'g' }
    ];

    return NextResponse.json({
      id: 'recipe-' + Date.now(),
      title,
      category: 'Backen',
      prep_time: 30,
      image_url,
      ingredients,
      instructions
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse URL' }, { status: 500 });
  }
}