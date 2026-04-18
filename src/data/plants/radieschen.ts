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
      label: "Fruehjahrsaussaat",
      startMonth: 3,
      startDay: 1,
      endMonth: 5,
      endDay: 31,
      color: "#7aa942",
    },
    {
      type: "direktsaat",
      label: "Spaetsommeraussaat",
      startMonth: 8,
      startDay: 15,
      endMonth: 9,
      endDay: 30,
      color: "#7aa942",
    },
    {
      type: "duengen",
      label: "Zurueckhaltende Grundversorgung",
      startMonth: 3,
      startDay: 1,
      endMonth: 3,
      endDay: 31,
      color: "#8b6b45",
    },
    {
      type: "ernten",
      label: "Ernte aus Fruehjahrsaat",
      startMonth: 4,
      startDay: 1,
      endMonth: 7,
      endDay: 10,
      color: "#c95b52",
    },
    {
      type: "ernten",
      label: "Ernte aus Spaetsommeraussaat",
      startMonth: 9,
      startDay: 10,
      endMonth: 10,
      endDay: 31,
      color: "#c95b52",
    },
  ],
};
