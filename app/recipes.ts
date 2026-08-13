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
    id: 'lasagne-al-forno',
    title: 'Lasagne al Forno',
    category: 'Pasta',
    prep_time: 50,
    image_url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600',
    ingredients: [
      { name: 'Lasagneplatten', amountNeeded: 250, unit: 'g' },
      { name: 'Hackfleisch', amountNeeded: 500, unit: 'g' },
      { name: 'Tomatensauce', amountNeeded: 500, unit: 'ml' },
      { name: 'Geriebener Käse', amountNeeded: 200, unit: 'g' }
    ],
    instructions: [
      'Hackfleisch anbraten und mit Tomatensauce verfeinern.',
      'Eine Auflaufform abwechselnd mit Sauce, Platten und Fleisch schichten.',
      'Mit reichlich Käse bestreuen.',
      'Im Ofen bei 200 Grad ca. 35 Minuten goldbraun backen.'
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
    id: 'kaesespaetzle',
    title: 'Deftige Käsespätzle',
    category: 'Klassiker',
    prep_time: 30,
    image_url: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600',
    ingredients: [
      { name: 'Spätzle', amountNeeded: 400, unit: 'g' },
      { name: 'Geriebener Bergkäse', amountNeeded: 200, unit: 'g' },
      { name: 'Zwiebeln', amountNeeded: 2, unit: 'Stk' },
      { name: 'Butter', amountNeeded: 30, unit: 'g' }
    ],
    instructions: [
      'Spätzle in Salzwasser kochen bis sie an der Oberfläche schwimmen.',
      'Zwiebeln in Ringe schneiden und in Butter goldbraun anbraten.',
      'Spätzle abwechselnd mit Bergkäse in eine warme Form schichten und schmelzen lassen.',
      'Mit Röstzwiebeln garnieren und servieren.'
    ]
  },
  {
    id: 'knuspriges-lachsfilet',
    title: 'Knuspriges Lachsfilet',
    category: 'Fisch',
    prep_time: 25,
    image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600',
    ingredients: [
      { name: 'Lachsfilet', amountNeeded: 2, unit: 'Stk' },
      { name: 'Olivenöl', amountNeeded: 2, unit: 'EL' },
      { name: 'Zitrone', amountNeeded: 1, unit: 'Stk' },
      { name: 'Rosmarin', amountNeeded: 1, unit: 'Zweig' }
    ],
    instructions: [
      'Lachsfilet mit Salz und Pfeffer würzen.',
      'In einer Pfanne mit Olivenöl und Rosmarin auf der Hautseite scharf anbraten.',
      'Wenden und kurz gar ziehen lassen.',
      'Mit frischem Zitronensaft beträufeln und servieren.'
    ]
  }
];