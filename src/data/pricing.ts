export const GROUPS = [
  {
    id: "a",
    label: "Skupiny A",
    description: "Motocykly",
    items: [
      { code: "AM",  name: "Moped / skútr",        age: 15, practice: 13, theory: 9,  price: 26000 },
      { code: "A1",  name: "Motocykl do 125 cc",   age: 16, practice: 13, theory: 9,  price: 26000 },
      { code: "A2",  name: "Motocykl do 35 kW",    age: 18, practice: 13, theory: 9,  price: 26000 },
      { code: "A",   name: "Motocykl neomezený",   age: 24, practice: 13, theory: 9,  price: 26000 },
    ],
    note: "Rozšiřující výcvik A1→A2 nebo A2→A: 8 700 Kč (s 2 roky praxe) nebo 10 000 Kč (bez praxe).",
  },
  {
    id: "b",
    label: "Skupina B",
    description: "Osobní automobil",
    items: [
      { code: "B", name: "Osobní automobil do 3 500 kg", age: 18, practice: 28, theory: 11, price: 28000 },
    ],
    note: "Skupina B automaticky zahrnuje AM (skútr 125 cc automat) + B1 (čtyřkolka) dle zákona č. 247/2000 Sb.",
  },
  {
    id: "be",
    label: "Skupiny BE / B96",
    description: "Osobní auto + přívěs",
    items: [
      { code: "BE",  name: "Osobní auto + přívěs",              age: 18, practice: 8, theory: 6, price: 10000 },
      { code: "B96", name: "Osobní auto + přívěs do 4 250 kg",  age: 18, practice: 2, theory: 0, price: 5199  },
    ],
    note: null,
  },
  {
    id: "c",
    label: "Skupiny C / CE",
    description: "Nákladní automobil",
    items: [
      { code: "C",  name: "Nákladní automobil",     age: 21, practice: 18, theory: 11, price: 26000 },
      { code: "CE", name: "Nákladní auto + přívěs", age: 21, practice: 8,  theory: 6,  price: 18000 },
    ],
    note: null,
  },
] as const;

export type GroupId = (typeof GROUPS)[number]["id"];

export const PRICE_PREVIEW = [
  { label: "Skupina B",   sub: "Osobní automobil",      price: "28 000 Kč" },
  { label: "Skupiny A",   sub: "Motocykly AM–A",         price: "26 000 Kč" },
  { label: "Skupina C",   sub: "Nákladní auto",          price: "26 000 Kč" },
  { label: "Skupina CE",  sub: "Nákl. auto + přívěs",   price: "18 000 Kč" },
] as const;
