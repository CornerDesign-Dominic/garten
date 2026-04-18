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
      startDay: 20,
      endMonth: 4,
      endDay: 15,
      color: "#bfdc9a",
    },
    {
      type: "auspflanzen",
      label: "Nach den Eisheiligen auspflanzen",
      startMonth: 5,
      startDay: 15,
      endMonth: 6,
      endDay: 5,
      color: "#6a9b38",
    },
    {
      type: "duengen",
      label: "Regelmaessig in der Wachstumsphase duengen",
      startMonth: 6,
      startDay: 1,
      endMonth: 7,
      endDay: 15,
      color: "#8b6b45",
    },
    {
      type: "duengen",
      label: "Nachduegen waehrend Fruchtansatz",
      startMonth: 7,
      startDay: 16,
      endMonth: 8,
      endDay: 31,
      color: "#8b6b45",
    },
    {
      type: "ernten",
      label: "Haupternte",
      startMonth: 7,
      startDay: 15,
      endMonth: 10,
      endDay: 15,
      color: "#c95b52",
    },
  ],
};
