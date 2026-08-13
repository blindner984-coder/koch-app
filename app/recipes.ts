export interface Recipe {
  id: string;
  title: string;
  category: string;
  prep_time: number;
  image_url?: string;
  ingredients: { name: string; amountNeeded: number | string; unit: string }[];
  instructions: string[];
}

export const allRecipes: Recipe[] = [
  {
    id: 'karotten-ingwer-suppe',
    title: 'Karotten-Ingwer-Suppe',
    category: 'Suppe',
    prep_time: 25,
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600',
    ingredients: [
      { name: 'Karotten', amountNeeded: 500, unit: 'g' },
      { name: 'Ingwer', amountNeeded: 20, unit: 'g' },
      { name: 'Gemüsebrühe', amountNeeded: 750, unit: 'ml' }
    ],
    instructions: [
      'Karotten schälen und in Stücke schneiden.',
      'Ingwer fein hacken und mit Karotten in etwas Öl andünsten.',
      'Mit Gemüsebrühe ablöschen und ca. 20 Minuten weich kochen.',
      'Alles fein pürieren und heiß servieren.'
    ]
  },
  {
    id: 'klassischer-apfelkuchen',
    title: 'Klassischer Apfelkuchen',
    category: 'Backen',
    prep_time: 60,
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600',
    ingredients: [
      { name: 'Äpfel', amountNeeded: 4, unit: 'Stk' },
      { name: 'Mehl', amountNeeded: 250, unit: 'g' },
      { name: 'Zucker', amountNeeded: 150, unit: 'g' },
      { name: 'Butter', amountNeeded: 125, unit: 'g' }
    ],
    instructions: [
      'Äpfel schälen und in Spalten schneiden.',
      'Butter und Zucker schaumig schlagen, Mehl unterrühren.',
      'Teig in eine Form geben und mit Äpfeln belegen.',
      'Bei 180 Grad ca. 45 Minuten backen.'
    ]
  },
  {
    id: 'spaghetti-bolognese',
    title: 'Spaghetti Bolognese',
    category: 'Pasta',
    prep_time: 40,
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281229?w=600',
    ingredients: [
      { name: 'Spaghetti', amountNeeded: 400, unit: 'g' },
      { name: 'Hackfleisch', amountNeeded: 500, unit: 'g' },
      { name: 'Tomaten (gestückelt)', amountNeeded: 400, unit: 'g' },
      { name: 'Zwiebel', amountNeeded: 1, unit: 'Stk' }
    ],
    instructions: [
      'Spaghetti in Salzwasser al dente kochen.',
      'Zwiebel hacken und mit Hackfleisch scharf anbraten.',
      'Tomaten hinzufügen und die Sauce 20 Minuten köcheln lassen.',
      'Mit Spaghetti servieren.'
    ]
  },
  {
    id: 'fruchtiges-erdbeer-eis',
    title: 'Fruchtiges Erdbeer-Eis',
    category: 'Dessert',
    prep_time: 5,
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
    ingredients: [
      { name: 'Gefrorene Erdbeeren', amountNeeded: 300, unit: 'g' },
      { name: 'Sahne', amountNeeded: 100, unit: 'g' },
      { name: 'Puderzucker', amountNeeded: 50, unit: 'g' }
    ],
    instructions: [
      'Alle Zutaten in den Mixtopf oder Mixer geben.',
      'Auf höchster Stufe cremig mixen.',
      'Sofort frisch servieren.'
    ]
  },
  {
    id: 'perfekter-pizzateig',
    title: 'Perfekter Pizzateig',
    category: 'Backen',
    prep_time: 15,
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
    ingredients: [
      { name: 'Mehl (Type 00)', amountNeeded: 500, unit: 'g' },
      { name: 'Wasser (lauwarm)', amountNeeded: 300, unit: 'ml' },
      { name: 'Hefe (frisch)', amountNeeded: 10, unit: 'g' },
      { name: 'Salz', amountNeeded: 10, unit: 'g' }
    ],
    instructions: [
      'Hefe im warmen Wasser auflösen.',
      'Mit Mehl und Salz zu einem glatten Teig verkneten.',
      'Mindestens 2 Stunden gehen lassen.',
      'Ausrollen und nach Wunsch belegen.'
    ]
  },
  {
    id: 'cremiges-pilz-risotto',
    title: 'Cremiges Pilz-Risotto',
    category: 'Hauptgericht',
    prep_time: 35,
    image_url: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600',
    ingredients: [
      { name: 'Risottoreis', amountNeeded: 300, unit: 'g' },
      { name: 'Champignons', amountNeeded: 250, unit: 'g' },
      { name: 'Gemüsebrühe', amountNeeded: 900, unit: 'ml' },
      { name: 'Parmesan', amountNeeded: 60, unit: 'g' }
    ],
    instructions: [
      'Pilze anbraten und beiseitestellen.',
      'Reis in Öl answitzen, nach und nach mit Brühe aufgießen und rühren.',
      'Pilze und Parmesan unterrühren, kurz ziehen lassen.'
    ]
  },
  {
    id: 'dattel-curry-dip',
    title: 'Dattel-Curry-Dip',
    category: 'Vegetarisch',
    prep_time: 10,
    image_url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600',
    ingredients: [
      { name: 'Frischkäse', amountNeeded: 200, unit: 'g' },
      { name: 'Datteln', amountNeeded: 80, unit: 'g' },
      { name: 'Curripulver', amountNeeded: 1, unit: 'TL' }
    ],
    instructions: [
      'Datteln sehr fein hacken.',
      'Mit Frischkäse und Currypulver verrühren.',
      'Kühl stellen und durchziehen lassen.'
    ]
  },
  {
    id: 'deftiges-rindergulasch',
    title: 'Deftiges Rindergulasch',
    category: 'Hauptgericht',
    prep_time: 75,
    image_url: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600',
    ingredients: [
      { name: 'Rindergulasch', amountNeeded: 600, unit: 'g' },
      { name: 'Zwiebeln', amountNeeded: 400, unit: 'g' },
      { name: 'Paprikapulver', amountNeeded: 2, unit: 'EL' },
      { name: 'Rinderbrühe', amountNeeded: 400, unit: 'ml' }
    ],
    instructions: [
      'Fleisch anbraten, reichlich gewürfelte Zwiebeln dazugeben.',
      'Mit Paprikapulver bestreuen und mit Brühe ablöschen.',
      'Mindestens 1 bis 1.5 Stunden weich schmoren.'
    ]
  },
  {
    id: 'brokkoli-apfel-salat',
    title: 'Brokkoli-Apfel-Salat',
    category: 'Salat',
    prep_time: 10,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
    ingredients: [
      { name: 'Brokkoli', amountNeeded: 1, unit: 'Stk' },
      { name: 'Apfel', amountNeeded: 1, unit: 'Stk' },
      { name: 'Mayonnaise', amountNeeded: 3, unit: 'EL' }
    ],
    instructions: [
      'Brokkoli in kleine Röschen teilen (roh oder kurz blanchiert).',
      'Apfel würfeln und untermischen.',
      'Mit Dressing aus Mayo, Salz und etwas Zitronensaft abschmecken.'
    ]
  },
  {
    id: 'cremiger-milchreis',
    title: 'Cremiger Milchreis',
    category: 'Dessert',
    prep_time: 40,
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
    ingredients: [
      { name: 'Milchreis', amountNeeded: 250, unit: 'g' },
      { name: 'Milch', amountNeeded: 1, unit: 'l' },
      { name: 'Zucker', amountNeeded: 40, unit: 'g' }
    ],
    instructions: [
      'Milch mit Zucker auf kochen lassen.',
      'Milchreis einrühren und bei schwacher Hitze ca. 30 Minuten quellen lassen.',
      'Gelegentlich umrühren.'
    ]
  },
  {
    id: 'fluffiger-kartoffelbrei',
    title: 'Fluffiger Kartoffelbrei',
    category: 'Vegetarisch',
    prep_time: 35,
    image_url: 'https://images.unsplash.com/photo-1518977676601-b5ff82803c43?w=600',
    ingredients: [
      { name: 'Kartoffeln (mehlig)', amountNeeded: 800, unit: 'g' },
      { name: 'Milch', amountNeeded: 150, unit: 'ml' },
      { name: 'Butter', amountNeeded: 40, unit: 'g' }
    ],
    instructions: [
      'Kartoffeln schälen und in Salzwasser weich kochen.',
      'Wasser abgießen und Kartoffeln stampfen.',
      'Warme Milch und Butter unterrühren bis es cremig wird.'
    ]
  },
  {
    id: 'haenchen-frikassee-mit-reis',
    title: 'Hähnchen-Frikassee mit Reis',
    category: 'Hauptgericht',
    prep_time: 45,
    image_url: 'https://images.unsplash.com/photo-1604908176997-125f2596f3a8?w=600',
    ingredients: [
      { name: 'Hähnchenbrust', amountNeeded: 500, unit: 'g' },
      { name: 'Reis', amountNeeded: 250, unit: 'g' },
      { name: 'Erbsen', amountNeeded: 150, unit: 'g' },
      { name: 'Champignons', amountNeeded: 200, unit: 'g' }
    ],
    instructions: [
      'Reis kochen.',
      'Hähnchenbrust anbraten, herausnehmen und in Würfel schneiden.',
      'Pilze und Erbsen anschwenken, helle Sauce anrühren und Fleisch dazugeben.',
      'Zusammen mit dem Reis servieren.'
    ]
  }
];