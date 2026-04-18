import type { Plant } from "./types";

export const tomaten: Plant = {
  name: "Tomaten",
  slug: "tomaten",
  category: "fruchtgemuese",
  lifecycle: "einjaehrig",
  summary: "Wärmebedürftige Starkzehrer mit langer Erntephase im Sommer und Herbst.",
  seo: {
    title: "Tomaten | Grünkalender",
    description: "Tomaten im Garten: Hinweise zu Standort, Pflanzzeit, Pflege, Ernte und Zeitfenstern im Jahreslauf.",
  },
  content: {
    intro:
      "Tomaten lieben einen warmen, sonnigen Platz und entwickeln bei gleichmäßiger Versorgung aromatische Früchte über viele Wochen.",
    standort:
      "Vollsonnig, windgeschützt und luftig. Der Boden sollte humos, nährstoffreich und gleichmäßig feucht sein.",
    pflanzzeit:
      "Vorzucht ab Februar bis April. Nach den letzten Spätfrösten ab Mitte Mai ins Freiland pflanzen.",
    pflege:
      "Regelmäßig gießen, Triebe führen und bei Stabtomaten ausgeizen. Organisch nachdüngen, sobald Fruchtansatz einsetzt.",
    ernte:
      "Je nach Sorte meist von Juli bis Oktober. Reif sind die Früchte bei sortentypischer Farbe und leichtem Drucknachgeben.",
    hinweise:
      "Blätter möglichst trocken halten und auf Luftzirkulation achten. Standortwechsel hilft gegen bodenbürtige Krankheiten.",
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
      label: "Regelmäßig in der Wachstumsphase düngen",
      startMonth: 6,
      startDay: 1,
      endMonth: 7,
      endDay: 15,
      color: "#8b6b45",
    },
    {
      type: "duengen",
      label: "Nachdüngen während Fruchtansatz",
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
