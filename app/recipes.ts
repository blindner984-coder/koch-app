export interface Ingredient { 
  id: string; 
  name: string; 
  amountNeeded: number; 
  unit: string; 
}

export interface Recipe { 
  id: string; 
  title: string; 
  prep_time: number; 
  category: string; 
  image_url: string; 
  ingredients: Ingredient[];
  instructions: string[]; // <-- Das hat gefehlt! Die echten Schritte.
}

export const allRecipes: Recipe[] = [
  { 
    id: '1', 
    title: 'Karotten-Ingwer-Suppe', 
    prep_time: 25, 
    category: 'Suppe', 
    image_url: 'https://images.unsplash.com/photo-1594756202454-e4200c470dcc?w=600',
    ingredients: [
      { id: '1', name: 'Karotten (in Stücken)', amountNeeded: 500, unit: 'g' },
      { id: '2', name: 'Ingwer (frisch)', amountNeeded: 15, unit: 'g' },
      { id: '3', name: 'Zwiebel', amountNeeded: 1, unit: 'Stk.' },
      { id: '4', name: 'Öl', amountNeeded: 20, unit: 'g' },
      { id: '5', name: 'Gemüsebrühe', amountNeeded: 600, unit: 'ml' },
      { id: '6', name: 'Kokosmilch', amountNeeded: 150, unit: 'ml' }
    ],
    instructions: [
      "Karotten, Ingwer und Zwiebel in den Mixtopf geben und 5 Sek. / Stufe 5 zerkleinern. Mit dem Spatel nach unten schieben.",
      "Öl zugeben und 3 Min. / 120°C / Stufe 1 andünsten.",
      "Gemüsebrühe hinzufügen und 15 Min. / 100°C / Stufe 1 kochen.",
      "Kokosmilch zugeben und 1 Min. / Stufe 5-9 schrittweise ansteigend pürieren.",
      "Mit Salz und Pfeffer abschmecken und heiß servieren."
    ]
  },
  { 
    id: '2', 
    title: 'Klassischer Apfelkuchen', 
    prep_time: 60, 
    category: 'Backen', 
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600',
    ingredients: [
      { id: '1', name: 'Äpfel (geschält, geviertelt)', amountNeeded: 600, unit: 'g' },
      { id: '2', name: 'Butter (weich)', amountNeeded: 150, unit: 'g' },
      { id: '3', name: 'Zucker', amountNeeded: 130, unit: 'g' },
      { id: '4', name: 'Eier', amountNeeded: 3, unit: 'Stk.' },
      { id: '5', name: 'Mehl', amountNeeded: 200, unit: 'g' },
      { id: '6', name: 'Backpulver', amountNeeded: 2, unit: 'TL' }
    ],
    instructions: [
      "Backofen auf 180°C Ober-/Unterhitze vorheizen. Eine Springform (Ø 26 cm) einfetten.",
      "Äpfel in den Mixtopf geben, 4 Sek. / Stufe 4 zerkleinern und umfüllen.",
      "Butter, Zucker und Eier in den Mixtopf geben und 1 Min. / Stufe 4 schaumig rühren.",
      "Mehl und Backpulver zugeben und 20 Sek. / Stufe 5 unterheben.",
      "Zerkleinerte Äpfel mit dem Spatel unter den Teig heben.",
      "Teig in die vorbereitete Form füllen und ca. 45 Minuten backen."
    ]
  },
  { 
    id: '3', 
    title: 'Spaghetti Bolognese', 
    prep_time: 40, 
    category: 'Pasta', 
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6283b87?w=600',
    ingredients: [
      { id: '1', name: 'Spaghetti', amountNeeded: 400, unit: 'g' },
      { id: '2', name: 'Rinderhackfleisch', amountNeeded: 400, unit: 'g' },
      { id: '3', name: 'Zwiebel (halbiert)', amountNeeded: 1, unit: 'Stk.' },
      { id: '4', name: 'Knoblauchzehe', amountNeeded: 1, unit: 'Stk.' },
      { id: '5', name: 'Olivenöl', amountNeeded: 20, unit: 'g' },
      { id: '6', name: 'Passierte Tomaten', amountNeeded: 500, unit: 'g' }
    ],
    instructions: [
      "Zwiebel und Knoblauch in den Mixtopf geben und 5 Sek. / Stufe 5 zerkleinern. Mit dem Spatel nach unten schieben.",
      "Olivenöl zugeben und 3 Min. / 120°C / Stufe 1 andünsten.",
      "Hackfleisch zugeben und 5 Min. / 120°C / Linkslauf / Stufe 1 anbraten (ohne Messbecher).",
      "Passierte Tomaten, Salz und Pfeffer zugeben und 15 Min. / 100°C / Linkslauf / Stufe 1 köcheln lassen.",
      "Währenddessen Spaghetti in einem Topf auf dem Herd nach Packungsanweisung kochen und anschließend mit der Bolognese servieren."
    ]
  },
  { 
    id: '4', 
    title: 'Fruchtiges Erdbeer-Eis', 
    prep_time: 5, 
    category: 'Dessert', 
    image_url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600',
    ingredients: [
      { id: '1', name: 'Erdbeeren (tiefgefroren)', amountNeeded: 300, unit: 'g' },
      { id: '2', name: 'Zucker', amountNeeded: 50, unit: 'g' },
      { id: '3', name: 'Sahne', amountNeeded: 100, unit: 'g' }
    ],
    instructions: [
      "Zucker in den Mixtopf geben und 10 Sek. / Stufe 10 pulverisieren.",
      "Gefrorene Erdbeeren zugeben und 10 Sek. / Stufe 8 zerkleinern. Mit dem Spatel nach unten schieben.",
      "Sahne hinzufügen und 30 Sek. / Stufe 4 mithilfe des Spatels cremig rühren.",
      "Sofort servieren oder noch kurz ins Gefrierfach stellen."
    ]
  },
  { 
    id: '5', 
    title: 'Perfekter Pizzateig', 
    prep_time: 15, 
    category: 'Backen', 
    image_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600',
    ingredients: [
      { id: '1', name: 'Weizenmehl (Type 405)', amountNeeded: 500, unit: 'g' },
      { id: '2', name: 'Wasser (lauwarm)', amountNeeded: 250, unit: 'g' },
      { id: '3', name: 'Frische Hefe', amountNeeded: 20, unit: 'g' },
      { id: '4', name: 'Olivenöl', amountNeeded: 30, unit: 'g' },
      { id: '5', name: 'Salz', amountNeeded: 1, unit: 'TL' }
    ],
    instructions: [
      "Wasser und Hefe in den Mixtopf geben und 2 Min. / 37°C / Stufe 2 erwärmen.",
      "Mehl, Olivenöl und Salz zugeben.",
      "Den Teig 2 Min. / Teigknetstufe (Ähre) kneten.",
      "Teig in eine Schüssel umfüllen, abdecken und an einem warmen Ort ca. 1 Stunde gehen lassen, bis sich das Volumen verdoppelt hat."
    ]
  },
  { 
    id: '6', 
    title: 'Cremiges Pilz-Risotto', 
    prep_time: 35, 
    category: 'Hauptgericht', 
    image_url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db378?w=600',
    ingredients: [
      { id: '1', name: 'Risottoreis', amountNeeded: 300, unit: 'g' },
      { id: '2', name: 'Champignons (in Scheiben)', amountNeeded: 250, unit: 'g' },
      { id: '3', name: 'Zwiebel', amountNeeded: 1, unit: 'Stk.' },
      { id: '4', name: 'Parmesan (in Stücken)', amountNeeded: 50, unit: 'g' },
      { id: '5', name: 'Gemüsebrühe', amountNeeded: 700, unit: 'ml' },
      { id: '6', name: 'Butter', amountNeeded: 30, unit: 'g' }
    ],
    instructions: [
      "Parmesan in den Mixtopf geben, 10 Sek. / Stufe 10 zerkleinern und umfüllen.",
      "Zwiebel in den Mixtopf geben und 5 Sek. / Stufe 5 zerkleinern. Nach unten schieben.",
      "20 g Butter zugeben und 3 Min. / 120°C / Stufe 1 andünsten.",
      "Risottoreis zugeben und 3 Min. / 120°C / Linkslauf / Stufe 1 ohne Messbecher dünsten.",
      "Heiße Gemüsebrühe und Champignons zugeben. Einmal mit dem Spatel über den Topfboden rühren, um den Reis zu lösen.",
      "15 Min. / 100°C / Linkslauf / Stufe 1 garen.",
      "Restliche Butter und Parmesan unterheben, 1 Minute ruhen lassen und servieren."
    ]
  },
  { 
    id: '7', 
    title: 'Dattel-Curry-Dip', 
    prep_time: 10, 
    category: 'Vegetarisch', 
    image_url: 'https://images.unsplash.com/photo-1628198622830-1b77fcbbfab4?w=600',
    ingredients: [
      { id: '1', name: 'Datteln (entsteint)', amountNeeded: 150, unit: 'g' },
      { id: '2', name: 'Knoblauchzehe', amountNeeded: 1, unit: 'Stk.' },
      { id: '3', name: 'Frischkäse', amountNeeded: 200, unit: 'g' },
      { id: '4', name: 'Schmand', amountNeeded: 100, unit: 'g' },
      { id: '5', name: 'Currypulver', amountNeeded: 2, unit: 'TL' },
      { id: '6', name: 'Salz', amountNeeded: 1, unit: 'Prise' }
    ],
    instructions: [
      "Knoblauchzehe und Datteln in den Mixtopf geben und 10 Sek. / Stufe 8 zerkleinern.",
      "Mit dem Spatel alles nach unten schieben.",
      "Frischkäse, Schmand, Currypulver und Salz zugeben.",
      "Alles 15 Sek. / Stufe 4 vermischen.",
      "In ein Schälchen umfüllen und am besten noch 30 Minuten im Kühlschrank ziehen lassen."
    ]
  },
  { 
    id: '8', 
    title: 'Deftiges Rindergulasch', 
    prep_time: 75, 
    category: 'Hauptgericht', 
    image_url: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600',
    ingredients: [
      { id: '1', name: 'Rindergulasch (in Würfeln)', amountNeeded: 500, unit: 'g' },
      { id: '2', name: 'Zwiebeln', amountNeeded: 250, unit: 'g' },
      { id: '3', name: 'Öl', amountNeeded: 30, unit: 'g' },
      { id: '4', name: 'Tomatenmark', amountNeeded: 30, unit: 'g' },
      { id: '5', name: 'Rinderbrühe', amountNeeded: 350, unit: 'ml' },
      { id: '6', name: 'Paprikapulver (edelsüß)', amountNeeded: 1, unit: 'EL' }
    ],
    instructions: [
      "Zwiebeln halbieren, in den Mixtopf geben und 5 Sek. / Stufe 5 zerkleinern. Nach unten schieben.",
      "Öl zugeben und 3 Min. / 120°C / Stufe 1 andünsten.",
      "Fleischwürfel und Tomatenmark zugeben, 5 Min. / 120°C / Linkslauf / Stufe 1 anbraten.",
      "Brühe, Paprikapulver, Salz und Pfeffer zugeben.",
      "Alles 60 Min. / 100°C / Linkslauf / Sanftrührstufe (Löffelsymbol) schmoren lassen.",
      "Mit Kartoffeln oder Nudeln servieren."
    ]
  },
  { 
    id: '9', 
    title: 'Brokkoli-Apfel-Salat', 
    prep_time: 10, 
    category: 'Salat', 
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
    ingredients: [
      { id: '1', name: 'Brokkoli (in Röschen)', amountNeeded: 300, unit: 'g' },
      { id: '2', name: 'Apfel (geviertelt)', amountNeeded: 1, unit: 'Stk.' },
      { id: '3', name: 'Paprika (rot, in Stücken)', amountNeeded: 1, unit: 'Stk.' },
      { id: '4', name: 'Pinienkerne', amountNeeded: 30, unit: 'g' },
      { id: '5', name: 'Olivenöl', amountNeeded: 25, unit: 'g' },
      { id: '6', name: 'Apfelessig', amountNeeded: 15, unit: 'g' }
    ],
    instructions: [
      "Brokkoliröschen, Apfelstücke und Paprikastücke in den Mixtopf geben.",
      "Pinienkerne, Olivenöl, Apfelessig, 1 TL Salz und etwas Pfeffer hinzufügen.",
      "Alles 5 Sek. / Stufe 4 zerkleinern.",
      "In eine Schüssel umfüllen und direkt servieren."
    ]
  },
  { 
    id: '10', 
    title: 'Cremiger Milchreis', 
    prep_time: 40, 
    category: 'Dessert', 
    image_url: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=600',
    ingredients: [
      { id: '1', name: 'Milchreis (Rundkorn)', amountNeeded: 200, unit: 'g' },
      { id: '2', name: 'Vollmilch', amountNeeded: 1000, unit: 'ml' },
      { id: '3', name: 'Zucker', amountNeeded: 50, unit: 'g' },
      { id: '4', name: 'Vanillezucker', amountNeeded: 1, unit: 'Pck.' },
      { id: '5', name: 'Salz', amountNeeded: 1, unit: 'Prise' }
    ],
    instructions: [
      "Rühraufsatz (Schmetterling) einsetzen.",
      "Milch, Milchreis, Zucker, Vanillezucker und Salz in den Mixtopf geben.",
      "35 Min. / 90°C / Linkslauf / Stufe 1 garen (Messbecher weglassen).",
      "Rühraufsatz entfernen. Den Milchreis im Mixtopf noch 10 Minuten quellen lassen.",
      "Mit Zimt und Zucker oder frischen Früchten servieren."
    ]
  },
  { 
    id: '11', 
    title: 'Fluffiger Kartoffelbrei', 
    prep_time: 35, 
    category: 'Vegetarisch', 
    image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600',
    ingredients: [
      { id: '1', name: 'Kartoffeln (mehligkochend, in Stücken)', amountNeeded: 800, unit: 'g' },
      { id: '2', name: 'Milch', amountNeeded: 350, unit: 'g' },
      { id: '3', name: 'Butter', amountNeeded: 30, unit: 'g' },
      { id: '4', name: 'Salz', amountNeeded: 1, unit: 'TL' },
      { id: '5', name: 'Muskatnuss (gerieben)', amountNeeded: 1, unit: 'Prise' }
    ],
    instructions: [
      "Rühraufsatz (Schmetterling) einsetzen.",
      "Kartoffelstücke, Milch und Salz in den Mixtopf geben.",
      "30 Min. / 95°C / Stufe 1 kochen (ohne Messbecher, Garkörbchen als Spritzschutz aufsetzen).",
      "Butter und Muskatnuss zugeben.",
      "30 Sek. / Stufe 3 aufschlagen.",
      "Rühraufsatz entfernen und sofort servieren."
    ]
  },
  { 
    id: '12', 
    title: 'Hähnchen-Frikassee mit Reis', 
    prep_time: 45, 
    category: 'Hauptgericht', 
    image_url: 'https://images.unsplash.com/photo-1604908176997-125f2596c378?w=600',
    ingredients: [
      { id: '1', name: 'Hähnchenbrust (in mundgerechten Stücken)', amountNeeded: 400, unit: 'g' },
      { id: '2', name: 'Reis', amountNeeded: 250, unit: 'g' },
      { id: '3', name: 'Mischgemüse (z.B. Erbsen, Möhren, Spargel)', amountNeeded: 300, unit: 'g' },
      { id: '4', name: 'Wasser', amountNeeded: 800, unit: 'ml' },
      { id: '5', name: 'Sahne', amountNeeded: 150, unit: 'g' },
      { id: '6', name: 'Mehl', amountNeeded: 30, unit: 'g' }
    ],
    instructions: [
      "Wasser und 1 TL Salz in den Mixtopf geben. Garkörbchen einhängen und Reis einwiegen.",
      "Varoma-Behälter aufsetzen, Hähnchenstücke hineingeben und mit Salz und Pfeffer würzen. Varoma-Einlegeboden einsetzen und das Gemüse darauf verteilen.",
      "Varoma verschließen und 25 Min. / Varoma / Stufe 1 garen.",
      "Varoma abnehmen, Garkörbchen herausnehmen und beides warmstellen. Mixtopf leeren, dabei 400 ml der Garflüssigkeit auffangen.",
      "Aufgefangene Garflüssigkeit, Sahne und Mehl in den Mixtopf geben und 5 Min. / 100°C / Stufe 4 aufkochen.",
      "Fleisch und Gemüse in einer großen Schüssel mit der Sauce vermengen und mit dem Reis servieren."
    ]
  },
  { 
    id: '13', 
    title: 'Klassisches Basilikum-Pesto', 
    prep_time: 10, 
    category: 'Pasta', 
    image_url: 'https://images.unsplash.com/photo-1596450514735-15ff4811a7db?w=600',
    ingredients: [
      { id: '1', name: 'Frisches Basilikum', amountNeeded: 50, unit: 'g' },
      { id: '2', name: 'Parmesan', amountNeeded: 50, unit: 'g' },
      { id: '3', name: 'Pinienkerne', amountNeeded: 30, unit: 'g' },
      { id: '4', name: 'Knoblauchzehe', amountNeeded: 1, unit: 'Stk.' },
      { id: '5', name: 'Olivenöl', amountNeeded: 100, unit: 'g' },
      { id: '6', name: 'Salz', amountNeeded: 0.5, unit: 'TL' }
    ],
    instructions: [
      "Parmesan in Stücken in den Mixtopf geben und 10 Sek. / Stufe 10 zerkleinern. Umfüllen.",
      "Pinienkerne, Knoblauch und Basilikum in den Mixtopf geben und 5 Sek. / Stufe 7 zerkleinern.",
      "Mit dem Spatel nach unten schieben.",
      "Zerkleinerten Parmesan, Olivenöl und Salz zugeben.",
      "Alles 15 Sek. / Stufe 4 vermischen.",
      "In ein steriles Schraubglas füllen (hält sich im Kühlschrank, mit etwas Öl bedeckt, mehrere Wochen)."
    ]
  }
];