import type { Plant } from "./types";

export const radieschen: Plant = {
  name: "Radieschen",
  slug: "radieschen",
  category: "wurzelgemuese",
  lifecycle: "einjaehrig",
  summary: "Schnelle Zwischenkultur mit kurzen Entwicklungszeiten und mehreren Saatfenstern.",
  seo: {
    title: "Radieschen | Gruenkalender",
    description: "Radieschen im Garten: Standort, Aussaat, Pflege, Ernte und typische Zeitfenster uebersichtlich erklaert.",
  },
  content: {
    intro:
      "Radieschen sind unkompliziert und eignen sich hervorragend fuer fortlaufende Saetze im Fruehjahr und Spaetsommer.",
    standort:
      "Sonnig bis halbschattig. Lockerer, steinfreier Boden foerdert gleichmaessige Knollenbildung.",
    pflanzzeit:
      "Direktsaat von Maerz bis September in kurzen Abstaenden fuer fortlaufende Ernte.",
    pflege:
      "Konstant feucht halten, nicht zu dicht stehen lassen und regelmaessig hacken.",
    ernte:
      "Je nach Witterung nach 4 bis 8 Wochen. Fruehzeitig ernten, bevor die Knollen holzig werden.",
    hinweise:
      "An sehr heissen Standorten schiessen Pflanzen schneller. Besser in kuehleren Zeitfenstern planen.",
  },
  timeline: [
    {
      type: "direktsaat",
      label: "Fruehjahrs- und Sommersaat",
      startMonth: 3,
      startDay: 10,
      endMonth: 9,
      endDay: 20,
      color: "#84cc16",
    },
    {
      type: "duengen",
      label: "Zurueckhaltende Grundversorgung",
      startMonth: 3,
      startDay: 1,
      endMonth: 4,
      endDay: 15,
      color: "#16a34a",
    },
    {
      type: "ernten",
      label: "Laufende Ernte je Satz",
      startMonth: 4,
      startDay: 10,
      endMonth: 10,
      endDay: 10,
      color: "#f43f5e",
    },
  ],
};
