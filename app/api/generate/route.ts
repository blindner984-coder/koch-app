import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { searchQuery } = body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key fehlt.' }, { status: 500 });
    }

    let contentForAI = "";

    // PRÜFEN: Ist die Eingabe ein Link?
    if (searchQuery.startsWith('http://') || searchQuery.startsWith('https://')) {
      try {
        // Der Server besucht die Webseite und lädt den Quelltext herunter
        const fetchRes = await fetch(searchQuery, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        const html = await fetchRes.text();
        
        // Wir entfernen störenden Code (Skripte, Design) um nur den Text für die KI zu behalten
        const cleanText = html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ') // Entfernt alle HTML-Tags
          .replace(/\s+/g, ' ')     // Entfernt überflüssige Leerzeichen
          .substring(0, 12000);     // Nimmt nur die ersten 12.000 Zeichen (reicht für jedes Rezept)

        contentForAI = `Ich habe den Text einer Rezept-Webseite heruntergeladen. Extrahiere das Rezept exakt aus diesem Text:\n\n${cleanText}`;
      } catch (err) {
        // Falls die Seite unseren Server blockiert, soll die KI anhand der URL raten
        contentForAI = `Erstelle ein professionelles Thermomix-Rezept passend zu diesem Link: ${searchQuery}`;
      }
    } else {
      // Wenn es kein Link ist, funktioniert es wie bisher (z.B. Eingabe "Gulasch")
      contentForAI = `Erstelle ein professionelles Thermomix-Rezept für: "${searchQuery}"`;
    }

    // Der Befehl an die KI
    const prompt = `${contentForAI}\n\n
    Antworte AUSSCHLIESSLICH im exakten JSON Format: 
    { "title": "Name des Rezepts", "prep_time": 30, "category": "Hauptgericht", "ingredients": [{"id": "1", "name": "Zutat", "amountNeeded": 100, "unit": "g"}], "instructions": ["Schritt 1", "Schritt 2"] }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const recipeObj = JSON.parse(data.choices[0].message.content);
    
    return NextResponse.json(recipeObj);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Fehler bei der Rezeptgenerierung.' }, { status: 500 });
  }
}