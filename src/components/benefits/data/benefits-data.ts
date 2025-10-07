export type Benefit = {
  amount: string;
  value: number;
  title: string;
  desc: string;
};

export const BENEFITS: Benefit[] = [
  {
    amount: "bis ca. 350.000 €",
    value: 350000,
    title: "Wellness-Wochenende oder Kaffeevollautomat",
    desc: "Genieße ein entspanntes Wellness-Wochenende oder einen hochwertigen Kaffeevollautomaten für dein Zuhause.",
  },
  {
    amount: "ab ca. 400.000 €",
    value: 400000,
    title: "Kurzurlaub in Europa",
    desc: "Erlebe einen unvergesslichen Kurzurlaub in einer europäischen Stadt deiner Wahl.",
  },
  {
    amount: "ab ca. 500.000 €",
    value: 500000,
    title: "E-Bike oder Fahrrad nach Wahl",
    desc: "Wähle ein modernes E-Bike oder ein Fahrrad ganz nach deinem Geschmack.",
  },
  {
    amount: "ab ca. 600.000 €",
    value: 600000,
    title: "Traumurlaub (eine Woche im 4–5 Sterne Hotel)",
    desc: "Verbringe eine Woche Luxusurlaub in einem 4–5 Sterne Hotel deiner Wahl.",
  },
  {
    amount: "ab ca. 750.000 €",
    value: 750000,
    title: "Neue Küche oder modernes Möbelpaket",
    desc: "Statte dein Zuhause mit einer neuen Küche oder einem stilvollen Möbelpaket aus.",
  },
  {
    amount: "ab ca. 1.000.000 €",
    value: 1000000,
    title: "Exklusivgeschenk",
    desc: "Ob Fernreise, Outdoor-Küche oder Designerstück – du entscheidest, was dein exklusives Geschenk sein soll.",
  },
];
