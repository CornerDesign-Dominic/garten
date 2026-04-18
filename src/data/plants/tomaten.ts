import type { Plant } from "./types";

export const tomaten: Plant = {
  name: "Tomaten",
  slug: "tomaten",
  category: "fruchtgemuese",
  lifecycle: "einjaehrig",
  summary: "Waermebeduerftige Starkzehrer mit langer Erntephase im Sommer und Herbst.",
  seo: {
    title: "Tomaten | Gruenkalender",
    description: "Tomaten im Garten: Hinweise zu Standort, Pflanzzeit, Pflege, Ernte und Zeitfenstern im Jahreslauf.",
  },
  content: {
    intro:
      "Tomaten lieben einen warmen, sonnigen Platz und entwickeln bei gleichmaessiger Versorgung aromatische Fruechte ueber viele Wochen.",
    standort:
      "Vollsonnig, windgeschuetzt und luftig. Der Boden sollte humos, naehrstoffreich und gleichmaessig feucht sein.",
    pflanzzeit:
      "Vorzucht ab Februar bis April. Nach den letzten Spaetfroesten ab Mitte Mai ins Freiland pflanzen.",
    pflege:
      "Regelmaessig giessen, Triebe fuehren und bei Stabtomaten ausgeizen. Organisch nachduengen, sobald Fruchtansatz einsetzt.",
    ernte:
      "Je nach Sorte meist von Juli bis Oktober. Reif sind die Fruechte bei sortentypischer Farbe und leichtem Drucknachgeben.",
    hinweise:
      "Blaetter moeglichst trocken halten und auf Luftzirkulation achten. Standortwechsel hilft gegen bodenbuertige Krankheiten.",
  },
  timeline: [
    {
      type: "vorzucht",
      label: "Vorzucht im Haus",
      startMonth: 2,
      startDay: 15,
      endMonth: 4,
      endDay: 15,
      color: "#f59e0b",
    },
    {
      type: "auspflanzen",
      label: "Ins Beet oder in grosse Kuebel setzen",
      startMonth: 5,
      startDay: 15,
      endMonth: 6,
      endDay: 10,
      color: "#22c55e",
    },
    {
      type: "duengen",
      label: "Startduengung nach dem Anwachsen",
      startMonth: 5,
      startDay: 25,
      endMonth: 6,
      endDay: 20,
      color: "#16a34a",
    },
    {
      type: "duengen",
      label: "Nachduegen zur Fruchtbildung",
      startMonth: 7,
      startDay: 1,
      endMonth: 8,
      endDay: 20,
      color: "#15803d",
    },
    {
      type: "ausgeizen",
      label: "Seitentriebe entfernen",
      startMonth: 6,
      startDay: 1,
      endMonth: 8,
      endDay: 31,
      color: "#65a30d",
    },
    {
      type: "ernten",
      label: "Haupternte",
      startMonth: 7,
      startDay: 10,
      endMonth: 10,
      endDay: 10,
      color: "#ef4444",
    },
  ],
};
