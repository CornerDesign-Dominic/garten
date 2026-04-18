import type { Plant } from "./types";

export const gurken: Plant = {
  name: "Gurken",
  slug: "gurken",
  category: "fruchtgemuese",
  summary: "Schnellwachsende Waermekultur mit laufender Ernte bei konstanter Wasserversorgung.",
  seo: {
    title: "Gurken | Gruenkalender",
    description: "Gurken im Garten: Standort, Pflanzzeit, Pflege, Ernte und saisonale Zeitfenster auf einen Blick.",
  },
  content: {
    intro:
      "Gurken entwickeln bei warmen Bedingungen und gleichmaessiger Feuchte einen hohen Ertrag ueber den gesamten Sommer.",
    standort:
      "Sonnig bis halbschattig, warm und geschuetzt. Der Boden sollte locker, humos und naehrstoffreich sein.",
    pflanzzeit:
      "Vorzucht ab April. Auspflanzen ins Freiland ab Mitte Mai, sobald die Naechte stabil warm sind.",
    pflege:
      "Regelmaessig giessen, Boden mulchen und Triebe an Rankhilfen fuehren. In Schubphasen moderat nachduengen.",
    ernte:
      "Je nach Sorte ab Juni/Juli bis in den Spaetsommer. Fruechte regelmaessig schneiden, damit neue nachkommen.",
    hinweise:
      "Kaelte und Staunaesse vermeiden. Rankkultur verbessert Luftzirkulation und reduziert Krankheitsdruck.",
  },
  timeline: [
    {
      type: "vorzucht",
      label: "Vorzucht in Toepfen",
      startMonth: 4,
      startDay: 1,
      endMonth: 5,
      endDay: 5,
      color: "#f59e0b",
    },
    {
      type: "auspflanzen",
      label: "Auspflanzen ins Freiland",
      startMonth: 5,
      startDay: 15,
      endMonth: 6,
      endDay: 15,
      color: "#22c55e",
    },
    {
      type: "duengen",
      label: "Erste Naehrstoffgabe",
      startMonth: 6,
      startDay: 1,
      endMonth: 6,
      endDay: 30,
      color: "#16a34a",
    },
    {
      type: "duengen",
      label: "Nachduengung in der Hauptphase",
      startMonth: 7,
      startDay: 5,
      endMonth: 8,
      endDay: 15,
      color: "#15803d",
    },
    {
      type: "schneiden",
      label: "Ranken leiten und einkuerzen",
      startMonth: 6,
      startDay: 15,
      endMonth: 8,
      endDay: 31,
      color: "#65a30d",
    },
    {
      type: "ernten",
      label: "Laufende Ernte",
      startMonth: 6,
      startDay: 25,
      endMonth: 9,
      endDay: 20,
      color: "#06b6d4",
    },
  ],
};
